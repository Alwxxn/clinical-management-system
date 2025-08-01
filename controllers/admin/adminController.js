const bcrypt = require('bcryptjs');
const User = require('../../models/admin/admin');

// ========== ADMIN ==========
exports.createFirstAdmin = async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists. Use regular staff creation.' });
    }

    const { name, dob, gender, phone, address, email, password } = req.body;
    const role = 'admin';

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      name,
      dob,
      gender,
      phone,
      address,
      email,
      role,
      password: hashedPassword
    });

    await admin.save();
    res.status(201).json({ message: 'First admin created successfully', adminId: admin.staffId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ========== COMMON CREATE HANDLER ==========
const createUser = async (req, res, forcedRole = null) => {
  try {
    const {
      name, dob, gender, phone, address,
      email, role, specialisation, workingDays, fee, password
    } = req.body;

    const finalRole = forcedRole || role;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      dob,
      gender,
      phone,
      address,
      email,
      role: finalRole,
      specialisation,
      workingDays,
      fee,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: `${finalRole} created successfully`, userId: newUser.staffId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// STAFF
exports.createStaff = (req, res) => createUser(req, res);
exports.updateStaff = async (req, res) => {
  try {
    const { staffId } = req.params;
    const updateData = { ...req.body };
    delete updateData.password;

    const user = await User.findOneAndUpdate({ staffId }, updateData, { new: true });
    if (!user) return res.status(404).json({ error: 'Staff not found' });

    res.json({ message: 'Staff updated successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getStaffById = async (req, res) => {
  try {
    const { staffId } = req.params;
    const user = await User.findOne({ staffId }).select('-password');
    if (!user) return res.status(404).json({ error: 'Staff not found' });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listAllStaff = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deactivateStaff = async (req, res) => {
  try {
    const { staffId } = req.params;
    const user = await User.findOneAndUpdate({ staffId }, { isActive: false }, { new: true });
    if (!user) return res.status(404).json({ error: 'Staff not found' });

    res.json({ message: 'Staff deactivated', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DOCTOR
exports.createDoctor = (req, res) => createUser(req, res, 'doctor');

exports.updateDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const updateData = { ...req.body };
    delete updateData.password;

    const doctor = await User.findOneAndUpdate({ staffId: doctorId, role: 'doctor' }, updateData, { new: true });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    res.json({ message: 'Doctor profile updated', doctor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await User.findOne({ staffId: doctorId, role: 'doctor' }).select('-password');
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-password');
    res.json(doctors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deactivateDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await User.findOneAndUpdate(
      { staffId: doctorId, role: 'doctor' },
      { isActive: false },
      { new: true }
    );
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    res.json({ message: 'Doctor deactivated', doctor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
