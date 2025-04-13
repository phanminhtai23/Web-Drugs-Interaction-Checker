const Drug = require('../models/drugs.model');
const Interaction = require('../models/interaction.model');

exports.checkInteraction = async (req, res) => {
  const { drugNames } = req.body;

  try {
    // Tìm các thuốc trong cơ sở dữ liệu dựa trên tên (không phân biệt chữ hoa/chữ thường)
    const drugs = await Drug.find({
      tenThuoc: { $in: drugNames.map((name) => new RegExp(`^${name.trim()}$`, 'i')) },
    });

    if (!drugs.length) {
      return res.status(404).json({
        message: 'No drugs found with the provided names',
        missingDrugs: drugNames.filter(
          (name) => !drugs.some((drug) => drug.tenThuoc.toLowerCase() === name.toLowerCase())
        ),
      });
    }

    // Lấy danh sách hoạt chất từ các thuốc
    const activeIngredients = drugs.flatMap((drug) =>
      drug.hoatChat.map((hc) => hc.tenHoatChat.trim().toLowerCase())
    );

    // Tìm các tương tác dựa trên hoạt chất
    const interactions = await Interaction.find({
      $or: [
        { HoatChat_1: { $in: activeIngredients }, HoatChat_2: { $in: activeIngredients } },
        { HoatChat_2: { $in: activeIngredients }, HoatChat_1: { $in: activeIngredients } },
      ],
    });

    if (!interactions.length) {
      return res.status(404).json({ message: 'No interactions found for the provided drugs' });
    }

    // Trả về danh sách tương tác
    res.status(200).json(interactions);
  } catch (error) {
    console.error('Error checking interactions:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.searchDrugs = async (req, res) => {
  const { keyword } = req.query;

  try {
    const drugs = await Drug.find({
      tenThuoc: { $regex: keyword, $options: 'i' }, // Tìm kiếm không phân biệt hoa thường
    })
      .limit(10) // Giới hạn 10 kết quả
      .select('tenThuoc'); // Chỉ lấy trường tên thuốc

    res.status(200).json(drugs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};