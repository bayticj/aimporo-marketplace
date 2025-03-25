'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

interface Review {
  id: string;
  buyer: {
    name: string;
    avatar: string;
    country: string;
  };
  gig: {
    id: string;
    title: string;
    image: string;
  };
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  response?: {
    text: string;
    date: string;
  };
}

export default function ReviewsPage() {
  const { user } = useAuth();
  const [timeFilter, setTimeFilter] = useState<'all' | 'recent' | 'last-month'>('all');
  const [ratingFilter, setRatingFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock reviews data
  const reviews: Review[] = [
    {
      id: 'review-1',
      buyer: {
        name: 'Emma Wilson',
        avatar: '/images/avatars/emma.jpg',
        country: 'Australia'
      },
      gig: {
        id: 'gig-1',
        title: 'Designing and developing software applications',
        image: '/images/services/software-development.jpg'
      },
      rating: 5,
      comment: 'Excellent work! The software application was delivered on time and met all my requirements. Very responsive and professional throughout the project.',
      date: '2023-10-15',
      helpful: 8,
      response: {
        text: 'Thank you for your kind review! It was a pleasure working with you and I\'m glad the application met your expectations.',
        date: '2023-10-16'
      }
    },
    {
      id: 'review-2',
      buyer: {
        name: 'Alex Johnson',
        avatar: '/images/avatars/alex.jpg',
        country: 'United States'
      },
      gig: {
        id: 'gig-2',
        title: 'I will develop openai, dalle, chat gpt app for you',
        image: '/images/services/ai-development.jpg'
      },
      rating: 4,
      comment: 'Good job on the AI integration. The app works well, though there were some minor bugs that needed fixing. Overall, I\'m satisfied with the result.',
      date: '2023-09-22',
      helpful: 3
    },
    {
      id: 'review-3',
      buyer: {
        name: 'Sarah Miller',
        avatar: '/images/avatars/sarah.jpg',
        country: 'Canada'
      },
      gig: {
        id: 'gig-3',
        title: 'I will do implementing chatbots on websites or applications',
        image: '/images/services/chatbot-integration.jpg'
      },
      rating: 5,
      comment: 'The chatbot implementation was flawless! Very intuitive design and the responses are accurate. Highly recommend this seller for any chatbot needs.',
      date: '2023-10-05',
      helpful: 12,
      response: {
        text: 'Thank you for your review! I\'m happy to hear the chatbot is working well for your business.',
        date: '2023-10-06'
      }
    },
    {
      id: 'review-4',
      buyer: {
        name: 'Michael Chen',
        avatar: '/images/avatars/michael.jpg',
        country: 'Singapore'
      },
      gig: {
        id: 'gig-4',
        title: 'I will do professional lifestyle and product photography',
        image: '/images/services/product-photography.jpg'
      },
      rating: 3,
      comment: 'The product photos were good quality, but the delivery took longer than expected. Communication could have been better regarding the delays.',
      date: '2023-08-12',
      helpful: 5
    },
    {
      id: 'review-5',
      buyer: {
        name: 'Carlos Rodriguez',
        avatar: '/images/avatars/carlos.jpg',
        country: 'Spain'
      },
      gig: {
        id: 'gig-5',
        title: 'Managing and optimizing paid advertising campaigns',
        image: '/images/services/paid-advertising.jpg'
      },
      rating: 5,
      comment: 'Our ad campaign performance improved dramatically! Very detailed reports and excellent optimization suggestions. Will definitely use this service again.',
      date: '2023-10-25',
      helpful: 9,
      response: {
        text: 'Thank you Carlos! I\'m glad to hear about the improved performance. Looking forward to helping with future campaigns.',
        date: '2023-10-26'
      }
    }
  ];

  // Filter reviews
  const getFilteredReviews = () => {
    let filtered = [...reviews];
    
    // Time filter
    if (timeFilter === 'recent') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter(review => {
        const reviewDate = new Date(review.date);
        return reviewDate >= thirtyDaysAgo;
      });
    } else if (timeFilter === 'last-month') {
      const now = new Date();
      const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
      const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
      filtered = filtered.filter(review => {
        const date = new Date(review.date);
        return date.getMonth() === lastMonth && date.getFullYear() === year;
      });
    }
    
    // Rating filter
    if (ratingFilter !== 'all') {
      const ratingValue = parseInt(ratingFilter);
      filtered = filtered.filter(review => review.rating === ratingValue);
    }
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(review => 
        review.comment.toLowerCase().includes(query) || 
        review.buyer.name.toLowerCase().includes(query) ||
        review.gig.title.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const filteredReviews = getFilteredReviews();
  
  // Calculate metrics
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews || 0;
  const ratingsCount = {
    5: reviews.filter(review => review.rating === 5).length,
    4: reviews.filter(review => review.rating === 4).length,
    3: reviews.filter(review => review.rating === 3).length,
    2: reviews.filter(review => review.rating === 2).length,
    1: reviews.filter(review => review.rating === 1).length
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Display stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Full star
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        // Empty star
        stars.push(
          <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    
    return (
      <div className="flex">
        {stars}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-medium">My Reviews</h1>
        <p className="text-gray-500 text-sm mt-1">Manage and respond to reviews from your buyers</p>
      </div>

      {/* Review Statistics */}
      <div className="bg-white p-6 rounded-lg border shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Average Rating */}
          <div className="md:border-r md:pr-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Average Rating</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
              <div className="ml-2 flex items-center">
                {renderStars(Math.round(averageRating))}
                <span className="ml-2 text-sm text-gray-500">({totalReviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="md:border-r md:px-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Rating Distribution</h3>
            <div className="space-y-1.5">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center">
                  <span className="w-8 text-xs text-gray-600">{rating} star</span>
                  <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-orange-500 rounded-full" 
                      style={{width: `${(ratingsCount[rating as keyof typeof ratingsCount] / totalReviews) * 100}%`}}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{ratingsCount[rating as keyof typeof ratingsCount]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Response Rate */}
          <div className="md:pl-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Response Rate</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-gray-900">
                {Math.round((reviews.filter(r => r.response).length / totalReviews) * 100)}%
              </span>
              <span className="ml-2 text-sm text-gray-500">({reviews.filter(r => r.response).length} of {totalReviews})</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Responding to reviews helps build trust with potential buyers
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="search-filter" className="block text-sm font-medium text-gray-700 mb-1">Search Reviews</label>
          <div className="relative">
            <input
              id="search-filter"
              type="text"
              placeholder="Search by keyword, name, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="time-filter" className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
          <select
            id="time-filter"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as any)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
          >
            <option value="all">All Time</option>
            <option value="recent">Last 30 Days</option>
            <option value="last-month">Last Month</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="rating-filter" className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <select
            id="rating-filter"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value as any)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>
      
      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-8 4-8-4V16l8 4 8-4V7z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews found</h3>
            <p className="mt-1 text-sm text-gray-500">
              No reviews match your current filters.
            </p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-white p-6 border rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                {/* Review Content */}
                <div className="flex-1">
                  {/* Review Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                          <Image
                            src={review.buyer.avatar}
                            alt={review.buyer.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://via.placeholder.com/40?text=User";
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{review.buyer.name}</h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{review.buyer.country}</span>
                          <span className="mx-1">•</span>
                          <span>{formatDate(review.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  
                  {/* Review Service */}
                  <div className="flex items-center mb-4 bg-gray-50 p-3 rounded-lg">
                    <div className="w-10 h-10 mr-3 rounded overflow-hidden bg-gray-200 flex-shrink-0">
                      <Image
                        src={review.gig.image}
                        alt={review.gig.title}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/40?text=Gig";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-gray-900 truncate">{review.gig.title}</h5>
                    </div>
                  </div>

                  {/* Review Comment */}
                  <div className="text-sm text-gray-700 mb-3">
                    {review.comment}
                  </div>
                  
                  {/* Review Actions */}
                  <div className="flex items-center text-xs text-gray-500">
                    <button className="flex items-center hover:text-orange-500">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017a2 2 0 01-1.386-.53l-4.26-3.837A2 2 0 015 15.263V8.5A2.5 2.5 0 017.5 6H9a5 5 0 015 5v-1z" />
                      </svg>
                      <span>{review.helpful} found this helpful</span>
                    </button>
                    {!review.response && (
                      <button className="ml-4 flex items-center text-orange-500 font-medium">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        <span>Respond to Review</span>
                      </button>
                    )}
                  </div>
                  
                  {/* Seller Response */}
                  {review.response && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center mb-2">
                        <span className="text-xs font-medium text-gray-900">Your Response</span>
                        <span className="ml-2 text-xs text-gray-500">{formatDate(review.response.date)}</span>
                      </div>
                      <div className="text-sm text-gray-700">
                        {review.response.text}
                      </div>
                      <button className="mt-2 text-xs font-medium text-orange-500 flex items-center">
                        <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit Response
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredReviews.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredReviews.length}</span> out of <span className="font-medium">{reviews.length}</span> reviews
          </div>
          <nav className="inline-flex rounded-md shadow-sm">
            <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 border-t border-b border-gray-300 bg-orange-500 text-sm font-medium text-white">
              1
            </button>
            <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
} 