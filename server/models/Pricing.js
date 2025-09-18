const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true
  },
  originalPrice: {
    type: String
  },
  categories: [{
    type: String,
    required: true,
    enum: ['Düğün Fotoğrafçılığı', 'Nişan Çekimi', 'Bebek Fotoğrafları', 'Dış Çekim', 'Paketler']
  }],
  customCategoryName: {
    type: String, // Admin'in elle girdiği kategori ismi (sadece Paketler kategorisi için)
  },
  duration: {
    type: String,
    required: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  features: [{
    type: String,
    required: true
  }],
  notIncluded: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pricing', pricingSchema);