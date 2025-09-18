const express = require('express');
const Gallery = require('../models/Gallery');
const router = express.Router();

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const { type, category } = req.query;
    let filter = { isActive: true };
    
    if (type) filter.type = type;
    if (category) filter.category = category;
    
    const items = await Gallery.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Galeri öğeleri alınırken hata oluştu', error: error.message });
  }
});

// Get gallery items by category and type
router.get('/:type/:category', async (req, res) => {
  try {
    const { type, category } = req.params;
    const items = await Gallery.find({ 
      type, 
      category, 
      isActive: true 
    }).sort({ order: 1, createdAt: -1 });
    
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Galeri öğeleri alınırken hata oluştu', error: error.message });
  }
});

// Create new gallery item (Admin only)
router.post('/', async (req, res) => {
  try {
    const { title, description, type, category, url, thumbnailUrl, order } = req.body;
    
    const newItem = new Gallery({
      title,
      description,
      type,
      category,
      url,
      thumbnailUrl,
      order: order || 0
    });
    
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Galeri öğesi oluşturulurken hata oluştu', error: error.message });
  }
});

// Update gallery item (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedItem = await Gallery.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedItem) {
      return res.status(404).json({ message: 'Galeri öğesi bulunamadı' });
    }
    
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Galeri öğesi güncellenirken hata oluştu', error: error.message });
  }
});

// Delete gallery item (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Gallery.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return res.status(404).json({ message: 'Galeri öğesi bulunamadı' });
    }
    
    res.json({ message: 'Galeri öğesi başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Galeri öğesi silinirken hata oluştu', error: error.message });
  }
});

module.exports = router;