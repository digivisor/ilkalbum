import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE_URL, buildBreadcrumbLD, buildWebPageLD, buildServicesLD } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Antalya Yenidoğan & Bebek Çekimi | İlkalbüm',
  description: 'Antalya yenidoğan ve bebek fotoğrafçılığı: Güvenli, steril ve doğal konseptli çekimler. İlk günlerden özel anlara kadar profesyonel yaklaşım.',
  alternates: { canonical: `${SITE_URL}/antalya/yenidogan-bebek-cekimi` },
  openGraph: { title: 'Antalya Yenidoğan & Bebek Fotoğrafçısı', description: 'Doğal ve güvenli yenidoğan & bebek çekim konseptleri.', url: `${SITE_URL}/antalya/yenidogan-bebek-cekimi` }
};

export default function AntalyaYenidoğanBebekPage() {
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

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {services.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-b from-white to-pink-50">
          <div className="container max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">Antalya Yenidoğan & Bebek Çekimi</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">İlk günlerin kırılgan anlarını güvenli, steril ve doğal bir yaklaşımla belgeliyoruz. Bebek sağlığı ve konforu her zaman önceliğimiz.</p>
            <p className="text-gray-600 leading-relaxed mb-8">Yenidoğan pozlandırma, doğal ışık kullanımı, aksesuar hijyeni, aile / kardeş dahil kompozisyon planlama ve büyüme serisi (3-6-9-12 ay) gibi ihtiyaçlara uygun esnek hizmet.</p>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Önemli Unsurlar</h2>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• 0-14 gün ideal dönem planlama</li>
                  <li>• Steril & ısı kontrollü ortam</li>
                  <li>• Doğal renk paleti & soft tonlar</li>
                  <li>• Aile & kardeş dahil opsiyon</li>
                  <li>• Büyüme serisi planlama</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Konsept & Yaklaşım</h2>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• Doğal & sade aksesuar</li>
                  <li>• Aşırı photoshop yok (gerçek doku)</li>
                  <li>• Güvenli pozlandırma teknikleri</li>
                  <li>• Rahatlatıcı ses / ortam</li>
                  <li>• Hijyenik kumaş & prop seçimi</li>
                </ul>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm mb-16">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Paket Mantığı</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Çekim süresi, konsept sayısı ve aile katılımına göre paketler esnetilebilir. Serili planlarda (3-6-9 ay) zaman blokları önceden ayırtılır.</p>
              <a href="/fiyatlandirma" className="inline-flex items-center px-5 py-3 rounded-lg bg-pink-600 text-white text-sm font-medium hover:bg-pink-700 transition">Fiyatları İncele</a>
            </div>
            <div className="space-y-10 mb-20">
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Sık Sorulan Sorular</h2>
                <div className="space-y-6">
                  {[{
                    q: 'En ideal çekim zamanı?',
                    a: 'Yenidoğan için 5-12 gün; bebek gülümsemesi için 3-4. ay, desteksiz oturma 6-8. ay.'
                  }, {
                    q: 'Ne kadar sürüyor?',
                    a: 'Yenidoğan çekimi 2.5-3 saat; bebek çekimi 60-90 dakika.'
                  }, {
                    q: 'Kaç fotoğraf teslim ediliyor?',
                    a: 'Yenidoğan çekiminde 40-70; bebek konseptli serilerde her seans 30-50.'
                  }, {
                    q: 'Aksesuar getiriyor musunuz?',
                    a: 'Evet; sterilize edilmiş soft tonlu aksesuar seti ile geliyoruz.'
                  }, {
                    q: 'Eve gelebiliyor musunuz?',
                    a: 'Antalya içinde ev çekimi opsiyoneldir (ışık koşullarına bağlı).' 
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
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-4">Çekim Planlayın</h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base">Yenidoğan dönemi hızlı geçiyor — uygun tarih için hemen iletişim kurun.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/iletisim" className="px-6 py-3 rounded-lg bg-pink-600 text-white text-sm font-medium hover:bg-pink-700 transition">İletişim</a>
                <a href="https://wa.me/905457845667?text=Merhaba%20Antalya%20yenidoğan%20çekimi%20için%20bilgi%20almak%20istiyorum" className="px-6 py-3 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
