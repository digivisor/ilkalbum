'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategoryGallery } from '@/components/CategoryGallery';
import { ReservationModal } from '@/components/ReservationModal';
import { PricingModal } from '@/components/PricingModal';
import { Heart, Camera, MapPin, Clock, Users, Star, Phone, Mail, CheckCircle, Gift, Sparkles, Calendar } from 'lucide-react';
import { SITE_URL, buildBreadcrumbLD, buildWebPageLD, buildServicesLD, buildLocalBusinessLD, buildFaqLD } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';

const weddingPackages = [
  {
    name: "Tam Gün Paket",
    duration: "10-12 saat",
    features: [
      "Hazırlık çekimleri (gelin-damat)",
      "First look ve çift çekimi", 
      "Nikah/tören fotograflama",
      "Aile portreleri",
      "After party çekimi",
      "600-900 düzenlenmiş fotoğraf",
      "Drone çekimi (hava şartlarına bağlı)",
      "Online galeri"
    ],
    recommended: true
  },
  {
    name: "Yarım Gün Paket",
    duration: "5-6 saat",
    features: [
      "Tören öncesi hazırlık",
      "Nikah/tören fotograflama",
      "Aile portreleri",
      "Çift çekimi",
      "400-600 düzenlenmiş fotoğraf",
      "Online galeri"
    ],
    recommended: false
  },
  {
    name: "Premium Paket",
    duration: "Tüm gün + ek hizmetler",
    features: [
      "Tüm Tam Gün hizmetleri",
      "Save the date çekimi",
      "Highlight video (3-5 dk)",
      "İkinci fotoğrafçı",
      "Drone çekimi garantili",
      "800-1200 düzenlenmiş fotoğraf",
      "Fotoğraf albümü",
      "USB kutu"
    ],
    recommended: false
  }
];

const weddingLocations = [
  {
    name: "Kaleiçi Tarihi Merkez",
    description: "Osmanlı mimarisi, dar taş sokaklar ve tarihi atmosfer",
    image: "/düğün2.jpg",
    icon: MapPin,
    features: ["Tarihi dokular", "Romantik köşeler", "Golden hour imkanları"]
  },
  {
    name: "Lara Beach",
    description: "Altın kumlar, masmavi deniz ve gün batımı",
    image: "/düğün3.jpg", 
    icon: Heart,
    features: ["Sahil romantizmi", "Günbatımı çekimleri", "Geniş açık alanlar"]
  },
  {
    name: "Side Antik Kenti",
    description: "Roma tiyatrosu, antik sütunlar ve tarhi harabe dokuları",
    image: "/düğün4.jpg",
    icon: Star,
    features: ["Antik tiyatro", "Tarihi sütunlar", "Unique konsept"]
  }
];

const weddingMoments = [
  {
    title: "Hazırlık Anları",
    description: "Gelinin ve damadın hazırlık sürecindeki samimi ve duygusal anlar",
    icon: Sparkles,
    moments: ["Gelinlik giyme", "Damadın son hazırlıkları", "Aile desteği", "Detay çekimleri"]
  },
  {
    title: "First Look",
    description: "Çiftlin birbirini ilk gördüğü o büyülü an ve doğal tepkiler",
    icon: Heart,
    moments: ["İlk bakış", "Duygusal tepkiler", "Romantik pozlar", "Samimi sohbet"]
  },
  {
    title: "Tören Anları", 
    description: "Nikah ve düğün törenindeki resmi ve duygusal kareler",
    icon: Users,
    moments: ["Nikah imzası", "Yüzük takma", "İlk dans", "Aile kutlamaları"]
  }
];

export default function AntalyaDugunPage() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  
  const breadcrumb = buildBreadcrumbLD([
    { name: 'Anasayfa', url: SITE_URL },
    { name: 'Antalya', url: `${SITE_URL}/antalya` },
    { name: 'Düğün Fotoğrafçısı', url: `${SITE_URL}/antalya/dugun-fotografcisi` }
  ]);
  const pageLD = buildWebPageLD({
    name: 'Antalya Düğün Fotoğrafçısı',
    description: 'Antalya düğün hikaye anlatımı, hazırlık, first look, nikah ve after party çekimleri.',
    path: '/antalya/dugun-fotografcisi'
  });
  // Placeholder service structured data (adjust with real package names later)
  const services = buildServicesLD([
    { id: 'dugun-tam-gun', name: 'Antalya Düğün Tam Gün Paket', price: '14500₺', category: 'Düğün Fotoğrafçılığı' },
    { id: 'dugun-yarim-gun', name: 'Antalya Düğün Yarım Gün Paket', price: '9500₺', category: 'Düğün Fotoğrafçılığı' }
  ]);
  const localBusiness = buildLocalBusinessLD({
    name: 'İlkalbüm Fotoğrafçılık',
    telephone: '+90-545-784-56-67',
    streetAddress: 'Emek Mh. Yeşilırmak Cd',
    addressLocality: 'Antalya',
    addressRegion: 'Antalya',
    postalCode: '07060',
    areaServed: ['Antalya', 'Muratpaşa', 'Konyaaltı', 'Kepez'],
    geo: { latitude: 36.8969, longitude: 30.7133 }
  });
  const faqLD = buildFaqLD([
    { q: 'Antalya düğün fotoğrafçısı fiyatları nasıl?', a: 'Kapsama (saat, lokasyon, opsiyonlar) göre değişir; fiyatlandırma sayfasında güncel paket detaylarını paylaşıyoruz.' },
    { q: 'Tam gün mü yarım gün mü seçmeliyiz?', a: 'Hazırlık + tören + after party içeren akışlarda tam gün daha uygundur; daha kısa programlarda yarım gün yeterli olur.' }
  ]);

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
      {services.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="hero-gradient py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-6 h-6" />
                <span className="text-white/90">Antalya Düğün Fotoğrafçısı</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">
                Hikaye Odaklı Düğün Fotoğrafçılığı
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Antalya'nın büyülü lokasyonlarında aşk hikayenizi ölümsüzleştirin. 
                Kaleiçi'nin tarihi dokusu, Lara'nın altın kumları ve Side'nin antik güzelliği eşliğinde.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/iletisim" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105">
                  Rezervasyon Yap
                </Link>
                <Link href="/fiyatlandirma" className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300">
                  Paket Fiyatları
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "500+", label: "Mutlu Çift", icon: Heart },
                { number: "10+", label: "Yıl Deneyim", icon: Camera },
                { number: "15+", label: "Lokasyon", icon: MapPin },
                { number: "24/7", label: "Destek Hattı", icon: Phone }
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wedding Moments */}
        <section className="py-20 bg-gradient-to-b from-white to-primary/5">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Düğün Gününüzün Her Anı
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hazırlık sürecinden after party'ye kadar aşkınızın hikayesini belgeleriz.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {weddingMoments.map((moment, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <moment.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-gray-900 text-center mb-4">
                    {moment.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    {moment.description}
                  </p>
                  <ul className="space-y-2">
                    {moment.moments.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wedding Packages */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Düğün Çekim Paketleri
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                İhtiyaçlarınıza uygun esnek paket seçenekleri ile özel gününüzü ölümsüzleştirin.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {weddingPackages.map((pkg, index) => (
                <div key={index} className={`rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-xl relative ${
                  pkg.recommended 
                    ? 'border-primary bg-primary/5 shadow-lg scale-105' 
                    : 'border-gray-200 bg-white hover:border-primary/30'
                }`}>
                  {pkg.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                        En Popüler
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{pkg.duration}</p>
                    <div className="text-lg text-gray-600 mb-2">Kişiselleştirilmiş fiyat teklifi</div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => {
                      setSelectedPackage(pkg.name);
                      setIsPricingModalOpen(true);
                    }}
                    className={`w-full block text-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      pkg.recommended
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'bg-gray-100 text-gray-900 hover:bg-primary hover:text-white'
                    }`}
                  >
                    Fiyat Bilgisi Al
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wedding Locations */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Popüler Düğün Lokasyonları
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Antalya'nın en fotojenik lokasyonlarında unutulmaz düğün çekimleri.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {weddingLocations.map((location, index) => (
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
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <location.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-lg font-playfair font-bold text-white">
                        {location.name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      {location.description}
                    </p>
                    <ul className="space-y-2">
                      {location.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wedding Gallery Section */}
        <CategoryGallery 
          category="dugun" 
          showTitle={true}
          showViewAllButton={true}
          limit={8}
        />

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
                Sık Sorulan Sorular
              </h2>
              <p className="text-lg text-gray-600">
                Düğün fotoğrafçılığı hakkında merak ettikleriniz.
              </p>
            </div>
            
            <div className="space-y-6">
              {[{
                q: 'Antalya düğün çekimi kaç saat sürüyor?',
                a: 'Tam gün paket genelde 10-12 saat sürer; hazırlık + tören + after party kapsar. Yarım gün paket ise 5-6 saat sürmektedir.'
              }, {
                q: 'Fotoğrafların teslim süresi nedir?',
                a: 'Ön izleme 7 gün içinde paylaşılır, tüm fotoğrafların düzenlenmesi ve teslimi 4 hafta içinde tamamlanır.'
              }, {
                q: 'Kaç fotoğraf teslim ediyorsunuz?',
                a: 'Tam gün çekimlerde 600-900 arası, yarım gün çekimlerde 400-600 arası seçilmiş ve profesyonelce düzenlenmiş fotoğraf teslim edilir.'
              }, {
                q: 'Drone çekimi dahil mi?',
                a: 'Drone çekimi hava şartlarına bağlı olarak Tam Gün ve Premium paketlerde opsiyonel olarak sunulmaktadır.'
              }, {
                q: 'Rezervasyon nasıl kesinleşiyor?',
                a: '%30 kapora ile tarih bloke edilir, kalan bakiye düğün gününden önce ödenir. Detaylar sözleşmede belirtilir.'
              }, {
                q: 'Antalya\'da en iyi düğün çekimi lokasyonları hangileri?',
                a: 'Kaleiçi tarihi merkez romantik kareler için, Lara Beach gün batımı çekimleri için, Side Antik Tiyatro unique konseptler için idealdir.'
              }, {
                q: 'Düğün fotoğrafçısı seçerken nelere dikkat etmeliyiz?',
                a: 'Portfolio incelemesi, önceki çiftlerden referans alma, paket detayları ve çalışma tarzının size uygun olup olmadığını değerlendirmelisiniz.'
              }, {
                q: 'Kış aylarında Antalya düğün çekimi yapılabilir mi?',
                a: 'Antalya\'nın ılıman iklimi sayesinde kış aylarında da çekim yapılabilir. Özellikle aralık-şubat arası daha uygun fiyatlarla hizmet verilir.'
              }].map((faq, i) => (
                <details key={i} className="group border border-primary/20 rounded-2xl p-6 bg-gradient-to-r from-white to-primary/5">
                  <summary className="cursor-pointer text-lg font-semibold text-gray-900 flex justify-between items-center">
                    <span>{faq.q}</span>
                    <span className="text-primary group-open:rotate-45 transition-transform text-xl">+</span>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
                Neden İlkalbüm Fotoğrafçılık?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Antalya'da düğün fotoğrafçılığında 10 yılı aşkın deneyimimiz ile 500'den fazla çiftin mutlu gününe şahitlik ettik. Profesyonel ekipmanlar, yaratıcı bakış açısı ve detaylara verdiğimiz özenle fark yaratıyoruz.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">Professional Ekipman</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Canon 5D Mark IV, profesyonel objektifler, studio flashları ve drone ile her koşulda mükemmel kalite sunuyoruz.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">Hikaye Anlatımı</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Sadece fotoğraf çekmiyoruz, aşk hikayenizi belgeleriz. Her kare duygusal bir anlam taşır ve yıllar sonra o anları yaşatır.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">Lokasyon Uzmanlığı</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Antalya'nın her köşesini biliyoruz. Kaleiçi'nin gizli köşelerinden Side'nin antik güzelliğine kadar en iyi kareler için rehberlik ediyoruz.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">Hızlı Teslimat</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Ön izleme fotoğraflarını 7 gün içinde, düzenlenmiş tüm kareler 4 hafta içinde online galerinizde.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">Deneyimli Ekip</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  10+ yıl tecrübe, 500+ mutlu çift. Premium paketlerde ikinci fotoğrafçı desteği ile hiçbir anı kaçırmıyoruz.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">Kişisel Yaklaşım</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Her çiftin hikayesi unique. Kişiliklerinize, tarzınıza uygun konseptler geliştiriyor, özel isteklerinizi dikkate alıyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Photography Style & Process */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
                  Çalışma Tarzımız ve Sürecimiz
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Antalya düğün fotoğrafçılığında doğal, samimi ve hikaye odaklı yaklaşım benimsiyoruz. Zorlanmış pozlar yerine o anın gerçek duygusunu yakalamaya odaklanıyoruz. İşte çalışma sürecimiz:
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Ön Görüşme & Planlama</h3>
                      <p className="text-gray-600">Çiftlerimizle tanışıyor, hikayelerini dinliyor, beklentilerini öğreniyoruz. Düğün gününün programını detaylıca planlıyoruz.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Lokasyon Keşfi</h3>
                      <p className="text-gray-600">Antalya'da çekim yapılacak mekanları önceden inceliyoruz. En iyi ışık koşulları ve kompozisyon noktalarını belirliyoruz.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Çekim Günü</h3>
                      <p className="text-gray-600">Hazırlıktan after party'ye kadar düğün gününün her anında yanınızdayız. Doğal anları yakalar, grup fotoğraflarını organize ederiz.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold">4</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Post-Production & Teslimat</h3>
                      <p className="text-gray-600">Her fotoğrafı özenle seçip düzenliyoruz. Renk düzeltmesi, ton ayarları ve retüş çalışmalarıyla mükemmel sonuçlar elde ediyoruz.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:order-first">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">10+</div>
                      <div className="text-sm text-gray-600">Yıl Deneyim</div>
                    </div>
                    <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">500+</div>
                      <div className="text-sm text-gray-600">Mutlu Çift</div>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">15+</div>
                      <div className="text-sm text-gray-600">Lokasyon</div>
                    </div>
                    <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">4</div>
                      <div className="text-sm text-gray-600">Hafta Teslimat</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wedding Photography Tips */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
                Antalya Düğün Çekimi İpuçları
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Profesyonel düğün fotoğrafçınız olarak size Antalya'da mükemmel düğün çekimi için önerilerimizi paylaşıyoruz.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-6">En İyi Çekim Zamanları</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">Golden Hour (Altın Saat)</h4>
                    <p className="text-gray-600 text-sm">Gün doğumundan 1 saat sonra ve gün batımından 1 saat önce. En romantik ışık koşulları.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">Mavi Saat (Blue Hour)</h4>
                    <p className="text-gray-600 text-sm">Gün batımından sonraki 30 dakika. Şehir ışıkları ve doğal ışığın mükemmel karışımı.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">İç Mekan Çekimleri</h4>
                    <p className="text-gray-600 text-sm">Öğle saatlerinde pencere ışığı kullanımı, gece çekimlerinde ambient ışık kombinasyonları.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-6">Lokasyon Önerileri</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">Kaleiçi - Tarihi Doku</h4>
                    <p className="text-gray-600 text-sm">Osmanlı mimarisi, taş sokaklar, geleneksel evler. Klasik ve zarif kareler için ideal.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">Lara Beach - Sahil</h4>
                    <p className="text-gray-600 text-sm">Altın kumlar, masmavi deniz, gün batımı çekimleri. Romantik ve dramatik etkiler.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">Side - Antik</h4>
                    <p className="text-gray-600 text-sm">Roma tiyatrosu, antik sütunlar, tarihi kalıntılar. Unique ve görkemli kompozisyonlar.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
          <div className="container text-center text-white">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
              Özel Gününüzü Ölümsüzleştirmeye Hazır Mısınız?
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Antalya'nın en güzel lokasyonlarında aşk hikayenizi profesyonel bir şekilde belgelemeyi planlayın. 
              Hemen rezervasyon yapın, müsaitliğimizi kontrol edin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/iletisim" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center">
                <Heart className="w-5 h-5 mr-2" />
                Hemen Rezervasyon
              </Link>
              <a 
                href="https://wa.me/905457845667?text=Merhaba%20Antalya%20düğün%20çekimi%20için%20bilgi%20almak%20istiyorum" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300 inline-flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp İletişim
              </a>
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
        <button
          onClick={() => setIsReservationModalOpen(true)}
          className="bg-white text-primary border-2 border-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 group"
          title="Rezervasyon Yap"
        >
          <Calendar className="w-6 h-6" />
        </button>
      </div>
      
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        showCategory={true}
        pageType="categories"
      />
      
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        packageName={selectedPackage}
        pageName="antalya/dugun-fotografcisi"
        categoryName="Düğün Fotoğrafçısı"
      />
      
      <Footer />
    </>
  );
}
