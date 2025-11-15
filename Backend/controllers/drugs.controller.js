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
    cachedDrugs = drugs
      .map((drug) => drug.tenThuoc) // Lưu vào bộ nhớ cache
      .sort((a, b) => a.length - b.length); // Sắp xếp theo độ dài tên thuốc tăng dần
    console.log('Drug cache updated and sorted by name length');
  } catch (error) {
    console.error('Error caching drugs:', error);
  }
};

// Export getter function để lấy cached drugs
exports.getCachedDrugs = () => {
  return cachedDrugs;
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

// API tìm kiếm thuốc với thông tin đầy đủ và phân trang
exports.searchDrugsWithDetails = async (req, res) => {
  const { q: query, page = 1, limit = 20, sortOrder = 'asc' } = req.query;

  try {
    let drugs, totalDrugs;
    const sortOption = sortOrder === 'asc' ? 1 : -1;

    if (!query || query.trim() === '') {
      // Nếu không có từ khóa tìm kiếm, trả về tất cả thuốc
      drugs = await Drug.find()
        .sort({ tenThuoc: sortOption })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      totalDrugs = await Drug.countDocuments();
    } else {
      // Tìm kiếm thuốc theo tên (không phân biệt hoa thường)
      const searchRegex = new RegExp(query.trim(), 'i');
      const searchQuery = { tenThuoc: searchRegex };

      drugs = await Drug.find(searchQuery)
        .sort({ tenThuoc: sortOption })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      totalDrugs = await Drug.countDocuments(searchQuery);
    }

    res.status(200).json({
      drugs,
      totalPages: Math.ceil(totalDrugs / limit),
      currentPage: parseInt(page),
      totalDrugs,
      searchQuery: query || ''
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};