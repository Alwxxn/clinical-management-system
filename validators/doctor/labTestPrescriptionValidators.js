const { body } = require('express-validator');

exports.createLabTestPrescriptionValidator = [
  body('appointmentId').notEmpty().withMessage('Appointment ID is required'),
  body('doctorId').notEmpty().withMessage('Doctor ID is required'),
  body('patientId').notEmpty().withMessage('Patient ID is required'),
  body('tests').isArray().withMessage('Tests must be an array'),
  body('tests.*.testName').notEmpty().withMessage('Test name is required'),
  body('tests.*.notes').optional().isString().withMessage('Notes must be a string')
];

exports.updateLabTestPrescriptionValidator = [
  body('tests').optional().isArray().withMessage('Tests must be an array'),
  body('tests.*.testName').optional().notEmpty().withMessage('Test name cannot be empty'),
  body('tests.*.notes').optional().isString().withMessage('Notes must be a string')
]; 