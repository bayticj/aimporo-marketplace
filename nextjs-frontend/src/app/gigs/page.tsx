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

export default function GigsPage() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<boolean[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        const response = await gigService.getGigs();
        setGigs(response.data);
        setFavorites(new Array(response.data.length).fill(false));
      } catch (err: any) {
        setError(err.message || 'Failed to fetch gigs');
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  // For demo purposes, if API fails, use sample data
  useEffect(() => {
    if (error) {
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
          delivery: '3 days'
        },
      ];
      setGigs(sampleGigs);
      setFavorites(new Array(sampleGigs.length).fill(false));
    }
  }, [error]);

  const toggleFavorite = (index: number) => {
    setFavorites(prev => {
      const newFavorites = [...prev];
      newFavorites[index] = !newFavorites[index];
      return newFavorites;
    });
  };

  // Filter gigs based on search term and category
  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = searchTerm === '' || 
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.seller.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = category === '' || gig.badge === category;
    
    const matchesPriceRange = gig.price >= priceRange[0] && gig.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Explore Gigs</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Search</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Search gigs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Programming & Tech">Programming & Tech</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Videography">Videography</option>
                  <option value="Music & Audio">Music & Audio</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    className="w-1/2 p-2 border border-gray-300 rounded-lg"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="w-1/2 p-2 border border-gray-300 rounded-lg"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : filteredGigs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGigs.map((gig, index) => (
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
                isFavorite={favorites[index]}
                onToggleFavorite={() => toggleFavorite(index)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700 mb-4">No gigs found matching your criteria</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search filters or browse all gigs</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategory('');
                setPriceRange([0, 1000]);
              }}
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 