// types/api.ts - API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PricingPackage {
  _id: string;
  name: string;
  title?: string; // For backward compatibility
  price: number | string;
  originalPrice?: number | string;
  categories: string[];
  category?: string; // For backward compatibility
  features: string[];
  isPopular: boolean;
  popular?: boolean; // For backward compatibility
  duration: string;
  notIncluded?: string[];
  customCategoryName?: string;
  note?: string;
}

export interface Campaign {
  _id?: string;
  title: string;
  description: string;
  note?: string;
  discountPercent: number;
  expiresAt: string;
  isActive?: boolean;
  type?: string;
  packages?: Array<{
    name: string;
    [key: string]: any;
  }>;
}

export interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
  order?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  eventDate?: string;
  eventType?: string;
}

export interface AdminLoginData {
  username: string;
  password: string;
}

export interface AdminVerifyData {
  token: string;
}