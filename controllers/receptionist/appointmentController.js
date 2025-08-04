const Appointment = require('../../models/receptionist/appointment');
const User = require('../../models/admin/admin');
const crypto = require('crypto');
const ApiResponse = require('../../utils/apiResponse');
const { logHelper } = require('../../utils/logger');
const { asyncHandler } = require('../../middleware/errorHandler');

// Utility: Generate unique appointment ID
function generateAppointmentId() {
  return 'APT-' + crypto.randomBytes(4).toString('hex').toUpperCase();
}

// Utility: Get available time slots for a doctor on a date
async function getAvailableSlots(doctorId, date, slotsPerDay = 10) {
  const appointments = await Appointment.find({ doctorId, date, status: 'scheduled' });
  const bookedSlots = appointments.map(a => a.timeSlot);
  // Example slots: ["10:00-10:30", "10:30-11:00", ...]
  const allSlots = Array.from({ length: slotsPerDay }, (_, i) => {
    const hour = 10 + Math.floor(i / 2);
    const min = i % 2 === 0 ? '00' : '30';
    return `${hour}:${min}-${hour}:${min === '00' ? '30' : '00'}`;
  });
  return allSlots.filter(slot => !bookedSlots.includes(slot));
}

// Schedule Appointment
exports.scheduleAppointment = asyncHandler(async (req, res) => {
  const { patientId, doctorId, date, timeSlot, createdBy } = req.body;

  // Validate required fields
  if (!patientId || !doctorId || !date || !timeSlot || !createdBy) {
    return ApiResponse.error(res, 'All fields are required', 400);
  }

  // Convert Indian date format (DD/MM/YYYY) to ISO format for database storage
  const { convertIndianDateToISO } = require('../../utils/validation');
  const isoDate = convertIndianDateToISO(date);

  // Check doctor exists and is active
  const doctor = await User.findOne({ staffId: doctorId, role: 'doctor', isActive: true });
  if (!doctor) {
    return ApiResponse.notFound(res, 'Doctor not found or inactive');
  }

  // Check if slot is available
  const existing = await Appointment.findOne({ doctorId, date: isoDate, timeSlot, status: 'scheduled' });
  if (existing) {
    return ApiResponse.error(res, 'Time slot already booked', 409);
  }

  // Token: count existing appointments for the doctor on that date
  const count = await Appointment.countDocuments({ doctorId, date: isoDate, status: 'scheduled' });
  const token = count + 1;

  // If slots full, suggest next day
  if (token > 10) {
    return ApiResponse.error(res, 'All slots full for this date. Please choose another day.', 400);
  }

  const appointmentId = generateAppointmentId();

  const appointment = new Appointment({
    appointmentId,
    patientId,
    doctorId,
    date: isoDate,
    timeSlot,
    token,
    createdBy
  });

  await appointment.save();
  
  logHelper.info('Appointment scheduled', {
    appointmentId,
    patientId,
    doctorId,
    date: isoDate,
    timeSlot,
    token,
    createdBy
  });

  return ApiResponse.success(res, {
    appointmentId,
    token,
    appointment
  }, 'Appointment scheduled successfully', 201);
});

// Update Appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const updateData = { ...req.body };
    const appointment = await Appointment.findOneAndUpdate(
      { appointmentId },
      updateData,
      { new: true }
    );
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json({ message: 'Appointment updated', appointment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findOne({ appointmentId });
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List Appointments by Date
exports.listAppointmentsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const appointments = await Appointment.find({ date });
    res.json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Cancel Appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findOneAndUpdate(
      { appointmentId },
      { status: 'cancelled' },
      { new: true }
    );
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json({ message: 'Appointment cancelled', appointment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List Appointments by Patient
exports.listAppointmentsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId });
    res.json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List Appointments by Doctor
exports.listAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId });
    res.json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List Appointments by Status
exports.listAppointmentsByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const appointments = await Appointment.find({ status });
    res.json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
