'use client';

import { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MessageSquare, Check, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ContactService } from '@/services';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string; // Seçili paket adı
  pageName?: string; // Hangi sayfadan geldiği (antalya/dis-cekim, antalya/dugun-fotografcisi gibi)
  categoryName?: string; // Kategori adı (Dış Çekim, Düğün Fotoğrafçısı gibi)
}

export function PricingModal({ 
  isOpen, 
  onClose, 
  packageName = '',
  pageName = '',
  categoryName = ''
}: PricingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name.trim() || !formData.surname.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert('Lütfen tüm zorunlu alanları doldurunuz.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Geçerli bir e-posta adresi giriniz.');
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData = {
        name: `${formData.name} ${formData.surname}`,
        email: formData.email,
        phone: formData.phone,
        subject: `Fiyat Bilgisi Talebi - ${packageName || categoryName}`,
        message: `
FİYAT BİLGİSİ TALEBİ

Ad Soyad: ${formData.name} ${formData.surname}
Kategori: ${categoryName}
Paket: ${packageName}
Sayfa: ${pageName}
İletişim Tipi: pricing-inquiry

${formData.message ? `Ek Bilgiler: ${formData.message}` : ''}
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
          surname: '',
          email: '',
          phone: '',
          message: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Fiyat bilgisi talebi gönderme hatası:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modal kapanırken form'u temizle
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        surname: '',
        email: '',
        phone: '',
        message: ''
      });
      setSubmitSuccess(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4">
        {submitSuccess ? (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-semibold text-gray-900 mb-2">
              Talebiniz Alındı!
            </DialogTitle>
            <p className="text-gray-600">
              Fiyat bilgisi talebiniz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  Fiyat Bilgisi Talebi
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {(packageName || categoryName) && (
                <div className="bg-primary/10 p-3 rounded-lg mt-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">
                      {packageName ? `${categoryName} - ${packageName}` : categoryName}
                    </span>
                  </div>
                </div>
              )}
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Ad <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="Adınız"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="surname" className="text-sm font-medium text-gray-700">
                    Soyad <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="surname"
                      name="surname"
                      type="text"
                      required
                      value={formData.surname}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="Soyadınız"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  E-posta <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Telefon <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="5XX XXX XX XX"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Ek Bilgiler / İstekler
                </Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="pl-10 min-h-[100px] resize-none"
                    placeholder="Çekim detayları, özel istekleriniz varsa belirtebilirsiniz..."
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  İptal
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Fiyat Bilgisi Talep Et'}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}