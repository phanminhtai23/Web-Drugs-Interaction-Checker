const nodemailer = require('nodemailer');

exports.sendContactMessage = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  try {
    if (!name || !email || !message || !subject) {
      return res.status(400).json({ message: 'Tất cả các trường là bắt buộc.' });
    }

    // Gửi email từ người dùng đến Gmail của web
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Gmail cố định của web
        pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng Gmail
      },
    });

    await transporter.sendMail({
      from: email, // Gmail của người dùng
      to: process.env.EMAIL_USER, // Gmail cố định của web
      subject: `Phản hồi từ người dùng: ${subject}`,
      text: `Tên: ${name}\nEmail: ${email}\nSố điện thoại: ${phone || 'Không cung cấp'}\n\nTin nhắn:\n${message}`,
    });

    // Gửi phản hồi lại cho người dùng
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Gmail cố định của web
      to: email, // Gmail của người dùng
      subject: `Cảm ơn bạn đã liên hệ với chúng tôi`,
      text: `Xin chào ${name},\n\nCảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.\n\nTrân trọng,\nĐội ngũ DTDrugs`,
    });

    res.status(200).json({ message: 'Tin nhắn đã được gửi thành công!' });
  } catch (error) {
    console.error('Error sending email:', error.message); // Log lỗi chi tiết
    res.status(500).json({ message: 'Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.' });
  }
};