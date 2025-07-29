// controllers/pharmacistController.js

const { Medication, Prescription, InventoryTransaction } = require('../models/pharmacist');

// --- MEDICATIONS ---

exports.addMedication = async (req, res) => {
  try {
    const medication = new Medication(req.body);
    await medication.save();
    res.status(201).json(medication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateMedication = async (req, res) => {
  try {
    const medication = await Medication.findByIdAndUpdate(req.params.medicationId, req.body, { new: true });
    if (!medication) return res.status(404).json({ error: 'Medication not found' });
    res.json(medication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMedication = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.medicationId);
    if (!medication) return res.status(404).json({ error: 'Medication not found' });
    res.json(medication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listMedications = async (req, res) => {
  try {
    const medications = await Medication.find({});
    res.json(medications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- PRESCRIPTIONS ---

exports.createPrescription = async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(201).json(prescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(req.params.prescriptionId, req.body, { new: true });
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
    res.json(prescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.prescriptionId).populate('medicationList.medicationId patientId doctorId');
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
    res.json(prescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listPrescriptionsByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    if (!status) return res.status(400).json({ error: 'Status required' });
    const prescriptions = await Prescription.find({ status });
    res.json(prescriptions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --- INVENTORY TRANSACTIONS ---

exports.addInventoryTransaction = async (req, res) => {
  try {
    const transaction = new InventoryTransaction(req.body);
    await transaction.save();

    // Update medication stock accordingly
    const medication = await Medication.findById(transaction.medicationId);
    if (!medication) return res.status(404).json({ error: 'Medication not found' });

    medication.quantityInStock += transaction.change;
    await medication.save();

    res.status(201).json({ transaction, medication });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listInventoryTransactions = async (req, res) => {
  try {
    const transactions = await InventoryTransaction.find({}).populate('medicationId');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};