const express = require('express');
const { prescriptionController } = require('../controllers');
const { authMiddleware } = require('../middleware');

const router = express.Router();

// Lấy danh sách đơn thuốc
router.get('/', authMiddleware(['client']), prescriptionController.getPrescriptions);

// Thêm đơn thuốc
router.post('/', authMiddleware(['client']), prescriptionController.addPrescription);

// Xóa đơn thuốc
router.delete('/:id', authMiddleware(['client']), prescriptionController.deletePrescription);

router.put('/:id', authMiddleware(['client']), prescriptionController.updatePrescription);
module.exports = router;