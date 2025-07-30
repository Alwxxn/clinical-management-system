const { body } = require('express-validator');

exports.addInventoryValidator = [
  body('medicineId').notEmpty().withMessage('Medicine ID is required'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
];

exports.updateInventoryValidator = [
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
]; 