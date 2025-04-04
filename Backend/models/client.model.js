const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  date_of_birth: { type: Date },
  gender: { type: String, enum: ['Nam', 'Nữ', 'Khác'] },
  address: { type: String },
  medical_history: [{ type: String }], // Danh sách bệnh lý
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drug' }], // Lịch sử tra cứu thuốc
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', clientSchema, 'client');