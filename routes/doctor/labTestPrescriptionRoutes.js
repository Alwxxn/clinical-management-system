const express = require('express');
const router = express.Router();
const controller = require('../../controllers/doctor/labTestPrescriptionController');
const auth = require('../../middleware/auth');
const { createLabTestPrescriptionValidator, updateLabTestPrescriptionValidator } = require('../../validators/doctor/labTestPrescriptionValidators');
const { validationResult } = require('express-validator');

router.post(
  '/prescriptions/labtest',
  auth('doctor'),
  createLabTestPrescriptionValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  controller.createLabTestPrescription
);

router.put(
  '/prescriptions/labtest/:prescriptionId',
  auth('doctor'),
  updateLabTestPrescriptionValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  controller.updateLabTestPrescription
);

router.get('/prescriptions/labtest/appointment/:appointmentId', auth(), controller.getLabTestPrescriptionByAppointment);
router.get('/prescriptions/labtest/patient/:patientId', auth(), controller.listLabTestPrescriptionsByPatient);

module.exports = router;