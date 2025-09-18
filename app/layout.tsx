import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'İlkalbüm - Düğün Fotoğrafçılığı',
  description: 'Düğün, nişan, bebek ve dış çekim fotoğrafçılığı hizmetleri. Özel anlarınızı unutulmaz kılıyoruz.',
  keywords: 'düğün fotoğrafçısı, nişan çekimi, bebek fotoğrafları, dış çekim, wedding photographer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <main className="min-h-screen">
          {children}
        </main>
,      </body>
    </html>
  );
}