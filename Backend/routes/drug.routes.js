const express = require('express');
const { drugController } = require('../controllers');
const { authMiddleware } = require('../middleware');

const router = express.Router();

// API tìm kiếm thuốc với thông tin đầy đủ - Đặt trước các route khác
router.get('/search-detailed', drugController.searchDrugsWithDetails);

// API tìm kiếm tên thuốc đơn giản
router.get('/search', drugController.searchDrugsByName);

// Lấy danh sách thuốc (phân trang) - Không cần đăng nhập
router.get('/', drugController.getDrugsWithPagination);

// Lấy thông tin chi tiết của một thuốc - Không cần đăng nhập
router.get('/:tenThuoc', drugController.getDrugByName);

module.exports = router;