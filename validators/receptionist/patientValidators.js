const { body } = require('express-validator');
const { validateDate, validatePhone } = require('../../utils/validation');

exports.registerPatientValidator = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces'),
  
  body('dob')
    .notEmpty().withMessage('Date of birth is required')
    .custom((value) => {
      const validation = validateDate(value);
      if (!validation.isValid) {
        throw new Error(validation.message);
      }
      // Check if person is not too old (reasonable age limit)
      const today = new Date();
      const age = today.getFullYear() - validation.parsedDate.getFullYear();
      const monthDiff = today.getMonth() - validation.parsedDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < validation.parsedDate.getDate())) {
        if (age > 120) {
          throw new Error('Please enter a valid date of birth');
        }
      } else if (age > 120) {
        throw new Error('Please enter a valid date of birth');
      }
      return true;
    }),
  
  body('gender')
    .isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
  
  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .custom((value) => {
      if (!validatePhone(value)) {
        throw new Error('Phone number must be in format +916789012345 (Indian mobile number starting with 6,7,8,9)');
      }
      return true;
    }),
  
  body('address')
    .notEmpty().withMessage('Address is required')
    .isLength({ min: 10, max: 200 }).withMessage('Address must be between 10 and 200 characters'),
  
  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail()
];

exports.updatePatientValidator = [
  body('name')
    .optional()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces'),
  
  body('dob')
    .optional()
    .notEmpty().withMessage('Date of birth is required')
    .custom((value) => {
      const validation = validateDate(value);
      if (!validation.isValid) {
        throw new Error(validation.message);
      }
      return true;
    }),
  
  body('gender')
    .optional()
    .isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
  
  body('phone')
    .optional()
    .notEmpty().withMessage('Phone number is required')
    .custom((value) => {
      if (!validatePhone(value)) {
        throw new Error('Phone number must be in format +916789012345 (Indian mobile number starting with 6,7,8,9)');
      }
      return true;
    }),
  
  body('address')
    .optional()
    .notEmpty().withMessage('Address is required')
    .isLength({ min: 10, max: 200 }).withMessage('Address must be between 10 and 200 characters'),
  
  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail()
];