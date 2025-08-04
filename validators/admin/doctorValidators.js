const { body } = require('express-validator');

exports.registerDoctorValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('dob').isISO8601().withMessage('DOB must be a valid date'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  body('phone')
    .matches(/^\+91\d{10}$/)
    .withMessage('Phone number must be in format +911234567890'),
  body('address').notEmpty().withMessage('Address is required'),
  body('email')
    .isEmail().withMessage('Invalid email')
    .bail()
    .matches(/\.com$/).withMessage('Email must end with .com'),
  body('specialisation').notEmpty().withMessage('Specialisation is required'),
  body('workingDays').isArray().withMessage('Working days must be an array'),
  body('fee').isNumeric().withMessage('Fee must be a number'),
  // Age >= 25 will be checked in controller/model
];

exports.updateDoctorValidator = [
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
    .matches(/\.com$/).withMessage('Email must end with .com'),
  body('specialisation').optional().notEmpty().withMessage('Specialisation is required'),
  body('workingDays').optional().isArray().withMessage('Working days must be an array'),
  body('fee').optional().isNumeric().withMessage('Fee must be a number'),
];