import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/utils/currency';
import ShortDescriptionDisplay from './ShortDescriptionDisplay';
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
}) => {
  // State to track if pricing plans popup is shown
  const [showPlans, setShowPlans] = useState(false);
  
  // State to track which image is currently displayed
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Add error handling for images
  const [logoError, setLogoError] = useState(false);
  const [screenshotError, setScreenshotError] = useState(false);
  
  // Debug logs for description
  console.log(`SoftwareProductCard ${id} - short_description:`, short_description);
  console.log(`SoftwareProductCard ${id} - description:`, description);
  
  const handleLogoError = () => {
    setLogoError(true);
  };
  
  const handleScreenshotError = () => {
    setScreenshotError(true);
  };
  
  // Get the starting price (lowest plan price)
  const startingPrice = plans && plans.length > 0
    ? Math.min(...plans.map(plan => plan.price))
    : 0;
    
  // Check if this is a lifetime product (has at least one lifetime plan)
  const hasLifetimePlan = plans.some(plan => plan.duration_days === null);
  
  // Function to cycle through images
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (screenshots.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
    }
  };
  
  // Function to go to previous image
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (screenshots.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + screenshots.length) % screenshots.length);
    }
  };
  
  // Format duration for display
  const formatDuration = (days: number | null) => {
    if (days === null) return 'Lifetime';
    if (days < 30) return `${days} days`;
    const months = Math.floor(days / 30);
    return months === 1 ? '1 month' : `${months} months`;
  };

  // Generate a deterministic avatar number based on the partner name or ID
  const getAvatarNumber = () => {
    // Use the id if available, otherwise hash the partner name
    const hashValue = id || partner_name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Ensure it's between 1 and 10 (we have 10 avatar images)
    return (hashValue % 10) + 1;
  };
  
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

  // Use real images instead of placeholders
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
  
  // Always use random images for consistency
  const logoSrc = logoError ? `/assets/img/profiles/avatar-${getAvatarNumber()}.jpg` : logo_path;
  const randomImages = getRandomProductImages();
  const screenshotSrc = randomImages[currentImageIndex % randomImages.length];

  // Function to render the styled price
  const renderStyledPrice = (price: number, pricingModel: string) => {
    return (
      <div className="price-container">
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span className="price-amount">₱{price.toFixed(0)}</span>
          <span className="price-plan">/{pricingModel}</span>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="gig-card-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="gigs-card relative group hover:shadow-lg transition-shadow duration-300">
        {!is_active && (
          <div className="absolute top-2 right-2 z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            Inactive
          </div>
        )}
        <div className="gigs-img relative">
          <Link href={`/software/${slug}`}>
            <div className="relative h-[200px] w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20"></div>
              <Image 
                src={screenshotSrc} 
                alt={name} 
                fill
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
                className="transition-all duration-300 group-hover:scale-105"
                onError={handleScreenshotError}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Image navigation controls - only show if multiple images */}
              {screenshots.length > 1 && (
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
                    {screenshots.map((_, index) => (
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
          <div className="gigs-badges absolute top-2 left-2 flex flex-wrap gap-1">
            {hasLifetimePlan && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <svg className="mr-1" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                Lifetime
              </span>
            )}
            
            {/* Version badge */}
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              v{version}
            </span>
          </div>
          <div className="absolute top-2 right-2 flex space-x-1">
            <button 
              className={`bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(id);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
          <div className="absolute -bottom-5 left-4">
            <div className="bg-white rounded-full p-1 shadow-md border border-gray-200">
              <Image 
                src={logoSrc} 
                alt={partner_name}
                width={40}
                height={40}
                className="rounded-full"
                onError={handleLogoError}
              />
            </div>
          </div>
        </div>
        <div className="gigs-content p-4 pt-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs text-gray-500 block mb-1">{partner_name}</span>
              <Link href={`/software/${slug}`} className="hover:text-orange-500 transition-colors">
                <h3 className="text-base font-semibold line-clamp-2 min-h-[48px]">{name}</h3>
              </Link>
            </div>
          </div>
          
          <div className="mb-3">
            <ShortDescriptionDisplay 
              shortDescription={short_description} 
              description={description} 
            />
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <span className="text-orange-500 font-semibold">
                {renderStyledPrice(startingPrice, getPricingModel())}
              </span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <svg className="mr-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Instant Delivery
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareProductCard; 