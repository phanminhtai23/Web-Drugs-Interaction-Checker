const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { PORT } = require('./config/system');
const routes = require('./routes');
const { errorHandler, logger } = require('./middleware');
const path = require('path');

const app = express();

// Cấu hình để phục vụ tệp tĩnh
app.use('/assets/avatars', express.static(path.join(__dirname, 'assets/avatars')));
// Middleware
app.use(express.json());
app.use(cors());
app.use(logger); // Ghi log các request

// Kết nối cơ sở dữ liệu
connectDB();


// Định tuyến API
app.use('/api', routes);


// Middleware xử lý lỗi
app.use(errorHandler);


// Route mặc định
app.get('/', (req, res) => {
  res.send('API Drug Interaction Running...');
});

// Lắng nghe server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));