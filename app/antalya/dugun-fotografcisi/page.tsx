// CLEAN SERVER COMPONENT WRAPPER
import { SITE_URL } from '@/lib/seo';
import ClientPage from './ClientPage';

export const metadata = {
  title: 'Antalya Düğün Fotoğrafçısı | Hikaye Odaklı Çekim & Paket Fiyatları',
  description: 'Antalya düğün fotoğrafçısı tam gün – yarım gün paketleri, lokasyon önerileri, golden hour ipuçları ve hızlı rezervasyon. 2025 güncel profesyonel çekim rehberi.',
  alternates: { canonical: `${SITE_URL}/antalya/dugun-fotografcisi` },
};

export default function AntalyaDugunPage() {
  return <ClientPage />;
}
