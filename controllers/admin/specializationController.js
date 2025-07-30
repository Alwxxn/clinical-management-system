const Specialization = require('../../models/admin/specialization');

exports.addSpecialization = async (req, res) => {
  try {
    const { name } = req.body;
    const specialization = new Specialization({ name });
    await specialization.save();
    res.status(201).json({ message: 'Specialization added', specialization });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateSpecialization = async (req, res) => {
  try {
    const { specializationId } = req.params;
    const { name } = req.body;
    const specialization = await Specialization.findByIdAndUpdate(specializationId, { name }, { new: true });
    if (!specialization) return res.status(404).json({ error: 'Specialization not found' });
    res.json({ message: 'Specialization updated', specialization });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSpecializationById = async (req, res) => {
  try {
    const { specializationId } = req.params;
    const specialization = await Specialization.findById(specializationId);
    if (!specialization) return res.status(404).json({ error: 'Specialization not found' });
    res.json(specialization);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listSpecializations = async (req, res) => {
  try {
    const specializations = await Specialization.find();
    res.json(specializations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};