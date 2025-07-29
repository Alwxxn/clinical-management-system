// models/doctor.js

const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  specialization: String,
  email: { type: String, unique: true, required: true },
  phone: String,
  qualification: String,
  experienceYears: Number,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Optional: Doctor Appointment Notes Schema if needed
const AppointmentNoteSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
const AppointmentNote = mongoose.model('AppointmentNote', AppointmentNoteSchema);

module.exports = { Doctor, AppointmentNote };
