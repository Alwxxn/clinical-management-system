// validators/receptionistValidators.js

const { body, param, query } = require('express-validator');

exports.patientValidators = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('contactNumber').notEmpty().withMessage('Contact number required'),
  // You can add more as needed...
];

exports.appointmentValidators = [
  body('patient').notEmpty().withMessage('Patient ID required'),
  body('doctor').notEmpty().withMessage('Doctor required'),
  body('appointmentDate').isISO8601().toDate().withMessage('Valid appointment date required'),
];

exports.billValidators = [
  body('appointment').notEmpty().withMessage('Appointment ID required'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
];
