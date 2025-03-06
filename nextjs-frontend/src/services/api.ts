import axios, { AxiosError } from 'axios';
import { getAuthToken } from '@/utils/auth';

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
  getGigs: (params?: any) => api.get('/gigs', { params }),
  getGig: (id: number) => api.get(`/gigs/${id}`),
  createGig: (gigData: any) => api.post('/gigs', gigData),
  updateGig: (id: number, gigData: any) => api.put(`/gigs/${id}`, gigData),
  deleteGig: (id: number) => api.delete(`/gigs/${id}`),
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
    : `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'}${url.startsWith('/') ? url : `/${url}`}`;
  
  const response = await fetch(apiUrl, {
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

export default {
  fetchWithAuth,
  fetchApi,
  get,
  post,
  put,
  del,
}; 