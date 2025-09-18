const express = require('express');
const Pricing = require('../models/Pricing');
const router = express.Router();

// Get all pricing packages
router.get('/', async (req, res) => {
  try {
    const packages = await Pricing.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Fiyatlandırma paketleri alınırken hata oluştu', error: error.message });
  }
});

// Get single pricing package
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const package = await Pricing.findById(id);
    
    if (!package) {
      return res.status(404).json({ message: 'Paket bulunamadı' });
    }
    
    res.json(package);
  } catch (error) {
    res.status(500).json({ message: 'Paket alınırken hata oluştu', error: error.message });
  }
});

// Create new pricing package (Admin only)
router.post('/', async (req, res) => {
  try {
    const { name, price, originalPrice, categories, duration, isPopular, features, notIncluded, order } = req.body;
    
    const newPackage = new Pricing({
      name,
      price,
      originalPrice,
      categories,
      duration,
      isPopular: isPopular || false,
      features,
      notIncluded: notIncluded || [],
      order: order || 0
    });
    
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(400).json({ message: 'Paket oluşturulurken hata oluştu', error: error.message });
  }
});

// Update pricing package (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedPackage = await Pricing.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Paket bulunamadı' });
    }
    
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: 'Paket güncellenirken hata oluştu', error: error.message });
  }
});

// Delete pricing package (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPackage = await Pricing.findByIdAndDelete(id);
    
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Paket bulunamadı' });
    }
    
    res.json({ message: 'Paket başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Paket silinirken hata oluştu', error: error.message });
  }
});

module.exports = router;