const mongoose = require('mongoose');

const labTestPrescriptionSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true, unique: true },
  doctorId: { type: String, required: true }, // Using staffId instead of ObjectId
  patientId: { type: String, required: true },
  tests: [
    {
      testName: { type: String, required: true },
      notes: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('LabTestPrescription', labTestPrescriptionSchema);
