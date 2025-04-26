![image](https://github.com/user-attachments/assets/3550c12d-1a9e-438e-ae21-a7460b68b78c)![image](https://github.com/user-attachments/assets/7d5ab7df-5380-4f77-9aad-b2b94f901b68)# 💊 Hệ Thống kiểm tra tương tác thuốc
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
## Giao diện các trang chính của website
- **Trang chủ**:
  ![image](https://github.com/user-attachments/assets/a1a6a2d4-1ed1-4b53-89c9-e8ce0041d7fb)
  ![image](https://github.com/user-attachments/assets/9a85d0ef-185a-4869-9c2f-9f73f7954f75)
  ![image](https://github.com/user-attachments/assets/d8f158f1-5f7d-4329-a4a2-885858fcdaba)
- **Danh sách thuốc**:
  ![image](https://github.com/user-attachments/assets/186282a9-a906-449e-aada-552aaa8eb7b1)
  ![image](https://github.com/user-attachments/assets/f3f59b68-433e-49d0-9901-52d8b1684541)
- **Thông tin chi tiết thuốc**:
  ![image](https://github.com/user-attachments/assets/638c08eb-096d-4634-af33-ea3bf2ef2fa1)
  ![image](https://github.com/user-attachments/assets/77a370ce-7172-4e3d-ad36-58e21bb91997)
- **Kiểm tra tương tác thuốc**:
  ![image](https://github.com/user-attachments/assets/42c164f9-b3ec-438c-b945-ee8f7fa4a7c3)
  ![image](https://github.com/user-attachments/assets/b045b84a-e9ce-4cc8-b929-d47d60e6053d)
   + Kết quả kiểm tra tương tác:
  ![image](https://github.com/user-attachments/assets/e9c58f0e-cb00-4273-9d16-c67637b97f90)
  ![image](https://github.com/user-attachments/assets/0db30650-cb34-4166-8c29-c018d7fb895e)
- **Đăng nhập**:
  ![image](https://github.com/user-attachments/assets/3ed8db06-12a4-4ddb-ad52-e657085d6bc5)
  + Đăng nhập bằng Google:
  ![image](https://github.com/user-attachments/assets/dbb5848c-31b6-49b1-aab4-d30c85025084)
  + Đăng nhập bằng Facebook:
  ![image](https://github.com/user-attachments/assets/50e0638b-d044-4541-a49a-7dc48d63c61f)
- **Đăng ký**:
  ![image](https://github.com/user-attachments/assets/d86336f7-75d5-44e5-bcac-0bb661b25a74)
- **Thông tin cá nhân**:
  ![image](https://github.com/user-attachments/assets/95fff24d-9f5d-4c69-96eb-6dd069af666c)
  ![image](https://github.com/user-attachments/assets/cadc7711-0e55-412c-ba16-21d9a0fcb81d)
- **Quản lý đơn thuốc**:
  ![image](https://github.com/user-attachments/assets/7351af4a-fa69-417e-bcb2-20d334e05df1)
  ![image](https://github.com/user-attachments/assets/f1b512da-5bcc-47d5-853a-17b47b4207c0)
- **Lịch sử kiểm tra tương tác thuốc**:
  ![image](https://github.com/user-attachments/assets/cc785ed1-ecd4-4326-8811-004eb6f8b099)

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
