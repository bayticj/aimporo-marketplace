'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { gigService } from '@/services/api';
import { getDigitalProducts } from '@/services/digitalProductService';
import { getSoftwareProducts } from '@/services/softwareService';
import GigCard from '@/components/GigCard';
import DigitalProductCard from '@/components/DigitalProductCard';
import SoftwareProductCard from '@/components/SoftwareProductCard';
import PageBanner from '@/components/PageBanner';
import Pagination from '@/components/Pagination';

// Define interfaces for different product types
interface Gig {
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

// Simplified DigitalProduct interface for our marketplace
interface DigitalProduct {
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
  // Additional fields required by the component
  user_id: number;
  description: string;
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

// Simplified SoftwareProduct interface for our marketplace
interface SoftwareProduct {
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
  // Additional fields required by the component
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

// Union type for all product types
type Product = Gig | DigitalProduct | SoftwareProduct;

export default function MarketplacePage() {
  // State for all products
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<{[key: string]: boolean}>({});
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [productType, setProductType] = useState<'all' | 'gig' | 'digital' | 'software'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Initialize from URL params
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') as 'all' | 'gig' | 'digital' | 'software' || 'all';
    const minPrice = searchParams.get('min_price') ? parseInt(searchParams.get('min_price') as string) : 0;
    const maxPrice = searchParams.get('max_price') ? parseInt(searchParams.get('max_price') as string) : 1000;
    const sort = searchParams.get('sort') || 'newest';
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
    
    setSearchTerm(search);
    setProductType(type);
    setPriceRange([minPrice, maxPrice]);
    setSortBy(sort);
    setCurrentPage(page);
    
    // Load favorites from localStorage
    loadFavorites();
    
    // Fetch products
    fetchAllProducts(search, type, [minPrice, maxPrice], sort, page);
  }, [searchParams]);
  
  // Load favorites from localStorage
  const loadFavorites = () => {
    try {
      const gigFavorites = localStorage.getItem('favoriteGigs');
      const digitalFavorites = localStorage.getItem('favoriteDigitalProducts');
      const softwareFavorites = localStorage.getItem('favoriteSoftwareProducts');
      
      const favs: {[key: string]: boolean} = {};
      
      if (gigFavorites) {
        const parsedGigFavs = JSON.parse(gigFavorites);
        parsedGigFavs.forEach((isFav: boolean, index: number) => {
          if (isFav) favs[`gig-${index}`] = true;
        });
      }
      
      if (digitalFavorites) {
        const parsedDigitalFavs = JSON.parse(digitalFavorites);
        parsedDigitalFavs.forEach((id: number) => {
          favs[`digital-${id}`] = true;
        });
      }
      
      if (softwareFavorites) {
        const parsedSoftwareFavs = JSON.parse(softwareFavorites);
        parsedSoftwareFavs.forEach((id: number) => {
          favs[`software-${id}`] = true;
        });
      }
      
      setFavorites(favs);
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  };
  
  // Fetch all product types
  const fetchAllProducts = async (
    search: string, 
    type: 'all' | 'gig' | 'digital' | 'software', 
    priceRange: [number, number], 
    sort: string, 
    page: number
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      let allProducts: Product[] = [];
      
      // Fetch gigs if needed
      if (type === 'all' || type === 'gig') {
        try {
          const gigsResponse = await gigService.getGigs({
            page: page,
            search: search,
            min_price: priceRange[0],
            max_price: priceRange[1],
            sort_by: getSortField(sort),
            sort_order: getSortOrder(sort),
          });
          
          const gigs = (gigsResponse.data.gigs.data || []).map((gig: any) => ({
            ...gig,
            type: 'gig'
          }));
          
          allProducts = [...allProducts, ...gigs];
        } catch (err) {
          console.error('Error fetching gigs:', err);
          // Use mock data if API fails
          allProducts = [...allProducts, ...getMockGigs()];
        }
      }
      
      // Fetch digital products if needed
      if (type === 'all' || type === 'digital') {
        try {
          const digitalResponse = await getDigitalProducts({
            page: page,
            search: search,
            min_price: priceRange[0],
            max_price: priceRange[1],
            sort: sort,
          });
          
          // Check if digitalResponse.data is an object with a data property
          const digitalProductsData = digitalResponse.data && 
            typeof digitalResponse.data === 'object' && 
            'data' in digitalResponse.data 
              ? digitalResponse.data.data 
              : digitalResponse.data || [];
          
          const digitalProducts = Array.isArray(digitalProductsData) 
            ? digitalProductsData.map((product: any) => ({
                ...product,
                type: 'digital'
              }))
            : [];
          
          allProducts = [...allProducts, ...digitalProducts];
        } catch (err) {
          console.error('Error fetching digital products:', err);
          // Use mock data if API fails
          allProducts = [...allProducts, ...getMockDigitalProducts()];
        }
      }
      
      // Fetch software products if needed
      if (type === 'all' || type === 'software') {
        try {
          const softwareResponse = await getSoftwareProducts({
            page: page,
            search: search,
            sort_by: getSortField(sort),
            sort_order: getSortOrder(sort),
            // We can't use min_price and max_price directly as they're not in SoftwareProductParams
            // We'll filter by price after fetching
          });
          
          let softwareProducts = Array.isArray(softwareResponse.data) 
            ? softwareResponse.data.map((product: any) => ({
                ...product,
                type: 'software'
              }))
            : [];
          
          // Filter by price manually since the API doesn't support it
          if (priceRange[0] > 0 || priceRange[1] < 1000) {
            softwareProducts = softwareProducts.filter(
              (product: SoftwareProduct) => product.price >= priceRange[0] && product.price <= priceRange[1]
            );
          }
          
          allProducts = [...allProducts, ...softwareProducts];
        } catch (err) {
          console.error('Error fetching software products:', err);
          // Use mock data if API fails
          allProducts = [...allProducts, ...getMockSoftwareProducts()];
        }
      }
      
      // Sort combined results
      allProducts = sortProducts(allProducts, sort);
      
      // Paginate results
      const totalItems = allProducts.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedProducts = allProducts.slice(startIndex, endIndex);
      
      setProducts(paginatedProducts);
      setTotalPages(totalPages);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
      // Use mock data if everything fails
      const mockProducts = [...getMockGigs(), ...getMockDigitalProducts(), ...getMockSoftwareProducts()];
      setProducts(mockProducts.slice(0, itemsPerPage));
      setTotalPages(Math.ceil(mockProducts.length / itemsPerPage));
    } finally {
      setLoading(false);
    }
  };
  
  // Helper functions for sorting
  const getSortField = (sort: string) => {
    switch (sort) {
      case 'price_low':
      case 'price_high':
        return 'price';
      case 'rating':
        return 'rating';
      case 'newest':
        return 'created_at';
      default:
        return 'created_at';
    }
  };
  
  const getSortOrder = (sort: string) => {
    switch (sort) {
      case 'price_low':
        return 'asc';
      case 'price_high':
        return 'desc';
      case 'rating':
        return 'desc';
      case 'newest':
        return 'desc';
      default:
        return 'desc';
    }
  };
  
  // Sort combined products
  const sortProducts = (products: Product[], sort: string): Product[] => {
    return [...products].sort((a, b) => {
      switch (sort) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
        default:
          // For demo purposes, maintain current order for 'newest'
          return 0;
      }
    });
  };
  
  // Toggle favorite status
  const toggleFavorite = (product: Product, index: number) => {
    const productKey = `${product.type}-${product.id || index}`;
    const newFavorites = { ...favorites };
    
    newFavorites[productKey] = !newFavorites[productKey];
    setFavorites(newFavorites);
    
    // Update localStorage based on product type
    try {
      if (product.type === 'gig') {
        const gigFavorites = Array(products.filter(p => p.type === 'gig').length).fill(false);
        Object.keys(newFavorites).forEach(key => {
          if (key.startsWith('gig-')) {
            const idx = parseInt(key.split('-')[1]);
            if (!isNaN(idx)) gigFavorites[idx] = newFavorites[key];
          }
        });
        localStorage.setItem('favoriteGigs', JSON.stringify(gigFavorites));
      } else if (product.type === 'digital') {
        const digitalFavorites = Object.keys(newFavorites)
          .filter(key => key.startsWith('digital-') && newFavorites[key])
          .map(key => parseInt(key.split('-')[1]));
        localStorage.setItem('favoriteDigitalProducts', JSON.stringify(digitalFavorites));
      } else if (product.type === 'software') {
        const softwareFavorites = Object.keys(newFavorites)
          .filter(key => key.startsWith('software-') && newFavorites[key])
          .map(key => parseInt(key.split('-')[1]));
        localStorage.setItem('favoriteSoftwareProducts', JSON.stringify(softwareFavorites));
      }
    } catch (err) {
      console.error('Error saving favorites:', err);
    }
  };
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams({ search: searchTerm, page: 1 });
  };
  
  // Handle product type filter change
  const handleTypeChange = (type: 'all' | 'gig' | 'digital' | 'software') => {
    setProductType(type);
    updateUrlParams({ type, page: 1 });
  };
  
  // Handle price range filter change
  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    updateUrlParams({ min_price: range[0], max_price: range[1], page: 1 });
  };
  
  // Handle sort change
  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateUrlParams({ sort, page: 1 });
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrlParams({ page });
  };
  
  // Update URL parameters
  const updateUrlParams = (params: {[key: string]: any}) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value.toString());
      }
    });
    
    router.push(`/marketplace?${newParams.toString()}`);
  };
  
  // Reset all filters
  const handleReset = () => {
    setSearchTerm('');
    setProductType('all');
    setPriceRange([0, 1000]);
    setSortBy('newest');
    setCurrentPage(1);
    router.push('/marketplace');
  };
  
  // Mock data functions
  const getMockGigs = (): Gig[] => {
    return [
      {
        id: 1,
        title: "Professional Logo Design",
        price: 50,
        rating: 4.9,
        reviews: 120,
        images: ["/assets/img/gig-01.jpg"],
        seller: "DesignPro",
        location: "United States",
        badge: "Level 2",
        featured: true,
        delivery: "2 days",
        type: 'gig'
      },
      {
        id: 2,
        title: "WordPress Website Development",
        price: 120,
        rating: 4.8,
        reviews: 95,
        images: ["/assets/img/gig-02.jpg"],
        seller: "WebWizard",
        location: "Canada",
        badge: "Level 1",
        hot: true,
        delivery: "3 days",
        type: 'gig'
      },
      {
        id: 3,
        title: "Social Media Management",
        price: 80,
        rating: 4.7,
        reviews: 78,
        images: ["/assets/img/gig-03.jpg"],
        seller: "SocialGuru",
        location: "UK",
        badge: "Top Rated",
        delivery: "1 day",
        type: 'gig'
      },
      {
        id: 4,
        title: "SEO Optimization",
        price: 150,
        rating: 4.9,
        reviews: 112,
        images: ["/assets/img/gig-04.jpg"],
        seller: "SEOMaster",
        location: "Australia",
        badge: "Level 2",
        featured: true,
        delivery: "4 days",
        type: 'gig'
      }
    ];
  };
  
  const getMockDigitalProducts = (): DigitalProduct[] => {
    return [
      {
        id: 1,
        title: "Instagram Marketing Templates",
        price: 29,
        rating: 4.8,
        reviews: 85,
        image: "/assets/img/digital-product-01.jpg",
        seller: "SocialMediaPro",
        category: "Social Media",
        downloads: 1250,
        type: 'digital',
        user_id: 1,
        description: "A collection of templates for Instagram marketing",
        file_path: "/path/to/digital-product-01.jpg",
        file_name: "digital-product-01.jpg",
        file_size: "1.2MB",
        file_type: "image/jpeg",
        preview_path: "/path/to/digital-product-01-preview.jpg",
        download_limit: null,
        is_featured: true,
        status: "published",
        created_at: "2024-04-01T10:00:00",
        updated_at: "2024-04-01T10:00:00"
      },
      {
        id: 2,
        title: "Business Plan Excel Template",
        price: 39,
        rating: 4.7,
        reviews: 62,
        image: "/assets/img/digital-product-02.jpg",
        seller: "BusinessGuru",
        category: "Business",
        downloads: 980,
        type: 'digital',
        user_id: 2,
        description: "A template for creating a business plan",
        file_path: "/path/to/digital-product-02.xlsx",
        file_name: "business-plan-template.xlsx",
        file_size: "2.5MB",
        file_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        preview_path: "/path/to/digital-product-02-preview.jpg",
        download_limit: 5,
        is_featured: false,
        status: "published",
        created_at: "2024-04-02T11:00:00",
        updated_at: "2024-04-02T11:00:00"
      },
      {
        id: 3,
        title: "Wedding Photography Presets",
        price: 19,
        rating: 4.9,
        reviews: 124,
        image: "/assets/img/digital-product-03.jpg",
        seller: "PhotoMaster",
        category: "Photography",
        downloads: 2100,
        type: 'digital',
        user_id: 3,
        description: "A set of presets for wedding photography",
        file_path: "/path/to/digital-product-03.zip",
        file_name: "wedding-photography-presets.zip",
        file_size: "3.5MB",
        file_type: "application/zip",
        preview_path: "/path/to/digital-product-03-preview.jpg",
        download_limit: 10,
        is_featured: true,
        status: "published",
        created_at: "2024-04-03T12:00:00",
        updated_at: "2024-04-03T12:00:00"
      },
      {
        id: 4,
        title: "E-commerce UI Kit",
        price: 49,
        rating: 4.8,
        reviews: 93,
        image: "/assets/img/digital-product-04.jpg",
        seller: "UIDesigner",
        category: "Design",
        downloads: 1560,
        type: 'digital',
        user_id: 4,
        description: "A UI kit for e-commerce websites",
        file_path: "/path/to/digital-product-04.zip",
        file_name: "e-commerce-ui-kit.zip",
        file_size: "2.8MB",
        file_type: "application/zip",
        preview_path: "/path/to/digital-product-04-preview.jpg",
        download_limit: 20,
        is_featured: false,
        status: "published",
        created_at: "2024-04-04T13:00:00",
        updated_at: "2024-04-04T13:00:00"
      }
    ];
  };
  
  const getMockSoftwareProducts = (): SoftwareProduct[] => {
    return [
      {
        id: 1,
        title: "Cloud Storage Pro",
        price: 9.99,
        rating: 4.7,
        reviews: 230,
        image: "/assets/img/software/cloud-storage-1.jpg",
        partner: "CloudTech",
        category: "Storage",
        has_lifetime: false,
        type: 'software',
        name: "Cloud Storage Pro",
        slug: "cloud-storage-pro",
        description: "A powerful cloud storage solution",
        short_description: "Store and manage your files in the cloud",
        logo_path: "/path/to/cloud-storage-logo.png",
        screenshots: ["/path/to/cloud-storage-screenshot-1.jpg", "/path/to/cloud-storage-screenshot-2.jpg"],
        version: "1.0",
        partner_name: "CloudTech",
        is_active: true,
        plans: [
          {
            id: 1,
            name: "Basic",
            description: "500GB storage",
            price: 9.99,
            duration_days: 30,
            features: ["500GB storage", "1TB transfer"],
            is_active: true
          },
          {
            id: 2,
            name: "Standard",
            description: "2TB storage",
            price: 19.99,
            duration_days: 90,
            features: ["2TB storage", "2TB transfer"],
            is_active: true
          },
          {
            id: 3,
            name: "Premium",
            description: "5TB storage",
            price: 29.99,
            duration_days: 180,
            features: ["5TB storage", "5TB transfer"],
            is_active: true
          }
        ]
      },
      {
        id: 2,
        title: "Design Pro Suite",
        price: 49.99,
        rating: 4.9,
        reviews: 185,
        image: "/assets/img/software/design-pro-1.jpg",
        partner: "CreativeSoft",
        category: "Design",
        has_lifetime: true,
        type: 'software',
        name: "Design Pro Suite",
        slug: "design-pro-suite",
        description: "A comprehensive design toolkit",
        short_description: "Create stunning designs with ease",
        logo_path: "/path/to/design-pro-logo.png",
        screenshots: ["/path/to/design-pro-screenshot-1.jpg", "/path/to/design-pro-screenshot-2.jpg"],
        version: "2.0",
        partner_name: "CreativeSoft",
        is_active: true,
        plans: [
          {
            id: 1,
            name: "Basic",
            description: "Access to all design tools",
            price: 49.99,
            duration_days: null,
            features: ["Access to all design tools"],
            is_active: true
          },
          {
            id: 2,
            name: "Pro",
            description: "Advanced design features",
            price: 99.99,
            duration_days: null,
            features: ["Advanced design features"],
            is_active: true
          },
          {
            id: 3,
            name: "Ultimate",
            description: "Full design suite",
            price: 149.99,
            duration_days: null,
            features: ["Full design suite"],
            is_active: true
          }
        ]
      },
      {
        id: 3,
        title: "SEO Analytics Tool",
        price: 29.99,
        rating: 4.6,
        reviews: 142,
        image: "/assets/img/software/seo-analytics-1.jpg",
        partner: "MarketingPro",
        category: "Marketing",
        has_lifetime: false,
        type: 'software',
        name: "SEO Analytics Tool",
        slug: "seo-analytics-tool",
        description: "Analyze your website's SEO performance",
        short_description: "Track your website's SEO metrics",
        logo_path: "/path/to/seo-analytics-logo.png",
        screenshots: ["/path/to/seo-analytics-screenshot-1.jpg", "/path/to/seo-analytics-screenshot-2.jpg"],
        version: "1.0",
        partner_name: "MarketingPro",
        is_active: true,
        plans: [
          {
            id: 1,
            name: "Basic",
            description: "Track basic SEO metrics",
            price: 29.99,
            duration_days: 30,
            features: ["Track basic SEO metrics"],
            is_active: true
          },
          {
            id: 2,
            name: "Pro",
            description: "Track advanced SEO metrics",
            price: 49.99,
            duration_days: 90,
            features: ["Track advanced SEO metrics"],
            is_active: true
          },
          {
            id: 3,
            name: "Ultimate",
            description: "Track all SEO metrics",
            price: 69.99,
            duration_days: 180,
            features: ["Track all SEO metrics"],
            is_active: true
          }
        ]
      },
      {
        id: 4,
        title: "Project Management System",
        price: 19.99,
        rating: 4.8,
        reviews: 210,
        image: "/assets/img/software/project-management-1.jpg",
        partner: "TaskMaster",
        category: "Productivity",
        has_lifetime: true,
        type: 'software',
        name: "Project Management System",
        slug: "project-management-system",
        description: "Manage your projects efficiently",
        short_description: "Plan, organize, and track your projects",
        logo_path: "/path/to/project-management-logo.png",
        screenshots: ["/path/to/project-management-screenshot-1.jpg", "/path/to/project-management-screenshot-2.jpg"],
        version: "1.0",
        partner_name: "TaskMaster",
        is_active: true,
        plans: [
          {
            id: 1,
            name: "Basic",
            description: "Track basic project metrics",
            price: 19.99,
            duration_days: 30,
            features: ["Track basic project metrics"],
            is_active: true
          },
          {
            id: 2,
            name: "Pro",
            description: "Track advanced project metrics",
            price: 39.99,
            duration_days: 90,
            features: ["Track advanced project metrics"],
            is_active: true
          },
          {
            id: 3,
            name: "Ultimate",
            description: "Track all project metrics",
            price: 59.99,
            duration_days: 180,
            features: ["Track all project metrics"],
            is_active: true
          }
        ]
      }
    ];
  };
  
  return (
    <div className="bg-gray-50 py-8">
      <PageBanner 
        title="Marketplace" 
        subtitle="Browse all products and services in one place"
      />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4 mb-8">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex w-full max-w-4xl">
            <input
              type="text"
              placeholder="Search for products and services..."
              className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-orange-600 text-white p-3 rounded-r-lg hover:bg-orange-700 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>
          
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleTypeChange('all')}
                className={`px-4 py-2 rounded-full ${productType === 'all' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
              >
                All Products
              </button>
              <button
                onClick={() => handleTypeChange('gig')}
                className={`px-4 py-2 rounded-full ${productType === 'gig' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
              >
                Gigs
              </button>
              <button
                onClick={() => handleTypeChange('digital')}
                className={`px-4 py-2 rounded-full ${productType === 'digital' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
              >
                Digital Products
              </button>
              <button
                onClick={() => handleTypeChange('software')}
                className={`px-4 py-2 rounded-full ${productType === 'software' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
              >
                Software
              </button>
            </div>
            
            <div className="flex-grow"></div>
            
            <div className="flex items-center gap-2">
              <label className="text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            
            <button
              onClick={handleReset}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Reset Filters
            </button>
          </div>
          
          {/* Price Range Filter */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Price Range:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange([parseInt(e.target.value), priceRange[1]])}
                className="w-24 p-2 border border-gray-300 rounded-md"
              />
              <span>to</span>
              <input
                type="number"
                min={priceRange[0]}
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                className="w-24 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}
        
        {/* Results Count */}
        {!loading && !error && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {products.length} {products.length === 1 ? 'result' : 'results'}
            </p>
          </div>
        )}
        
        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => {
              const isFavorite = favorites[`${product.type}-${product.id || index}`] || false;
              
              if (product.type === 'gig') {
                // Cast the product to Gig type and pass required props
                const gig = product as Gig;
                return (
                  <div key={`gig-${gig.id}-${index}`} className="gig-card-wrapper">
                    {/* Use spread operator to pass all properties */}
                    <GigCard
                      id={gig.id}
                      title={gig.title}
                      price={gig.price}
                      rating={gig.rating}
                      reviews={gig.reviews}
                      images={gig.images}
                      seller={gig.seller}
                      location={gig.location}
                      badge={gig.badge}
                      featured={gig.featured}
                      hot={gig.hot}
                      delivery={gig.delivery}
                      isFavorite={isFavorite}
                      onToggleFavorite={() => toggleFavorite(product, index)}
                      status={gig.status}
                      pricing_tiers={gig.pricing_tiers}
                    />
                  </div>
                );
              } else if (product.type === 'digital') {
                // Cast the product to DigitalProduct type
                const digitalProduct = product as DigitalProduct;
                return (
                  <div key={`digital-${digitalProduct.id}-${index}`} className="digital-product-card-wrapper">
                    <DigitalProductCard
                      product={digitalProduct}
                      isFavorite={isFavorite}
                      onToggleFavorite={() => toggleFavorite(product, index)}
                    />
                  </div>
                );
              } else if (product.type === 'software') {
                // Cast the product to SoftwareProduct type and map to required props
                const softwareProduct = product as SoftwareProduct;
                return (
                  <div key={`software-${softwareProduct.id}-${index}`} className="software-product-card-wrapper">
                    <SoftwareProductCard
                      id={softwareProduct.id}
                      name={softwareProduct.name || softwareProduct.title}
                      slug={softwareProduct.slug || ''}
                      description={softwareProduct.description || ''}
                      short_description={softwareProduct.short_description || ''}
                      logo_path={softwareProduct.logo_path || softwareProduct.image}
                      screenshots={softwareProduct.screenshots || []}
                      version={softwareProduct.version || '1.0'}
                      partner_name={softwareProduct.partner_name || softwareProduct.partner}
                      is_active={softwareProduct.is_active !== false}
                      plans={softwareProduct.plans || []}
                      isFavorite={isFavorite}
                      onToggleFavorite={() => toggleFavorite(product, index)}
                    />
                  </div>
                );
              }
              
              return null;
            })}
          </div>
        )}
        
        {/* No Results */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No results found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
} 