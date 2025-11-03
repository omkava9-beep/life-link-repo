const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requesterName: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  requestType: {
    type: String,
    required: true,
    enum: ['blood', 'medicine', 'organ']
  },
  urgency: {
    type: String,
    required: true,
  },
  
  // Blood
  bloodGroup: {
    type: String,
  },
  unitsNeeded: {
    type: Number,
  },
  
  // Medicine
  medicineName: {
    type: String,
  },

  // Organ
  organNeeded: {
    type: String,
  },
  hospitalName: {
    type: String,
  },

}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);