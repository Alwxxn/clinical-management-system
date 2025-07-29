// routes/doctorRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/doctorController');
const validators = require('../validators/doctorValidators');
const { validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post('/', validators.doctorValidators, handleValidation, controller.addDoctor);
router.put('/:doctorId', controller.updateDoctor);
router.get('/:doctorId', controller.getDoctor);
router.get('/', controller.listDoctors);
router.patch('/:doctorId/deactivate', controller.deactivateDoctor);

router.post('/:doctorId/appointment-notes', validators.appointmentNoteValidators, handleValidation, controller.addAppointmentNote);
router.get('/:doctorId/appointment-notes', controller.listAppointmentNotes);

module.exports = router;
