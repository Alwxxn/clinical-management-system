// controllers/labtechController.js

const { LabTest, LabTestRequest, LabTestResult } = require('../models/labtech');

// --- LAB TEST CATALOG ---

exports.addLabTest = async (req, res) => {
  try {
    const labTest = new LabTest(req.body);
    await labTest.save();
    res.status(201).json(labTest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateLabTest = async (req, res) => {
  try {
    const labTest = await LabTest.findByIdAndUpdate(req.params.testId, req.body, { new: true });
    if (!labTest) return res.status(404).json({ error: 'Lab test not found' });
    res.json(labTest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLabTest = async (req, res) => {
  try {
    const labTest = await LabTest.findById(req.params.testId);
    if (!labTest) return res.status(404).json({ error: 'Lab test not found' });
    res.json(labTest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listLabTests = async (req, res) => {
  try {
    const labTests = await LabTest.find({});
    res.json(labTests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- LAB TEST REQUESTS ---

exports.createLabTestRequest = async (req, res) => {
  try {
    const labTestRequest = new LabTestRequest(req.body);
    await labTestRequest.save();
    res.status(201).json(labTestRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateLabTestRequestStatus = async (req, res) => {
  try {
    const labTestRequest = await LabTestRequest.findByIdAndUpdate(
      req.params.requestId,
      { status: req.body.status, completedDate: req.body.completedDate },
      { new: true }
    );
    if (!labTestRequest) return res.status(404).json({ error: 'Lab test request not found' });
    res.json(labTestRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLabTestRequest = async (req, res) => {
  try {
    const request = await LabTestRequest.findById(req.params.requestId)
      .populate('tests')
      .populate('patientId');
    if (!request) return res.status(404).json({ error: 'Lab test request not found' });
    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listLabTestRequestsByPatient = async (req, res) => {
  try {
    const requests = await LabTestRequest.find({ patientId: req.params.patientId }).populate('tests');
    res.json(requests);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listLabTestRequestsByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    if (!status) return res.status(400).json({ error: 'Status query param required' });
    const requests = await LabTestRequest.find({ status }).populate('tests');
    res.json(requests);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --- LAB TEST RESULTS ---

exports.addLabTestResult = async (req, res) => {
  try {
    const labResult = new LabTestResult(req.body);
    await labResult.save();
    res.status(201).json(labResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLabTestResultsByRequest = async (req, res) => {
  try {
    const results = await LabTestResult.find({ testRequestId: req.params.requestId })
      .populate('testId');
    res.json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};