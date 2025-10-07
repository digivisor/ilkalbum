'use client';

import { useState, useEffect } from 'react';
import { X, Play, Camera, Heart } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { getGalleryByCategory, getCategoryName, type GalleryItem } from '@/lib/galleryData';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryGalleryProps {
  category: string;
  showTitle?: boolean;
  showViewAllButton?: boolean;
  limit?: number;
}

export function CategoryGallery({ 
  category, 
  showTitle = true, 
  showViewAllButton = true, 
  limit = 8 
}: CategoryGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);
  const [imageError, setImageError] = useState<Set<string>>(new Set());
  
  const galleryItems = getGalleryByCategory(category, limit);
  const categoryName = getCategoryName(category);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedMedia) {
        setSelectedMedia(null);
      }
    };

    if (selectedMedia) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedMedia]);

  const handleImageError = (itemId: string | number) => {
    setImageError(prev => {
      const newSet = new Set(prev);
      newSet.add(String(itemId));
      return newSet;
    });
  };

  if (galleryItems.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container">
          {showTitle && (
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                {categoryName}
              </h2>
              <p className="text-lg text-gray-600">
                Çalışmalarımızdan örnekleri inceleyin ve hikayemizi keşfedin.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`relative overflow-hidden rounded-lg cursor-pointer group ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => setSelectedMedia(item)}
              >
                <div className={`relative ${index === 0 ? 'h-80' : 'h-40'}`}>
                  {!imageError.has(String(item.id)) ? (
                    <Image
                      src={item.src}
                      alt={`${item.title} | ${categoryName} fotoğrafı | Antalya profesyonel fotoğrafçılık düğün nişan bebek dış çekim`}
                      fill
                      sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={() => handleImageError(item.id)}
                      priority={index < 4}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-primary/60" />
                    </div>
                  )}
                  
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white transition-colors shadow-lg">
                        <Play className="w-6 h-6 text-primary ml-1" />
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white text-sm font-medium truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {showViewAllButton && (
            <div className="text-center">
              <Link
                href="/galeri"
                className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 inline-flex items-center"
              >
                <Heart className="w-5 h-5 mr-2" />
                Tüm Galeriyi Görüntüle
              </Link>
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-none shadow-none overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-2 right-2 z-50 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
              onClick={() => setSelectedMedia(null)}
            >
              <X size={20} />
            </button>
            
            {selectedMedia && (
              <div className="relative max-w-full max-h-full">
                {selectedMedia.type === 'video' ? (
                  <video 
                    controls 
                    className="max-w-full max-h-[90vh] w-auto h-auto rounded-lg shadow-2xl"
                    poster={selectedMedia.poster}
                  >
                    <source src={selectedMedia.src} type="video/mp4" />
                    Tarayıcınız video elementini desteklemiyor.
                  </video>
                ) : (
                  <div className="relative">
                    <Image
                      src={selectedMedia.src}
                      alt={`${selectedMedia.title} | ${categoryName} fotoğrafı | Antalya profesyonel fotoğrafçılık düğün nişan bebek dış çekim`}
                      width={1200}
                      height={800}
                      className="max-w-full max-h-[90vh] w-auto h-auto rounded-lg shadow-2xl object-contain"
                    />
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                  <h3 className="text-white text-lg font-semibold text-center">
                    {selectedMedia.title}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}