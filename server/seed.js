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
      password: 'admin123'
    });
    await admin.save();

    console.log('Örnek galeri öğeleri ekleniyor...');
    
    // Sample gallery items
    const galleryItems = [
      {
        title: 'Düğün Töreni',
        description: 'Muhteşem bir düğün töreni anı',
        type: 'photo',
        category: 'dugun',
        url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        order: 1
      },
      {
        title: 'Nişan Çekimi',
        description: 'Romantik nişan fotoğrafı',
        type: 'photo',
        category: 'nisan',
        url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        order: 2
      },
      {
        title: 'Bebek Fotoğrafı',
        description: 'Sevimli bebek portresi',
        type: 'photo',
        category: 'bebek',
        url: 'https://images.pexels.com/photos/1648376/pexels-photo-1648376.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        order: 3
      },
      {
        title: 'Dış Çekim',
        description: 'Doğada güzel bir çekim',
        type: 'photo',
        category: 'dis-cekim',
        url: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        order: 4
      },
      {
        title: 'Düğün Videosu',
        description: 'Düğün günü highlight videosu',
        type: 'video',
        category: 'dugun',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnailUrl: 'https://images.pexels.com/photos/1816654/pexels-photo-1816654.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        order: 5
      }
    ];

    await Gallery.insertMany(galleryItems);

    console.log('Örnek fiyatlandırma paketleri ekleniyor...');
    
    // Sample pricing packages
    const pricingPackages = [
      {
        name: 'Temel Paket',
        price: '₺2.500',
        originalPrice: '₺3.000',
        category: 'Nişan & Dış Çekim',
        duration: '3 saat',
        isPopular: false,
        features: [
          '3 saat çekim süresi',
          '100+ dijital fotoğraf',
          'Profesyonel düzenleme',
          'Online galeri paylaşımı',
          '1 lokasyon çekimi',
          'Temel retüş işlemleri',
          '15 gün teslimat süresi'
        ],
        notIncluded: [
          'Baskı hizmetleri',
          'Video çekimi',
          'Ek lokasyonlar'
        ],
        order: 1
      },
      {
        name: 'Standart Paket',
        price: '₺4.500',
        originalPrice: '₺5.500',
        category: 'Düğün',
        duration: '8 saat',
        isPopular: true,
        features: [
          '8 saat sürekli çekim',
          '400+ dijital fotoğraf',
          'Profesyonel düzenleme',
          'Online galeri + USB',
          'Hazırlık ve tören çekimi',
          'Çift pozları ve portreler',
          'Detay çekimleri',
          'Aile fotoğrafları',
          '10 gün teslimat süresi'
        ],
        notIncluded: [
          'Video çekimi',
          'Drone çekimi',
          'Albüm baskısı'
        ],
        order: 2
      },
      {
        name: 'Premium Paket',
        price: '₺7.500',
        originalPrice: '₺9.000',
        category: 'Düğün + Video',
        duration: '12 saat',
        isPopular: false,
        features: [
          '12 saat tam gün çekim',
          '600+ dijital fotoğraf',
          '3-5 dakika highlight video',
          'Profesyonel düzenleme',
          'Online galeri + USB + DVD',
          'Hazırlık ve tören çekimi',
          'Drone çekimi (hava şartları uygunsa)',
          'Çift pozları ve portreler',
          'Detay çekimleri dahil',
          'Aile ve grup fotoğrafları',
          '7 gün hızlı teslimat'
        ],
        notIncluded: [
          'Albüm baskısı (ayrı ücret)'
        ],
        order: 3
      },
      {
        name: 'Bebek Paketi',
        price: '₺1.800',
        originalPrice: '₺2.200',
        category: 'Bebek & Aile',
        duration: '2 saat',
        isPopular: false,
        features: [
          '2 saat stüdyo çekimi',
          '80+ dijital fotoğraf',
          'Prop ve aksesuar dahil',
          'Güvenli çekim ortamı',
          'Profesyonel düzenleme',
          'Online galeri paylaşımı',
          'Aile pozları dahil',
          '12 gün teslimat süresi'
        ],
        notIncluded: [
          'Dış çekim',
          'Video kaydı',
          'Baskı hizmetleri'
        ],
        order: 4
      }
    ];

    await Pricing.insertMany(pricingPackages);

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