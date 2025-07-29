// models/receptionist.js

const mongoose = require('mongoose');

// Patient Schema
const PatientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  dob: Date,
  gender: String,
  contactNumber: String,
  email: String,
  address: String,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Appointment Schema
const AppointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: String, required: true }, // Store doctor name or id
  appointmentDate: { type: Date, required: true },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
  reason: String,
  createdAt: { type: Date, default: Date.now },
});

// Billing Schema
const BillingSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  amount: { type: Number, required: true },
  paid: { type: Boolean, default: false },
  paidDate: Date,
  createdAt: { type: Date, default: Date.now },
});

const Patient = mongoose.model('Patient', PatientSchema);
const Appointment = mongoose.model('Appointment', AppointmentSchema);
const Billing = mongoose.model('Billing', BillingSchema);

module.exports = { Patient, Appointment, Billing };
