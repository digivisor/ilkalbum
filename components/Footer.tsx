import Link from 'next/link';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

// WhatsApp SVG Icon Component
const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-50 to-rose-50 border-t border-pink-100">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center space-x-2">
              <span className="text-2xl font-playfair font-bold text-pink-600">
                ilkalbüm
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Özel anlarınızı sanatsal bir dokunuşla ölümsüzleştiriyoruz. 
              Düğün, nişan ve yaşamın tüm güzel anları için profesyonel fotoğrafçılık hizmeti.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-pink-600 hover:text-pink-700 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a 
                href="https://wa.me/905457845667?text=Merhaba,%20ben%20ilkalbüm%20sitesinden%20ulaşıyorum." 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 transition-colors"
                title="WhatsApp ile iletişime geç"
              >
                <WhatsAppIcon size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Hızlı Linkler</h3>
            <nav className="space-y-2">
              <Link href="/" className="block text-gray-600 hover:text-pink-600 transition-colors text-sm">
                Anasayfa
              </Link>
              <Link href="/kategoriler" className="block text-gray-600 hover:text-pink-600 transition-colors text-sm">
                Çekim Kategorileri
              </Link>
              <Link href="/galeri" className="block text-gray-600 hover:text-pink-600 transition-colors text-sm">
                Galeri
              </Link>
              <Link href="/fiyatlandirma" className="block text-gray-600 hover:text-pink-600 transition-colors text-sm">
                Fiyatlandırma
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Hizmetlerimiz</h3>
            <nav className="space-y-2">
              <Link href="/kategoriler" className="block text-gray-600 hover:text-pink-600 transition-colors text-sm">
                Düğün Fotoğrafçılığı
              </Link>
              <Link href="/kategoriler" className="block text-gray-600 hover:text-pink-600 transition-colors text-sm">
                Nişan Çekimi
              </Link>
              <Link href="/kategoriler" className="block text-gray-600 hover:text-pink-600 transition-colors text-sm">
                Bebek Fotoğrafları
              </Link>
              <Link href="/kategoriler" className="block text-gray-600 hover:text-pink-600 transition-colors text-sm">
                Dış Çekim
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-pink-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600 text-sm">
                 Emek Mh. Yeşilırmak Cd, 07060 Kepez/Antalya
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-pink-600 flex-shrink-0" />
                <a 
                  href="tel:+905457845667" 
                  className="text-gray-600 hover:text-pink-600 transition-colors text-sm"
                >
                  +90 545 784 56 67
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-pink-600 flex-shrink-0" />
                <a 
                  href="mailto:info@ilkalbum.com" 
                  className="text-gray-600 hover:text-pink-600 transition-colors text-sm"
                >
                  info@ilkalbum.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 İlkalbüm. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}