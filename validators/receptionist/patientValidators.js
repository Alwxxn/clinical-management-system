const { body } = require('express-validator');

exports.registerPatientValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('dob').isISO8601().withMessage('DOB must be a valid date'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  body('phone')
    .matches(/^\+91\d{10}$/)
    .withMessage('Phone number must be in format +911234567890'),
  body('address').notEmpty().withMessage('Address is required'),
  body('email')
    .optional()
    .isEmail().withMessage('Invalid email')
    .bail()
    .matches(/\.com$/).withMessage('Email must end with .com')
];

exports.updatePatientValidator = [
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('dob').optional().isISO8601().withMessage('DOB must be a valid date'),
  body('gender').optional().isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  body('phone')
    .optional()
    .matches(/^\+91\d{10}$/)
    .withMessage('Phone number must be in format +911234567890'),
  body('address').optional().notEmpty().withMessage('Address is required'),
  body('email')
    .optional()
    .isEmail().withMessage('Invalid email')
    .bail()
    .matches(/\.com$/).withMessage('Email must end with .com')
];