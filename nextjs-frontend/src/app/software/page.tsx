'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getSoftwareProducts, getPartners, SoftwareProduct } from '@/services/softwareService';
import SoftwareProductCard from '@/components/SoftwareProductCard';
import PageBanner from '@/components/PageBanner';
import Pagination from '@/components/Pagination';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Add CSS for software product cards
const softwareCardStyles = `
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
  
  .gigs-content {
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
`;

const SoftwareProductsPage = () => {
  const [products, setProducts] = useState<SoftwareProduct[]>([]);
  const [partners, setPartners] = useState<{id: number, name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const loaderRef = React.useRef<HTMLDivElement>(null);
  const itemsPerPage = 12;
  
  // Popular categories state
  const [currentCategoryPage, setCurrentCategoryPage] = useState(0);
  const categoriesPerPage = 4;
  
  // Filter dropdown states
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showLicenseDropdown, setShowLicenseDropdown] = useState(false);
  const [showReviewsDropdown, setShowReviewsDropdown] = useState(false);
  const [showSellerDetailsDropdown, setShowSellerDetailsDropdown] = useState(false);
  const [showFileTypeDropdown, setShowFileTypeDropdown] = useState(false);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedSellerLevels, setSelectedSellerLevels] = useState<string[]>([]);
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([]);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const partner = searchParams.get('partner');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort');
  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
  const hasLifetime = searchParams.get('has_lifetime') === 'true';
  const category = searchParams.get('category');
  
  // Add refs for dropdown containers
  const categoryRef = useRef<HTMLDivElement>(null);
  const licenseRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const sellerDetailsRef = useRef<HTMLDivElement>(null);
  
  // Setup intersection observer for infinite scroll
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoadingMore) {
        loadMoreProducts();
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
  }, [hasMore, isLoadingMore, products]);
  
  // Function to load more products
  const loadMoreProducts = async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    
    try {
      const params: any = {
        page: nextPage,
        per_page: itemsPerPage,
      };
      
      if (partner) {
        params.partner_id = partner;
      }
      
      if (category) {
        params.category = category;
      }
      
      if (search) {
        params.search = search;
      }
      
      if (sort) {
        const [sortBy, sortOrder] = sort.split('-');
        params.sort_by = sortBy;
        params.sort_order = sortOrder;
      }
      
      if (hasLifetime) {
        params.has_lifetime = true;
      }
      
      try {
        const response = await getSoftwareProducts(params);
        
        if (response.data) {
          const newProducts = response.data;
          
          if (newProducts.length === 0) {
            setHasMore(false);
          } else {
            setProducts(prevProducts => [...prevProducts, ...newProducts]);
            setCurrentPage(nextPage);
            
            // Initialize favorites for new products
            const savedFavorites = localStorage.getItem('favoriteSoftwareProducts');
            if (savedFavorites) {
              setFavorites(JSON.parse(savedFavorites));
            }
            
            // If we got fewer products than the page size, there are no more to load
            if (newProducts.length < itemsPerPage) {
              setHasMore(false);
            }
          }
        } else {
          throw new Error('API response not successful');
        }
      } catch (err) {
        console.error('Error fetching more software products:', err);
        
        // Use mock data as fallback
        const mockProducts = getMockSoftwareProducts();
        
        if (mockProducts.length === 0) {
          setHasMore(false);
        } else {
          setProducts(prevProducts => [...prevProducts, ...mockProducts]);
          setCurrentPage(nextPage);
        }
      } finally {
        setIsLoadingMore(false);
      }
    } catch (error) {
      console.error('Error in loadMoreProducts:', error);
      setIsLoadingMore(false);
      setHasMore(false);
    }
  };
  
  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteSoftwareProducts');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Fetch partners
    const fetchPartners = async () => {
      try {
        const response = await getPartners();
        setPartners(response.data);
      } catch (err) {
        console.error('Error fetching partners:', err);
        // Don't set error state here to allow the page to still function
      }
    };
    
    fetchPartners();
    
    // Simulate loading categories
    setTimeout(() => {
      setLoadingCategories(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      setHasMore(true);
      setCurrentPage(1);
      
      try {
        const response = await getSoftwareProducts({
          page: 1,
          per_page: itemsPerPage,
          search: search || undefined,
          partner_id: partner || undefined,
          category: category || undefined,
          sort_by: sort ? sort.split('-')[0] : undefined,
          sort_order: sort ? sort.split('-')[1] as 'asc' | 'desc' : undefined,
          has_lifetime: hasLifetime || undefined
        });
        
        setProducts(response.data);
        setTotalPages(response.last_page);
        setCurrentPage(1);
        
        // If we got fewer products than the page size, there are no more to load
        if (response.data.length < itemsPerPage) {
          setHasMore(false);
        }
      } catch (err: any) {
        console.error('Error fetching software products:', err);
        setError(err.message || 'Failed to load software products. Please try again later.');
        
        // Use mock data as fallback
        const mockData = getMockSoftwareProducts();
        setProducts(mockData);
        setTotalPages(3);
        setCurrentPage(1);
        
        // For mock data, always set hasMore to false after first page
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [search, partner, sort, hasLifetime, category]);
  
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/software?${params.toString()}`);
  };
  
  const handleToggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteSoftwareProducts', JSON.stringify(newFavorites));
  };
  
  // Mock data for fallback
  const getMockSoftwareProducts = (): SoftwareProduct[] => {
    return [
      {
        id: 1,
        name: 'Design Pro Suite',
        slug: 'design-pro-suite',
        description: 'Professional design software for graphic designers and artists',
        short_description: 'Professional design software for graphic designers and artists',
        logo_path: '/assets/img/software/design-pro-logo.png',
        screenshots: ['/assets/img/software/design-pro-1.jpg'],
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
          }
        ],
        created_at: '2023-01-01',
        updated_at: '2023-01-01'
      },
      // Add more mock products as needed
    ];
  };
  
  const handlePartnerChange = (partnerId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (partnerId) {
      params.set('partner', partnerId);
    } else {
      params.delete('partner');
    }
    params.delete('page');
    router.push(`/software?${params.toString()}`);
  };
  
  const handleSortChange = (sortValue: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortValue) {
      params.set('sort', sortValue);
    } else {
      params.delete('sort');
    }
    params.delete('page');
    router.push(`/software?${params.toString()}`);
  };
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;
    
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    params.delete('page');
    router.push(`/software?${params.toString()}`);
  };
  
  const handleLifetimeToggle = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (hasLifetime) {
      params.delete('has_lifetime');
    } else {
      params.set('has_lifetime', 'true');
    }
    params.delete('page');
    router.push(`/software?${params.toString()}`);
  };

  // Software categories data
  const softwareCategories = [
    {
      id: 'business',
      name: 'Business Software',
      count: 24,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'design',
      name: 'Design Tools',
      count: 18,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      id: 'development',
      name: 'Development Tools',
      count: 15,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      id: 'security',
      name: 'Security Software',
      count: 12,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'productivity',
      name: 'Productivity Tools',
      count: 20,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      id: 'cloud',
      name: 'Cloud Services',
      count: 16,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    },
    {
      id: 'analytics',
      name: 'Analytics & BI',
      count: 14,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'communication',
      name: 'Communication Tools',
      count: 10,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    }
  ];
  
  // Calculate total pages for categories
  const totalCategoryPages = Math.ceil(softwareCategories.length / categoriesPerPage);
  
  // Get current categories to display
  const currentCategories = softwareCategories.slice(
    currentCategoryPage * categoriesPerPage,
    (currentCategoryPage + 1) * categoriesPerPage
  );
  
  // Handle category navigation
  const handlePrevCategories = () => {
    setCurrentCategoryPage(prev => (prev > 0 ? prev - 1 : totalCategoryPages - 1));
  };
  
  const handleNextCategories = () => {
    setCurrentCategoryPage(prev => (prev < totalCategoryPages - 1 ? prev + 1 : 0));
  };
  
  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', categoryId);
    params.delete('page');
    router.push(`/software?${params.toString()}`);
  };

  // Function to get category description
  const getCategoryDescription = (categoryId: string): string => {
    const descriptions: Record<string, string> = {
      'business': 'Professional business software solutions to streamline operations, manage resources, and boost productivity.',
      'design': 'Creative design tools for professionals to create stunning visuals, graphics, and digital art.',
      'development': 'Powerful development tools for building, testing, and deploying applications across platforms.',
      'security': 'Robust security software to protect your data, privacy, and digital assets from threats.',
      'productivity': 'Efficiency-focused productivity tools to help you accomplish more in less time.',
      'cloud': 'Scalable cloud services for storage, computing, and application hosting needs.',
      'analytics': 'Data analytics and business intelligence tools to gain insights and make informed decisions.',
      'communication': 'Communication platforms to connect teams, clients, and stakeholders seamlessly.'
    };
    
    return descriptions[categoryId] || 'Premium software solutions for your business and personal needs.';
  };

  // Filter handlers
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const resetCategories = () => {
    setSelectedCategories([]);
    setCategorySearchTerm('');
  };

  const applyCategories = () => {
    setShowCategoryDropdown(false);
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','));
    } else {
      params.delete('categories');
    }
    
    params.delete('page');
    router.push(`/software?${params.toString()}`);
  };

  const handleLicenseToggle = (licenseType: string) => {
    if (selectedLicenses.includes(licenseType)) {
      setSelectedLicenses(selectedLicenses.filter(type => type !== licenseType));
    } else {
      setSelectedLicenses([...selectedLicenses, licenseType]);
    }
  };

  const resetLicenses = () => {
    setSelectedLicenses([]);
  };

  const applyLicenses = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedLicenses.length > 0) {
      params.set('licenses', selectedLicenses.join(','));
    } else {
      params.delete('licenses');
    }
    
    router.push(`/software?${params.toString()}`);
    setShowLicenseDropdown(false);
  };

  const applyPriceFilter = () => {
    setShowPriceDropdown(false);
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (minPrice > 0) {
      params.set('min_price', minPrice.toString());
    } else {
      params.delete('min_price');
    }
    
    if (maxPrice < 100000) {
      params.set('max_price', maxPrice.toString());
    } else {
      params.delete('max_price');
    }
    
    params.delete('page');
    router.push(`/software?${params.toString()}`);
  };

  const resetPriceFilter = () => {
    setMinPrice(0);
    setMaxPrice(100000);
  };

  // Get filtered categories based on search term
  const filteredCategories = categorySearchTerm
    ? softwareCategories.filter(cat => 
        cat.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
      )
    : softwareCategories;

  // License options
  const licenseOptions = [
    { id: 'commercial', name: 'Commercial', count: 120 },
    { id: 'personal', name: 'Personal', count: 85 },
    { id: 'trial', name: 'Trial', count: 64 },
    { id: 'open_source', name: 'Open Source', count: 32 },
  ];

  // File type options
  const fileTypeOptions = [
    { id: 'basic', name: 'Basic Plan', count: 45 },
    { id: 'standard', name: 'Standard Plan', count: 78 },
    { id: 'premium', name: 'Premium Plan', count: 56 },
    { id: 'enterprise', name: 'Enterprise Plan', count: 34 }
  ];

  // Handle file type toggle
  const handleFileTypeToggle = (fileType: string) => {
    setSelectedFileTypes(prev => 
      prev.includes(fileType) 
        ? prev.filter(type => type !== fileType) 
        : [...prev, fileType]
    );
  };

  // Reset file types
  const resetFileTypes = () => {
    setSelectedFileTypes([]);
  };

  // Apply file types filter
  const applyFileTypes = () => {
    setShowFileTypeDropdown(false);
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedFileTypes.length > 0) {
      params.set('file_types', selectedFileTypes.join(','));
    } else {
      params.delete('file_types');
    }
    
    params.delete('page');
    router.push(`/software?${params.toString()}`);
  };

  // Rating options for Reviews filter
  const ratingOptions = [
    { value: '4_up', label: '4.0 & up', stars: 4 },
    { value: '3_up', label: '3.0 & up', stars: 3 },
    { value: '2_up', label: '2.0 & up', stars: 2 },
    { value: '1_up', label: '1.0 & up', stars: 1 }
  ];

  // Handle rating toggle
  const handleRatingToggle = (ratingValue: string) => {
    setSelectedRatings(prev => 
      prev.includes(ratingValue) 
        ? prev.filter(value => value !== ratingValue) 
        : [...prev, ratingValue]
    );
  };

  // Reset ratings
  const resetRatings = () => {
    setSelectedRatings([]);
  };

  // Apply ratings filter
  const applyRatings = () => {
    setShowReviewsDropdown(false);
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedRatings.length > 0) {
      params.set('ratings', selectedRatings.join(','));
    } else {
      params.delete('ratings');
    }
    
    params.delete('page');
    router.push(`/software?${params.toString()}`);
  };

  // Define seller level options
  const sellerLevelOptions = [
    { id: 'top_rated', name: 'Top Rated Seller', count: 1 },
    { id: 'level_two', name: 'Level 2 Seller', count: 2 },
    { id: 'level_one', name: 'Level 1 Seller', count: 2 },
    { id: 'new_seller', name: 'New Seller', count: 1 }
  ];

  // Online sellers count
  const onlineSellersCount = 42;

  // Language options
  const languageOptions = [
    { id: 'english', name: 'English', count: 120 },
    { id: 'spanish', name: 'Spanish', count: 45 },
    { id: 'french', name: 'French', count: 28 },
    { id: 'german', name: 'German', count: 15 }
  ];

  // Handle seller level toggle
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
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedSellerLevels.length > 0) {
      params.set('seller_levels', selectedSellerLevels.join(','));
    } else {
      params.delete('seller_levels');
    }
    
    params.delete('page');
    router.push(`/software?${params.toString()}`);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Close category dropdown when clicking outside
      if (showCategoryDropdown && categoryRef.current && !categoryRef.current.contains(target)) {
        setShowCategoryDropdown(false);
      }
      
      // Close license dropdown when clicking outside
      if (showLicenseDropdown && licenseRef.current && !licenseRef.current.contains(target)) {
        setShowLicenseDropdown(false);
      }
      
      // Close price dropdown when clicking outside
      if (showPriceDropdown && priceRef.current && !priceRef.current.contains(target)) {
        setShowPriceDropdown(false);
      }
      
      // Close ratings dropdown when clicking outside
      if (showReviewsDropdown && reviewsRef.current && !reviewsRef.current.contains(target)) {
        setShowReviewsDropdown(false);
      }
      
      // Close seller details dropdown when clicking outside
      if (showSellerDetailsDropdown && sellerDetailsRef.current && !sellerDetailsRef.current.contains(target)) {
        setShowSellerDetailsDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategoryDropdown, showLicenseDropdown, showPriceDropdown, showReviewsDropdown, showSellerDetailsDropdown]);

  return (
    <div className="bg-white">
      <style jsx global>{softwareCardStyles}</style>
      
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-gray-700 hover:text-orange-500">
              Home
            </Link>
            <span className="mx-2 text-gray-700">›</span>
            <span className="text-gray-800">Software Products</span>
          </div>
        </div>
      </div>
      
      {/* Browse Software Products Header */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Browse Software Products <span className="text-orange-500">" {products.length} Products "</span>
          </h1>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="relative bg-[#0f172a] py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-orange-500 to-blue-600 rounded-bl-[100px]"></div>
        </div>
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h2 className="text-4xl font-bold mb-4">Software Products</h2>
          <p className="text-xl max-w-2xl mx-auto">
            Discover premium software solutions created by talented professionals.
            Download instantly and use in your projects.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Popular Categories */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Trending Categories on Software Products</h2>
            <div className="flex space-x-2">
              <button
                onClick={handlePrevCategories}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextCategories}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {loadingCategories ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {softwareCategories
                .slice(
                  currentCategoryPage * categoriesPerPage,
                  (currentCategoryPage + 1) * categoriesPerPage
                )
                .map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center p-4">
                      <div className="w-14 h-14 flex items-center justify-center bg-orange-100 rounded-lg text-orange-500">
                        {cat.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-base font-semibold text-gray-800">{cat.name}</h3>
                        <p className="text-sm text-gray-500">({cat.count} Products)</p>
                      </div>
                      <div className="ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div className="flex flex-wrap items-center gap-3">
            {/* Categories Filter */}
            <div className="relative" ref={categoryRef}>
              <button 
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <span className="text-gray-700">Categories</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showCategoryDropdown && (
                <div className="absolute z-10 mt-2 w-72 bg-white rounded-md shadow-lg">
                  <div className="p-4">
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Search categories"
                        value={categorySearchTerm}
                        onChange={(e) => setCategorySearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    
                    <div className="max-h-60 overflow-y-auto mb-4">
                      {filteredCategories.map((cat) => (
                        <div key={cat.id} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={`cat-${cat.id}`}
                            checked={selectedCategories.includes(cat.id)}
                            onChange={() => handleCategoryToggle(cat.id)}
                            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`cat-${cat.id}`} className="ml-2 text-sm text-gray-700">
                            {cat.name} <span className="text-gray-500">({cat.count})</span>
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        onClick={resetCategories}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Reset
                      </button>
                      <button
                        onClick={applyCategories}
                        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* License Type Filter */}
            <div className="relative" ref={licenseRef}>
              <button 
                onClick={() => setShowLicenseDropdown(!showLicenseDropdown)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-gray-700">License Type</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showLicenseDropdown && (
                <div className="absolute z-10 mt-2 w-72 bg-white rounded-md shadow-lg">
                  <div className="p-4">
                    <div className="max-h-60 overflow-y-auto mb-4">
                      {licenseOptions.map((option) => (
                        <div key={option.id} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={`license-${option.id}`}
                            checked={selectedLicenses.includes(option.id)}
                            onChange={() => handleLicenseToggle(option.id)}
                            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`license-${option.id}`} className="ml-2 text-sm text-gray-700">
                            {option.name} <span className="text-gray-500">({option.count})</span>
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        onClick={resetLicenses}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Reset
                      </button>
                      <button
                        onClick={applyLicenses}
                        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Budget Filter */}
            <div className="relative" ref={priceRef}>
              <button 
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">Budget</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showPriceDropdown && (
                <div className="absolute z-10 mt-2 w-72 bg-white rounded-md shadow-lg">
                  <div className="p-4">
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-700">Min Price: ₱{minPrice}</span>
                        <span className="text-sm text-gray-700">Max Price: ₱{maxPrice}</span>
                      </div>
                      <div className="relative pt-5 px-2">
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="1000"
                          value={minPrice}
                          onChange={(e) => setMinPrice(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="1000"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-4"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        onClick={resetPriceFilter}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Reset
                      </button>
                      <button
                        onClick={applyPriceFilter}
                        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Reviews Filter - Only visible when showAllFilters is true */}
            {showAllFilters && (
              <div className="relative" ref={reviewsRef}>
                <button 
                  onClick={() => setShowReviewsDropdown(!showReviewsDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.07 3.292c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-700">Reviews</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showReviewsDropdown && (
                  <div className="absolute z-10 mt-2 w-72 bg-white rounded-md shadow-lg">
                    <div className="p-4">
                      <div className="max-h-60 overflow-y-auto mb-4">
                        {ratingOptions.map((option) => (
                          <div key={option.value} className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id={`rating-${option.value}`}
                              checked={selectedRatings.includes(option.value)}
                              onChange={() => handleRatingToggle(option.value)}
                              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`rating-${option.value}`} className="ml-2 text-sm text-gray-700 flex items-center">
                              {option.label}
                              <div className="flex ml-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 ${i < option.stars ? 'text-yellow-400' : 'text-gray-300'}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          onClick={resetRatings}
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          Reset
                        </button>
                        <button
                          onClick={applyRatings}
                          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Seller Details Filter - Only visible when showAllFilters is true */}
            {showAllFilters && (
              <div className="relative" ref={sellerDetailsRef}>
                <button 
                  onClick={() => setShowSellerDetailsDropdown(!showSellerDetailsDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-700">Seller Details</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showSellerDetailsDropdown && (
                  <div className="absolute z-10 mt-2 w-72 bg-white rounded-md shadow-lg">
                    <div className="p-4">
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Seller Level</h4>
                        <div className="max-h-40 overflow-y-auto">
                          {sellerLevelOptions.map((option) => (
                            <div key={option.id} className="flex items-center mb-2">
                              <input
                                type="checkbox"
                                id={`seller-${option.id}`}
                                checked={selectedSellerLevels.includes(option.id)}
                                onChange={() => handleSellerLevelToggle(option.id)}
                                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                              />
                              <label htmlFor={`seller-${option.id}`} className="ml-2 text-sm text-gray-700">
                                {option.name} <span className="text-gray-500">({option.count})</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Online Status</h4>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="online-sellers"
                            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                          />
                          <label htmlFor="online-sellers" className="ml-2 text-sm text-gray-700">
                            Online Sellers <span className="text-gray-500">({onlineSellersCount})</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          onClick={resetSellerLevels}
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          Reset
                        </button>
                        <button
                          onClick={applySellerLevels}
                          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Show More/Less Button */}
            <button 
              onClick={() => setShowAllFilters(!showAllFilters)}
              className="text-orange-500 font-medium hover:text-orange-600"
            >
              {showAllFilters ? "Show Less" : "Show More"}
            </button>
          </div>
          
          {/* Sort By */}
          <div className="flex items-center ml-auto mt-0">
            <span className="text-gray-700 mr-2">Sort By:</span>
            <div className="relative">
              <select
                value={sort || 'created_at-desc'}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="created_at-desc">New Arrivals</option>
                <option value="created_at-asc">Oldest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Software Products Grid */}
        <div className="container mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && products.length === 0 ? (
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
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <div key={`${product.id}-${index}`} className="relative">
                  <SoftwareProductCard
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    description={product.description}
                    short_description={product.short_description}
                    logo_path={product.logo_path}
                    screenshots={product.screenshots}
                    version={product.version}
                    partner_name={product.partner_name}
                    is_active={product.is_active}
                    plans={product.plans}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                    rating={4.5} // Add mock rating for now
                    reviews={25} // Add mock reviews for now
                  />
                </div>
              ))
            ) : (
              <div className="col-span-3 py-12 text-center">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No software products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    router.push('/software');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
          
          {/* Infinite Scroll Loader */}
          {hasMore && products.length > 0 && (
            <div ref={loaderRef} className="flex justify-center mt-10">
              <div className="flex items-center space-x-2">
                {isLoadingMore ? (
                  <>
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </>
                ) : (
                  <div className="inline-flex items-center justify-center">
                    <div className="h-px bg-gray-300 w-12 mr-3"></div>
                    <p className="text-gray-500 font-medium">Scroll for more products</p>
                    <div className="h-px bg-gray-300 w-12 ml-3"></div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoftwareProductsPage; 