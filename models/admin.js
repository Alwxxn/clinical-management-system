// models/admin.js

const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },  // Store hashed password
  email: { type: String, unique: true, required: true },
  fullName: String,
  role: { type: String, default: 'admin' }, // Could be extended to super-admin, etc.
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admin', AdminSchema);
