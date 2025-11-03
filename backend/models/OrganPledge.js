const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganPledgeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pledgerName: { type: String, required: true },
  dob: { type: Date },
  contact: { type: String, required: true },
  address: { type: String },
  bloodGroup: { type: String },

  organsToPledge: {
    type: Map,
    of: Boolean
  },
  tissuesToPledge: {
    type: Map,
    of: Boolean
  },
  
  relativeName: { type: String },
  relativeRelationship: { type: String },
  relativeContact: { type: String },

}, { timestamps: true });

module.exports = mongoose.model('OrganPledge', OrganPledgeSchema);