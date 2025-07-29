// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const validators = require('../validators/adminValidators');
const { validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post('/', validators.adminValidators, handleValidation, controller.addAdmin);
router.put('/:adminId', validators.adminValidators, handleValidation, controller.updateAdmin);
router.get('/:adminId', controller.getAdmin);
router.get('/', controller.listAdmins);
router.delete('/:adminId', controller.deleteAdmin);

module.exports = router;
