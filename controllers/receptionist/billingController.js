const Billing = require('../../models/receptionist/billing');

// Generate Appointment Bill
exports.generateBill = async (req, res) => {
  try {
    const { appointmentId, patientId, doctorId, date, amount, details } = req.body;
    const existing = await Billing.findOne({ appointmentId });
    if (existing) return res.status(400).json({ error: 'Bill already exists for this appointment' });

    const bill = new Billing({
      appointmentId,
      patientId,
      doctorId,
      date,
      amount,
      details
    });

    await bill.save();
    res.status(201).json({ message: 'Bill generated', bill });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Appointment Bill
exports.updateBill = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const updateData = { ...req.body };
    const bill = await Billing.findOneAndUpdate({ appointmentId }, updateData, { new: true });
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    res.json({ message: 'Bill updated', bill });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Bill by Appointment ID
exports.getBillByAppointmentId = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const bill = await Billing.findOne({ appointmentId });
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    res.json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List Bills by Date Range
exports.listBillsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const bills = await Billing.find({
      date: { $gte: startDate, $lte: endDate }
    });
    res.json(bills);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};