// models/labtech.js

const mongoose = require('mongoose');

// Lab Test Catalog Schema (List of lab tests)
const LabTestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  normalRange: String,       // e.g., "4.5-5.5 x10^6/uL"
  unit: String,              // e.g., "mg/dL", "IU/L"
  price: Number,
  createdAt: { type: Date, default: Date.now },
});

// Lab Test Request Schema (requested tests for patients)
const LabTestRequestSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  tests: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'LabTest', required: true }
  ],
  requestedBy: { type: String },           // Usually the doctor or receptionist who requested
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], default: 'Pending' },
  requestedDate: { type: Date, default: Date.now },
  completedDate: Date,
});

// Lab Test Result Schema (results entered by lab tech)
const LabTestResultSchema = new mongoose.Schema({
  testRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'LabTestRequest', required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'LabTest', required: true },
  resultValue: String,
  remarks: String,
  resultDate: { type: Date, default: Date.now },
});

const LabTest = mongoose.model('LabTest', LabTestSchema);
const LabTestRequest = mongoose.model('LabTestRequest', LabTestRequestSchema);
const LabTestResult = mongoose.model('LabTestResult', LabTestResultSchema);

module.exports = { LabTest, LabTestRequest, LabTestResult };