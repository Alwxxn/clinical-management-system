const Consultation = require('../../models/doctor/consultation');

// Add Consultation Note
exports.addConsultation = async (req, res) => {
  try {
    const { appointmentId, doctorId, patientId, symptoms, diagnosis, notes, prescription, medicine, labTest } = req.body;
    const existing = await Consultation.findOne({ appointmentId });
    if (existing) return res.status(400).json({ error: 'Consultation already exists for this appointment' });

    const consultation = new Consultation({
      appointmentId,
      doctorId,
      patientId,
      symptoms,
      diagnosis,
      notes,
      prescription,
      medicine,
      labTest
    });

    await consultation.save();
    res.status(201).json({ message: 'Consultation note added', consultation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Consultation Note
exports.updateConsultation = async (req, res) => {
  try {
    const { consultationId } = req.params;
    const updateData = { ...req.body };
    const consultation = await Consultation.findByIdAndUpdate(consultationId, updateData, { new: true });
    if (!consultation) return res.status(404).json({ error: 'Consultation not found' });
    res.json({ message: 'Consultation updated', consultation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Consultation Note by Appointment ID
exports.getConsultationByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const consultation = await Consultation.findOne({ appointmentId });
    if (!consultation) return res.status(404).json({ error: 'Consultation not found' });
    res.json(consultation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List Consultation Notes by Doctor
exports.listConsultationsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const consultations = await Consultation.find({ doctorId });
    res.json(consultations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List Consultation Notes by Patient
exports.listConsultationsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const consultations = await Consultation.find({ patientId });
    res.json(consultations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List Consultation History by Appointment ID
exports.getConsultationHistoryByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const consultation = await Consultation.findOne({ appointmentId });
    if (!consultation) return res.status(404).json({ error: 'Consultation not found' });
    res.json(consultation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
