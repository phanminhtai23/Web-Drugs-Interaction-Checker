const express = require('express');
const { interactionController } = require('../controllers');
const { authMiddleware } = require('../middleware');

const router = express.Router();

// Tra cứu tương tác thuốc - Không cần đăng nhập
router.post('/', interactionController.checkInteraction);

module.exports = router;