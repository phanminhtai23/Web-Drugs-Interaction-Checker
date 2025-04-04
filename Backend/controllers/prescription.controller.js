const Prescription = require('../models/prescription.model');

// Lấy danh sách đơn thuốc của người dùng
exports.getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ user_id: req.user.id });
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm đơn thuốc mới
exports.addPrescription = async (req, res) => {
  const { doctor_name, hospital, medications } = req.body;

  try {
    const prescription = new Prescription({
      user_id: req.user.id,
      doctor_name,
      hospital,
      medications
    });

    await prescription.save();
    res.status(201).json({ message: 'Prescription added successfully', prescription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa đơn thuốc
exports.deletePrescription = async (req, res) => {
  try {
    await Prescription.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};