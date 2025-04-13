const Drug = require('../models/drugs.model');


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

let cachedDrugs = []; // Bộ nhớ cache

exports.cacheDrugs = async () => {
  try {
    const drugs = await Drug.find().select('tenThuoc'); // Lấy danh sách tên thuốc
    cachedDrugs = drugs.map((drug) => drug.tenThuoc); // Lưu vào bộ nhớ cache
    console.log('Drug cache updated');
  } catch (error) {
    console.error('Error caching drugs:', error);
  }
};

// API tìm kiếm thuốc
exports.searchDrugsByName = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json([]);

    // Tìm kiếm trong bộ nhớ cache
    const regex = new RegExp(query, 'i'); // Không phân biệt hoa thường
    const results = cachedDrugs.filter((drug) => regex.test(drug));
    res.json(results.slice(0, 10)); // Giới hạn 10 kết quả
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};