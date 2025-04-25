# Drug Interaction Web

## Giới thiệu
Drug Interaction Web là một ứng dụng web giúp người dùng tra cứu thông tin thuốc, kiểm tra tương tác thuốc và quản lý đơn thuốc. Dự án này được phát triển nhằm hỗ trợ người dùng trong việc quản lý và theo dõi thông tin y tế cá nhân.

---

## Tính năng chính
- **Tra cứu thuốc**: Tìm kiếm thông tin chi tiết về thuốc.
- **Kiểm tra tương tác thuốc**: Phân tích mức độ tương tác giữa các loại thuốc.
- **Quản lý đơn thuốc**: Lưu trữ và quản lý đơn thuốc cá nhân.
- **Lịch sử kiểm tra**: Theo dõi lịch sử kiểm tra tương tác thuốc.

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
   MONGO_URL=mongodb://localhost:27017/drug-interaction
   PORT=5000
   SESSION_SECRET=<your-secret-key>
   EMAIL_USER=<your-email>
   EMAIL_PASS=<your-email-password>
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
