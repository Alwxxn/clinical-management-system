const mongoose = require('mongoose');

const medicineInventorySchema = new mongoose.Schema({
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  quantity: { type: Number, required: true },
  lowStock: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('MedicineInventory', medicineInventorySchema);