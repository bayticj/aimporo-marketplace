'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Gig {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  price: number;
  rating: number;
  location: string;
  image: string;
  seller: {
    name: string;
    avatar: string;
  };
  deliveryTime: number;
}

export default function ManageGigsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock gigs data
  const gigs: Gig[] = [
    {
      id: 'gig-1',
      title: 'Designing and developing software applications',
      category: 'Software Development',
      subcategory: 'Web Applications',
      price: 780,
      rating: 5.0,
      location: 'New York',
      image: '/images/services/software-development.jpg',
      seller: {
        name: 'John',
        avatar: '/images/avatars/john.jpg'
      },
      deliveryTime: 1
    },
    {
      id: 'gig-2',
      title: 'I will do professional lifestyle and product photography',
      category: 'Ecommerce',
      subcategory: 'Seo',
      price: 350,
      rating: 4.3,
      location: 'London',
      image: '/images/services/product-photography.jpg',
      seller: {
        name: 'Robert',
        avatar: '/images/avatars/robert.jpg'
      },
      deliveryTime: 2
    },
    {
      id: 'gig-3',
      title: 'I will develop openai, dalle, chat gpt app for you',
      category: 'Music & Audio',
      subcategory: 'AI Services',
      price: 830,
      rating: 4.6,
      location: 'Canada',
      image: '/images/services/ai-development.jpg',
      seller: {
        name: 'Regina',
        avatar: '/images/avatars/regina.jpg'
      },
      deliveryTime: 1
    },
    {
      id: 'gig-4',
      title: 'Embedded Android & AOSP customizations for your devices',
      category: 'Programming & Tech',
      subcategory: 'Mobile Development',
      price: 650,
      rating: 4.7,
      location: 'Belize',
      image: '/images/services/embedded-android.jpg',
      seller: {
        name: 'James',
        avatar: '/images/avatars/james.jpg'
      },
      deliveryTime: 1
    },
    {
      id: 'gig-5',
      title: 'I will do implementing chatbots on websites or applications',
      category: 'Chatbot Integration',
      subcategory: 'AI Development',
      price: 750,
      rating: 4.2,
      location: 'Manchester',
      image: '/images/services/chatbot-integration.jpg',
      seller: {
        name: 'David',
        avatar: '/images/avatars/david.jpg'
      },
      deliveryTime: 1
    },
    {
      id: 'gig-6',
      title: 'I will do integrating AR elements into marketing campaigns',
      category: 'AR Marketing',
      subcategory: 'Digital Marketing',
      price: 800,
      rating: 4.3,
      location: 'Derby',
      image: '/images/services/ar-marketing.jpg',
      seller: {
        name: 'Lance',
        avatar: '/images/avatars/lance.jpg'
      },
      deliveryTime: 1
    },
    {
      id: 'gig-7',
      title: 'Managing and optimizing paid advertising campaigns',
      category: 'PPC Advertising',
      subcategory: 'Digital Marketing',
      price: 680,
      rating: 4.4,
      location: 'New York',
      image: '/images/services/paid-advertising.jpg',
      seller: {
        name: 'Randall',
        avatar: '/images/avatars/randall.jpg'
      },
      deliveryTime: 1
    },
    {
      id: 'gig-8',
      title: 'I will do collaborating with influencers to promote products',
      category: 'Influence Marketing',
      subcategory: 'Social Media',
      price: 960,
      rating: 4.0,
      location: 'Moscow',
      image: '/images/services/influencer-marketing.jpg',
      seller: {
        name: 'Cindy',
        avatar: '/images/avatars/cindy.jpg'
      },
      deliveryTime: 1
    },
    {
      id: 'gig-9',
      title: 'I will do designing and executing targeted email campaigns',
      category: 'Email Marketing',
      subcategory: 'Digital Marketing',
      price: 850,
      rating: 4.1,
      location: 'Norwich',
      image: '/images/services/email-marketing.jpg',
      seller: {
        name: 'Scott',
        avatar: '/images/avatars/scott.jpg'
      },
      deliveryTime: 1
    }
  ];

  // Filter gigs based on search term
  const filteredGigs = gigs.filter(gig => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      gig.title.toLowerCase().includes(term) ||
      gig.category.toLowerCase().includes(term) ||
      gig.subcategory.toLowerCase().includes(term)
    );
  });

  // Navigate to edit gig page
  const navigateToEditGig = (e: React.MouseEvent, gigId: string) => {
    e.stopPropagation();
    router.push(`/dashboard/gigs/${gigId}/edit`);
  };

  // Delete gig handler
  const handleDeleteGig = (e: React.MouseEvent, gigId: string) => {
    e.stopPropagation();
    // In a real app, you would call an API to delete the gig
    console.log(`Deleting gig: ${gigId}`);
    // Then update the UI
    alert(`Gig ${gigId} would be deleted`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium">Manage Gigs</h1>
        <Link 
          href="/dashboard/gigs/new" 
          className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-md"
        >
          Add New Gig
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <input 
            type="text" 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" 
            placeholder="Search your gigs by title, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Gigs Grid */}
      {filteredGigs.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No gigs found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "Try adjusting your search terms." : "Get started by creating a new gig!"}
          </p>
          <div className="mt-6">
            <Link href="/dashboard/gigs/new" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
              Create a New Gig
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map((gig) => (
            <div 
              key={gig.id} 
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative">
                {/* Gig Image */}
                <div className="relative h-48 bg-gray-200">
                  <Image 
                    src={gig.image} 
                    alt={gig.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/300x200?text=Gig+Image";
                    }}
                  />
                </div>
                
                {/* Action buttons overlay */}
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button 
                    onClick={(e) => navigateToEditGig(e, gig.id)}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                    aria-label="Edit gig"
                  >
                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button 
                    onClick={(e) => handleDeleteGig(e, gig.id)}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                    aria-label="Delete gig"
                  >
                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Gig Details */}
              <div className="p-4">
                {/* Category */}
                <div className="flex items-center mb-2">
                  <span className="flex items-center text-xs text-orange-500">
                    <span className="mr-1">●</span>
                    {gig.category}
                  </span>
                  <span className="ml-2 flex items-center text-xs text-yellow-500">
                    <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {gig.rating}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 h-10">{gig.title}</h3>
                
                {/* Seller */}
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 mr-2">
                    <Image 
                      src={gig.seller.avatar} 
                      alt={gig.seller.name}
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/24?text=User";
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">by {gig.seller.name}</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-xs text-gray-500">{gig.location}</span>
                </div>
                
                {/* Price and Delivery */}
                <div className="flex items-center justify-between border-t pt-3">
                  <div className="text-xs text-gray-500">
                    Delivery in {gig.deliveryTime} day{gig.deliveryTime > 1 ? 's' : ''}
                  </div>
                  <div className="text-base font-medium text-gray-900">${gig.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredGigs.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="px-4 py-2 border-t border-b border-gray-300 bg-orange-500 text-sm font-medium text-white">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              4
            </button>
            <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              5
            </button>
            <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
} 