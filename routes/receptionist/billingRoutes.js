const express = require('express');
const router = express.Router();
const controller = require('../../controllers/receptionist/billingController');
const auth = require('../../middleware/auth');
const { createBillingValidator, updateBillingValidator } = require('../../validators/receptionist/billingValidators');
const { validationResult } = require('express-validator');

router.post(
  '/billing',
  auth(['receptionist', 'admin']),
  createBillingValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  controller.generateBill
);

router.put(
  '/billing/:appointmentId',
  auth(['receptionist', 'admin']),
  updateBillingValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  controller.updateBill
);


router.get('/billing/:appointmentId', auth(), controller.getBillByAppointmentId);
router.get('/billing', auth(), controller.listBillsByDateRange);

module.exports = router;