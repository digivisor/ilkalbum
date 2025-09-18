const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  note: { type: String },
  discountPercent: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  type: { 
    type: String, 
    enum: ['homepage', 'pricing'], 
    default: 'homepage' 
  },
  packages: [{
    name: { type: String, trim: true },
    oldPrice: { type: String, trim: true },
    newPrice: { type: String, trim: true },
    description: { type: String, trim: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Campaign', CampaignSchema);
