// routes/receptionistRoutes.js

const express = require('express');
const router = express.Router();

const controller = require('../controllers/receptionistController');
const validators = require('../validators/receptionistValidators');
const { validationResult } = require('express-validator');

// Helper: handle validation errors middleware
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// ---- Patients
router.post('/patients', validators.patientValidators, handleValidation, controller.registerPatient);
router.put('/patients/:patientId', controller.updatePatient);
router.get('/patients/:patientId', controller.getPatient);
router.get('/patients', controller.listPatients);
router.patch('/patients/:patientId/deactivate', controller.deactivatePatient);

// ---- Appointments
router.post('/appointments', validators.appointmentValidators, handleValidation, controller.scheduleAppointment);
router.put('/appointments/:appointmentId', controller.updateAppointment);
router.get('/appointments/:appointmentId', controller.getAppointment);
router.patch('/appointments/:appointmentId/cancel', controller.cancelAppointment);
router.get('/appointments', controller.listAppointmentsByDate); // get by date (query param)
router.get('/appointments/patient/:patientId', controller.listAppointmentsByPatient);
router.get('/appointments/doctor/:doctorId', controller.listAppointmentsByDoctor);
router.get('/appointments/status', controller.listAppointmentsByStatus); // e.g. /appointments/status?status=Scheduled

// ---- Billing
router.post('/billing', validators.billValidators, handleValidation, controller.generateBill);
router.put('/billing/:appointmentId', controller.updateBill);
router.get('/billing/:appointmentId', controller.getBill);
router.get('/billing', controller.listBillsByDate); // /billing?startDate=...&endDate=...

module.exports = router;
