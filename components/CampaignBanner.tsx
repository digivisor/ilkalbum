'use client';

import React, { useState } from "react";
import { Button } from '@/components/ui/button';
import { Sparkles, Gift } from 'lucide-react';
import { ReservationModal } from '@/components/ReservationModal';

interface CampaignBannerProps {
  campaign?: {
    title: string;
    description: string;
    note?: string;
    discountPercent: number;
    expiresAt: string;
    packages?: Array<{
      name: string;
      oldPrice: string;
      newPrice: string;
      description: string;
    }>;
  } | null;
}

export function CampaignBanner({ campaign }: CampaignBannerProps) {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  // Eğer kampanya yoksa veya aktif değilse, bileşeni render etme
  if (!campaign) {
    return null;
  }

  return (
    <>
    <section className="py-20">
      <div className="container">
        <div className="bg-gradient-to-r from-primary/80 to-primary rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden relative">

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 mr-3" />
              <Gift className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4">
              {campaign.title}
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              {campaign.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {campaign.packages && campaign.packages.length > 0 ? (
                campaign.packages.map((pkg, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="font-semibold mb-2">{pkg.name}</h3>
                    <p className="text-sm opacity-90">{pkg.description}</p>
                    <p className="text-lg font-bold mt-2">{pkg.oldPrice} → {pkg.newPrice}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="font-semibold mb-2">Düğün Paketi</h3>
                    <p className="text-sm opacity-90">8 saat çekim + dijital albüm</p>
                    <p className="text-lg font-bold mt-2">%{campaign.discountPercent} İndirim</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="font-semibold mb-2">Nişan + Düğün</h3>
                    <p className="text-sm opacity-90">İkili paket özel fiyatı</p>
                    <p className="text-lg font-bold mt-2">%{campaign.discountPercent} İndirim</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="font-semibold mb-2">Premium Paket</h3>
                    <p className="text-sm opacity-90">Video çekimi dahil</p>
                    <p className="text-lg font-bold mt-2">%{campaign.discountPercent} İndirim</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                onClick={() => window.location.href = '/iletisim'}
              >
                İletişime Geç
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-full font-semibold transition-all duration-300"
                onClick={() => setIsReservationModalOpen(true)}
              >
                Hemen Rezervasyon
              </Button>
            </div>
            {campaign.note && (
              <p className="text-sm mt-6 opacity-75">
                {campaign.note}
              </p>
            )}
            {!campaign.note && (
              <p className="text-sm mt-6 opacity-75">
                * Kampanya {new Date(campaign.expiresAt).toLocaleDateString('tr-TR')} tarihine kadar geçerlidir.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>

    <ReservationModal
      isOpen={isReservationModalOpen}
      onClose={() => setIsReservationModalOpen(false)}
      pageType="campaign"
    />
    </>
  );
}
