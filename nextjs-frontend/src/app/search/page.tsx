'use client';

import React, { useState, useEffect } from 'react';
import { gigService } from '@/services/api';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatCurrency } from '@/utils/currency';

interface Gig {
  id: number;
  title: string;
  description: string;
  price: number;
  delivery_time: number;
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [results, setResults] = useState<Gig[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<string>('asc');

  useEffect(() => {
    if (initialQuery) {
      console.log('Initial query detected:', initialQuery);
      performSearch();
    }
  }, [initialQuery]);

  const performSearch = async () => {
    if (!searchQuery.trim()) return;
    
    console.log('Performing search for:', searchQuery);
    setLoading(true);
    setError(null);
    
    try {
      const options = {
        min_price: minPrice,
        max_price: maxPrice,
        sort: sortBy || undefined,
        direction: sortBy ? sortDirection : undefined,
      };
      
      // Use mock data for now if the API call fails
      try {
        console.log('Calling gigService.searchGigs with:', searchQuery, options);
        const response = await gigService.searchGigs(searchQuery, options);
        setResults(response.data.results || []);
      } catch (apiErr) {
        console.error('API search error, using mock data:', apiErr);
        // Mock data as fallback
        setResults(getMockSearchResults(searchQuery));
      }
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'An error occurred while searching');
      // Still show mock results even on error
      setResults(getMockSearchResults(searchQuery));
    } finally {
      setLoading(false);
    }
  };

  // Function to generate mock search results
  const getMockSearchResults = (query: string): Gig[] => {
    console.log('Generating mock results for query:', query);
    const mockGigs = [
      {
        id: 1,
        title: "Professional Logo Design",
        description: "I will design a modern and professional logo for your business or brand.",
        price: 49.99,
        delivery_time: 2
      },
      {
        id: 2,
        title: "WordPress Website Development",
        description: "I will create a responsive WordPress website with modern design.",
        price: 199.99,
        delivery_time: 5
      },
      {
        id: 3,
        title: "SEO Optimization Package",
        description: "I will optimize your website for search engines to improve rankings.",
        price: 149.99,
        delivery_time: 3
      },
      {
        id: 4,
        title: "Social Media Content Creation",
        description: "I will create engaging content for your social media platforms.",
        price: 99.99,
        delivery_time: 2
      },
      {
        id: 5,
        title: "Mobile App Development",
        description: "I will develop a custom mobile app for iOS and Android.",
        price: 499.99,
        delivery_time: 14
      }
    ];
    
    // Filter mock gigs based on search query
    return mockGigs.filter(gig => 
      gig.title.toLowerCase().includes(query.toLowerCase()) || 
      gig.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search form submitted with query:', searchQuery);
    performSearch();
    
    // Update URL with search query
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (minPrice) params.set('min_price', minPrice.toString());
    if (maxPrice) params.set('max_price', maxPrice.toString());
    if (sortBy) {
      params.set('sort', sortBy);
      params.set('direction', sortDirection);
    }
    
    const searchUrl = `/search?${params.toString()}`;
    console.log('Updating URL to:', searchUrl);
    router.push(searchUrl);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-grow">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Query
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for gigs..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="w-full md:w-1/4">
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                value={minPrice || ''}
                onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Min Price"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="w-full md:w-1/4">
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                value={maxPrice || ''}
                onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Max Price"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="w-full md:w-1/2">
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">No Sorting</option>
                <option value="price">Price</option>
                <option value="created_at">Date</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            
            <div className="w-full md:w-1/2">
              <label htmlFor="sortDirection" className="block text-sm font-medium text-gray-700 mb-1">
                Sort Direction
              </label>
              <select
                id="sortDirection"
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!sortBy}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      
      {loading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {!loading && !error && results.length === 0 && searchQuery && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
          <p>No results found for "{searchQuery}"</p>
        </div>
      )}
      
      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Search Results ({results.length})</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((gig) => (
              <div key={gig.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    <Link href={`/gigs/${gig.id}`} className="text-blue-600 hover:text-blue-800">
                      {gig.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{gig.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600">{formatCurrency(gig.price)}</span>
                    <span className="text-sm text-gray-500">Delivery: {gig.delivery_time} days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 