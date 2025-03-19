import axios, { AxiosError } from 'axios';
import { getAuthToken } from '@/utils/auth';
import { mockGigs, mockDigitalProducts, mockSoftwareProducts } from './mockData';

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    // Get token using the utility function
    if (typeof window !== 'undefined') {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Error handling helper
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return axiosError.response.data;
    } else if (axiosError.request) {
      // The request was made but no response was received
      return { message: 'No response received from server' };
    } else {
      // Something happened in setting up the request that triggered an Error
      return { message: axiosError.message || 'Error setting up request' };
    }
  }
  // For non-Axios errors
  return { message: 'An unexpected error occurred' };
};

// Authentication services
export const authService = {
  register: (userData: any) => api.post('/register', userData),
  login: (credentials: any) => api.post('/login', credentials),
  logout: () => api.post('/logout'),
  getUser: () => api.get('/user'),
};

// Gig services
export const gigService = {
  getGigs: (params?: any) => {
    // For demo/development, return mock data
    if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
      return Promise.resolve({
        data: { gigs: mockGigs, total: mockGigs.length }
      });
    }
    return api.get('/gigs', { params });
  },
  getGig: (id: number) => {
    // For demo/development, return mock data
    if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
      const gig = mockGigs.find(g => g.id === id);
      if (gig) {
        return Promise.resolve({ data: { gig } });
      } else {
        return Promise.reject(new Error('Gig not found'));
      }
    }
    return api.get(`/gigs/${id}`);
  },
  createGig: (gigData: any) => api.post('/gigs', gigData),
  updateGig: (id: number, gigData: any) => api.put(`/gigs/${id}`, gigData),
  deleteGig: (id: number) => api.delete(`/gigs/${id}`),
  searchGigs: (query: string, options?: any) => api.get(`/gigs/search`, { 
    params: { 
      query,
      ...options
    } 
  }),
  getCategoryCounts: () => api.get('/gigs/categories/counts'),
};

// Order services
export const orderService = {
  getOrders: () => api.get('/orders'),
  getOrder: (id: number) => api.get(`/orders/${id}`),
  createOrder: (orderData: any) => api.post('/orders', orderData),
  updateOrder: (id: number, orderData: any) => api.put(`/orders/${id}`, orderData),
  deleteOrder: (id: number) => api.delete(`/orders/${id}`),
  submitDeliverable: (orderId: number, deliverableData: FormData) => 
    api.post(`/orders/${orderId}/deliverables`, deliverableData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  submitFeedback: (orderId: number, deliverableId: number, feedbackData: any) => 
    api.post(`/orders/${orderId}/deliverables/${deliverableId}/feedback`, feedbackData),
  getDeliverables: (orderId: number) => api.get(`/orders/${orderId}/deliverables`),
  getDeliverable: (orderId: number, deliverableId: number) => 
    api.get(`/orders/${orderId}/deliverables/${deliverableId}`),
};

// Deliverable Management
export const submitDeliverable = async (orderId: number, formData: FormData) => {
  try {
    const response = await api.post(`/orders/${orderId}/deliverables`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const submitFeedback = async (deliverableId: number, feedback: string, status: string) => {
  try {
    const response = await api.post(`/deliverables/${deliverableId}/feedback`, {
      feedback,
      status,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getDeliverables = async (orderId: number) => {
  try {
    const response = await api.get(`/orders/${orderId}/deliverables`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getDeliverable = async (deliverableId: number) => {
  try {
    const response = await api.get(`/deliverables/${deliverableId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Milestone Management
export const createMilestone = async (orderId: number, milestoneData: {
  title: string;
  description?: string;
  deadline: string;
}) => {
  try {
    const response = await api.post(`/orders/${orderId}/milestones`, milestoneData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getMilestones = async (orderId: number) => {
  try {
    const response = await api.get(`/orders/${orderId}/milestones`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateMilestoneStatus = async (
  milestoneId: number, 
  status: 'pending' | 'in_progress' | 'completed'
) => {
  try {
    const response = await api.patch(`/milestones/${milestoneId}`, { status });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const linkDeliverableToMilestone = async (milestoneId: number, deliverableId: number) => {
  try {
    const response = await api.post(`/milestones/${milestoneId}/link-deliverable`, {
      deliverable_id: deliverableId,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Role management services
export const roleService = {
  getRoles: () => api.get('/roles'),
  getRole: (id: number) => api.get(`/roles/${id}`),
  createRole: (roleData: any) => api.post('/roles', roleData),
  updateRole: (id: number, roleData: any) => api.put(`/roles/${id}`, roleData),
  deleteRole: (id: number) => api.delete(`/roles/${id}`),
  getPermissions: () => api.get('/roles/permissions'),
  assignRole: (userId: number, role: string) => api.post('/roles/assign', { user_id: userId, role }),
  removeRole: (userId: number, role: string) => api.post('/roles/remove', { user_id: userId, role }),
};

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Fetch data from the API with authentication
 * @param url The URL to fetch from
 * @param options Additional fetch options
 * @returns The response data
 */
export async function fetchWithAuth<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  // Create a new headers object
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  
  // Only set Content-Type if not FormData
  if (!(options.body instanceof FormData)) {
    headers.append('Content-Type', 'application/json');
  }
  
  // Add authorization header if token exists
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  
  // Add CORS headers
  headers.append('Access-Control-Allow-Origin', window.location.origin);
  headers.append('Access-Control-Allow-Credentials', 'true');
  
  // Add any custom headers from options
  if (options.headers) {
    const customHeaders = new Headers(options.headers);
    customHeaders.forEach((value, key) => {
      headers.append(key, value);
    });
  }
  
  // If the URL doesn't start with http, prepend the API base URL
  const apiUrl = url.startsWith('http') 
    ? url 
    : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api'}${url.startsWith('/') ? url : `/${url}`}`;
  
  try {
    // For development/mock mode, return mock data
    if (process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
      return await getMockData<T>(url);
    }
    
    const response = await fetch(apiUrl, {
      ...options,
      headers,
      mode: 'cors', // Explicitly set CORS mode
      credentials: 'include', // Include credentials for cross-origin requests
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `HTTP error ${response.status}` }));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    
    // For network errors, provide a more user-friendly message
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.log('Falling back to mock data due to network error');
      return await getMockData<T>(url);
    }
    
    // Re-throw the error to be handled by the caller
    throw error;
  }
}

// Helper function to get mock data
async function getMockData<T>(url: string): Promise<T> {
  console.log('Using mock data for:', url);
  
  // Mock data for digital product categories
  if (url.includes('/digital-products/categories')) {
    return {
      success: true,
      data: [
        { id: 1, name: 'E-books', slug: 'e-books', description: 'Digital books and guides', icon: 'book', is_active: true, created_at: '2023-01-01', updated_at: '2023-01-01' },
        { id: 2, name: 'Templates', slug: 'templates', description: 'Design and document templates', icon: 'file', is_active: true, created_at: '2023-01-01', updated_at: '2023-01-01' },
        { id: 3, name: 'Software', slug: 'software', description: 'Applications and plugins', icon: 'code', is_active: true, created_at: '2023-01-01', updated_at: '2023-01-01' },
        { id: 4, name: 'Graphics', slug: 'graphics', description: 'Digital art and graphics', icon: 'image', is_active: true, created_at: '2023-01-01', updated_at: '2023-01-01' },
        { id: 5, name: 'Audio', slug: 'audio', description: 'Music and sound effects', icon: 'music', is_active: true, created_at: '2023-01-01', updated_at: '2023-01-01' }
      ]
    } as unknown as T;
  }
  
  // Mock data for digital products
  if (url.includes('/digital-products')) {
    return {
      success: true,
      data: {
        data: Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          user_id: 1,
          title: `Digital Product ${i + 1}`,
          description: `This is a description for digital product ${i + 1}. It includes all the details about the product.`,
          price: Math.floor(Math.random() * 100) + 5,
          file_path: '/path/to/file.zip',
          file_name: 'product-file.zip',
          file_size: '2.5 MB',
          file_type: 'application/zip',
          preview_path: null,
          download_limit: null,
          is_featured: i < 3,
          status: 'published',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
          user: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com'
          },
          categories: [
            { id: (i % 5) + 1, name: ['E-books', 'Templates', 'Software', 'Graphics', 'Audio'][i % 5], slug: ['e-books', 'templates', 'software', 'graphics', 'audio'][i % 5], description: 'Category description', icon: 'icon', is_active: true, created_at: '2023-01-01', updated_at: '2023-01-01' }
          ]
        })),
        current_page: 1,
        last_page: 3,
        per_page: 12,
        total: 36
      }
    } as unknown as T;
  }
  
  // Default mock data
  return { success: true, data: {} } as unknown as T;
}

/**
 * Fetch data from the API without authentication
 * @param url The URL to fetch from
 * @param options Additional fetch options
 * @returns The response data
 */
export async function fetchApi<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  
  if (!(options.body instanceof FormData)) {
    headers.append('Content-Type', 'application/json');
  }
  
  if (options.headers) {
    const customHeaders = new Headers(options.headers);
    customHeaders.forEach((value, key) => {
      headers.append(key, value);
    });
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred');
  }
  
  return await response.json();
}

/**
 * Get data from the API with authentication
 * @param url The URL to fetch from
 * @returns The response data
 */
export async function get<T>(url: string): Promise<ApiResponse<T>> {
  return fetchWithAuth<ApiResponse<T>>(url);
}

/**
 * Post data to the API with authentication
 * @param url The URL to post to
 * @param data The data to post
 * @returns The response data
 */
export async function post<T>(url: string, data: any): Promise<ApiResponse<T>> {
  return fetchWithAuth<ApiResponse<T>>(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Put data to the API with authentication
 * @param url The URL to put to
 * @param data The data to put
 * @returns The response data
 */
export async function put<T>(url: string, data: any): Promise<ApiResponse<T>> {
  return fetchWithAuth<ApiResponse<T>>(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Delete data from the API with authentication
 * @param url The URL to delete from
 * @returns The response data
 */
export async function del<T>(url: string): Promise<ApiResponse<T>> {
  return fetchWithAuth<ApiResponse<T>>(url, {
    method: 'DELETE',
  });
}

// Function to get search suggestions
export async function searchSuggestions(query: string, limit: number = 5): Promise<any> {
  return get(`/search/suggestions?q=${query}&limit=${limit}`);
}

export default {
  fetchWithAuth,
  fetchApi,
  get,
  post,
  put,
  del,
  searchSuggestions
}; 