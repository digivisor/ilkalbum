const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Gallery = require('./models/Gallery');
const Pricing = require('./models/Pricing');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ilkalbum', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedDatabase() {
  try {
    console.log('Veritabanı temizleniyor...');
    
    // Clear existing data
    await Admin.deleteMany({});
    await Gallery.deleteMany({});
    await Pricing.deleteMany({});

    console.log('Admin kullanıcısı oluşturuluyor...');
    
    // Create admin user
    const admin = new Admin({
      username: 'admin',
      email: 'admin@ilkalbum.com',
      password: 'ilkalbum2025'
    });
    await admin.save();

    console.log('Örnek galeri öğeleri ekleniyor...');
    


    console.log('✅ Veritabanı başarıyla dolduruldu!');
    console.log('Admin bilgileri:');
    console.log('Kullanıcı adı: admin');
    console.log('Şifre: admin123');
    console.log('Admin paneli: http://localhost:3000/admin');
    
    process.exit(0);
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
}

seedDatabase();