'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ContactService } from '@/services';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const formSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  subject: z.string().min(5, 'Konu en az 5 karakter olmalıdır'),
  message: z.string().min(20, 'Mesaj en az 20 karakter olmalıdır'),
});

type FormData = z.infer<typeof formSchema>;

export default function IletisimPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const result = await ContactService.submitContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message
      });
      
      setSubmitMessage(result.message || 'Form gönderildi');
      reset();
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitMessage('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Header />
    <div className="pt-20">
      <div className="hero-gradient py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6">
            İletişim
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Özel günlerinizi planlama konusunda size yardımcı olmaktan mutluluk duyarız. 
            Bizimle iletişime geçin, sizin için en uygun paketi birlikte belirleyelim.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bize Yazın</h2>
              
              {submitMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  {submitMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad *
                    </label>
                    <Input
                      id="name"
                      {...register('name')}
                      className={errors.name ? 'border-red-300' : 'border-gray-300'}
                      placeholder="Adınız ve soyadınız"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon *
                    </label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      className={errors.phone ? 'border-red-300' : 'border-gray-300'}
                      placeholder="0555 123 4567"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={errors.email ? 'border-red-300' : 'border-gray-300'}
                    placeholder="ornek@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Konu *
                  </label>
                  <Input
                    id="subject"
                    {...register('subject')}
                    className={errors.subject ? 'border-red-300' : 'border-gray-300'}
                    placeholder="Düğün fotoğrafçılığı hakkında bilgi almak istiyorum"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mesajınız *
                  </label>
                  <Textarea
                    id="message"
                    {...register('message')}
                    rows={6}
                    className={errors.message ? 'border-red-300' : 'border-gray-300'}
                    placeholder="Düğün tarihim, misafir sayısı, istediğiniz paket türü gibi detayları belirtirseniz size daha hızlı dönüş yapabiliriz..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Gönderiliyor...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send size={18} />
                      <span>Mesajı Gönder</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                      <p className="text-gray-600">
                          Emek Mh. Yeşilırmak Cd, 07060 Kepez/Antalya
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                      <p className="text-gray-600">+90 545 784 56 67</p>
                      <p className="text-sm text-gray-500">WhatsApp mevcut</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                      <p className="text-gray-600">info@ilkalbum.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Çalışma Saatleri</h3>
                      <p className="text-gray-600">
                        Pazartesi - Cuma: 09:00 - 18:00<br />
                        Cumartesi: 10:00 - 16:00<br />
                        Pazar: Randevulu
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sosyal Medya</h2>
                <p className="text-gray-600 mb-6">
                  Son çalışmalarımızı ve güncel paylaşımlarımızı takip etmek için sosyal medya hesaplarımızı ziyaret edin.
                </p>
                
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors">
                    <Instagram className="w-6 h-6 text-pink-600" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors">
                    <Facebook className="w-6 h-6 text-pink-600" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors">
                    <MessageCircle className="w-6 h-6 text-pink-600" />
                  </a>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-8 rounded-2xl text-white">
                <h2 className="text-xl font-bold mb-4">💡 İletişim İpuçları</h2>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Düğün tarihinizi belirtirseniz daha hızlı dönüş yapabiliriz</li>
                  <li>• Misafir sayınızı ve mekan bilgisini paylaşın</li>
                  <li>• Bütçe aralığınızı belirtmekten çekinmeyin</li>
                  <li>• Örnek çalışmalarımızı Instagram'dan inceleyebilirsiniz</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Lokasyonumuz
            </h2>
            <p className="text-lg text-gray-600">
              Bağdat Caddesi üzerinde kolay ulaşılabilir konumda yer alıyoruz
            </p>
          </div>
          
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin size={48} className="mx-auto mb-4" />
                <p className="text-lg font-semibold">Google Maps Entegrasyonu</p>
                <p className="text-sm">Bağdat Caddesi No: 123, Kadıköy, İstanbul</p>
                <p className="text-xs mt-2">* Gerçek projede Google Maps API entegrasyonu yapılacaktır</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
    <Footer />
    </>
  );
}