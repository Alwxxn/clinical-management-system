const LabTestResult = require('../../models/labtech/labTestResult');

// Create Lab Test Result (new method)
exports.createLabTestResult = async (req, res) => {
  try {
    const { appointmentId, patientId, testName, testResult, testDate, notes } = req.body;

    const labTestResult = new LabTestResult({
      appointmentId,
      patientId,
      testName,
      testResult,
      testDate,
      notes
    });

    await labTestResult.save();
    res.status(201).json({ message: 'Lab test result created successfully', labTestResult });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Record Lab Test Result
exports.recordLabTestResult = async (req, res) => {
  try {
    const { labTestPrescriptionId } = req.params;
    const { appointmentId, patientId, doctorId, date, results } = req.body;

    let labTestResult = await LabTestResult.findOne({ labTestPrescriptionId });
    if (labTestResult) {
      // Update existing
      labTestResult.results = results;
      labTestResult.date = date;
      labTestResult.isActive = true;
      await labTestResult.save();
      return res.json({ message: 'Lab test result updated', labTestResult });
    }

    // Create new
    labTestResult = new LabTestResult({
      labTestPrescriptionId,
      appointmentId,
      patientId,
      doctorId,
      date,
      results
    });
    await labTestResult.save();
    res.status(201).json({ message: 'Lab test result recorded', labTestResult });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Lab Test Result by Appointment ID
exports.getLabTestResultByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const result = await LabTestResult.findOne({ appointmentId });
    if (!result) return res.status(404).json({ error: 'Lab test result not found' });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List Lab Test Results by Date Range
exports.listLabTestResultsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const results = await LabTestResult.find({
      date: { $gte: startDate, $lte: endDate }
    });
    res.json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deactivate Lab Test Prescription
exports.deactivateLabTestPrescription = async (req, res) => {
  try {
    const { labTestPrescriptionId } = req.params;
    const result = await LabTestResult.findOneAndUpdate(
      { labTestPrescriptionId },
      { isActive: false },
      { new: true }
    );
    if (!result) return res.status(404).json({ error: 'Lab test result not found' });
    res.json({ message: 'Lab test result deactivated', result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};