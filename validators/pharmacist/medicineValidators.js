const { body } = require('express-validator');

exports.createMedicineValidator = [
  body('name').notEmpty().withMessage('Medicine name is required'),
  body('genericName').optional().isString(),
  body('strength').optional().isString(),
  body('expiry').optional().isString(),
  body('dosage').optional().isString()
];

exports.updateMedicineValidator = [
  body('name').optional().notEmpty().withMessage('Medicine name is required'),
  body('genericName').optional().isString(),
  body('strength').optional().isString(),
  body('expiry').optional().isString(),
  body('dosage').optional().isString()
]; 