const express = require('express');
const router = express.Router();
const authController = require('../../controllers/admin/authController');
const auth = require('../../middleware/auth');
const { authLimiter } = require('../../middleware/security');

// Login (all staff) - with rate limiting
router.post('/login', authLimiter, authController.login);

// Change password (all staff, must be logged in)
router.post('/change-password', auth(), authController.changePassword);

// Get current user profile
router.get('/profile', auth(), authController.getProfile);

// Logout
router.post('/logout', auth(), authController.logout);

module.exports = router;