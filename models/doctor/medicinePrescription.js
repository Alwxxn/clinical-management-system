const mongoose = require('mongoose');

const medicinePrescriptionSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true, unique: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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