const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const Client = require('../models/client.model');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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
      return res.status(404).json({ message: 'Tài khoản chưa được đăng ký. Vui lòng đăng ký tài khoản và thử lại !' });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mật khẩu không hợp lệ' });
    }

    // Tạo token JWT
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Client.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Tạo mã OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 chữ số
    user.otp = otp;
    user.otp_expires = Date.now() + 10 * 60 * 1000; // OTP hết hạn sau 10 phút
    await user.save();

    // Gửi email chứa mã OTP
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: 'Your OTP for Password Reset',
      html: `<p>Your OTP for password reset is <b>${otp}</b>. This OTP will expire in 10 minutes.</p>`,
    });

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await Client.findOne({ email, otp, otp_expires: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Client.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.otp = undefined;
    user.otp_expires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};