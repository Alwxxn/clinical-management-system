const express = require('express');
const router = express.Router();
const specializationController = require('../../controllers/admin/specializationController');
const auth = require('../../middleware/auth');

router.post('/specializations', auth('admin'), specializationController.addSpecialization);
router.put('/specializations/:specializationId', auth('admin'), specializationController.updateSpecialization);
router.get('/specializations/:specializationId', auth('admin'), specializationController.getSpecializationById);
router.get('/specializations', auth('admin'), specializationController.listSpecializations);

module.exports = router;