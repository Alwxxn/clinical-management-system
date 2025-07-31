const { body } = require('express-validator');

exports.createConsultationValidator = [
  body('appointmentId').notEmpty().withMessage('Appointment ID is required'),
  body('doctorId').notEmpty().withMessage('Doctor ID is required'),
  body('patientId').notEmpty().withMessage('Patient ID is required'),
  body('symptoms').notEmpty().withMessage('Symptoms are required'),
  body('diagnosis').notEmpty().withMessage('Diagnosis is required'),
  body('notes').optional().isString().withMessage('Notes must be a string'),
  body('prescription').optional().isString().withMessage('Prescription must be a string'),
  body('medicine').optional().isString().withMessage('Medicine must be a string'),
  body('labTest').optional().isString().withMessage('Lab test must be a string')
];

exports.updateConsultationValidator = [
  body('symptoms').optional().notEmpty().withMessage('Symptoms cannot be empty'),
  body('diagnosis').optional().notEmpty().withMessage('Diagnosis cannot be empty'),
  body('notes').optional().isString().withMessage('Notes must be a string'),
  body('prescription').optional().isString().withMessage('Prescription must be a string'),
  body('medicine').optional().isString().withMessage('Medicine must be a string'),
  body('labTest').optional().isString().withMessage('Lab test must be a string')
];