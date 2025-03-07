import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
  // Fallback image in case the provided image doesn't load
  const fallbackImage = '/assets/img/placeholder.jpg';
  
  // State to track if pricing plans popup is shown
  const [showPlans, setShowPlans] = useState(false);
  
  // State to track which image is currently displayed
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Add error handling for images
  const [logoError, setLogoError] = useState(false);
  const [screenshotError, setScreenshotError] = useState(false);
  
  const handleLogoError = () => {
    setLogoError(true);
  };
  
  const handleScreenshotError = () => {
    setScreenshotError(true);
  };
  
  // Use placeholder images when the original images fail to load
  const logoSrc = logoError ? '/assets/img/placeholder.jpg' : logo_path;
  const screenshotSrc = screenshotError || screenshots.length === 0 
    ? '/assets/img/placeholder.jpg' 
    : screenshots[0];
  
  // Get the starting price (lowest plan price)
  const startingPrice = plans && plans.length > 0
    ? Math.min(...plans.map(plan => plan.price))
    : 0;
    
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

  return (
    <div className={`gigs-card relative group ${!is_active ? 'opacity-70' : ''} hover:shadow-lg transition-shadow duration-300`}>
      {!is_active && (
        <div className="absolute top-2 right-2 z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded">
          Inactive
        </div>
      )}
      <div className="gigs-img relative">
        <Link href={`/software/${slug}`}>
          <div className="relative h-48 w-full overflow-hidden">
            <Image 
              src={screenshotSrc} 
              alt={name} 
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 group-hover:scale-105"
              onError={handleScreenshotError}
            />
            
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
        <div className="gigs-badges">
          {plans.some(plan => plan.duration_days === null) && (
            <span className="featured">
              <svg className="mr-1" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Lifetime
            </span>
          )}
          
          {/* Version badge */}
          <span className="version bg-blue-600">
            v{version}
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
            src={logoSrc || `/assets/img/profiles/avatar-${Math.floor(Math.random() * 10) + 1}.jpg`} 
            alt={partner_name}
            width={44}
            height={44}
            className="rounded-full"
            onError={handleLogoError}
          />
          <div className="avatar-fallback">
            {partner_name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
      <div className="gigs-content">
        <div className="gigs-info">
          <div className="flex items-center justify-between">
            <span className="badge">
              <span className="badge-dot"></span>
              Software
            </span>
            <span className="plans-count text-xs text-gray-500 flex items-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="currentColor" />
              </svg>
              {plans.length} {plans.length === 1 ? 'Plan' : 'Plans'}
            </span>
          </div>
        </div>
        <div className="gigs-title">
          <h3>
            <Link href={`/software/${slug}`} className="hover:text-orange-600 transition-colors">
              {name}
            </Link>
          </h3>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="seller-info text-sm text-gray-600">
            <span>By {partner_name}</span>
          </div>
          <div className="price-info">
            <span className="price-prefix text-xs text-gray-500">Starting at</span>
            <span className="price text-lg font-bold text-orange-600">${startingPrice.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500 line-clamp-2">
          {short_description}
        </div>
      </div>
    </div>
  );
};

export default SoftwareProductCard; 