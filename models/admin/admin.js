const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  phone: {
    type: String,
    required: true,
    match: [/^\+91[6-9]\d{9}$/, 'Phone number must be in format +916789012345 (Indian mobile number starting with 6,7,8,9)'],
    unique: true
  },
  address: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email must be in valid format'],
    unique: true
  },
  role: {
    type: String,
    enum: ['admin', 'doctor', 'receptionist', 'pharmacist', 'labtech'],
    required: true
  },
  staffId: { type: String, unique: true, required: true }, // Custom staff ID
  specialisation: { type: String }, // for doctors
  workingDays: [{ type: String }], // e.g., ['Monday', 'Tuesday']
  fee: { type: Number }, // for doctors
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Enhanced age validation
userSchema.pre('save', function (next) {
  const { calculateAge } = require('../../utils/validation');
  const age = calculateAge(this.dob);
  
  if (this.role === 'doctor' && age < 25) {
    return next(new Error('Doctor must be at least 25 years old'));
  }
  if (['admin', 'receptionist', 'pharmacist', 'labtech'].includes(this.role) && age < 18) {
    return next(new Error('Staff must be at least 18 years old'));
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
