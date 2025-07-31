const express = require('express');
const router = express.Router();
const controller = require('../../controllers/pharmacist/medicineInventoryController');
const auth = require('../../middleware/auth');
const { addInventoryValidator, updateInventoryValidator } = require('../../validators/pharmacist/medicineInventoryValidators');
const { validationResult } = require('express-validator');

router.post(
  '/inventory/medicine',
  auth('pharmacist'),
  addInventoryValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  controller.addInventoryItem
);

router.put(
  '/inventory/medicine/:medicineStockId',
  auth('pharmacist'),
  updateInventoryValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  controller.updateInventoryQuantity
);


router.get('/inventory/medicine/:medicineId', auth(), controller.getInventoryByMedicineId);
router.get('/inventory/medicine', auth(), controller.listAllInventoryItems);
router.patch('/inventory/medicine/:medicineStockId/flag-low', auth('pharmacist'), controller.flagLowStock);

module.exports = router;