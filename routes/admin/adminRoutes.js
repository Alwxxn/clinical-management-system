const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const auth = require('../../middleware/auth');

const { registerStaffValidator, updateStaffValidator, registerFirstAdminValidator } = require('../../validators/admin/adminValidators');
const { validationResult } = require('express-validator');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Admin routes are working!' });
});

// Create First Admin (no auth required)
router.post(
  '/staff/first-admin',
  registerFirstAdminValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  adminController.createFirstAdmin
);

// Create Staff (requires admin auth)
router.post(
  '/staff',
  auth('admin'),
  registerStaffValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  adminController.createStaff
);

// Update Staff
router.put(
  '/staff/:staffId',
  auth('admin'),
  updateStaffValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  adminController.updateStaff
);

// GET /api/staff/:staffId
router.get('/staff/:staffId', auth('admin'), adminController.getStaffById);

// GET /api/staff
router.get('/staff', auth('admin'), adminController.listAllStaff);

// PATCH /api/staff/:staffId/deactivate
router.patch('/staff/:staffId/deactivate', auth('admin'), adminController.deactivateStaff);

module.exports = router;