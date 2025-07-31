const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true, unique: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: String, required: true },
  symptoms: { type: String, required: true },
  diagnosis: { type: String, required: true },
  notes: { type: String },
  prescription: { type: String }, // Will link to prescription module later
  medicine: { type: String },     // Will link to prescription module later
  labTest: { type: String },      // Will link to lab test module later
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Consultation', consultationSchema);