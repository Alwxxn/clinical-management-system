/**
 * Enhanced Validation Utilities
 * Provides input sanitization and validation functions
 */

const crypto = require('crypto');

/**
 * Sanitize input to prevent injection attacks
 * @param {string} input - Input string to sanitize
 * @returns {string} Sanitized string
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[&]/g, '&amp;') // Escape ampersands
    .trim();
};

/**
 * Calculate accurate age from birth date
 * @param {Date|string} birthDate - Birth date
 * @returns {number} Age in years
 */
const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and message
 */
const validatePasswordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const isValid = password.length >= minLength && 
                  hasUpperCase && 
                  hasLowerCase && 
                  hasNumbers && 
                  hasSpecialChar;
  
  let message = '';
  if (!isValid) {
    const issues = [];
    if (password.length < minLength) issues.push(`at least ${minLength} characters`);
    if (!hasUpperCase) issues.push('one uppercase letter');
    if (!hasLowerCase) issues.push('one lowercase letter');
    if (!hasNumbers) issues.push('one number');
    if (!hasSpecialChar) issues.push('one special character');
    
    message = `Password must contain ${issues.join(', ')}`;
  }
  
  return { isValid, message };
};

/**
 * Validate email format (more flexible than current .com requirement)
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Indian phone number (Tamil Nadu style)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Whether phone is valid
 */
const validatePhone = (phone) => {
  // Indian mobile number format: +91 followed by 6,7,8,9 and 9 digits
  // Examples: +916789012345, +919876543210
  const phoneRegex = /^\+91[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate staff ID format
 * @param {string} staffId - Staff ID to validate
 * @returns {Object} Validation result with isValid, role, and message
 */
const validateStaffId = (staffId) => {
  // Format: PREFIX + 3-digit number (e.g., DOC001, REC002)
  const staffIdRegex = /^(ADM|DOC|REC|PHA|LAB)\d{3}$/;
  const isValid = staffIdRegex.test(staffId);
  
  if (!isValid) {
    return {
      isValid: false,
      role: null,
      message: 'Staff ID must be in format: PREFIX + 3-digit number (e.g., DOC001, REC002)'
    };
  }
  
  // Extract role from prefix
  const roleMap = {
    'ADM': 'admin',
    'DOC': 'doctor',
    'REC': 'receptionist',
    'PHA': 'pharmacist',
    'LAB': 'labtech'
  };
  
  const prefix = staffId.substring(0, 3);
  const role = roleMap[prefix];
  
  return {
    isValid: true,
    role,
    message: 'Valid staff ID format'
  };
};

/**
 * Generate secure random string
 * @param {number} length - Length of random string
 * @returns {string} Random string
 */
const generateRandomString = (length = 6) => {
  return crypto.randomBytes(length).toString('hex').toUpperCase();
};

/**
 * Validate Indian date format (DD/MM/YYYY)
 * @param {string} date - Date string to validate
 * @param {Date} minDate - Minimum allowed date
 * @param {Date} maxDate - Maximum allowed date
 * @returns {Object} Validation result with isValid, message, and parsed date
 */
const validateDate = (date, minDate = null, maxDate = null) => {
  // Indian date format: DD/MM/YYYY
  const dateRegex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  
  if (!dateRegex.test(date)) {
    return {
      isValid: false,
      message: 'Date must be in DD/MM/YYYY format (e.g., 25/12/2024)',
      parsedDate: null
    };
  }
  
  // Parse DD/MM/YYYY to Date object
  const [day, month, year] = date.split('/');
  const dateObj = new Date(year, month - 1, day); // month is 0-indexed
  
  // Check if date is valid (handles leap years, etc.)
  if (dateObj.getDate() != day || dateObj.getMonth() != month - 1 || dateObj.getFullYear() != year) {
    return {
      isValid: false,
      message: 'Invalid date (e.g., 31/02/2024 is not valid)',
      parsedDate: null
    };
  }
  
  // Check range constraints
  if (minDate && dateObj < new Date(minDate)) {
    return {
      isValid: false,
      message: `Date must be after ${new Date(minDate).toLocaleDateString('en-IN')}`,
      parsedDate: null
    };
  }
  
  if (maxDate && dateObj > new Date(maxDate)) {
    return {
      isValid: false,
      message: `Date must be before ${new Date(maxDate).toLocaleDateString('en-IN')}`,
      parsedDate: null
    };
  }
  
  return {
    isValid: true,
    message: 'Valid date format',
    parsedDate: dateObj
  };
};

/**
 * Format date to Indian style (DD/MM/YYYY)
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
const formatIndianDate = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Convert Indian date format (DD/MM/YYYY) to ISO date
 * @param {string} indianDate - Date in DD/MM/YYYY format
 * @returns {string} ISO date string (YYYY-MM-DD)
 */
const convertIndianDateToISO = (indianDate) => {
  const [day, month, year] = indianDate.split('/');
  return `${year}-${month}-${day}`;
};

/**
 * Sanitize and validate object properties
 * @param {Object} obj - Object to sanitize
 * @returns {Object} Sanitized object
 */
const sanitizeObject = (obj) => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeInput(item) : item
      );
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

module.exports = {
  sanitizeInput,
  calculateAge,
  validatePasswordStrength,
  validateEmail,
  validatePhone,
  validateStaffId,
  generateRandomString,
  validateDate,
  formatIndianDate,
  convertIndianDateToISO,
  sanitizeObject
}; 