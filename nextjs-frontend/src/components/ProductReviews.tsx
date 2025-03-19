import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Image from 'next/image';

interface Review {
  id: number;
  user: {
    name: string;
    avatar: string;
    country: string;
  };
  rating: number;
  title?: string;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
  };
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  averageRating,
  totalReviews,
  ratingBreakdown
}) => {
  const [filter, setFilter] = useState<number | null>(null);
  
  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };
  
  // Get percentage for rating breakdown bars
  const getPercentage = (count: number) => {
    return totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
  };
  
  // Filter reviews based on selected rating
  const filteredReviews = filter 
    ? reviews.filter(review => Math.floor(review.rating) === filter) 
    : reviews;
  
  return (
    <div>
      {/* Rating Summary */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Customer Reviews</h3>
            <div className="flex items-center justify-center md:justify-start mb-2">
              <div className="flex mr-2">
                {renderStars(averageRating)}
              </div>
              <span className="text-lg font-bold text-gray-900">{averageRating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-600">{totalReviews} total reviews</p>
          </div>
          
          {/* Rating Breakdown */}
          <div>
            {/* 5 Stars */}
            <div className="flex items-center mb-1">
              <span className="text-sm font-medium text-gray-700 w-10">5 star</span>
              <div className="flex-1 h-2 mx-2 bg-gray-200 rounded">
                <div 
                  className="h-2 bg-yellow-400 rounded" 
                  style={{ width: `${getPercentage(ratingBreakdown.five)}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700 w-10 text-right">
                {getPercentage(ratingBreakdown.five)}%
              </span>
            </div>
            
            {/* 4 Stars */}
            <div className="flex items-center mb-1">
              <span className="text-sm font-medium text-gray-700 w-10">4 star</span>
              <div className="flex-1 h-2 mx-2 bg-gray-200 rounded">
                <div 
                  className="h-2 bg-yellow-400 rounded" 
                  style={{ width: `${getPercentage(ratingBreakdown.four)}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700 w-10 text-right">
                {getPercentage(ratingBreakdown.four)}%
              </span>
            </div>
            
            {/* 3 Stars */}
            <div className="flex items-center mb-1">
              <span className="text-sm font-medium text-gray-700 w-10">3 star</span>
              <div className="flex-1 h-2 mx-2 bg-gray-200 rounded">
                <div 
                  className="h-2 bg-yellow-400 rounded" 
                  style={{ width: `${getPercentage(ratingBreakdown.three)}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700 w-10 text-right">
                {getPercentage(ratingBreakdown.three)}%
              </span>
            </div>
            
            {/* 2 Stars */}
            <div className="flex items-center mb-1">
              <span className="text-sm font-medium text-gray-700 w-10">2 star</span>
              <div className="flex-1 h-2 mx-2 bg-gray-200 rounded">
                <div 
                  className="h-2 bg-yellow-400 rounded" 
                  style={{ width: `${getPercentage(ratingBreakdown.two)}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700 w-10 text-right">
                {getPercentage(ratingBreakdown.two)}%
              </span>
            </div>
            
            {/* 1 Star */}
            <div className="flex items-center mb-1">
              <span className="text-sm font-medium text-gray-700 w-10">1 star</span>
              <div className="flex-1 h-2 mx-2 bg-gray-200 rounded">
                <div 
                  className="h-2 bg-yellow-400 rounded" 
                  style={{ width: `${getPercentage(ratingBreakdown.one)}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700 w-10 text-right">
                {getPercentage(ratingBreakdown.one)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setFilter(null)} 
          className={`px-3 py-1 text-sm rounded-full ${
            filter === null 
              ? 'bg-orange-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {[5, 4, 3, 2, 1].map(rating => (
          <button 
            key={rating}
            onClick={() => setFilter(rating)}
            className={`px-3 py-1 text-sm rounded-full ${
              filter === rating
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {rating} Star
          </button>
        ))}
      </div>
      
      {/* Reviews List */}
      {filteredReviews.length > 0 ? (
        <div className="space-y-6">
          {filteredReviews.map(review => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-start mb-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={review.user.avatar}
                    alt={review.user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{review.user.name}</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex mr-2">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{review.user.country}</p>
                </div>
              </div>
              
              {review.title && (
                <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
              )}
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews found for the selected filter.</p>
        </div>
      )}
      
      {/* Show More Button */}
      {filteredReviews.length > 5 && (
        <div className="text-center mt-8">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Show More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews; 