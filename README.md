# 💊 Hệ Thống kiểm tra tương tác thuốc
Niên luận ngành Khoa học Máy tính  
**Sinh viên thực hiện:** Nguyễn Hoàng Điển  
**GVHD:** TS. Lưu Tiến Đạo

## 📚 Giới thiệu
Drug Interaction Web là một ứng dụng web giúp người dùng tra cứu thông tin thuốc, kiểm tra tương tác thuốc và quản lý đơn thuốc. Dự án này được phát triển nhằm hỗ trợ người dùng trong việc quản lý và theo dõi thông tin y tế cá nhân.

Hệ thống sẽ chia 2 quyền quản trị (Admin) và người dùng riêng, chạy trên 2 frontend và backend riêng mà các hệ thống lớn đã làm:
- Hệ thống web cho người quản trị (Admin) cài đặt theo dự án này: (https://github.com/phanminhtai23/DDIs-Management)
- Hệ thống web cho người dùng cài theo dự án hiện tại.

Công nghệ sử dụng:
- Frontend: `React`
- Backend: `Nodejs`, `MongoDB`
---

## Tính năng chính
- **Tra cứu thuốc**: Tìm kiếm thông tin chi tiết về thuốc.
- **Kiểm tra tương tác thuốc**: Phân tích mức độ tương tác giữa các loại thuốc.
- **Quản lý đơn thuốc**: Lưu trữ và quản lý đơn thuốc cá nhân.
- **Lịch sử kiểm tra**: Theo dõi lịch sử kiểm tra tương tác thuốc.
- **Đăng nhập bằng Google và FaceBook**: Đăng nhập bằng google nhanh chống và chính xác.
- **Hệ thống lấy lại mật khẩu và gửi phản hồi thông qua email**: Có thêm chức năng lấy lại mật khẩu thông qua email mã OTP và gửi ý kiến thông qua địa chỉ mail.
---

## 📝 Import dữ liệu MongoDB (tuỳ chọn)
Dữ liệu mẫu đã export trong thư mục data/, dùng lệnh sau để import:
``` bash
mongoimport --uri "your mongodb uri" --db your_database_name --collection drugs --file data/Drug_interactions.drugs.json --jsonArray
mongoimport --uri "your mongodb uri" --db your_database_name --collection drug_interaction --file data/Drug_interactions.drug_interaction.json --jsonArray
mongoimport --uri "your mongodb uri" --db your_database_name --collection client --file data/Drug_interactions.client.json --jsonArray
mongoimport --uri "your mongodb uri" --db your_database_name --collection interaction_history --file data/Drug_interactions.interaction_history.json --jsonArray
mongoimport --uri "your mongodb uri" --db your_database_name --collection prescriptions --file data/Drug_interactions.prescriptions.json --jsonArray
```

## Yêu cầu hệ thống
- **Node.js**: >= 14.x
- **npm**: >= 6.x
- **MongoDB**: >= 4.x
- **Git**

---

## 🔧 Cài đặt và chạy dự án

### 1. Clone dự án
Sử dụng lệnh sau để clone dự án từ GitHub:
```bash
https://github.com/Hoang-Dien-IT/Web-Drugs-Interaction-Checker.git
```

### 2. Cài đặt Backend
1. Điều hướng vào thư mục `Backend`:
   ```bash
   cd drug-interaction-web/Backend
   ```
2. Cài đặt các package cần thiết:
   ```bash
   npm install
   ```
3. Tạo file `.env` trong thư mục `Backend` và cấu hình các biến môi trường:
   ```env
   PORT=5000
   MONGO_URL=mongodb://127.0.0.1:27017/Drug_interactions
   
   JWT_SECRET=<your-secret-key>
   
   GOOGLE_CLIENT_ID=<your-google-key>
   GOOGLE_CLIENT_SECRET=<your-secret-google-key>
   REACT_APP_FACEBOOK_APP_ID=<your-facebook-key>
   FACEBOOK_APP_ID=<your-facebook-key>
   FACEBOOK_APP_SECRET=<your-secret-facebook--key>
   FRONTEND_URL=http://localhost:3000
   BACKEND_URL=http://localhost:5000
   
   EMAIL_USER=<your-email>
   EMAIL_PASS=<your-pass>
   ```
   - **Để lấy các các Key: ID và SECRET của Google xem hướng dẫn này:** https://www.youtube.com/watch?v=ssgr6jWGBnY.
   - **Để lấy các các Key: ID và SECRET của Facebook xem hướng dẫn này:** https://www.youtube.com/watch?v=gtH-5T9cmO0&t=254s.
5. Khởi chạy server:
   ```bash
   npm start
   ```
   Server sẽ chạy tại `http://localhost:5000`.

---

### 3. Cài đặt Frontend
1. Điều hướng vào thư mục `frontend`:
   ```bash
   cd ../frontend
   ```
2. Cài đặt các package cần thiết:
   ```bash
   npm install
   ```
3. Tạo file `.env` trong thư mục `frontend` và cấu hình biến môi trường:
   ```env
   PORT=3000
   REACT_APP_API_URL=http://localhost:5000
   
   REACT_APP_GOOGLE_CLIENT_ID=<your-id-google-key>
   ```
   - **Để lấy REACT_APP_GOOGLE_CLIENT_ID của Google xem hướng dẫn này:** https://www.youtube.com/watch?v=ssgr6jWGBnY.
4. Khởi chạy ứng dụng React:
   ```bash
   npm start
   ```
   Ứng dụng sẽ chạy tại `http://localhost:3000`.

---

## 🌳 Cấu trúc thư mục
```
drug-interaction-web/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
└── README.md
```

---

## 👍 API Endpoints

### Backend API
- **Drugs**
  - `GET /api/drugs`: Lấy danh sách thuốc.
  - `POST /api/drugs`: Thêm thuốc mới.
- **Interactions**
  - `POST /api/interactions`: Kiểm tra tương tác thuốc.
- **Interaction History**
  - `GET /api/interaction-history`: Lấy lịch sử kiểm tra tương tác.
  - `POST /api/interaction-history`: Thêm lịch sử kiểm tra tương tác.
  - `DELETE /api/interaction-history/:id`: Xóa lịch sử kiểm tra.

---


## 📲 Liên hệ
- **Email**: DTDrugs@gmail.com
- **Số điện thoại**: +84 944 779 743
