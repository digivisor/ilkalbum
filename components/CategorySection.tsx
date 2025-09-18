'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ReservationModal } from '@/components/ReservationModal';

interface Category {
  id: string;
  title: string;
  description: string;
  features: string[];
  images: string[];
}

interface CategorySectionProps {
  category: Category;
  isReversed?: boolean;
}

export function CategorySection({ category, isReversed = false }: CategorySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  return (
    <>
      <section id={category.id} className="py-20">
        <div className="container">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
            <div className={`${isReversed ? 'lg:order-2' : ''}`}>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
                {category.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {category.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {category.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-pink-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                size="lg" 
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full"
                onClick={() => setIsReservationModalOpen(true)}
              >
                Rezervasyon Yap
              </Button>
            </div>
            
            <div className={`${isReversed ? 'lg:order-1' : ''}`}>
              <div className="grid grid-cols-2 gap-4">
                {category.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-lg cursor-pointer group ${
                      index === 0 ? 'col-span-2 h-64' : 'h-32'
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${category.title} ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </Button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Büyük görüntü"
                className="w-full h-auto rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        showCategory={true}
        pageType="categories"
      />
    </>
  );
}