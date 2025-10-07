import { SITE_URL } from '@/lib/seo';
import ClientPage from './ClientPage';

// Server component: only metadata + wrapper. All interactive logic lives in ClientPage.tsx
export const metadata = {
  title: 'Antalya Yenidoğan Bebek Çekimi & Bebek Fotoğrafçısı | Profesyonel Güvenli Çekim',
  description: 'Antalya yenidoğan bebek çekimi ve profesyonel bebek fotoğrafçısı: güvenli pozlar, aile konseptleri, özel paketler ve erken rezervasyon fırsatları.',
  alternates: { canonical: `${SITE_URL}/antalya/yenidogan-bebek-cekimi` },
};

export default function AntalyaYenidoğanBebekPage() {
  return <ClientPage />;
}

