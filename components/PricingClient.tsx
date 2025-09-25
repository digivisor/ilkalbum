"use client";

import { useState, useMemo } from 'react';
import { Check, Minus, AlertCircle, Plane, Image, Video, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'; // still imported if needed elsewhere
import { ReservationModal } from '@/components/ReservationModal';

import type { PricingPackage as ApiPricingPackage } from '@/types/api';

// Unified interface that combines both types
type UnifiedPricingPackage = {
  _id: string;
  name?: string;
  title: string;
  price: number | string;
  originalPrice?: number | string;
  categories?: string[];
  customCategoryName?: string;
  duration?: string;
  isPopular?: boolean;
  popular?: boolean;
  features: string[];
  notIncluded?: string[];
};

interface Props {
  packages: (UnifiedPricingPackage | ApiPricingPackage)[];
  campaign: {
    title: string;
    description: string;
    note?: string;
    discountPercent: number;
    expiresAt: string;
  } | null;
}

const categories = [
  { id: 'packages', label: 'Paketler' },
  { id: 'Düğün Fotoğrafçılığı', label: 'Düğün Fotoğrafçılığı' },
  { id: 'Nişan Çekimi', label: 'Nişan Çekimi' },
  { id: 'Bebek Fotoğrafları', label: 'Bebek Fotoğrafları' },
  { id: 'Dış Çekim', label: 'Dış Çekim' },
];

// Ortak kıyas alanı üretmek için tüm paket feature'larını normalize et
function buildComparisonRows(pkgs: (UnifiedPricingPackage | ApiPricingPackage)[]): string[] {
  const set = new Set<string>();
  pkgs.forEach(p => p.features.forEach((f: string) => set.add(f)));
  return Array.from(set);
}

// Helper functions to safely access package properties
function getPackageName(pkg: UnifiedPricingPackage | ApiPricingPackage): string {
  return (pkg as any).name || (pkg as any).title || 'Paket';
}

function getPackagePrice(pkg: UnifiedPricingPackage | ApiPricingPackage): string {
  const price = pkg.price;
  return typeof price === 'string' ? price : `${price}₺`;
}

function isPackagePopular(pkg: UnifiedPricingPackage | ApiPricingPackage): boolean {
  return !!(pkg as any).isPopular || !!(pkg as any).popular;
}

const extraServices = [
  { 
    title: 'Drone Çekimi', 
    desc: 'Havadan sinematik görüntüler', 
    price: '1.500₺',
    icon: Plane,
  },
  { 
    title: 'Ek Albüm', 
    desc: 'Aile için ekstra albüm', 
    price: '950₺',
    icon: Image,
  },
  { 
    title: 'Highlight Video', 
    desc: '1 dakikalık özet kurgu', 
    price: '2.000₺',
    icon: Video,
  },
  { 
    title: 'Hızlı Teslim (48 Saat)', 
    desc: 'Ön izleme paketiniz 2 gün içinde', 
    price: '1.250₺',
    icon: Clock,
  },
];

const faqs = [
  { q: 'Teslim süresi ne kadar?', a: 'Standart teslim süremiz 3-4 hafta; hızlı teslim opsiyonu ile ön izleme 48 saatte sunulur.' },
  { q: 'Ham fotoğrafları veriyor musunuz?', a: 'RAW dosyalar telif politikamız gereği paylaşılmaz. Düzenlenmiş yüksek çözünürlüklü JPEG teslim edilir.' },
  { q: 'Ödeme nasıl yapılıyor?', a: 'Rezervasyonda %30 kapora, çekim günü %40, teslimatta kalan bakiye alınır. Ödeme planı esnektir.' },
  { q: 'Şehir dışı çekim var mı?', a: 'Evet. Ulaşım ve konaklama masrafları eklenerek şehir dışı hizmet veriyoruz.' },
];

interface FaqItem { q: string; a: string }

function FaqGrid({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {faqs.map((f, idx) => {
        const open = openIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all bg-white hover:shadow-md ${open ? 'border-primary/30 shadow' : 'border-primary/10'}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : idx)}
              className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
            >
              <span className="font-medium text-gray-800 text-sm md:text-base leading-snug pr-2">
                {f.q}
              </span>
              <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors ${open ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>{open ? '−' : '+'}</span>
            </button>
            {open && (
              <div className="px-5 pb-5 -mt-2 text-[13px] md:text-sm text-gray-600 leading-relaxed">
                {f.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function PricingClient({ packages, campaign }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('packages');
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  // Global boş paket durumu (sunucu hata veya veri yok)
  if (!packages || packages.length === 0) {
    return (
      <div className="space-y-16">
        <div className="text-center py-24 bg-white rounded-3xl border border-primary/10 shadow-sm">
          <div className="max-w-md mx-auto">
            <AlertCircle className="w-14 h-14 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Henüz paket bulunamadı</h2>
            <p className="text-gray-600 mb-6">Paket verileri şu anda yüklenemedi veya eklenmemiş. Daha sonra tekrar deneyin ya da bize ulaşın.</p>
            <Button onClick={() => (window.location.href = '/iletisim')} className="bg-primary hover:bg-primary/90 text-white">
              İletişime Geç
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const filtered = useMemo(() => {
    if (selectedCategory === 'packages') {
      return packages.filter(p => p.categories && p.categories.includes('Paketler')); // Sadece Paketler kategorisindeki paketler
    }
    return packages.filter(p => p.categories && p.categories.includes(selectedCategory));
  }, [selectedCategory, packages]);

  const comparisonRows = useMemo(() => buildComparisonRows(filtered.slice(0, 6)), [filtered]);

  return (
  <div className="space-y-24">
      {/* Kategori Filtresi */}
  <div className="flex flex-wrap justify-center gap-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
              selectedCategory === cat.id
                ? 'bg-primary border-primary text-white shadow'
                : 'border-primary/20 text-primary hover:bg-primary/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Paket Grid */}
      {filtered.length === 0 && (
        <div className="flex items-center justify-center gap-3 text-sm text-gray-500 bg-white p-6 rounded-xl border">
          <AlertCircle className="w-5 h-5 text-primary" /> Seçilen kategori için paket bulunamadı.
        </div>
      )}

      {/* Paketler Tab'ı için özel görünüm */}
      {selectedCategory === 'packages' ? (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tüm Paketlerimiz</h2>
            <p className="text-gray-600">Çekim ihtiyaçlarınıza göre tasarlanmış paketlerimizi inceleyin</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(pkg => (
              <div key={pkg._id} className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${pkg.isPopular ? 'border-primary' : 'border-gray-100'}`}>
                {pkg.isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary/80 text-white text-center py-2 text-xs font-semibold tracking-wide">
                    ⭐ EN ÇOK TERCİH EDİLEN
                  </div>
                )}
                <div className={`p-6 ${pkg.isPopular ? 'pt-12' : ''}`}>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="flex flex-wrap justify-center gap-1 mb-2">
                      {pkg.categories && pkg.categories.map((category: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {category === 'Paketler' && pkg.customCategoryName 
                            ? pkg.customCategoryName 
                            : category}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">{pkg.duration} çekim</p>
                  </div>
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                      {pkg.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">{pkg.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">KDV dahil</p>
                  </div>
                  <div className="space-y-2 mb-6">
                    {pkg.features.map((f: string, i: number) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-700 leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className={`w-full ${pkg.isPopular ? 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                    onClick={() => {
                      setSelectedPackage((pkg as any).name || (pkg as any).title || 'Paket');
                      setIsReservationModalOpen(true);
                    }}
                  >
                    Rezervasyon Yap
                  </Button>
                  {(pkg as any).notIncluded && (pkg as any).notIncluded.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-400 mb-2">Pakete dahil değil:</p>
                      <ul className="space-y-1">
                        {(pkg as any).notIncluded.map((n: string, i: number) => (
                          <li key={i} className="text-xs text-gray-400">• {n}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Normal kategori görünümü */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map(pkg => (
          <div key={pkg._id} className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${pkg.isPopular ? 'ring-2 ring-primary' : ''}`}>
            {pkg.isPopular && (
              <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-2 text-xs font-semibold tracking-wide">
                EN ÇOK TERCİH EDİLEN
              </div>
            )}
            <div className={`p-6 ${pkg.isPopular ? 'pt-12' : ''}`}>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
                <p className="text-xs text-gray-500 mb-1">
                  {pkg.categories && pkg.categories.length > 0 
                    ? pkg.categories.map((category: string) =>
                        category === 'Paketler' && pkg.customCategoryName 
                          ? pkg.customCategoryName 
                          : category
                      ).join(' & ') 
                    : 'Kategorisiz'}
                </p>
                <p className="text-xs text-gray-400">{pkg.duration} çekim</p>
              </div>
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                  <span className="text-base text-gray-400 line-through">{pkg.originalPrice}</span>
                </div>
                <p className="text-[11px] text-gray-400">KDV dahil</p>
              </div>
              <div className="space-y-2 mb-6">
                {pkg.features.slice(0, 8).map((f: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-xs text-gray-700 leading-snug">{f}</span>
                  </div>
                ))}
              </div>
              <Button 
                className={`w-full ${pkg.isPopular ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                onClick={() => {
                  setSelectedPackage((pkg as any).name || (pkg as any).title || 'Paket');
                  setIsReservationModalOpen(true);
                }}
              >
                Rezervasyon Yap
              </Button>
              {(pkg as any).notIncluded && (pkg as any).notIncluded.length > 0 && (
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <p className="text-[11px] text-gray-400 mb-2">Pakete dahil değil:</p>
                  <ul className="space-y-1">
                    {(pkg as any).notIncluded.map((n: string, i: number) => (
                      <li key={i} className="text-[11px] text-gray-400">• {n}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Karşılaştırma Tablosu */}
      {filtered.length > 1 && selectedCategory !== 'packages' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-playfair font-bold text-gray-900 text-center">Paket Karşılaştırma</h2>
          <div className="overflow-x-auto rounded-2xl border border-primary/10 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary/5">
                  <th className="text-left p-4 font-semibold text-gray-700 w-56">Özellik</th>
                  {filtered.map(p => (
                    <th key={p._id} className="p-4 text-center font-semibold text-gray-700 whitespace-nowrap">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(row => (
                  <tr key={row} className="border-t border-gray-100 hover:bg-primary/5 transition">
                    <td className="p-3 text-gray-600 align-top w-56">{row}</td>
                    {filtered.map(p => (
                      <td key={p._id} className="p-3 text-center">
                        {p.features.includes(row) ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Ek Hizmetler */}
      <div className="space-y-10">
        <h2 className="text-3xl font-playfair font-bold text-gray-900 text-center">Ek Hizmetler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {extraServices.map(s => {
            const IconComponent = s.icon;
            return (
              <div
                key={s.title}
                className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100/50"
              >
                {/* Subtle Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                
                {/* Icon Circle */}
                <div className="relative z-10 mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={24} />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {s.desc}
                  </p>
                  
                  {/* Price Badge */}
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold text-sm shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    {s.price}
                  </div>
                </div>
                
                {/* Decorative Element */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gray-50 rounded-full opacity-30 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>      {/* SSS */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-playfair font-bold text-gray-900 text-center mb-8">Sık Sorulan Sorular</h2>
        <FaqGrid faqs={faqs} />
      </div>

      {/* Açıklamalar */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-playfair font-bold text-gray-900 text-center mb-8">Önemli Notlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-primary/10 bg-white hover:shadow-md transition-all p-5">
            <div className="text-sm md:text-base">
              <p className="font-medium text-gray-800 mb-2">Fiyat Politikası</p>
              <p className="text-gray-600 leading-relaxed">Fiyatlar Antalya içi standart çekimler için geçerlidir. Şehir dışı çekimlerde ulaşım & konaklama eklenir.</p>
            </div>
          </div>
          
          <div className="rounded-2xl border border-primary/10 bg-white hover:shadow-md transition-all p-5">
            <div className="text-sm md:text-base">
              <p className="font-medium text-gray-800 mb-2">Kampanya Şartları</p>
              <p className="text-gray-600 leading-relaxed">Belirtilen indirimler kampanya süresiyle sınırlıdır. Paket içerikleri ihtiyaca göre özelleştirilebilir.</p>
            </div>
          </div>
          
          <div className="rounded-2xl border border-primary/10 bg-white hover:shadow-md transition-all p-5">
            <div className="text-sm md:text-base">
              <p className="font-medium text-gray-800 mb-2">Ödeme Koşulları</p>
              <p className="text-gray-600 leading-relaxed">Rezervasyon kesinleşmesi için <strong className="text-gray-800">%30 kapora</strong> alınır. Kalan bakiye teslimata kadar tamamlanmalıdır.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alt CTA */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-10 text-center text-white">
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">Hala karar veremediniz mi?</h2>
          <p className="text-sm md:text-base opacity-90 max-w-2xl mx-auto mb-6">Size en uygun paketi birlikte belirleyelim. 10 dakikalık ücretsiz ön görüşme planlayın.</p>
          <Button 
            className="bg-white text-primary hover:bg-primary/5 font-semibold"
            onClick={() => window.location.href = '/iletisim'}
          >
            Ön Görüşme Talep Et
          </Button>
        </div>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.6),transparent_60%)]" />
      </div>

      {/* Rezervasyon Modal */}
      <ReservationModal 
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        selectedPackage={selectedPackage}
        pageType="pricing"
      />
    </div>
  );
}
