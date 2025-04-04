const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const Client = require('../models/client.model');

exports.register = async (req, res) => {
  const {
    full_name,
    email,
    password,
    role = 'client', // Mặc định role là client nếu không được gửi từ client
    phone,
    date_of_birth,
    gender,
    address,
  } = req.body;

  try {
    if (!full_name || !email || !password || !phone || !date_of_birth || !gender || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === 'admin') {
      const admin = new Admin({ email, password: hashedPassword });
      await admin.save();
    } else {
      const client = new Client({
        full_name,
        email,
        password: hashedPassword,
        phone,
        date_of_birth,
        gender,
        address,
      });
      await client.save();
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Chọn model dựa trên vai trò
    const UserModel = role === 'admin' ? Admin : Client;

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Tạo token JWT
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};