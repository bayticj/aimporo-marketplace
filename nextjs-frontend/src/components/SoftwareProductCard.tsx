import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '@/style/pricing.css';

interface SoftwarePlan {
  id: number;
  name: string;
  description: string;
  price: number;
  duration_days: number | null; // null for lifetime
  features: string[];
}

interface SoftwareProductCardProps {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  logo_path: string;
  screenshots: string[];
  version: string;
  partner_name: string;
  is_active: boolean;
  plans: SoftwarePlan[];
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  rating?: number;
  reviews?: number;
}

const SoftwareProductCard: React.FC<SoftwareProductCardProps> = ({
  id,
  name,
  slug,
  description,
  short_description,
  logo_path,
  screenshots,
  version,
  partner_name,
  is_active,
  plans,
  isFavorite,
  onToggleFavorite,
  rating = 0,
  reviews = 0
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the starting price (lowest plan price)
  const startingPrice = plans && plans.length > 0
    ? Math.min(...plans.map(plan => plan.price))
    : 0;
    
  // Check if this is a lifetime product (has at least one lifetime plan)
  const hasLifetimePlan = plans.some(plan => plan.duration_days === null);
  
  // Determine the pricing model based on plans
  const getPricingModel = () => {
    if (hasLifetimePlan) {
      return 'lifetime';
    }
    
    // Check if any plan has a duration in months (approximately)
    const hasMonthlyPlan = plans.some(plan => plan.duration_days && plan.duration_days >= 28 && plan.duration_days <= 31);
    const hasYearlyPlan = plans.some(plan => plan.duration_days && plan.duration_days >= 365 && plan.duration_days <= 366);
    
    if (hasYearlyPlan) return 'year';
    if (hasMonthlyPlan) return 'month';
    
    return 'lifetime';
  };

  // Get random product images based on product ID
  const getRandomProductImages = () => {
    const productImages = [
      '/assets/img/test/Attendace Template.png',
      '/assets/img/test/Class Student Manager.jpg',
      '/assets/img/test/Clinic Manager.jpg',
      '/assets/img/test/Company Payroll System 3.png',
      '/assets/img/test/Construction Estimator.png',
      '/assets/img/test/Automated Purchase Order.png',
      '/assets/img/test/Bill of Materials.png',
      '/assets/img/gigs/gigs-06.jpg',
      '/assets/img/gigs/gigs-07.jpg',
      '/assets/img/gigs/gigs-08.jpg',
      '/assets/img/gigs/gigs-09.jpg',
      '/assets/img/gigs/gigs-10.jpg',
    ];
    
    // Use product ID to consistently get the same set of images for the same product
    const startIndex = id % productImages.length;
    return [
      productImages[startIndex],
      productImages[(startIndex + 1) % productImages.length]
    ];
  };

  // Generate a deterministic avatar number based on the partner name or ID
  const getAvatarNumber = () => {
    const hashValue = id || partner_name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hashValue % 10) + 1;
  };

  // Calculate seller level based on rating
  const getSellerLevel = () => {
    if (rating >= 4.8) return 'Top Rated';
    if (rating >= 4.5) return 'Level 2';
    if (rating >= 4.0) return 'Level 1';
    return 'New Seller';
  };

  // Generate sample descriptions for testing
  const getSampleDescription = () => {
    const sampleDescriptions = [
      "This is a short description that fits in one line. Adding more text to ensure it spans at least two lines. And even more text to make sure it reaches three full lines of content for proper display.",
      "This is a medium-length description that should span across multiple lines when displayed in the card. It includes more details about the product features and benefits. The description continues with additional information to ensure it fills three complete lines.",
      "This is a longer description that will definitely span across three lines when displayed in the card. It includes comprehensive details about the product features, benefits, and use cases. The text should be truncated with ellipsis if it exceeds three lines.",
      "This is an extra long description that would normally span across more than three lines. It contains extensive information about the product, its features, benefits, use cases, and technical specifications. However, it will be truncated to show only three lines with an ellipsis at the end to indicate there's more content available. This helps maintain a consistent card height while still providing enough information for users to understand what the product is about."
    ];
    
    // Use product ID to select a description
    const index = id % sampleDescriptions.length;
    return sampleDescriptions[index];
  };

  // Always use sample descriptions for testing the 3-line display
  const getDescription = () => {
    // For testing purposes, always use sample descriptions
    return getSampleDescription();
    
    // When ready to use real data, uncomment this:
    // return short_description || description || getSampleDescription();
  };

  // Function to render the styled price
  const renderStyledPrice = (price: number, pricingModel: string, originalPrice?: number | null) => {
    // Calculate discount percentage if original price exists
    const discountPercentage = originalPrice && originalPrice > price 
      ? Math.round(((originalPrice - price) / originalPrice) * 100) 
      : null;
    
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
          <span className="discount-badge">
            -{discountPercentage}%
          </span>
        )}
      </div>
    );
  };

  const randomImages = getRandomProductImages();
  const currentImage = randomImages[currentImageIndex % randomImages.length];
  
  return (
    <div 
      className={`gigs-card relative group ${!is_active ? 'opacity-70' : ''} hover:shadow-lg transition-shadow duration-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!is_active && (
        <div className="absolute top-2 right-2 z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded">
          Inactive
        </div>
      )}
      <div className="gigs-img relative">
        <Link href={`/software/${slug}`}>
          <div className="relative h-[200px] w-full overflow-hidden rounded-t-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
            <Image 
              src={currentImage}
              alt={name}
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
          {hasLifetimePlan && (
            <span className="featured bg-amber-400 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
              <svg className="mr-1" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Lifetime
            </span>
          )}
          <span className="hot bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
            <svg className="mr-1" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            Hot
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
              alt={partner_name}
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
            Software
          </span>
          <span className="location text-xs text-gray-700 ml-3 flex items-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
            </svg>
            Philippines
          </span>
        </div>
        <div className="gigs-title">
          <h3 className="text-base font-medium mb-0 line-clamp-2">
            <Link href={`/software/${slug}`} className="text-gray-800 hover:text-orange-600 transition-colors">
              {name}
            </Link>
          </h3>
        </div>
        
        {/* Enhanced short description display with better spacing */}
        <div className="text-sm text-gray-700 mb-3 min-h-[4.5em]">
          <p className="line-clamp-3 leading-normal">{getDescription()}</p>
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
            <span className="seller-name font-medium">{partner_name}</span>
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1 text-green-500">
                <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM16.2 16.2L11 13V7H12.5V12.2L17 14.9L16.2 16.2Z" fill="currentColor" />
              </svg>
              Instant Delivery
            </div>
            <div className="relative">
              <div className="price-info">
                {renderStyledPrice(startingPrice, getPricingModel(), Math.ceil(startingPrice * 1.25))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoftwareProductCard; 