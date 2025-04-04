const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
  id: { type: String, required: true }, // ID thuốc
  tenThuoc: { type: String, required: true }, // Tên thuốc
  dotPheDuyet: { type: String }, // Đợt phê duyệt
  soQuyetDinh: { type: String }, // Số quyết định
  pheDuyet: { type: String }, // Ngày phê duyệt
  hieuLuc: { type: String }, // Hiệu lực
  soDangKy: { type: String }, // Số đăng ký
  hoatChat: [
    {
      tenHoatChat: { type: String, required: true }, // Tên hoạt chất
      nongDo: { type: String }, // Nồng độ
    },
  ],
  phanLoai: { type: String }, // Phân loại thuốc
  taDuoc: { type: String }, // Tá dược
  baoChe: { type: String }, // Dạng bào chế
  dongGoi: { type: String }, // Quy cách đóng gói
  tieuChuan: { type: String }, // Tiêu chuẩn
  tuoiTho: { type: String }, // Thời gian sử dụng
  congTySx: { type: String }, // Công ty sản xuất
  congTySxCode: { type: String }, // Mã công ty sản xuất
  nuocSx: { type: String }, // Nước sản xuất
  diaChiSx: { type: String }, // Địa chỉ sản xuất
  congTyDk: { type: String }, // Công ty đăng ký
  nuocDk: { type: String }, // Nước đăng ký
  diaChiDk: { type: String }, // Địa chỉ đăng ký
  nhomThuoc: { type: String }, // Nhóm thuốc
});

module.exports = mongoose.model('Drug', drugSchema, 'drugs');