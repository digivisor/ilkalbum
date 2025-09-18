// app/(client)/pricing/page.tsx
import type { Metadata } from 'next';
import { Star } from 'lucide-react';
import { PricingClient, PricingPackage } from '@/components/PricingClient';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE_URL, buildBreadcrumbLD, buildFaqLD, buildServicesLD, buildWebPageLD } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Fiyatlandırma | İlkalbüm Fotoğrafçılık',
  description: 'Düğün, nişan, bebek ve dış çekim fotoğrafçılığı paket fiyatları ve ek hizmetler. Şeffaf fiyatlandırma ile doğru paketi seçin.',
  keywords: ['düğün fotoğrafçısı fiyat', 'nişan çekimi ücret', 'bebek fotoğrafı fiyat', 'dış çekim paket', 'wedding photographer price'],
  alternates: { canonical: `${SITE_URL}/fiyatlandirma` },
  openGraph: {
    title: 'Fotoğrafçılık Paket Fiyatları | İlkalbüm',
    description: 'Düğün, nişan ve bebek çekimleri için profesyonel paket fiyatları.',
    url: `${SITE_URL}/fiyatlandirma`,
    siteName: 'İlkalbüm',
    type: 'website',
    locale: 'tr_TR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fotoğraf Paketleri | İlkalbüm',
    description: 'Özel günlerinizi ölümsüzleştiren çekim paketleri.'
  }
};


type Campaign = {
  title: string;
  description: string;
  note?: string;
  discountPercent: number;
  expiresAt: string;
};

// PricingPackage tipi client componente taşındı

export default async function FiyatlandirmaPage() {
  let packages: PricingPackage[] = [];
  let campaign: Campaign | null = null;

  // Pricing fetch (güvenli)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pricing`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      packages = await res.json();
    } else {
      console.error('Pricing fetch failed status:', res.status);
    }
  } catch (err) {
    console.error('Pricing fetch error:', err);
  }

  // Campaign fetch (güvenli) - doğru endpoint /api/campaigns olmalı
  try {
    const campaignRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/campaigns`, {
      next: { revalidate: 60 },
    });
    if (campaignRes.ok) {
      const campaigns = await campaignRes.json();
      campaign = campaigns.find((c: any) => c.isActive && c.type === 'pricing') || null;
    }
  } catch (err) {
    console.error('Campaign fetch error:', err);
  }

  // Build structured data pieces
  const faqLD = buildFaqLD([
    { q: 'Teslim süresi ne kadar?', a: 'Standart teslim süremiz 3-4 hafta; hızlı teslim opsiyonu ile ön izleme 48 saatte sunulur.' },
    { q: 'Ödeme nasıl yapılıyor?', a: 'Rezervasyonda %30 kapora, çekim günü %40, teslimatta kalan bakiye alınır.' },
    { q: 'Şehir dışı çekim var mı?', a: 'Evet, ulaşım ve konaklama masrafları eklenerek şehir dışı hizmet sağlıyoruz.' }
  ]);
  const breadcrumbLD = buildBreadcrumbLD([
    { name: 'Anasayfa', url: SITE_URL },
    { name: 'Fiyatlandırma', url: `${SITE_URL}/fiyatlandirma` }
  ]);
  const servicesLD = buildServicesLD(packages.map(p => ({
    id: p._id,
    name: p.name,
    price: p.price,
    category: (p.categories && p.categories[0]) || 'Fotoğrafçılık'
  })));
  const webPageLD = buildWebPageLD({
    name: 'Fiyatlandırma',
    description: 'Düğün, nişan, bebek ve dış çekim fotoğrafçılığı paket fiyatları.',
    path: '/fiyatlandirma'
  });

  return (
    <>
      <Header />
      {/* JSON-LD scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
      {servicesLD.slice(0, 12).map((obj, i) => (
        <script key={`svc-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      <div className="pt-20">
  {/* Hero */}
  <div className="py-20 bg-[linear-gradient(135deg,#ffffff,#fff6fa,#ffe6ef,#ffd4e7)]">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">Fiyatlandırma</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            İhtiyaçlarınıza uygun paketler ve şeffaf fiyatlandırma. 
            Özel günleriniz için kaliteli hizmet, uygun fiyat.
          </p>
        </div>
      </div>

      {/* Kampanya Banner */}
<section className="py-12 bg-gradient-to-r from-pink-500 to-rose-500">
  <div className="container text-center text-white">
    {campaign ? (
      <>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">🎉 {campaign.title}</h2>
        <p className="text-lg mb-4">
          {campaign.description} <strong>%{campaign.discountPercent} indirim</strong>
        </p>
        {campaign.note && (
          <p className="text-sm opacity-90">* {campaign.note}</p>
        )}
      </>
    ) : (
      <>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">🎁 Şu an aktif kampanya bulunmamaktadır</h2>
        <p className="text-sm opacity-90">Yeni kampanyalar için bizi takip etmeye devam edin.</p>
      </>
    )}
  </div>
</section>


      {/* Paketler ve ek bölümler (client) */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="container">
          {packages.length > 0 ? (
            <PricingClient packages={packages} campaign={campaign} />
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Star className="w-16 h-16 text-pink-500 mx-auto mb-6 opacity-70" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Paketler şu anda yüklenemedi</h3>
                <p className="text-gray-600 mb-6">Sunucuya ulaşılamadı veya henüz paket eklenmedi. Daha sonra tekrar deneyin ya da bizimle iletişime geçin.</p>
                <a href="/iletisim" className="inline-flex items-center px-6 py-3 rounded-lg bg-pink-600 text-white font-medium hover:bg-pink-700 transition-colors">
                  İletişime Geç
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
