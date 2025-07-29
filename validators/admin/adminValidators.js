const { body } = require('express-validator');

exports.registerFirstAdminValidator = [
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
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  // Custom age validation will be handled in controller/model
];

exports.registerStaffValidator = [
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
  body('role').isIn(['admin', 'doctor', 'receptionist', 'pharmacist', 'labtech']).withMessage('Invalid role'),
  body('specialisation').optional().isString(),
  body('workingDays').optional().isArray(),
  body('fee').optional().isNumeric(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  // Custom age validation will be handled in controller/model
];

exports.updateStaffValidator = [
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
  body('role').optional().isIn(['admin', 'doctor', 'receptionist', 'pharmacist', 'labtech']).withMessage('Invalid role'),
  body('specialisation').optional().isString(),
  body('workingDays').optional().isArray(),
  body('fee').optional().isNumeric(),
];
