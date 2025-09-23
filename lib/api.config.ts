// lib/api.config.ts - API configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  timeout: 10000,
  retries: 3,
  endpoints: {
    // Public endpoints
    pricing: '/api/pricing',
    campaigns: '/api/campaigns',
    gallery: '/api/gallery',
    contact: '/api/contact',
    
    // Admin endpoints - backend'de mevcut olan endpoint'leri kullan
    admin: {
      login: '/api/admin/login',
      verify: '/api/admin/verify',
      gallery: '/api/gallery', // Admin için de aynı endpoint
      pricing: '/api/pricing', // Admin için de aynı endpoint
      campaigns: '/api/campaigns' // Admin için de aynı endpoint
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