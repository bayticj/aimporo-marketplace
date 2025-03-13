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
import DebugDescriptionDisplay from '@/components/DebugDescriptionDisplay';

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
  delivery: string;
  // Additional fields required by the component
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
  delivery: string;
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
      let fetchedProducts: Product[] = [];
      
      // Fetch gigs if type is 'all' or 'gig'
      if (type === 'all' || type === 'gig') {
        const gigs = await gigService.getGigs({
          search,
          min_price: priceRange[0],
          max_price: priceRange[1],
          sort_by: getSortField(sort),
          sort_order: getSortOrder(sort),
          page
        });
        
        if (gigs && gigs.data) {
          fetchedProducts = [...fetchedProducts, ...gigs.data];
        }
      }
      
      // Fetch digital products if type is 'all' or 'digital'
      if (type === 'all' || type === 'digital') {
        const digitalProducts = await getDigitalProducts({
          search,
          min_price: priceRange[0],
          max_price: priceRange[1],
          sort_by: getSortField(sort),
          sort_order: getSortOrder(sort),
          page
        });
        
        if (digitalProducts && digitalProducts.success && digitalProducts.data && digitalProducts.data.data) {
          // Ensure all digital products have "Instant" delivery
          const products = digitalProducts.data.data.map((product: any) => ({
            ...product,
            delivery: "Instant",
            type: 'digital' as const
          }));
          
          fetchedProducts = [...fetchedProducts, ...products];
        }
      }
      
      // Fetch software products if type is 'all' or 'software'
      if (type === 'all' || type === 'software') {
        const softwareProducts = await getSoftwareProducts({
          search,
          sort_by: getSortField(sort),
          sort_order: getSortOrder(sort),
          page
        });
        
        if (softwareProducts && softwareProducts.data) {
          // Ensure all software products have "Instant" delivery
          const products = softwareProducts.data.map((product: any) => ({
            ...product,
            delivery: "Instant",
            type: 'software' as const
          }));
          
          fetchedProducts = [...fetchedProducts, ...products];
        }
      }
      
      // If no products were fetched, use mock data
      if (fetchedProducts.length === 0) {
        let mockProducts: Product[] = [];
        
        if (type === 'all' || type === 'gig') {
          const mockGigs = getMockGigs();
          console.log('Mock Gigs Data (detailed):', JSON.stringify(mockGigs, null, 2));
          mockProducts = [...mockProducts, ...mockGigs];
        }
        
        if (type === 'all' || type === 'digital') {
          // Ensure all digital products have "Instant" delivery
          const digitalProducts = getMockDigitalProducts().map(product => ({
            ...product,
            delivery: "Instant"
          }));
          mockProducts = [...mockProducts, ...digitalProducts];
        }
        
        if (type === 'all' || type === 'software') {
          // Ensure all software products have "Instant" delivery
          const softwareProducts = getMockSoftwareProducts().map(product => ({
            ...product,
            delivery: "Instant"
          }));
          mockProducts = [...mockProducts, ...softwareProducts];
        }
        
        fetchedProducts = mockProducts;
      }
      
      // Apply client-side filtering and sorting
      let filteredProducts = fetchedProducts;
      
      // Filter by price range
      filteredProducts = filteredProducts.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      // Filter by search term
      if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
          product.title.toLowerCase().includes(searchLower)
        );
      }
      
      // Sort products
      filteredProducts = sortProducts(filteredProducts, sort);
      
      setProducts(filteredProducts);
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
      
      // Use mock data as fallback
      let mockProducts: Product[] = [];
      
      if (type === 'all' || type === 'gig') {
        mockProducts = [...mockProducts, ...getMockGigs()];
      }
      
      if (type === 'all' || type === 'digital') {
        // Ensure all digital products have "Instant" delivery
        const digitalProducts = getMockDigitalProducts().map(product => ({
          ...product,
          delivery: "Instant"
        }));
        mockProducts = [...mockProducts, ...digitalProducts];
      }
      
      if (type === 'all' || type === 'software') {
        // Ensure all software products have "Instant" delivery
        const softwareProducts = getMockSoftwareProducts().map(product => ({
          ...product,
          delivery: "Instant"
        }));
        mockProducts = [...mockProducts, ...softwareProducts];
      }
      
      // Apply client-side filtering and sorting
      let filteredProducts = mockProducts;
      
      // Filter by price range
      filteredProducts = filteredProducts.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      // Filter by search term
      if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
          product.title.toLowerCase().includes(searchLower)
        );
      }
      
      // Sort products
      filteredProducts = sortProducts(filteredProducts, sort);
      
      setProducts(filteredProducts);
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
      setCurrentPage(page);
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
        type: 'gig',
        description: "I will design a professional, modern, and unique logo for your business or brand. The package includes unlimited revisions, source files, and a quick turnaround time.",
        short_description: "Professional logo design for your business or brand.\nIncludes unlimited revisions and source files.\nQuick turnaround with modern and unique designs."
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
        delivery: "3 days",
        type: 'gig',
        description: "I will create a responsive WordPress website for your business or personal use. The package includes custom design, mobile optimization, and basic SEO setup.",
        short_description: "Custom responsive WordPress website development.\nMobile-optimized with modern design principles.\nIncludes basic SEO setup and configuration."
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
        type: 'gig',
        description: "I will manage your social media accounts and create engaging content to grow your audience. The package includes daily posts, audience engagement, and monthly performance reports.",
        short_description: "Strategic social media account management.\nDaily engaging content creation and posting.\nAudience growth with monthly performance reports."
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
        type: 'gig',
        description: "I will optimize your website for search engines to improve your rankings and drive more organic traffic. The package includes keyword research, on-page optimization, and technical SEO fixes.",
        short_description: "Comprehensive SEO optimization for higher rankings.\nIn-depth keyword research and on-page optimization.\nTechnical SEO fixes to drive more organic traffic."
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
        delivery: "Instant",
        user_id: 1,
        description: "A collection of templates for Instagram marketing. Includes story templates, post templates, and highlight covers. Perfect for businesses looking to improve their social media presence.",
        short_description: "Premium Instagram marketing templates collection.\nStory templates, post designs, and highlight covers.\nPerfect for enhancing your brand's social presence.",
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
        delivery: "Instant",
        user_id: 2,
        description: "A comprehensive Excel template for creating professional business plans. Includes financial projections, market analysis, and executive summary sections with automatic calculations and charts.",
        short_description: "Professional business plan Excel template suite.\nFinancial projections with automatic calculations.\nMarket analysis and executive summary sections.",
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
        delivery: "Instant",
        user_id: 3,
        description: "A professional set of Lightroom presets specifically designed for wedding photography. Includes 20 different styles from light and airy to dark and moody, perfect for any wedding atmosphere.",
        short_description: "20 professional Lightroom wedding presets.\nStyles ranging from light and airy to dark and moody.\nPerfect for enhancing any wedding photography.",
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
        delivery: "Instant",
        user_id: 4,
        description: "A comprehensive UI kit for e-commerce websites with over 200 components and 50 templates. Includes product cards, checkout flows, category pages, and more in both light and dark modes. Compatible with Figma, Sketch, and Adobe XD.",
        short_description: "Complete e-commerce UI kit with 200+ components and 50 templates for Figma, Sketch, and Adobe XD.",
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
        delivery: "Instant",
        name: "Cloud Storage Pro",
        slug: "cloud-storage-pro",
        description: "A secure and scalable cloud storage solution with advanced file management, automatic syncing across devices, and powerful sharing capabilities. Includes end-to-end encryption and version history for all your important files.",
        short_description: "Secure cloud storage with automatic syncing.\nPowerful sharing capabilities and file management.\nEnd-to-end encryption and version history.",
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
        delivery: "Instant",
        name: "Design Pro Suite",
        slug: "design-pro-suite",
        description: "A comprehensive design toolkit with powerful vector editing, photo manipulation, and typography tools. Includes thousands of templates, brushes, and assets to help you create professional designs for print, web, and social media.",
        short_description: "Comprehensive design toolkit with vector editing.\nPhoto manipulation and typography tools.\nThousands of templates, brushes, and assets.",
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
        delivery: "Instant",
        name: "SEO Analytics Tool",
        slug: "seo-analytics-tool",
        description: "Analyze your website's SEO performance with comprehensive tracking and reporting tools. Monitor keyword rankings, backlinks, site speed, and competitor analysis. Get actionable insights and recommendations to improve your search engine visibility.",
        short_description: "Comprehensive SEO performance tracking and reporting.\nMonitor keywords, backlinks, and competitor analysis.\nActionable insights to improve search visibility.",
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
        delivery: "Instant",
        name: "Project Management System",
        slug: "project-management-system",
        description: "Manage your projects efficiently with this all-in-one project management solution. Features include task tracking, team collaboration, Gantt charts, time tracking, resource allocation, and customizable workflows to fit any project methodology.",
        short_description: "All-in-one project management solution.\nTask tracking, team collaboration, and Gantt charts.\nCustomizable workflows for any project methodology.",
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
  
  // Sort products based on selected sort option
  useEffect(() => {
    if (products.length > 0) {
      const sorted = sortProducts(products, sortBy);
      setProducts(sorted);
      
      // Debug: Check if products have short descriptions
      console.log('Products with short descriptions check:', 
        products.map(product => ({
          id: product.id,
          title: product.title,
          type: product.type,
          short_description: product.type === 'gig' 
            ? (product as Gig).short_description 
            : product.type === 'digital' 
              ? (product as DigitalProduct).short_description 
              : (product as SoftwareProduct).short_description
        }))
      );
    }
  }, [sortBy, products]);
  
  // For demo purposes, if API fails, use mock data
  useEffect(() => {
    if (error) {
      console.log('Using mock data due to API error:', error);
      
      // Get mock data based on product type
      let mockProducts: Product[] = [];
      
      if (productType === 'all' || productType === 'gig') {
        const mockGigs = getMockGigs();
        console.log('Mock Gigs Data:', mockGigs);
        mockProducts = [...mockProducts, ...mockGigs];
      }
      
      if (productType === 'all' || productType === 'digital') {
        mockProducts = [...mockProducts, ...getMockDigitalProducts()];
      }
      
      if (productType === 'all' || productType === 'software') {
        mockProducts = [...mockProducts, ...getMockSoftwareProducts()];
      }
      
      // Apply client-side filtering and sorting
      let filteredProducts = mockProducts;
      
      // Filter by price range
      filteredProducts = filteredProducts.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
          product.title.toLowerCase().includes(searchLower)
        );
      }
      
      // Sort products
      filteredProducts = sortProducts(filteredProducts, sortBy);
      
      setProducts(filteredProducts);
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
      setCurrentPage(1);
    }
  }, [error, productType, priceRange, sortBy, searchTerm]);
  
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
        
        {/* Debug Description Display */}
        {products.length > 0 && (
          <DebugDescriptionDisplay products={products.slice(0, 4)} />
        )}
        
        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => {
              const isFavorite = favorites[`${product.type}-${product.id || index}`] || false;
              
              if (product.type === 'gig') {
                // Cast the product to Gig type and pass required props
                const gig = product as Gig;
                console.log('Rendering GigCard with data:', {
                  id: gig.id,
                  title: gig.title,
                  description: gig.description,
                  short_description: gig.short_description
                });
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
                      type="gig"
                      description={gig.description}
                      short_description={gig.short_description}
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