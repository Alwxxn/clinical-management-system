const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  appointmentId: { type: String, unique: true, required: true },
  patientId: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  timeSlot: { type: String, required: true }, // e.g., "10:00-10:30"
  token: { type: Number, required: true },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  createdBy: { type: String, required: true }, // 'receptionist' or 'patient'
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);