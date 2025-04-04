const express = require('express');
const { interactionHistoryController } = require('../controllers');
const { authMiddleware } = require('../middleware');

const router = express.Router();

// Lấy lịch sử kiểm tra tương tác
router.get('/', authMiddleware(['client']), interactionHistoryController.getInteractionHistory);

// Thêm lịch sử kiểm tra tương tác
router.post('/', authMiddleware(['client']), interactionHistoryController.addInteractionHistory);

router.delete('/:id', authMiddleware(['client']), interactionHistoryController.deleteInteractionHistory);

module.exports = router;