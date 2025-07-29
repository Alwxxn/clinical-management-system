// validators/doctorValidators.js

const { body } = require('express-validator');

exports.doctorValidators = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  // Add more validations as needed
];

exports.appointmentNoteValidators = [
  body('appointmentId').notEmpty().withMessage('Appointment ID is required'),
  body('notes').notEmpty().withMessage('Notes cannot be empty'),
];
