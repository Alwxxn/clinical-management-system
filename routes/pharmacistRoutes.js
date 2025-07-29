// routes/pharmacistRoutes.js

const express = require('express');
const router = express.Router();

const controller = require('../controllers/pharmacistController');
const validators = require('../validators/pharmacistValidators');
const { validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// --- Medications ---

router.post('/medications', validators.medicationValidators, handleValidation, controller.addMedication);
router.put('/medications/:medicationId', controller.updateMedication);
router.get('/medications/:medicationId', controller.getMedication);
router.get('/medications', controller.listMedications);

// --- Prescriptions ---

router.post('/prescriptions', validators.prescriptionValidators, handleValidation, controller.createPrescription);
router.put('/prescriptions/:prescriptionId', controller.updatePrescription);
router.get('/prescriptions/:prescriptionId', controller.getPrescription);
router.get('/prescriptions/status', controller.listPrescriptionsByStatus); // e.g., /prescriptions/status?status=Pending

// --- Inventory Transactions ---

router.post('/inventory', validators.inventoryTransactionValidators, handleValidation, controller.addInventoryTransaction);
router.get('/inventory', controller.listInventoryTransactions);

module.exports = router;