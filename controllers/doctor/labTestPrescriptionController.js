const LabTestPrescription = require('../../models/doctor/labTestPrescription');

// Create Lab Test Prescription
exports.createLabTestPrescription = async (req, res) => {
  try {
    const { appointmentId, doctorId, patientId, tests } = req.body;
    const existing = await LabTestPrescription.findOne({ appointmentId });
    if (existing) return res.status(400).json({ error: 'Lab test prescription already exists for this appointment' });

    const prescription = new LabTestPrescription({
      appointmentId,
      doctorId,
      patientId,
      tests
    });

    await prescription.save();
    res.status(201).json({ message: 'Lab test prescription created', prescription });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Lab Test Prescription
exports.updateLabTestPrescription = async (req, res) => {
  try {
    const { prescriptionId } = req.params;
    const updateData = { ...req.body };
    const prescription = await LabTestPrescription.findByIdAndUpdate(prescriptionId, updateData, { new: true });
    if (!prescription) return res.status(404).json({ error: 'Lab test prescription not found' });
    res.json({ message: 'Lab test prescription updated', prescription });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Lab Test Prescription by Appointment ID
exports.getLabTestPrescriptionByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const prescription = await LabTestPrescription.findOne({ appointmentId });
    if (!prescription) return res.status(404).json({ error: 'Lab test prescription not found' });
    res.json(prescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List Lab Test Prescriptions by Patient
exports.listLabTestPrescriptionsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const prescriptions = await LabTestPrescription.find({ patientId });
    res.json(prescriptions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};