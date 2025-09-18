const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const jwt = require('jsonwebtoken');

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Token gerekli' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Geçersiz token' });
  }
};

// Get all campaigns (public)
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    console.error('Campaign fetch error:', error);
    res.status(500).json({ message: 'Kampanyalar alınamadı' });
  }
});

// Create new campaign (admin only)
router.post('/',  async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    console.error('Campaign create error:', error);
    res.status(500).json({ message: 'Kampanya oluşturulamadı' });
  }
});

// Update campaign (admin only)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Kampanya bulunamadı' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Campaign update error:', error);
    res.status(500).json({ message: 'Kampanya güncellenemedi' });
  }
});

// Delete campaign (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Campaign.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Kampanya bulunamadı' });
    }
    res.json({ message: 'Kampanya silindi' });
  } catch (error) {
    console.error('Campaign delete error:', error);
    res.status(500).json({ message: 'Kampanya silinemedi' });
  }
});

module.exports = router;
