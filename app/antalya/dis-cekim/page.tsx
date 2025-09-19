import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE_URL, buildBreadcrumbLD, buildWebPageLD, buildServicesLD, buildLocalBusinessLD, buildFaqLD } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Antalya Dış Çekim Fotoğrafçısı | İlkalbüm',
  description: 'Antalya dış çekim: Gün batımı, sahil, doğa ve tarihi mekan konseptleriyle profesyonel fotoğrafçılık. Doğal ışık odaklı estetik kareler.',
  alternates: { canonical: `${SITE_URL}/antalya/dis-cekim` },
  openGraph: { title: 'Antalya Dış Çekim Fotoğrafçısı', description: 'Sahil, gün batımı ve doğal mekanlarda profesyonel dış çekimler.', url: `${SITE_URL}/antalya/dis-cekim` }
};

export default function AntalyaDisCekimPage() {
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
        <section className="py-20 bg-gradient-to-b from-white to-amber-50">
          <div className="container max-w-5xl">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">Antalya Dış Çekim Fotoğrafçısı</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">Doğal ışığın en estetik haliyle; gün doğumu, altın saat ve gün batımı dilimlerinde Antalya'nın benzersiz fonlarını kullanıyoruz.</p>
            {/* semantic synonyms block to catch variants like 'dış çekim fotoğrafçılık' */}
            <p className="sr-only">Antalya dış çekim fotoğrafçılık hizmeti; çift dış çekimi, save the date ve doğal ışık odaklı sahil dış çekimleri içerir.</p>
            <p className="text-gray-600 leading-relaxed mb-8">Konsept planlama, lokasyon rotası, ışık zamanlaması ve styling tavsiyeleri dahil uçtan uca rehberlik. Gereksiz poz şablonları yerine doğal akışta çekim.</p>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Öne Çıkan Lokasyonlar</h2>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• Lara & Konyaaltı sahil</li>
                  <li>• Tarihi Kaleiçi dokusu</li>
                  <li>• Falez & kayalık alanlar</li>
                  <li>• Doğa / orman açıklıkları</li>
                  <li>• Gün batımı silüet noktaları</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Zamanlama Stratejisi</h2>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• Golden hour planlama</li>
                  <li>• Gerekiyorsa çift seans (gün doğumu + batımı)</li>
                  <li>• Işık sertliğine göre gölge kullanımı</li>
                  <li>• Rüzgar & kalabalık takibi</li>
                  <li>• Rota optimizasyonu</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Yaklaşım</h2>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• Doğal yönlendirme (kasılma yok)</li>
                  <li>• Hareket & akış bazlı kareler</li>
                  <li>• Renk uyumu & minimal ton</li>
                  <li>• Gereksiz aksesuar minimum</li>
                  <li>• Atmosfer & duyguyu koruma</li>
                </ul>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-amber-100 shadow-sm mb-16">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Paket Yaklaşımı</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Süre, lokasyon sayısı ve stil değişimi (kıyafet / aksesuar) gibi faktörlerle paket esnetilir. Işık dilimine göre çekim bölümlenir.</p>
              <a href="/fiyatlandirma" className="inline-flex items-center px-5 py-3 rounded-lg bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition">Fiyatları İncele</a>
            </div>
            <div className="space-y-10 mb-20">
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Sık Sorulan Sorular</h2>
                <div className="space-y-6">
                  {[{
                    q: 'En iyi çekim saatleri?',
                    a: 'Gün doğumu sonrası ilk 45 dk ve gün batımından önceki altın saat (yaklaşık 60-75 dk).'
                  }, {
                    q: 'Kaç lokasyon seçebiliriz?',
                    a: 'Standartta 1-2; premiumda rota planlı 2-3 farklı doku.'
                  }, {
                    q: 'Kıyafet önerisi veriyor musunuz?',
                    a: 'Evet; renk paleti, doku ve katman uyumuna göre stil tavsiyesi sunuyoruz.'
                  }, {
                    q: 'Teslim süresi?',
                    a: 'Sezona bağlı 7-14 gün arasında düzenlenmiş teslim.'
                  }, {
                    q: 'Video opsiyonu eklenebilir mi?',
                    a: 'Talebe göre kısa motion highlight eklenebilir.' 
                  }].map((f, i) => (
                    <details key={i} className="group border border-amber-100 rounded-xl p-4 bg-white">
                      <summary className="cursor-pointer text-sm font-medium text-gray-800 flex justify-between items-center">
                        <span>{f.q}</span>
                        <span className="text-amber-500 group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <p className="mt-3 text-sm text-gray-600 leading-relaxed">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center mb-24">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-4">Çekim Planlayın</h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base">Antalya ışığını doğru saatte yakalamak için erken planlama yapın.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/iletisim" className="px-6 py-3 rounded-lg bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition">İletişim</a>
                <a href="https://wa.me/905457845667?text=Merhaba%20Antalya%20dış%20çekim%20hakkında%20bilgi%20almak%20istiyorum" className="px-6 py-3 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
