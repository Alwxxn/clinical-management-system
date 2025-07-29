// routes/labtechRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/labtechController');
const validators = require('../validators/labtechValidators');
const { validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// --- Lab Tests (test catalog) ---
router.post('/labtests', validators.labTestValidator, handleValidation, controller.addLabTest);
router.put('/labtests/:testId', controller.updateLabTest);
router.get('/labtests/:testId', controller.getLabTest);
router.get('/labtests', controller.listLabTests);

// --- Lab Test Requests ---
router.post('/testrequests', validators.labTestRequestValidator, handleValidation, controller.createLabTestRequest);
router.put('/testrequests/:requestId/status', validators.updateTestRequestStatusValidator, handleValidation, controller.updateLabTestRequestStatus);
router.get('/testrequests/:requestId', controller.getLabTestRequest);
router.get('/testrequests/patient/:patientId', controller.listLabTestRequestsByPatient);
router.get('/testrequests/status', controller.listLabTestRequestsByStatus); // e.g. /testrequests/status?status=Pending

// --- Lab Test Results ---
router.post('/testresults', validators.addLabTestResultValidator, handleValidation, controller.addLabTestResult);
router.get('/testresults/request/:requestId', controller.getLabTestResultsByRequest);

module.exports = router;