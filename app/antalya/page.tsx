import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Camera, MapPin, Star, Heart, Users, Award, Phone, Mail, ArrowRight } from 'lucide-react';
import { SITE_URL, buildBreadcrumbLD, buildWebPageLD } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Antalya Fotoğrafçılık Hizmetleri | İlkalbüm',
  description: 'Antalya düğün, nişan, yenidoğan, bebek ve dış çekim profesyonel fotoğrafçılık hizmetleri. Lokasyon önerileri, doğal hikaye anlatımı ve hızlı iletişim.',
  alternates: { canonical: `${SITE_URL}/antalya` },
  openGraph: {
    title: 'Antalya Profesyonel Fotoğrafçılık | İlkalbüm',
    description: 'Düğün, nişan, yenidoğan ve dış çekim hizmetleri Antalya odaklı profesyonel ekip.',
    url: `${SITE_URL}/antalya`,
    siteName: 'İlkalbüm'
  }
};

export default function AntalyaHubPage() {
  const breadcrumb = buildBreadcrumbLD([
    { name: 'Anasayfa', url: SITE_URL },
    { name: 'Antalya', url: `${SITE_URL}/antalya` }
  ]);
  const pageLD = buildWebPageLD({
    name: 'Antalya Fotoğrafçılık Hizmetleri',
    description: 'Antalya düğün, nişan, yenidoğan, bebek ve dış çekim profesyonel fotoğrafçılık hizmetleri.',
    path: '/antalya'
  });

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="hero-gradient py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="w-6 h-6" />
                <span className="text-white/90 text-lg">Antalya</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">
                Antalya'nın En İyi Fotoğrafçılık Hizmeti
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Düğün, nişan, bebek ve dış çekim konularında uzman ekibimizle Antalya'nın en güzel lokasyonlarında 
                unutulmaz anlarınızı ölümsüzleştiriyoruz.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/iletisim" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105">
                  Hemen İletişime Geç
                </Link>
                <Link href="/galeri" className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300">
                  Portföyümüzü İncele
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  500+
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Mutlu Çift</h3>
                <p className="text-sm text-gray-600">Düğün çekimi tamamlandı</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  5
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Yıl Tecrübe</h3>
                <p className="text-sm text-gray-600">Profesyonel çekim</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  24/7
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Destek</h3>
                <p className="text-sm text-gray-600">Müşteri hizmetleri</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  %100
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Memnuniyet</h3>
                <p className="text-sm text-gray-600">Müşteri memnuniyeti</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-gradient-to-b from-white to-primary/5">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Antalya Fotoğrafçılık Hizmetlerimiz
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Her özel anınız için profesyonel çekim hizmetleri. Antalya'nın en güzel lokasyonlarında unutulmaz kareler.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                { 
                  title: 'Antalya Düğün Fotoğrafçısı', 
                  href: '/antalya/dugun-fotografcisi', 
                  desc: 'Hazırlıktan ilk dansa, düğün gününüzün her anını duygusal ve estetik karelerle ölümsüzleştiriyoruz. Kaleiçi, Lara Beach ve luxury otellerde profesyonel çekimler.',
                  icon: Heart,
                  image: '/düğün1.jpg'
                },
                { 
                  title: 'Antalya Nişan Çekimi', 
                  href: '/antalya/nisan-cekimi', 
                  desc: 'Romantik ve samimi nişan çekimleri. Antalya Marina, Kaleiçi ve sahil lokasyonlarında aşkınızın hikayesini anlatıyoruz.',
                  icon: Star,
                  image: '/nisan1.jpg'
                },
                { 
                  title: 'Aile Çekimi', 
                  href: '/antalya/aile-cekimi', 
                  desc: 'Bebek, çocuk ve aile portreleri. Doğal, samimi ve keyifli çekim deneyimi ile ailenizin benzersiz dinamiğini yansıtan fotoğraflar.',
                  icon: Users,
                  image: '/bebek1.jpg'
                },
                { 
                  title: 'Antalya Dış Mekan Çekimi', 
                  href: '/antalya/dis-mekan-cekimi', 
                  desc: 'Kaleiçi\'nin tarihi dokusundan Lara sahillerinin maviliğine, Antalya\'nın en fotojenik lokasyonlarında dış mekan çekim hizmetleri.',
                  icon: Camera,
                  image: '/düğün2.jpg'
                },
                { 
                  title: 'Çocuk Çekimi', 
                  href: '/antalya/cocuk-cekimi', 
                  desc: 'Çocuklarınızın masumiyetini ve doğal hallerini yakalıyoruz. Yaş günü, okul fotoğrafları ve tema çekimleri dahil.',
                  icon: Star,
                  image: '/bebek2.jpg'
                },
                { 
                  title: 'Kurumsal Çekim', 
                  href: '/antalya/kurumsal-cekim', 
                  desc: 'Profesyonel portreler, ekip çekimleri ve kurumsal etkinlik fotoğrafları. İş dünyasının ihtiyaçlarına özel çözümler.',
                  icon: Award,
                  image: '/düğün3.jpg'
                },
              ].map(service => (
                <Link key={service.href} href={service.href} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl md:text-2xl font-playfair font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {service.desc}
                    </p>
                    <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
                      <span>Detayları İncele</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Neden İlkalbüm'ü Seçmelisiniz?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Antalya'da fotoğrafçılık alanında öncü hizmet kalitesi ve müşteri memnuniyeti odaklı yaklaşımımız.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Profesyonel Ekip</h3>
                <p className="text-gray-600 leading-relaxed">
                  Deneyimli fotoğrafçılarımız ve yardımcı ekibimizle her çekimde mükemmel sonuçlar elde ediyoruz.
                </p>
              </div>
              
              <div className="text-center p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lokasyon Bilgisi</h3>
                <p className="text-gray-600 leading-relaxed">
                  Antalya'nın en güzel ve fotojenik lokasyonlarını biliyoruz. Size en uygun mekanları öneriyoruz.
                </p>
              </div>
              
              <div className="text-center p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Kalite Garantisi</h3>
                <p className="text-gray-600 leading-relaxed">
                  Son teknoloji ekipmanlar ve profesyonel düzenleme ile her fotoğrafta mükemmellik hedefliyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
          <div className="container text-center text-white">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
              Özel Günleriniz İçin Hemen Rezervasyon Yapın
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Antalya'da unutulmaz fotoğraf çekimi deneyimi için bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/iletisim" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" />
                Hemen Ara
              </Link>
              <Link href="/fiyatlandirma" className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300 inline-flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2" />
                Fiyat Al
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
