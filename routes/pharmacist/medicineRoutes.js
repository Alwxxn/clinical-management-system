const express = require('express');
const router = express.Router();
const controller = require('../../controllers/pharmacist/medicineController');
const auth = require('../../middleware/auth');
const { createMedicineValidator, updateMedicineValidator } = require('../../validators/pharmacist/medicineValidators');
const { validationResult } = require('express-validator');

router.post(
  '/medicines',
  auth('pharmacist'),
  createMedicineValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  controller.addMedicine
);

router.put(
  '/medicines/:medicineId',
  auth('pharmacist'),
  updateMedicineValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  controller.updateMedicine
);

router.get('/medicines/:medicineId', auth(), controller.getMedicineById);
router.get('/medicines', auth(), controller.listAllMedicines);
router.patch('/medicines/:medicineId/deactivate', auth('pharmacist'), controller.deactivateMedicine);

module.exports = router;