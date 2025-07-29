const express = require('express');
const router = express.Router();
const controller = require('../../controllers/labtech/labTestResultController');
const auth = require('../../middleware/auth');
const { labTestResultValidator } = require('../../validators/labtech/labtechValidators');
const { validationResult } = require('express-validator');

router.put(
  '/labtests/results/:labTestPrescriptionId',
  auth('labtech'),
  labTestResultValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  controller.recordLabTestResult
);

// Get Lab Test Result by Appointment ID
router.get('/labtests/results/appointment/:appointmentId', auth(), controller.getLabTestResultByAppointment);

// List Lab Test Results by Date Range
router.get('/labtests/results', auth(), controller.listLabTestResultsByDateRange);

// Deactivate Lab Test Prescription
router.patch('/labtests/:labTestPrescriptionId/deactivate', auth('labtech'), controller.deactivateLabTestPrescription);

module.exports = router;