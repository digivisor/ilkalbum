// services/admin.service.ts - Admin authentication and management
import { apiClient } from '@/lib/api.client';
import { API_CONFIG } from '@/lib/api.config';
import { AdminLoginData, AdminVerifyData } from '@/types/api';

export class AdminService {
  // Admin login
  static async login(credentials: AdminLoginData) {
    const response = await apiClient.post<{ token: string; user: any }>(
      API_CONFIG.endpoints.admin.login, 
      credentials
    );
    
    // Set auth token for future requests if login successful
    if (response.success && response.data?.token) {
      apiClient.setAuthToken(response.data.token);
      // Store token in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_token', response.data.token);
      }
    }
    
    return response;
  }

  // Verify admin token
  static async verifyToken(tokenData: AdminVerifyData) {
    // Set the token first
    if (tokenData.token) {
      apiClient.setAuthToken(tokenData.token);
    }
    
    const response = await apiClient.get<{ valid: boolean; user: any }>(
      API_CONFIG.endpoints.admin.verify
    );
    
    return response;
  }

  // Admin logout
  static logout() {
    apiClient.removeAuthToken();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  }

  // Initialize admin session (check stored token)
  static async initializeSession(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    
    const token = localStorage.getItem('admin_token');
    if (!token) return false;
    
    try {
      const response = await this.verifyToken({ token });
      if (response.success && response.data?.valid) {
        apiClient.setAuthToken(token);
        return true;
      } else {
        this.logout(); // Remove invalid token
        return false;
      }
    } catch (error) {
      this.logout(); // Remove invalid token
      return false;
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('admin_token');
  }
}