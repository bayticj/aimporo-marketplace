import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/utils/currency';
import '@/style/pricing.css';

interface PricingTier {
  title: string;
  description: string;
  price: number;
  delivery_time: string;
  revisions: string;
  features: string[];
  pricing_model?: 'lifetime' | 'month' | 'year' | 'session' | 'appointment' | 'slot' | 'hour' | 'delivery' | 'starting';
  original_price?: number; // For showing discount
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
  pricing_model?: 'lifetime' | 'month' | 'year' | 'session' | 'appointment' | 'slot' | 'hour' | 'delivery' | 'starting';
  is_service?: boolean;
  is_digital_product?: boolean;
  original_price?: number; // For showing discount
  type?: 'gig' | 'digital' | 'software'; // Add product type
  description?: string;
  short_description?: string;
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
  pricing_model = null,
  is_service = false,
  is_digital_product = false,
  original_price = null,
  type = 'gig', // Default to gig type
  description,
  short_description,
}) => {
  // State to track if pricing tiers popup is shown
  const [showTiers, setShowTiers] = useState(false);
  
  // State to track which image is currently displayed
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine if this gig has pricing tiers
  const hasPricingTiers = pricing_tiers && (
    pricing_tiers.basic?.price || 
    pricing_tiers.standard?.price || 
    pricing_tiers.premium?.price
  );
  
  // Calculate starting price
  const startingPrice = hasPricingTiers 
    ? Math.min(
        ...[
          pricing_tiers.basic?.price || Infinity,
          pricing_tiers.standard?.price || Infinity,
          pricing_tiers.premium?.price || Infinity
        ].filter(price => price !== Infinity)
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
  
  // Function to go to a specific image by index
  const goToImage = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
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
    // Always show "Instant Delivery" for software and digital products
    if (type === 'software' || type === 'digital') {
      return "Instant Delivery";
    }
    
    // For gigs, parse the delivery time
    if (delivery === "Instant") {
      return "Instant Delivery";
    }
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

  // Determine the pricing model to display
  const getPricingModelDisplay = (tier?: PricingTier) => {
    // If it's a digital product, always return lifetime
    if (is_digital_product) {
      return 'lifetime';
    }
    
    // If it's a service/gig, use 'delivery'
    if (is_service) {
      return 'delivery';
    }
    
    // If tier has its own pricing model, use that
    if (tier?.pricing_model) {
      return tier.pricing_model;
    }
    
    // Otherwise use the gig's default pricing model
    return pricing_model;
  };

  // Function to render the styled price
  const renderStyledPrice = (price: number, pricingModel: string | null, originalPrice?: number | null) => {
    // Debug logs
    console.log('GigCard - Price:', price);
    console.log('GigCard - Original Price:', originalPrice);
    console.log('GigCard - Pricing Model:', pricingModel);
    
    // Calculate discount percentage if original price exists
    const discountPercentage = originalPrice && originalPrice > price 
      ? Math.round(((originalPrice - price) / originalPrice) * 100) 
      : null;
    
    console.log('GigCard - Discount Percentage:', discountPercentage);
    
    return (
      <div className="price-container">
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span className="price-amount">₱{price.toFixed(0)}</span>
          <span className="price-plan">/{pricingModel || 'lifetime'}</span>
        </div>
        {originalPrice && originalPrice > price && (
          <span 
            className="price-original" 
            style={{ 
              marginLeft: '8px', 
              textDecoration: 'line-through', 
              display: 'inline-block !important',
              opacity: '1 !important',
            }}
          >
            ₱{originalPrice.toFixed(0)}
          </span>
        )}
        {discountPercentage && discountPercentage >= 10 && (
          <span 
            className="discount-badge" 
            style={{ 
              display: 'block !important',
              opacity: '1 !important',
            }}
          >
            -{discountPercentage}%
          </span>
        )}
      </div>
    );
  };

  // Get random gig images based on gig ID
  const getRandomGigImages = () => {
    const gigImages = [
      '/assets/img/test/Attendace Template.png',
      '/assets/img/test/Class Student Manager.jpg',
      '/assets/img/test/Clinic Manager.jpg',
      '/assets/img/test/Company Payroll System 3.png',
      '/assets/img/test/Construction Estimator.png',
      '/assets/img/test/Automated Purchase Order.png',
      '/assets/img/test/Bill of Materials.png',
      '/assets/img/gigs/gigs-01.jpg',
      '/assets/img/gigs/gigs-02.jpg',
      '/assets/img/gigs/gigs-03.jpg',
      '/assets/img/gigs/gigs-04.jpg',
      '/assets/img/gigs/gigs-05.jpg',
      '/assets/img/gigs/gigs-06.jpg',
      '/assets/img/gigs/gigs-07.jpg',
      '/assets/img/gigs/gigs-08.jpg',
    ];
    
    // Use gig ID to consistently get the same set of images for the same gig
    const startIndex = id % gigImages.length;
    return [
      gigImages[startIndex],
      gigImages[(startIndex + 1) % gigImages.length]
    ];
  };
  
  // Get the image to display - always use random images for consistency
  const randomImages = getRandomGigImages();
  const currentImage = randomImages[currentImageIndex % randomImages.length];

  return (
    <div className={`gigs-card relative group ${status === 'draft' ? 'opacity-70' : ''} hover:shadow-lg transition-shadow duration-300`}>
      {status === 'draft' && (
        <div className="absolute top-2 right-2 z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded">
          Draft
        </div>
      )}
      <div className="gigs-img relative">
        <Link href={`/gigs/${id}`}>
          <div className="relative h-[200px] w-full overflow-hidden rounded-t-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
            <Image
              src={currentImage}
              alt={title}
              fill
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              onError={() => console.log('Image error')}
              className="transition-all duration-300 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>
        <div className="gigs-badges absolute top-2 left-2 z-10 flex flex-wrap gap-2">
          {featured && (
            <span className="featured bg-amber-400 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
              <svg className="mr-1" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Featured
            </span>
          )}
          {hot && (
            <span className="hot bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
              <svg className="mr-1" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 23C10.4537 23 8.97269 22.5892 7.68599 21.8258C6.39929 21.0625 5.36 20.0033 4.66667 18.7167C3.97333 17.43 3.62667 16.0125 3.62667 14.4642C3.62667 13.1775 3.85467 11.9217 4.31067 10.6967C4.76667 9.47167 5.41 8.28 6.24067 7.12167C7.07133 5.96333 8.02 4.87833 9.08667 3.86667C10.1533 2.85333 11.2533 1.94 12.3867 1.12667L12 0.666667L11.6133 1.12667C12.7467 1.94 13.8467 2.85333 14.9133 3.86667C15.98 4.87833 16.9287 5.96333 17.7593 7.12167C18.59 8.28 19.2333 9.47167 19.6893 10.6967C20.1453 11.9217 20.3733 13.1775 20.3733 14.4642C20.3733 16.0125 20.0267 17.43 19.3333 18.7167C18.64 20.0033 17.6007 21.0625 16.314 21.8258C15.0273 22.5892 13.5463 23 12 23ZM12 3.56667C10.2267 5.13 8.82267 6.69333 7.788 8.25667C6.75333 9.82 6.236 11.4258 6.236 13.0742C6.236 14.3608 6.51733 15.5242 7.08 16.5642C7.64267 17.6042 8.41333 18.4275 9.392 19.0342C10.3707 19.6408 11.4333 19.9442 12.58 19.9442C13.7267 19.9442 14.7893 19.6408 15.768 19.0342C16.7467 18.4275 17.5173 17.6042 18.08 16.5642C18.6427 15.5242 18.924 14.3608 18.924 13.0742C18.924 11.4258 18.4067 9.82 17.372 8.25667C16.3373 6.69333 14.9333 5.13 13.16 3.56667C12.7733 3.18 12.38 2.81 11.98 2.45667C11.62 2.81 11.2467 3.18 10.86 3.56667H12V3.56667Z" />
              </svg>
              Hot
            </span>
          )}
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "#ff5353" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
        
        {/* Seller Avatar - positioned at the bottom right of the image */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="rounded-full border-2 border-white shadow-sm overflow-hidden">
            <Image 
              src={`/assets/img/profiles/avatar-${getAvatarNumber()}.jpg`} 
              alt={seller}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      
      <div className="gigs-content p-4">
        <div className="flex items-center mb-2">
          <span className="badge flex items-center text-xs text-gray-700">
            <span className="badge-dot w-2 h-2 bg-orange-500 rounded-full mr-1.5"></span>
            {badge}
          </span>
          {location && (
            <span className="location text-xs text-gray-700 ml-3 flex items-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
              </svg>
              {location}
            </span>
          )}
        </div>
        <div className="gigs-title">
          <h3 className="text-base font-medium mb-0 line-clamp-2">
            <Link href={`/gigs/${id}`} className="text-gray-800 hover:text-orange-600 transition-colors">
              {title}
            </Link>
          </h3>
        </div>
        
        {/* Enhanced short description display with better spacing */}
        <div className="text-sm text-gray-700 mb-3">
          {short_description ? (
            <div className="py-0">
              {short_description.split('\n').map((line, index) => (
                <p key={index} className="line-clamp-1 mb-0">{line}</p>
              ))}
            </div>
          ) : description ? (
            <p className="line-clamp-3 py-0">{description}</p>
          ) : (
            <p className="py-0">No description available</p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="star-rate flex items-center">
            <div className="flex items-center mr-1">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="mr-0.5"
                >
                  <path 
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                    fill={i < Math.floor(rating) ? "#FFC107" : (i < rating ? "#FFC107" : "#E0E0E0")}
                  />
                </svg>
              ))}
            </div>
            <span className="flex items-center">
              <span className="font-medium text-sm text-gray-800 font-semibold">{rating.toFixed(1)}</span> 
              <span className="text-gray-700 text-sm ml-1">({reviews} Reviews)</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-gray-700 flex items-center">
            <span className="seller-name font-medium">{seller}</span>
            <span className={`seller-level ml-2 text-xs px-1.5 py-0.5 rounded text-white ${
              rating >= 4.8 ? 'bg-purple-600' : 
              rating >= 4.5 ? 'bg-blue-600' : 
              rating >= 4.0 ? 'bg-green-600' : 
              'bg-gray-600'
            }`}>
              {getSellerLevel()}
            </span>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-3 mt-2">
          <div className="gigs-card-footer flex items-center justify-between">
            <div className="delivery flex items-center text-gray-700 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`mr-1 ${type === 'software' || type === 'digital' || delivery === "Instant" ? "text-green-500" : "text-red-500"}`}>
                <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM16.2 16.2L11 13V7H12.5V12.2L17 14.9L16.2 16.2Z" fill="currentColor" />
              </svg>
              {formatDelivery(delivery)}
            </div>
            <div className="relative">
              {hasPricingTiers ? (
                <div className="flex items-center">
                  {is_service ? (
                    <h5 className="text-base">
                      {renderStyledPrice(startingPrice, 'delivery', pricing_tiers?.basic?.original_price || original_price)}
                    </h5>
                  ) : (
                    <h5 className="text-base">
                      {renderStyledPrice(
                        startingPrice, 
                        getPricingModelDisplay(), 
                        pricing_tiers?.basic?.original_price || original_price
                      )}
                    </h5>
                  )}
                  <button 
                    className="text-xs text-orange-600 hover:text-orange-700 ml-1"
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
                            <span className="font-bold">
                              {renderStyledPrice(
                                pricing_tiers.basic.price, 
                                getPricingModelDisplay(pricing_tiers.basic),
                                pricing_tiers.basic.original_price
                              )}
                            </span>
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
                            <span className="font-bold">
                              {renderStyledPrice(
                                pricing_tiers.standard.price, 
                                getPricingModelDisplay(pricing_tiers.standard),
                                pricing_tiers.standard.original_price
                              )}
                            </span>
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
                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{pricing_tiers.premium.title || 'Premium'}</span>
                            <span className="font-bold">
                              {renderStyledPrice(
                                pricing_tiers.premium.price, 
                                getPricingModelDisplay(pricing_tiers.premium),
                                pricing_tiers.premium.original_price
                              )}
                            </span>
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
                <div className="price-info">
                  {is_service ? (
                    <h5 className="text-base">
                      {renderStyledPrice(price, 'delivery', original_price)}
                    </h5>
                  ) : (
                    <h5 className="text-base">
                      {renderStyledPrice(price, getPricingModelDisplay(), original_price)}
                    </h5>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigCard; 