// services/index.ts - Main service layer export
export { PricingService, ServerPricingService } from './pricing.service';
export { GalleryService, ServerGalleryService } from './gallery.service';
export { ContactService, ContactValidation } from './contact.service';
export { AdminService } from './admin.service';

// Re-export API client and config for direct use if needed
export { apiClient, ApiError } from '@/lib/api.client';
export { API_CONFIG, getApiUrl } from '@/lib/api.config';

// Re-export types
export type * from '@/types/api';