// controllers/doctorController.js

const { Doctor, AppointmentNote } = require('../models/doctor');

// --- DOCTOR CONTROLLERS ---

exports.addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(400).json({ error: err.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.doctorId, req.body, { new: true });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ active: true });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deactivateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.doctorId,
      { active: false },
      { new: true }
    );
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json({ message: 'Doctor deactivated', doctor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --- Appointment Notes ---

exports.addAppointmentNote = async (req, res) => {
  try {
    const note = new AppointmentNote({
      ...req.body,
      doctorId: req.params.doctorId,
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listAppointmentNotes = async (req, res) => {
  try {
    const notes = await AppointmentNote.find({ doctorId: req.params.doctorId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
