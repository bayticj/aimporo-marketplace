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
      
      try {
        const response = await getSoftwareProducts({
          page: page,
          per_page: 12,
          search: search || undefined,
          partner_id: partner || undefined,
          category: category || undefined,
          sort_by: sort ? sort.split('-')[0] : undefined,
          sort_order: sort ? sort.split('-')[1] as 'asc' | 'desc' : undefined,
          has_lifetime: hasLifetime || undefined
        });
        
        setProducts(response.data);
        setTotalPages(response.last_page);
        setCurrentPage(response.current_page);
      } catch (err: any) {
        console.error('Error fetching software products:', err);
        setError(err.message || 'Failed to load software products. Please try again later.');
        
        // Use mock data as fallback
        const mockData = getMockSoftwareProducts();
        setProducts(mockData);
        setTotalPages(3);
        setCurrentPage(page);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [page, search, partner, sort, hasLifetime, category]);
  
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
    
    if (maxPrice < 10000) {
      params.set('max_price', maxPrice.toString());
    } else {
      params.delete('max_price');
    }
    
    params.delete('page');
    router.push(`/software?${params.toString()}`);
  };

  const resetPriceFilter = () => {
    setMinPrice(0);
    setMaxPrice(10000);
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
    <div className="software-page bg-gray-50 min-h-screen pb-16">
      <style jsx global>{softwareCardStyles}</style>
      
      {/* Page Header - Breadcrumb */}
      <div className="bg-white border-b">
    <div className="container mx-auto px-4 py-8">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-gray-700 hover:text-orange-500">
              Home
            </Link>
            <span className="mx-2 text-gray-700">›</span>
            <Link href="/software" className="text-gray-700 hover:text-orange-500">
              Software Products
            </Link>
            {category && (
              <>
                <span className="mx-2 text-gray-700">›</span>
                <span className="text-gray-800 font-medium">
                  {softwareCategories.find(c => c.id === category)?.name || 'Category'}
                </span>
              </>
            )}
            {partner && (
              <>
                <span className="mx-2 text-gray-700">›</span>
                <span className="text-gray-800 font-medium">
                  {partners.find(p => p.id.toString() === partner)?.name || 'Partner'}
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
            Browse {category ? 
              softwareCategories.find(c => c.id === category)?.name || 'Software Products' : 
              'Software Products'} <span className="text-orange-500">
                " {products.length > 0 ? products.length : 5} Products "
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
            {category ? 
              softwareCategories.find(c => c.id === category)?.name || 'Software Products' : 
              'Software Products'}
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            {category ? 
              getCategoryDescription(category) : 
              'Discover premium software solutions for your business and personal needs. Our curated collection offers the best tools to enhance your productivity.'}
          </p>
        </div>
      </div>
      
      {/* Trending Categories */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Trending Categories {category ? 
              `in ${softwareCategories.find(c => c.id === category)?.name || 'Software'}` : 
              'on Software Products'}
          </h2>
          <div className="flex space-x-2">
            <button 
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              aria-label="Previous categories"
              onClick={handlePrevCategories}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              aria-label="Next categories"
              onClick={handleNextCategories}
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
            currentCategories.map((cat) => (
              <div
                key={cat.id}
                className={`bg-white rounded-lg shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer ${
                  category === cat.id ? 'ring-2 ring-orange-500' : ''
                }`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 flex items-center justify-center ${
                    category === cat.id ? 'bg-orange-500 text-white' : 'bg-orange-100'
                  } rounded-lg mr-4`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      category === cat.id ? 'text-orange-500' : 'text-gray-800'
                    }`}>{cat.name}</h3>
                    <p className="text-sm text-gray-700">({cat.count} Products)</p>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${
                  category === cat.id ? 'text-orange-500' : 'text-gray-400'
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
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Categories Dropdown - Always visible */}
            <div ref={categoryRef} className="relative">
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
                    {softwareCategories.length > filteredCategories.length && (
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
            
            {/* License Type Filter - Always visible */}
            <div ref={licenseRef} className="relative">
              <button
                onClick={() => setShowLicenseDropdown(!showLicenseDropdown)}
                className="flex items-center space-x-1 bg-white px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-gray-700">License Type</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {showLicenseDropdown && (
                <div className="absolute left-0 z-50 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 border">
                  <div className="space-y-3">
                    {licenseOptions.map(license => (
                      <div key={license.id} className="flex items-center justify-between">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-orange-500 rounded"
                            checked={selectedLicenses.includes(license.id)}
                            onChange={() => handleLicenseToggle(license.id)}
                          />
                          <span className="text-gray-700">{license.name}</span>
                        </label>
                        <span className="text-gray-700 text-sm">({license.count})</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6 pt-3 border-t border-gray-200">
                    <button
                      className="text-gray-700 hover:text-gray-800 text-sm font-medium"
                      onClick={resetLicenses}
                    >
                      Reset
                    </button>
                    <button
                      className="bg-orange-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
                      onClick={applyLicenses}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Budget Filter - Always visible */}
            <div ref={priceRef} className="relative">
              <button
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
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
              
              {showPriceDropdown && (
                <div className="absolute left-0 z-50 mt-2 w-80 bg-white rounded-lg shadow-lg p-6 border budget-dropdown-container">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">PRICE</h3>
                  <div className="mb-6">
                    <div className="relative h-1 bg-gray-200 rounded-full mb-6">
                      <div 
                        className="absolute h-1 bg-orange-500 rounded-full"
                        style={{ 
                          left: `${(minPrice / 10000) * 100}%`, 
                          right: `${100 - (maxPrice / 10000) * 100}%` 
                        }}
                      ></div>
                      <div 
                        className="absolute w-6 h-6 bg-gray-800 rounded-full -mt-2.5 -ml-3 cursor-pointer flex items-center justify-center"
                        style={{ left: `${(minPrice / 10000) * 100}%` }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div 
                        className="absolute w-6 h-6 bg-gray-800 rounded-full -mt-2.5 -ml-3 cursor-pointer flex items-center justify-center"
                        style={{ left: `${(maxPrice / 10000) * 100}%` }}
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
                    onClick={applyPriceFilter}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
            
            {/* Additional filters that show/hide based on showAllFilters state */}
            {showAllFilters && (
              <>
                {/* Reviews Filter - Only visible when Show More is clicked */}
                <div ref={reviewsRef} className="relative w-full md:w-auto mt-3 md:mt-0">
                  <button
                    onClick={() => setShowReviewsDropdown(!showReviewsDropdown)}
                    className="flex items-center space-x-1 bg-white px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50 w-full md:w-auto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.07 3.292c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-700">Reviews</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {showReviewsDropdown && (
                    <div className="absolute left-0 z-50 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 border">
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
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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
                
                {/* Seller Details Filter - Only visible when Show More is clicked */}
                <div ref={sellerDetailsRef} className="relative w-full md:w-auto mt-3 md:mt-0">
                  <button 
                    onClick={() => setShowSellerDetailsDropdown(!showSellerDetailsDropdown)}
                    className="flex items-center space-x-1 bg-white px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50 w-full md:w-auto"
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
              </>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Show More/Less button - Moved to the right side */}
            <button 
              className="text-orange-500 font-medium hover:text-orange-600"
              onClick={() => setShowAllFilters(!showAllFilters)}
            >
              {showAllFilters ? 'Show Less' : 'Show More'}
            </button>
            
            {/* Sort By Dropdown - Right side */}
            <div className="flex items-center space-x-2 mt-3 md:mt-0">
              <span className="text-gray-700 whitespace-nowrap">Sort By:</span>
              <div className="relative">
                <select
                  value={sort || 'featured'}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="featured">New Arrivals</option>
                  <option value="newest">Featured</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="top_rated">Top Rated</option>
                  <option value="most_popular">Most Popular</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
      <div className="container mx-auto px-4">
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            
            {/* Search */}
            <div className="mb-6">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search software..."
                    defaultValue={search || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
            
            {/* Partners Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Partners</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="all-partners"
                    name="partner"
                    checked={!partner}
                    onChange={() => handlePartnerChange(null)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="all-partners" className="ml-2 text-sm text-gray-700">
                    All Partners
                  </label>
                </div>
                
                {partners.map((p) => (
                  <div key={p.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`partner-${p.id}`}
                      name="partner"
                      checked={partner === p.id.toString()}
                      onChange={() => handlePartnerChange(p.id.toString())}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                    />
                    <label htmlFor={`partner-${p.id}`} className="ml-2 text-sm text-gray-700">
                      {p.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Lifetime Option */}
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="lifetime"
                  checked={hasLifetime}
                  onChange={handleLifetimeToggle}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="lifetime" className="ml-2 text-sm text-gray-700">
                  Lifetime Plans Only
                </label>
              </div>
            </div>
            
            {/* Reset Filters */}
            <button
              onClick={() => router.push('/software')}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {loading ? 'Loading...' : `${products.length} Software Products`}
            </h2>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          )}
          
          {/* No Results */}
          {!loading && products.length === 0 && (
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">No software products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <button
                onClick={() => router.push('/software')}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
          
          {/* Products Grid */}
          {!loading && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                  <div key={product.id} className="relative gig-card-wrapper">
                <SoftwareProductCard
                  key={product.id}
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
                />
                  </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareProductsPage; 