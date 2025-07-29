const { body } = require('express-validator');

exports.signupValidator = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isAlphanumeric().withMessage('Username must be alphanumeric'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .notEmpty().withMessage('Role is required')
    .isIn(['admin', 'doctor', 'receptionist', 'pharmacist', 'labtech']).withMessage('Invalid role'),
];

exports.loginValidator = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];
