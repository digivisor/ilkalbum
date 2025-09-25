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

const engagementPackages = [
  {
    name: "Standart Nişan Paketi",
    duration: "2-3 saat",
    description: "Kişiselleştirilmiş fiyat teklifi",
    features: [
      "Çift portre çekimi",
      "Yüzük detay fotoğrafları",
      "Aile portreleri",
      "Tören anları",
      "200-300 düzenlenmiş fotoğraf",
      "Online galeri",
      "Tek lokasyon"
    ],
    recommended: false
  },
  {
    name: "Plus Nişan Paketi", 
    duration: "4-5 saat",
    description: "Kişiselleştirilmiş fiyat teklifi",
    features: [
      "Hazırlık çekimleri",
      "Çift portre çekimi",
      "Yüzük & detay fotoğrafları",
      "Aile grup portreleri",
      "Tören ve kutlama anları",
      "300-450 düzenlenmiş fotoğraf",
      "Online galeri",
      "İki farklı lokasyon"
    ],
    recommended: true
  },
  {
    name: "Premium Nişan Paketi",
    duration: "Tüm gün + ek hizmetler",
    description: "Kişiselleştirilmiş fiyat teklifi",
    features: [
      "Save the date çekimi",
      "Hazırlık sürecinden kutlamaya kadar",
      "Çift & aile portreleri",
      "Tüm detay çekimleri",
      "Mini highlight video (2-3 dk)",
      "500-700 düzenlenmiş fotoğraf",
      "Özel fotoğraf albümü",
      "USB kutu"
    ],
    recommended: false
  }
];

const engagementLocations = [
  {
    name: "Kaleiçi Tarihi Sokaklar",
    description: "Romantik taş sokaklar, tarihi kapılar ve nostaljik atmosfer",
    image: "/nisan2.jpg",
    icon: MapPin,
    features: ["Tarihi dokular", "Romantik köşeler", "Nostaljik atmosfer"]
  },
  {
    name: "Lara Beach Sahili",
    description: "Altın kumlar ve masmavi deniz eşliğinde romantik çekim",
    image: "/nisan3.jpg",
    icon: Heart,
    features: ["Sahil romantizmi", "Golden hour", "Doğal ışık"]
  },
  {
    name: "Side Antik Kenti",
    description: "Antik tiyatro ve sütunlar arasında eşsiz çift portreleri",
    image: "/nisan4.jpg",
    icon: Star,
    features: ["Antik mimari", "Tarihi atmosfer", "Unique backdrop"]
  }
];

const engagementMoments = [
  {
    title: "Hazırlık Anları",
    description: "Çiftlerin nişan öncesi hazırlık sürecindeki samimi kareler",
    icon: Sparkles,
    moments: ["Detay çekimleri", "Hazırlık süreci", "Duygusal anlar", "Aile desteği"]
  },
  {
    title: "Yüzük Takma",
    description: "O özel an ve çiftlerin yüzündeki mutluluk",
    icon: Heart,
    moments: ["Yüzük takma anı", "Duygusal tepkiler", "Aile sevinci", "Kutlama anları"]
  },
  {
    title: "Çift Portreleri",
    description: "Romantik pozlar ve doğal çift çekimleri",
    icon: Camera,
    moments: ["Romantik pozlar", "Doğal anlar", "İntimail bakışlar", "Sevgi gösterileri"]
  }
];

export default function AntalyaNisanPage() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  
  const breadcrumb = buildBreadcrumbLD([
    { name: 'Anasayfa', url: SITE_URL },
    { name: 'Antalya', url: `${SITE_URL}/antalya` },
    { name: 'Nişan Çekimi', url: `${SITE_URL}/antalya/nisan-cekimi` }
  ]);
  const pageLD = buildWebPageLD({
    name: 'Antalya Nişan Çekimi',
    description: 'Antalya nişan & söz töreni fotoğrafçılığı, romantik çift çekimleri ve yüzük detayları.',
    path: '/antalya/nisan-cekimi'
  });
  const services = buildServicesLD([
    { id: 'nisan-standart', name: 'Antalya Nişan Standart Paket', price: '6500₺', category: 'Nişan Çekimi' },
    { id: 'nisan-plus', name: 'Antalya Nişan Plus Paket', price: '8200₺', category: 'Nişan Çekimi' }
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
    { q: 'Antalya nişan fotoğrafçısı ücretleri nedir?', a: 'Paket kapsamına göre değişir; güncel detaylar fiyatlandırma sayfasındadır.' },
    { q: 'Nişan çekimi için en iyi saatler?', a: 'Gün batımına yakın zamanlar en yumuşak ve romantik ışığı sunar.' }
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
                <span className="text-white/90">Antalya Nişan Çekimi</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">
                Romantik Nişan Çekimleri
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Evlilik yolculuğunuzun başlangıcındaki bu özel anları ölümsüzleştirin. 
                Antalya'nın romantik lokasyonlarında duygusal ve doğal nişan çekimleri.
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
                { number: "300+", label: "Nişan Çekimi", icon: Heart },
                { number: "10+", label: "Yıl Deneyim", icon: Camera },
                { number: "12+", label: "Romantik Lokasyon", icon: MapPin },
                { number: "2-5", label: "Saat Çekim", icon: Clock }
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

        {/* Engagement Moments */}
        <section className="py-20 bg-gradient-to-b from-white to-primary/5">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Nişan Gününüzün Özel Anları
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hazırlık sürecinden kutlamaya kadar her anı duygusal bir şekilde belgeliyoruz.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {engagementMoments.map((moment, index) => (
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

        {/* Engagement Packages */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Nişan Çekim Paketleri
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                İhtiyaçlarınıza uygun esnek paket seçenekleri ile nişan gününüzü ölümsüzleştirin.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {engagementPackages.map((pkg, index) => (
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
                    <div className="text-lg font-semibold text-primary mb-2">{pkg.description}</div>
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

        {/* Engagement Locations */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Romantik Nişan Lokasyonları
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Antalya'nın en romantik lokasyonlarında unutulmaz nişan çekimleri.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {engagementLocations.map((location, index) => (
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

        {/* Engagement Gallery Section */}
        <CategoryGallery 
          category="nisan" 
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
                Nişan çekimi hakkında merak ettikleriniz.
              </p>
            </div>
            
            <div className="space-y-6">
              {[{
                q: 'Nişan çekimi kaç saat sürer?',
                a: 'Standart paket 2-3 saat, Plus paket 4-5 saat sürmektedir. Premium pakette ise tüm gün çekim yapılır.'
              }, {
                q: 'Kaç fotoğraf teslim ediyorsunuz?',
                a: 'Paket kapsamına göre 200-700 arası seçilmiş ve profesyonelce düzenlenmiş fotoğraf teslim edilir.'
              }, {
                q: 'Fotoğrafların teslim süresi nedir?',
                a: 'Ön izleme 5 gün içinde paylaşılır, tüm fotoğrafların düzenlenmesi ve teslimi 2-3 hafta içinde tamamlanır.'
              }, {
                q: 'Lokasyon seçimi nasıl yapılır?',
                a: 'Size öneri listesi sunuyoruz, çiftin tercihi doğrultusunda en uygun lokasyonları planlıyoruz.'
              }, {
                q: 'Rezervasyon nasıl yapılır?',
                a: '%30 ön ödeme ile tarih kesinleşir, kalan bakiye çekim gününden önce ödenir.'
              }, {
                q: 'Antalya\'da en iyi nişan çekimi lokasyonları hangileri?',
                a: 'Kaleiçi tarihi merkez romantik kareler için, Aspendos antik tiyatrosu görkemli pozlar için, sahil kenarı gün batımı çekimleri için idealdir.'
              }, {
                q: 'Nişan çekimi için en uygun mevsim hangisi?',
                a: 'Antalya\'da her mevsim çekim yapılabilir. İlkbahar ve sonbahar en ideal dönemlerdir. Yaz aylarında sabah erken ya da akşam geç saatler tercih edilir.'
              }, {
                q: 'Ailelerin de katıldığı grup çekimleri yapılır mı?',
                a: 'Elbette! Nişan töreninde her iki ailenin de yer aldığı grup portreleri ve geleneksel aile fotoğrafları çekilir.'
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

        {/* Engagement Photography Guide */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
                Antalya Nişan Çekimi Rehberi
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Profesyonel nişan fotoğrafçınız olarak size mükemmel nişan çekimi için detaylı rehberimizi sunuyoruz.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-6">Nişan Çekimi Hazırlığı</h3>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Heart className="w-5 h-5 text-primary mr-2" />
                      Kıyafet Seçimi
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Birbirinizle uyumlu renkler seçin. Nötr tonlar ve pastel renkler fotoğraflarda harika görünür. 
                      Çok desenli kıyafetlerden kaçının, çünkü dikkat fotoğraftan uzaklaşır. Çiftlerin renk paleti uyumlu olmalı.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Clock className="w-5 h-5 text-primary mr-2" />
                      Zamanlamanın Önemi
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Golden hour (altın saat) en romantik fotoğraflar için idealdir. Gün batımından 1 saat öncesi ve gün doğumundan 1 saat sonrası 
                      en yumuşak ve flattering ışık koşullarını sağlar. Bu saatlerde çekim yaparak cinematic etkiler elde edilir.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <MapPin className="w-5 h-5 text-primary mr-2" />
                      Lokasyon Belirleme
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Size özel anlamı olan yerler tercih edin. İlk buluştuğunuz yer, evlenme teklifinin yapıldığı lokasyon ya da 
                      birlikte vakit geçirdiğiniz özel mekanlar hikayenizi güçlendirir ve fotoğraflara anlam katar.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-6">Çekim Günü İpuçları</h3>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Sparkles className="w-5 h-5 text-primary mr-2" />
                      Doğal Pozlar
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Kameraya bakmak zorunda değilsiniz. Birbirinizle sohbet edin, gülümseyerek yürüyün, sarılın. 
                      En güzel kareler doğal anlardan çıkar. Zorlanmış pozlar yerine samimi hallerin fotoğraflanması tercih edilir.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Camera className="w-5 h-5 text-primary mr-2" />
                      Yüzük ve Detaylar
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Nişan yüzükleriniz temiz ve parlak olsun. Tırnaklarınız bakımlı olmalı çünkü close-up çekimler yapılacak. 
                      Nişan invitation, çiçekler, parfüm gibi detay objeler de çekime dahil edilebilir.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Users className="w-5 h-5 text-primary mr-2" />
                      Aile Katılımı
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Aile üyelerinin de yer aldığı grup çekimleri planlanabilir. Geleneksel nişan töreni görselleri, 
                      aile büyükleriyle beraber çekilen nesil fotoğrafları ve grup portreleri anlamlı kareler oluşturur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement Photography Styles */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
                Nişan Çekimi Stilleri
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Her çiftin kendine özgü hikayesi vardır. Kişiliklerinizi yansıtan stil seçeneklerimizle size en uygun yaklaşımı belirliyoruz.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center bg-gradient-to-b from-primary/5 to-white rounded-2xl p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Romantik Stil</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Soft ışık kullanımı, pastel tonlar, doğal pozlar ve duygusal anların yakalandığı klasik romantik yaklaşım. 
                  Çiçekler, vintage objeler ve dreamy atmosfer tercih edilir.
                </p>
              </div>

              <div className="text-center bg-gradient-to-b from-primary/5 to-white rounded-2xl p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Cinematic Stil</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Film tarzı renk gradasyonları, dramatik ışık-gölge oyunları ve sinemaya özgü kompozisyon teknikleriyle 
                  movie still etkisi yaratan modern yaklaşım.
                </p>
              </div>

              <div className="text-center bg-gradient-to-b from-primary/5 to-white rounded-2xl p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lifestyle Stil</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Günlük yaşamdan kesitler, doğal aktiviteler ve samimi anlar. Çiftin gerçek kişiliklerini yansıtan, 
                  spontane ve authentic bir fotoğrafçılık anlayışı.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                  Antalya'da Nişan Çekimi Sezonu
                </h3>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-white rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">İlkbahar (Mart-Mayıs)</h4>
                  <p className="text-gray-600 text-sm">
                    Çiçeklerin açtığı dönem. Doğal dekora ek olarak temperate hava koşulları ideal.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Yaz (Haziran-Ağustos)</h4>
                  <p className="text-gray-600 text-sm">
                    Sahil çekimleri ve deniz manzarası. Erken sabah ya da akşam saatleri tercih edilir.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Sonbahar (Eylül-Kasım)</h4>
                  <p className="text-gray-600 text-sm">
                    Golden hour'ın en güzel olduğu dönem. Sıcaklık ideal, ışık koşulları mükemmel.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Kış (Aralık-Şubat)</h4>
                  <p className="text-gray-600 text-sm">
                    Antalya'nın ılıman kışı avantajıyla fiyat avantajlı dönem. Daha özel atmosfer.
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
              Nişan Gününüzü Ölümsüzleştirmeye Hazır Mısınız?
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Antalya'nın en romantik lokasyonlarında nişan çekimi planlayın. 
              Uzman ekibimiz size rehberlik eder, müsaitliğimizi kontrol edin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/iletisim" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center">
                <Heart className="w-5 h-5 mr-2" />
                Hemen Rezervasyon
              </Link>
              <a 
                href="https://wa.me/905457845667?text=Merhaba%20Antalya%20nişan%20çekimi%20için%20bilgi%20almak%20istiyorum" 
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
        pageName="antalya/nisan-cekimi"
        categoryName="Nişan Çekimi"
      />
      
      <Footer />
    </>
  );
}
