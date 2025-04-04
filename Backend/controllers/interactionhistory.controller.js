const InteractionHistory = require('../models/interaction_history.model');

// Lấy lịch sử kiểm tra tương tác
exports.getInteractionHistory = async (req, res) => {
  try {
    const history = await InteractionHistory.find({ user_id: req.user.id });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm lịch sử kiểm tra tương tác
exports.addInteractionHistory = async (req, res) => {
  const { drugs_checked, interactions, recommendations } = req.body;

  try {
    const history = new InteractionHistory({
      user_id: req.user.id,
      drugs_checked,
      interactions,
      recommendations
    });

    await history.save();
    res.status(201).json({ message: 'Interaction history added successfully', history });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Xóa lịch sử kiểm tra tương tác
exports.deleteInteractionHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHistory = await InteractionHistory.findByIdAndDelete(id);

    if (!deletedHistory) {
      return res.status(404).json({ message: 'Interaction history not found' });
    }

    res.status(200).json({ message: 'Interaction history deleted successfully' });
  } catch (error) {
    console.error('Error deleting interaction history:', error.message);
    res.status(500).json({ error: error.message });
  }
};