const Prescription = require('../models/prescription.model');
const fs = require('fs');
const path = require('path');

// Lấy danh sách đơn thuốc của người dùng
exports.getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ user_id: req.user.id });
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm đơn thuốc mới
exports.addPrescription = async (req, res) => {
  const { doctor_name, hospital, medications } = req.body;

  try {
    const prescription = new Prescription({
      user_id: req.user.id,
      doctor_name,
      hospital,
      medications
    });

    await prescription.save();
    res.status(201).json({ message: 'Prescription added successfully', prescription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa đơn thuốc
exports.deletePrescription = async (req, res) => {
  try {
    await Prescription.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPrescription = await Prescription.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPrescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    res.status(200).json({ message: 'Prescription updated successfully', prescription: updatedPrescription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload files toa thuốc
exports.uploadPrescriptionFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Không có file nào được tải lên' });
    }

    // Xử lý thông tin files
    const uploadedFiles = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      url: `/uploads/prescriptions/${file.filename}` // URL để truy cập file
    }));

    // Chuyển đổi ảnh thành base64 để gửi cho Gemini API (tùy chọn)
    const filesWithBase64 = await Promise.all(
      uploadedFiles.map(async (fileInfo) => {
        if (fileInfo.mimetype.startsWith('image/')) {
          try {
            const fileBuffer = fs.readFileSync(fileInfo.path);
            const base64 = fileBuffer.toString('base64');
            return {
              ...fileInfo,
              base64: `data:${fileInfo.mimetype};base64,${base64}`
            };
          } catch (error) {
            console.error('Lỗi khi chuyển đổi file sang base64:', error);
            return fileInfo;
          }
        }
        return fileInfo;
      })
    );

    // TODO: Tích hợp với Gemini API để phân tích nội dung toa thuốc
    // const analyzedResults = await analyzePresriptionWithGemini(filesWithBase64);

    res.status(200).json({
      message: 'Files uploaded successfully',
      files: filesWithBase64,
      count: uploadedFiles.length
    });

  } catch (error) {
    console.error('Lỗi upload files:', error);
    res.status(500).json({ error: 'Lỗi server khi upload files' });
  }
};