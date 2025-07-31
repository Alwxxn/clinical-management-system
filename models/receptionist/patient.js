const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  phone: {
    type: String,
    required: true,
    match: [/^\+91\d{10}$/, 'Phone number must be in format +911234567890'],
    unique: true
  },
  address: { type: String, required: true },
  email: {
    type: String,
    match: [/.+\@.+\.com$/, 'Email must be valid and end with .com'],
    required: false
  },
  patientId: { type: String, unique: true, required: true }, // Alphanumeric, generated
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);