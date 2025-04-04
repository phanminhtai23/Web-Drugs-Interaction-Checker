const express = require('express');
const { drugController } = require('../controllers');
const { authMiddleware } = require('../middleware');

const router = express.Router();

// Lấy danh sách thuốc (phân trang) - Không cần đăng nhập
router.get('/', drugController.getDrugsWithPagination);

// Lấy thông tin chi tiết của một thuốc - Không cần đăng nhập
router.get('/:tenThuoc', drugController.getDrugByName);

module.exports = router;