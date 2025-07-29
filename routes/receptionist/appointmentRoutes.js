const express = require('express');
const router = express.Router();
const appointmentController = require('../../controllers/receptionist/appointmentController');
const auth = require('../../middleware/auth');
const { createAppointmentValidator, updateAppointmentValidator } = require('../../validators/receptionist/appointmentValidators');
const { validationResult } = require('express-validator');

// Schedule Appointment
router.post(
  '/appointments',
  auth(['receptionist', 'patient']),
  createAppointmentValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  appointmentController.scheduleAppointment
);

// Update Appointment
router.put(
  '/appointments/:appointmentId',
  auth(['receptionist', 'admin']),
  updateAppointmentValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  appointmentController.updateAppointment
);

// Get by ID
router.get('/appointments/:appointmentId', auth(), appointmentController.getAppointmentById);

// List by date
router.get('/appointments', auth(), appointmentController.listAppointmentsByDate);

// Cancel
router.patch('/appointments/:appointmentId/cancel', auth(['receptionist', 'admin']), appointmentController.cancelAppointment);

// List by patient
router.get('/appointments/patient/:patientId', auth(), appointmentController.listAppointmentsByPatient);

// List by doctor
router.get('/appointments/doctor/:doctorId', auth(), appointmentController.listAppointmentsByDoctor);

// List by status
router.get('/appointments', auth(), appointmentController.listAppointmentsByStatus);

module.exports = router;