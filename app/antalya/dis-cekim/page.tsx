'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategoryGallery } from '@/components/CategoryGallery';
import { ReservationModal } from '@/components/ReservationModal';
import { PricingModal } from '@/components/PricingModal';
import { Camera, MapPin, Sun, Trees, Mountain, Phone, Mail, CheckCircle, Heart, Users, Clock, Star, Calendar } from 'lucide-react';
import { SITE_URL, buildBreadcrumbLD, buildWebPageLD, buildServicesLD, buildLocalBusinessLD, buildFaqLD } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const outdoorPackages = [
  {
    name: "Standart Dış Çekim",
    duration: "1.5-2 saat",
    description: "Kişiselleştirilmiş fiyat teklifi",
    features: [
      "Tek lokasyon çekim",
      "Golden hour planlama",
      "150-200 düzenlenmiş fotoğraf",
      "Online galeri",
      "Renk düzenleme",
      "Doğal ışık kullanımı"
    ],
    recommended: false
  },
  {
    name: "Premium Gün Batımı",
    duration: "2-3 saat", 
    description: "Kişiselleştirilmiş fiyat teklifi",
    features: [
      "İki farklı lokasyon",
      "Golden hour + blue hour",
      "Gün batımı özel çekim",
      "250-350 düzenlenmiş fotoğraf",
      "Online galeri",
      "Profesyonel düzenleme",
      "Lokasyon önerileri"
    ],
    recommended: true
  },
  {
    name: "Deluxe Doğa Çekimi",
    duration: "3-4 saat",
    description: "Kişiselleştirilmiş fiyat teklifi",
    features: [
      "Çoklu lokasyon (2-3 mekan)",
      "Tüm gün ışık takibi",
      "Doğa & sahil kombinasyonu",
      "400-500 düzenlenmiş fotoğraf",
      "Mini highlight video",
      "Özel düzenleme",
      "Kıyafet değişimi"
    ],
    recommended: false
  }
];

const outdoorLocations = [
  {
    name: "Sahil & Gün Batımı",
    description: "Altın ışık eşliğinde sahil çekimi ve spektaküler gün batımı",
    image: "/düğün6.jpg",
    icon: Sun,
    features: ["Golden hour", "Sahil atmosferi", "Romantik ışık"]
  },
  {
    name: "Doğa & Orman",
    description: "Yeşillikler arasında doğal çekim ve ağaç gölgeleri",
    image: "/düğün7.jpg",
    icon: Trees,
    features: ["Doğal yeşillik", "Gölge oyunları", "Orman dokusu"]
  },
  {
    name: "Dağ & Panorama",
    description: "Yüksek noktalarda panoramik manzara eşliğinde çekim",
    image: "/düğün9.jpg",
    icon: Mountain,
    features: ["Panoramik manzara", "Dağ zirvesi", "Geniş açı"]
  }
];

const outdoorStyles = [
  {
    title: "Golden Hour Çekimi",
    description: "Gün doğumu ve batımında doğal altın ışık kullanımı",
    icon: Sun,
    benefits: ["Yumuşak ışık", "Warm tonlar", "Doğal parlaklık", "Sinematik görünüm"]
  },
  {
    title: "Doğal Portre",
    description: "Doğada spontan ve doğal anları yakalama",
    icon: Camera,
    benefits: ["Doğal pozlar", "Samimi anlar", "Çevresel uyum", "Rahat atmosfer"]
  },
  {
    title: "Konsept Çekim",
    description: "Tematik ve planlı dış mekan çekim konseptleri",
    icon: Heart,
    benefits: ["Özel temalar", "Aksesuar kullanımı", "Yaratıcı pozlar", "Unique kareler"]
  }
];

export default function AntalyaDisCekimPage() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  
  const breadcrumb = buildBreadcrumbLD([
    { name: 'Anasayfa', url: SITE_URL },
    { name: 'Antalya', url: `${SITE_URL}/antalya` },
    { name: 'Dış Çekim', url: `${SITE_URL}/antalya/dis-cekim` }
  ]);
  const pageLD = buildWebPageLD({
    name: 'Antalya Dış Çekim Fotoğrafçısı',
    description: 'Antalya dış çekim sahil gün batımı ve doğal mekan konseptli profesyonel fotoğrafçılık.',
    path: '/antalya/dis-cekim'
  });
  const services = buildServicesLD([
    { id: 'dis-cekim-standard', name: 'Antalya Dış Çekim Standard', price: '4500₺', category: 'Dış Çekim' },
    { id: 'dis-cekim-gun-batimi', name: 'Antalya Gün Batımı Premium', price: '6400₺', category: 'Dış Çekim' }
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
    { q: 'Antalya dış çekim hangi saatlerde daha iyi?', a: 'Gün doğumu sonrası ilk 45 dk ve gün batımından önceki altın saat en ideal ışığı sunar.' },
    { q: 'Dış çekimde kaç lokasyon seçebiliriz?', a: 'Standart paket 1-2; premium paket rota planlı 2-3 lokasyon içerir.' },
    { q: 'Kıyafet/styling desteği veriyor musunuz?', a: 'Evet, renk paleti ve doku uyumuna göre styling tavsiyesi sunuyoruz.' }
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
                <Camera className="w-6 h-6" />
                <span className="text-white/90">Antalya Dış Çekim</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">
                Doğal Işık Dış Çekimleri
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Antalya'nın eşsiz doğal güzelliklerinde golden hour çekimleri. 
                Sahil, orman, dağ manzaralarında estetik ve doğal portre çekimleri.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/iletisim" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105">
                  Çekim Planla
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
                { number: "500+", label: "Dış Çekim", icon: Camera },
                { number: "Golden", label: "Hour Uzmanı", icon: Sun },
                { number: "20+", label: "Doğa Lokasyonu", icon: Trees },
                { number: "1-4", label: "Saat Süre", icon: Clock }
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

        {/* Outdoor Styles */}
        <section className="py-20 bg-gradient-to-b from-white to-primary/5">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Dış Çekim Stilleri
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Doğal ışık kullanımı ve çeşitli çekim stilleri ile kişisel tarzınıza uygun çekimler.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {outdoorStyles.map((style, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <style.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-gray-900 text-center mb-4">
                    {style.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    {style.description}
                  </p>
                  <ul className="space-y-2">
                    {style.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outdoor Packages */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Dış Çekim Paketleri
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                İhtiyacınıza uygun çeşitli süre ve lokasyon seçenekleri ile esnek paketler.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {outdoorPackages.map((pkg, index) => (
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

        {/* Outdoor Locations */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Doğal Çekim Lokasyonları
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Antalya'nın en güzel doğal lokasyonlarında çeşitli konsept çekimleri.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {outdoorLocations.map((location, index) => (
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

        {/* Outdoor Photography Gallery Section */}
        <CategoryGallery 
          category="dis-cekim" 
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
                Dış çekim hakkında merak ettikleriniz.
              </p>
            </div>
            
            <div className="space-y-6">
              {[{
                q: 'Dış çekim için en iyi saatler nelerdir?',
                a: 'Gün doğumu sonrası ilk 45 dakika ve gün batımından önceki altın saat (yaklaşık 60-75 dakika) en ideal ışığı sunar.'
              }, {
                q: 'Kaç farklı lokasyon seçebiliriz?',
                a: 'Standart pakette 1-2 lokasyon, premium pakette rota planlı 2-3 farklı doku ve atmosfer sunulmaktadır.'
              }, {
                q: 'Kıyafet ve styling önerisi veriyor musunuz?',
                a: 'Evet, renk paleti, doku uyumu ve katman kullanımına göre detaylı stil tavsiyeleri sunuyoruz.'
              }, {
                q: 'Fotoğrafların teslim süresi nedir?',
                a: 'Sezona bağlı olarak 7-14 gün arasında profesyonelce düzenlenmiş fotoğraflar teslim edilir.'
              }, {
                q: 'Video opsiyonu da eklenebilir mi?',
                a: 'Talebe göre kısa motion highlight videosu pakete eklenebilir, detayları görüşerek belirleyebiliriz.'
              }, {
                q: 'Antalya\'da dış çekim için en iyi lokasyonlar hangileri?',
                a: 'Düden Şelalesi doğa çekimleri için, Kaleiçi tarihi doku için, Lara Beach sahil çekimleri için ideal lokasyonlardır.'
              }, {
                q: 'Hava koşulları çekimi nasıl etkiler?',
                a: 'Antalya\'nın ılıman iklimi sayesinde yıl boyunca çekim yapılabilir. Yağmurlu havada kapalı lokasyon alternatifleri sunulur.'
              }, {
                q: 'Dış çekim için nasıl hazırlanmalıyız?',
                a: 'Rahat ayakkabılar, yedek kıyafet, su ve energy snack yanınızda bulunmalı. Makyaj için touch-up kit önerilir.'
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

        {/* Outdoor Photography Techniques */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
                Doğal Işık Fotoğrafçılığı Teknikleri
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Antalya'nın eşsiz doğal güzellikleri ve ışık koşullarıyla profesyonel açık hava fotoğrafçılığının inceliklerini keşfedin.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              <div>
                <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-6">Golden Hour Mastery</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Altın saat, doğal ışık fotoğrafçılığının kalbidir. Antalya'nın Akdeniz iklimi sayesinde yıl boyunca muhteşem golden hour 
                  koşullarına sahip oluyoruz. Bu özel zaman diliminde çekilen fotoğraflar warm tonlar, soft shadows ve dreamy atmosphere ile 
                  karakterize edilir.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-yellow-600 text-sm">☀</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Zamanlamanın Önemi</h4>
                      <p className="text-gray-600 text-sm">
                        Gün batımından 1 saat öncesi ve gün doğumundan 1 saat sonrası en flattering ışık koşullarını sunar. 
                        Bu zamanlama cildi yumuşak gösterir ve kontrast farkını azaltır.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-orange-600 text-sm">📸</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Directional Light</h4>
                      <p className="text-gray-600 text-sm">
                        Yan ışık kullanımıyla dimension ve depth yaratırız. Backlight teknikleriyle silhouette efektleri, 
                        frontlight ile detaylı portreler elde ederiz.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 text-sm">🎨</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Renk Sıcaklığı</h4>
                      <p className="text-gray-600 text-sm">
                        Golden hour'ın 2700K-3200K renk sıcaklığı, özellikle portre çekimlerinde cilt tonlarını 
                        son derece flattering gösterir ve romantic mood yaratır.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8">
                <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-6 text-center">Işık Koşulları Rehberi</h3>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Golden Hour</span>
                      <span className="text-sm text-yellow-600">★★★★★</span>
                    </div>
                    <p className="text-gray-600 text-sm">Gün doğumu +1h, Gün batımı -1h</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Blue Hour</span>
                      <span className="text-sm text-blue-600">★★★★☆</span>
                    </div>
                    <p className="text-gray-600 text-sm">Gün batımı sonrası 30-45 dk</p>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Open Shade</span>
                      <span className="text-sm text-green-600">★★★★☆</span>
                    </div>
                    <p className="text-gray-600 text-sm">Gölgeli alanlar, yumuşak ışık</p>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Overcast</span>
                      <span className="text-sm text-gray-600">★★★☆☆</span>
                    </div>
                    <p className="text-gray-600 text-sm">Bulutlu hava, natural softbox</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">Lokasyon Scouting</h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Her çekim öncesi lokasyon keşfi yapıyoruz. Background seçimi, ışık açısı analizi ve composition planlaması 
                  ile optimal sonuçlar elde ediyoruz. Antalya'nın hidden gem lokasyonlarını size özel keşfediyoruz.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">Technical Excellence</h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Professional ekipmanlar ve teknik bilgi birlikteliği. F-stop kontrolü ile depth of field yönetimi, 
                  shutter speed ile hareket yakalama ve ISO optimizasyonu ile noise-free çekimler gerçekleştiriyoruz.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">Emotional Connection</h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Tekniğin ötesinde, kişiler arası bağlantı kurarak genuine emotions yakalıyoruz. Rahat atmosfer yaratıp 
                  natural expressions elde etmek bizim için en önemli priorite. Authentic moments, timeless memories.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Outdoor Photography */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
                Mevsimsel Dış Çekim Rehberi
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Antalya'nın her mevsiminin kendine özgü güzellikleri var. Mevsimsel avantajları en iyi şekilde değerlendirerek 
                year-round stunning outdoor photography imkanı sunuyoruz.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center bg-gradient-to-b from-green-50 to-white rounded-2xl p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌸</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">İlkbahar (Mart-Mayıs)</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Çiçeklerin açtığı dönem. Rengarenk flora, perfect temperate ve soft natural light. 
                  Allerji season başlamadan ideal koşullar.
                </p>
                <div className="text-left space-y-2">
                  <div className="text-xs text-green-600">✓ Çiçek açımı</div>
                  <div className="text-xs text-green-600">✓ Ideal sıcaklık</div>
                  <div className="text-xs text-green-600">✓ Yeşil doku</div>
                  <div className="text-xs text-green-600">✓ Fresh atmosfer</div>
                </div>
              </div>

              <div className="text-center bg-gradient-to-b from-yellow-50 to-white rounded-2xl p-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">☀️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Yaz (Haziran-Ağustos)</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Sahil çekimleri için ideal. Masmavi deniz, altın kumlar ve vibrant colors. 
                  Erken sabah ya da akşam çekimleri preferred.
                </p>
                <div className="text-left space-y-2">
                  <div className="text-xs text-yellow-600">✓ Beach access</div>
                  <div className="text-xs text-yellow-600">✓ Vibrant colors</div>
                  <div className="text-xs text-yellow-600">✓ Long golden hour</div>
                  <div className="text-xs text-yellow-600">✓ Crystal clear sea</div>
                </div>
              </div>

              <div className="text-center bg-gradient-to-b from-orange-50 to-white rounded-2xl p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍂</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sonbahar (Eylül-Kasım)</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Golden hour'ın en güzel olduğu mevsim. Warm tones, comfortable weather ve 
                  dramatic sky conditions için ideal period.
                </p>
                <div className="text-left space-y-2">
                  <div className="text-xs text-orange-600">✓ Perfect golden hour</div>
                  <div className="text-xs text-orange-600">✓ Dramatic skies</div>
                  <div className="text-xs text-orange-600">✓ Comfortable temp</div>
                  <div className="text-xs text-orange-600">✓ Autumn palette</div>
                </div>
              </div>

              <div className="text-center bg-gradient-to-b from-blue-50 to-white rounded-2xl p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❄️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Kış (Aralık-Şubat)</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Antalya'nın ılıman kışı avantaj. Unique atmosfer, dramatic clouds ve 
                  off-season pricing ile budget-friendly option.
                </p>
                <div className="text-left space-y-2">
                  <div className="text-xs text-blue-600">✓ Mild temperature</div>
                  <div className="text-xs text-blue-600">✓ Dramatic lighting</div>
                  <div className="text-xs text-blue-600">✓ Fewer crowds</div>
                  <div className="text-xs text-blue-600">✓ Cost effective</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
          <div className="container text-center text-white">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
              Doğanın Güzelliğinde Çekim Yapmaya Hazır Mısınız?
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Antalya'nın eşsiz doğal güzelliklerinde golden hour çekimleri planlayın. 
              Profesyonel rehberlik ile ideal zamanlamayı yakalayalım.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/iletisim" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center">
                <Camera className="w-5 h-5 mr-2" />
                Hemen Çekim Planla
              </Link>
              <a 
                href="https://wa.me/905457845667?text=Merhaba%20Antalya%20dış%20çekim%20hakkında%20bilgi%20almak%20istiyorum" 
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
        pageName="antalya/dis-cekim"
        categoryName="Dış Çekim"
      />
      
      <Footer />
    </>
  );
}
