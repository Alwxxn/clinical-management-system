const express = require('express');
const router = express.Router();
const controller = require('../../controllers/receptionist/reportingController');
const auth = require('../../middleware/auth');

router.get('/reports/consultations', auth(['admin', 'receptionist']), controller.consultationsReport);
router.get('/reports/transactions', auth(['admin', 'receptionist']), controller.transactionsReport);

module.exports = router;