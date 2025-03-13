'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { gigService } from '@/services/api';
import GigCard from '@/components/GigCard';
import GigListItem from '@/components/GigListItem';
import Link from 'next/link';

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

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        const response = await gigService.getGigs({
          page: currentPage,
          search: searchTerm,
          category_id: category,
          min_price: priceRange[0],
          max_price: priceRange[1],
          delivery_time: deliveryTime > 0 ? deliveryTime : undefined,
          sort_by: getSortField(),
          sort_order: getSortOrder(),
        });
        
        setGigs(response.data.gigs.data || []);
        setTotalPages(Math.ceil((response.data.gigs.total || 0) / itemsPerPage));
        
        // Initialize favorites from localStorage if available
        const savedFavorites = getSavedFavorites(response.data.gigs.data || []);
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
  }, [currentPage, searchTerm, category, priceRange, deliveryTime, sortBy]);

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
    const sampleGigs: Gig[] = [
      {
        id: 1,
        title: 'Professional Logo Design',
        price: 49.99,
        rating: 4.8,
        reviews: 124,
        images: ['/assets/img/banner-img.png', '/assets/img/banner-img.png'],
        seller: 'CreativeStudio',
        location: 'New York',
        badge: 'Programming & Tech',
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
        description: 'A professional logo design service',
        short_description: 'Professional logo design'
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
        badge: 'Videography',
        hot: true,
        delivery: '2 days',
        status: 'published' as const,
        description: 'A professional website development service',
        short_description: 'Professional website development'
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
        badge: 'Music & Audio',
        featured: true,
        delivery: '1 day',
        status: 'draft' as const,
        description: 'An SEO optimization package',
        short_description: 'SEO optimization'
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
        delivery: '3 days',
        description: 'Social media content creation',
        short_description: 'Social media content'
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
        badge: 'Videography',
        delivery: '2 days',
        description: 'Professional video editing',
        short_description: 'Professional video editing'
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
        description: 'Mobile app development',
        short_description: 'Mobile app development'
      },
    ];
    setGigs(sampleGigs);
    
    // Initialize favorites from localStorage for sample data
    const savedFavorites = getSavedFavorites(sampleGigs);
    setFavorites(savedFavorites);
    
    setTotalPages(Math.ceil(sampleGigs.length / itemsPerPage));
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

  // Function to reset all filters
  const handleReset = () => {
    setSearchTerm('');
    setCategory('');
    setPriceRange([0, 1000]);
    setDeliveryTime(0);
    setSortBy('recommended');
    setCurrentPage(1);
    setShowFavoritesOnly(false);
    setRating(0);
    setSellerLevel('');
  };

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

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Gigs</h1>
          <p className="text-gray-600">Find the perfect service for your business</p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex w-full max-w-4xl">
            <input
              type="text"
              placeholder="Search for services..."
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
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  {isExpanded ? 'Hide' : 'Show'}
                </button>
              </div>
              
              <form onSubmit={handleSearch} className={`space-y-6 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="Programming & Tech">Programming & Tech</option>
                    <option value="Design & Creative">Design & Creative</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Writing & Translation">Writing & Translation</option>
                    <option value="Video & Animation">Video & Animation</option>
                    <option value="Music & Audio">Music & Audio</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-1/2 p-2 border border-gray-300 rounded-lg"
                      placeholder="Min"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      min={priceRange[0]}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-1/2 p-2 border border-gray-300 rounded-lg"
                      placeholder="Max"
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>₱{priceRange[0]}</span>
                      <span>₱{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Delivery Time</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(parseInt(e.target.value))}
                  >
                    <option value="0">Any</option>
                    <option value="1">Up to 1 day</option>
                    <option value="3">Up to 3 days</option>
                    <option value="7">Up to 7 days</option>
                    <option value="14">Up to 14 days</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Minimum Rating</label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(rating === star ? 0 : star)}
                        className="focus:outline-none"
                      >
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill={rating >= star ? "#FFC107" : "none"} 
                          stroke={rating >= star ? "none" : "currentColor"} 
                          strokeWidth="2"
                          className="text-gray-300 hover:text-yellow-400 transition-colors"
                        >
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="ml-2 text-sm text-gray-600">
                        {rating}+ stars
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Seller Level</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={sellerLevel}
                    onChange={(e) => setSellerLevel(e.target.value)}
                  >
                    <option value="">Any Level</option>
                    <option value="top_rated">Top Rated</option>
                    <option value="level_2">Level 2</option>
                    <option value="level_1">Level 1</option>
                    <option value="new">New Seller</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showFavoritesOnly}
                      onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
                      className="form-checkbox h-5 w-5 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium">Show favorites only</span>
                  </label>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Sort By</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Gigs Grid/List */}
          <div className="lg:col-span-3">
            {/* View Toggle and Filters Summary */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-500">
                Showing {filteredGigs.length} results
                {searchTerm && <span className="ml-1">for "{searchTerm}"</span>}
                {category && <span className="ml-1">in {category}</span>}
                {showFavoritesOnly && <span className="ml-1">(favorites only)</span>}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-600 text-white' : 'bg-white text-gray-600'}`}
                  title="Grid View"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-600 text-white' : 'bg-white text-gray-600'}`}
                  title="List View"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || category || priceRange[0] > 0 || priceRange[1] < 1000 || deliveryTime > 0 || showFavoritesOnly) && (
              <div className="mb-6 flex flex-wrap gap-2 bg-gray-50 p-3 rounded-lg">
                <span className="text-sm text-gray-600 mr-2">Active filters:</span>
                
                {searchTerm && (
                  <span className="text-xs bg-white px-2 py-1 rounded-full flex items-center border border-gray-200">
                    Search: {searchTerm}
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </span>
                )}
                
                {category && (
                  <span className="text-xs bg-white px-2 py-1 rounded-full flex items-center border border-gray-200">
                    Category: {category}
                    <button 
                      onClick={() => setCategory('')}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </span>
                )}
                
                {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                  <span className="text-xs bg-white px-2 py-1 rounded-full flex items-center border border-gray-200">
                    Price: ₱{priceRange[0]} - ₱{priceRange[1]}
                    <button 
                      onClick={() => setPriceRange([0, 1000])}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </span>
                )}
                
                {deliveryTime > 0 && (
                  <span className="text-xs bg-white px-2 py-1 rounded-full flex items-center border border-gray-200">
                    Delivery: {deliveryTime === 1 ? '1 day' : `${deliveryTime} days`}
                    <button 
                      onClick={() => setDeliveryTime(0)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </span>
                )}
                
                {showFavoritesOnly && (
                  <span className="text-xs bg-white px-2 py-1 rounded-full flex items-center border border-gray-200">
                    Favorites only
                    <button 
                      onClick={() => setShowFavoritesOnly(false)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </span>
                )}
                
                <button
                  onClick={handleReset}
                  className="text-xs bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-300 ml-auto"
                >
                  Clear all
                </button>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : filteredGigs.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGigs.map((gig, index) => (
                      <div key={gig.id} className="transform transition-all duration-300 hover:-translate-y-1">
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
                          status={gig.status}
                          pricing_tiers={gig.pricing_tiers}
                          description={gig.description}
                          short_description={gig.short_description}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredGigs.map((gig, index) => (
                      <GigListItem 
                        key={gig.id} 
                        gig={gig} 
                        index={index} 
                        isFavorite={favorites[index]}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                  </div>
                )}
                
                {/* Enhanced Pagination with UI improvements */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <nav className="flex items-center space-x-1">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
                        }`}
                        aria-label="Previous page"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Prev
                      </button>
                      
                      <div className="hidden md:flex space-x-1">
                        {getPaginationRange(currentPage, totalPages).map((page, i) => (
                          page === '...' ? (
                            <span key={`ellipsis-${i}`} className="px-3 py-1.5 text-gray-500">...</span>
                          ) : (
                            <button
                              key={`page-${page}`}
                              onClick={() => setCurrentPage(Number(page))}
                              className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                                currentPage === Number(page)
                                  ? 'bg-orange-600 text-white'
                                  : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
                              }`}
                              aria-label={`Page ${page}`}
                              aria-current={currentPage === Number(page) ? 'page' : undefined}
                            >
                              {page}
                            </button>
                          )
                        ))}
                      </div>
                      
                      {/* Mobile pagination indicator */}
                      <div className="md:hidden flex items-center px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-md">
                        <span className="font-medium">{currentPage}</span>
                        <span className="mx-1">/</span>
                        <span>{totalPages}</span>
                      </div>
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
                        }`}
                        aria-label="Next page"
                      >
                        Next
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mb-4">No gigs found matching your criteria</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search filters or browse all gigs</p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 