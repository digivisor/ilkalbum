"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategoryGallery } from '@/components/CategoryGallery';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { SITE_URL, buildBreadcrumbLD, buildWebPageLD, buildServicesLD, buildLocalBusinessLD, buildFaqLD } from '@/lib/seo';
import { Baby, Heart, Camera, Calendar, Clock, Phone, Users, Sparkles, CheckCircle } from 'lucide-react';

const ReservationModal = dynamic(
  () => import('@/components/ReservationModal').then(m => m.ReservationModal),
  { ssr: false }
);
const PricingModal = dynamic(
  () => import('@/components/PricingModal').then(m => m.PricingModal),
  { ssr: false }
);

const newbornPackages = [
  {
    name: 'Standart Yenidoğan',
    duration: '1.5-2 saat',
    description: 'Kişiselleştirilmiş fiyat teklifi',
    features: [
      'Bebek solo çekim',
      '2 farklı konsept',
      '40-60 düzenlenmiş fotoğraf',
      'Online galeri',
      'Hassas cilt düzenleme'
    ],
    recommended: false
  },
  {
    name: 'Premium Aile Paketi',
    duration: '2-3 saat',
    description: 'Kişiselleştirilmiş fiyat teklifi',
    features: [
      'Bebek + aile + kardeş çekimleri',
      '3-4 konsept ve aksesuar',
      '70-100 düzenlenmiş fotoğraf',
      'Online galeri',
      'Profesyonel ışık'
    ],
    recommended: true
  },
  {
    name: 'Deluxe Özel Konsept',
    duration: '3-4 saat',
    description: 'Kişiselleştirilmiş fiyat teklifi',
    features: [
      'Tüm aile kombinasyonları',
      '4+ özel konsept',
      '100-150 düzenlenmiş fotoğraf',
      'Özel albüm opsiyonu',
      'Mini video (opsiyonel)'
    ],
    recommended: false
  }
];

export default function ClientPage() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  const breadcrumb = buildBreadcrumbLD([
    { name: 'Anasayfa', url: SITE_URL },
    { name: 'Antalya', url: `${SITE_URL}/antalya` },
    { name: 'Yenidoğan Bebek Çekimi', url: `${SITE_URL}/antalya/yenidogan-bebek-cekimi` }
  ]);
  const pageLD = buildWebPageLD({
    name: 'Antalya Yenidoğan Bebek Çekimi',
    description: 'Antalya yenidoğan bebek çekimi profesyonel aile ve özel konsept fotoğrafçısı.',
    path: '/antalya/yenidogan-bebek-cekimi'
  });
  const services = buildServicesLD([
    { id: 'newborn-standard', name: 'Yenidoğan Standart', price: '4500₺', category: 'Yenidoğan Çekimi' },
    { id: 'newborn-premium', name: 'Yenidoğan Premium', price: '6500₺', category: 'Yenidoğan Çekimi' }
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
    { q: 'Yenidoğan çekimi ne zaman yapılmalı?', a: 'En ideal zaman doğumdan sonraki ilk 5-14 gündür; bebek daha derin uyur.' },
    { q: 'Bebek için aksesuarları siz mi sağlıyorsunuz?', a: 'Evet, steril ve yıkanmış konsept aksesuarları biz sağlıyoruz.' }
  ]);

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
      {services.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="pt-20">
        <section className="hero-gradient py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Baby className="w-6 h-6" />
                <span className="text-white/90">Antalya Yenidoğan Bebek Çekimi</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">Antalya Yenidoğan Fotoğrafçısı</h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Bebeğinizin ilk günlerinin masumiyetini ve detaylarını profesyonel yenidoğan fotoğrafçılığıyla özenle çekiyoruz.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/iletisim" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105">Çekim Planla</Link>
                <Link href="/fiyatlandirma" className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300">Paket Fiyatları</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '150+', label: 'Yenidoğan Çekimi', icon: Baby },
                { number: '10+', label: 'Yıl Deneyim', icon: Camera },
                { number: '3-4', label: 'Konsept', icon: Sparkles },
                { number: '5-14', label: 'Gün İdeal', icon: Calendar }
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

        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">Yenidoğan Çekim Paketleri</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Bebeğinizin ilk günlerini güvenli ve sanatsal şekilde kayıt altına alın.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {newbornPackages.map((pkg, index) => (
                <div key={index} className={`rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-xl relative ${pkg.recommended ? 'border-primary bg-primary/5 shadow-lg scale-105' : 'border-gray-200 bg-white hover:border-primary/30'}`}>
                  {pkg.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">En Popüler</span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-2">{pkg.name}</h3>
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
                    className={`w-full block text-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${pkg.recommended ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-100 text-gray-900 hover:bg-primary hover:text-white'}`}
                  >
                    Fiyat Bilgisi Al
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CategoryGallery category="yenidogan" showTitle={true} showViewAllButton={true} limit={8} />

        <section className="py-16 bg-white">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">Sık Sorulan Sorular</h2>
              <p className="text-lg text-gray-600">Yenidoğan çekimi hakkında merak ettikleriniz.</p>
            </div>
            <div className="space-y-6">
              {[
                { q: 'Yenidoğan çekimi ne zaman yapılmalı?', a: 'İlk 5-14 gün arası bebek daha çok uyuduğu için pozlama kolay olur.' },
                { q: 'Çekimi evde yapabilir misiniz?', a: 'Evet, uygun ışık ve alan varsa evde lifestyle konsept çekimler yapıyoruz.' },
                { q: 'Bebek huzursuzlanırsa ne oluyor?', a: 'Sabırlı bir şekilde ara verip beslenme ve rahatlama sürecini bekliyoruz.' },
                { q: 'Hijyen koşulları nasıl sağlanıyor?', a: 'Tüm aksesuarlar her çekim sonrası yıkanır; el dezenfektanı ve steril örtüler kullanılır.' }
              ].map((faq, i) => (
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

        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">Çekim İpuçları</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Güvenli ve konforlu yenidoğan çekimi için dikkat ettiğimiz noktalar.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[{
                title: 'Isı Kontrolü',
                desc: 'Oda sıcaklığını ideal aralıkta tutarak bebeğin rahat uyumasını sağlıyoruz.'
              }, {
                title: 'Güvenli Pozlama',
                desc: 'Bebeğin sağlığı her şeyden önce gelir; riskli pozlardan kaçınıyoruz.'
              }, {
                title: 'Hijyen',
                desc: 'Tüm aksesuarlar steril ve yıkanmış şekilde çekime hazırlanır.'
              }].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
          <div className="container text-center text-white">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">Bebeğinizin İlk Anlarını Ölümsüzleştirelim</h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">Yenidoğan çekimi için sınırlı kontenjan. Doğum tarihinizi önceden iletin, yerinizi ayıralım.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/iletisim" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center">
                <Heart className="w-5 h-5 mr-2" />Rezervasyon
              </Link>
              <a
                href="https://wa.me/905457845667?text=Merhaba%20Antalya%20yenidogan%20bebek%20cekimi%20icin%20bilgi%20almak%20istiyorum"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300 inline-flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />WhatsApp İletişim
              </a>
            </div>
          </div>
        </section>
      </div>

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
        categoryName="Yenidoğan Bebek Çekimi"
      />

      <Footer />
    </>
  );
}
