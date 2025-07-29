// models/user.js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: String,
  role: { type: String, enum: ['admin', 'doctor', 'receptionist', 'pharmacist', 'labtech'] },
});
module.exports = mongoose.model('User', UserSchema);
