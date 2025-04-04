const Client = require('../models/client.model');

// Lấy thông tin chi tiết người dùng
exports.getUserDetails = async (req, res) => {
  try {
    const user = await Client.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin người dùng
exports.updateUserDetails = async (req, res) => {
  const { full_name, phone, date_of_birth, gender, address, medical_history, favorite_drugs, profile_picture } = req.body;

  try {
    const user = await Client.findByIdAndUpdate(
      req.user.id,
      {
        full_name,
        phone,
        date_of_birth,
        gender,
        address,
        medical_history,
        favorite_drugs,
        profile_picture,
        updated_at: Date.now()
      },
      { new: true }
    );

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};