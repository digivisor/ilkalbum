import { SITE_URL } from '@/lib/seo';
import ClientPage from './ClientPage';

export const metadata = {
  title: 'Antalya Nişan Çekimi & Nişan Fotoğrafçısı | Paketler ve Lokasyon Önerileri',
  description: 'Antalya nişan çekimi ve nişan fotoğrafçısı hizmeti: romantik lokasyonlar, paket seçenekleri, yüzük ve çift portreleri, planlama rehberi ve hızlı rezervasyon.',
  alternates: { canonical: `${SITE_URL}/antalya/nisan-cekimi` },
};

export default function AntalyaNisanPage() {
  return <ClientPage />;
}
