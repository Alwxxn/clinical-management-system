const mongoose = require('mongoose');
const User = require('../models/admin/admin');

/**
 * Generate staff ID with role-specific prefix and incrementing number
 * @param {string} role - User role (admin, doctor, receptionist, pharmacist, labtech)
 * @returns {Promise<string>} Generated staff ID
 */
async function generateStaffId(role) {
  // Role-specific prefixes
  const rolePrefixes = {
    'admin': 'ADM',
    'doctor': 'DOC', 
    'receptionist': 'REC',
    'pharmacist': 'PHA',
    'labtech': 'LAB'
  };
  
  const prefix = rolePrefixes[role] || 'STA';
  
  // Find the highest existing number for this role
  const existingUsers = await User.find({ 
    role: role,
    staffId: { $regex: `^${prefix}` }
  }).sort({ staffId: -1 }).limit(1);
  
  let nextNumber = 1;
  if (existingUsers.length > 0) {
    // Extract number from existing staff ID (e.g., "DOC001" -> 1)
    const lastStaffId = existingUsers[0].staffId;
    const lastNumber = parseInt(lastStaffId.replace(prefix, ''));
    nextNumber = lastNumber + 1;
  }
  
  // Format: PREFIX + 3-digit number (e.g., DOC001, REC002)
  return `${prefix}${nextNumber.toString().padStart(3, '0')}`;
}

module.exports = generateStaffId; 
