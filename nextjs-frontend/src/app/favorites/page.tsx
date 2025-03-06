'use client';

import React, { useState, useEffect } from 'react';
import { gigService } from '@/services/api';
import GigCard from '@/components/GigCard';
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
}

export default function FavoritesPage() {
  const [favoriteGigs, setFavoriteGigs] = useState<Gig[]>([]);
  const [allGigs, setAllGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        const response = await gigService.getGigs();
        const gigs = response.data.gigs.data || [];
        setAllGigs(gigs);
        
        // Get favorite gig IDs from localStorage
        const favoriteIds = getFavoriteIds();
        
        // Filter gigs to only include favorites
        const favorites = gigs.filter((gig: Gig) => favoriteIds.includes(gig.id));
        setFavoriteGigs(favorites);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch gigs');
        // For demo purposes, use sample data if API fails
        useSampleData();
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  // Get favorite gig IDs from localStorage
  const getFavoriteIds = (): number[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const savedFavoritesJson = localStorage.getItem('favoriteGigs');
      if (!savedFavoritesJson) return [];
      
      return JSON.parse(savedFavoritesJson) as number[];
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return [];
    }
  };

  // For demo purposes, if API fails, use sample data
  const useSampleData = () => {
    console.log('Using sample data due to API error:', error);
    const sampleGigs = [
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
        delivery: '1 day'
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
        delivery: '2 days'
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
        delivery: '1 day'
      },
    ];
    setAllGigs(sampleGigs);
    
    // Pretend the first two are favorites
    setFavoriteGigs(sampleGigs.slice(0, 2));
  };

  const toggleFavorite = (gigId: number) => {
    // Get current favorite IDs
    const favoriteIds = getFavoriteIds();
    
    // Toggle the favorite status
    let newFavoriteIds: number[];
    if (favoriteIds.includes(gigId)) {
      // Remove from favorites
      newFavoriteIds = favoriteIds.filter(id => id !== gigId);
      // Remove from displayed favorites
      setFavoriteGigs(prev => prev.filter(gig => gig.id !== gigId));
    } else {
      // Add to favorites
      newFavoriteIds = [...favoriteIds, gigId];
      // Add to displayed favorites if it exists in allGigs
      const gigToAdd = allGigs.find(gig => gig.id === gigId);
      if (gigToAdd) {
        setFavoriteGigs(prev => [...prev, gigToAdd]);
      }
    }
    
    // Save to localStorage
    localStorage.setItem('favoriteGigs', JSON.stringify(newFavoriteIds));
  };

  // List view component for gigs
  const GigListItem = ({ gig }: { gig: Gig }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 relative h-48 md:h-auto">
          <Link href={`/service/${gig.id}`}>
            <div className="w-full h-full relative">
              <img 
                src={gig.images[0] || '/assets/img/placeholder.jpg'} 
                alt={gig.title}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          {(gig.featured || gig.hot) && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {gig.featured && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  Featured
                </span>
              )}
              {gig.hot && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 23C10.4537 23 8.97269 22.5892 7.68599 21.8258C6.39929 21.0625 5.36 20.0033 4.66667 18.7167C3.97333 17.43 3.62667 16.0125 3.62667 14.4642C3.62667 13.1775 3.85467 11.9217 4.31067 10.6967C4.76667 9.47167 5.41 8.28 6.24067 7.12167C7.07133 5.96333 8.02 4.87833 9.08667 3.86667C10.1533 2.85333 11.2533 1.94 12.3867 1.12667L12 0.666667L11.6133 1.12667C12.7467 1.94 13.8467 2.85333 14.9133 3.86667C15.98 4.87833 16.9287 5.96333 17.7593 7.12167C18.59 8.28 19.2333 9.47167 19.6893 10.6967C20.1453 11.9217 20.3733 13.1775 20.3733 14.4642C20.3733 16.0125 20.0267 17.43 19.3333 18.7167C18.64 20.0033 17.6007 21.0625 16.314 21.8258C15.0273 22.5892 13.5463 23 12 23Z" />
                  </svg>
                  Hot
                </span>
              )}
            </div>
          )}
        </div>
        <div className="p-4 md:w-3/4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mb-2">
                  {gig.badge}
                </span>
                <h3 className="text-xl font-semibold mb-2">
                  <Link href={`/service/${gig.id}`} className="hover:text-orange-600 transition-colors">
                    {gig.title}
                  </Link>
                </h3>
              </div>
              <div className="flex items-center">
                <button 
                  className="p-2 rounded-full text-red-500 hover:bg-gray-100"
                  onClick={() => toggleFavorite(gig.id)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {gig.title.split(' ').slice(0, 15).join(' ')}...
            </p>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
              </svg>
              {gig.location}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFC107" className="mr-1">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <span className="text-sm">{gig.rating.toFixed(1)} ({gig.reviews} reviews)</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                  <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM16.2 16.2L11 13V7H12.5V12.2L17 14.9L16.2 16.2Z" />
                </svg>
                Delivery in {gig.delivery}
              </div>
            </div>
            <div className="text-xl font-bold text-orange-600">${gig.price.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Favorite Gigs</h1>
            <p className="text-gray-600 mt-2">Your saved gigs in one place</p>
          </div>
          <Link 
            href="/gigs" 
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Browse All Gigs
          </Link>
        </div>

        <div className="mb-6">
          {/* View Toggle */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              {favoriteGigs.length} {favoriteGigs.length === 1 ? 'favorite' : 'favorites'}
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

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : favoriteGigs.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteGigs.map((gig) => (
                    <GigCard
                      key={gig.id}
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
                      isFavorite={true}
                      onToggleFavorite={() => toggleFavorite(gig.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {favoriteGigs.map((gig) => (
                    <GigListItem key={gig.id} gig={gig} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-700 mb-4">You don't have any favorite gigs yet</h3>
              <p className="text-gray-500 mb-6">Browse gigs and click the heart icon to add them to your favorites</p>
              <Link
                href="/gigs"
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                Browse Gigs
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 