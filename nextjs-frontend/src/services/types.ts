// Product Types
export interface Gig {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  seller: string;
  location: string;
  badge: string;
  featured?: boolean;
  hot?: boolean;
  delivery: string;
  type: 'gig';
  status?: 'draft' | 'published';
  description?: string;
  short_description?: string;
  pricing_tiers?: {
    basic: {
      title: string;
      description: string;
      price: number;
      delivery_time: string;
      revisions: string;
      features: string[];
    };
    standard: {
      title: string;
      description: string;
      price: number;
      delivery_time: string;
      revisions: string;
      features: string[];
    };
    premium: {
      title: string;
      description: string;
      price: number;
      delivery_time: string;
      revisions: string;
      features: string[];
    };
  };
}

export interface DigitalProduct {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  seller: string;
  category: string;
  downloads: number;
  type: 'digital';
  delivery: string;
  user_id: number;
  description: string;
  short_description?: string | null;
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
}

export interface SoftwareProduct {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  partner: string;
  category: string;
  has_lifetime: boolean;
  type: 'software';
  delivery: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  logo_path: string;
  screenshots: string[];
  version: string;
  partner_name: string;
  is_active: boolean;
  plans: {
    id: number;
    name: string;
    description: string;
    price: number;
    duration_days: number | null;
    features: string[];
    is_active: boolean;
  }[];
}

export type Product = Gig | DigitalProduct | SoftwareProduct; 