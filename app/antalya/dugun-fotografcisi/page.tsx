import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE_URL, buildBreadcrumbLD, buildWebPageLD, buildServicesLD, buildLocalBusinessLD, buildFaqLD } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Antalya Düğün Fotoğrafçısı | İlkalbüm',
  description: 'Antalya düğün fotoğrafçısı: Kaleiçi, Lara, Side ve doğa lokasyonlarında hikaye anlatımı, hazırlık, first look, tören ve after party çekimleri.',
  alternates: { canonical: `${SITE_URL}/antalya/dugun-fotografcisi` },
  openGraph: { title: 'Antalya Düğün Fotoğrafçısı', description: 'Tüm gün hikaye anlatımlı düğün fotoğrafçılığı ve doğal kareler.', url: `${SITE_URL}/antalya/dugun-fotografcisi` }
};

export default function AntalyaDugunPage() {
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
        <section className="py-20 bg-gradient-to-b from-white to-pink-50">
          <div className="container max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">Antalya Düğün Fotoğrafçısı</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">Kaleiçi'nin tarihi atmosferinden Lara sahillerine, Side'nin antik dokusundan dağ ve kır konseptlerine kadar Antalya'nın ruhunu yansıtan hikaye odaklı düğün fotoğrafçılığı yaklaşıyoruz.</p>
            <p className="text-gray-600 leading-relaxed mb-8">Hazırlık (gelin-damat), first look, nikah & tören, aile portreleri, çift çekimi ve after party anlarını kaydederken ışık planlama, lokasyon zamanlama ve duygusal anlatımı öne çıkarıyoruz. Golden hour ve blue hour planları ile günün en sinematik ışığını kullanıyoruz.</p>
            <p className="sr-only">Antalya düğün fotoğrafçılık ve düğün fotoğrafçısı hizmetleri; save the date, dış çekim ve hikaye anlatımı odaklı yaklaşım içerir.</p>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Öne Çıkan Artılar</h2>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• Tüm gün akış planlama desteği</li>
                  <li>• Doğal duygu yakalama yaklaşımı</li>
                  <li>• Çift portreleri için lokasyon seçimi</li>
                  <li>• Drone opsiyonu (hava şartlarına bağlı)</li>
                  <li>• 7/24 hızlı iletişim hattı</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Lokasyon Önerileri</h2>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• Kaleiçi taş sokak & kapılar</li>
                  <li>• Lara & Konyaaltı sahili golden hour</li>
                  <li>• Side antik kemer & sütunlar</li>
                  <li>• Doğa & dağ konsepti (yayla / çam)</li>
                  <li>• Otel & kır düğünü özel alanları</li>
                </ul>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm mb-16">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Paket Yaklaşımı</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Fiyatlandırma sayfasındaki paketleri Antalya düğün çekimi konseptine göre özelleştiriyoruz: Saat kapsamı, drone, highlight video, lokasyon sayısı. İstanbul paketiniz varsa referans alınabilir; yerel zamanlama ve ulaşım farklılıkları eklenir.</p>
              <a href="/fiyatlandirma" className="inline-flex items-center px-5 py-3 rounded-lg bg-pink-600 text-white text-sm font-medium hover:bg-pink-700 transition">Paket Fiyatlarına Bak</a>
            </div>
            <div className="space-y-10 mb-20">
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Sık Sorulan Sorular</h2>
                <div className="space-y-6">
                  {[{
                    q: 'Antalya düğün çekimi kaç saat sürüyor?',
                    a: 'Tam gün paket genelde 10-12 saat; hazırlık + tören + after party kapsar. Yarım gün 5-6 saat.'
                  }, {
                    q: 'Teslim süresi nedir?',
                    a: 'Ön izleme 7 gün içinde, tamamı 4 hafta içinde (sezon yoğunluğuna göre değişebilir).'
                  }, {
                    q: 'Kaç fotoğraf teslim ediyorsunuz?',
                    a: 'Tam gün çekimlerde 600-900 arası seçilmiş ve düzenlenmiş JPEG.'
                  }, {
                    q: 'Video veya drone dahil mi?',
                    a: 'Drone hava şartlarına bağlı opsiyonel; highlight video ek hizmettir.'
                  }, {
                    q: 'Rezervasyon nasıl kesinleşiyor?',
                    a: '%30 kapora ile tarih bloke edilir, kalan bakiyeler sözleşmede belirtilir.'
                  }].map((f, i) => (
                    <details key={i} className="group border border-pink-100 rounded-xl p-4 bg-white">
                      <summary className="cursor-pointer text-sm font-medium text-gray-800 flex justify-between items-center">
                        <span>{f.q}</span>
                        <span className="text-pink-500 group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <p className="mt-3 text-sm text-gray-600 leading-relaxed">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center mb-24">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-4">Tarihinizi Ayırtın</h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base">Planladığınız düğün tarihi için uygunluk ve öneri almak için bizimle iletişime geçin.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/iletisim" className="px-6 py-3 rounded-lg bg-pink-600 text-white text-sm font-medium hover:bg-pink-700 transition">İletişime Geç</a>
                <a href="https://wa.me/905457845667?text=Merhaba%20Antalya%20düğün%20çekimi%20için%20bilgi%20almak%20istiyorum" className="px-6 py-3 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
