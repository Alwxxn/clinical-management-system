// validators/labtechValidators.js

const { body, param, query } = require('express-validator');

exports.labTestValidator = [
  body('name').notEmpty().withMessage('Lab test name is required'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
];

exports.labTestRequestValidator = [
  body('patientId').notEmpty().withMessage('Patient ID is required'),
  body('tests').isArray({ min: 1 }).withMessage('At least one lab test is required'),
];

exports.updateTestRequestStatusValidator = [
  param('requestId').notEmpty().withMessage('Test request ID is required'),
  body('status').isIn(['Pending', 'In Progress', 'Completed', 'Cancelled']).withMessage('Invalid status'),
];

exports.addLabTestResultValidator = [
  body('testRequestId').notEmpty().withMessage('Test Request ID is required'),
  body('testId').notEmpty().withMessage('Test ID is required'),
  body('resultValue').notEmpty().withMessage('Result value is required'),
];