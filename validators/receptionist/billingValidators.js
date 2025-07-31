const { body } = require('express-validator');

exports.createBillingValidator = [
  body('appointmentId').notEmpty().withMessage('Appointment ID is required'),
  body('patientId').notEmpty().withMessage('Patient ID is required'),
  body('doctorId').notEmpty().withMessage('Doctor ID is required'),
  body('date').isISO8601().withMessage('Date must be valid (YYYY-MM-DD)'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('details').optional().isString()
];

exports.updateBillingValidator = [
  body('amount').optional().isNumeric().withMessage('Amount must be a number'),
  body('status').optional().isIn(['paid', 'unpaid']).withMessage('Invalid status'),
  body('details').optional().isString()
]; 