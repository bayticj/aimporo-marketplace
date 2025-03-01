import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if we're in the browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
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
};

export default api; 