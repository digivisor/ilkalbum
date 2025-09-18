import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Static pages; extend with dynamic gallery items if slugs available.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, '');
  const now = new Date().toISOString();
  const routes: string[] = [
    '/',
    '/fiyatlandirma',
    '/hakkimizda',
    '/iletisim',
    '/galeri',
    '/kategoriler',
    '/antalya',
    '/antalya/dugun-fotografcisi',
    '/antalya/nisan-cekimi',
    '/antalya/yenidogan-bebek-cekimi',
    '/antalya/dis-cekim'
  ];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7
  }));
}
