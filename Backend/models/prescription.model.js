const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  doctor_name: { type: String, required: true },
  hospital: { type: String },
  medications: [
    {
      name: { type: String, required: true },
      dosage: { type: String },
      frequency: { type: String }
    }
  ],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prescription', prescriptionSchema, 'prescriptions');