const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    required: true,
    match: [/.+\@.+\.com$/, 'Email must be valid and end with .com'],
    unique: true
  },
  role: {
    type: String,
    enum: ['admin', 'doctor', 'receptionist', 'pharmacist', 'labtech'],
    required: true
  },
  specialisation: { type: String }, // for doctors
  workingDays: [{ type: String }], // e.g., ['Monday', 'Tuesday']
  fee: { type: Number }, // for doctors
  password: { type: String, required: true },
  staffId: { type: String, unique: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Age validation
userSchema.pre('save', async function (next) {
  const today = new Date();
  const dob = new Date(this.dob);
  const age = today.getFullYear() - dob.getFullYear();

  if (this.role === 'doctor' && age < 25) {
    return next(new Error('Doctor must be at least 25 years old'));
  }
  if (['admin', 'receptionist', 'pharmacist', 'labtech'].includes(this.role) && age < 18) {
    return next(new Error('Staff must be at least 18 years old'));
  }

  if (!this.staffId) {
    const prefixMap = {
      admin: 'admin',
      doctor: 'doc',
      receptionist: 'rec',
      pharmacist: 'ph',
      labtech: 'lab'
    };

    const role = this.role?.toLowerCase();
    const prefix = prefixMap[role] || 'stf';

    const User = mongoose.model('User');

    const count = await User.countDocuments({
      staffId: { $regex: `^${prefix}` }
    });

    this.staffId = `${prefix}${(count + 1).toString().padStart(3, '0')}`;
  }

  next();
});


module.exports = mongoose.model('User', userSchema);