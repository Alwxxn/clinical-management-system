const MedicineInventory = require('../../models/pharmacist/medicineInventory');

// Add New Inventory Item
exports.addInventoryItem = async (req, res) => {
  try {
    const { medicineId, quantity } = req.body;
    const item = new MedicineInventory({ medicineId, quantity });
    await item.save();
    res.status(201).json({ message: 'Inventory item added', item });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Inventory Quantity
exports.updateInventoryQuantity = async (req, res) => {
  try {
    const { medicineStockId } = req.params;
    const { quantity } = req.body;
    const item = await MedicineInventory.findByIdAndUpdate(medicineStockId, { quantity }, { new: true });
    if (!item) return res.status(404).json({ error: 'Inventory item not found' });
    res.json({ message: 'Inventory updated', item });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Inventory by Medicine ID
exports.getInventoryByMedicineId = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const items = await MedicineInventory.find({ medicineId });
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List All Inventory Items
exports.listAllInventoryItems = async (req, res) => {
  try {
    const items = await MedicineInventory.find();
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Flag Low Stock
exports.flagLowStock = async (req, res) => {
  try {
    const { medicineStockId } = req.params;
    const item = await MedicineInventory.findByIdAndUpdate(medicineStockId, { lowStock: true }, { new: true });
    if (!item) return res.status(404).json({ error: 'Inventory item not found' });
    res.json({ message: 'Low stock flagged', item });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
