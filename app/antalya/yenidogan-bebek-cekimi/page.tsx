'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategoryGallery } from '@/components/CategoryGallery';
import { ReservationModal } from '@/components/ReservationModal';
import { PricingModal } from '@/components/PricingModal';
import { Heart, Camera, MapPin, Clock, Users, Star, Phone, Mail, CheckCircle, Gift, Home, Shield, Baby, Calendar } from 'lucide-react';
import { SITE_URL, buildBreadcrumbLD, buildWebPageLD, buildServicesLD, buildLocalBusinessLD, buildFaqLD } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const babyPackages = [
  {
    name: "Yenidoğan Çekimi",
    duration: "2-3 saat",
    description: "Kişiselleştirilmiş fiyat teklifi",
    features: [
      "5-15 günlük yenidoğan",
      "Studio ortamında çekim",
      "Güvenli pozlandırma",
      "Anne-baba ile kareler",
      "200-250 düzenlenmiş fotoğraf",
      "Doğal renk tonları",
      "Online galeri"
    ],
    recommended: true
  },
  {
    name: "Bebek Büyüme Serisi",
    duration: "3 seans (3-6-9 ay)", 
    description: "Kişiselleştirilmiş fiyat teklifi",
    features: [
      "3 farklı yaş dönemi",
      "Her seansta farklı konsept",
      "Büyüme değişimi takibi",
      "Oyuncak ve aksesuar kullanımı",
      "150-200 fotoğraf/seans",
      "Aile katılımlı kareler",
      "Özel albüm hazırlama"
    ],
    recommended: false
  },
  {
    name: "Evde Bebek Çekimi",
    duration: "1.5-2 saat",
    description: "Kişiselleştirilmiş fiyat teklifi",
    features: [
      "Evde rahat ortam",
      "Doğal ışık kullanımı",
      "Bebek odası konsepti",
      "Aile yaşam alanında",
      "120-180 düzenlenmiş fotoğraf",
      "Samimi aile anları",
      "Esnek zamanlama"
    ],
    recommended: false
  }
];

const babyShootingTypes = [
  {
    name: "Studio Çekim",
    description: "Kontrollü ortamda professional ekipmanlarla güvenli çekim",
    image: "/bebek1.jpg",
    icon: Camera,
    features: ["Kontrollü ışık", "Professional ekipman", "Güvenli ortam"]
  },
  {
    name: "Evde Çekim",
    description: "Bebek için tanıdık, rahat ortamda doğal aile çekimi",
    image: "/bebek2.jpg",
    icon: Home,
    features: ["Doğal ortam", "Rahat atmosfer", "Aile yaşam alanı"]
  },
  {
    name: "Aile Çekimi",
    description: "Anne, baba ve bebekle birlikte özel aile portreleri",
    image: "/bebek3.jpg",
    icon: Heart,
    features: ["Aile bağı", "Duygusal kareler", "Nesil fotoğrafları"]
  }
];

const saftyFeatures = [
  {
    title: "Bebek Güvenliği",
    description: "Tüm çekimlerde bebek güvenliği ve konforu önceliğimiz",
    icon: Shield,
    benefits: ["Steril ekipman", "Güvenli pozlar", "Sıcaklık kontrolü", "Hijyen önceliği"]
  },
  {
    title: "Professional Yaklaşım",
    description: "Bebek fotoğrafçılığında uzman deneyimli ekip",
    icon: Camera,
    benefits: ["Uzman ekip", "Bebek psikolojisi", "Sabır ve deneyim", "Professional sonuç"]
  },
  {
    title: "Esnek Çekim",
    description: "Bebek ihtiyaçlarına göre esnek zamanlama ve mola",
    icon: Clock,
    benefits: ["Esnek zaman", "Mola imkanları", "Besleme araları", "Rahat tempo"]
  }
];

export default function AntalyaYenidoğanBebekPage() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  
  const breadcrumb = buildBreadcrumbLD([
    { name: 'Anasayfa', url: SITE_URL },
    { name: 'Antalya', url: `${SITE_URL}/antalya` },
    { name: 'Yenidoğan & Bebek Çekimi', url: `${SITE_URL}/antalya/yenidogan-bebek-cekimi` }
  ]);
  const pageLD = buildWebPageLD({
    name: 'Antalya Yenidoğan & Bebek Çekimi',
    description: 'Antalya yenidoğan ve bebek fotoğrafçılığı güvenli ve doğal konseptli çekimler.',
    path: '/antalya/yenidogan-bebek-cekimi'
  });
  const services = buildServicesLD([
    { id: 'yenidogan-paket', name: 'Antalya Yenidoğan Çekimi', price: '5500₺', category: 'Yenidoğan Çekimi' },
    { id: 'bebek-3-6-9', name: 'Antalya Bebek 3-6-9 Ay Serisi', price: '7800₺', category: 'Bebek Fotoğrafları' }
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
    { q: 'Yenidoğan çekimi için en uygun günler?', a: 'Genellikle 5–12. günler arası en sakin dönemdir; bebek konforu önceliğimizdir.' },
    { q: 'Evde çekim mümkün mü?', a: 'Antalya içinde ışık koşullarına bağlı olarak ev çekimi yapılabilir.' }
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
        <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] bg-gradient-to-br from-primary/10 via-primary/20 to-primary/30 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <Baby className="w-6 h-6 text-white" />
              <span className="text-white font-medium">Antalya'nın En Güvenli Bebek Çekimi</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Yenidoğan & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
              Bebek Çekimi
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Bebeğinizin ilk günlerini güvenli, hijyenik ve professional ortamda ölümsüzleştiriyoruz
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/iletisim" className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors inline-flex items-center justify-center">
              <Camera className="w-5 h-5 mr-2" />
              Randevu Al
            </Link>
            <Link href="/galeri" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center">
              <Heart className="w-5 h-5 mr-2" />
              Galeriyi İncele
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600 font-medium">Mutlu Bebek</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">7</div>
              <div className="text-gray-600 font-medium">Yıl Deneyim</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
              <div className="text-gray-600 font-medium">Güvenlik</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Destek</div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Güvenlik <span className="text-primary">Önceliğimiz</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bebek çekimlerinde güvenlik ve hijyen standartlarında asla taviz vermiyoruz
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {saftyFeatures.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shooting Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Çekim <span className="text-primary">Seçenekleri</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bebeğiniz ve aileniz için en uygun çekim tipini seçin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {babyShootingTypes.map((type, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={type.image}
                      alt={type.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center text-white mb-2">
                        <type.icon className="w-6 h-6 mr-2" />
                        <h3 className="text-xl font-semibold">{type.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">{type.description}</p>
                    <div className="space-y-2">
                      {type.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-gray-700">
                          <Star className="w-4 h-4 text-yellow-400 mr-2" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bebek Çekimi <span className="text-primary">Paketleri</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bebeğinizin büyüme sürecine uygun özel paket seçenekleri
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {babyPackages.map((pkg, index) => (
              <div key={index} className={`relative ${pkg.recommended ? 'transform scale-105' : ''}`}>
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-6 py-2 rounded-full font-semibold text-sm">
                      <Gift className="inline-block w-4 h-4 mr-1" />
                      En Popüler
                    </div>
                  </div>
                )}
                <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${pkg.recommended ? 'border-primary' : 'border-gray-100'} h-full`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                    <div className="text-lg font-semibold text-primary mb-2">{pkg.description}</div>
                    <div className="text-gray-600 flex items-center justify-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {pkg.duration}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => {
                      setSelectedPackage(pkg.name);
                      setIsPricingModalOpen(true);
                    }}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors ${pkg.recommended 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}>
                    Fiyat Bilgisi Al
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Çekim <span className="text-primary">Süreci</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bebeğinizin konforunu ve güvenliğini sağlayan adım adım süreç
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Randevu</h3>
              <p className="text-gray-600">Bebeğinizin yaşına uygun en iyi zamanı planlıyoruz</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Hazırlık</h3>
              <p className="text-gray-600">Studio ortamı ve ekipmanları sterilize ediyoruz</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Çekim</h3>
              <p className="text-gray-600">Bebek ritmini takip ederek sabırla çekiyoruz</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">4. Teslimat</h3>
              <p className="text-gray-600">Düzenlenmiş fotoğrafları online galeride paylaşıyoruz</p>
            </div>
          </div>
        </div>
      </section>

      {/* Baby Gallery Section */}
      <CategoryGallery 
        category="bebek" 
        showTitle={true}
        showViewAllButton={true}
        limit={8}
      />

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Sıkça Sorulan <span className="text-primary">Sorular</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="font-semibold text-lg text-gray-800 mb-3">
                Yenidoğan çekimi için en uygun yaş nedir?
              </div>
              <div className="text-gray-600 leading-relaxed">
                Yenidoğan çekimi için ideal yaş 5-15 günlüktür. Bu dönemde bebekler daha çok uyur ve pozlandırma daha kolaydır.
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="font-semibold text-lg text-gray-800 mb-3">
                Çekim sırasında güvenlik nasıl sağlanıyor?
              </div>
              <div className="text-gray-600 leading-relaxed">
                Tüm ekipmanlarımız sterilize edilir, studio sıcaklığı kontrol edilir ve bebek hiçbir zaman tek başına bırakılmaz.
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="font-semibold text-lg text-gray-800 mb-3">
                Çekim ne kadar sürer?
              </div>
              <div className="text-gray-600 leading-relaxed">
                Bebek çekimleri 1.5-3 saat sürebilir. Bebeğin ihtiyaçlarına göre molalar verilir ve acele edilmez.
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="font-semibold text-lg text-gray-800 mb-3">
                Anne-baba da çekime dahil olabilir mi?
              </div>
              <div className="text-gray-600 leading-relaxed">
                Elbette! Aile portreleri ve anne-baba-bebek üçlü fotoğrafları paketlerimizde yer alır.
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="font-semibold text-lg text-gray-800 mb-3">
                Antalya'da bebek çekimi için en iyi mevsim hangisi?
              </div>
              <div className="text-gray-600 leading-relaxed">
                İlkbahar ve sonbahar ayları ideal. Studio çekimleri için yıl boyu uygun, evde çekim için ılıman mevsimler tercih edilir.
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="font-semibold text-lg text-gray-800 mb-3">
                Bebek çekiminde hangi aksesuarlar kullanılır?
              </div>
              <div className="text-gray-600 leading-relaxed">
                Sterilize edilmiş soft blanket'ler, doğal renk tonlarında wrap'lar, güvenli headband'ler ve organik materyallerden yapılmış proplar.
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="font-semibold text-lg text-gray-800 mb-3">
                Evde çekim mi studio çekim mi daha iyi?
              </div>
              <div className="text-gray-600 leading-relaxed">
                Studio çekim kontrollü ortam sunar, evde çekim bebek için tanıdık atmosfer sağlar. Her ikisinin de avantajları vardır.
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="font-semibold text-lg text-gray-800 mb-3">
                Büyüme serisinde hangi aylar idealdir?
              </div>
              <div className="text-gray-600 leading-relaxed">
                3 ay (gülümseme), 6 ay (destekli oturma), 9 ay (sağlam oturma) ve 12 ay (ayakta durma) milestone'ları ideal dönemlerdir.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Baby Photography Guide */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bebek Fotoğrafçılığı <span className="text-primary">Rehberi</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Antalya'da güvenli ve profesyonel bebek çekimi için kapsamlı rehberimiz
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Yenidoğan Çekimi Hazırlığı
              </h3>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 text-primary mr-2" />
                    Güvenlik Önceliği
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Tüm ekipmanlar her çekim öncesi sterilize edilir. Studio sıcaklığı 22-24°C arasında sabit tutulur. 
                    Bebek pozlandırma sırasında hiçbir zaman yalnız bırakılmaz, her zaman deneyimli assistant eşlik eder.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Clock className="w-5 h-5 text-primary mr-2" />
                    Timing Planlaması
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Yenidoğan çekim için 5-15. günler arası idealdir. Bu dönemde bebekler derin uyku fazındadır ve 
                    pozlandırma daha kolaydır. Çekim randevusu bebeğin doğumundan önce provisional olarak alınır.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Baby className="w-5 h-5 text-primary mr-2" />
                    Bebek Comfort Zone
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Çekim öncesi bebek tok ve rahat olmalı. Besleme aralarında pozlandırma yapılır. 
                    Anne-baba her zaman yakında bulunur, bebeğin ihtiyaçlarına anında müdahale edilir.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Professional Approach
              </h3>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Camera className="w-5 h-5 text-primary mr-2" />
                    Teknik Expertise
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Bebek çekimlerinde macro lens kullanımı ile detay fotoğrafları (el, ayak, saç), 
                    natural light simülasyonu ile soft ışıklandırma ve silent shutter modu ile uyku bölmeme teknikleri.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Heart className="w-5 h-5 text-primary mr-2" />
                    Emotional Connection
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Sadece bebek değil, anne-baba ile bebek arasındaki bağı da ölümsüzleştiriyoruz. 
                    İlk kucaklama, feeding moments, sleeping poses ile aile dinamiklerini yansıtan kareler.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Gift className="w-5 h-5 text-primary mr-2" />
                    Keepsake Creation
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Çekilen fotoğraflar sadece dijital değil, fiziksel keepsake alternatifleri de sunuyoruz. 
                    Canvas prints, photo books ve milestone cards ile anıları somutlaştırıyoruz.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Bebek Çekim Milestone Timeline
              </h3>
              <p className="text-gray-600">Bebeğinizin gelişim dönemlerine uygun çekim takvimi</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="bg-white rounded-xl p-6">
                <div className="text-2xl mb-3">👶</div>
                <h4 className="font-semibold text-gray-900 mb-2">Newborn (5-15 gün)</h4>
                <p className="text-gray-600 text-sm">
                  Deep sleep poses, macro detaylar, anne-baba ile ilk kareler
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="text-2xl mb-3">😊</div>
                <h4 className="font-semibold text-gray-900 mb-2">3 Aylık (Social Smiles)</h4>
                <p className="text-gray-600 text-sm">
                  İlk gülümsemeler, göz teması, interactive expressions
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="text-2xl mb-3">🪑</div>
                <h4 className="font-semibold text-gray-900 mb-2">6 Aylık (Sitting Support)</h4>
                <p className="text-gray-600 text-sm">
                  Destekli oturma pozları, toy interactions, personality emergence
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="text-2xl mb-3">🚶</div>
                <h4 className="font-semibold text-gray-900 mb-2">9-12 Aylık (Mobility)</h4>
                <p className="text-gray-600 text-sm">
                  Crawling, standing, first steps milestone celebrations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Hygiene Standards */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Güvenlik ve <span className="text-primary">Hijyen Standartları</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bebek çekimlerinde en üst düzey güvenlik ve hijyen protokollerimiz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-green-50 to-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sterilizasyon Protokolü</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tüm aksesuarlar, blanket'ler ve prop'lar her çekim öncesi UV sterilizasyon ve 
                baby-safe dezenfektan ile temizlenir. Hypoallergenic materyaller kullanılır.
              </p>
            </div>

            <div className="bg-gradient-to-b from-blue-50 to-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Deneyimli Ekip</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bebek çekimi uzmanı fotoğrafçı ve certified assistant. İlk yardım sertifikası, 
                bebek gelişimi eğitimi almış professional ekip ile güvenli çekim garantisi.
              </p>
            </div>

            <div className="bg-gradient-to-b from-orange-50 to-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Kontrollü Ortam</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Studio sıcaklığı 22-24°C sabit, nem kontrolü %40-60 arası, hava filtreleme sistemi, 
                noise cancellation ile bebek için ideal studio environment.
              </p>
            </div>

            <div className="bg-gradient-to-b from-purple-50 to-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Flexible Timing</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bebek ritmini takip eden esnek çekim programı. Feeding breaks, diaper changes, 
                comfort molalarıyla bebek ihtiyaçları öncelikli planlama.
              </p>
            </div>

            <div className="bg-gradient-to-b from-red-50 to-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Parental Involvement</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Anne-baba her zaman çekim alanında. Baby-led posing, comfort-first yaklaşım, 
                zorlanmış pozlar yerine doğal expressions önceliği.
              </p>
            </div>

            <div className="bg-gradient-to-b from-yellow-50 to-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Assurance</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Professional editing ile skin-safe retouching, natural color grading, 
                high-resolution delivery ve lifetime backup guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Baby className="w-16 h-16 mx-auto mb-8 text-white/90" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Bebeğinizin İlk Anılarını<br />Ölümsüzleştirelim
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Güvenli, hijyenik ve professional ortamda bebeğinizin en güzel karelerini çekmeye hazırız
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="tel:+905457845667" className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors inline-flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Hemen Ara: 0545 784 56 67
            </a>
            <a href="https://wa.me/905457845667?text=Merhaba,%20yenidoğan%20bebek%20çekimi%20için%20bilgi%20almak%20istiyorum." className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087z"/>
              </svg>
              WhatsApp Mesaj
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="w-8 h-8 mx-auto mb-3 text-white/80" />
              <div className="font-semibold mb-1">Lokasyon</div>
              <div className="text-white/80">Antalya Studio</div>
            </div>
            <div>
              <Clock className="w-8 h-8 mx-auto mb-3 text-white/80" />
              <div className="font-semibold mb-1">Çalışma Saatleri</div>
              <div className="text-white/80">09:00 - 18:00</div>
            </div>
            <div>
              <Users className="w-8 h-8 mx-auto mb-3 text-white/80" />
              <div className="font-semibold mb-1">Deneyim</div>
              <div className="text-white/80">7+ Yıl, 500+ Çekim</div>
            </div>
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
        pageName="antalya/yenidogan-bebek-cekimi"
        categoryName="Yenidoğan & Bebek Çekimi"
      />
      
      </div>
      <Footer />
    </>
  );
}

