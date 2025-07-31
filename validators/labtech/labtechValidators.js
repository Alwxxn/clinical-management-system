const { body } = require('express-validator');

exports.labTestResultValidator = [
  body('results').isArray({ min: 1 }).withMessage('Results must be an array'),
  body('results.*.testName').notEmpty().withMessage('Test name is required'),
  body('results.*.highRange').optional().isString(),
  body('results.*.lowRange').optional().isString(),
  body('results.*.actualReading').notEmpty().withMessage('Actual reading is required'),
  body('results.*.observation').optional().isString()
];