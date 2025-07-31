const { body } = require('express-validator');

exports.createMedicinePrescriptionValidator = [
  body('appointmentId').notEmpty().withMessage('Appointment ID is required'),
  body('doctorId').notEmpty().withMessage('Doctor ID is required'),
  body('patientId').notEmpty().withMessage('Patient ID is required'),
  body('medicines').isArray().withMessage('Medicines must be an array'),
  body('medicines.*.name').notEmpty().withMessage('Medicine name is required'),
  body('medicines.*.quantity').isNumeric().withMessage('Quantity must be a number'),
  body('medicines.*.genericName').optional().isString().withMessage('Generic name must be a string'),
  body('medicines.*.strength').optional().isString().withMessage('Strength must be a string'),
  body('medicines.*.dosage').optional().isString().withMessage('Dosage must be a string'),
  body('medicines.*.expiry').optional().isString().withMessage('Expiry must be a string'),
  body('notes').optional().isString().withMessage('Notes must be a string')
];

exports.updateMedicinePrescriptionValidator = [
  body('medicines').optional().isArray().withMessage('Medicines must be an array'),
  body('medicines.*.name').optional().notEmpty().withMessage('Medicine name cannot be empty'),
  body('medicines.*.quantity').optional().isNumeric().withMessage('Quantity must be a number'),
  body('medicines.*.genericName').optional().isString().withMessage('Generic name must be a string'),
  body('medicines.*.strength').optional().isString().withMessage('Strength must be a string'),
  body('medicines.*.dosage').optional().isString().withMessage('Dosage must be a string'),
  body('medicines.*.expiry').optional().isString().withMessage('Expiry must be a string'),
  body('notes').optional().isString().withMessage('Notes must be a string')
]; 