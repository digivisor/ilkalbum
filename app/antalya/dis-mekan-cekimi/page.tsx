import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MapPin, Camera, Clock, Star, Phone, Mail, ArrowRight, Sun, Trees, Waves, Mountain, Building, Heart, CheckCircle, Calendar } from 'lucide-react';
import { SITE_URL, buildBreadcrumbLD, buildWebPageLD } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Antalya Dış Çekim Yerleri | Kaleiçi Side Sahil Fotoğraf Çekimi',
  description: 'Antalya dış çekim yerleri: Kaleiçi dış çekim, Side antik tiyatro, sahil fotoğraf çekimi. En güzel Antalya fotoğraf lokasyonları ve profesyonel çekim hizmetleri.',
  keywords: ['antalya dış çekim yerleri', 'antalya kaleiçi dış çekim', 'antalya side dış çekim', 'antalya sahil dış çekim', 'antalya dış mekan çekim', 'antalya fotoğraf çekim yerleri', 'kaleiçi fotoğraf çekimi', 'side antik tiyatro çekim', 'lara beach fotoğraf', 'düden şelalesi çekim', 'antalya çift çekimi lokasyonları', 'antalya düğün çekim yerleri'],
  alternates: { canonical: `${SITE_URL}/antalya/dis-mekan-cekimi` },
  openGraph: {
    title: 'Antalya Dış Çekim Yerleri | Kaleiçi Side Sahil Fotoğraf Çekimi',
    description: 'Antalya\'nın en fotojenik dış çekim yerleri: Kaleiçi tarihi dış çekim, Side antik çekim, sahil fotoğraf çekimi. Profesyonel fotoğrafçı hizmetleri.',
    url: `${SITE_URL}/antalya/dis-mekan-cekimi`,
    siteName: 'İlkalbüm',
    type: 'article',
    locale: 'tr_TR'
  }
};

const locations = [
  {
    name: "Kaleiçi Tarihi Merkez - Antalya Dış Çekim",
    description: "Antalya Kaleiçi dış çekim için en popüler lokasyon. Tarihi dokular, dar sokaklar ve Akdeniz'in muhteşem manzarası. Romantik çift çekimleri ve nostalji dolu kareler için ideal.",
    image: "/düğün2.jpg",
    icon: Building,
    features: ["Tarihi mimari", "Dar sokaklar", "Akdeniz manzarası", "Gün doğumu/batımı"],
    bestFor: "Kaleiçi dış çekim, Nişan fotoğrafları, Romantik portreler",
    bestTime: "Sabah erken saatler (07:00-09:00) ve akşam golden hour (17:00-19:00)"
  },
  {
    name: "Side Antik Tiyatro - Side Dış Çekim",
    description: "Antalya Side dış çekim lokasyonunun incisi. 2000 yıllık tarihi tiyatro ve çevresindeki antik kalıntılar. Tarih kokan unutulmaz kareler.",
    image: "/düğün4.jpg",
    icon: Mountain,
    features: ["Antik mimari", "Tarihi atmosfer", "Geniş perspektif", "Kültürel değer"],
    bestFor: "Side antik çekim, Kültürel çekimler, Sanat fotoğrafları",
    bestTime: "Sabah erken (08:00-10:00) ve geç öğleden sonra (16:00-18:00)"
  },
  {
    name: "Lara Beach Sahili - Antalya Sahil Dış Çekim",
    description: "Antalya sahil dış çekim için en güzel lokasyon. Altın renkli kumlar ve kristal berraklığında Akdeniz. Geniş açık alanlar ve doğal ışık çekimler için mükemmel.",
    image: "/düğün3.jpg", 
    icon: Waves,
    features: ["Altın kumlar", "Berrak deniz", "Geniş alan", "Doğal ışık"],
    bestFor: "Sahil çift çekimi, Düğün çekimleri, Grup fotoğrafları",
    bestTime: "Golden hour (günbatımından 1 saat önce) ve blue hour"
  },
  {
    name: "Düden Şelalesi - Antalya Doğa Çekimi",
    description: "Antalya dış çekim yerlerinin doğal güzelliği. Doğal şelale manzarası ve yeşillikler arasında benzersiz çekim fırsatları.",
    image: "/nisan2.jpg",
    icon: Trees,
    features: ["Doğal şelale", "Yeşil alanlar", "Su sesleri", "Serin ortam"],
    bestFor: "Doğa çekimleri, Bireysel portreler, Aile fotoğrafları", 
    bestTime: "Öğle saatleri dışında tüm gün (ışık dengesi için)"
  },
  {
    name: "Antalya Marina - Modern Çekim Alanı",
    description: "Antalya dış mekan çekim lokasyonlarının modern yüzü. Modern yat limanı ve lüks atmosfer. Çağdaş çekimler ve şehir manzaralı fotoğraflar için ideal.",
    image: "/nisan3.jpg",
    icon: Waves,
    features: ["Modern mimari", "Yat limanı", "Şehir manzarası", "Lüks ortam"],
    bestFor: "Modern çift çekimleri, Kurumsal çekimler, Lifestyle fotoğrafları",
    bestTime: "Akşam saatleri (18:00-20:00) ışık oyunları için"
  },
  {
    name: "Köprülü Kanyon - Macera Çekimi",
    description: "Antalya çekim yerlerinin macera dolu alternatifi. Doğal kanyon manzarası ve Köprüçay nehri. Macera dolu ve doğa içinde eşsiz çekim lokasyonu.",
    image: "/düğün5.jpg",
    icon: Mountain,
    features: ["Kanyon manzarası", "Nehir kenarı", "Dağ manzarası", "Macera"],
    bestFor: "Macera çekimleri, Doğa fotoğrafları, Outdoor aktivite çekimleri",
    bestTime: "Sabah saatleri (09:00-11:00) doğal ışık için en ideal"
  }
];

const shootingTips = [
  {
    icon: Sun,
    title: "Golden Hour Kullanımı", 
    description: "Gün doğumu ve günbatımından 1 saat önce/sonra en güzel ışık koşulları."
  },
  {
    icon: Camera,
    title: "Ekipman Önerileri",
    description: "Geniş açılı lens, tripod ve yedek pil her çekim için gerekli."
  },
  {
    icon: MapPin,
    title: "Lokasyon Planlama",
    description: "Çekim öncesi lokasyon keşfi ve alternatif plan hazırlığı önemli."
  },
  {
    icon: Clock,
    title: "Zaman Yönetimi", 
    description: "Her lokasyon için yeterli süre ayırın ve geçiş sürelerini hesaplayın."
  }
];

export default function DismekanCekimiPage() {
  const breadcrumb = buildBreadcrumbLD([
    { name: 'Anasayfa', url: SITE_URL },
    { name: 'Antalya', url: `${SITE_URL}/antalya` },
    { name: 'Dış Mekan Çekim Lokasyonları', url: `${SITE_URL}/antalya/dis-mekan-cekimi` }
  ]);
  
  const pageLD = buildWebPageLD({
    name: 'Antalya Dış Mekan Çekim Lokasyonları',
    description: 'Antalya\'da dış mekan fotoğraf çekimi için en güzel lokasyonlar ve profesyonel öneriler.',
    path: '/antalya/dis-mekan-cekimi'
  });

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="hero-gradient py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="w-6 h-6" />
                <span className="text-white/90">Antalya Lokasyon Rehberi</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">
                Antalya Dış Çekim Yerleri ve Lokasyonları
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Antalya Kaleiçi dış çekim, Side antik tiyatro çekimi, sahil fotoğraf çekimi... 
                Antalya'nın en güzel dış çekim yerlerini keşfedin ve unutulmaz anlar yakalayın.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/iletisim" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105">
                  Çekim Rezervasyonu
                </Link>
                <Link href="/fiyatlandirma" className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300">
                  Fiyat Bilgisi
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Locations Grid */}
        <section className="py-20 bg-gradient-to-b from-white to-primary/5">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Popüler Çekim Lokasyonları
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Her lokasyonun kendine özgü karakteri ve çekim avantajları var. 
                İhtiyacınıza en uygun mekanları keşfedin.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {locations.map((location, index) => (
                <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={location.image} 
                      alt={location.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <location.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-playfair font-bold text-white mb-1">
                        {location.name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {location.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Özellikler</h4>
                        <ul className="space-y-1">
                          {location.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">İdeal Çekim</h4>
                        <p className="text-sm text-gray-600">{location.bestFor}</p>
                      </div>
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        En İyi Çekim Saatleri
                      </h4>
                      <p className="text-sm text-gray-700">{location.bestTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photography Tips */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Profesyonel Çekim İpuçları
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Dış mekan fotoğraf çekimi için uzman fotoğrafçılarımızdan öneriler.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {shootingTips.map((tip, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl hover:from-primary/10 hover:to-primary/15 transition-all duration-300">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <tip.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Weather & Seasonal Tips */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
                  Mevsimsel Çekim Rehberi
                </h2>
                <p className="text-lg text-gray-600">
                  Antalya'da yıl boyunca her mevsimin kendine özgü çekim avantajları var.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">İlkbahar & Yaz (Mart-Eylül)</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Uzun gün ışığı ve golden hour fırsatları</span>
                    </li>
                    <li className="flex items-start">  
                      <Heart className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Canlı doğa renkleri ve çiçek açmış ağaçlar</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Sahil çekimleri için ideal hava koşulları</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Sonbahar & Kış (Ekim-Şubat)</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Daha az turistik yoğunluk, sakin çekimler</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Yumuşak ışık koşulları, kontrast kontrolü</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Kaleiçi ve tarihi mekanlarda atmosferik çekimler</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Excellence Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                  Lokasyon Bazlı Teknik Uzmanlık
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Her lokasyonun kendine özgü teknik gereksinimleri vardır. Uzman ekibimiz her mekana özel çekim teknikleri uygular.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div>
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                    Sahil & Su Kenarı Çekimleri
                  </h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-primary pl-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Reflektör Kullanımı</h4>
                      <p className="text-gray-600">Sahil çekimlerinde suyun yansıttığı ışığı kontrol etmek için altın ve gümüş reflektörler kullanırız. Bu teknikle portre çekimlerinde doğal dolgu ışığı elde ederiz.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Polarize Filtre Uygulaması</h4>
                      <p className="text-gray-600">Deniz ve gökyüzünden gelen yansımaları kontrol etmek için polarize filtreler kullanıyoruz. Bu sayede daha doygun renkler ve berrak su yüzeyleri elde ediyoruz.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Dalga ve Hareket Yakalama</h4>
                      <p className="text-gray-600">Sahil çekimlerinde dalgaların hareketini yakalamak için farklı shutter hızları kullanıyoruz. Donmuş dalga efekti için 1/1000s, ipeksi su efekti için uzun pozlama teknikleri.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                    Tarihi Mekan & Mimari Çekimler
                  </h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-primary pl-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Perspektif Düzeltme</h4>
                      <p className="text-gray-600">Kaleiçi gibi tarihi mekanlarda mimari detayları bozmayan açılar kullanıyoruz. Tilt-shift lensleri ile perspektif bozulmasını önlüyoruz.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Işık-Gölge Dengesi</h4>
                      <p className="text-gray-600">Dar sokaklarda gölgeli alanları dengelemek için dolgu ışığı kullanıyoruz. HDR teknikleri ile yüksek kontrast alanları doğal görünümde yakalıyoruz.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Atmosfer Yakalama</h4>
                      <p className="text-gray-600">Tarihi dokuyu vurgulamak için warm ton ayarları kullanıyoruz. Doğal yaşlanma efektleri ve nostalji hissi yaratan renk paletleri uyguluyoruz.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Photography Guide */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-white">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                  Antalya Mevsimsel Fotoğrafçılık Rehberi
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Akdeniz iklimine sahip Antalya'da her mevsimin kendine özgü fotoğraf çekim avantajları bulunur. 
                  İşte mevsimlere göre çekim stratejilerimiz.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <Sun className="w-8 h-8 text-orange-500 mr-3" />
                    <h3 className="text-2xl font-playfair font-bold text-gray-900">İlkbahar & Yaz Çekimleri</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Mart - Mayıs (İlkbahar)</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Çiçek açan ağaçlar ve canlı yeşillikler</li>
                        <li>• Ideal sıcaklık (18-25°C) uzun çekimler için mükemmel</li>
                        <li>• Turist yoğunluğu henüz başlamadan sakin lokasyonlar</li>
                        <li>• Doğa çekimleri ve portre çekimleri için en uygun mevsim</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Haziran - Ağustos (Yaz)</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Uzun gün ışığı (05:30 - 20:00 arası golden hour)</li>
                        <li>• Berrak gökyüzü ve canlı deniz renkleri</li>
                        <li>• Sahil çekimleri için mükemmel hava koşulları</li>
                        <li>• Erken sabah ve akşam çekimleri önerilir</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <Trees className="w-8 h-8 text-amber-600 mr-3" />
                    <h3 className="text-2xl font-playfair font-bold text-gray-900">Sonbahar & Kış Çekimleri</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Eylül - Kasım (Sonbahar)</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Yumuşak ve eşit dağılmış ışık koşulları</li>
                        <li>• Turist yoğunluğu azalması, rahat çekim imkanı</li>
                        <li>• Portakal bahçeleri ve sonbahar renkleri</li>
                        <li>• Düğün çekimleri için ideal hava koşulları</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Aralık - Şubat (Kış)</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Dramatik bulutlu gökyüzü ve atmosferik ışık</li>
                        <li>• Karlı Toros Dağları manzaralı çekimler</li>
                        <li>• İç mekan ve tarihi yapı çekimleri için ideal</li>
                        <li>• Romantik ve atmosferik çift çekimleri</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment and Preparation Guide */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                  Çekim Hazırlığı ve Ekipman Rehberi
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Başarılı bir dış mekan çekimi için doğru hazırlık ve profesyonel ekipman kullanımı kritik öneme sahiptir.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-8">
                    Profesyonel Ekipman Seçimi
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Camera className="w-5 h-5 text-primary mr-2" />
                        Kamera Gövdeleri
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li><strong>Full Frame DSLR/Mirrorless:</strong> Düşük ışık performansı ve geniş dinamik aralık</li>
                        <li><strong>Weather Sealing:</strong> Sahil çekimlerinde nem ve tuz koruması</li>
                        <li><strong>Dual Card Slot:</strong> Güvenlik için çift kart desteği</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <MapPin className="w-5 h-5 text-primary mr-2" />
                        Lens Seçimi
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li><strong>24-70mm f/2.8:</strong> Çok amaçlı, portre ve grup çekimleri</li>
                        <li><strong>70-200mm f/2.8:</strong> Uzak çekimler ve arka plan bulanıklaştırma</li>
                        <li><strong>16-35mm f/2.8:</strong> Manzara ve geniş açı çekimler</li>
                        <li><strong>85mm f/1.4:</strong> Portre çekimleri için ideal</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Sun className="w-5 h-5 text-primary mr-2" />
                        Işık Ekipmanları
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li><strong>Reflektörler:</strong> 5-in-1 reflektör seti (altın, gümüş, beyaz, siyah, diffuser)</li>
                        <li><strong>External Flash:</strong> TTL destekli güçlü flaş ünitesi</li>
                        <li><strong>LED Panel:</strong> Video çekimleri için sürekli ışık</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-8">
                    Çekim Öncesi Hazırlık
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="bg-gradient-to-r from-amber/10 to-amber/5 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Clock className="w-5 h-5 text-amber-600 mr-2" />
                        Lokasyon Keşfi
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li><strong>Scouting Gezisi:</strong> Çekim öncesi lokasyon inceleme</li>
                        <li><strong>Golden Hour Hesaplama:</strong> Güneş açısı ve ışık yönü analizi</li>
                        <li><strong>Plan B Hazırlığı:</strong> Hava şartları için alternatif lokasyonlar</li>
                        <li><strong>İzin Durumu:</strong> Gerekli çekim izinlerinin kontrolü</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-amber/10 to-amber/5 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-amber-600 mr-2" />
                        Çekim Günü Checklist
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li><strong>Batarya Kontrolü:</strong> Tam şarjlı bataryalar ve yedek piller</li>
                        <li><strong>Hafıza Kartları:</strong> Formatlanmış ve boş kartlar</li>
                        <li><strong>Hava Durumu:</strong> Güncel hava raporu takibi</li>
                        <li><strong>Ulaşım Planı:</strong> Lokasyonlar arası geçiş süreleri</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-amber/10 to-amber/5 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Heart className="w-5 h-5 text-amber-600 mr-2" />
                        Müşteri Hazırlığı
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li><strong>Kıyafet Danışmanlığı:</strong> Lokasyona uygun giyim önerileri</li>
                        <li><strong>Poz Rehberi:</strong> Doğal poz teknikleri eğitimi</li>
                        <li><strong>Konfor Sağlama:</strong> Rahat çekim ortamı yaratma</li>
                        <li><strong>Beklenti Yönetimi:</strong> Çekim süreci hakkında bilgilendirme</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                  Dış Mekan Çekimi Hakkında Sık Sorulan Sorular
                </h2>
                <p className="text-lg text-gray-600">
                  Antalya'da dış mekan fotoğraf çekimi ile ilgili en çok merak edilen konular.
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Antalya'da dış mekan çekimi için en iyi aylar hangileridir?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Antalya'da dış mekan çekimi için en ideal aylar Nisan-Haziran ve Eylül-Kasım dönemleridir. 
                    Bu aylarda hava sıcaklığı (20-28°C) ideal seviyede, turistik yoğunluk nispeten az ve doğal 
                    ışık koşulları mükemmeldir. Yaz aylarında (Temmuz-Ağustos) erken sabah (06:00-09:00) ve 
                    akşam saatleri (18:00-20:00) tercih edilmelidir. Kış aylarında da (Aralık-Şubat) Antalya'nın 
                    ılıman iklimi sayesinde çekim yapılabilir.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Kaleiçi'nde çekim için özel izin gerekir mi?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Kaleiçi Tarihi Merkezi'nde kişisel ve aile çekimleri için özel izin gerekmez. Ancak ticari 
                    amaçlı çekimler, büyük grup çekimleri veya profesyonel ekipman kullanımında Antalya 
                    Büyükşehir Belediyesi'nden çekim izni alınması önerilir. Düğün çekimlerinde genellikle 
                    sorun yaşanmaz, fakat ekibimiz tüm yasal gereklilikleri önceden organize eder. Tarihi 
                    eserlere zarar verebilecek çekim teknikleri (tripod, ışık standı) kullanmadan önce mutlaka 
                    yetkililerle görüşülmelidir.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Sahil çekimlerinde hangi saatler en uygun?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Sahil çekimleri için en ideal saatler golden hour dönemleridir: gün doğumundan sonraki 
                    1 saat (06:30-07:30) ve günbatımından önceki 1 saat (18:30-19:30). Bu saatlerde güneş 
                    açısı düşük olduğu için yumuşak, altın tonunda ışık elde edilir. Öğle saatlerinde (11:00-15:00) 
                    güneş çok sert olduğu için gölgeli alanlar tercih edilmeli veya reflektör kullanılmalıdır. 
                    Blue hour (günbatımından sonraki 20-30 dakika) romantik ve dramatik çekimler için mükemmeldir.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Aspendos Antik Tiyatro çekimleri nasıl planlanır?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Aspendos Antik Tiyatro çekimleri için sabah erken saatler (08:00-10:00) en idealdir. 
                    Bu saatte ziyaretçi yoğunluğu azdır ve ışık yumuşaktır. Çekim için müze giriş ücreti 
                    ödenir ve resmi ziyaret saatlerinde (08:00-19:00) çekim yapılabilir. Tarihi yapıya zarar 
                    verebilecek ekipmanlar (büyük tripod, ışık standı) kullanılamaz. Tiyatronun akustik 
                    özelliklerini vurgulamak için geniş açı lensler ve perspektif çekimleri önerilir. Geç 
                    öğleden sonra (16:00-18:00) güneş açısı ideal konuma gelir.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Düden Şelalesi çekimlerinde nelere dikkat edilmeli?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Düden Şelalesi çekimlerinde nem ve su damlacıkları ekipman için risk oluşturur. 
                    Kamera ve lenslerin suya dayanıklı olması (weather sealing) önemlidir. Şelale çekimlerinde 
                    farklı shutter hızları kullanılır: donmuş su efekti için 1/500s ve üzeri, ipeksi su efekti 
                    için 1-2 saniye pozlama süresi. Tripod kullanımı uzun pozlama için şarttır. En iyi ışık 
                    koşulları öğle saatleri dışında (09:00-11:00, 15:00-17:00) elde edilir. Yeşillik ve su 
                    kontrastı için polarize filtre kullanımı önerilir.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Çekim için kıyafet seçimi nasıl olmalı?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Dış mekan çekimi kıyafet seçimi lokasyona göre değişir. Sahil çekimleri için açık renkli, 
                    flowing kumaşlar (şifon, ipek) rüzgarda güzel hareketler yaratır. Kaleiçi gibi tarihi 
                    mekanlarda vintage veya klasik tarzlar daha uyumludır. Doğa çekimlerinde earthy tonlar 
                    (kahve, bej, haki) çevre ile uyum sağlar. Çok parlak desenler veya logoları kaçınılmalıdır. 
                    Konforlu ayakkabılar seçilmeli, topuklu ayakkabılar için yedek düz ayakkabı getirilmelidir. 
                    Hava şartlarına uygun yedek kıyafet bulundurulmalıdır.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Antalya Marina çekimlerinin özellikleri nelerdir?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Antalya Marina modern ve lüks bir çekim lokasyonudur. Yat limanı, upscale restoranlar ve 
                    sea view manzarası sunar. En iyi çekim saatleri akşam (18:00-20:00) golden hour dönemindedir. 
                    Marina'da yacht background'u, modern mimari detaylar ve Mediterranean lifestyle konsepti 
                    çekimler yapılabilir. Akşam saatlerinde ışıklı yat dizilimi romantic bir atmosfer yaratır. 
                    Marina çevresindeki upscale cafe ve restaurantlar alternatif çekim alanları sunar. Weekend'lerde 
                    yoğunluk fazla olduğu için hafta içi çekimler daha rahat geçer.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Dış mekan çekimi fiyatlandırması nasıl hesaplanır?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Dış mekan çekimi fiyatlandırması çekim süresi, lokasyon sayısı, fotoğrafçı sayısı ve 
                    additional services'e göre belirlenir. Temel paket (2 saat, 1 lokasyon, 50+ editli fotoğraf) 
                    1.500₺ - 2.500₺ arasındadır. Multiple locations (3+ lokasyon) için %30 ek ücret uygulanır. 
                    Golden hour veya özel saatlerde çekim %20 premium fiyat içerir. Engagement, couple, family 
                    ve individual çekimler farklı fiyat kategorilerindedir. Wedding çekimleri full day packages 
                    (8-12 saat) 5.000₺ - 15.000₺ range'indedir. Tüm paketlerde online gallery, high-resolution 
                    download ve basic retouching dahildir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
          <div className="container text-center text-white">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
              Hayalinizdeki Çekim Lokasyonunu Keşfedin
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Antalya'nın en güzel lokasyonlarında unutulmaz fotoğraf çekimi deneyimi yaşayın. 
              Uzman ekibimiz size en uygun mekanları önerir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/iletisim" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" />
                Ücretsiz Danışmanlık
              </Link>
              <Link href="/galeri" className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300 inline-flex items-center justify-center">
                <Camera className="w-5 h-5 mr-2" />
                Çekim Örnekleri
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      {/* Floating Reservation Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="tel:+905457845667"
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110 group"
          title="Hemen Ara"
        >
          <Phone className="w-6 h-6" />
        </a>
        <Link
          href="/iletisim"
          className="bg-white text-primary border-2 border-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 group"
          title="Rezervasyon Yap"
        >
          <Calendar className="w-6 h-6" />
        </Link>
      </div>
      
      <Footer />
    </>
  );
}