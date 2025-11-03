const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  donorName: {
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
  donationType: {
    type: String,
    required: true,
    enum: ['blood', 'medicine']
  },
  
  // Blood
  bloodGroup: {
    type: String,
  },
  
  // Medicine
  medicineName: {
    type: String,
  },
  expiryDate: {
    type: Date,
  },

}, { timestamps: true });

module.exports = mongoose.model('Donation', DonationSchema);