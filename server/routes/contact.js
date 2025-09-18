const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: 'Tüm alanlar zorunludur' });
    }
    
    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });
    
    const savedContact = await newContact.save();
    res.status(201).json({ 
      message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.',
      id: savedContact._id 
    });
  } catch (error) {
    res.status(500).json({ message: 'Mesaj gönderilirken hata oluştu', error: error.message });
  }
});

// Get all contact messages (Admin only)
router.get('/', async (req, res) => {
  try {
    const { status, isRead } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    if (isRead !== undefined) filter.isRead = isRead === 'true';
    
    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'İletişim mesajları alınırken hata oluştu', error: error.message });
  }
});

// Get single contact message (Admin only)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Mesaj bulunamadı' });
    }
    
    // Mark as read when viewed
    if (!contact.isRead) {
      contact.isRead = true;
      await contact.save();
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Mesaj alınırken hata oluştu', error: error.message });
  }
});

// Update contact message status (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, isRead } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (isRead !== undefined) updateData.isRead = isRead;
    
    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedContact) {
      return res.status(404).json({ message: 'Mesaj bulunamadı' });
    }
    
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: 'Mesaj güncellenirken hata oluştu', error: error.message });
  }
});

// Delete contact message (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    
    if (!deletedContact) {
      return res.status(404).json({ message: 'Mesaj bulunamadı' });
    }
    
    res.json({ message: 'Mesaj başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Mesaj silinirken hata oluştu', error: error.message });
  }
});

module.exports = router;