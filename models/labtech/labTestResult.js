const mongoose = require('mongoose');

const labTestResultSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true },
  patientId: { type: String, required: true },
  testName: { type: String, required: true },
  testResult: { type: String, required: true },
  testDate: { type: String, required: true }, // YYYY-MM-DD
  notes: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('LabTestResult', labTestResultSchema);