const express = require('express');
const router = express.Router();
const controller = require('../../controllers/doctor/medicinePrescriptionController');
const auth = require('../../middleware/auth');
const { createMedicinePrescriptionValidator, updateMedicinePrescriptionValidator } = require('../../validators/doctor/medicinePrescriptionValidators');
const { validationResult } = require('express-validator');

router.post(
  '/prescriptions/medicine',
  auth('doctor'),
  createMedicinePrescriptionValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  controller.createMedicinePrescription
);

router.put(
  '/prescriptions/medicine/:prescriptionId',
  auth('doctor'),
  updateMedicinePrescriptionValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  controller.updateMedicinePrescription
);

router.get('/prescriptions/medicine/appointment/:appointmentId', auth(), controller.getPrescriptionByAppointment);
router.get('/prescriptions/medicine/patient/:patientId', auth(), controller.listPrescriptionsByPatient);

module.exports = router;