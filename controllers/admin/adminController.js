const bcrypt = require('bcryptjs');
const User = require('../../models/admin/admin');

// Create First Admin (no auth required)
exports.createFirstAdmin = async (req, res) => {
  try {
    // Check if any admin exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists. Use regular staff creation.' });
    }

    const { name, dob, gender, phone, address, email, password } = req.body;
    const role = 'admin'; // Force role to admin

    // Hash password
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
    res.status(201).json({ message: 'First admin created successfully', adminId: admin._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createStaff = async (req, res) => {
  try {
    const { name, dob, gender, phone, address, email, role, specialisation, workingDays, fee, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      dob,
      gender,
      phone,
      address,
      email,
      role,
      specialisation,
      workingDays,
      fee,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'Staff created successfully', userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Staff
exports.updateStaff = async (req, res) => {
    try {
      const { staffId } = req.params;
      const updateData = { ...req.body };
      // Prevent role or password change here unless explicitly allowed
      delete updateData.password;
      const user = await User.findByIdAndUpdate(staffId, updateData, { new: true });
      if (!user) return res.status(404).json({ error: 'Staff not found' });
      res.json({ message: 'Staff updated', user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Get Staff by ID
  exports.getStaffById = async (req, res) => {
    try {
      const { staffId } = req.params;
      const user = await User.findById(staffId).select('-password');
      if (!user) return res.status(404).json({ error: 'Staff not found' });
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // List All Staff
  exports.listAllStaff = async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Deactivate Staff
  exports.deactivateStaff = async (req, res) => {
    try {
      const { staffId } = req.params;
      const user = await User.findByIdAndUpdate(staffId, { isActive: false }, { new: true });
      if (!user) return res.status(404).json({ error: 'Staff not found' });
      res.json({ message: 'Staff deactivated', user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  exports.createDoctor = async (req, res) => {
    try {
      const { name, dob, gender, phone, address, email, specialisation, workingDays, fee, password } = req.body;
      const role = 'doctor';
  
      const hashedPassword = await require('bcryptjs').hash(password, 10);
  
      const doctor = new User({
        name,
        dob,
        gender,
        phone,
        address,
        email,
        role,
        specialisation,
        workingDays,
        fee,
        password: hashedPassword
      });
  
      await doctor.save();
      res.status(201).json({ message: 'Doctor profile created', doctorId: doctor._id });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Update Doctor Profile
  exports.updateDoctor = async (req, res) => {
    try {
      const { doctorId } = req.params;
      const updateData = { ...req.body };
      delete updateData.password;
      const doctor = await User.findOneAndUpdate(
        { _id: doctorId, role: 'doctor' },
        updateData,
        { new: true }
      );
      if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
      res.json({ message: 'Doctor updated', doctor });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Get Doctor by ID
  exports.getDoctorById = async (req, res) => {
    try {
      const { doctorId } = req.params;
      const doctor = await User.findOne({ _id: doctorId, role: 'doctor' }).select('-password');
      if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
      res.json(doctor);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // List All Doctors
  exports.listAllDoctors = async (req, res) => {
    try {
      const doctors = await User.find({ role: 'doctor' }).select('-password');
      res.json(doctors);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Deactivate Doctor
  exports.deactivateDoctor = async (req, res) => {
    try {
      const { doctorId } = req.params;
      const doctor = await User.findOneAndUpdate(
        { _id: doctorId, role: 'doctor' },
        { isActive: false },
        { new: true }
      );
      if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
      res.json({ message: 'Doctor deactivated', doctor });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };