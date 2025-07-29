const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const auth = require('../../middleware/auth');
const { registerDoctorValidator, updateDoctorValidator } = require('../../validators/admin/doctorValidators');
const { validationResult } = require('express-validator');

// Create Doctor
router.post(
  '/doctors',
  auth('admin'),
  registerDoctorValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  adminController.createDoctor
);

// Update Doctor
router.put(
  '/doctors/:doctorId',
  auth('admin'),
  updateDoctorValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  adminController.updateDoctor
);

// Only admin can manage doctors
router.get('/doctors/:doctorId', auth('admin'), adminController.getDoctorById);
router.get('/doctors', auth('admin'), adminController.listAllDoctors);
router.patch('/doctors/:doctorId/deactivate', auth('admin'), adminController.deactivateDoctor);

module.exports = router;