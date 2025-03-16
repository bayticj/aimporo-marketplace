'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getDigitalProducts, getDigitalProductCategories, DigitalProduct, DigitalProductCategory } from '@/services/digitalProductService';
import DigitalProductCard from '@/components/DigitalProductCard';
import PageBanner from '@/components/PageBanner';
import Pagination from '@/components/Pagination';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Add CSS for digital product cards
const digitalProductCardStyles = `
  .digital-product-card-wrapper {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .digital-product-card-wrapper:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .digital-product-card {
    border-radius: 8px;
    overflow: hidden;
    background: white;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .digital-product-img {
    position: relative;
    overflow: hidden;
    height: 200px;
  }
  
  .digital-product-badges {
    display: flex;
    gap: 0.5rem;
  }
  
  .digital-product-content {
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  
  .digital-product-title {
    margin-bottom: 0.5rem;
  }
  
  .digital-product-card-footer {
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
`;

const DigitalProductsPage = () => {
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [categories, setCategories] = useState<DigitalProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryCounts, setCategoryCounts] = useState<{[key: string]: number}>({});
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [currentCategoryPage, setCurrentCategoryPage] = useState(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const loaderRef = React.useRef<HTMLDivElement>(null);
  const itemsPerPage = 12;
  
  // Filter state variables
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showAllFilters, setShowAllFilters] = useState<boolean>(false);
  
  // Category filter
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  
  // Reviews filter
  const [showReviewsDropdown, setShowReviewsDropdown] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  
  // Budget filter
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(499);
  
  // Seller details filter
  const [showSellerDetailsDropdown, setShowSellerDetailsDropdown] = useState(false);
  const [selectedSellerLevels, setSelectedSellerLevels] = useState<string[]>([]);
  
  // File type filter (specific to digital products)
  const [showFileTypeDropdown, setShowFileTypeDropdown] = useState(false);
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([]);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort');
  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
  
  // Function to get category description
  const getCategoryDescription = (categoryId: string): string => {
    const descriptions: {[key: string]: string} = {
      'software': 'Explore premium software solutions including plugins, scripts, and applications for various platforms.',
      'graphics': 'Find high-quality graphics resources including templates, illustrations, and UI kits for your projects.',
      'audio': 'Discover professional audio assets including sound effects, music tracks, and voice samples.',
      'video': 'Access premium video resources including stock footage, motion graphics, and video templates.',
      'photos': 'Browse professional stock photos and image collections for all your creative needs.',
      'documents': 'Get professional document templates, ebooks, and educational resources.',
      'courses': 'Learn new skills with comprehensive online courses and tutorials from experts.',
      ' 3d': 'Explore 3D models, textures, and assets for game development and design projects.'
    };
    
    return descriptions[categoryId] || `Explore the best digital products from top creators.`;
  };

  // Define digital product categories
  const digitalProductCategories = useMemo(() => [
    {
      id: 'software',
      name: 'Software & Applications',
      count: categoryCounts['software'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'graphics',
      name: 'Graphics & Design Assets',
      count: categoryCounts['graphics'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      id: 'audio',
      name: 'Audio & Music',
      count: categoryCounts['audio'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    },
    {
      id: 'video',
      name: 'Video Resources',
      count: categoryCounts['video'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'photos',
      name: 'Photos & Images',
      count: categoryCounts['photos'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'documents',
      name: 'Documents & Templates',
      count: categoryCounts['documents'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'courses',
      name: 'Courses & Education',
      count: categoryCounts['courses'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    },
    {
      id: '3d',
      name: '3D Models & Assets',
      count: categoryCounts['3d'] || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      )
    }
  ], [categoryCounts]);
  
  // Calculate total number of category pages (showing 4 categories per page)
  const totalCategoryPages = Math.ceil(digitalProductCategories.length / 4);

  // Get current categories to display (4 per page)
  const currentCategories = useMemo(() => {
    const startIndex = currentCategoryPage * 4;
    return digitalProductCategories.slice(startIndex, startIndex + 4);
  }, [currentCategoryPage, digitalProductCategories]);

  // Handle category navigation
  const handlePrevCategories = useCallback(() => {
    setCurrentCategoryPage(prev => (prev > 0 ? prev - 1 : totalCategoryPages - 1));
  }, [totalCategoryPages]);

  const handleNextCategories = useCallback(() => {
    setCurrentCategoryPage(prev => (prev < totalCategoryPages - 1 ? prev + 1 : 0));
  }, [totalCategoryPages]);
  
  // Define category options for dropdown
  const categoryOptions = useMemo(() => digitalProductCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    count: cat.count
  })), [digitalProductCategories]);
  
  // Filter categories by search term
  const filteredCategories = useMemo(() => 
    categoryOptions.filter(category => 
      category.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
    ), [categoryOptions, categorySearchTerm]
  );
  
  // Handle category selection
  const handleCategoryToggle = useCallback((categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  }, []);
  
  // Reset category selection
  const resetCategories = useCallback(() => {
    setSelectedCategories([]);
    setCategorySearchTerm('');
  }, []);
  
  // Apply category filter
  const applyCategories = useCallback(() => {
    setShowCategoryDropdown(false);
    // Here you would typically update URL params or filter products
  }, []);
  
  // Define rating options
  const ratingOptions = useMemo(() => [
    { value: '5.0', label: '5.0', stars: 5 },
    { value: '4.0', label: '4.0', stars: 4 },
    { value: '3.0', label: '3.0', stars: 3 },
    { value: '2.0', label: '2.0', stars: 2 },
    { value: '1.0', label: '1.0', stars: 1 },
  ], []);
  
  // Handle rating selection
  const handleRatingToggle = useCallback((rating: string) => {
    setSelectedRatings(prev => {
      if (prev.includes(rating)) {
        return prev.filter(r => r !== rating);
      } else {
        return [...prev, rating];
      }
    });
  }, []);
  
  // Reset ratings
  const resetRatings = useCallback(() => {
    setSelectedRatings([]);
  }, []);
  
  // Apply ratings filter
  const applyRatings = useCallback(() => {
    setShowReviewsDropdown(false);
    // Here you would typically update URL params or filter products
  }, []);
  
  // Reset budget
  const resetBudget = useCallback(() => {
    setMinPrice(0);
    setMaxPrice(499);
  }, []);
  
  // Apply budget filter
  const applyBudget = useCallback(() => {
    setPriceRange([minPrice, maxPrice]);
    setShowBudgetDropdown(false);
    // Here you would typically update URL params or filter products
  }, []);
  
  // Define seller level options
  const sellerLevelOptions = useMemo(() => [
    { id: 'top_rated', name: 'Top Rated Seller', count: 12 },
    { id: 'level_two', name: 'Level 2 Seller', count: 18 },
    { id: 'level_one', name: 'Level 1 Seller', count: 24 },
    { id: 'new_seller', name: 'New Seller', count: 15 }
  ], []);
  
  // Handle seller level selection
  const handleSellerLevelToggle = useCallback((levelId: string) => {
    setSelectedSellerLevels(prev => {
      if (prev.includes(levelId)) {
        return prev.filter(id => id !== levelId);
      } else {
        return [...prev, levelId];
      }
    });
  }, []);
  
  // Reset seller levels
  const resetSellerLevels = useCallback(() => {
    setSelectedSellerLevels([]);
  }, []);
  
  // Apply seller levels filter
  const applySellerLevels = useCallback(() => {
    setShowSellerDetailsDropdown(false);
    // Here you would typically update URL params or filter products
  }, []);
  
  // Define file type options (specific to digital products)
  const fileTypeOptions = useMemo(() => [
    { id: 'pdf', name: 'PDF Documents', count: 28 },
    { id: 'image', name: 'Image Files', count: 35 },
    { id: 'audio', name: 'Audio Files', count: 17 },
    { id: 'video', name: 'Video Files', count: 22 },
    { id: 'software', name: 'Software & Apps', count: 14 },
    { id: 'archive', name: 'Archive Files', count: 9 }
  ], []);
  
  // Handle file type selection
  const handleFileTypeToggle = useCallback((typeId: string) => {
    setSelectedFileTypes(prev => {
      if (prev.includes(typeId)) {
        return prev.filter(id => id !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  }, []);
  
  // Reset file types
  const resetFileTypes = useCallback(() => {
    setSelectedFileTypes([]);
  }, []);
  
  // Apply file types filter
  const applyFileTypes = useCallback(() => {
    setShowFileTypeDropdown(false);
    // Here you would typically update URL params or filter products
  }, []);
  
  // Define language options with dynamic counts
  const languageOptions = useMemo(() => [
    { id: 'english', name: 'English', count: 85 },
    { id: 'spanish', name: 'Spanish', count: 24 },
    { id: 'french', name: 'French', count: 18 }
  ], []);

  // Define online status count
  const onlineSellersCount = useMemo(() => 37, []);
  
  // Reset all filters
  const handleReset = useCallback(() => {
    // Reset all state variables
    setSearchTerm('');
    setPriceRange([0, 1000]);
    setSortBy('newest');
    setShowFavoritesOnly(false);
    setRating(0);
    setSelectedCategories([]);
    setCategorySearchTerm('');
    setSelectedRatings([]);
    
    // Reset URL parameters
    router.push('/digital-products');
  }, [router]);
  
  // Handle click outside to close dropdowns
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
      if (showFileTypeDropdown && !target.closest('.file-type-dropdown-container')) {
        setShowFileTypeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategoryDropdown, showReviewsDropdown, showBudgetDropdown, showSellerDetailsDropdown, showFileTypeDropdown]);
  
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
      
      try {
        const response = await getDigitalProducts(params);
        
        if (response.success && response.data) {
          const newProducts = response.data.data;
          
          if (newProducts.length === 0) {
            setHasMore(false);
          } else {
            setProducts(prevProducts => [...prevProducts, ...newProducts]);
            setCurrentPage(nextPage);
            
            // Initialize favorites for new products
            const savedFavorites = localStorage.getItem('favoriteDigitalProducts');
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
        console.error('Error fetching more digital products:', err);
        
        // Use mock data as fallback
        const mockProducts = getMockDigitalProducts({...params});
        
        if (mockProducts.length === 0) {
          setHasMore(false);
        } else {
          setProducts(prevProducts => [...prevProducts, ...mockProducts]);
          setCurrentPage(nextPage);
          
          // Calculate if there are more products to load
          const allFilteredProducts = getMockDigitalProducts({...params, per_page: 1000});
          const totalFilteredCount = allFilteredProducts.length;
          
          // If we've loaded all products or there are no more pages, set hasMore to false
          if (mockProducts.length < itemsPerPage || nextPage * itemsPerPage >= totalFilteredCount) {
            setHasMore(false);
          }
        }
      }
    } finally {
      setIsLoadingMore(false);
    }
  };
  
  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteDigitalProducts');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await getDigitalProductCategories();
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    
    fetchCategories();
    
    // Fetch category counts (mock data for now)
    const fetchCategoryCounts = async () => {
      try {
        setLoadingCategories(true);
        
        try {
          const response = await getDigitalProductCategories();
          
          if (response.success && response.data) {
            const counts: {[key: string]: number} = {};
            response.data.forEach((category: DigitalProductCategory) => {
              // Use a type assertion to access product_count
              const productCount = (category as any).product_count || 0;
              counts[category.id.toString()] = productCount;
            });
            setCategoryCounts(counts);
          } else {
            throw new Error('API response not successful');
          }
        } catch (err) {
          console.error('Error fetching category counts:', err);
          
          // Use mock data as fallback
          const mockCounts = getMockCategoryCounts();
          setCategoryCounts(mockCounts);
        }
      } finally {
        setLoadingCategories(false);
      }
    };
    
    fetchCategoryCounts();
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
      setLoading(true);
        setHasMore(true); // Reset hasMore when filters change
        setCurrentPage(1); // Reset to first page when filters change
      
        const params: any = {
          page: 1, // Always start from page 1 when filters change
          per_page: itemsPerPage,
        };
        
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
        
        try {
        const response = await getDigitalProducts(params);
        
        if (response.success && response.data) {
            const fetchedProducts = response.data.data;
            setProducts(fetchedProducts);
            setTotalPages(Math.ceil((response.data.total || 0) / itemsPerPage));
            
            // If we got fewer products than the page size, there are no more to load
            if (fetchedProducts.length < itemsPerPage) {
              setHasMore(false);
            }
        } else {
            throw new Error('API response not successful');
          }
        } catch (err) {
        console.error('Error fetching digital products:', err);
        
        // Use mock data as fallback
          const mockProducts = getMockDigitalProducts(params);
          setProducts(mockProducts);
          
          // Calculate total pages based on all filtered products
          const allFilteredProducts = getMockDigitalProducts({...params, per_page: 1000});
          const totalFilteredCount = allFilteredProducts.length;
          setTotalPages(Math.ceil(totalFilteredCount / itemsPerPage));
          
          // If we got fewer products than the page size, there are no more to load
          if (mockProducts.length < itemsPerPage) {
            setHasMore(false);
          } else {
            // Check if there are more products to load
            setHasMore(currentPage * itemsPerPage < totalFilteredCount);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [category, search, sort]); // Removed page from dependencies to prevent refetching when page changes
  
  const handleToggleFavorite = (id: number) => {
    const newFavorites = [...favorites];
    const index = newFavorites.indexOf(id);
    
    if (index === -1) {
      newFavorites.push(id);
    } else {
      newFavorites.splice(index, 1);
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteDigitalProducts', JSON.stringify(newFavorites));
  };
  
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/digital-products?${params.toString()}`);
  };
  
  const handleCategoryChange = (categorySlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (categorySlug) {
      params.set('category', categorySlug);
    } else {
      params.delete('category');
    }
    
    params.delete('page'); // Reset to page 1
    router.push(`/digital-products?${params.toString()}`);
  };
  
  // Function to handle category selection
  const handleCategoryClick = (categoryId: string) => {
    // If the category is already selected, deselect it
    if (category === categoryId) {
      handleCategoryChange(null);
    } else {
      handleCategoryChange(categoryId);
    }
  };
  
  const handleSortChange = (sortValue: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (sortValue) {
      params.set('sort', sortValue);
    } else {
      params.delete('sort');
    }
    
    router.push(`/digital-products?${params.toString()}`);
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
    
    params.delete('page'); // Reset to page 1
    router.push(`/digital-products?${params.toString()}`);
  };

  // Function to get the total count of products for each category
  const getMockCategoryCounts = () => {
    const allProducts = getMockDigitalProducts();
    const counts: {[key: string]: number} = {};
    
    // Define all categories to ensure we have counts for each
    const categoryIds = ['software', 'graphics', 'audio', 'video', 'photos', 'documents', 'courses', '3d'];
    categoryIds.forEach(id => {
      counts[id] = 0;
    });
    
    // Count products in each category
    allProducts.forEach(product => {
      if (product.categories) {
        product.categories.forEach(category => {
          if (counts[category.id.toString()]) {
            counts[category.id.toString()]++;
          } else {
            counts[category.id.toString()] = 1;
          }
        });
      }
    });
    
    return counts;
  };

  // Type for our mock digital product with string IDs for categories
  interface MockDigitalProduct extends Omit<DigitalProduct, 'categories'> {
    categories?: Array<Omit<DigitalProductCategory, 'id'> & { id: string }>;
    rating?: number;
    reviews?: number;
    delivery?: string;
    location?: string;
    short_description?: string;
    hot?: boolean;
  }

  // Modified getMockDigitalProducts function with proper typing
  const getMockDigitalProducts = (params?: any): DigitalProduct[] => {
    // Create a large pool of products with diverse categories
    const allProducts: MockDigitalProduct[] = Array.from({ length: 100 }, (_, i) => {
      // Determine category based on index to ensure even distribution
      const categoryIndex = i % 8;
      const categories = [
        { 
          id: 'software', 
          name: 'Software & Applications', 
          slug: 'software',
          description: 'Software solutions for various needs',
          icon: 'icon',
          is_active: true,
          created_at: '2023-01-01',
          updated_at: '2023-01-01'
        },
        { 
          id: 'graphics', 
          name: 'Graphics & Design Assets', 
          slug: 'graphics',
          description: 'Design assets for creative projects',
          icon: 'icon',
          is_active: true,
          created_at: '2023-01-01',
          updated_at: '2023-01-01'
        },
        { 
          id: 'audio', 
          name: 'Audio & Music', 
          slug: 'audio',
          description: 'Audio assets for multimedia projects',
          icon: 'icon',
          is_active: true,
          created_at: '2023-01-01',
          updated_at: '2023-01-01'
        },
        { 
          id: 'video', 
          name: 'Video Resources', 
          slug: 'video',
          description: 'Video resources for content creators',
          icon: 'icon',
          is_active: true,
          created_at: '2023-01-01',
          updated_at: '2023-01-01'
        },
        { 
          id: 'photos', 
          name: 'Stock Photos', 
          slug: 'photos',
          description: 'High-quality stock photos',
          icon: 'icon',
          is_active: true,
          created_at: '2023-01-01',
          updated_at: '2023-01-01'
        },
        { 
          id: 'documents', 
          name: 'Documents & Templates', 
          slug: 'documents',
          description: 'Document templates for business and personal use',
          icon: 'icon',
          is_active: true,
          created_at: '2023-01-01',
          updated_at: '2023-01-01'
        },
        { 
          id: 'courses', 
          name: 'Online Courses', 
          slug: 'courses',
          description: 'Educational courses for skill development',
          icon: 'icon',
          is_active: true,
          created_at: '2023-01-01',
          updated_at: '2023-01-01'
        },
        { 
          id: '3d', 
          name: '3D Models & Assets', 
          slug: '3d',
          description: '3D models and assets for design and development',
          icon: 'icon',
          is_active: true,
          created_at: '2023-01-01',
          updated_at: '2023-01-01'
        }
      ];
      
      // Generate realistic titles based on category
      const titles = {
        'software': [
          'Advanced Project Management System',
          'E-commerce Platform Plugin',
          'Social Media Analytics Tool',
          'Customer Relationship Manager',
          'Inventory Management System',
          'Accounting Software Solution',
          'Website Performance Optimizer',
          'Email Marketing Automation',
          'SEO Analysis Toolkit',
          'Database Management System'
        ],
        'graphics': [
          'Premium UI Kit Collection',
          'Social Media Design Templates',
          'Brand Identity Package',
          'Icon Set - Business Edition',
          'Website Design Templates',
          'Mobile App UI Kit',
          'Logo Design Templates',
          'Presentation Templates Pack',
          'Infographic Creation Kit',
          'Photo Editing Presets'
        ],
        'audio': [
          'Cinematic Sound Effects Pack',
          'Royalty-Free Music Collection',
          'Voice Over Samples Kit',
          'Podcast Intro Templates',
          'Game Sound Effects Library',
          'Corporate Music Pack',
          'Ambient Sounds Collection',
          'DJ Mix Transitions Pack',
          'Audio Logo Templates',
          'Vocal Processing Presets'
        ],
        'video': [
          'Video Transition Effects Pack',
          'Motion Graphics Templates',
          'YouTube Intro Templates',
          'Corporate Video Templates',
          'Social Media Video Templates',
          'Video Editing Presets',
          'Green Screen Backgrounds',
          'Animated Logo Reveals',
          'Product Promo Templates',
          'Video LUTs Collection'
        ],
        'photos': [
          'Business Stock Photo Bundle',
          'Nature Photography Collection',
          'Urban Landscapes Pack',
          'Food Photography Set',
          'Portrait Photography Bundle',
          'Technology Stock Photos',
          'Lifestyle Photography Pack',
          'Travel Photography Collection',
          'Abstract Backgrounds Pack',
          'Product Photography Templates'
        ],
        'documents': [
          'Business Plan Templates',
          'Resume & CV Templates',
          'Legal Document Templates',
          'Financial Report Templates',
          'Marketing Plan Templates',
          'Project Proposal Templates',
          'E-book Templates',
          'Newsletter Templates',
          'Invoice & Quote Templates',
          'Educational Worksheets Pack'
        ],
        'courses': [
          'Complete Web Development Course',
          'Digital Marketing Masterclass',
          'Graphic Design for Beginners',
          'Advanced Excel Training',
          'Social Media Marketing Course',
          'Photography Fundamentals',
          'Business Management Essentials',
          'Content Creation Workshop',
          'SEO Optimization Course',
          'Financial Literacy Masterclass'
        ],
        '3d': [
          '3D Character Models Pack',
          'Architectural 3D Models Bundle',
          'Game Assets Collection',
          '3D Environment Pack',
          'Product Visualization Models',
          '3D Furniture Collection',
          'Vehicle 3D Models Pack',
          '3D Text Effects Templates',
          'Low Poly Game Assets',
          'Realistic Texture Pack'
        ]
      };
      
      const categoryId = categories[categoryIndex].id;
      const categoryTitles = titles[categoryId as keyof typeof titles] || titles['software'];
      const titleIndex = i % categoryTitles.length;
      
      // Generate realistic descriptions based on category
      const descriptions = {
        'software': `A powerful software solution designed to streamline your workflow and boost productivity. This product includes regular updates and dedicated support.`,
        'graphics': `High-quality design assets created by professional designers. Perfect for your next creative project with all necessary file formats included.`,
        'audio': `Professional audio assets recorded in a studio environment. Royalty-free for commercial and personal projects.`,
        'video': `Premium video resources to enhance your productions. Easily customizable with popular editing software.`,
        'photos': `High-resolution stock photos shot by professional photographers. Perfect for websites, social media, and marketing materials.`,
        'documents': `Well-structured document templates designed by industry experts. Fully editable and customizable to suit your needs.`,
        'courses': `Comprehensive learning materials created by industry professionals. Includes practical exercises and real-world examples.`,
        '3d': `Detailed 3D models with high-quality textures. Compatible with major 3D software packages.`
      };
      
      // Generate realistic prices based on category
      const basePrices = {
        'software': 99,
        'graphics': 49,
        'audio': 39,
        'video': 79,
        'photos': 29,
        'documents': 19,
        'courses': 89,
        '3d': 59
      };
      
      const basePrice = basePrices[categoryId as keyof typeof basePrices] || 49;
      const price = basePrice + Math.floor(Math.random() * 20) - 10; // Add some variation
      const originalPrice = Math.ceil(price * (1 + (Math.random() * 0.4 + 0.1))); // 10-50% higher
      
      // Generate realistic ratings
      const rating = 3.5 + Math.random() * 1.5; // Between 3.5 and 5.0
      const reviews = Math.floor(Math.random() * 500) + 5; // Between 5 and 505
      
      // Ensure status is one of the allowed values
      const statusOptions: ("published" | "draft" | "archived")[] = ["published", "draft", "archived"];
      const status = i % 20 === 0 ? statusOptions[0] : statusOptions[Math.floor(Math.random() * statusOptions.length)];
      
      return {
        id: i + 1,
        user_id: Math.floor(Math.random() * 10) + 1,
        title: categoryTitles[titleIndex],
        description: descriptions[categoryId as keyof typeof descriptions] || descriptions['software'],
        short_description: descriptions[categoryId as keyof typeof descriptions]?.substring(0, 100) + '...' || descriptions['software'].substring(0, 100) + '...',
        price: price,
        original_price: originalPrice,
        file_path: '/path/to/file.zip',
        file_name: `${categoryId.toLowerCase()}-product-${i + 1}.zip`,
        file_size: `${Math.floor(Math.random() * 100) + 1} MB`,
        file_type: 'application/zip',
        preview_path: null,
        download_limit: null,
        is_featured: i % 10 === 0, // Every 10th product is featured
        hot: i % 15 === 0, // Every 15th product is hot
        status: status,
        created_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0], // Random date within last ~4 months
        updated_at: new Date().toISOString().split('T')[0],
        rating: rating,
        reviews: reviews,
        delivery: 'Instant', // Always Instant for digital products
        location: ['New York', 'London', 'Tokyo', 'Berlin', 'Sydney', 'Paris', 'Toronto', 'Singapore'][Math.floor(Math.random() * 8)],
        user: {
          id: Math.floor(Math.random() * 10) + 1,
          name: ['CreativeStudio', 'DigitalCrafters', 'TechSolutions', 'DesignMasters', 'CodeExperts', 'MediaPros', 'ArtisanDigital', 'InnovateDesign', 'PremiumAssets', 'EliteCreators'][Math.floor(Math.random() * 10)],
          email: 'creator@example.com'
        },
        categories: [categories[categoryIndex]]
      };
    });
    
    // Apply filters based on params
    let filteredProducts = [...allProducts];
    
    // Filter by category
    if (params?.category) {
      filteredProducts = filteredProducts.filter(product => 
        product.categories?.some(cat => cat.id === params.category)
      );
    }
    
    // Filter by search term
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.title.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower) ||
        product.categories?.some(cat => cat.name.toLowerCase().includes(searchLower))
      );
    }
    
    // Sort products
    if (params?.sort_by) {
      const sortOrder = params.sort_order === 'desc' ? -1 : 1;
      
      switch (params.sort_by) {
        case 'price':
          filteredProducts.sort((a, b) => sortOrder * (a.price - b.price));
          break;
        case 'rating':
          filteredProducts.sort((a, b) => sortOrder * ((a.rating || 0) - (b.rating || 0)));
          break;
        case 'date':
          filteredProducts.sort((a, b) => sortOrder * (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
          break;
        case 'popularity':
          filteredProducts.sort((a, b) => sortOrder * ((a.reviews || 0) - (b.reviews || 0)));
          break;
        default:
          // Default sort by newest
          filteredProducts.sort((a, b) => -1 * (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
      }
    } else {
      // Default sort by newest
      filteredProducts.sort((a, b) => -1 * (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
    }
    
    // Pagination
    const page = params?.page || 1;
    const perPage = params?.per_page || 12;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    
    // Calculate total number of products for this filter set
    const totalFilteredProducts = filteredProducts.length;
    
    // Get the paginated products
    const paginatedProducts = filteredProducts.slice(start, end);
    
    // Convert mock products to DigitalProduct type
    return paginatedProducts.map(product => ({
      ...product,
      // Convert string category IDs to numbers for compatibility with DigitalProduct type
      categories: product.categories?.map(cat => ({
        ...cat,
        id: parseInt(cat.id) || 1 // Fallback to 1 if parsing fails
      }))
    })) as DigitalProduct[];
  };

  return (
    <div className="digital-products-page bg-gray-50 min-h-screen pb-16">
      <style jsx global>{digitalProductCardStyles}</style>
      
      {/* Page Header - Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-gray-700 hover:text-orange-500">
              Home
            </Link>
            <span className="mx-2 text-gray-700">›</span>
            <Link href="/digital-products" className="text-gray-700 hover:text-orange-500">
              Digital Products
            </Link>
            {category && (
              <>
                <span className="mx-2 text-gray-700">›</span>
                <span className="text-gray-800 font-medium">
                  {digitalProductCategories.find(c => c.id === category)?.name || 'Category'}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Page Header - Browse Category */}
      <div className="bg-gray-100 py-8 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Browse {category ? 
              digitalProductCategories.find(c => c.id === category)?.name || 'Digital Products' : 
              'Digital Products'} <span className="text-orange-500">
                {category ? 
                  `" ${categoryCounts[category] || 0} ${categoryCounts[category] === 1 ? 'Product' : 'Products'} "` : 
                  `" ${products.length > 0 ? `${products.length}` : '12'} Products "`}
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
              digitalProductCategories.find(c => c.id === category)?.name || 'Digital Products' : 
              'Digital Products'}
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            {category ? 
              getCategoryDescription(category) : 
              'Discover premium digital products created by talented professionals. Download instantly and use in your projects.'}
          </p>
        </div>
      </div>

      {/* Trending Categories */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Trending Categories {category ? 
              `in ${digitalProductCategories.find(c => c.id === category)?.name || 'Digital Products'}` : 
              'on Digital Products'}
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
                    <p className="text-sm text-gray-700">
                      ({cat.count.toLocaleString()} {cat.count === 1 ? 'Product' : 'Products'})
                    </p>
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
                      
          {/* File Type Dropdown (moved up to be after Categories) */}
          <div className="relative file-type-dropdown-container">
            <button 
              onClick={() => setShowFileTypeDropdown(!showFileTypeDropdown)}
              className="flex items-center space-x-1 bg-white px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-gray-700">File Type {selectedFileTypes.length > 0 && `(${selectedFileTypes.length})`}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {showFileTypeDropdown && (
              <div className="absolute left-0 z-50 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 border file-type-dropdown-container">
                <div className="space-y-3">
                  {fileTypeOptions.map(option => (
                    <div key={option.id} className="flex items-center justify-between">
                      <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                          type="checkbox" 
                          className="form-checkbox h-5 w-5 text-orange-500 rounded" 
                          checked={selectedFileTypes.includes(option.id)}
                          onChange={() => handleFileTypeToggle(option.id)}
                        />
                        <span className="text-gray-700">{option.name}</span>
                          </label>
                      <span className="text-gray-700 text-sm">({option.count})</span>
                        </div>
                      ))}
                    </div>
                <div className="flex justify-between mt-6 pt-3 border-t border-gray-200">
                  <button 
                    className="text-gray-700 hover:text-gray-800 text-sm font-medium"
                    onClick={resetFileTypes}
                  >
                    Reset
                  </button>
                  <button 
                    className="bg-orange-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
                    onClick={applyFileTypes}
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
                className="appearance-none bg-white pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="newest">New Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="downloads">Most Downloaded</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 -ml-8 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
                    </div>
                  </div>
                </div>
                    </div>

      {/* Digital Products Grid */}
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
              <div key={`${product.id}-${index}`} className="relative digital-product-card-wrapper">
                <DigitalProductCard
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={handleToggleFavorite}
                  original_price={product.original_price || undefined}
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 py-10 text-center">
              <p className="text-gray-500 text-lg">No digital products found matching your criteria.</p>
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
        
        {/* End of Results Message */}
        {!hasMore && products.length > 0 && (
          <div className="text-center mt-10 mb-8">
            <div className="inline-flex items-center justify-center">
              <div className="h-px bg-gray-300 w-16 mr-4"></div>
              <p className="text-gray-500 font-medium">You've reached the end of the results</p>
              <div className="h-px bg-gray-300 w-16 ml-4"></div>
            </div>
          </div>
        )}
        </div>

      {/* Rest of the page content */}
      {/* ... existing content ... */}
    </div>
  );
};

export default DigitalProductsPage; 