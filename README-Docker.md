# 🐳 Docker Setup cho Drug Interaction App

## 📋 Yêu cầu

-   Docker & Docker Compose
-   Make (optional, cho tiện lợi)

## 🚀 Cách chạy

### Development Mode (với hot reload)

```bash
# Chạy development environment
docker-compose -f docker-compose.dev.yml up -d

# Hoặc sử dụng Makefile
make dev-up

# Xem logs
make dev-logs

# Dừng development environment
make dev-down
```

### Production Mode

```bash
# Chạy production environment
docker-compose up -d

# Hoặc sử dụng Makefile
make prod-up

# Xem logs
make prod-logs

# Dừng production environment
make prod-down
```

## 🌐 Các Service và Port

| Service          | Development Port      | Production Port       | Description        |
| ---------------- | --------------------- | --------------------- | ------------------ |
| Frontend         | http://localhost:3000 | http://localhost:3000 | React Dev Server   |
| Backend          | http://localhost:5000 | http://localhost:5000 | Node.js API        |
| MongoDB          | localhost:27017       | localhost:27017       | Database           |
| Debug (Dev only) | localhost:9229        | -                     | Node.js Debug Port |

## 🗃️ Import dữ liệu

```bash
# Import dữ liệu từ thư mục data/
make db-import

# Hoặc thủ công
docker-compose exec mongodb mongoimport --db Drug_interactions --collection drugs --file /data/import/Drug_interactions.drugs.json
```

## 🔧 Development Commands

```bash
# Vào shell của backend container
make dev-shell-backend

# Vào shell của frontend container
make dev-shell-frontend

# Restart tất cả services
make restart-all

# Clean up Docker
make clean
```

## 📁 Cấu trúc File

```
├── docker-compose.yml          # Production config
├── docker-compose.dev.yml      # Development config
├── Makefile                    # Convenience commands
├── Backend/
│   ├── Dockerfile              # Production backend
│   ├── Dockerfile.dev          # Development backend
│   └── ...
├── frontend/
│   ├── Dockerfile.dev          # Development frontend
│   └── ...
└── data/                       # Database import files
    ├── Drug_interactions.drugs.json
    └── Drug_interactions.drug_interaction.json
```

## 🔐 Environment Variables

### Backend (.env)

```bash
NODE_ENV=production
PORT=5000
DB_CONNECTION_STRING=mongodb://admin:password123@mongodb:27017/Drug_interactions?authSource=admin
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)

```bash
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

## 🏥 Health Checks

Tất cả services đều có health checks:

-   **MongoDB**: Ping database
-   **Backend**: HTTP check tới `/api/health`
-   **Frontend**: HTTP check tới root

## 🐛 Debugging

### Backend Debugging (Development)

1. Chạy development mode: `make dev-up`
2. Attach debugger tới `localhost:9229`
3. Set breakpoints trong VS Code

### Logs

```bash
# Xem logs tất cả services
make dev-logs

# Xem logs của service cụ thể
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

## 🔄 Hot Reload

-   **Frontend**: Tự động reload khi thay đổi code
-   **Backend**: Sử dụng nodemon để restart khi thay đổi
-   **Database**: Data persist qua volumes

## 📊 Performance

### Production Features

-   Optimized builds cho các services
-   Non-root user cho security
-   Health checks cho monitoring
-   Custom network isolation

### Development Features

-   Hot reload cho cả FE & BE
-   Debug port exposed
-   Volume mounts cho instant updates
-   Separate dev/prod configs

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**

    ```bash
    # Kiểm tra port đang sử dụng
    netstat -tulpn | grep :3000

    # Dừng service khác hoặc đổi port
    ```

2. **MongoDB connection failed**

    ```bash
    # Kiểm tra MongoDB running
    docker-compose logs mongodb

    # Reset volume nếu cần
    docker-compose down -v
    ```

3. **Build failed**
    ```bash
    # Clean build cache
    make clean
    make build-all
    ```

## 🎯 Best Practices

1. **Development**: Sử dụng `docker-compose.dev.yml`
2. **Production**: Sử dụng `docker-compose.yml`
3. **Data**: Backup thường xuyên với `make db-backup`
4. **Security**: Đổi default passwords trong production
5. **Monitoring**: Sử dụng health checks để monitor
