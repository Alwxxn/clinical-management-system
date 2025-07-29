const mongoose = require('mongoose');

const labTestPrescriptionSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true, unique: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: String, required: true },
  tests: [
    {
      testName: { type: String, required: true },
      notes: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('LabTestPrescription', labTestPrescriptionSchema);