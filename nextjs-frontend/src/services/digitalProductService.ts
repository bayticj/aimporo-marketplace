import { fetchWithAuth } from './api';
import { getAuthToken } from '@/utils/auth';

export interface DigitalProduct {
  id: number;
  user_id: number;
  title: string;
  description: string;
  price: number;
  file_path: string;
  file_name: string;
  file_size: string;
  file_type: string;
  preview_path: string | null;
  download_limit: number | null;
  is_featured: boolean;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  categories?: DigitalProductCategory[];
}

export interface DigitalProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DigitalProductPurchase {
  id: number;
  user_id: number;
  digital_product_id: number;
  transaction_id: string | null;
  amount: number;
  payment_method: string | null;
  payment_status: string;
  download_count: number;
  last_downloaded_at: string | null;
  created_at: string;
  updated_at: string;
  digital_product?: DigitalProduct;
}

export interface DigitalProductsResponse {
  success: boolean;
  data: {
    data: DigitalProduct[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface DigitalProductResponse {
  success: boolean;
  data: DigitalProduct;
}

export interface DigitalProductCategoriesResponse {
  success: boolean;
  data: DigitalProductCategory[];
}

export interface DigitalProductPurchasesResponse {
  success: boolean;
  data: {
    data: DigitalProductPurchase[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface DigitalProductPurchaseResponse {
  success: boolean;
  data: DigitalProductPurchase;
}

// Digital Products
export const getDigitalProducts = async (params?: any) => {
  try {
    const queryParams = params ? new URLSearchParams(params).toString() : '';
    const url = `/digital-products${queryParams ? `?${queryParams}` : ''}`;
    return await fetchWithAuth<DigitalProductsResponse>(url);
  } catch (error) {
    console.error('Error fetching digital products:', error);
    throw error;
  }
};

export const getDigitalProduct = async (id: number) => {
  try {
    return await fetchWithAuth<DigitalProductResponse>(`/digital-products/${id}`);
  } catch (error) {
    console.error(`Error fetching digital product ${id}:`, error);
    throw error;
  }
};

export const createDigitalProduct = async (formData: FormData) => {
  try {
    return await fetchWithAuth<DigitalProductResponse>('/digital-products', {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    console.error('Error creating digital product:', error);
    throw error;
  }
};

export const updateDigitalProduct = async (id: number, formData: FormData) => {
  try {
    // Add _method=PUT to simulate PUT request with FormData
    formData.append('_method', 'PUT');
    
    return await fetchWithAuth<DigitalProductResponse>(`/digital-products/${id}`, {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    console.error(`Error updating digital product ${id}:`, error);
    throw error;
  }
};

export const deleteDigitalProduct = async (id: number) => {
  try {
    return await fetchWithAuth<{ success: boolean; message: string }>(`/digital-products/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting digital product ${id}:`, error);
    throw error;
  }
};

export const publishDigitalProduct = async (id: number) => {
  try {
    return await fetchWithAuth<DigitalProductResponse>(`/digital-products/${id}/publish`, {
      method: 'PATCH',
    });
  } catch (error) {
    console.error(`Error publishing digital product ${id}:`, error);
    throw error;
  }
};

export const archiveDigitalProduct = async (id: number) => {
  try {
    return await fetchWithAuth<DigitalProductResponse>(`/digital-products/${id}/archive`, {
      method: 'PATCH',
    });
  } catch (error) {
    console.error(`Error archiving digital product ${id}:`, error);
    throw error;
  }
};

export const getMyDigitalProducts = async (params?: any) => {
  try {
    const queryParams = params ? new URLSearchParams(params).toString() : '';
    const url = `/digital-products/my/products${queryParams ? `?${queryParams}` : ''}`;
    return await fetchWithAuth<DigitalProductsResponse>(url);
  } catch (error) {
    console.error('Error fetching my digital products:', error);
    throw error;
  }
};

// Categories
export const getDigitalProductCategories = async () => {
  try {
    return await fetchWithAuth<DigitalProductCategoriesResponse>('/digital-products/categories');
  } catch (error) {
    console.error('Error fetching digital product categories:', error);
    throw error;
  }
};

export const getDigitalProductCategory = async (id: number) => {
  try {
    return await fetchWithAuth<{ success: boolean; data: DigitalProductCategory }>(`/digital-products/categories/${id}`);
  } catch (error) {
    console.error(`Error fetching digital product category ${id}:`, error);
    throw error;
  }
};

export const createDigitalProductCategory = async (data: Partial<DigitalProductCategory>) => {
  try {
    return await fetchWithAuth<{ success: boolean; data: DigitalProductCategory }>('/digital-products/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Error creating digital product category:', error);
    throw error;
  }
};

export const updateDigitalProductCategory = async (id: number, data: Partial<DigitalProductCategory>) => {
  try {
    return await fetchWithAuth<{ success: boolean; data: DigitalProductCategory }>(`/digital-products/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(`Error updating digital product category ${id}:`, error);
    throw error;
  }
};

export const deleteDigitalProductCategory = async (id: number) => {
  try {
    return await fetchWithAuth<{ success: boolean; message: string }>(`/digital-products/categories/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting digital product category ${id}:`, error);
    throw error;
  }
};

// Purchases
export const purchaseDigitalProduct = async (id: number) => {
  try {
    return await fetchWithAuth<DigitalProductPurchaseResponse>(`/digital-products/${id}/purchase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
  } catch (error) {
    console.error(`Error purchasing digital product ${id}:`, error);
    throw error;
  }
};

export const getMyPurchases = async () => {
  try {
    return await fetchWithAuth<DigitalProductPurchasesResponse>('/digital-products/purchases');
  } catch (error) {
    console.error('Error fetching my purchases:', error);
    throw error;
  }
};

export const getPurchase = async (id: number) => {
  try {
    return await fetchWithAuth<DigitalProductPurchaseResponse>(`/digital-products/purchases/${id}`);
  } catch (error) {
    console.error(`Error fetching purchase ${id}:`, error);
    throw error;
  }
};

export const downloadPurchase = async (id: number) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    const token = getAuthToken();
    
    const response = await fetch(`${apiUrl}/digital-products/purchases/${id}/download`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to download file');
    }
    
    return await response.blob();
  } catch (error) {
    console.error(`Error downloading purchase ${id}:`, error);
    throw error;
  }
};

export const getPreview = async (id: number) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    
    const response = await fetch(`${apiUrl}/digital-products/${id}/preview`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error('Failed to get preview');
    }
    
    return await response.blob();
  } catch (error) {
    console.error(`Error getting preview for digital product ${id}:`, error);
    throw error;
  }
}; 