const express = require('express');
const { clientController } = require('../controllers');
const { authMiddleware } = require('../middleware');

const router = express.Router();

// Lấy thông tin người dùng
router.get('/', authMiddleware(['client']), clientController.getUserDetails);

// Cập nhật thông tin người dùng
router.put('/', authMiddleware(['client']), clientController.updateUserDetails);

module.exports = router;