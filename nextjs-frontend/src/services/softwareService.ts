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
  category?: string;
  sort_price?: 'asc' | 'desc';
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  has_lifetime?: boolean;
}

export const getSoftwareProducts = async (params: SoftwareProductParams = {}) => {
  try {
    const response = await axios.get('/api/software/products', { params });
    
    // Ensure all software products have "Instant" delivery
    if (response.data && response.data.data) {
      response.data.data = response.data.data.map((product: SoftwareProduct) => ({
        ...product,
        delivery: "Instant"
      }));
    } else if (Array.isArray(response.data)) {
      response.data = response.data.map((product: SoftwareProduct) => ({
        ...product,
        delivery: "Instant"
      }));
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching software products:', error);
    
    // Return mock data for development
    const mockData = {
      data: getMockSoftwareProducts().map(product => ({
        ...product,
        delivery: "Instant"
      })),
      current_page: params.page || 1,
      last_page: 3,
      per_page: params.per_page || 12,
      total: 30
    };
    
    return mockData;
  }
};

export const getSoftwareProduct = async (slug: string) => {
  try {
    const response = await axios.get(`/api/software/products/${slug}`);
    
    // Ensure the software product has "Instant" delivery
    if (response.data && response.data.data) {
      response.data.data = {
        ...response.data.data,
        delivery: "Instant"
      };
    } else if (response.data) {
      response.data = {
        ...response.data,
        delivery: "Instant"
      };
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching software product:', error);
    
    // Extract a potential numeric ID from the slug
    const slugParts = slug.split('-');
    const potentialId = parseInt(slugParts[slugParts.length - 1]) || parseInt(slug);
    const mockProductId = !isNaN(potentialId) ? potentialId : 1;
    
    // Generate a comprehensive mock product
    const mockProduct = {
      id: mockProductId,
      name: `Software Product ${mockProductId}`,
      slug: slug,
      description: `This is a detailed description for Software Product ${mockProductId}. It includes all the features, specifications, and benefits of using this product.\n\nOur software is designed to help businesses streamline their operations, improve productivity, and reduce costs.\n\nWith our intuitive interface and powerful features, you'll be able to accomplish more in less time.`,
      short_description: `A comprehensive solution for businesses of all sizes.`,
      logo_path: `/assets/img/test/software-logo-placeholder.png`,
      logo: `/assets/img/test/software-logo-placeholder.png`,
      screenshots: [
        `/assets/img/test/Class Student Manager.jpg`,
        `/assets/img/test/Clinic Manager.jpg`,
        `/assets/img/test/Company Payroll System 3.png`,
        `/assets/img/test/Dental System.png`
      ],
      thumbnail: `/assets/img/test/Class Student Manager.jpg`,
      version: `${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      partner_id: 1,
      partner_name: "Partner Corporation",
      is_active: true,
      features: [
        "User-friendly interface",
        "Customizable dashboards",
        "Real-time analytics",
        "Cloud synchronization",
        "Mobile app integration",
        "Automated backups",
        "24/7 technical support",
        "Regular updates and improvements"
      ],
      system_requirements: "Windows 10/11 or macOS 11+, 8GB RAM, 2GHz processor, 1GB free disk space",
      plans: [
        {
          id: "plan-1",
          name: "Basic Plan",
          description: "Perfect for small businesses and startups",
          price: 49.99,
          duration_days: 30,
          features: [
            "Core features",
            "Email support",
            "Up to 5 users",
            "Basic reporting"
          ],
          is_active: true
        },
        {
          id: "plan-2",
          name: "Pro Plan",
          description: "Ideal for growing businesses",
          price: 99.99,
          duration_days: 30,
          features: [
            "All Basic features",
            "Priority support",
            "Up to 20 users",
            "Advanced reporting",
            "API access"
          ],
          is_active: true
        },
        {
          id: "plan-3",
          name: "Enterprise Lifetime",
          description: "The complete solution for large organizations",
          price: 999.99,
          duration_days: null,
          features: [
            "All Pro features",
            "24/7 premium support",
            "Unlimited users",
            "Custom reporting",
            "Dedicated account manager",
            "White labeling",
            "Priority feature requests"
          ],
          is_active: true
        }
      ],
      // Add pricing_plans for the UI to use
      pricing_plans: [
        {
          id: "plan-1",
          name: "Basic Plan",
          description: "Perfect for small businesses and startups",
          price: 49.99,
          billing_cycle: "Monthly"
        },
        {
          id: "plan-2",
          name: "Pro Plan",
          description: "Ideal for growing businesses",
          price: 99.99,
          billing_cycle: "Monthly"
        },
        {
          id: "plan-3",
          name: "Enterprise Lifetime",
          description: "The complete solution for large organizations",
          price: 999.99,
          billing_cycle: "Lifetime"
        }
      ],
      created_at: "2023-01-01",
      updated_at: "2023-01-01",
      delivery: "Instant"
    };
    
    console.log("Returning mock software product:", mockProduct);
    return mockProduct;
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