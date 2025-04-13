const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Xóa `required: true`
  phone: { type: String },
  date_of_birth: { type: Date },
  gender: { type: String, enum: ['Nam', 'Nữ', 'Khác'] },
  address: { type: String },
  medical_history: [{ type: String }],
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drug' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  google_id: { type: String, unique: true, sparse: true },
  facebook_id: { type: String, unique: true, sparse: true },
  auth_provider: { type: String, enum: ['local', 'google', 'facebook'], default: 'local' },
  otp: { type: String },
  otp_expires: { type: Date },
  profile_picture: { type: String, default: '' },
});


module.exports = mongoose.model('Client', clientSchema, 'client');