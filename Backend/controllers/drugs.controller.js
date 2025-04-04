const Drug = require('../models/drugs.model');

// Lấy danh sách thuốc (phân trang)
exports.getDrugsWithPagination = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const drugs = await Drug.find()
      .sort({ tenThuoc: sortOption })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalDrugs = await Drug.countDocuments();

    res.status(200).json({
      drugs,
      totalPages: Math.ceil(totalDrugs / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin chi tiết của một thuốc
exports.getDrugByName = async (req, res) => {
  const { tenThuoc } = req.params;

  try {
    const drug = await Drug.findOne({ tenThuoc });
    if (!drug) {
      return res.status(404).json({ message: 'Drug not found' });
    }

    res.status(200).json(drug);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDrugsByInitial = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  try {
    // Lấy danh sách thuốc với phân trang
    const drugs = await Drug.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalDrugs = await Drug.countDocuments();

    res.status(200).json({
      drugs,
      totalPages: Math.ceil(totalDrugs / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDrugsWithPagination = async (req, res) => {
  const { page = 1, limit = 10, sortOrder = 'asc' } = req.query;

  try {
    const sortOption = sortOrder === 'asc' ? 1 : -1; // 1: tăng dần, -1: giảm dần
    const drugs = await Drug.find()
      .sort({ tenThuoc: sortOption }) // Sắp xếp theo trường tenThuoc
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalDrugs = await Drug.countDocuments();

    res.status(200).json({
      drugs,
      totalPages: Math.ceil(totalDrugs / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDrugByName = async (req, res) => {
  const { tenThuoc } = req.params;

  try {
    const drug = await Drug.findOne({ tenThuoc }); // Tìm thuốc theo tên
    if (!drug) {
      return res.status(404).json({ message: 'Drug not found' });
    }
    res.status(200).json(drug); // Trả về thông tin thuốc
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};