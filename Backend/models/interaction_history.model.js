const mongoose = require('mongoose');

const interactionHistorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  checked_at: { type: Date, default: Date.now },
  drugs_checked: [{ type: String, required: true }], // Danh sách thuốc đã kiểm tra
  interactions: [
    {
      drug_a: { type: String, required: true },
      drug_b: { type: String, required: true },
      effect: { type: String },
      severity: { type: String }
    }
  ],
  recommendations: { type: String }
});

module.exports = mongoose.model('InteractionHistory', interactionHistorySchema, 'interaction_history');