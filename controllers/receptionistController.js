// controllers/receptionistController.js

const { Patient, Appointment, Billing } = require('../models/receptionist');

// --- PATIENT CONTROLLERS ---

exports.registerPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.patientId, req.body, { new: true });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ active: true });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deactivatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.patientId,
      { active: false },
      { new: true }
    );
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json({ message: 'Patient deactivated', patient });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --- APPOINTMENT CONTROLLERS ---

exports.scheduleAppointment = async (req, res) => {
  try {
    const appt = new Appointment(req.body);
    await appt.save();
    res.status(201).json(appt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndUpdate(req.params.appointmentId, req.body, { new: true });
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.appointmentId);
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      { status: 'Cancelled' },
      { new: true }
    );
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    res.json({ message: 'Appointment cancelled', appt });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listAppointmentsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "date param required (YYYY-MM-DD)" });
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(start.getDate() + 1);
    const appts = await Appointment.find({
      appointmentDate: { $gte: start, $lt: end }
    });
    res.json(appts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listAppointmentsByPatient = async (req, res) => {
  try {
    const appts = await Appointment.find({ patient: req.params.patientId });
    res.json(appts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listAppointmentsByDoctor = async (req, res) => {
  try {
    const appts = await Appointment.find({ doctor: req.params.doctorId });
    res.json(appts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listAppointmentsByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    if (!status) return res.status(400).json({ error: 'Status is required' });
    const appts = await Appointment.find({ status });
    res.json(appts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --- BILLING CONTROLLERS ---

exports.generateBill = async (req, res) => {
  try {
    const bill = new Billing(req.body);
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBill = async (req, res) => {
  try {
    const bill = await Billing.findOneAndUpdate(
      { appointment: req.params.appointmentId },
      req.body,
      { new: true }
    );
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    res.json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBill = async (req, res) => {
  try {
    const bill = await Billing.findOne({ appointment: req.params.appointmentId });
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    res.json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listBillsByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) return res.status(400).json({ error: 'startDate and endDate required' });
    const bills = await Billing.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });
    res.json(bills);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
