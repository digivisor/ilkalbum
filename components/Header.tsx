'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Anasayfa', href: '/' },
    { name: 'Çekim Kategorileri', href: '/kategoriler' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'Galeri', href: '/galeri' },
    { name: 'Fiyatlandırma', href: '/fiyatlandirma' },
    { name: 'İletişim', href: '/iletisim' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-burgundy-100">
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* <span className="text-2xl lg:text-3xl font-playfair font-bold text-burgundy-600">
              ilkalbüm
            </span> */}
            <img src="/ilkalbum-logo.png" alt="ilkalbüm" className="h-8 lg:h-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
            <a 
              href="tel:+905457845667" 
              className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
            >
              <Phone size={16} />
              <span>+90 545 784 56 67</span>
            </a>
            <a 
              href="mailto:info@ilkalbum.com" 
              className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
            >
              <Mail size={16} />
              <span>info@ilkalbum.com</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-burgundy-100">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-burgundy-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 border-t border-burgundy-100 mt-2">
                <a 
                  href="tel:+905457845667" 
                  className="flex items-center space-x-1 text-sm text-gray-600 mb-1 hover:text-primary transition-colors duration-200"
                >
                  <Phone size={16} />
                  <span>+90 545 784 56 67</span>
                </a>
                <a 
                  href="mailto:info@ilkalbum.com" 
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  <Mail size={16} />
                  <span>info@ilkalbum.com</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
