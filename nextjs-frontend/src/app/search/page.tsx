'use client';

import React, { useState, useEffect } from 'react';
import { gigService } from '@/services/api';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

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
  const initialQuery = searchParams.get('query') || '';
  
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
      performSearch();
    }
  }, [initialQuery]);

  const performSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const options = {
        min_price: minPrice,
        max_price: maxPrice,
        sort: sortBy || undefined,
        direction: sortBy ? sortDirection : undefined,
      };
      
      const response = await gigService.searchGigs(searchQuery, options);
      setResults(response.data.results || []);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
    
    // Update URL with search query
    const params = new URLSearchParams();
    if (searchQuery) params.set('query', searchQuery);
    if (minPrice) params.set('min_price', minPrice.toString());
    if (maxPrice) params.set('max_price', maxPrice.toString());
    if (sortBy) {
      params.set('sort', sortBy);
      params.set('direction', sortDirection);
    }
    
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Gigs</h1>
      
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
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      
      {loading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
                    <span className="text-lg font-bold text-green-600">${gig.price.toFixed(2)}</span>
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