const multer = require('multer');
const path = require('path');
const Client = require('../models/client.model');

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../assets/avatars')); // Lưu ảnh vào thư mục assets/avatars
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix); // Đặt tên file duy nhất
  },
});

const upload = multer({ storage });

exports.uploadAvatar = [
  upload.single('profile_picture'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const filePath = `/assets/avatars/${req.file.filename}`; // Đường dẫn ảnh
      const user = await Client.findByIdAndUpdate(
        req.user.id,
        { profile_picture: filePath },
        { new: true }
      );

      res.status(200).json({ message: 'Avatar uploaded successfully', profile_picture: filePath });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      res.status(500).json({ message: 'Failed to upload avatar' });
    }
  },
];

exports.getProfile = async (req, res) => {
  try {
    const user = await Client.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      ...user.toObject(),
      date_of_birth: user.date_of_birth ? user.date_of_birth.toISOString().split('T')[0] : '', // Định dạng ngày
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { full_name, phone, date_of_birth, gender, address, medical_history } = req.body;

  try {
    const user = await Client.findByIdAndUpdate(
      req.user.id,
      {
        full_name,
        phone,
        date_of_birth: date_of_birth || null, // Gán null nếu không có ngày sinh
        gender,
        address,
        medical_history,
        updated_at: Date.now(),
      },
      { new: true } // Trả về dữ liệu sau khi cập nhật
    );

    res.status(200).json({
      ...user.toObject(),
      date_of_birth: user.date_of_birth ? user.date_of_birth.toISOString().split('T')[0] : '', // Định dạng ngày
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};