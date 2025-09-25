export interface GalleryItem {
  id: string | number;
  src: string;
  category: string;
  title: string;
  type: 'photo' | 'video';
  poster?: string;
}

export const galleryPhotos: GalleryItem[] = [
  { id: 1, src: '/düğün1.jpg', category: 'dugun', title: 'Düğün Töreni', type: 'photo' },
  { id: 2, src: '/düğün2.jpg', category: 'dugun', title: 'Gelin Portresi', type: 'photo' },
  { id: 3, src: '/düğün3.jpg', category: 'dugun', title: 'Çift Pozu', type: 'photo' },
  { id: 4, src: '/düğün4.jpg', category: 'dugun', title: 'Düğün Öncesi', type: 'photo' },
  { id: 5, src: '/düğün5.jpg', category: 'dugun', title: 'Düğün Dansı', type: 'photo' },
  { id: 6, src: '/düğün6.jpg', category: 'dugun', title: 'Çift Çekimi', type: 'photo' },
  { id: 7, src: '/düğün7.jpg', category: 'dugun', title: 'Romantic Moment', type: 'photo' },
  { id: 8, src: '/düğün9.jpg', category: 'dugun', title: 'Düğün Hikayesi', type: 'photo' },
  
  { id: 20, src: '/nisan1.jpg', category: 'nisan', title: 'Nişan Çekimi', type: 'photo' },
  { id: 21, src: '/nisan2.jpg', category: 'nisan', title: 'Romantik Çekim', type: 'photo' },
  { id: 22, src: '/nisan3.jpg', category: 'nisan', title: 'Çift Portresi', type: 'photo' },
  { id: 23, src: '/nisan4.jpg', category: 'nisan', title: 'Nişan Yüzükleri', type: 'photo' },
  
  { id: 30, src: '/bebek1.jpg', category: 'bebek', title: 'Yenidoğan Çekimi', type: 'photo' },
  { id: 31, src: '/bebek2.jpg', category: 'bebek', title: 'Bebek Portresi', type: 'photo' },
  { id: 32, src: '/bebek3.jpg', category: 'bebek', title: 'Bebek Gülümsemesi', type: 'photo' },
  { id: 33, src: '/bebek4.jpg', category: 'bebek', title: 'Aile Fotoğrafı', type: 'photo' },
  { id: 34, src: '/bebek5.jpg', category: 'bebek', title: 'Bebek Uykusu', type: 'photo' },
  { id: 35, src: '/bebeb2.jpg', category: 'bebek', title: 'Newborn Session', type: 'photo' },
  
  { id: 40, src: '/düğün1.jpg', category: 'dis-cekim', title: 'Sahil Çekimi', type: 'photo' },
  { id: 41, src: '/düğün2.jpg', category: 'dis-cekim', title: 'Doğa Çekimi', type: 'photo' },
  { id: 42, src: '/düğün3.jpg', category: 'dis-cekim', title: 'Sunset Portre', type: 'photo' },
  { id: 43, src: '/düğün4.jpg', category: 'dis-cekim', title: 'Şehir Çekimi', type: 'photo' },
];

export const galleryVideos: GalleryItem[] = [
  { 
    id: 101, 
    src: 'https://www.w3schools.com/html/mov_bbb.mp4', 
    poster: '/düğün1.jpg', 
    category: 'dugun', 
    title: 'Düğün Highlight Videosu',
    type: 'video'
  },
  { 
    id: 102, 
    src: 'https://www.w3schools.com/html/movie.mp4', 
    poster: '/nisan1.jpg', 
    category: 'nisan', 
    title: 'Nişan Klip Videosu',
    type: 'video'
  },
  { 
    id: 103, 
    src: 'https://www.w3schools.com/html/mov_bbb.mp4', 
    poster: '/bebek1.jpg', 
    category: 'bebek', 
    title: 'Bebek Büyüme Timelapse',
    type: 'video'
  },
  { 
    id: 104, 
    src: 'https://www.w3schools.com/html/movie.mp4', 
    poster: '/düğün2.jpg', 
    category: 'dis-cekim', 
    title: 'Dış Çekim Drone Videosu',
    type: 'video'
  },
];

export function getGalleryByCategory(category: string, limit?: number): GalleryItem[] {
  const allItems = [...galleryPhotos, ...galleryVideos];
  const filtered = category === 'all' 
    ? allItems 
    : allItems.filter(item => item.category === category);
  
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getCategoryName(categoryId: string): string {
  const categoryNames: Record<string, string> = {
    'dugun': 'Düğün Fotoğrafları',
    'nisan': 'Nişan Çekimleri', 
    'bebek': 'Bebek Fotoğrafları',
    'dis-cekim': 'Dış Çekim Fotoğrafları'
  };
  
  return categoryNames[categoryId] || 'Galeri';
}