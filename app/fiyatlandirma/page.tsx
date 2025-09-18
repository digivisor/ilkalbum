// app/(client)/pricing/page.tsx
import type { Metadata } from 'next';
import { Star } from 'lucide-react';
import { PricingClient, PricingPackage } from '@/components/PricingClient';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Fiyatlandırma - İlkalbüm',
  description: 'Düğün, nişan, bebek ve dış çekim fotoğrafçılığı paketlerimiz ve fiyatlarımız. Detaylı paket bilgileri ve ek hizmetler.',
  keywords: 'düğün fotoğrafçısı fiyat, nişan çekimi ücret, bebek fotoğrafı fiyat, dış çekim paket, wedding photographer price',
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pricing`, {
    next: { revalidate: 60 }, // ISR: 60 sn’de bir günceller
  });

  if (!res.ok) {
    throw new Error('Fiyat bilgileri alınamadı');
  }

  const packages: PricingPackage[] = await res.json();
  const campaignRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`, {
    next: { revalidate: 60 },
  });

  let campaign: Campaign | null = null;
  if (campaignRes.ok) {
    const campaigns = await campaignRes.json();
    // Aktif ve fiyatlandırma tipindeki kampanyayı bul
    campaign = campaigns.find((c: any) => c.isActive && c.type === 'pricing') || null;
  }

  return (
    <>
      <Header />

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
          <PricingClient packages={packages} campaign={campaign} />
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
