import type { Metadata } from 'next';
import { CategorySection } from '@/components/CategorySection';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Çekim Kategorileri - İlkalbüm',
  description: 'Düğün, nişan, bebek ve dış çekim fotoğrafçılığı hizmetlerimizi keşfedin. Her kategori için detaylı bilgi ve örnek çalışmalar.',
  keywords: 'düğün fotoğrafçısı, nişan çekimi, bebek fotoğrafları, dış çekim, portrait, wedding photography',
};

const categories = [
  {
    id: 'dis-cekim',
    title: 'Dış Çekim',
    description: 'Doğanın güzelliği ile birleşen portföy çekimleri yapıyoruz. Parklar, sahiller, şehrin en güzel köşeleri ve tarihi mekanlar eşliğinde unutulmaz kareler çekiyoruz. Doğal ışık kullanımı ile profesyonel sonuçlar.',
    features: [
      'Lokasyon önerileri',
      '2-3 saat çekim',
      'Doğal ışık kullanımı',
      'Çeşitli pozlar ve açılar',
      '150+ dijital fotoğraf',
      'Mevsimsel öneriler',
      'Kıyafet danışmanlığı',
      'Hava durumu esnekliği',
    ],
    images: [
      '/düğün1.jpg',
      '/düğün2.jpg',
      '/düğün3.jpg',
      '/düğün4.jpg',
    ],
  },
  {
    id: 'dugun',
    title: 'Düğün Fotoğrafçılığı',
    description: 'Hayatınızın en özel gününü sanatsal bir dokunuşla ölümsüzleştiriyoruz. Hazırlıktan vedaya kadar her anı detayıyla yakalıyor, düğününüzün benzersiz hikayesini anlatıyoruz. Gelinlik giyme anından ilk dansa, nikah töreninden eğlenceye kadar tüm özel anları profesyonel ekipmanlarımız ve deneyimli yaklaşımımızla belgeliyoruz.',
    features: [
      '8-12 saat sürekli çekim',
      'Hazırlık ve tören çekimi',
      'Gelin ve damat portreleri',
      'Düğün dansı ve eğlence',
      '500+ dijital fotoğraf',
      'Online galeri paylaşımı',
      'Yüksek çözünürlük dosyalar',
      'Profesyonel düzenleme',
    ],
    images: [
     
      '/düğün9.jpg',
      '/düğün6.jpg',
      '/düğün7.jpg',
      '/düğün5.jpg',
      
    ],
  },
  {
    id: 'nisan',
    title: 'Nişan Çekimi',
    description: 'Birlikteliğinizin başlangıcını romantik ve samimi karelerle belgeliyoruz. Nişan töreni, aile fotoğrafları ve çift pozları ile bu özel günün anılarını ölümsüzleştiriyoruz. Hem stüdyoda hem de açık havada çekim seçenekleri sunuyoruz.',
    features: [
      '3-4 saat çekim süresi',
      'Tören ve aile fotoğrafları',
      'Çift pozları ve portreler',
      'Yüzük ve detay çekimleri',
      '200+ dijital fotoğraf',
      'Online galeri',
      'Düzenleme dahil',
      'Lokasyon önerileri',
    ],
    images: [
      '/nisan4.jpg',
      '/nisan2.jpg',
      '/nisan3.jpg',
      '/nisan1.jpg',
    ],
  },
  {
    id: 'bebek',
    title: 'Bebek Fotoğrafları',
    description: 'Minik meleklerinizin ilk günlerini, gülümsemelerini ve büyüme anlarını sevgiyle fotoğraflıyoruz. Yenidoğan çekimlerinden yaş günü fotoğraflarına kadar bebeklerin doğal güzelliğini yakalayan özel çekimler.',
    features: [
      'Yenidoğan çekimi (0-14 gün)',
      'Aylık büyüme çekimleri',
      'Aile portreleri',
      'Doğal pozlar ve ifadeler',
      '100+ dijital fotoğraf',
      'Güvenli çekim ortamı',
      'Prop ve aksesuar dahil',
      'Sabırlı yaklaşım',
    ],
    images: [
      '/bebek1.jpg',
      '/bebek2.jpg',
      '/bebek3.jpg',
      '/bebek4.jpg',
    ],
  },
  
];

export default function KategorilerPage() {
  return (
    <>
    <Header />
    <div className="pt-20">
      <div className="hero-gradient py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6">
            Çekim Kategorilerimiz
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Her özel anınız için tasarlanmış profesyonel fotoğrafçılık hizmetleri. 
            Detaylı paket bilgileri ve örnek çalışmalarımızı inceleyin.
          </p>
        </div>
      </div>

      {categories.map((category, index) => (
        <CategorySection key={category.id} category={category} isReversed={index % 2 === 1} />
      ))}
    </div>
    <Footer />
    </>
  );
}