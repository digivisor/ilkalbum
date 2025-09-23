// lib/api.config.ts - API configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://api.ilkalbum.com',
  timeout: 10000,
  retries: 3,
  endpoints: {
    // Public endpoints
    pricing: '/api/pricing',
    campaigns: '/api/campaigns',
    gallery: '/api/gallery',
    contact: '/api/contact',
    
    // Admin endpoints  
    admin: {
      login: '/api/admin/login',
      verify: '/api/admin/verify',
      gallery: '/api/admin/gallery',
      pricing: '/api/admin/pricing',
      campaigns: '/api/admin/campaigns'
    }
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};