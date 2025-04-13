const express = require('express');
const router = express.Router();
const { sendContactMessage } = require('../controllers/contact.controller');

// Endpoint gửi tin nhắn liên hệ
router.post('/', sendContactMessage);

module.exports = router;