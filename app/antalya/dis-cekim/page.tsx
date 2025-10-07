import { SITE_URL } from '@/lib/seo';
import ClientPage from './ClientPage';

export const metadata = {
  title: 'Antalya Dış Çekim Fotoğrafçısı | Golden Hour & Doğal Lokasyon Paketleri',
  description: 'Antalya dış çekim fotoğrafçısı: sahil, orman ve panoramik lokasyonlarda golden hour odaklı profesyonel fotoğraf çekimi paketleri ve rehber.',
  alternates: { canonical: `${SITE_URL}/antalya/dis-cekim` },
  openGraph: {
    title: 'Antalya Dış Çekim Fotoğrafçısı | İlkalbüm',
    description: 'Doğal ışık, gün batımı ve çok lokasyonlu dış çekim paketleri.',
    url: `${SITE_URL}/antalya/dis-cekim`,
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antalya Dış Çekim Fotoğrafçısı',
    description: 'Golden hour odaklı dış çekim paketleri.'
  }
};

export default function AntalyaDisCekimPage() { return <ClientPage />; }
