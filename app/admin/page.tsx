'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Image as ImageIcon, 
  Video, 
  Package, 
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut
} from 'lucide-react';
import { AdminService, GalleryService, ServerPricingService, ContactService, PricingService } from '@/services';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      await AdminService.verifyToken({ token });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('adminToken');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const result = await AdminService.login({
        username: loginData.username,
        password: loginData.password
      });
      
      if (result.success && result.data?.token) {
        localStorage.setItem('adminToken', result.data.token);
        setIsAuthenticated(true);
      } else {
        setLoginError(result.error || 'Giriş başarısız');
      }
    } catch (error: any) {
      setLoginError(error.message || 'Bağlantı hatası. Lütfen tekrar deneyin.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-burgundy-600">
              İlkalbüm Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kullanıcı Adı
                </label>
                <Input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre
                </label>
                <Input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              {loginError && (
                <div className="text-red-600 text-sm">{loginError}</div>
              )}
              <Button type="submit" className="w-full bg-burgundy-600 hover:bg-burgundy-700">
                Giriş Yap
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-burgundy-600">İlkalbüm Admin</h1>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut size={16} />
              <span>Çıkış</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="gallery">Galeri</TabsTrigger>
            <TabsTrigger value="pricing">Fiyatlandırma</TabsTrigger>
            <TabsTrigger value="messages">Mesajlar</TabsTrigger>
            <TabsTrigger value="campaigns">Kampanyalar</TabsTrigger>
            <TabsTrigger value="settings">Ayarlar</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardContent />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManagement />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingManagement />
          </TabsContent>

          <TabsContent value="campaigns">
            <CampaignManagement />
          </TabsContent>

          <TabsContent value="messages">
  <MessagesManagement />
</TabsContent>
{/* <TabsContent value="campaigns">
  <CampaignManagement />
</TabsContent> */}


          <TabsContent value="settings">
            <SettingsContent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function DashboardContent() {
  const [stats, setStats] = useState({
    totalPhotos: 0,
    totalVideos: 0,
    totalPackages: 0,
    unreadMessages: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch gallery stats
      const galleryResponse = await GalleryService.getGalleryItems();
      const galleryData = galleryResponse.data || [];
      
      const photos = galleryData.filter((item: any) => item.type === 'photo').length;
      const videos = galleryData.filter((item: any) => item.type === 'video').length;

      // Fetch pricing stats
      const pricingData = await ServerPricingService.getPricingPackagesSSR();

      // Fetch messages stats - need to implement in ContactService if not exists
      try {
        // This would need to be implemented in ContactService
        const unreadCount = 0; // Placeholder for now
        
        setStats({
          totalPhotos: photos,
          totalVideos: videos,
          totalPackages: pricingData.length,
          unreadMessages: unreadCount
        });
      } catch (messageError) {
        console.error('Messages fetch error:', messageError);
        setStats({
          totalPhotos: photos,
          totalVideos: videos,
          totalPackages: pricingData.length,
          unreadMessages: 0
        });
      }
    } catch (error) {
      console.error('Stats fetch error:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Fotoğraf</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalPhotos}</p>
            </div>
            <ImageIcon className="w-8 h-8 text-burgundy-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Video</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalVideos}</p>
            </div>
            <Video className="w-8 h-8 text-burgundy-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Paket</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalPackages}</p>
            </div>
            <Package className="w-8 h-8 text-burgundy-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Okunmamış Mesaj</p>
              <p className="text-3xl font-bold text-gray-900">{stats.unreadMessages}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-burgundy-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function GalleryManagement() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'photo',
    category: 'dugun',
    url: '',
    thumbnailUrl: ''
  });

  // Cloudinary configuration - Bu değerleri environment variable'lardan almalısın
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Function to upload file to Cloudinary
  const uploadToCloudinary = async (file: File, resourceType: 'image' | 'video' = 'image') => {
    const formData = new FormData();
    formData.append('file', file);
    if (CLOUDINARY_UPLOAD_PRESET) {
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    }
    formData.append('resource_type', resourceType);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return {
        url: data.secure_url,
        publicId: data.public_id,
        thumbnailUrl: resourceType === 'video' ? data.secure_url.replace('/upload/', '/upload/so_0/') : null
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const resourceType = formData.type === 'video' ? 'video' : 'image';
      const uploadResult = await uploadToCloudinary(file, resourceType);
      
      setFormData({
        ...formData,
        url: uploadResult.url,
        thumbnailUrl: uploadResult.thumbnailUrl || ''
      });
      
      // Set default title if empty
      if (!formData.title) {
        setFormData(prev => ({
          ...prev,
          title: file.name.split('.')[0]
        }));
      }
    } catch (error) {
      alert('Dosya yüklenirken hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setUploading(false);
    }
  };

  // Function to convert Google Drive share links to direct view links
// Google Drive URL → Doğrudan erişim URL'si
const convertGoogleDriveUrl = (url: string) => {
  if (!url) return url;

  // Eğer url zaten uc?export=view formatındaysa aynen döndür
  if (url.includes("uc?export=view&id=")) {
    return url;
  }

  // /file/d/ID/ formattaki linkleri yakala
  const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
  }

  // uc?id=ID formattaki linkleri normalize et
  const ucIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (ucIdMatch && ucIdMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${ucIdMatch[1]}`;
  }

  // Eşleşme yoksa orijinalini döndür
  return url;
};


  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setError('');
      const response = await GalleryService.getGalleryItems();
      
      if (response.success && response.data) {
        setGalleryItems(response.data);
        console.log('Gallery items loaded:', response.data.length);
      } else {
        setError('Galeri öğeleri yüklenemedi: ' + (response.error || 'Bilinmeyen hata'));
        console.error('Gallery fetch failed:', response.error);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Bağlantı hatası';
      setError('Galeri yüklenirken hata: ' + errorMessage);
      console.error('Gallery fetch error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setSuccess('');
      
      // Format URLs before sending to database
      const formattedData = {
        ...formData,
        url: convertGoogleDriveUrl(formData.url),
        thumbnailUrl: formData.thumbnailUrl ? convertGoogleDriveUrl(formData.thumbnailUrl) : ''
      };
      
      if (editingItem) {
        const response = await GalleryService.updateGalleryItem(editingItem._id, formattedData as any);
        if (response.success) {
          setSuccess('Galeri öğesi başarıyla güncellendi!');
        } else {
          setError('Güncelleme hatası: ' + (response.error || 'Bilinmeyen hata'));
          return;
        }
      } else {
        const response = await GalleryService.createGalleryItem(formattedData as any);
        if (response.success) {
          setSuccess('Galeri öğesi başarıyla eklendi!');
        } else {
          setError('Ekleme hatası: ' + (response.error || 'Bilinmeyen hata'));
          return;
        }
      }

      fetchGalleryItems();
      setShowAddForm(false);
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        type: 'photo',
        category: 'dugun',
        url: '',
        thumbnailUrl: ''
      });
    } catch (error: any) {
      const errorMessage = error.message || 'Bağlantı hatası';
      setError('İşlem hatası: ' + errorMessage);
      console.error('Submit error:', error);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      type: item.type,
      category: item.category,
      url: item.url,
      thumbnailUrl: item.thumbnailUrl || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu öğeyi silmek istediğinizden emin misiniz?')) return;

    try {
      setError('');
      const response = await GalleryService.deleteGalleryItem(id);
      
      if (response.success) {
        setSuccess('Galeri öğesi başarıyla silindi!');
        fetchGalleryItems();
      } else {
        setError('Silme hatası: ' + (response.error || 'Bilinmeyen hata'));
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Bağlantı hatası';
      setError('Silme hatası: ' + errorMessage);
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Galeri Yönetimi</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-burgundy-600 hover:bg-burgundy-700"
        >
          <Plus size={16} className="mr-2" />
          Yeni Ekle
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Hata: </strong>
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => setError('')}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <span className="sr-only">Kapat</span>
            ×
          </button>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Başarılı: </strong>
          <span className="block sm:inline">{success}</span>
          <button
            onClick={() => setSuccess('')}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <span className="sr-only">Kapat</span>
            ×
          </button>
        </div>
      )}

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingItem ? 'Galeri Öğesini Düzenle' : 'Yeni Galeri Öğesi Ekle'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tür
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="photo">Fotoğraf</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="dugun">Düğün</option>
                    <option value="nisan">Nişan</option>
                    <option value="bebek">Bebek</option>
                    <option value="dis-cekim">Dış Çekim</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <Input
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.type === 'video' ? 'Video Dosyası Yükle' : 'Fotoğraf Dosyası Yükle'}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept={formData.type === 'video' ? 'video/*' : 'image/*'}
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="file-upload"
                      className={`cursor-pointer flex flex-col items-center space-y-2 ${
                        uploading ? 'opacity-50' : ''
                      }`}
                    >
                      {uploading ? (
                        <>
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-burgundy-600"></div>
                          <span className="text-sm text-gray-600">Yükleniyor...</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {formData.type === 'video' ? 'Video dosyası seçmek için tıklayın' : 'Fotoğraf dosyası seçmek için tıklayın'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formData.type === 'video' ? 'MP4, MOV, AVI desteklenir' : 'JPG, PNG, GIF desteklenir'}
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                  {formData.url && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm text-green-700">✓ Dosya başarıyla yüklendi</p>
                      <p className="text-xs text-green-600 break-all">{formData.url}</p>
                    </div>
                  )}
                </div>

                <div className="text-center text-gray-500">veya</div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.type === 'video' ? 'Video URL (Manuel)' : 'Fotoğraf URL (Manuel)'}
                  </label>
                  <Input
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://example.com/image.jpg veya Google Drive link"
                  />
                </div>
              </div>

              {formData.type === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail URL (Opsiyonel)
                  </label>
                  <Input
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    placeholder="https://example.com/thumbnail.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Video dosyası yüklerseniz thumbnail otomatik oluşturulur.
                  </p>
                </div>
              )}

              <div className="flex space-x-4">
                <Button type="submit" className="bg-burgundy-600 hover:bg-burgundy-700">
                  {editingItem ? 'Güncelle' : 'Ekle'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingItem(null);
                    setFormData({
                      title: '',
                      description: '',
                      type: 'photo',
                      category: 'dugun',
                      url: '',
                      thumbnailUrl: ''
                    });
                  }}
                >
                  İptal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item: any) => (
          <Card key={item._id}>
            <CardContent className="p-4">
              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                {item.type === 'video' ? (
                  <div className="relative w-full h-full bg-gray-200 flex items-center justify-center">
                    <Video className="w-12 h-12 text-gray-400" />
                    {item.thumbnailUrl && (
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <div className="flex items-center space-x-2 mb-3">
                <Badge variant={item.type === 'video' ? 'default' : 'secondary'}>
                  {item.type === 'video' ? 'Video' : 'Fotoğraf'}
                </Badge>
                <Badge variant="outline">
                  {item.category === 'dugun' ? 'Düğün' : 
                   item.category === 'nisan' ? 'Nişan' :
                   item.category === 'bebek' ? 'Bebek' : 'Dış Çekim'}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(item)}
                >
                  <Edit size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PricingManagement() {
  const [packages, setPackages] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    categories: [] as string[],
    customCategoryName: '', // Paketler kategorisi için özel isim
    duration: '',
    isPopular: false,
    features: [''],
    notIncluded: ['']
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await PricingService.getPricingPackages();
      setPackages(response.data || []);
    } catch (error) {
      console.error('Packages fetch error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kategori validasyonu
    if (!formData.categories || formData.categories.length === 0) {
      alert('En az bir kategori seçmelisiniz!');
      return;
    }

    // Paketler kategorisi için özel validasyon
    if (formData.categories.includes('Paketler') && !formData.customCategoryName.trim()) {
      alert('Paketler kategorisi için kategori adı girmelisiniz!');
      return;
    }
    
    try {
      const submitData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
        notIncluded: formData.notIncluded.filter(f => f.trim() !== '')
      };
      
      console.log('Gönderilen data:', submitData); // Debug için
      
      if (editingPackage) {
        await PricingService.updatePricingPackage(editingPackage._id, submitData as any);
      } else {
        await PricingService.createPricingPackage(submitData as any);
      }

      fetchPackages();
      setShowAddForm(false);
      setEditingPackage(null);
      setFormData({
        name: '',
        price: '',
        originalPrice: '',
        categories: [],
        customCategoryName: '',
        duration: '',
        isPopular: false,
        features: [''],
        notIncluded: ['']
      });
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleEdit = (pkg: any) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      price: pkg.price,
      originalPrice: pkg.originalPrice || '',
      categories: pkg.categories || [],
      customCategoryName: pkg.customCategoryName || '',
      duration: pkg.duration,
      isPopular: pkg.isPopular,
      features: pkg.features.length > 0 ? pkg.features : [''],
      notIncluded: pkg.notIncluded && pkg.notIncluded.length > 0 ? pkg.notIncluded : ['']
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu paketi silmek istediğinizden emin misiniz?')) return;

    try {
      await PricingService.deletePricingPackage(id);
      fetchPackages();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addNotIncluded = () => {
    setFormData({ ...formData, notIncluded: [...formData.notIncluded, ''] });
  };

  const removeNotIncluded = (index: number) => {
    const newNotIncluded = formData.notIncluded.filter((_, i) => i !== index);
    setFormData({ ...formData, notIncluded: newNotIncluded });
  };

  const updateNotIncluded = (index: number, value: string) => {
    const newNotIncluded = [...formData.notIncluded];
    newNotIncluded[index] = value;
    setFormData({ ...formData, notIncluded: newNotIncluded });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Fiyatlandırma Yönetimi</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-burgundy-600 hover:bg-burgundy-700"
        >
          <Plus size={16} className="mr-2" />
          Yeni Paket Ekle
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingPackage ? 'Paketi Düzenle' : 'Yeni Paket Ekle'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paket Adı
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategoriler *
                  </label>
                  <div className="space-y-2 p-3 border border-gray-300 rounded-md">
                    {['Düğün Fotoğrafçılığı', 'Nişan Çekimi', 'Bebek Fotoğrafları', 'Dış Çekim'].map((category) => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(category)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, categories: [...formData.categories, category] });
                            } else {
                              setFormData({ ...formData, categories: formData.categories.filter(c => c !== category) });
                            }
                          }}
                          className="rounded border-gray-300 text-burgundy-600 focus:ring-burgundy-500"
                        />
                        <span className="text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                    
                    {/* Paketler kategorisi özel alanı */}
                    <div className="border-t pt-3 mt-3">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.categories.includes('Paketler')}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, categories: [...formData.categories, 'Paketler'] });
                            } else {
                              setFormData({ 
                                ...formData, 
                                categories: formData.categories.filter(c => c !== 'Paketler'),
                                customCategoryName: '' 
                              });
                            }
                          }}
                          className="rounded border-gray-300 text-burgundy-600 focus:ring-burgundy-500"
                        />
                        <span className="text-sm text-gray-700 font-medium">Paketler (Özel Kategori)</span>
                      </label>
                      
                      {formData.categories.includes('Paketler') && (
                        <div className="mt-2 ml-6">
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Kategori Adı *
                          </label>
                          <input
                            type="text"
                            value={formData.customCategoryName}
                            onChange={(e) => setFormData({ ...formData, customCategoryName: e.target.value })}
                            placeholder="Örn: Premium Paketler, Özel Çekimler"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-burgundy-500"
                            required={formData.categories.includes('Paketler')}
                          />
                        </div>
                      )}
                    </div>
                    
                    {formData.categories.length === 0 && (
                      <p className="text-xs text-red-500 mt-1">En az bir kategori seçmelisiniz</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fiyat
                  </label>
                  <Input
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="₺2.500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Eski Fiyat (Opsiyonel)
                  </label>
                  <Input
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="₺3.000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Süre
                  </label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="8 saat"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPopular"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="isPopular" className="text-sm font-medium text-gray-700">
                  Popüler Paket
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Özellikler
                </label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Özellik açıklaması"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFeature(index)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                >
                  <Plus size={14} className="mr-2" />
                  Özellik Ekle
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dahil Olmayanlar
                </label>
                {formData.notIncluded.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input
                      value={item}
                      onChange={(e) => updateNotIncluded(index, e.target.value)}
                      placeholder="Dahil olmayan özellik"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeNotIncluded(index)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addNotIncluded}
                >
                  <Plus size={14} className="mr-2" />
                  Dahil Olmayan Ekle
                </Button>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" className="bg-burgundy-600 hover:bg-burgundy-700">
                  {editingPackage ? 'Güncelle' : 'Ekle'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingPackage(null);
                    setFormData({
                      name: '',
                      price: '',
                      originalPrice: '',
                      categories: [],
                      customCategoryName: '',
                      duration: '',
                      isPopular: false,
                      features: [''],
                      notIncluded: ['']
                    });
                  }}
                >
                  İptal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg: any) => (
          <Card key={pkg._id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
                {pkg.isPopular && (
                  <Badge className="bg-burgundy-600">Popüler</Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {pkg.categories && pkg.categories.length > 0 
                  ? pkg.categories.map((category: string) => 
                      category === 'Paketler' && pkg.customCategoryName 
                        ? pkg.customCategoryName 
                        : category
                    ).join(', ') 
                  : 'Kategorisiz'}
              </p>
              <p className="text-sm text-gray-600 mb-4">{pkg.duration}</p>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold text-burgundy-600">{pkg.price}</span>
                {pkg.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">{pkg.originalPrice}</span>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(pkg)}
                >
                  <Edit size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(pkg._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MessagesManagement() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Messages fetch error:', error);
    }
  };

  const updateMessageStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Status update error:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        fetchMessages();
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Mesaj Yönetimi</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Mesajlar</h3>
          {messages.map((message: any) => (
            <Card 
              key={message._id} 
              className={`cursor-pointer transition-colors ${
                selectedMessage?._id === message._id ? 'ring-2 ring-burgundy-500' : ''
              } ${!message.isRead ? 'bg-burgundy-50' : ''}`}
              onClick={() => setSelectedMessage(message)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{message.name}</h4>
                  <div className="flex items-center space-x-2">
                    {message.subject && message.subject.includes('Rezervasyon') && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        Rezervasyon
                      </Badge>
                    )}
                    {!message.isRead && (
                      <Badge variant="default" className="bg-burgundy-600">Yeni</Badge>
                    )}
                    <Badge 
                      variant="outline"
                      className={
                        message.status === 'new' ? 'border-blue-500 text-blue-600' :
                        message.status === 'in-progress' ? 'border-yellow-500 text-yellow-600' :
                        'border-green-500 text-green-600'
                      }
                    >
                      {message.status === 'new' ? 'Yeni' :
                       message.status === 'in-progress' ? 'İşlemde' : 'Tamamlandı'}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{message.email}</p>
                <p className="text-sm text-gray-600 mb-2">{message.subject}</p>
                <p className="text-xs text-gray-500">
                  {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CardTitle>Mesaj Detayı</CardTitle>
                    {selectedMessage.subject && selectedMessage.subject.includes('Rezervasyon') && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        Rezervasyon Talebi
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMessage(selectedMessage._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
                  <p className="text-gray-900">{selectedMessage.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">E-posta</label>
                  <p className="text-gray-900">{selectedMessage.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Telefon</label>
                  <p className="text-gray-900">{selectedMessage.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Konu</label>
                  <p className="text-gray-900">{selectedMessage.subject}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mesaj</label>
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tarih</label>
                  <p className="text-gray-900">
                    {new Date(selectedMessage.createdAt).toLocaleString('tr-TR')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={selectedMessage.status === 'new' ? 'default' : 'outline'}
                      onClick={() => updateMessageStatus(selectedMessage._id, 'new')}
                    >
                      Yeni
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedMessage.status === 'in-progress' ? 'default' : 'outline'}
                      onClick={() => updateMessageStatus(selectedMessage._id, 'in-progress')}
                    >
                      İşlemde
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedMessage.status === 'completed' ? 'default' : 'outline'}
                      onClick={() => updateMessageStatus(selectedMessage._id, 'completed')}
                    >
                      Tamamlandı
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                Mesaj detayını görmek için bir mesaj seçin
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function CampaignManagement() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    note: '',
    discountPercent: '',
    expiresAt: '',
    isActive: true,
    type: 'homepage', // 'homepage' or 'pricing'
    packages: [
      { name: '', oldPrice: '', newPrice: '', description: '' }
    ]
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await PricingService.getActiveCampaigns();
      setCampaigns(response.data || []);
    } catch (error) {
      console.error('Campaigns fetch error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const submitData = {
        ...formData,
        discountPercent: parseInt(formData.discountPercent),
        packages: formData.packages.filter(p => p.name.trim() !== '')
      };
      
      if (editingCampaign) {
        await PricingService.updateCampaign(editingCampaign._id, submitData as any);
      } else {
        await PricingService.createCampaign(submitData as any);
      }

      fetchCampaigns();
      setShowAddForm(false);
      setEditingCampaign(null);
      setFormData({
        title: '',
        description: '',
        note: '',
        discountPercent: '',
        expiresAt: '',
        isActive: true,
        type: 'homepage',
        packages: [
          { name: '', oldPrice: '', newPrice: '', description: '' }
        ]
      });
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleEdit = (campaign: any) => {
    setEditingCampaign(campaign);
    setFormData({
      title: campaign.title,
      description: campaign.description,
      note: campaign.note || '',
      discountPercent: campaign.discountPercent.toString(),
      expiresAt: campaign.expiresAt ? campaign.expiresAt.split('T')[0] : '',
      isActive: campaign.isActive,
      type: campaign.type || 'homepage',
      packages: campaign.packages && campaign.packages.length > 0 ? campaign.packages : [
        { name: '', oldPrice: '', newPrice: '', description: '' }
      ]
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu kampanyayı silmek istediğinizden emin misiniz?')) return;

    try {
      await PricingService.deleteCampaign(id);
      fetchCampaigns();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', oldPrice: '', newPrice: '', description: '' }]
    });
  };

  const removePackage = (index: number) => {
    const newPackages = formData.packages.filter((_, i) => i !== index);
    setFormData({ ...formData, packages: newPackages });
  };

  const updatePackage = (index: number, field: string, value: string) => {
    const newPackages = [...formData.packages];
    newPackages[index] = { ...newPackages[index], [field]: value };
    setFormData({ ...formData, packages: newPackages });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Kampanya Yönetimi</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-burgundy-600 hover:bg-burgundy-700"
        >
          <Plus size={16} className="mr-2" />
          Yeni Kampanya Ekle
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingCampaign ? 'Kampanyayı Düzenle' : 'Yeni Kampanya Ekle'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kampanya Başlığı *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="🎉 Kış Kampanyası %25 İndirim"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kampanya Türü *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                    required
                  >
                    <option value="homepage">Anasayfa Kampanyası</option>
                    <option value="pricing">Fiyatlandırma Kampanyası</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kampanya Açıklaması *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Sınırlı sayıda rezervasyon için hemen iletişime geçin."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İndirim Oranı (%) *
                  </label>
                  <Input
                    type="number"
                    value={formData.discountPercent}
                    onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                    placeholder="25"
                    min="1"
                    max="100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bitiş Tarihi *
                  </label>
                  <Input
                    type="date"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    required
                  />
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                      Aktif Kampanya
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ek Not (Opsiyonel)
                </label>
                <Input
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="* Kampanya 31 Aralık 2024 tarihine kadar geçerlidir."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kampanya Paketleri
                </label>
                {formData.packages.map((pkg, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Paket Adı
                        </label>
                        <Input
                          value={pkg.name}
                          onChange={(e) => updatePackage(index, 'name', e.target.value)}
                          placeholder="Düğün Paketi"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Açıklama
                        </label>
                        <Input
                          value={pkg.description}
                          onChange={(e) => updatePackage(index, 'description', e.target.value)}
                          placeholder="8 saat çekim + dijital albüm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Eski Fiyat
                        </label>
                        <Input
                          value={pkg.oldPrice}
                          onChange={(e) => updatePackage(index, 'oldPrice', e.target.value)}
                          placeholder="₺4.500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Yeni Fiyat
                        </label>
                        <Input
                          value={pkg.newPrice}
                          onChange={(e) => updatePackage(index, 'newPrice', e.target.value)}
                          placeholder="₺3.375"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removePackage(index)}
                          className="w-full"
                        >
                          <Trash2 size={14} className="mr-2" />
                          Paketi Sil
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addPackage}
                >
                  <Plus size={14} className="mr-2" />
                  Paket Ekle
                </Button>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" className="bg-burgundy-600 hover:bg-burgundy-700">
                  {editingCampaign ? 'Güncelle' : 'Ekle'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCampaign(null);
                    setFormData({
                      title: '',
                      description: '',
                      note: '',
                      discountPercent: '',
                      expiresAt: '',
                      isActive: true,
                      type: 'homepage',
                      packages: [
                        { name: '', oldPrice: '', newPrice: '', description: '' }
                      ]
                    });
                  }}
                >
                  İptal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((campaign: any) => (
          <Card key={campaign._id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                  <Badge variant={campaign.isActive ? "default" : "secondary"}>
                    {campaign.isActive ? 'Aktif' : 'Pasif'}
                  </Badge>
                  <Badge variant="outline">
                    {campaign.type === 'homepage' ? 'Anasayfa' : 'Fiyatlandırma'}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
              <p className="text-sm text-gray-600 mb-2">İndirim: %{campaign.discountPercent}</p>
              <p className="text-sm text-gray-600 mb-4">
                Bitiş: {new Date(campaign.expiresAt).toLocaleDateString('tr-TR')}
              </p>
              {campaign.packages && campaign.packages.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Paketler:</p>
                  {campaign.packages.map((pkg: any, index: number) => (
                    <div key={index} className="text-xs text-gray-600 mb-1">
                      • {pkg.name}: {pkg.oldPrice} → {pkg.newPrice}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(campaign)}
                >
                  <Edit size={14} className="mr-2" />
                  Düzenle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(campaign._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={14} className="mr-2" />
                  Sil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Ayarlar</h2>
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-600">Ayarlar sayfası yakında eklenecek...</p>
        </CardContent>
      </Card>
    </div>
  );
}
