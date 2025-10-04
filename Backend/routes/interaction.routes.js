const express = require('express');
const { interactionController } = require('../controllers');
const { authMiddleware } = require('../middleware');

const router = express.Router();

// Tra cứu tương tác thuốc - Không cần đăng nhập
router.post('/', interactionController.checkInteraction);

router.get('/search', interactionController.searchDrugs);

router.post('/detect-drug', interactionController.detectDrug);

module.exports = router;