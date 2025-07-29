const { body } = require('express-validator');

exports.createAppointmentValidator = [
  body('patientId').notEmpty().withMessage('Patient ID is required'),
  body('doctorId').notEmpty().withMessage('Doctor ID is required'),
  body('date').isISO8601().withMessage('Date must be valid (YYYY-MM-DD)'),
  body('timeSlot').notEmpty().withMessage('Time slot is required'),
  body('createdBy').isIn(['receptionist', 'patient']).withMessage('createdBy must be receptionist or patient')
];

exports.updateAppointmentValidator = [
  body('date').optional().isISO8601().withMessage('Date must be valid (YYYY-MM-DD)'),
  body('timeSlot').optional().notEmpty().withMessage('Time slot is required'),
  body('status').optional().isIn(['scheduled', 'completed', 'cancelled']).withMessage('Invalid status')
]; 