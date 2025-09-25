import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
// Global structured data helpers
import { buildOrganizationLD, buildWebsiteLD } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'İlkalbüm - Düğün Fotoğrafçılığı',
  description: 'Düğün, nişan, bebek ve dış çekim fotoğrafçılığı hizmetleri. Özel anlarınızı unutulmaz kılıyoruz.',
  keywords: 'düğün fotoğrafçısı, nişan çekimi, bebek fotoğrafları, dış çekim, wedding photographer',
  icons: {
    icon: '/favicon.ico', 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = buildOrganizationLD();
  const site = buildWebsiteLD();
  return (
    <html lang="tr">
      <head>
        <script
          key="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
        />
        <script
          key="ld-site"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}