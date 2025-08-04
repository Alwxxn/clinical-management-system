const mongoose = require('mongoose');

const medicinePrescriptionSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true, unique: true },
  doctorId: { type: String, required: true }, // Using staffId instead of ObjectId
  patientId: { type: String, required: true },
  medicines: [
    {
      name: { type: String, required: true },
      genericName: { type: String },
      quantity: { type: Number, required: true },
      strength: { type: String },
      dosage: { type: String },
      expiry: { type: String }
    }
  ],
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('MedicinePrescription', medicinePrescriptionSchema);
