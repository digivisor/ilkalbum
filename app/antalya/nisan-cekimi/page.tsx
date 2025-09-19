import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE_URL, buildBreadcrumbLD, buildWebPageLD, buildServicesLD, buildLocalBusinessLD, buildFaqLD } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Antalya Nişan Çekimi | İlkalbüm',
  description: 'Antalya nişan çekimi: Romantik çift portreleri, aile kareleri, yüzük & detay çekimleri. Kaleiçi, Side, sahil ve konsept lokasyon önerileri.',
  alternates: { canonical: `${SITE_URL}/antalya/nisan-cekimi` },
  openGraph: { title: 'Antalya Nişan Çekimi', description: 'Romantik & samimi Antalya nişan fotoğrafçılığı.', url: `${SITE_URL}/antalya/nisan-cekimi` }
};

export default function AntalyaNisanPage() {
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
        <section className="py-20 bg-gradient-to-b from-white to-pink-50">
          <div className="container max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">Antalya Nişan Çekimi</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">Evlilik yolculuğunuzun ilk özel duraklarından nişan günü için doğal, romantik ve duygusal kareler oluşturuyoruz. Antalya'nın eşsiz ışığı ve atmosferi ile sade & zarif çekim konseptleri.</p>
            <p className="text-gray-600 leading-relaxed mb-8">Çift portreleri, yüzük takma anı, aile grupları, konsept detaylar ve mini dış çekim kombinasyonu. Golden hour planlaması ve mekan seçim rehberliğiyle süreci stressiz hale getiriyoruz.</p>
            <p className="sr-only">Antalya nişan fotoğrafçılık ve söz çekimi; save the date ve dış çekim varyasyonlarını da kapsar.</p>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Çekim İçeriği</h2>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• Yüzük & detay çekimleri</li>
                  <li>• Çift portreleri & romantik konsept</li>
                  <li>• Aile / arkadaş grup kareleri</li>
                  <li>• Mini dış çekim (opsiyonel)</li>
                  <li>• Renk & ton düzenleme</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Lokasyon Önerileri</h2>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• Kaleiçi butik sokakları</li>
                  <li>• Gün batımı sahil çekimi</li>
                  <li>• Tarihi Side dokusu</li>
                  <li>• Doğa / park alanı</li>
                  <li>• Özel konsept mekan</li>
                </ul>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm mb-16">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Paketler & Esneklik</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Süre, lokasyon sayısı ve ekstra konsept (çiçek, aksesuar) ihtiyaçlarınıza göre paketleri özelleştiriyoruz. Çekim öncesi kısa bir planlama görüşmesi öneriyoruz.</p>
              <a href="/fiyatlandirma" className="inline-flex items-center px-5 py-3 rounded-lg bg-pink-600 text-white text-sm font-medium hover:bg-pink-700 transition">Fiyatlandırmayı Gör</a>
            </div>
            <div className="space-y-10 mb-20">
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Sık Sorulan Sorular</h2>
                <div className="space-y-6">
                  {[{
                    q: 'Nişan çekimi kaç saat?',
                    a: 'Standart paket 2-3 saat; plus paket ek konsept + lokasyon içerir.'
                  }, {
                    q: 'Kaç fotoğraf teslim ediliyor?',
                    a: 'Paket kapsamına göre 150-300 seçilmiş ve düzenlenmiş JPEG.'
                  }, {
                    q: 'Teslim süresi nedir?',
                    a: 'Ön izleme 5 gün, tamamı 2-3 hafta içinde.'
                  }, {
                    q: 'Mekan seçimini kim yapıyor?',
                    a: 'Öneri listesi sunuyoruz, çift tercihine göre planlıyoruz.'
                  }, {
                    q: 'Rezervasyon nasıl yapılır?',
                    a: '%30 ön ödeme ile tarih kesinleşir.'
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
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-4">Tarih İçin Uygunluğu Sorun</h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base">Nişan gününüzü planlıyorsanız hızlıca uygunluk kontrolü yapalım.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/iletisim" className="px-6 py-3 rounded-lg bg-pink-600 text-white text-sm font-medium hover:bg-pink-700 transition">İletişim</a>
                <a href="https://wa.me/905457845667?text=Merhaba%20Antalya%20nişan%20çekimi%20için%20bilgi%20almak%20istiyorum" className="px-6 py-3 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
