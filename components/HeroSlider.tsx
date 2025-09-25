'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    image: 'https://blog.carmen.com.tr/wp-content/uploads/2022/03/20200508101401.jpg',
    title: 'Düğün Fotoğrafçılığı',
    subtitle: 'Hayatınızın en özel gününü ölümsüzleştirin',
  },
  {
    id: 2,
    image: 'https://www.studioalyans.com.tr/wp-content/uploads/ALS_1984.jpg',
    title: 'Nişan Çekimi',
    subtitle: 'Aşkınızın başlangıcını sanatsal bir dokunuşla yakalayın',
  },
  {
    id: 3,
    image: '/nisan3.jpg',
    title: 'Dış Çekim',
    subtitle: 'Doğanın güzelliği ile büyülü kareler',
  },
  {
    id: 4,
    image: '/bebek1.jpg',
    title: 'Bebek Fotoğrafları',
    subtitle: 'Minik mutluluklarınızın ilk anları',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
            <div className="max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-light mb-8 opacity-90">
                {slide.subtitle}
              </p>
              <Link href="/galeri">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg rounded-full transition-all duration-300 hover:scale-105"
                >
                  Portföyümüzü İnceleyin
                </Button>
                              </Link>

              
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Desktop */}
      <Button
        variant="outline"
        size="icon"
        className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 w-10 h-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 w-10 h-10"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Navigation Controls - Mobile & Desktop */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center gap-4">
        {/* Mobile Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 w-8 h-8"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* Mobile Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 w-8 h-8"
          onClick={nextSlide}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
