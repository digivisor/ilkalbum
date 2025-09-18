import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE_URL, buildBreadcrumbLD, buildWebPageLD } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Antalya Fotoğrafçılık Hizmetleri | İlkalbüm',
  description: 'Antalya düğün, nişan, yenidoğan, bebek ve dış çekim profesyonel fotoğrafçılık hizmetleri. Lokasyon önerileri, doğal hikaye anlatımı ve hızlı iletişim.',
  alternates: { canonical: `${SITE_URL}/antalya` },
  openGraph: {
    title: 'Antalya Profesyonel Fotoğrafçılık | İlkalbüm',
    description: 'Düğün, nişan, yenidoğan ve dış çekim hizmetleri Antalya odaklı profesyonel ekip.',
    url: `${SITE_URL}/antalya`,
    siteName: 'İlkalbüm'
  }
};

export default function AntalyaHubPage() {
  const breadcrumb = buildBreadcrumbLD([
    { name: 'Anasayfa', url: SITE_URL },
    { name: 'Antalya', url: `${SITE_URL}/antalya` }
  ]);
  const pageLD = buildWebPageLD({
    name: 'Antalya Fotoğrafçılık Hizmetleri',
    description: 'Antalya düğün, nişan, yenidoğan, bebek ve dış çekim profesyonel fotoğrafçılık hizmetleri.',
    path: '/antalya'
  });

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="pt-20">
        <section className="py-20 bg-[linear-gradient(135deg,#ffffff,#fff6fa,#ffe6ef,#ffd4e7)] text-center">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">Antalya Fotoğrafçılık Hizmetleri</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Düğün, nişan, yenidoğan / bebek ve dış çekim odaklı hikaye anlatan profesyonel fotoğrafçılık. Antalya lokasyon bilgisi, doğal ışık planlama ve duygusal kareler.</p>
          </div>
        </section>
        <section className="py-16">
          <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Antalya Düğün Fotoğrafçısı', href: '/antalya/dugun-fotografcisi', desc: 'Hazırlıktan ilk dansa tüm gün hikaye odaklı çekim.' },
              { title: 'Antalya Nişan Çekimi', href: '/antalya/nisan-cekimi', desc: 'Romantik ve samimi nişan & söz töreni kareleri.' },
              { title: 'Antalya Yenidoğan & Bebek', href: '/antalya/yenidogan-bebek-cekimi', desc: 'Güvenli, doğal ve zarif yenidoğan & bebek çekimleri.' },
              { title: 'Antalya Dış Çekim', href: '/antalya/dis-cekim', desc: 'Kaleiçi, Lara, Side ve doğa lokasyonlarında dış çekim.' },
            ].map(card => (
              <a key={card.href} href={card.href} className="block group rounded-2xl p-6 bg-white border border-pink-100 hover:shadow-lg transition">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600">{card.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
