const express = require('express');
const router = express.Router();
const consultationController = require('../../controllers/doctor/consultationController');
const auth = require('../../middleware/auth');
const { createConsultationValidator, updateConsultationValidator } = require('../../validators/doctor/consultationValidators');
const { validationResult } = require('express-validator');

// Add Consultation Note
router.post(
  '/consultations',
  auth('doctor'),
  createConsultationValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  consultationController.addConsultation
);

// Update Consultation Note
router.put(
  '/consultations/:consultationId',
  auth('doctor'),
  updateConsultationValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  consultationController.updateConsultation
);

// Get Consultation Note by Appointment ID
router.get('/consultations/appointment/:appointmentId', auth(), consultationController.getConsultationByAppointment);

// List Consultation Notes by Doctor
router.get('/consultations/doctor/:doctorId', auth(), consultationController.listConsultationsByDoctor);

// List Consultation Notes by Patient
router.get('/consultations/patient/:patientId', auth(), consultationController.listConsultationsByPatient);

// Get Consultation History by Appointment ID
router.get('/consultations/history/appointment/:appointmentId', auth(), consultationController.getConsultationHistoryByAppointment);

module.exports = router;