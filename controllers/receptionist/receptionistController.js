const Patient = require('../../models/receptionist/patient');
const generatePatientId = require('../../utils/generatePatientId');

exports.registerPatient = async (req, res) => {
  try {
    const { name, dob, gender, phone, address, email } = req.body;

    const patientId = generatePatientId();

    const patient = new Patient({
      name,
      dob,
      gender,
      phone,
      address,
      email,
      patientId
    });

    await patient.save();
    res.status(201).json({ message: 'Patient registered successfully', patientId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePatient = async (req, res) => {
    try {
      const { patientId } = req.params;
      const updateData = { ...req.body };
      const patient = await Patient.findOneAndUpdate(
        { patientId },
        updateData,
        { new: true }
      );
      if (!patient) return res.status(404).json({ error: 'Patient not found' });
      res.json({ message: 'Patient updated', patient });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Get Patient by ID
  exports.getPatientById = async (req, res) => {
    try {
      const { patientId } = req.params;
      const patient = await Patient.findOne({ patientId });
      if (!patient) return res.status(404).json({ error: 'Patient not found' });
      res.json(patient);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // List All Patients
  exports.listAllPatients = async (req, res) => {
    try {
      const patients = await Patient.find();
      res.json(patients);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Deactivate Patient
  exports.deactivatePatient = async (req, res) => {
    try {
      const { patientId } = req.params;
      const patient = await Patient.findOneAndUpdate(
        { patientId },
        { isActive: false },
        { new: true }
      );
      if (!patient) return res.status(404).json({ error: 'Patient not found' });
      res.json({ message: 'Patient deactivated', patient });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
