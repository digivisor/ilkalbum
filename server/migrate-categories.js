const mongoose = require('mongoose');
const Pricing = require('./models/Pricing');

// Veritabanı bağlantısı
mongoose.connect('mongodb://localhost:27017/ilkalbum', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function migratePricingCategories() {
  try {
    console.log('Pricing kategorileri güncelleniyor...');
    
    // Eski category field'ına sahip tüm paketleri bul
    const packages = await Pricing.find({ category: { $exists: true } });
    
    console.log(`${packages.length} paket bulundu, güncellemeler yapılıyor...`);
    
    for (const pkg of packages) {
      // Eski category'yi categories array'ine dönüştür
      if (pkg.category && (!pkg.categories || pkg.categories.length === 0)) {
        const categoryMapping = {
          'Düğün': 'Düğün Fotoğrafçılığı',
          'Nişan': 'Nişan Çekimi', 
          'Bebek': 'Bebek Fotoğrafları',
          'Dış Çekim': 'Dış Çekim'
        };
        
        const mappedCategory = categoryMapping[pkg.category] || pkg.category;
        
        await Pricing.findByIdAndUpdate(pkg._id, {
          categories: [mappedCategory],
          $unset: { category: 1 } // Eski category field'ını kaldır
        });
        
        console.log(`Paket güncellendi: ${pkg.name} - ${pkg.category} -> [${mappedCategory}]`);
      }
    }
    
    console.log('Migration tamamlandı!');
  } catch (error) {
    console.error('Migration hatası:', error);
  } finally {
    mongoose.connection.close();
  }
}

migratePricingCategories();