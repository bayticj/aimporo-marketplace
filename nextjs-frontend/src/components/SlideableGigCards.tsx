import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import GigCard from './GigCard';
import Image from 'next/image';

// Import slick carousel CSS if not already imported in _app.tsx or layout.tsx
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

interface GigData {
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

interface SlideableGigCardsProps {
  gigs: GigData[];
  title?: string;
  subtitle?: string;
}

// Custom arrow components
const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="custom-arrow prev-arrow"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.66602 1.5L1.16602 5L4.66602 8.5V1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="custom-arrow next-arrow"
      onClick={onClick}
      aria-label="Next slide"
    >
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.33398 8.5L4.83398 5L1.33398 1.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

// Loading Skeleton Component
const GigCardSkeleton = () => {
  return (
    <div className="gig-card-skeleton">
      <div className="skeleton-img"></div>
      <div className="skeleton-content">
        <div className="skeleton-badge"></div>
        <div className="skeleton-title"></div>
        <div className="skeleton-rating"></div>
        <div className="skeleton-price"></div>
      </div>
    </div>
  );
};

const SlideableGigCards: React.FC<SlideableGigCardsProps> = ({ 
  gigs, 
  title = "Explore Our <span>Gigs.</span>",
  subtitle
}) => {
  // Create a ref for the slider
  const sliderRef = useRef<Slider | null>(null);

  // State for favorites
  const [favorites, setFavorites] = useState(Array(gigs.length).fill(false));
  
  // State for active filter
  const [activeFilter, setActiveFilter] = useState('popular');
  
  // Loading state for filter transitions
  const [isLoading, setIsLoading] = useState(false);
  
  // Create filtered gig sets based on different criteria
  const filteredGigs = {
    popular: [...gigs].sort((a, b) => b.reviews - a.reviews),
    latest: [...gigs].sort((a, b) => b.id - a.id), // Assuming higher IDs are newer
    topRatings: [...gigs].sort((a, b) => b.rating - a.rating),
    trending: [...gigs].filter(gig => gig.hot || gig.featured)
  };
  
  // Get current gigs based on active filter
  const currentGigs = filteredGigs[activeFilter as keyof typeof filteredGigs];
  
  // Debug: Log when slider ref is set
  useEffect(() => {
    if (sliderRef.current) {
      console.log('Slider ref is set');
    }
  }, [sliderRef.current]);
  
  // Handle filter change with loading animation
  const handleFilterChange = (filter: string) => {
    if (filter === activeFilter) return;
    
    setIsLoading(true);
    
    // Short timeout to create loading effect
    setTimeout(() => {
      setActiveFilter(filter);
      
      // Reset slider position
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0);
      }
      
      // Small delay before removing loading state to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }, 600); // Slightly longer loading time to show the skeleton effect
  };
  
  // Toggle favorite for a gig
  const toggleFavorite = (index: number) => {
    setFavorites(prev => {
      const newFavorites = [...prev];
      newFavorites[index] = !newFavorites[index];
      return newFavorites;
    });
  };

  // Functions to control the slider
  const goToPrev = () => {
    console.log('Going to previous slide');
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    } else {
      console.error('Slider ref is not available');
    }
  };

  const goToNext = () => {
    console.log('Going to next slide');
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    } else {
      console.error('Slider ref is not available');
    }
  };

  // Slider settings
  const sliderSettings = {
    dots: false, // Disable default dots
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false, // Hide default arrows
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    className: "gig-cards-slider",
    afterChange: (current: number) => console.log(`Slide changed to: ${current}`),
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="section-heading text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">
            {title.includes('<span>') ? (
              <>
                {title.split('<span>')[0]}
                <span className="text-orange-500">{title.split('<span>')[1].split('</span>')[0]}</span>
                {title.split('</span>')[1]}
              </>
            ) : (
              title
            )}
          </h2>
          {subtitle && <p className="text-gray-600 max-w-3xl mx-auto mt-4">{subtitle}</p>}
          <div className="filter-tabs">
            <button 
              className={activeFilter === 'popular' ? 'active' : ''}
              onClick={() => handleFilterChange('popular')}
            >
              Popular
            </button>
            <button 
              className={activeFilter === 'latest' ? 'active' : ''}
              onClick={() => handleFilterChange('latest')}
            >
              Latest
            </button>
            <button 
              className={activeFilter === 'topRatings' ? 'active' : ''}
              onClick={() => handleFilterChange('topRatings')}
            >
              Top Ratings
            </button>
            <button 
              className={activeFilter === 'trending' ? 'active' : ''}
              onClick={() => handleFilterChange('trending')}
            >
              Trending
            </button>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          {/* Slider implementation with ref */}
          <div className="slider-container">
            <Slider ref={sliderRef} {...sliderSettings} key={activeFilter}>
              {currentGigs.map((gig, index) => (
                <div key={gig.id} className="px-2 gig-card-wrapper">
                  <GigCard
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
                </div>
              ))}
            </Slider>
          </div>
          
          {/* Loading overlay that covers the entire slider area */}
          {isLoading && (
            <div className="filter-loading-overlay">
              <div className="filter-loading-animation"></div>
            </div>
          )}
          
          {/* Custom navigation arrows container - centered at bottom */}
          <div className="custom-arrows-container">
            <div className="custom-arrows-wrapper">
              <button 
                className="custom-arrow-btn prev-arrow-btn" 
                onClick={goToPrev}
                aria-label="Previous slide"
                type="button"
                disabled={isLoading}
              >
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.66602 1.5L1.16602 5L4.66602 8.5V1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="custom-arrow-btn next-arrow-btn" 
                onClick={goToNext}
                aria-label="Next slide"
                type="button"
                disabled={isLoading}
              >
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.33398 8.5L4.83398 5L1.33398 1.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlideableGigCards; 