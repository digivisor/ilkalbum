// services/gallery.service.ts - Gallery related API calls
import { apiClient } from '@/lib/api.client';
import { API_CONFIG } from '@/lib/api.config';
import { GalleryItem } from '@/types/api';

// Helper function to ensure auth token is set
const ensureAuthToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken');
    if (token) {
      apiClient.setAuthToken(token);
    }
  }
};

export class GalleryService {
  // Get all gallery items
  static async getGalleryItems() {
    return apiClient.get<GalleryItem[]>(API_CONFIG.endpoints.gallery);
  }

  // Get gallery items by category
  static async getGalleryItemsByCategory(category: string) {
    return apiClient.get<GalleryItem[]>(`${API_CONFIG.endpoints.gallery}?category=${encodeURIComponent(category)}`);
  }

  // Admin: Create new gallery item
  static async createGalleryItem(itemData: Omit<GalleryItem, '_id'>) {
    ensureAuthToken();
    const result = await apiClient.post<GalleryItem>(API_CONFIG.endpoints.gallery, itemData);
    
    // Clear cache after successful operation
    await this.clearGalleryCache();
    
    return result;
  }

  // Admin: Update gallery item
  static async updateGalleryItem(id: string, itemData: Partial<GalleryItem>) {
    ensureAuthToken();
    const result = await apiClient.put<GalleryItem>(`${API_CONFIG.endpoints.gallery}/${id}`, itemData);
    
    // Clear cache after successful operation
    await this.clearGalleryCache();
    
    return result;
  }

  // Admin: Delete gallery item
  static async deleteGalleryItem(id: string) {
    ensureAuthToken();
    const result = await apiClient.delete(`${API_CONFIG.endpoints.gallery}/${id}`);
    
    // Clear cache after successful operation
    await this.clearGalleryCache();
    
    return result;
  }

  // Admin: Reorder gallery items
  static async reorderGalleryItems(items: { id: string; order: number }[]) {
    const result = await apiClient.put(`${API_CONFIG.endpoints.admin.gallery}/reorder`, { items });
    
    // Clear cache after successful operation
    await this.clearGalleryCache();
    
    return result;
  }

  // Clear gallery related cache
  static async clearGalleryCache() {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      if (!token) return;

      await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          path: '/galeri',
          tag: 'gallery'
        })
      });
    } catch (error) {
      console.warn('Gallery cache clear failed:', error);
    }
  }
}

// Server-side helper for Next.js pages
export class ServerGalleryService {
  // Server-side fetch with revalidation (immediate updates for gallery)
  static async getGalleryItemsSSR(revalidate: number = 0): Promise<GalleryItem[]> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.gallery}`, {
        next: { revalidate, tags: ['gallery'] },
      });
      
      if (!response.ok) {
        console.warn('Failed to fetch gallery items:', response.statusText);
        return [];
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      return [];
    }
  }

  // Server-side category-specific fetch
  static async getGalleryItemsByCategorySSR(
    category: string, 
    revalidate: number = 0
  ): Promise<GalleryItem[]> {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_CONFIG.endpoints.gallery}?category=${encodeURIComponent(category)}`,
        { next: { revalidate, tags: ['gallery'] } }
      );
      
      if (!response.ok) {
        console.warn('Failed to fetch gallery items by category:', response.statusText);
        return [];
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching gallery items by category:', error);
      return [];
    }
  }
}