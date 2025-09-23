import type { Metadata } from 'next';
import { HeroSlider } from '../components/HeroSlider';
import { CategoryCards } from '../components/CategoryCards';
import { CampaignBanner } from '../components/CampaignBanner';
import { AIPhotoComparison } from '../components/AIPhotoComparison';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'İlkalbüm - Düğün Fotoğrafçılığı | Anasayfa',
  description: 'Düğün, nişan, bebek ve dış çekim fotoğrafçılığı hizmetleri. Özel anlarınızı sanatsal bir dokunuşla ölümsüzleştiriyoruz.',
  keywords: 'düğün fotoğrafçısı, nişan çekimi, bebek fotoğrafları, dış çekim, wedding photographer istanbul',
};

export default async function Home() {
  // Kampanya verilerini çek
  let campaign = null;
  try {
    const campaignRes =  await fetch('http://api.ilkalbum.com/api/campaigns', {
      next: { revalidate: 60 },
    });
    
    if (campaignRes.ok) {
      const campaigns = await campaignRes.json();
      // Aktif ve anasayfa tipindeki kampanyayı bul
      campaign = campaigns.find((c: any) => c.isActive && c.type === 'homepage') || null;
    }
  } catch (error) {
    console.error('Campaign fetch error:', error);
  }

  return (
    <>
      <Header />
      <HeroSlider />
      <CategoryCards />
      <CampaignBanner campaign={campaign} />
      {/* <AIPhotoComparison /> */}
      <Footer />
    </>
  );
}