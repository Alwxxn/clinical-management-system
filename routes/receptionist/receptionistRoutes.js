const express = require('express');
const router = express.Router();
const receptionistController = require('../../controllers/receptionist/receptionistController');
const auth = require('../../middleware/auth');
const { registerPatientValidator, updatePatientValidator } = require('../../validators/receptionist/patientValidators');
const { validationResult } = require('express-validator');

router.post(
  '/patients',
  auth(['receptionist', 'admin']),
  registerPatientValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  receptionistController.registerPatient
);

// Update Patient
router.put(
    '/patients/:patientId',
    auth(['receptionist', 'admin']),
    updatePatientValidator,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
    },
    receptionistController.updatePatient
  );

// GET /api/patients/:patientId
router.get('/patients/:patientId', auth(['receptionist', 'admin']), receptionistController.getPatientById);

// GET /api/patients
router.get('/patients', auth(['receptionist', 'admin']), receptionistController.listAllPatients);

// PATCH /api/patients/:patientId/deactivate
router.patch('/patients/:patientId/deactivate', auth(['receptionist', 'admin']), receptionistController.deactivatePatient);

module.exports = router;