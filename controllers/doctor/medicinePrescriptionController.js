const MedicinePrescription = require('../../models/doctor/medicinePrescription');

// Create Medicine Prescription
exports.createMedicinePrescription = async (req, res) => {
  try {
    const { appointmentId, doctorId, patientId, medicines, notes } = req.body;
    const existing = await MedicinePrescription.findOne({ appointmentId });
    if (existing) return res.status(400).json({ error: 'Prescription already exists for this appointment' });

    const prescription = new MedicinePrescription({
      appointmentId,
      doctorId,
      patientId,
      medicines,
      notes
    });

    await prescription.save();
    res.status(201).json({ message: 'Medicine prescription created', prescription });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Medicine Prescription
exports.updateMedicinePrescription = async (req, res) => {
  try {
    const { prescriptionId } = req.params;
    const updateData = { ...req.body };
    const prescription = await MedicinePrescription.findByIdAndUpdate(prescriptionId, updateData, { new: true });
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
    res.json({ message: 'Prescription updated', prescription });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Prescription by Appointment ID
exports.getPrescriptionByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const prescription = await MedicinePrescription.findOne({ appointmentId });
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
    res.json(prescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List Prescriptions by Patient
exports.listPrescriptionsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const prescriptions = await MedicinePrescription.find({ patientId });
    res.json(prescriptions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
