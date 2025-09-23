// lib/api.client.ts - Base API client with error handling
import { API_CONFIG, getApiUrl } from './api.config';
import { ApiResponse } from '@/types/api';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

// Helper: fetch with timeout
async function fetchWithTimeout(
  url: string, 
  options: FetchOptions = {}
): Promise<Response> {
  const { timeout = API_CONFIG.timeout, ...fetchOptions } = options;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Helper: fetch with retries
async function fetchWithRetries(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { retries = API_CONFIG.retries, ...fetchOptions } = options;
  
  let lastError: Error;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, fetchOptions);
      
      // Don't retry on 4xx errors (client errors)
      if (response.status >= 400 && response.status < 500) {
        return response;
      }
      
      // Return successful responses or 5xx on last attempt
      if (response.ok || attempt === retries) {
        return response;
      }
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on timeout for last attempt
      if (attempt === retries) {
        throw lastError;
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  
  throw lastError!;
}

// Main API client class
export class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.defaultHeaders = API_CONFIG.headers;
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = getApiUrl(endpoint);
    
    const requestOptions: FetchOptions = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetchWithRetries(url, requestOptions);
      
      // Handle different content types
      let data: any;
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new ApiError(
          data?.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          data
        );
      }

      // Return standardized success response
      return {
        success: true,
        data: data,
      };
      
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
        };
      }
      
      // Handle network errors, timeouts, etc.
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // HTTP method helpers
  async get<T>(endpoint: string, options?: FetchOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(
    endpoint: string, 
    data?: any, 
    options?: FetchOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    endpoint: string, 
    data?: any, 
    options?: FetchOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: FetchOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // Utility: set auth token for requests
  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Utility: remove auth token
  removeAuthToken() {
    delete this.defaultHeaders['Authorization'];
  }
}

// Export singleton instance
export const apiClient = new ApiClient();