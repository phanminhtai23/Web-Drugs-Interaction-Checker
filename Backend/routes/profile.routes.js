const express = require('express');
const { profileController } = require('../controllers');
const { authMiddleware } = require('../middleware');

const router = express.Router();

// Lấy thông tin hồ sơ
router.get('/', authMiddleware(['client']), profileController.getProfile);

// Cập nhật hồ sơ
router.put('/', authMiddleware(['client']), profileController.updateProfile);

// Route tải ảnh avatar
router.post('/upload-avatar', authMiddleware(['client']), profileController.uploadAvatar);

module.exports = router;