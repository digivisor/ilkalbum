# Cloudinary Kurulumu

Admin paneline Cloudinary entegrasyonu eklendi. Cloudinary ile dosya yükleme için aşağıdaki adımları takip edin:

## 1. Cloudinary Hesabı Oluşturma
1. https://cloudinary.com/ adresine gidin
2. Ücretsiz hesap oluşturun
3. Dashboard'da aşağıdaki bilgileri not alın:
   - Cloud Name
   - API Key
   - API Secret

## 2. Upload Preset Oluşturma
1. Cloudinary Dashboard'da Settings > Upload sekmesine gidin
2. "Add upload preset" butonuna tıklayın
3. Preset adını girin (örn: "ilkalbum_uploads")
4. Signing Mode'u "Unsigned" olarak ayarlayın
5. Folder'ı istediğiniz gibi ayarlayın (örn: "ilkalbum/gallery")
6. Save butonuna tıklayın

## 3. Konfigürasyon
`app/admin/page.tsx` dosyasında şu satırları bulun ve güncelleyin:

```javascript
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME'; // Buraya Cloudinary cloud name'ini yaz
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET'; // Buraya upload preset'ini yaz
```

## 4. Özellikler
- ✅ Drag & drop dosya yükleme
- ✅ Fotoğraf ve video desteği
- ✅ Otomatik video thumbnail oluşturma
- ✅ Manuel URL girme seçeneği (Google Drive destekli)
- ✅ Yükleme durumu göstergesi
- ✅ Desteklenen formatlar: JPG, PNG, GIF, MP4, MOV, AVI

## 5. Kullanım
1. Admin panelinde Galeri sekmesine gidin
2. "Yeni Ekle" butonuna tıklayın
3. Dosya yükleme alanından dosya seçin VEYA manuel URL girin
4. Diğer bilgileri doldurun ve kaydedin

## Güvenlik Notu
Production ortamında Cloudinary bilgilerini environment variable'lar olarak saklamayı unutmayın!