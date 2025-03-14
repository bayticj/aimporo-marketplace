'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { gigService } from '@/services/api';
import GigCard from '@/components/GigCard';
import GigListItem from '@/components/GigListItem';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SlideableGigCards from '@/components/SlideableGigCards';

// Add CSS for gig cards
const gigCardStyles = `
  .gig-card-wrapper {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .gig-card-wrapper:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .gigs-card {
    border-radius: 8px;
    overflow: hidden;
    background: white;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .gigs-img {
    position: relative;
    overflow: hidden;
    height: 200px;
  }
  
  .gigs-badges {
    display: flex;
    gap: 0.5rem;
  }
  
  .gigs-content {
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  
  .gigs-title {
    margin-bottom: 0.5rem;
  }
  
  .gigs-card-footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .price-container {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
  }
  
  .price-amount {
    font-weight: 700;
    font-size: 1.25rem;
    color: #333;
  }
  
  .price-plan {
    font-size: 0.875rem;
    color: #444;
  }
  
  .price-original {
    font-size: 0.875rem;
    color: #666;
    text-decoration: line-through;
  }
  
  .discount-badge {
    background: #ff5722;
    color: white;
    font-size: 0.75rem;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    margin-left: 0.5rem;
  }
  
  .gig-actions {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 10;
  }
  
  .action-btn {
    background: white;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    color: #444;
    transition: all 0.2s ease;
  }
  
  .action-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  }
  
  .action-btn.fav-btn.active {
    color: #ff5353;
  }
  
  .gigs-pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  
  .pagination-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 0.25rem;
    border-radius: 0.375rem;
    font-weight: 500;
    transition: all 0.2s ease;
    color: #444;
  }
  
  .pagination-item:hover {
    background-color: #f3f4f6;
  }
  
  .pagination-item.active {
    background-color: #f97316;
    color: white;
  }
  
  .pagination-item.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .pagination-item.ellipsis {
    background-color: transparent;
  }
  
  .filter-dropdown-container {
    max-height: 300px;
    overflow-y: auto;
  }
  
  .filter-dropdown-container::-webkit-scrollbar {
    width: 6px;
  }
  
  .filter-dropdown-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .filter-dropdown-container::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
  }
  
  .filter-dropdown-container::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

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
  description: string;
  short_description: string;
  original_price?: number;
}

export default function GigsPage() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<boolean[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [deliveryTime, setDeliveryTime] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [sellerLevel, setSellerLevel] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const itemsPerPage = 9;
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentCategoryPage, setCurrentCategoryPage] = useState(0);
  const [budget, setBudget] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [showReviewsDropdown, setShowReviewsDropdown] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(499);
  const [showSellerDetailsDropdown, setShowSellerDetailsDropdown] = useState(false);
  const [selectedSellerLevels, setSelectedSellerLevels] = useState<string[]>([]);
  const [showDeliveryTimeDropdown, setShowDeliveryTimeDropdown] = useState(false);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<string>('');
  const [showAllFilters, setShowAllFilters] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [categoryCounts, setCategoryCounts] = useState<{[key: string]: number}>({});
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const loaderRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Define language options with dynamic counts
  const languageOptions = useMemo(() => [
    { id: 'english', name: 'English', count: 5 },
    { id: 'spanish', name: 'Spanish', count: 1 },
    { id: 'french', name: 'French', count: 0 }
  ], []);

  // Define online status count
  const onlineSellersCount = useMemo(() => 3, []);

  // Function to get category description
  const getCategoryDescription = (categoryId: string): string => {
    const descriptions: {[key: string]: string} = {
      'ai': 'Explore cutting-edge AI services from top-rated professionals specializing in machine learning, chatbots, and data analysis.',
      'business': 'Find expert business services including business plans, market research, financial analysis, and consulting.',
      'programming': 'Connect with skilled developers offering web development, mobile apps, custom software, and technical support.',
      'marketing': 'Boost your brand with professional digital marketing services including SEO, social media, content marketing, and PPC.',
      'design': 'Discover creative design services for logos, websites, graphics, illustrations, and branding materials.',
      'writing': 'Get high-quality content from professional writers offering blog posts, articles, copywriting, and translation services.',
      'video': 'Transform your ideas with professional video services including editing, animation, production, and motion graphics.',
      'music': 'Enhance your projects with professional audio services including voice overs, music composition, sound effects, and mixing.'
    };
    
    return descriptions[categoryId] || `Explore the best ${categories.find(c => c.id === categoryId)?.name || 'services'} from top-rated professionals.`;
  };

  // Define categories with initial counts that will be updated
  const categories = useMemo(() => [
    {
      id: 'ai',
      name: 'Artificial Intelligence',
      count: categoryCounts['ai'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'business',
      name: 'Business',
      count: categoryCounts['business'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'programming',
      name: 'Programming & Tech',
      count: categoryCounts['programming'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      id: 'marketing',
      name: 'Digital Marketing',
      count: categoryCounts['marketing'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      )
    },
    {
      id: 'design',
      name: 'Design & Creative',
      count: categoryCounts['design'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      id: 'writing',
      name: 'Writing & Translation',
      count: categoryCounts['writing'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      id: 'video',
      name: 'Video & Animation',
      count: categoryCounts['video'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'music',
      name: 'Music & Audio',
      count: categoryCounts['music'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    }
  ], [categoryCounts]);

  // Category data for dropdown
  const categoryOptions = [
    { id: 'programming', name: 'Programming & Coding', count: categoryCounts['programming'] || 0 },
    { id: 'data_science', name: 'Data Science & Analysis', count: categoryCounts['data_science'] || 0 },
    { id: 'databases', name: 'Databases', count: categoryCounts['databases'] || 0 },
    { id: 'mobile_app', name: 'Mobile App Development', count: categoryCounts['mobile_app'] || 0 },
    { id: 'email_template', name: 'Email Template Development', count: categoryCounts['email_template'] || 0 },
    { id: 'cms', name: 'CMS Development', count: categoryCounts['cms'] || 0 },
    { id: 'web_development', name: 'Web Development', count: categoryCounts['web_development'] || 0 },
    { id: 'ui_ux', name: 'UI/UX Design', count: categoryCounts['ui_ux'] || 0 },
    { id: 'graphic_design', name: 'Graphic Design', count: categoryCounts['graphic_design'] || 0 },
    { id: 'digital_marketing', name: 'Digital Marketing', count: categoryCounts['digital_marketing'] || 0 },
    { id: 'seo', name: 'SEO Optimization', count: categoryCounts['seo'] || 0 },
    { id: 'content_writing', name: 'Content Writing', count: categoryCounts['content_writing'] || 0 },
  ];

  // Calculate total number of category pages (showing 4 categories per page)
  const totalCategoryPages = Math.ceil(categories.length / 4);

  // Get current categories to display (4 per page)
  const currentCategories = useMemo(() => {
    const startIndex = currentCategoryPage * 4;
    return categories.slice(startIndex, startIndex + 4);
  }, [currentCategoryPage, categories]);

  // Handle category navigation
  const handlePrevCategories = useCallback(() => {
    setCurrentCategoryPage(prev => (prev > 0 ? prev - 1 : totalCategoryPages - 1));
  }, [totalCategoryPages]);

  const handleNextCategories = useCallback(() => {
    setCurrentCategoryPage(prev => (prev < totalCategoryPages - 1 ? prev + 1 : 0));
  }, [totalCategoryPages]);

  // Handle category click
  const handleCategoryClick = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setCategory(categoryId); // Update the category filter state
    
    // Update URL with the selected category
    const categoryName = categories.find(c => c.id === categoryId)?.name || '';
    const url = `/gigs?category=${categoryId}${categoryName ? `&name=${encodeURIComponent(categoryName)}` : ''}`;
    router.push(url);
  }, [categories, router]);

  // Handle category selection
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // Reset category selection
  const resetCategories = () => {
    setSelectedCategories([]);
    setCategorySearchTerm('');
  };

  // Apply category filter
  const applyCategories = () => {
    setShowCategoryDropdown(false);
    // Here you would typically update URL params or filter products
    // For now, we'll just close the dropdown
  };

  // Filter categories by search term
  const filteredCategories = categoryOptions.filter(category => 
    category.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
  );

  // Define rating options
  const ratingOptions = [
    { value: '5.0', label: '5.0', stars: 5 },
    { value: '4.0', label: '4.0', stars: 4 },
    { value: '3.0', label: '3.0', stars: 3 },
    { value: '2.0', label: '2.0', stars: 2 },
    { value: '1.0', label: '1.0', stars: 1 },
  ];

  // Handle rating selection
  const handleRatingToggle = (rating: string) => {
    setSelectedRatings(prev => {
      if (prev.includes(rating)) {
        return prev.filter(r => r !== rating);
      } else {
        return [...prev, rating];
      }
    });
  };

  // Reset ratings
  const resetRatings = () => {
    setSelectedRatings([]);
  };

  // Apply ratings filter
  const applyRatings = () => {
    setShowReviewsDropdown(false);
    // Here you would typically update URL params or filter products
  };

  // Handle budget slider changes
  const handlePriceRangeChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  // Reset budget
  const resetBudget = () => {
    setMinPrice(0);
    setMaxPrice(499);
  };

  // Apply budget filter
  const applyBudget = () => {
    setPriceRange([minPrice, maxPrice]);
    setShowBudgetDropdown(false);
    // Here you would typically update URL params or filter products
  };

  // Define seller level options
  const sellerLevelOptions = useMemo(() => [
    { id: 'top_rated', name: 'Top Rated Seller', count: 1 },
    { id: 'level_two', name: 'Level 2 Seller', count: 2 },
    { id: 'level_one', name: 'Level 1 Seller', count: 2 },
    { id: 'new_seller', name: 'New Seller', count: 1 }
  ], []);

  // Handle seller level selection
  const handleSellerLevelToggle = (levelId: string) => {
    setSelectedSellerLevels(prev => {
      if (prev.includes(levelId)) {
        return prev.filter(id => id !== levelId);
      } else {
        return [...prev, levelId];
      }
    });
  };

  // Reset seller levels
  const resetSellerLevels = () => {
    setSelectedSellerLevels([]);
  };

  // Apply seller levels filter
  const applySellerLevels = () => {
    setShowSellerDetailsDropdown(false);
    // Here you would typically update URL params or filter products
  };

  // Define delivery time options
  const deliveryTimeOptions = [
    { id: '24h', name: 'Enter 24H' },
    { id: '3days', name: 'Upto 3 days' },
    { id: '7days', name: 'Upto 7 days' },
    { id: 'anytime', name: 'Anytime' }
  ];

  // Reset delivery time
  const resetDeliveryTime = () => {
    setSelectedDeliveryTime('');
  };

  // Apply delivery time filter
  const applyDeliveryTime = () => {
    setShowDeliveryTimeDropdown(false);
    // Here you would typically update URL params or filter products
  };

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoadingMore) {
        loadMoreGigs();
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, isLoadingMore, gigs]);

  // Function to load more gigs
  const loadMoreGigs = async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    
    try {
      const response = await gigService.getGigs({
        page: nextPage,
        search: searchTerm,
        category_id: category, // Ensure category is passed to API
        min_price: priceRange[0],
        max_price: priceRange[1],
        delivery_time: deliveryTime > 0 ? deliveryTime : undefined,
        sort_by: getSortField(),
        sort_order: getSortOrder(),
      });
      
      const newGigs = response.data.gigs.data || [];
      
      if (newGigs.length === 0) {
        setHasMore(false);
      } else {
        setGigs(prevGigs => [...prevGigs, ...newGigs]);
        setCurrentPage(nextPage);
        
        // Initialize favorites for new gigs
        const savedFavorites = getSavedFavorites([...gigs, ...newGigs]);
        setFavorites(savedFavorites);
      }
    } catch (err) {
      console.error('Error loading more gigs:', err);
      
      // If using sample data, load more sample gigs based on category
      if (error) {
        loadMoreSampleGigs(nextPage);
      }
    } finally {
      setIsLoadingMore(false);
    }
  };
  
  // Function to load more sample gigs when API fails
  const loadMoreSampleGigs = (page: number) => {
    // This function simulates loading more gigs from sample data
    // It's only used when the API fails and we're in sample mode
    
    // For demo purposes, we'll just set hasMore to false
    // In a real implementation, you would load more sample gigs based on the category
    setHasMore(false);
  };

  // Read URL parameters on page load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get('category');
      
      if (categoryParam) {
        setSelectedCategory(categoryParam);
        setCategory(categoryParam);
        
        // If we have category counts, update the page title
        if (categoryCounts && Object.keys(categoryCounts).length > 0) {
          document.title = `${categories.find(c => c.id === categoryParam)?.name || 'Services'} - ${categoryCounts[categoryParam] || 0} Services`;
        }
      }
    }
  }, [categoryCounts, categories]);

  // Fetch category counts
  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        setLoadingCategories(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // This would normally come from an API
        const counts = {
          all: 12,
          design: 1,
          programming: 2,
          marketing: 2,
          video: 1,
          music: 2,
          business: 1,
          writing: 1,
          ai: 2, // Added AI category count
        };
        
        setCategoryCounts(counts);
        setLoadingCategories(false);
        return counts;
      } catch (error) {
        console.error('Error fetching category counts:', error);
        // Fallback data
        const fallbackCounts = {
          all: 12,
          design: 1,
          programming: 2,
          marketing: 2,
          video: 1,
          music: 2,
          business: 1,
          writing: 1,
          ai: 2, // Added AI category count
        };
        setCategoryCounts(fallbackCounts);
        setLoadingCategories(false);
        return fallbackCounts;
      }
    };

    fetchCategoryCounts();
  }, []);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        setHasMore(true); // Reset hasMore when filters change
        setCurrentPage(1); // Reset to first page when filters change
        
        const response = await gigService.getGigs({
          page: 1, // Always start from page 1 when filters change
          search: searchTerm,
          category_id: category,
          min_price: priceRange[0],
          max_price: priceRange[1],
          delivery_time: deliveryTime > 0 ? deliveryTime : undefined,
          sort_by: getSortField(),
          sort_order: getSortOrder(),
        });
        
        const fetchedGigs = response.data.gigs.data || [];
        setGigs(fetchedGigs);
        setTotalPages(Math.ceil((response.data.gigs.total || 0) / itemsPerPage));
        
        // If we got fewer gigs than the page size, there are no more to load
        if (fetchedGigs.length < itemsPerPage) {
          setHasMore(false);
        }
        
        // Initialize favorites from localStorage if available
        const savedFavorites = getSavedFavorites(fetchedGigs);
        setFavorites(savedFavorites);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch gigs');
        // For demo purposes, use sample data if API fails
        useSampleData();
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [searchTerm, category, priceRange, deliveryTime, sortBy]); // Removed currentPage from dependencies

  const getSortField = () => {
    switch (sortBy) {
      case 'price_low':
      case 'price_high':
        return 'price';
      case 'rating':
        return 'average_rating';
      default:
        return 'created_at';
    }
  };

  const getSortOrder = () => {
    switch (sortBy) {
      case 'price_low':
        return 'asc';
      case 'price_high':
      case 'rating':
        return 'desc';
      case 'oldest':
        return 'asc';
      default:
        return 'desc';
    }
  };

  // Get saved favorites from localStorage
  const getSavedFavorites = (currentGigs: Gig[]) => {
    if (typeof window === 'undefined') return new Array(currentGigs.length).fill(false);
    
    try {
      const savedFavoritesJson = localStorage.getItem('favoriteGigs');
      if (!savedFavoritesJson) return new Array(currentGigs.length).fill(false);
      
      const savedFavoriteIds = JSON.parse(savedFavoritesJson) as number[];
      return currentGigs.map(gig => savedFavoriteIds.includes(gig.id));
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return new Array(currentGigs.length).fill(false);
    }
  };

  // Save favorites to localStorage
  const saveFavoritesToStorage = (newFavorites: boolean[]) => {
    if (typeof window === 'undefined') return;
    
    try {
      const favoriteIds = gigs
        .filter((_, index) => newFavorites[index])
        .map(gig => gig.id);
      
      localStorage.setItem('favoriteGigs', JSON.stringify(favoriteIds));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  };

  // For demo purposes, if API fails, use sample data
  const useSampleData = () => {
    console.log('Using sample data due to API error:', error);
    
    // Define all sample gigs with appropriate categories
    const allSampleGigs: Gig[] = [
      {
        id: 1,
        title: 'Professional Logo Design',
        price: 49.99,
        rating: 4.8,
        reviews: 124,
        images: ['/assets/img/banner-img.png', '/assets/img/banner-img.png'],
        seller: 'CreativeStudio',
        location: 'New York',
        badge: 'Design & Creative',
        featured: true,
        hot: true,
        delivery: '1 day',
        status: 'published' as const,
        pricing_tiers: {
          basic: {
            title: 'Basic Logo',
            description: 'Simple logo design with 2 revisions',
            price: 49.99,
            delivery_time: '1',
            revisions: '2',
            features: ['2 Concepts', 'JPG and PNG files', 'Logo only']
          },
          standard: {
            title: 'Standard Logo',
            description: 'Professional logo design with 5 revisions',
            price: 99.99,
            delivery_time: '2',
            revisions: '5',
            features: ['5 Concepts', 'All file formats', 'Source files', 'Social media kit']
          },
          premium: {
            title: 'Premium Logo',
            description: 'Premium logo design with unlimited revisions',
            price: 199.99,
            delivery_time: '3',
            revisions: 'Unlimited',
            features: ['10 Concepts', 'All file formats', 'Source files', 'Social media kit', 'Brand guidelines', 'Stationery design']
          }
        },
        description: 'A professional logo design service that delivers high-quality, custom logos for your business or brand. Our service includes multiple concepts, revisions, and all the file formats you need.',
        short_description: 'Professional custom logo design.\nMultiple concepts and revisions.\nAll file formats included.'
      },
      {
        id: 2,
        title: 'WordPress Website Development',
        price: 199.99,
        rating: 4.9,
        reviews: 89,
        images: ['/assets/img/banner-img.png', '/assets/img/banner-img.png'],
        seller: 'WebWizards',
        location: 'London',
        badge: 'Programming & Tech',
        hot: true,
        delivery: '2 days',
        status: 'published' as const,
        description: 'A professional website development service that creates responsive, SEO-friendly WordPress websites tailored to your business needs.',
        short_description: 'Custom WordPress website development.\nResponsive and SEO-friendly design.\nComplete setup and configuration.'
      },
      {
        id: 3,
        title: 'SEO Optimization Package',
        price: 149.99,
        rating: 4.7,
        reviews: 67,
        images: ['/assets/img/banner-img.png', '/assets/img/banner-img.png'],
        seller: 'RankBooster',
        location: 'Canada',
        badge: 'Digital Marketing',
        featured: true,
        delivery: '1 day',
        status: 'draft' as const,
        description: 'An SEO optimization package that improves your website\'s search engine rankings through keyword research, on-page optimization, and backlink building.',
        short_description: 'Complete SEO optimization package.\nKeyword research and implementation.\nOn-page SEO and backlink building.'
      },
      {
        id: 4,
        title: 'Social Media Content Creation',
        price: 99.99,
        rating: 4.6,
        reviews: 52,
        images: ['/assets/img/banner-img.png', '/assets/img/banner-img.png'],
        seller: 'ViralVision',
        location: 'Australia',
        badge: 'Digital Marketing',
        delivery: '2 days',
        status: 'published' as const,
        description: 'A social media content creation service that produces engaging posts, graphics, and captions for your business social media accounts.',
        short_description: 'Professional social media content.\nEngaging posts and graphics.\nOptimized for audience growth.'
      },
      {
        id: 5,
        title: 'Professional Video Editing',
        price: 149.99,
        rating: 4.8,
        reviews: 78,
        images: ['/assets/img/banner-img.png', '/assets/img/banner-img.png'],
        seller: 'VideoMaster',
        location: 'United States',
        badge: 'Video & Animation',
        delivery: '2 days',
        status: 'published' as const,
        description: 'Professional video editing service that transforms your raw footage into polished, engaging videos with color correction, transitions, and effects.',
        short_description: 'High-quality video editing service.\nColor correction and visual effects.\nProfessional transitions and audio mixing.'
      },
      {
        id: 6,
        title: 'Mobile App Development',
        price: 299.99,
        rating: 4.9,
        reviews: 112,
        images: ['/assets/img/banner-img.png', '/assets/img/banner-img.png'],
        seller: 'AppDeveloper',
        location: 'Germany',
        badge: 'Programming & Tech',
        featured: true,
        delivery: '7 days',
        status: 'published' as const,
        description: 'Comprehensive mobile app development service that creates custom, user-friendly applications for iOS and Android platforms with ongoing support.',
        short_description: 'Custom mobile app development.\nNative iOS and Android applications.\nUser-friendly interface and ongoing support.'
      },
      // AI Services
      {
        id: 7,
        title: 'AI Chatbot Development',
        price: 249.99,
        rating: 4.7,
        reviews: 42,
        images: ['/assets/img/banner-img.png', '/assets/img/banner-img.png'],
        seller: 'AIExpert',
        location: 'San Francisco',
        badge: 'Artificial Intelligence',
        featured: true,
        delivery: '5 days',
        status: 'published' as const,
        description: 'Custom AI chatbot development service that creates intelligent, conversational bots for customer service, lead generation, or information delivery.',
        short_description: 'Custom AI chatbot development.\nIntelligent conversation flows.\nSeamless integration with your platforms.'
      },
      {
        id: 8,
        title: 'Machine Learning Model Training',
        price: 349.99,
        rating: 4.8,
        reviews: 36,
        images: ['/assets/img/banner-img.png', '/assets/img/banner-img.png'],
        seller: 'DataScientist',
        location: 'Boston',
        badge: 'Artificial Intelligence',
        hot: true,
        delivery: '7 days',
        status: 'published' as const,
        description: 'Professional machine learning model training service that develops custom AI solutions using your data for prediction, classification, or automation tasks.',
        short_description: 'Custom machine learning model training.\nData preprocessing and feature engineering.\nModel deployment and performance monitoring.'
      },
      // Business Services
      {
        id: 9,
        title: 'Business Plan Development',
        price: 199.99,
        rating: 4.6,
        reviews: 58,
        images: ['/assets/img/banner-img.png', '/assets/img/banner-img.png'],
        seller: 'BizStrategy',
        location: 'Germany',
        badge: 'Business',
        featured: true,
        delivery: '3 days',
        status: 'published' as const,
        description: 'Comprehensive business plan development service that creates detailed, investor-ready business plans with market analysis and financial projections.',
        short_description: 'Investor-ready business plan development.\nDetailed market analysis and strategy.\nComprehensive financial projections.'
      },
      // Music & Audio
      {
        id: 10,
        title: 'Professional Voice Over',
        price: 79.99,
        rating: 4.9,
        reviews: 92,
        images: ['/assets/img/banner-img.png', '/assets/img/banner-img.png'],
        seller: 'VoiceArtist',
        location: 'United Kingdom',
        badge: 'Music & Audio',
        hot: true,
        delivery: '1 day',
        status: 'published' as const,
        description: 'Professional voice over service that provides clear, engaging narration for your commercials, explainer videos, or other audio content.',
        short_description: 'Professional voice over recording.\nClear, engaging narration.\nQuick turnaround and revisions included.'
      },
      {
        id: 11,
        title: 'Custom Music Composition',
        price: 149.99,
        rating: 4.7,
        reviews: 63,
        images: ['/assets/img/banner-img.png', '/assets/img/banner-img.png'],
        seller: 'MusicMaestro',
        location: 'Italy',
        badge: 'Music & Audio',
        delivery: '4 days',
        status: 'published' as const,
        description: 'Custom music composition service that creates original, royalty-free music tracks tailored to your project needs and preferences.',
        short_description: 'Original music composition service.\nCustom tracks for your specific project.\nRoyalty-free with full commercial rights.'
      },
      // Writing & Translation
      {
        id: 12,
        title: 'Content Writing Services',
        price: 89.99,
        rating: 4.6,
        reviews: 74,
        images: ['/assets/img/banner-img.png', '/assets/img/banner-img.png'],
        seller: 'WordSmith',
        location: 'Canada',
        badge: 'Writing & Translation',
        delivery: '2 days',
        status: 'published' as const,
        description: 'Professional content writing service that creates engaging, SEO-optimized articles, blog posts, and website copy for your business.',
        short_description: 'SEO-optimized content writing.\nEngaging articles and blog posts.\nProfessional website copy and marketing materials.'
      }
    ];
    
    // Filter gigs based on selected category
    let filteredGigs: Gig[] = [];
    
    // Map category IDs to badge names for filtering
    const categoryToBadgeMap: {[key: string]: string} = {
      'ai': 'Artificial Intelligence',
      'business': 'Business',
      'programming': 'Programming & Tech',
      'marketing': 'Digital Marketing',
      'design': 'Design & Creative',
      'writing': 'Writing & Translation',
      'video': 'Video & Animation',
      'music': 'Music & Audio'
    };
    
    if (category) {
      const badgeName = categoryToBadgeMap[category];
      
      if (badgeName) {
        filteredGigs = allSampleGigs.filter(gig => gig.badge === badgeName);
      }
      
      // If no gigs found for the category, show a message
      if (filteredGigs.length === 0) {
        console.log(`No sample gigs found for category: ${category}`);
        // Use all gigs as fallback
        filteredGigs = allSampleGigs;
      }
    } else {
      // If no category selected, use all gigs
      filteredGigs = allSampleGigs;
    }
    
    setGigs(filteredGigs);
    
    // Initialize favorites from localStorage for sample data
    const savedFavorites = getSavedFavorites(filteredGigs);
    setFavorites(savedFavorites);
    
    setTotalPages(Math.ceil(filteredGigs.length / itemsPerPage));
    setHasMore(false); // No more data to load in sample mode
    
    // Update category counts based on actual sample data
    const sampleCategoryCounts: {[key: string]: number} = {};
    
    // Initialize all categories to 0
    Object.keys(categoryToBadgeMap).forEach(categoryId => {
      sampleCategoryCounts[categoryId] = 0;
    });
    
    // Count gigs per category
    allSampleGigs.forEach(gig => {
      // Find the category ID for this badge
      const categoryId = Object.entries(categoryToBadgeMap).find(
        ([_, badgeName]) => badgeName === gig.badge
      )?.[0];
      
      if (categoryId) {
        sampleCategoryCounts[categoryId] = (sampleCategoryCounts[categoryId] || 0) + 1;
      }
    });
    
    // Update category counts
    setCategoryCounts(sampleCategoryCounts);
  };

  // Function to handle toggling favorites
  const toggleFavorite = (index: number) => {
    setFavorites(prev => {
      const newFavorites = [...prev];
      newFavorites[index] = !newFavorites[index];
      
      // Save updated favorites to localStorage
      saveFavoritesToStorage(newFavorites);
      
      return newFavorites;
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  // Function to generate pagination range with ellipsis
  const getPaginationRange = (current: number, total: number): (number | string)[] => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    if (current <= 3) {
      return [1, 2, 3, 4, '...', total - 1, total];
    }
    
    if (current >= total - 2) {
      return [1, 2, '...', total - 3, total - 2, total - 1, total];
    }
    
    return [1, '...', current - 1, current, current + 1, '...', total];
  };

  // Reset all filters
  const handleReset = useCallback(() => {
    setSearchTerm('');
    setCategory('');
    setPriceRange([0, 1000]);
    setDeliveryTime(0);
    setSortBy('recommended');
    setCurrentPage(1);
    setHasMore(true);
    setShowFavoritesOnly(false);
    setRating(0);
    setSellerLevel('');
    setSelectedCategories([]);
    setCategorySearchTerm('');
    setSelectedRatings([]);
    setShowBudgetDropdown(false);
    resetBudget();
    setSelectedSellerLevels([]);
    setShowSellerDetailsDropdown(false);
    setSelectedDeliveryTime('');
    setShowDeliveryTimeDropdown(false);
  }, []);

  // Enhanced filtering logic with useMemo for better performance
  const filteredGigs = useMemo(() => {
    let filtered = [...gigs];
    
    // Filter by favorites if needed
    if (showFavoritesOnly) {
      filtered = filtered.filter((_, index) => favorites[index]);
    }
    
    // Filter by minimum rating
    if (rating > 0) {
      filtered = filtered.filter(gig => gig.rating >= rating);
    }
    
    // Filter by seller level (for demo purposes)
    if (sellerLevel) {
      // This is a mock filter since we don't have seller level in our data model yet
      // In a real implementation, we would filter based on actual seller level data
      filtered = filtered.filter(gig => {
        const sellerRating = gig.rating;
        switch(sellerLevel) {
          case 'top_rated':
            return sellerRating >= 4.8;
          case 'level_2':
            return sellerRating >= 4.5 && sellerRating < 4.8;
          case 'level_1':
            return sellerRating >= 4.0 && sellerRating < 4.5;
          default:
            return true;
        }
      });
    }
    
    return filtered;
  }, [gigs, favorites, showFavoritesOnly, rating, sellerLevel]);

  // Handle click outside to close category dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showCategoryDropdown && !target.closest('.category-dropdown-container')) {
        setShowCategoryDropdown(false);
      }
      if (showReviewsDropdown && !target.closest('.reviews-dropdown-container')) {
        setShowReviewsDropdown(false);
      }
      if (showBudgetDropdown && !target.closest('.budget-dropdown-container')) {
        setShowBudgetDropdown(false);
      }
      if (showSellerDetailsDropdown && !target.closest('.seller-details-dropdown-container')) {
        setShowSellerDetailsDropdown(false);
      }
      if (showDeliveryTimeDropdown && !target.closest('.delivery-time-dropdown-container')) {
        setShowDeliveryTimeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategoryDropdown, showReviewsDropdown, showBudgetDropdown, showSellerDetailsDropdown, showDeliveryTimeDropdown]);

  // Function to get category name from category ID
  const getCategoryName = (categoryId: string): string => {
    const categoryMap: {[key: string]: string} = {
      'ai': 'Artificial Intelligence',
      'business': 'Business',
      'programming': 'Programming & Tech',
      'marketing': 'Digital Marketing',
      'design': 'Graphics & Design',
      'writing': 'Writing & Translation',
      'video': 'Video & Animation',
      'music': 'Music & Audio'
    };
    
    return categoryMap[categoryId] || 'All Categories';
  };

  return (
    <div className="gigs-page bg-gray-50 min-h-screen pb-16">
      <style jsx global>{gigCardStyles}</style>
      
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-gray-700 hover:text-orange-500">
              Home
            </Link>
            <span className="mx-2 text-gray-700">›</span>
            <Link href="/gigs" className="text-gray-700 hover:text-orange-500">
              Gigs
            </Link>
            {selectedCategory && (
              <>
                <span className="mx-2 text-gray-700">›</span>
                <span className="text-gray-800 font-medium">
                  {categories.find(c => c.id === selectedCategory)?.name || 'Category'}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gray-100 py-8 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Browse {selectedCategory ? 
              categories.find(c => c.id === selectedCategory)?.name || 'Services' : 
              'Digital Marketing Services'} <span className="text-orange-500">
                {selectedCategory ? 
                  `" ${categoryCounts[selectedCategory] || 0} ${categoryCounts[selectedCategory] === 1 ? 'Service' : 'Services'} "` : 
                  `" ${gigs.length > 0 ? `${gigs.length}` : '6'} Services "`}
              </span>
          </h1>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-16 mb-8">
        <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-orange-500 to-blue-600 rounded-bl-[100px]"></div>
        </div>
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h2 className="text-4xl font-bold mb-4">
            {selectedCategory ? 
              categories.find(c => c.id === selectedCategory)?.name || 'Services' : 
              'Digital Marketing'}
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            {selectedCategory ? 
              getCategoryDescription(selectedCategory) : 
              'Digital marketing is an essential component of modern business, given the widespread use of the internet and digital devices.'}
          </p>
        </div>
      </div>

      {/* Trending Categories */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Trending Categories {selectedCategory ? 
              `in ${categories.find(c => c.id === selectedCategory)?.name || 'Services'}` : 
              'on Digital Marketing'}
          </h2>
          <div className="flex space-x-2">
            <button 
              onClick={handlePrevCategories}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              aria-label="Previous categories"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNextCategories}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              aria-label="Next categories"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loadingCategories ? (
            // Loading skeleton for categories
            Array.from({ length: 4 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between animate-pulse">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : (
            currentCategories.map((category) => (
              <div 
                key={category.id}
                className={`bg-white rounded-lg shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer ${
                  selectedCategory === category.id ? 'ring-2 ring-orange-500' : ''
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 flex items-center justify-center ${
                    selectedCategory === category.id ? 'bg-orange-500 text-white' : 'bg-orange-100'
                  } rounded-lg mr-4`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      selectedCategory === category.id ? 'text-orange-500' : 'text-gray-800'
                    }`}>{category.name}</h3>
                    <p className="text-sm text-gray-700">
                      ({category.count.toLocaleString()} {category.count === 1 ? 'Service' : 'Services'})
                    </p>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${
                  selectedCategory === category.id ? 'text-orange-500' : 'text-gray-400'
                }`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Categories Dropdown */}
          <div className="relative category-dropdown-container">
            <button 
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center space-x-1 bg-white px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <span className="text-gray-700">Categories {selectedCategories.length > 0 && `(${selectedCategories.length})`}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {showCategoryDropdown && (
              <div className="absolute z-50 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 border category-dropdown-container">
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Search Category"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    value={categorySearchTerm}
                    onChange={(e) => setCategorySearchTerm(e.target.value)}
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <div className="space-y-2">
                    {filteredCategories.map(category => (
                      <label key={category.id} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            className="form-checkbox h-4 w-4 text-orange-500" 
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleCategoryToggle(category.id)}
                          />
                          <span className="text-gray-700">{category.name}</span>
                        </div>
                        <span className="text-gray-700 text-sm">({category.count})</span>
                      </label>
                    ))}
                  </div>
                  {categoryOptions.length > filteredCategories.length && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <button 
                        className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                        onClick={() => setCategorySearchTerm('')}
                      >
                        Show All Categories
                      </button>
                    </div>
                  )}
                  {filteredCategories.length === 0 && (
                    <div className="py-2 text-center text-gray-700">
                      No categories found
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
                  <button 
                    className="text-gray-700 hover:text-gray-800 text-sm font-medium"
                    onClick={resetCategories}
                  >
                    Reset
                  </button>
                  <button 
                    className="bg-orange-500 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-orange-600"
                    onClick={applyCategories}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reviews Dropdown */}
          <div className="relative reviews-dropdown-container">
            <button 
              onClick={() => setShowReviewsDropdown(!showReviewsDropdown)}
              className="flex items-center space-x-1 bg-white px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="text-gray-700">Reviews</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {showReviewsDropdown && (
              <div className="absolute left-0 z-50 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 border reviews-dropdown-container">
                <div className="space-y-3">
                  {ratingOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-orange-500 rounded" 
                        checked={selectedRatings.includes(option.value)}
                        onChange={() => handleRatingToggle(option.value)}
                      />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 ${i < option.stars ? 'text-yellow-400' : 'text-gray-300'}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-gray-700 font-medium">({option.label})</span>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between mt-6 pt-3 border-t border-gray-200">
                  <button 
                    className="text-gray-700 hover:text-gray-800 text-sm font-medium"
                    onClick={resetRatings}
                  >
                    Reset
                  </button>
                  <button 
                    className="bg-orange-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
                    onClick={applyRatings}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Budget Dropdown */}
          <div className="relative budget-dropdown-container">
            <button 
              onClick={() => setShowBudgetDropdown(!showBudgetDropdown)}
              className="flex items-center space-x-1 bg-white px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">Budget</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {showBudgetDropdown && (
              <div className="absolute left-0 z-50 mt-2 w-80 bg-white rounded-lg shadow-lg p-6 border budget-dropdown-container">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">PRICE</h3>
                <div className="mb-6">
                  <div className="relative h-1 bg-gray-200 rounded-full mb-6">
                    <div 
                      className="absolute h-1 bg-orange-500 rounded-full"
                      style={{ 
                        left: `${(minPrice / 100000) * 100}%`, 
                        right: `${100 - (maxPrice / 100000) * 100}%` 
                      }}
                    ></div>
                    <div 
                      className="absolute w-6 h-6 bg-gray-800 rounded-full -mt-2.5 -ml-3 cursor-pointer flex items-center justify-center"
                      style={{ left: `${(minPrice / 100000) * 100}%` }}
                      onMouseDown={(e) => {
                        const slider = e.currentTarget.parentElement;
                        if (!slider) return;
                        
                        const handleMouseMove = (moveEvent: MouseEvent) => {
                          if (!slider) return;
                          const rect = slider.getBoundingClientRect();
                          const percent = Math.min(Math.max(0, (moveEvent.clientX - rect.left) / rect.width), 1);
                          const newMin = Math.min(Math.round(percent * 100000), maxPrice);
                          setMinPrice(newMin);
                        };
                        
                        const handleMouseUp = () => {
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };
                        
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div 
                      className="absolute w-6 h-6 bg-gray-800 rounded-full -mt-2.5 -ml-3 cursor-pointer flex items-center justify-center"
                      style={{ left: `${(maxPrice / 100000) * 100}%` }}
                      onMouseDown={(e) => {
                        const slider = e.currentTarget.parentElement;
                        if (!slider) return;
                        
                        const handleMouseMove = (moveEvent: MouseEvent) => {
                          if (!slider) return;
                          const rect = slider.getBoundingClientRect();
                          const percent = Math.min(Math.max(0, (moveEvent.clientX - rect.left) / rect.width), 1);
                          const newMax = Math.max(Math.round(percent * 100000), minPrice);
                          setMaxPrice(newMax);
                        };
                        
                        const handleMouseUp = () => {
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };
                        
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="w-[45%] bg-gray-100 rounded-full p-3 flex items-center">
                      <span className="text-gray-700 mr-1">₱</span>
                      <input 
                        type="number" 
                        className="w-full bg-transparent focus:outline-none text-gray-700 text-right" 
                        value={minPrice}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value >= 0 && value <= maxPrice) {
                            setMinPrice(value);
                          }
                        }}
                      />
                    </div>
                    <span className="text-gray-700 mx-2">to</span>
                    <div className="w-[45%] bg-gray-100 rounded-full p-3 flex items-center">
                      <span className="text-gray-700 mr-1">₱</span>
                      <input 
                        type="number" 
                        className="w-full bg-transparent focus:outline-none text-gray-700 text-right" 
                        value={maxPrice}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value >= minPrice && value <= 100000) {
                            setMaxPrice(value);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-orange-500 text-white py-3 rounded-full font-medium hover:bg-orange-600 transition-colors"
                  onClick={applyBudget}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Show More button (only when not showing all filters) */}
          {!showAllFilters && (
            <button 
              className="text-orange-500 font-medium hover:text-orange-600"
              onClick={() => setShowAllFilters(true)}
            >
              Show More
            </button>
          )}

          {/* Additional filters that show/hide based on showAllFilters state */}
          {showAllFilters && (
            <>
              {/* Seller Details Dropdown */}
              <div className="relative seller-details-dropdown-container">
                <button 
                  onClick={() => setShowSellerDetailsDropdown(!showSellerDetailsDropdown)}
                  className="flex items-center space-x-1 bg-white px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-700">Seller Details {selectedSellerLevels.length > 0 && `(${selectedSellerLevels.length})`}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {showSellerDetailsDropdown && (
                  <div className="absolute left-0 z-50 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 border seller-details-dropdown-container">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Seller Level</h3>
                    <div className="space-y-3 mb-4">
                      {sellerLevelOptions.map(level => (
                        <div key={level.id} className="flex items-center justify-between">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="form-checkbox h-5 w-5 text-orange-500 rounded" 
                              checked={selectedSellerLevels.includes(level.id)}
                              onChange={() => handleSellerLevelToggle(level.id)}
                            />
                            <span className="text-gray-700">{level.name}</span>
                          </label>
                          <span className="text-gray-700 text-sm">({level.count})</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Online Status</h3>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="form-checkbox h-5 w-5 text-orange-500 rounded" 
                            />
                            <span className="text-gray-700">Online Sellers</span>
                          </label>
                          <span className="text-gray-700 text-sm">({onlineSellersCount.toLocaleString()})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Languages</h3>
                      <div className="space-y-3 mb-4">
                        {languageOptions.map(language => (
                          <div key={language.id} className="flex items-center justify-between">
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="form-checkbox h-5 w-5 text-orange-500 rounded" 
                              />
                              <span className="text-gray-700">{language.name}</span>
                            </label>
                            <span className="text-gray-700 text-sm">({language.count.toLocaleString()})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-6 pt-3 border-t border-gray-200">
                      <button 
                        className="text-gray-700 hover:text-gray-800 text-sm font-medium"
                        onClick={resetSellerLevels}
                      >
                        Reset
                      </button>
                      <button 
                        className="bg-orange-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
                        onClick={applySellerLevels}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Time Dropdown */}
              <div className="relative delivery-time-dropdown-container">
                <button 
                  onClick={() => setShowDeliveryTimeDropdown(!showDeliveryTimeDropdown)}
                  className="flex items-center space-x-1 bg-white px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Delivery Time</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {showDeliveryTimeDropdown && (
                  <div className="absolute left-0 z-50 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 border delivery-time-dropdown-container">
                    <div className="space-y-3">
                      {deliveryTimeOptions.map(option => (
                        <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="radio" 
                            name="deliveryTime"
                            className="form-radio h-5 w-5 text-orange-500" 
                            checked={selectedDeliveryTime === option.id}
                            onChange={() => setSelectedDeliveryTime(option.id)}
                          />
                          <span className="text-gray-700">{option.name}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-between mt-6 pt-3 border-t border-gray-200">
                      <button 
                        className="text-gray-700 hover:text-gray-800 text-sm font-medium"
                        onClick={resetDeliveryTime}
                      >
                        Reset
                      </button>
                      <button 
                        className="bg-orange-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
                        onClick={applyDeliveryTime}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Show Less button (only when showing all filters) */}
              <button 
                className="text-orange-500 font-medium hover:text-orange-600"
                onClick={() => setShowAllFilters(false)}
              >
                Show Less
              </button>
            </>
          )}

          {/* Sort By Dropdown - Always visible */}
          <div className="ml-auto">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Sort By:</span>
              <select
                className="appearance-none bg-white pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="newest">New Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 -ml-8 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Gigs Grid */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && gigs.length === 0 ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))
          ) : gigs.length > 0 ? (
            gigs.map((gig, index) => (
              <div key={`${gig.id}-${index}`} className="relative gig-card-wrapper">
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
                  isFavorite={favorites[index]}
                  onToggleFavorite={() => toggleFavorite(index)}
                  pricing_tiers={gig.pricing_tiers}
                  original_price={gig.original_price || (gig.price * 1.25)}
                  is_service={true}
                  description={gig.description}
                  short_description={gig.short_description}
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 py-10 text-center">
              <p className="text-gray-500 text-lg">No gigs found matching your criteria.</p>
              <button 
                onClick={handleReset}
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Infinite Scroll Loader */}
        {hasMore && gigs.length > 0 && (
          <div ref={loaderRef} className="flex justify-center mt-10">
            <div className="flex items-center space-x-2">
              {isLoadingMore ? (
                <>
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </>
              ) : (
                <p className="text-gray-500">Scroll for more</p>
              )}
            </div>
          </div>
        )}
        
        {/* End of Results Message */}
        {!hasMore && gigs.length > 0 && (
          <div className="text-center mt-10 text-gray-500">
            <p>You've reached the end of the results</p>
          </div>
        )}
      </div>
    </div>
  );
} 