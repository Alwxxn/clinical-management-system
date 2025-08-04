const User = require('../../models/admin/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiResponse = require('../../utils/apiResponse');
const { logHelper } = require('../../utils/logger');
const { validatePasswordStrength } = require('../../utils/validation');
const { asyncHandler } = require('../../middleware/errorHandler');

// Login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // Validate input
  if (!email || !password) {
    return ApiResponse.error(res, 'Email and password are required', 400);
  }

  const user = await User.findOne({ email, isActive: true });
  if (!user) {
    logHelper.auth('login_failed', null, false, { email, reason: 'user_not_found' });
    return ApiResponse.unauthorized(res, 'Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    logHelper.auth('login_failed', user._id, false, { email, reason: 'invalid_password' });
    return ApiResponse.unauthorized(res, 'Invalid credentials');
  }

  const token = jwt.sign(
    { userId: user._id, staffId: user.staffId, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
  );

  logHelper.auth('login_success', user._id, true, { email, role: user.role });
  
  return ApiResponse.success(res, {
    token,
    role: user.role,
    userId: user._id,
    staffId: user.staffId,
    name: user.name,
    email: user.email
  }, 'Login successful');
});

// Change Password
exports.changePassword = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return ApiResponse.error(res, 'Old password and new password are required', 400);
  }

  // Validate new password strength
  const passwordValidation = validatePasswordStrength(newPassword);
  if (!passwordValidation.isValid) {
    return ApiResponse.error(res, passwordValidation.message, 400);
  }

  const user = await User.findById(userId);
  if (!user) {
    return ApiResponse.notFound(res, 'User not found');
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    logHelper.auth('password_change_failed', userId, false, { reason: 'incorrect_old_password' });
    return ApiResponse.error(res, 'Old password is incorrect', 400);
  }

  const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
  user.password = await bcrypt.hash(newPassword, saltRounds);
  await user.save();

  logHelper.auth('password_change_success', userId, true);
  
  return ApiResponse.success(res, null, 'Password changed successfully');
});

// Get current user profile
exports.getProfile = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  
  const user = await User.findById(userId).select('-password');
  if (!user) {
    return ApiResponse.notFound(res, 'User not found');
  }

  return ApiResponse.success(res, user, 'Profile retrieved successfully');
});

// Logout (client-side token removal, but we can log it)
exports.logout = asyncHandler(async (req, res) => {
  const userId = req.user?.userId;
  
  if (userId) {
    logHelper.auth('logout', userId, true);
  }

  return ApiResponse.success(res, null, 'Logout successful');
});
