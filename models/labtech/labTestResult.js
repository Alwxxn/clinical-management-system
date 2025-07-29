const mongoose = require('mongoose');

const labTestResultSchema = new mongoose.Schema({
  labTestPrescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'LabTestPrescription', required: true, unique: true },
  appointmentId: { type: String, required: true },
  patientId: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  results: [
    {
      testName: { type: String, required: true },
      highRange: { type: String },
      lowRange: { type: String },
      actualReading: { type: String, required: true },
      observation: { type: String }
    }
  ],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('LabTestResult', labTestResultSchema);