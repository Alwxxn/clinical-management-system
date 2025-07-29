const crypto = require('crypto');

function generatePatientId() {
  // Example: PAT-20240607-AB12CD
  const date = new Date().toISOString().slice(0,10).replace(/-/g, '');
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `PAT-${date}-${random}`;
}

module.exports = generatePatientId;