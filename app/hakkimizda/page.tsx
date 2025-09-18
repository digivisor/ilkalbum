import type { Metadata } from 'next';
import { Camera, Heart, Star, Award } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Hakkımızda - İlkalbüm',
  description: 'İlkalbüm fotoğraf stüdyosu hakkında bilgi edinin. Deneyimli fotoğrafçı kadromuz ve vizyonumuz hakkında detaylı bilgi.',
  keywords: 'fotoğrafçı hakkında, wedding photographer istanbul, profesyonel fotoğrafçı, düğün fotoğrafçısı deneyim',
};

export default function HakkimizdaPage() {
  return (
    <>
      <Header />
      <div className="pt-20">
  <div className="py-20 bg-[linear-gradient(135deg,#ffffff,#fff6fa,#ffe6ef,#ffd4e7)]">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6">
              Hakkımızda
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Özel anlarınızı sanatsal bir dokunuşla ölümsüzleştiren profesyonel ekibimizle tanışın
            </p>
          </div>
        </div>

        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative">
                  <img
                    src="/düğün9.jpg"
                    alt="İlkalbüm Stüdyo"
                    className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-pink-600 text-white p-4 rounded-2xl shadow-lg">
                    <Camera size={32} />
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
                  İlkalbüm'ün Hikayesi
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  İlkalbüm, fotoğrafın sanatsal gücüne duyulan inanç ile kurulmuş profesyonel bir 
                  fotoğraf stüdyosudur. Yıllar içinde edindiğimiz deneyim ve sürekli gelişen teknoloji ile 
                  müşterilerimizin en özel anlarını ölümsüzleştiriyoruz.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Stüdyomuz, modern ekipmanları ve yaratıcı ekibi ile düğün, nişan, bebek ve portre fotoğrafçılığı 
                  alanlarında hizmet vermektedir. Her projeye benzersiz bir yaklaşım sergileyerek, müşterilerimizin 
                  hayallerini gerçeğe dönüştürüyoruz.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Kalite ve müşteri memnuniyetini ön planda tutan İlkalbüm, sektördeki yenilikleri yakından 
                  takip ederek hizmet standartlarını sürekli geliştirmektedir. Amacımız, her çekimde mükemmellik 
                  standardını yakalamak ve unutulmaz anılar yaratmaktır.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-pink-50 rounded-xl">
                    <div className="text-2xl font-bold text-pink-600 mb-2">1000+</div>
                    <div className="text-gray-700">Başarılı Proje</div>
                  </div>
                  <div className="text-center p-4 bg-pink-50 rounded-xl">
                    <div className="text-2xl font-bold text-pink-600 mb-2">%100</div>
                    <div className="text-gray-700">Memnuniyet Oranı</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-white to-pink-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Neden İlkalbüm?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Bizi özel kılan değerler ve yaklaşımımız
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tutkulu Yaklaşım</h3>
                <p className="text-gray-600 leading-relaxed">
                  Her çekimde aynı heyecan ve özenle çalışıyor, her karenin arkasında 
                  benzersiz bir hikaye yaratıyoruz.
                </p>
              </div>

              <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Üstün Kalite</h3>
                <p className="text-gray-600 leading-relaxed">
                  Son teknoloji ekipmanlar ve profesyonel düzenleme teknikleri ile 
                  mükemmel sonuçlar elde ediyoruz.
                </p>
              </div>

              <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Güvenilir Hizmet</h3>
                <p className="text-gray-600 leading-relaxed">
                  Zamanında teslimat, sürekli iletişim ve müşteri memnuniyeti odaklı 
                  hizmet anlayışımızla güveninizi kazanıyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Vizyonumuz
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Geleceğe yönelik hedeflerimiz ve değerlerimiz
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 md:p-12 text-white text-center">
                <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-6">
                  "Her kare bir hikaye, her hikaye bir yaşam"
                </h3>
                <p className="text-lg leading-relaxed opacity-90 mb-8">
                  Amacımız, sadece fotoğraf çekmek değil, anıları yaşatmak ve gelecek nesillere aktarmaktır. 
                  Her müşterimizin hikayesini benzersiz kılacak, onlara özel anları ölümsüzleştirme konusunda 
                  Türkiye'nin önde gelen fotoğraf stüdyosu olmayı hedefliyoruz.
                </p>
                <p className="text-lg leading-relaxed opacity-90">
                  Teknolojinin sunduğu imkanları sanatsal bir bakış açısıyla harmanlayarak, 
                  her projemizde yenilik ve kalite standartlarını yükseltmeye devam ediyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Teknoloji ve Ekipman */}
        <section className="py-20 bg-gradient-to-b from-white to-pink-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Teknoloji & Ekipman
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Son teknoloji ekipmanlarımız ile profesyonel çekim deneyimi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Canon EOS R5</h3>
                <p className="text-gray-600 text-sm">45MP yüksek çözünürlük</p>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Profesyonel Lensler</h3>
                <p className="text-gray-600 text-sm">24-70mm, 85mm, 70-200mm</p>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Işık Sistemi</h3>
                <p className="text-gray-600 text-sm">Profoto & Godox stüdyo ışıkları</p>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Drone Çekimi</h3>
                <p className="text-gray-600 text-sm">4K havadan çekim imkanı</p>
              </div>
            </div>
          </div>
        </section>

        {/* Çalışma Süreci */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Çalışma Sürecimiz
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Rezervasyondan teslim aşamasına kadar profesyonel süreç yönetimi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ön Görüşme</h3>
                <p className="text-gray-600">İhtiyaçlarınızı anlıyor, beklentilerinizi dinliyoruz</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Planlama</h3>
                <p className="text-gray-600">Çekim planı oluşturuyor, detayları belirliyoruz</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Çekim</h3>
                <p className="text-gray-600">Profesyonel ekipmanlarla özenli çekim gerçekleştiriyoruz</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Düzenleme & Teslimat</h3>
                <p className="text-gray-600">Fotoğrafları özenle düzenleyip zamanında teslim ediyoruz</p>
              </div>
            </div>
          </div>
        </section>

        {/* Kalite Standartları */}
        <section className="py-20 mb-20 bg-gradient-to-b from-white to-pink-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
                  Kalite Standartlarımız
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Yüksek Çözünürlük</h3>
                      <p className="text-gray-600">Tüm fotoğraflar minimum 20MP çözünürlükte çekiliyor</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Profesyonel Düzenleme</h3>
                      <p className="text-gray-600">Adobe Lightroom ve Photoshop ile özenli post-prodüksiyon</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Yedekleme Sistemi</h3>
                      <p className="text-gray-600">Çoklu yedekleme ile fotoğraflarınızın güvenliği garanti</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Zamanında Teslimat</h3>
                      <p className="text-gray-600">Belirlenen sürede %100 teslimat garantisi</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="/düğün4.jpg"
                  alt="Profesyonel çekim"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
                {/* <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600 mb-1">%100</div>
                    <div className="text-gray-700 text-sm">Müşteri Memnuniyeti</div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}