// models/pharmacist.js

const mongoose = require('mongoose');

// Medication Schema
const MedicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: String,
  batchNumber: String,
  expiryDate: Date,
  quantityInStock: { type: Number, default: 0 },
  price: Number,
  createdAt: { type: Date, default: Date.now },
});

// Prescription Schema
const PrescriptionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  medicationList: [
    {
      medicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication', required: true },
      dosage: String,
      durationDays: Number,
      quantity: Number,
    }
  ],
  issueDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Dispensed', 'Cancelled'], default: 'Pending' },
});

// Inventory Transaction Schema (optional, for stock changes)
const InventoryTransactionSchema = new mongoose.Schema({
  medicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication', required: true },
  change: { type: Number, required: true }, // positive for addition, negative for reduction
  transactionType: { type: String, enum: ['Addition', 'Dispense'], required: true },
  transactionDate: { type: Date, default: Date.now },
  notes: String,
});

const Medication = mongoose.model('Medication', MedicationSchema);
const Prescription = mongoose.model('Prescription', PrescriptionSchema);
const InventoryTransaction = mongoose.model('InventoryTransaction', InventoryTransactionSchema);

module.exports = { Medication, Prescription, InventoryTransaction };