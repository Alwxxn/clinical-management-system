// validators/pharmacistValidators.js

const { body, param, query } = require('express-validator');

exports.medicationValidators = [
  body('name').notEmpty().withMessage('Medication name is required'),
  body('quantityInStock').optional().isInt({ min: 0 }).withMessage('Quantity in stock must be a non-negative integer'),
];

exports.prescriptionValidators = [
  body('patientId').notEmpty().withMessage('Patient ID is required'),
  body('doctorId').notEmpty().withMessage('Doctor ID is required'),
  body('medicationList').isArray({ min: 1 }).withMessage('Medication list must be an array with at least one item'),
  body('medicationList.*.medicationId').notEmpty().withMessage('Medication ID is required for each medication'),
  body('medicationList.*.dosage').notEmpty().withMessage('Dosage is required'),
  body('medicationList.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

exports.inventoryTransactionValidators = [
  body('medicationId').notEmpty().withMessage('Medication ID is required'),
  body('change').isInt().withMessage('Change must be an integer (positive or negative)'),
  body('transactionType').isIn(['Addition', 'Dispense']).withMessage('Transaction type must be Addition or Dispense'),
];