# Hệ Thống kiểm tra tương tác thuốc
Niên luận ngành Khoa học Máy tính  
**Sinh viên thực hiện:** Nguyễn Hoàng Điển  
**GVHD:** TS. Lưu Tiến Đạo

## ✌️Giới thiệu
Drug Interaction Web là một ứng dụng web giúp người dùng tra cứu thông tin thuốc, kiểm tra tương tác thuốc và quản lý đơn thuốc. Dự án này được phát triển nhằm hỗ trợ người dùng trong việc quản lý và theo dõi thông tin y tế cá nhân.

Hệ thống sẽ chia 2 quyền quản trị (Admin) và người dùng riêng, chạy trên 2 frontend và backend riêng mà các hệ thống lớn hay thường làm:
- Hệ thống web cho người quản trị (Admin) cài đặt theo dự án này: (https://github.com/phanminhtai23/DDIs-Management)
- Hệ thống web cho người dùng cài theo dự án này.

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

## Yêu cầu hệ thống
- **Node.js**: >= 14.x
- **npm**: >= 6.x
- **MongoDB**: >= 4.x
- **Git**

---

## Cài đặt và chạy dự án

### 1. Clone dự án
Sử dụng lệnh sau để clone dự án từ GitHub:
```bash
git clone https://github.com/phanminhtai23/DDIs-Management.git
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
   
4. Khởi chạy server:
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
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Khởi chạy ứng dụng React:
   ```bash
   npm start
   ```
   Ứng dụng sẽ chạy tại `http://localhost:3000`.

---

## Cấu trúc thư mục
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

## API Endpoints

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

## Đóng góp
Nếu bạn muốn đóng góp cho dự án, vui lòng tạo một **Pull Request** hoặc mở **Issue** trên GitHub.

---

## Liên hệ
- **Email**: DTDrugs@gmail.com
- **Số điện thoại**: +84 944 779 743
