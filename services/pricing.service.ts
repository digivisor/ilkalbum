// services/pricing.service.ts - Pricing related API calls
import { apiClient } from '@/lib/api.client';
import { API_CONFIG } from '@/lib/api.config';
import { PricingPackage, Campaign } from '@/types/api';

// Helper function to ensure auth token is set
const ensureAuthToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken');
    if (token) {
      apiClient.setAuthToken(token);
    }
  }
};

export class PricingService {
  // Get all pricing packages
  static async getPricingPackages() {
    return apiClient.get<PricingPackage[]>(API_CONFIG.endpoints.pricing);
  }

  // Get active campaigns
  static async getActiveCampaigns() {
    return apiClient.get<Campaign[]>(API_CONFIG.endpoints.campaigns);
  }

  // Admin: Create new pricing package
  static async createPricingPackage(packageData: Omit<PricingPackage, '_id'>) {
    ensureAuthToken();
    const result = await apiClient.post<PricingPackage>(API_CONFIG.endpoints.pricing, packageData);
    
    // Clear cache after successful operation
    await this.clearPricingCache();
    
    return result;
  }

  // Admin: Update pricing package
  static async updatePricingPackage(id: string, packageData: Partial<PricingPackage>) {
    ensureAuthToken();
    const result = await apiClient.put<PricingPackage>(`${API_CONFIG.endpoints.pricing}/${id}`, packageData);
    
    // Clear cache after successful operation
    await this.clearPricingCache();
    
    return result;
  }

  // Admin: Delete pricing package
  static async deletePricingPackage(id: string) {
    ensureAuthToken();
    const result = await apiClient.delete(`${API_CONFIG.endpoints.pricing}/${id}`);
    
    // Clear cache after successful operation
    await this.clearPricingCache();
    
    return result;
  }

  // Admin: Create campaign
  static async createCampaign(campaignData: Omit<Campaign, '_id'>) {
    const result = await apiClient.post<Campaign>(API_CONFIG.endpoints.admin.campaigns, campaignData);
    
    // Clear cache after successful operation
    await this.clearPricingCache();
    
    return result;
  }

  // Admin: Update campaign
  static async updateCampaign(id: string, campaignData: Partial<Campaign>) {
    const result = await apiClient.put<Campaign>(`${API_CONFIG.endpoints.admin.campaigns}/${id}`, campaignData);
    
    // Clear cache after successful operation
    await this.clearPricingCache();
    
    return result;
  }

  // Admin: Delete campaign
  static async deleteCampaign(id: string) {
    const result = await apiClient.delete(`${API_CONFIG.endpoints.admin.campaigns}/${id}`);
    
    // Clear cache after successful operation
    await this.clearPricingCache();
    
    return result;
  }

  // Clear pricing related cache
  static async clearPricingCache() {
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
          path: '/fiyatlandirma',
          tag: 'pricing'
        })
      });
    } catch (error) {
      console.warn('Cache clear failed:', error);
    }
  }
}

// Server-side helper for Next.js pages (with revalidation)
export class ServerPricingService {
  // Server-side fetch with revalidation (for SSR/SSG)
  static async getPricingPackagesSSR(revalidate: number = 0): Promise<PricingPackage[]> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.pricing}`, {
        next: { revalidate, tags: ['pricing'] },
      });
      
      if (!response.ok) {
        console.warn('Failed to fetch pricing packages:', response.statusText);
        return [];
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching pricing packages:', error);
      return [];
    }
  }

  // Server-side campaigns fetch
  static async getActiveCampaignsSSR(revalidate: number = 0): Promise<Campaign[]> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.campaigns}`, {
        next: { revalidate, tags: ['campaigns'] },
      });
      
      if (!response.ok) {
        console.warn('Failed to fetch campaigns:', response.statusText);
        return [];
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      return [];
    }
  }
}