const Role = require('../../models/admin/role');

exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = new Role({ name });
    await role.save();
    res.status(201).json({ message: 'Role created', role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { name } = req.body;
    const role = await Role.findByIdAndUpdate(roleId, { name }, { new: true });
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json({ message: 'Role updated', role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const { roleId } = req.params;
    const role = await Role.findById(roleId);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deactivateRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const role = await Role.findByIdAndUpdate(roleId, { isActive: false }, { new: true });
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json({ message: 'Role deactivated', role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};