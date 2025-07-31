const Appointment = require('../../models/receptionist/appointment');

// Total consultations for a day/any day, filter by doctor
exports.consultationsReport = async (req, res) => {
  try {
    const { date, doctorId } = req.query;
    let filter = {};
    if (date) filter.date = date;
    if (doctorId) filter.doctorId = doctorId;
    filter.status = 'completed';

    const consultations = await Appointment.find(filter);
    res.json({
      totalConsultations: consultations.length,
      consultations
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Total transactions for a day/any day
const Billing = require('../../models/receptionist/billing');
exports.transactionsReport = async (req, res) => {
  try {
    const { date } = req.query;
    let filter = {};
    if (date) filter.date = date;
    filter.status = 'paid';

    const bills = await Billing.find(filter);
    const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
    res.json({
      totalTransactions: bills.length,
      totalAmount,
      bills
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};