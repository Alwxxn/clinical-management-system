const { body } = require('express-validator');
const { validateDate, validatePhone } = require('../../utils/validation');

exports.registerFirstAdminValidator = [
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
      // Check if person is at least 18 years old
      const today = new Date();
      const age = today.getFullYear() - validation.parsedDate.getFullYear();
      const monthDiff = today.getMonth() - validation.parsedDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < validation.parsedDate.getDate())) {
        if (age < 19) {
          throw new Error('Person must be at least 18 years old');
        }
      } else if (age < 18) {
        throw new Error('Person must be at least 18 years old');
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
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
];

exports.registerStaffValidator = [
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
      // Check if person is at least 18 years old
      const today = new Date();
      const age = today.getFullYear() - validation.parsedDate.getFullYear();
      const monthDiff = today.getMonth() - validation.parsedDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < validation.parsedDate.getDate())) {
        if (age < 19) {
          throw new Error('Person must be at least 18 years old');
        }
      } else if (age < 18) {
        throw new Error('Person must be at least 18 years old');
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
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('role')
    .isIn(['admin', 'doctor', 'receptionist', 'pharmacist', 'labtech'])
    .withMessage('Role must be admin, doctor, receptionist, pharmacist, or labtech'),
  
  body('specialisation')
    .optional()
    .isString()
    .isLength({ min: 2, max: 50 }).withMessage('Specialisation must be between 2 and 50 characters'),
  
  body('workingDays')
    .optional()
    .isArray()
    .custom((value) => {
      if (value && value.length > 0) {
        const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        for (const day of value) {
          if (!validDays.includes(day)) {
            throw new Error('Working days must be valid day names (Monday, Tuesday, etc.)');
          }
        }
      }
      return true;
    }),
  
  body('fee')
    .optional()
    .isNumeric()
    .custom((value) => {
      if (value && (value < 0 || value > 10000)) {
        throw new Error('Fee must be between 0 and 10000');
      }
      return true;
    }),
  
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
];

exports.updateStaffValidator = [
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
    .normalizeEmail(),
  
  body('role')
    .optional()
    .isIn(['admin', 'doctor', 'receptionist', 'pharmacist', 'labtech'])
    .withMessage('Role must be admin, doctor, receptionist, pharmacist, or labtech'),
  
  body('specialisation')
    .optional()
    .isString()
    .isLength({ min: 2, max: 50 }).withMessage('Specialisation must be between 2 and 50 characters'),
  
  body('workingDays')
    .optional()
    .isArray()
    .custom((value) => {
      if (value && value.length > 0) {
        const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        for (const day of value) {
          if (!validDays.includes(day)) {
            throw new Error('Working days must be valid day names (Monday, Tuesday, etc.)');
          }
        }
      }
      return true;
    }),
  
  body('fee')
    .optional()
    .isNumeric()
    .custom((value) => {
      if (value && (value < 0 || value > 10000)) {
        throw new Error('Fee must be between 0 and 10000');
      }
      return true;
    }),
];