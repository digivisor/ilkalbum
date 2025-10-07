import type { Metadata } from 'next';
import { HeroSlider } from '../components/HeroSlider';
import { CategoryCards } from '../components/CategoryCards';
import { CampaignBanner } from '../components/CampaignBanner';
import { AIPhotoComparison } from '../components/AIPhotoComparison';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ServerPricingService } from '@/services';
import DomeGallery from '@/components/DomeGallery';

export const metadata: Metadata = {
  title: 'İlkalbüm - Düğün Fotoğrafçılığı | Anasayfa',
  description: 'Düğün, nişan, bebek ve dış çekim fotoğrafçılığı hizmetleri. Özel anlarınızı sanatsal bir dokunuşla ölümsüzleştiriyoruz.',
  keywords: 'düğün fotoğrafçısı, nişan çekimi, bebek fotoğrafları, dış çekim, wedding photographer istanbul',
};

export default async function Home() {
  // Get active campaigns for banner with immediate updates
  let campaign;
  try {
    const campaigns = await ServerPricingService.getActiveCampaignsSSR(0);
    const activeCampaign = campaigns.find(c => c.isActive);
    
    // Transform campaign to match CampaignBanner interface
    if (activeCampaign) {
      campaign = {
        ...activeCampaign,
        packages: activeCampaign.packages?.map(pkg => ({
          name: pkg.name,
          oldPrice: 'Özel Fiyat', // Default since backend structure may differ
          newPrice: 'İndirimli',
          description: pkg.name
        })) || []
      };
    }
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    campaign = null;
  }

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSlider />
      <CategoryCards />
            <div style={{ width: '99vw', height: '100vh' }}>
      <DomeGallery />
    </div>
          {campaign && (
        <CampaignBanner campaign={campaign} />
      )}
     
      {/* <AIPhotoComparison /> */}
      <Footer />
    </main>
  );
}