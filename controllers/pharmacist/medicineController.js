const Medicine = require('../../models/pharmacist/medicine');

// Add New Medicine
exports.addMedicine = async (req, res) => {
  try {
    const { name, genericName, strength, expiry, dosage } = req.body;
    const medicine = new Medicine({ name, genericName, strength, expiry, dosage });
    await medicine.save();
    res.status(201).json({ message: 'Medicine added', medicine });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Medicine Details
exports.updateMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const updateData = { ...req.body };
    const medicine = await Medicine.findByIdAndUpdate(medicineId, updateData, { new: true });
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json({ message: 'Medicine updated', medicine });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Medicine by ID
exports.getMedicineById = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List All Medicines
exports.listAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deactivate Medicine
exports.deactivateMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const medicine = await Medicine.findByIdAndUpdate(medicineId, { isActive: false }, { new: true });
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json({ message: 'Medicine deactivated', medicine });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};