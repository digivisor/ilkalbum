'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const categories = [
  { id: 'all', name: 'Tümü' },
  { id: 'dugun', name: 'Düğün' },
  { id: 'nisan', name: 'Nişan' },
  { id: 'bebek', name: 'Bebek' },
  { id: 'dis-cekim', name: 'Dış Çekim' },
];

// Fallback data - used when backend is not available
const fallbackPhotos = [
  { id: 1, src: '/düğün1.jpg', category: 'dugun', title: 'Düğün Töreni' },
  { id: 2, src: '/nisan4.jpg', category: 'nisan', title: 'Nişan Çekimi' },
  { id: 3, src: '/bebek1.jpg', category: 'bebek', title: 'Bebek Fotoğrafı' },
  { id: 4, src: '/düğün7.jpg', category: 'dis-cekim', title: 'Dış Çekim' },
  { id: 5, src: '/düğün2.jpg', category: 'dugun', title: 'Gelin Portresi' },
  { id: 6, src: '/düğün3.jpg', category: 'dugun', title: 'Çift Pozu' },
  { id: 7, src: '/nisan5.webp', category: 'nisan', title: 'Nişan Yüzükleri' },
  { id: 8, src: '/düğün4.jpg', category: 'dugun', title: 'Düğün Öncesi' },
  { id: 9, src: '/bebek2.jpg', category: 'bebek', title: 'Yenidoğan' },
  { id: 10, src: '/bebek3.jpg', category: 'bebek', title: 'Bebek Gülümsemesi' },
  { id: 11, src: 'discekim1.jpg', category: 'dis-cekim', title: 'Doğa Çekimi' },
  { id: 12, src: 'discekim2.jpg', category: 'dis-cekim', title: 'Sunset Portre' },
  { id: 13, src: 'nisan2.jpg', category: 'nisan', title: 'Romantik Çekim' },
  { id: 14, src: 'https://images.pexels.com/photos/1973270/pexels-photo-1973270.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', category: 'bebek', title: 'Aile Fotoğrafı' },
  { id: 15, src: '/düğün6.jpg', category: 'dis-cekim', title: 'Şehir Çekimi' },
];

// Fallback video data
const fallbackVideos = [
  { id: 101, src: 'https://www.w3schools.com/html/mov_bbb.mp4', poster: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', category: 'dugun', title: 'Düğün Highlight' },
  { id: 102, src: 'https://www.w3schools.com/html/movie.mp4', poster: 'https://images.pexels.com/photos/1973270/pexels-photo-1973270.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', category: 'nisan', title: 'Nişan Klibi' },
  { id: 103, src: 'https://www.w3schools.com/html/mov_bbb.mp4', poster: 'https://images.pexels.com/photos/1257110/pexels-photo-1257110.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', category: 'bebek', title: 'Bebek Anları' },
  { id: 104, src: 'https://www.w3schools.com/html/movie.mp4', poster: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', category: 'dis-cekim', title: 'Dış Çekim Drone' },
];

type GalleryPhoto = {
  id: string | number;
  src: string;
  category: string;
  title: string;
  description?: string;
};

type GalleryVideo = {
  id: string | number;
  src: string;
  poster: string;
  category: string;
  title: string;
  description?: string;
};

export default function GaleriPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contentType, setContentType] = useState<'photo' | 'video'>('photo');
  const [selectedImage, setSelectedImage] = useState<GalleryPhoto | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null);
  
  // Backend data states
  const [photos, setPhotos] = useState<GalleryPhoto[]>(fallbackPhotos);
  const [videos, setVideos] = useState<GalleryVideo[]>(fallbackVideos);
  const [loading, setLoading] = useState(true);

  // Fetch gallery data from backend
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/gallery');
        
        if (response.ok) {
          const galleryData = await response.json();
          
          // Separate photos and videos from backend data
          const backendPhotos = galleryData
            .filter((item: any) => item.type === 'photo')
            .map((item: any) => ({
              id: item._id,
              src: item.url,
              category: item.category,
              title: item.title,
              description: item.description
            }));
          
          const backendVideos = galleryData
            .filter((item: any) => item.type === 'video')
            .map((item: any) => ({
              id: item._id,
              src: item.url,
              poster: item.thumbnailUrl || 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
              category: item.category,
              title: item.title,
              description: item.description
            }));
          
          // Use backend data if available, otherwise keep fallback data
          if (backendPhotos.length > 0) {
            setPhotos(backendPhotos);
          }
          
          if (backendVideos.length > 0) {
            setVideos(backendVideos);
          }
        } else {
          console.log('Backend not available, using fallback data');
        }
      } catch (error) {
        console.log('Failed to fetch gallery data, using fallback data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory);

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

  return (
    <>
      <Header />
      <div className="pt-20">
  <div className="py-20 bg-[linear-gradient(135deg,#ffffff,#fff6fa,#ffe6ef,#ffd4e7)]">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6">
              Galeri
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Çektiğimiz özel anlardan seçkiler. Her fotoğraf bir hikaye anlatıyor.
            </p>
          </div>
        </div>

        <section className="py-20">
          <div className="container">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-pink-600 hover:bg-pink-700 text-white'
                      : 'border-pink-200 text-pink-600 hover:bg-pink-50'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Content Type Tabs */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center rounded-full border border-pink-200 bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => { setContentType('photo'); setSelectedVideo(null); }}
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${contentType === 'photo' ? 'bg-pink-600 text-white shadow' : 'text-pink-600 hover:text-pink-700'}`}
                >
                  Fotoğraf
                </button>
                <button
                  type="button"
                  onClick={() => { setContentType('video'); setSelectedImage(null); }}
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${contentType === 'video' ? 'bg-pink-600 text-white shadow' : 'text-pink-600 hover:text-pink-700'}`}
                >
                  Video
                </button>
              </div>
            </div>

            {/* Media Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Galeri yükleniyor...</p>
                </div>
              </div>
            ) : contentType === 'photo' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square"
                    onClick={() => setSelectedImage(photo)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-6 left-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-semibold text-sm">{photo.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square bg-black"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <video
                      src={video.src}
                      poster={video.poster}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      muted
                      preload="metadata"
                      onMouseEnter={(e) => { (e.currentTarget as HTMLVideoElement).play(); }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLVideoElement).pause(); (e.currentTarget as HTMLVideoElement).currentTime = 0; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                    <div className="absolute bottom-6 left-3 right-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-xs font-medium line-clamp-2">
                      {video.title}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />

      {/* Lightbox Modal (Photo / Video) */}
      <Dialog open={!!selectedImage || !!selectedVideo} onOpenChange={() => { setSelectedImage(null); setSelectedVideo(null); }}>
        <DialogContent className="max-w-xl p-0 bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-xl">
          <div className="relative">
            <button
              onClick={() => { setSelectedImage(null); setSelectedVideo(null); }}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-pink-50 border border-pink-100 text-pink-600 transition"
              aria-label="Kapat"
            >
              <X size={18} />
            </button>
            {selectedImage && (
              <div className="pt-4 px-4 pb-6 text-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[420px] object-contain rounded-lg mb-4"
                />
                <h3 className="text-sm font-medium text-gray-700">{selectedImage.title}</h3>
              </div>
            )}
            {selectedVideo && (
              <div className="pt-4 px-4 pb-6 text-center">
                <video
                  src={selectedVideo.src}
                  poster={selectedVideo.poster}
                  controls
                  className="w-full h-auto max-h-[420px] rounded-lg mb-4 bg-black"
                />
                <h3 className="text-sm font-medium text-gray-700">{selectedVideo.title}</h3>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}