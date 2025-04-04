const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  id: { type: String, required: true }, // ID của tương tác
  TenThuoc: { type: String, required: true }, // Tên thuốc
  HoatChat_1: { type: String, required: true }, // Hoạt chất 1
  HoatChat_2: { type: String, required: true }, // Hoạt chất 2
  MucDoNghiemTrong: { type: String }, // Mức độ nghiêm trọng
  CanhBaoTuongTacThuoc: { type: String }, // Cảnh báo tương tác thuốc
});

module.exports = mongoose.model('Interaction', interactionSchema, 'drug_interaction');