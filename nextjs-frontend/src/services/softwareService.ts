import axios from '@/lib/axios';

export interface SoftwarePlan {
  id: number;
  name: string;
  description: string;
  price: number;
  duration_days: number | null; // null for lifetime
  features: string[];
  is_active: boolean;
}

export interface SoftwareProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  logo_path: string;
  screenshots: string[];
  version: string;
  partner_id: number;
  partner_name: string;
  is_active: boolean;
  plans: SoftwarePlan[];
  created_at: string;
  updated_at: string;
}

export interface SoftwareProductsResponse {
  data: SoftwareProduct[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface SoftwareProductParams {
  page?: number;
  per_page?: number;
  search?: string;
  partner_id?: number | string;
  sort_price?: 'asc' | 'desc';
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  has_lifetime?: boolean;
}

export const getSoftwareProducts = async (params: SoftwareProductParams = {}) => {
  try {
    const response = await axios.get('/api/software/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching software products:', error);
    
    // Return mock data for development
    return {
      data: getMockSoftwareProducts(),
      current_page: params.page || 1,
      last_page: 3,
      per_page: params.per_page || 12,
      total: 30
    };
  }
};

export const getSoftwareProduct = async (slug: string) => {
  try {
    const response = await axios.get(`/api/software/products/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching software product ${slug}:`, error);
    
    // Return mock data for development
    const mockProducts = getMockSoftwareProducts();
    return {
      data: mockProducts.find(product => product.slug === slug) || mockProducts[0]
    };
  }
};

export const getPartners = async () => {
  try {
    const response = await axios.get('/api/software/partners');
    return response.data;
  } catch (error) {
    console.error('Error fetching partners:', error);
    
    // Return mock data for development
    return {
      data: [
        { id: 1, name: 'Design Pro Tools' },
        { id: 2, name: 'WebBuilder Pro' },
        { id: 3, name: 'SEO Analytics' },
        { id: 4, name: 'Cloud Services Inc.' },
        { id: 5, name: 'Marketing Suite' }
      ]
    };
  }
};

// Mock data for development
const getMockSoftwareProducts = (): SoftwareProduct[] => {
  return [
    {
      id: 1,
      name: 'Design Pro Suite',
      slug: 'design-pro-suite',
      description: 'Professional design software for graphic designers, illustrators, and digital artists. Includes a comprehensive set of tools for creating stunning visuals.',
      short_description: 'Professional design software for graphic designers and artists',
      logo_path: '/assets/img/software/design-pro-logo.png',
      screenshots: [
        '/assets/img/software/design-pro-1.jpg',
        '/assets/img/software/design-pro-2.jpg',
        '/assets/img/software/design-pro-3.jpg'
      ],
      version: '2.5.1',
      partner_id: 1,
      partner_name: 'Design Pro Tools',
      is_active: true,
      plans: [
        {
          id: 1,
          name: 'Basic',
          description: 'Essential tools for beginners',
          price: 49.99,
          duration_days: 365,
          features: ['Basic design tools', 'Standard templates', 'Email support'],
          is_active: true
        },
        {
          id: 2,
          name: 'Professional',
          description: 'Advanced tools for professionals',
          price: 99.99,
          duration_days: 365,
          features: ['All Basic features', 'Advanced design tools', 'Premium templates', 'Priority support'],
          is_active: true
        },
        {
          id: 3,
          name: 'Enterprise',
          description: 'Complete solution for teams',
          price: 199.99,
          duration_days: null, // Lifetime
          features: ['All Professional features', 'Team collaboration', 'Custom templates', 'Dedicated support'],
          is_active: true
        }
      ],
      created_at: '2025-03-01T00:00:00.000Z',
      updated_at: '2025-03-01T00:00:00.000Z'
    },
    {
      id: 2,
      name: 'WebBuilder Pro',
      slug: 'webbuilder-pro',
      description: 'Create stunning websites without coding. Drag-and-drop interface, responsive templates, and powerful customization options.',
      short_description: 'Create stunning websites without coding',
      logo_path: '/assets/img/software/webbuilder-logo.png',
      screenshots: [
        '/assets/img/software/webbuilder-1.jpg',
        '/assets/img/software/webbuilder-2.jpg'
      ],
      version: '3.0.0',
      partner_id: 2,
      partner_name: 'WebBuilder Pro',
      is_active: true,
      plans: [
        {
          id: 4,
          name: 'Starter',
          description: 'Perfect for personal websites',
          price: 29.99,
          duration_days: 365,
          features: ['5 pages', 'Basic templates', 'Email support'],
          is_active: true
        },
        {
          id: 5,
          name: 'Business',
          description: 'Ideal for small businesses',
          price: 79.99,
          duration_days: 365,
          features: ['Unlimited pages', 'Premium templates', 'E-commerce', 'Priority support'],
          is_active: true
        },
        {
          id: 6,
          name: 'Agency',
          description: 'For web design professionals',
          price: 149.99,
          duration_days: null, // Lifetime
          features: ['White-label', 'Client management', 'Advanced customization', 'Dedicated support'],
          is_active: true
        }
      ],
      created_at: '2025-03-02T00:00:00.000Z',
      updated_at: '2025-03-02T00:00:00.000Z'
    },
    {
      id: 3,
      name: 'SEO Analytics Dashboard',
      slug: 'seo-analytics-dashboard',
      description: 'Comprehensive SEO analytics tool for tracking website performance, keyword rankings, and competitor analysis.',
      short_description: 'Track website performance and SEO rankings',
      logo_path: '/assets/img/software/seo-analytics-logo.png',
      screenshots: [
        '/assets/img/software/seo-analytics-1.jpg',
        '/assets/img/software/seo-analytics-2.jpg',
        '/assets/img/software/seo-analytics-3.jpg'
      ],
      version: '1.8.3',
      partner_id: 3,
      partner_name: 'SEO Analytics',
      is_active: true,
      plans: [
        {
          id: 7,
          name: 'Basic',
          description: 'Essential SEO tracking',
          price: 19.99,
          duration_days: 30,
          features: ['5 websites', 'Basic reports', 'Email support'],
          is_active: true
        },
        {
          id: 8,
          name: 'Pro',
          description: 'Advanced SEO analytics',
          price: 49.99,
          duration_days: 30,
          features: ['20 websites', 'Advanced reports', 'Competitor analysis', 'Priority support'],
          is_active: true
        },
        {
          id: 9,
          name: 'Agency',
          description: 'Complete SEO solution',
          price: 99.99,
          duration_days: 30,
          features: ['Unlimited websites', 'White-label reports', 'API access', 'Dedicated support'],
          is_active: true
        }
      ],
      created_at: '2025-03-03T00:00:00.000Z',
      updated_at: '2025-03-03T00:00:00.000Z'
    },
    {
      id: 4,
      name: 'Cloud Storage Manager',
      slug: 'cloud-storage-manager',
      description: 'Secure cloud storage solution with advanced file management, sharing, and synchronization features.',
      short_description: 'Secure cloud storage with advanced management',
      logo_path: '/assets/img/software/cloud-storage-logo.png',
      screenshots: [
        '/assets/img/software/cloud-storage-1.jpg',
        '/assets/img/software/cloud-storage-2.jpg'
      ],
      version: '2.1.0',
      partner_id: 4,
      partner_name: 'Cloud Services Inc.',
      is_active: true,
      plans: [
        {
          id: 10,
          name: 'Personal',
          description: 'For individual use',
          price: 9.99,
          duration_days: 30,
          features: ['100GB storage', 'File sharing', 'Email support'],
          is_active: true
        },
        {
          id: 11,
          name: 'Business',
          description: 'For small teams',
          price: 29.99,
          duration_days: 30,
          features: ['1TB storage', 'Advanced sharing', 'Team management', 'Priority support'],
          is_active: true
        },
        {
          id: 12,
          name: 'Enterprise',
          description: 'For large organizations',
          price: 99.99,
          duration_days: 30,
          features: ['Unlimited storage', 'Advanced security', 'Admin controls', 'Dedicated support'],
          is_active: true
        }
      ],
      created_at: '2025-03-04T00:00:00.000Z',
      updated_at: '2025-03-04T00:00:00.000Z'
    },
    {
      id: 5,
      name: 'Marketing Automation Suite',
      slug: 'marketing-automation-suite',
      description: 'All-in-one marketing automation platform for email campaigns, social media management, and lead generation.',
      short_description: 'All-in-one marketing automation platform',
      logo_path: '/assets/img/software/marketing-suite-logo.png',
      screenshots: [
        '/assets/img/software/marketing-suite-1.jpg',
        '/assets/img/software/marketing-suite-2.jpg',
        '/assets/img/software/marketing-suite-3.jpg'
      ],
      version: '4.2.1',
      partner_id: 5,
      partner_name: 'Marketing Suite',
      is_active: true,
      plans: [
        {
          id: 13,
          name: 'Starter',
          description: 'For small businesses',
          price: 39.99,
          duration_days: 30,
          features: ['1,000 contacts', 'Email campaigns', 'Basic automation', 'Email support'],
          is_active: true
        },
        {
          id: 14,
          name: 'Growth',
          description: 'For growing businesses',
          price: 79.99,
          duration_days: 30,
          features: ['10,000 contacts', 'Advanced automation', 'Social media integration', 'Priority support'],
          is_active: true
        },
        {
          id: 15,
          name: 'Enterprise',
          description: 'For large organizations',
          price: 199.99,
          duration_days: 30,
          features: ['Unlimited contacts', 'Custom integrations', 'Advanced analytics', 'Dedicated support'],
          is_active: true
        }
      ],
      created_at: '2025-03-05T00:00:00.000Z',
      updated_at: '2025-03-05T00:00:00.000Z'
    }
  ];
}; 