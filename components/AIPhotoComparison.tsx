'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Sparkles, ArrowRight, Loader2 } from 'lucide-react';

export function AIPhotoComparison() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Örnek demo resimler - sonra gerçek AI API'ye bağlanacak
  const demoImages = {
    original: '/bebek1.jpg',
    enhanced: '/bebek2.jpg'
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      
      // Simulate AI processing
      setIsProcessing(true);
      setTimeout(() => {
        // Demo için bebek2.jpg kullanıyoruz - gerçek AI API entegrasyonu gerekecek
        setEnhancedImage('/bebek2.jpg');
        setIsProcessing(false);
      }, 3000);
    };
    reader.readAsDataURL(file);
  };

  const loadDemoImages = () => {
    setOriginalImage(demoImages.original);
    setIsProcessing(true);
    setTimeout(() => {
      setEnhancedImage(demoImages.enhanced);
      setIsProcessing(false);
    }, 2000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (!isDragging && e.type !== 'click') return;
    
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-pink-600" />
            <h2 className="text-4xl font-playfair font-bold text-gray-900">
              Çekimleriniz Nasıl Görünecek?
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Yapay zeka teknolojisi ile fotoğraflarınızın nasıl geliştirileceğini önceden görebilirsiniz. 
            Kendi fotoğrafınızı yükleyin veya demo'yu deneyin.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Sol taraf - Yükleme Alanı */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Fotoğrafınızı Yükleyin
                </h3>
                <p className="text-gray-600 mb-6">
                  Herhangi bir fotoğrafınızı yükleyin ve AI'nin nasıl geliştireceğini görün
                </p>
              </div>

              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-pink-300 rounded-xl p-8 text-center cursor-pointer hover:border-pink-400 transition-colors bg-pink-50 hover:bg-pink-100"
                >
                  <Upload className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Fotoğraf Yükleyin
                  </p>
                  <p className="text-gray-600">
                    JPG, PNG formatında yüksek kaliteli sonuçlar
                  </p>
                </div>
              </div>

              <div className="text-center">
                <span className="text-gray-500">veya</span>
              </div>

              <button
                onClick={loadDemoImages}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Demo'yu Deneyin</span>
                </div>
              </button>
            </div>

            {/* Sağ taraf - Karşılaştırma Alanı */}
            <div className="space-y-6">
              {!originalImage ? (
                <div className="aspect-[4/3] bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Karşılaştırma burada görünecek</p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div
                    ref={containerRef}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
                    onMouseDown={handleMouseDown}
                  >
                    {/* Orijinal Resim */}
                    <div className="absolute inset-0">
                      <img
                        src={originalImage}
                        alt="Orijinal"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        Orijinal
                      </div>
                    </div>

                    {/* AI İşlenmiş Resim */}
                    {enhancedImage && (
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                      >
                        <img
                          src={enhancedImage}
                          alt="AI İşlenmiş"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 right-4 bg-pink-600/90 text-white px-3 py-1 rounded-full text-sm">
                          AI İşlenmiş
                        </div>
                      </div>
                    )}

                    {/* İşleme Durumu */}
                    {isProcessing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white rounded-xl p-6 text-center">
                          <Loader2 className="w-8 h-8 text-pink-600 animate-spin mx-auto mb-3" />
                          <p className="text-gray-900 font-medium">AI İşliyor...</p>
                          <p className="text-sm text-gray-600">Bu birkaç saniye sürebilir</p>
                        </div>
                      </div>
                    )}

                    {/* Slider Çizgisi */}
                    {enhancedImage && !isProcessing && (
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                      >
                        {/* Slider Handle */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-pink-600 cursor-ew-resize flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-pink-600" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Açıklama */}
                  {enhancedImage && !isProcessing && (
                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-600">
                        Çubugu sürükleyerek farkı görün
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Özellikler */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h4 className="font-semibold text-gray-900 mb-1">Renk Düzeltme</h4>
                  <p className="text-gray-600">Doğal tonlar</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h4 className="font-semibold text-gray-900 mb-1">Işık Optimizasyonu</h4>
                  <p className="text-gray-600">Mükemmel aydınlatma</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h4 className="font-semibold text-gray-900 mb-1">Netlik Artırma</h4>
                  <p className="text-gray-600">HD kalite</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h4 className="font-semibold text-gray-900 mb-1">Sanatsal Dokunuş</h4>
                  <p className="text-gray-600">Profesyonel görünüm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-700 mb-6">
            Bu teknoloji tüm çekimlerimizde kullanılıyor
          </p>
          <a
            href="/iletisim"
            className="inline-flex items-center space-x-2 bg-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Hemen Rezervasyon Yapın</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}