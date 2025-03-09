import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PricingTier {
  title: string;
  description: string;
  price: number;
  delivery_time: string;
  revisions: string;
  features: string[];
}

interface GigCardProps {
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
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  status?: 'draft' | 'published';
  pricing_tiers?: {
    basic: PricingTier;
    standard: PricingTier;
    premium: PricingTier;
  };
}

const GigCard: React.FC<GigCardProps> = ({
  id,
  title,
  price,
  rating,
  reviews,
  images,
  seller,
  location,
  badge,
  featured = false,
  hot = false,
  delivery,
  isFavorite,
  onToggleFavorite,
  status = 'published',
  pricing_tiers,
}) => {
  // Fallback image in case the provided image doesn't load
  const fallbackImage = '/assets/img/placeholder.jpg';
  
  // State to track if pricing tiers popup is shown
  const [showTiers, setShowTiers] = useState(false);
  
  // State to track which image is currently displayed
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Determine if this gig has pricing tiers
  const hasPricingTiers = pricing_tiers && 
    pricing_tiers.basic && 
    pricing_tiers.basic.price;
  
  // Get the starting price (either single price or lowest tier)
  const startingPrice = hasPricingTiers 
    ? Math.min(
        Number(pricing_tiers.basic.price) || Infinity,
        Number(pricing_tiers.standard.price) || Infinity,
        Number(pricing_tiers.premium.price) || Infinity
      )
    : price;
    
  // Function to cycle through images
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };
  
  // Function to go to previous image
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };
  
  // Calculate seller level based on rating
  const getSellerLevel = () => {
    if (rating >= 4.8) return 'Top Rated';
    if (rating >= 4.5) return 'Level 2';
    if (rating >= 4.0) return 'Level 1';
    return 'New Seller';
  };
  
  // Format delivery time for display
  const formatDelivery = (delivery: string) => {
    const days = parseInt(delivery.split(' ')[0]);
    return days === 1 ? '1 day delivery' : `${days} days delivery`;
  };
  
  // Generate a deterministic avatar number based on the seller name or ID
  const getAvatarNumber = () => {
    // Use the id if available, otherwise hash the seller name
    const hashValue = id || seller.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Ensure it's between 1 and 10 (we have 10 avatar images)
    return (hashValue % 10) + 1;
  };

  return (
    <div className={`gigs-card relative group ${status === 'draft' ? 'opacity-70' : ''} hover:shadow-lg transition-shadow duration-300`}>
      {status === 'draft' && (
        <div className="absolute top-2 right-2 z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded">
          Draft
        </div>
      )}
      <div className="gigs-img relative">
        <Link href={`/gigs/${id}`}>
          <div className="relative h-48 w-full overflow-hidden">
            <Image 
              src={images[currentImageIndex] || fallbackImage} 
              alt={title} 
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 group-hover:scale-105"
              onError={(e: any) => {
                // If image fails to load, set a fallback
                if (e.target.src !== fallbackImage) {
                  e.target.src = fallbackImage;
                }
              }}
            />
            
            {/* Image navigation controls - only show if multiple images */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                
                {/* Image pagination dots */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {images.map((_, index) => (
                    <div 
                      key={index} 
                      className={`w-1.5 h-1.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </Link>
        <div className="gigs-badges">
          {featured && (
            <span className="featured">
              <svg className="mr-1" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Featured
            </span>
          )}
          {hot && (
            <span className="hot">
              <svg className="mr-1" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 23C10.4537 23 8.97269 22.5892 7.68599 21.8258C6.39929 21.0625 5.36 20.0033 4.66667 18.7167C3.97333 17.43 3.62667 16.0125 3.62667 14.4642C3.62667 13.1775 3.85467 11.9217 4.31067 10.6967C4.76667 9.47167 5.41 8.28 6.24067 7.12167C7.07133 5.96333 8.02 4.87833 9.08667 3.86667C10.1533 2.85333 11.2533 1.94 12.3867 1.12667L12 0.666667L11.6133 1.12667C12.7467 1.94 13.8467 2.85333 14.9133 3.86667C15.98 4.87833 16.9287 5.96333 17.7593 7.12167C18.59 8.28 19.2333 9.47167 19.6893 10.6967C20.1453 11.9217 20.3733 13.1775 20.3733 14.4642C20.3733 16.0125 20.0267 17.43 19.3333 18.7167C18.64 20.0033 17.6007 21.0625 16.314 21.8258C15.0273 22.5892 13.5463 23 12 23ZM12 3.56667C10.2267 5.13 8.82267 6.69333 7.788 8.25667C6.75333 9.82 6.236 11.4258 6.236 13.0742C6.236 14.3608 6.51733 15.5242 7.08 16.5642C7.64267 17.6042 8.41333 18.4275 9.392 19.0342C10.3707 19.6408 11.4333 19.9442 12.58 19.9442C13.7267 19.9442 14.7893 19.6408 15.768 19.0342C16.7467 18.4275 17.5173 17.6042 18.08 16.5642C18.6427 15.5242 18.924 14.3608 18.924 13.0742C18.924 11.4258 18.4067 9.82 17.372 8.25667C16.3373 6.69333 14.9333 5.13 13.16 3.56667C12.7733 3.18 12.38 2.81 11.98 2.45667C11.62 2.81 11.2467 3.18 10.86 3.56667H12V3.56667Z" />
              </svg>
              Hot
            </span>
          )}
          
          {/* Seller level badge */}
          <span className={`seller-level ${rating >= 4.8 ? 'bg-purple-600' : rating >= 4.5 ? 'bg-blue-600' : rating >= 4.0 ? 'bg-green-600' : 'bg-gray-600'}`}>
            {getSellerLevel()}
          </span>
        </div>
        <div className="gig-actions">
          <button className="action-btn share-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08261 9.84066C7.54305 9.32015 6.80891 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15C6.80891 15 7.54305 14.6798 8.08261 14.1593L15.0227 18.6294C15.0077 18.7508 15 18.8745 15 19C15 20.6569 16.3431 22 18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C17.1911 16 16.457 16.3202 15.9174 16.8407L8.97733 12.3706C8.99229 12.2492 9 12.1255 9 12C9 11.8745 8.99229 11.7508 8.97733 11.6294L15.9174 7.15934C16.457 7.67985 17.1911 8 18 8Z" fill="currentColor" />
            </svg>
          </button>
          <button 
            className={`action-btn fav-btn ${isFavorite ? 'active' : ''}`}
            onClick={() => onToggleFavorite(id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
        <div className="seller-avatar">
          <Image 
            src={`/assets/img/profiles/avatar-${getAvatarNumber()}.jpg`} 
            alt={seller}
            width={44}
            height={44}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="gigs-content">
        <div className="gigs-info">
          <div className="flex items-center justify-between">
            <span className="badge">
              <span className="badge-dot"></span>
              {badge}
            </span>
            <span className="location text-xs text-gray-500 flex items-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
              </svg>
              {location}
            </span>
          </div>
        </div>
        <div className="gigs-title">
          <h3>
            <Link href={`/gigs/${id}`} className="text-gray-800 hover:text-orange-600 transition-colors font-semibold">
              {title}
            </Link>
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <div className="star-rate">
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFC107" />
              </svg>
              <span className="font-medium">{rating.toFixed(1)}</span> <span className="text-gray-500">({reviews})</span>
            </span>
          </div>
          <div className="text-xs text-gray-500">
            <span className="seller-name font-medium">{seller}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-3 mt-2">
          <div className="gigs-card-footer">
            <div className="delivery flex items-center text-gray-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM16.2 16.2L11 13V7H12.5V12.2L17 14.9L16.2 16.2Z" fill="currentColor" />
              </svg>
              {formatDelivery(delivery)}
            </div>
            <div className="relative">
              {hasPricingTiers ? (
                <div className="flex items-center">
                  <h5 className="mr-1">Starting at <span className="text-lg font-bold">${startingPrice}</span></h5>
                  <button 
                    className="text-xs text-orange-600 hover:text-orange-700"
                    onClick={() => setShowTiers(!showTiers)}
                  >
                    {showTiers ? 'Hide' : 'View'} tiers
                  </button>
                  
                  {/* Pricing tiers popup */}
                  {showTiers && (
                    <div className="absolute bottom-full right-0 mb-2 w-64 bg-white shadow-lg rounded-lg z-20 p-3">
                      <div className="text-right mb-2">
                        <button 
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => setShowTiers(false)}
                        >
                          ✕
                        </button>
                      </div>
                      
                      {/* Basic tier */}
                      {pricing_tiers?.basic?.price && (
                        <div className="mb-3 pb-3 border-b">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{pricing_tiers.basic.title || 'Basic'}</span>
                            <span className="font-bold">${pricing_tiers.basic.price}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">
                            Delivery in {pricing_tiers.basic.delivery_time} days
                          </p>
                          {pricing_tiers.basic.features?.length > 0 && (
                            <ul className="text-xs text-gray-600">
                              {pricing_tiers.basic.features.slice(0, 2).map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-green-500 mr-1">✓</span> {feature}
                                </li>
                              ))}
                              {pricing_tiers.basic.features.length > 2 && (
                                <li className="text-gray-500">+{pricing_tiers.basic.features.length - 2} more</li>
                              )}
                            </ul>
                          )}
                        </div>
                      )}
                      
                      {/* Standard tier */}
                      {pricing_tiers?.standard?.price && (
                        <div className="mb-3 pb-3 border-b">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{pricing_tiers.standard.title || 'Standard'}</span>
                            <span className="font-bold">${pricing_tiers.standard.price}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">
                            Delivery in {pricing_tiers.standard.delivery_time} days
                          </p>
                          {pricing_tiers.standard.features?.length > 0 && (
                            <ul className="text-xs text-gray-600">
                              {pricing_tiers.standard.features.slice(0, 2).map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-green-500 mr-1">✓</span> {feature}
                                </li>
                              ))}
                              {pricing_tiers.standard.features.length > 2 && (
                                <li className="text-gray-500">+{pricing_tiers.standard.features.length - 2} more</li>
                              )}
                            </ul>
                          )}
                        </div>
                      )}
                      
                      {/* Premium tier */}
                      {pricing_tiers?.premium?.price && (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{pricing_tiers.premium.title || 'Premium'}</span>
                            <span className="font-bold">${pricing_tiers.premium.price}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">
                            Delivery in {pricing_tiers.premium.delivery_time} days
                          </p>
                          {pricing_tiers.premium.features?.length > 0 && (
                            <ul className="text-xs text-gray-600">
                              {pricing_tiers.premium.features.slice(0, 2).map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-green-500 mr-1">✓</span> {feature}
                                </li>
                              ))}
                              {pricing_tiers.premium.features.length > 2 && (
                                <li className="text-gray-500">+{pricing_tiers.premium.features.length - 2} more</li>
                              )}
                            </ul>
                          )}
                        </div>
                      )}
                      
                      <div className="mt-3 text-center">
                        <Link 
                          href={`/gigs/${id}`}
                          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <h5><span className="text-lg font-bold">${price}</span></h5>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigCard; 