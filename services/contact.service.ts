// services/contact.service.ts - Contact form API calls
import { apiClient } from '@/lib/api.client';
import { API_CONFIG } from '@/lib/api.config';
import { ContactFormData } from '@/types/api';

export class ContactService {
  // Submit contact form
  static async submitContactForm(formData: ContactFormData) {
    return apiClient.post(API_CONFIG.endpoints.contact, formData);
  }

  // Submit reservation/inquiry
  static async submitReservation(reservationData: ContactFormData & {
    packageType?: string;
    budget?: string;
    additionalInfo?: string;
  }) {
    return apiClient.post('/api/reservations', reservationData);
  }

  // Subscribe to newsletter (if endpoint exists)
  static async subscribeNewsletter(email: string) {
    return apiClient.post('/api/newsletter/subscribe', { email });
  }
}

// Utility functions for form validation
export const ContactValidation = {
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validatePhone: (phone: string): boolean => {
    // Turkish phone number validation (basic)
    const phoneRegex = /^(\+90|90|0)?\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  validateForm: (formData: ContactFormData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!formData.name || formData.name.trim().length < 2) {
      errors.push('İsim en az 2 karakter olmalıdır');
    }

    if (!ContactValidation.validateEmail(formData.email)) {
      errors.push('Geçerli bir e-posta adresi giriniz');
    }

    if (!ContactValidation.validatePhone(formData.phone)) {
      errors.push('Geçerli bir telefon numarası giriniz');
    }

    if (!formData.message || formData.message.trim().length < 10) {
      errors.push('Mesaj en az 10 karakter olmalıdır');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
};