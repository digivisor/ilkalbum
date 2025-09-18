import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  {
    id: 'dugun',
    title: 'Düğün Fotoğrafçılığı',
    description: 'Hayatınızın en özel gününü sanatsal bir dokunuşla ölümsüzleştirin. Gelinlikten takılara, nikahtan davete kadar her anı yakalıyoruz.',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    href: '/kategoriler#dugun',
  },
  {
    id: 'nisan',
    title: 'Nişan Çekimi',
    description: 'Birlikteliğinizin başlangıcını romantik ve samimi karelerle belgeliyoruz. Aşkınızın en saf halini objektifimizle yakalıyoruz.',
    image: '/nisan2.jpg',
    href: '/kategoriler#nisan',
  },
  {
    id: 'bebek',
    title: 'Bebek Fotoğrafları',
    description: 'Minik meleklerinizin ilk günlerini, gülümsemelerini ve büyüme anlarını sevgiyle fotoğraflıyoruz.',
    image: '/bebek1.jpg',
    href: '/kategoriler#bebek',
  },
  {
    id: 'dis-cekim',
    title: 'Dış Çekim',
    description: 'Doğanın güzelliği ile birleşen portföy çekimleri. Parklar, sahiller ve şehrin en güzel köşelerinde unutulmaz kareler.',
    image: '/nisan3.jpg',
    href: '/kategoriler#dis-cekim',
  },
];

export function CategoryCards() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
            Çekim Kategorilerimiz
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Her özel anınız için farklı çekim kategorileri ile profesyonel hizmet sunuyoruz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* İkon ve kategori numarası */}
                {/* <div className="absolute top-6 left-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                </div> */}

                {/* İçerik overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-3">
                    {category.title}
                  </h3>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-pink-300 font-medium group-hover:text-white transition-colors">
                    <span className="text-sm md:text-base">Detayları Keşfedin</span>
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Hover efekti için ek gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          ))}
        </div>

        {/* Tüm kategorileri gör butonu */}
        <div className="text-center mt-12">
          <Link href="/kategoriler">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105">
              Tüm Kategorileri Görüntüle
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}