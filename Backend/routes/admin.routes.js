const express = require('express');
const { adminController } = require('../controllers');
const { authMiddleware } = require('../middleware');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Tải lên file PDF hoặc hình ảnh (chỉ admin)
router.post('/upload', authMiddleware(['admin']), upload.single('file'), adminController.uploadFile);

module.exports = router;