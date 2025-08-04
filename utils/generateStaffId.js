const crypto = require('crypto');

function generateStaffId(role) {
  // Get current date in YYYYMMDD format
  const date = new Date().toISOString().slice(0,10).replace(/-/g, '');
  
  // Generate 3 random bytes and convert to hex
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  
  // Role-specific prefixes
  const rolePrefixes = {
    'admin': 'ADM',
    'doctor': 'DOC', 
    'receptionist': 'REC',
    'pharmacist': 'PHA',
    'labtech': 'LAB'
  };
  
  const prefix = rolePrefixes[role] || 'STA';
  
  // Format: PREFIX-YYYYMMDD-XXXXXX
  // Example: DOC-20240607-AB12CD
  return `${prefix}-${date}-${random}`;
}

module.exports = generateStaffId; 
