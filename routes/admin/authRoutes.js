const express = require('express');
const router = express.Router();
const authController = require('../../controllers/admin/authController');
const auth = require('../../middleware/auth');

// Login (all staff)
router.post('/login', authController.login);

// Change password (all staff, must be logged in)
router.post('/change-password', auth(), authController.changePassword);

module.exports = router;