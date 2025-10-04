const express = require('express');
const multer = require('multer');
const { prescriptionController } = require('../controllers');
const { authMiddleware } = require('../middleware');

const router = express.Router();

// Cấu hình multer để upload files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/prescriptions/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // Chỉ chấp nhận ảnh và PDF
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file ảnh hoặc PDF'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// Upload files toa thuốc
router.post('/upload', upload.array('prescriptions', 10), prescriptionController.uploadPrescriptionFiles);

// Lấy danh sách đơn thuốc
router.get('/', authMiddleware(['client']), prescriptionController.getPrescriptions);

// Thêm đơn thuốc
router.post('/', authMiddleware(['client']), prescriptionController.addPrescription);

// Xóa đơn thuốc
router.delete('/:id', authMiddleware(['client']), prescriptionController.deletePrescription);

router.put('/:id', authMiddleware(['client']), prescriptionController.updatePrescription);
module.exports = router;