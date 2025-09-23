'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, CalendarDays, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ContactService, ServerPricingService } from '@/services';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: string;
  showPackages?: boolean;
  showCategory?: boolean; // Çekim kategorisi gösterilsin mi?
  pageType?: 'categories' | 'pricing' | 'campaign'; // Hangi sayfadan açıldığı
}

export function ReservationModal({ isOpen, onClose, selectedPackage, showPackages = false, showCategory = false, pageType = 'categories' }: ReservationModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [campaignPackages, setCampaignPackages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    time: '',
    selectedPackage: selectedPackage || '',
    category: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    try {
      const submitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Rezervasyon Talebi - ${formData.selectedPackage || formData.category}`,
        message: `
REZERVASYON TALEBİ

Tarih: ${selectedDate ? format(selectedDate, 'dd/MM/yyyy', { locale: tr }) : 'Belirtilmedi'}
Saat: ${formData.time || 'Belirtilmedi'}
Paket: ${formData.selectedPackage || 'Belirtilmedi'}
Kategori: ${formData.category || 'Belirtilmedi'}
Sayfa: ${pageType}

Mesaj: ${formData.message || 'Mesaj belirtilmedi'}
        `.trim()
      };

      await ContactService.submitContactForm(submitData);

      setSubmitSuccess(true);
      // 3 saniye sonra modalı kapat
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
        // Form'u temizle
        setFormData({
          name: '',
            email: '',
            phone: '',
            time: '',
            selectedPackage: selectedPackage || '',
            category: '',
          message: ''
        });
        setSelectedDate(undefined);
      }, 3000);
    } catch (error) {
      console.error('Rezervasyon gönderme hatası:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };  // Kampanya paketlerini çek
  useEffect(() => {
    if (pageType === 'campaign' && isOpen) {
      fetchCampaignPackages();
    }
  }, [pageType, isOpen]);

  // selectedPackage prop'u değiştiğinde form'u güncelle
  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        selectedPackage: selectedPackage
      }));
    }
  }, [selectedPackage]);

  const fetchCampaignPackages = async () => {
    try {
      const campaigns = await ServerPricingService.getActiveCampaignsSSR();
      console.log('Alınan kampanyalar:', campaigns); // Debug için
      const activeCampaign = campaigns.find((c: any) => c.isActive && c.type === 'homepage');
      console.log('Aktif kampanya:', activeCampaign); // Debug için
      
      if (activeCampaign && activeCampaign.packages && activeCampaign.packages.length > 0) {
        const packageNames = activeCampaign.packages.map((pkg: any) => pkg.name).filter((name: string) => name.trim() !== '');
        console.log('Paket isimleri:', packageNames); // Debug için
        setCampaignPackages(packageNames);
      } else {
        console.log('Aktif kampanya bulunamadı, varsayılan paketler kullanılıyor');
        // Varsayılan paketler
        setCampaignPackages(['Düğün Paketi', 'Nişan Paketi', 'Bebek Paketi', 'Premium Paket', 'Nişan + Düğün Kombo']);
      }
    } catch (error) {
      console.error('Kampanya paketleri alınamadı:', error);
      // Varsayılan paketler
      setCampaignPackages(['Düğün Paketi', 'Nişan Paketi', 'Bebek Paketi', 'Premium Paket', 'Nişan + Düğün Kombo']);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-pink-600" />
            {submitSuccess ? 'Rezervasyon Başarılı!' : 'Rezervasyon Yap'}
          </DialogTitle>
        </DialogHeader>
        
        {submitSuccess ? (
          // Başarı ekranı
          <div className="text-center py-8 space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Rezervasyon Talebiniz Alındı!
              </h3>
              <p className="text-gray-600">
                En kısa sürede size dönüş yapacağız.
              </p>
            </div>
            {/* <div className="animate-pulse">
              <p className="text-sm text-gray-500">Modal 3 saniye sonra kapanacak...</p>
            </div> */}
          </div>
        ) : (
          // Form ekranı
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ad Soyad */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4 text-pink-600" />
                Ad Soyad *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Adınız ve Soyadınız"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-600" />
                E-posta *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {/* Telefon */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-600" />
                Telefon *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0555 555 55 55"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                className="focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {/* Seçilen Paket Bilgisi (Fiyatlandırma sayfası için) */}
            {selectedPackage && pageType === 'pricing' && (
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-pink-700">
                  <User className="w-4 h-4" />
                  <span className="font-medium">Seçili Paket: {selectedPackage}</span>
                </div>
              </div>
            )}

            {/* Çekim Kategorisi (Kategoriler sayfası için) */}
            {showCategory && pageType === 'categories' && (
              <div className="space-y-2">
                <Label htmlFor="category">Çekim Kategorisi *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                >
                  <option value="">Kategori seçiniz</option>
                  <option value="Düğün Fotoğrafçılığı">Düğün Fotoğrafçılığı</option>
                  <option value="Nişan Çekimi">Nişan Çekimi</option>
                  <option value="Bebek Fotoğrafları">Bebek Fotoğrafları</option>
                  <option value="Dış Çekim">Dış Çekim</option>
                </select>
              </div>
            )}

            {/* Paket Seçimi (Kampanya sayfası için) */}
            {pageType === 'campaign' && (
              <div className="space-y-2">
                <Label htmlFor="campaignPackage">Hangi Paketi İstiyorsunuz? *</Label>
                <select
                  id="campaignPackage"
                  value={formData.selectedPackage}
                  onChange={(e) => handleInputChange('selectedPackage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                >
                  <option value="">Paket seçiniz</option>
                  {campaignPackages.map((packageName) => (
                    <option key={packageName} value={packageName}>
                      {packageName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Tarih */}
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-pink-600" />
                Tercih Edilen Tarih
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal focus:ring-pink-500 focus:border-pink-500"
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'dd MMMM yyyy', { locale: tr }) : "Tarih seçiniz"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    locale={tr}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Saat */}
            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-pink-600" />
                Tercih Edilen Saat
              </Label>
              <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                <SelectTrigger className="focus:ring-pink-500 focus:border-pink-500">
                  <SelectValue placeholder="Saat seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00</SelectItem>
                  <SelectItem value="10:00">10:00</SelectItem>
                  <SelectItem value="11:00">11:00</SelectItem>
                  <SelectItem value="12:00">12:00</SelectItem>
                  <SelectItem value="13:00">13:00</SelectItem>
                  <SelectItem value="14:00">14:00</SelectItem>
                  <SelectItem value="15:00">15:00</SelectItem>
                  <SelectItem value="16:00">16:00</SelectItem>
                  <SelectItem value="17:00">17:00</SelectItem>
                  <SelectItem value="18:00">18:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mesaj */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-pink-600" />
              Ek Bilgiler / İstekler
            </Label>
            <Textarea
              id="message"
              placeholder="Çekim hakkında detaylar, özel istekler, lokasyon tercihleri vb."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={4}
              className="focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          {/* Bilgilendirme */}
          <div className="bg-pink-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Not:</strong> Bu form sadece ön rezervasyon talebidir. Kesin rezervasyon için size döneceğiz ve detayları konuşacağız.
              {showPackages ? (
                <span> Kampanya fiyatları 31 Aralık 2024 tarihine kadar geçerlidir ve sınırlı sayıdadır.</span>
              ) : (
                <span> Fiyat bilgileri ve uygunluk durumu telefon veya e-posta ile iletilecektir.</span>
              )}
            </p>
          </div>

          {/* Butonlar */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 hover:bg-gray-50"
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white disabled:opacity-50"
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Rezervasyon Talebi Gönder'}
            </Button>
          </div>
        </form>
        )}
      </DialogContent>
    </Dialog>
  );
}