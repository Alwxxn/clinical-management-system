const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true, unique: true },
  patientId: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  amount: { type: Number, required: true },
  status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  details: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Billing', billingSchema);