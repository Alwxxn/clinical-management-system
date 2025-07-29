// controllers/adminController.js

const Admin = require('../models/admin');
const bcrypt = require('bcrypt');

// --- ADMIN CONTROLLERS ---

exports.addAdmin = async (req, res) => {
  try {
    const { password, ...adminData } = req.body;
    if (!password) return res.status(400).json({ error: "Password is required" });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const admin = new Admin({
      ...adminData,
      passwordHash,
    });
    await admin.save();
    res.status(201).json({ message: 'Admin created', adminId: admin._id });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Username or Email already exists" });
    }
    res.status(400).json({ error: err.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    if (password) {
      const saltRounds = 10;
      updateData.passwordHash = await bcrypt.hash(password, saltRounds);
    }
    const admin = await Admin.findByIdAndUpdate(req.params.adminId, updateData, { new: true });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    res.json({ message: 'Admin updated', admin });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.adminId).select('-passwordHash');
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-passwordHash');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.adminId);
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
