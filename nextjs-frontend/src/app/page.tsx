'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import GigCard from '../components/GigCard';
import SlideableGigCards from '../components/SlideableGigCards';

// Add AOS type declaration
declare global {
  interface Window {
    AOS: any;
  }
}

export default function Home() {
  // Console log for debugging
  useEffect(() => {
    console.log('Home component mounted');
    
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init();
      console.log('AOS initialized from component');
    }
    
    // Debug slick slider
    if (typeof Slider !== 'undefined') {
      console.log('Slider is defined');
    } else {
      console.log('Slider is undefined');
    }
  }, []);

  // Add isClient state
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // State for category slider
  const [activeCategorySet, setActiveCategorySet] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Main categories only
  const mainCategories = [
    { 
      id: 'gigs', 
      title: 'Growth Hacking Services', 
      description: 'Find top-rated freelancers for any project',
      name: 'Gigs',
      image: '/assets/img/gigs/gigs-01.jpg',
      link: '/gigs'
    },
    { 
      id: 'digital', 
      title: 'Digital Products', 
      description: 'Pay once. Download instantly, use forever.',
      name: 'Digital Products',
      image: '/assets/img/gigs/gigs-05.jpg',
      link: '/digital-products'
    },
    { 
      id: 'software', 
      title: 'Business Software', 
      description: 'Streamline your business operations',
      name: 'Software',
      image: '/assets/img/gigs/gigs-11.jpg',
      link: '/software'
    }
  ];
  
  // Function to change category set with transition
  const changeCategorySet = (index: number) => {
    if (isTransitioning) return;
    
    // Handle infinite scrolling
    let targetIndex = index;
    if (index < 0) {
      targetIndex = mainCategories.length - 1;
    } else if (index >= mainCategories.length) {
      targetIndex = 0;
    }
    
    setIsTransitioning(true);
    setActiveCategorySet(targetIndex);
    
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector('.appsumo-category-card')?.clientWidth || 0;
      const gap = 24; // 1.5rem gap
      const scrollPosition = targetIndex * (cardWidth + gap);
      
      sliderRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
    
    // Shorter transition time for better responsiveness
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };
  
  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      changeCategorySet(activeCategorySet + 1);
    }
    
    if (isRightSwipe) {
      changeCategorySet(activeCategorySet - 1);
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };
  
  // Handle arrow navigation with infinite scrolling
  const handlePrevClick = () => {
    changeCategorySet(activeCategorySet - 1);
  };
  
  const handleNextClick = () => {
    changeCategorySet(activeCategorySet + 1);
  };
  
  // Handle scroll events to update active dot
  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current && !isTransitioning) {
        const scrollPosition = sliderRef.current.scrollLeft;
        const cardWidth = sliderRef.current.querySelector('.appsumo-category-card')?.clientWidth || 0;
        const gap = 24; // 1.5rem gap
        
        if (cardWidth > 0) {
          const newIndex = Math.round(scrollPosition / (cardWidth + gap));
          if (newIndex !== activeCategorySet) {
            setActiveCategorySet(newIndex);
          }
        }
      }
    };
    
    const sliderElement = sliderRef.current;
    if (sliderElement) {
      sliderElement.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (sliderElement) {
        sliderElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeCategorySet, isTransitioning]);
  
  const categorySets = [
    [
      { 
        id: 'gigs', 
        title: 'Transform your business with AI', 
        description: 'Find top-rated freelancers for any project',
        name: 'Gigs',
        image: '/assets/img/gigs/gigs-01.jpg',
        link: '/gigs'
      },
      { 
        id: 'digital', 
        title: 'Ready-to-use digital assets', 
        description: 'Download instantly, use forever',
        name: 'Digital Products',
        image: '/assets/img/gigs/gigs-05.jpg',
        link: '/digital-products'
      },
      { 
        id: 'software', 
        title: 'Powerful software solutions', 
        description: 'Streamline your business operations',
        name: 'Software',
        image: '/assets/img/software/software-01.jpg',
        link: '/software',
        fullWidth: true
      }
    ],
    [
      { 
        id: 'marketing', 
        title: 'Boost your online presence', 
        description: 'Expert marketing services for your business',
        name: 'Marketing',
        image: '/assets/img/gigs/gigs-03.jpg',
        link: '/marketing'
      },
      { 
        id: 'design', 
        title: 'Professional design services', 
        description: 'Stand out with stunning visuals',
        name: 'Design',
        image: '/assets/img/gigs/gigs-07.jpg',
        link: '/design'
      },
      { 
        id: 'writing', 
        title: 'Compelling content creation', 
        description: 'Words that convert and engage',
        name: 'Writing',
        image: '/assets/img/gigs/gigs-09.jpg',
        link: '/writing',
        fullWidth: true
      }
    ],
    [
      { 
        id: 'video', 
        title: 'Professional video production', 
        description: 'Bring your ideas to life with motion',
        name: 'Video',
        image: '/assets/img/gigs/gigs-11.jpg',
        link: '/video'
      },
      { 
        id: 'audio', 
        title: 'High-quality audio services', 
        description: 'Sound that resonates with your audience',
        name: 'Audio',
        image: '/assets/img/gigs/gigs-02.jpg',
        link: '/audio'
      },
      { 
        id: 'consulting', 
        title: 'Expert consulting services', 
        description: 'Strategic guidance for your business',
        name: 'Consulting',
        image: '/assets/img/gigs/gigs-04.jpg',
        link: '/consulting',
        fullWidth: true
      }
    ]
  ];

  // Featured categories
  const categories = [
    { id: 1, name: 'Digital Marketing', icon: '/assets/img/aimporo-logo.png' },
    { id: 2, name: 'Web Development', icon: '/assets/img/aimporo-logo.png' },
    { id: 3, name: 'Graphic Design', icon: '/assets/img/aimporo-logo.png' },
    { id: 4, name: 'Content Writing', icon: '/assets/img/aimporo-logo.png' },
    { id: 5, name: 'AI Services', icon: '/assets/img/aimporo-logo.png' },
    { id: 6, name: 'Mobile Apps', icon: '/assets/img/aimporo-logo.png' },
  ];

  // Example gigs with updated image paths to use existing images
  const gigs = [
    {
      id: 1,
      title: 'Professional Logo Design',
      price: 49.99,
      rating: 4.8,
      reviews: 124,
      images: ['/assets/img/gigs/gigs-01.jpg', '/assets/img/gigs/gigs-02.jpg'],
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
      images: ['/assets/img/gigs/gigs-03.jpg', '/assets/img/gigs/gigs-04.jpg'],
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
      images: ['/assets/img/gigs/gigs-05.jpg', '/assets/img/gigs/gigs-06.jpg'],
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
      images: ['/assets/img/gigs/gigs-07.jpg', '/assets/img/gigs/gigs-08.jpg'],
      seller: 'ViralVision',
      location: 'Australia',
      badge: 'Digital Marketing',
      delivery: '3 days'
    },
    // Adding more gigs for better filter demonstration
    {
      id: 5,
      title: 'Mobile App Development',
      price: 299.99,
      rating: 5.0,
      reviews: 42,
      images: ['/assets/img/gigs/gigs-01.jpg', '/assets/img/gigs/gigs-02.jpg'],
      seller: 'AppMasters',
      location: 'San Francisco',
      badge: 'Programming & Tech',
      featured: true,
      hot: true,
      delivery: '7 days'
    },
    {
      id: 6,
      title: 'E-commerce Store Setup',
      price: 249.99,
      rating: 4.5,
      reviews: 78,
      images: ['/assets/img/gigs/gigs-03.jpg', '/assets/img/gigs/gigs-04.jpg'],
      seller: 'ShopifyPro',
      location: 'Toronto',
      badge: 'Digital Marketing',
      hot: false,
      delivery: '3 days'
    },
    {
      id: 7,
      title: 'Video Editing & Production',
      price: 149.99,
      rating: 4.9,
      reviews: 105,
      images: ['/assets/img/gigs/gigs-05.jpg', '/assets/img/gigs/gigs-06.jpg'],
      seller: 'VisualCraft',
      location: 'Los Angeles',
      badge: 'Videography',
      featured: false,
      hot: true,
      delivery: '2 days'
    },
    {
      id: 8,
      title: 'Content Writing Services',
      price: 79.99,
      rating: 4.7,
      reviews: 93,
      images: ['/assets/img/gigs/gigs-07.jpg', '/assets/img/gigs/gigs-08.jpg'],
      seller: 'WordSmith',
      location: 'Chicago',
      badge: 'Writing & Translation',
      featured: false,
      hot: false,
      delivery: '1 day'
    }
  ];

  // State for favorites
  const [favorites, setFavorites] = useState(Array(gigs.length).fill(false));

  // Toggle favorite for a gig
  const toggleFavorite = (index: number) => {
    setFavorites(prev => {
      const newFavorites = [...prev];
      newFavorites[index] = !newFavorites[index];
      return newFavorites;
    });
  };

  // Basic slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  // Let's create a basic test slider
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: 'John Smith',
      role: 'CEO, TechStart',
      rating: 5,
      comment: 'The quality of services I received was exceptional. The seller was professional and delivered exactly what I needed.',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      rating: 5,
      comment: 'AIMporo Marketplace has transformed how we outsource our projects. The platform is intuitive and the talent is outstanding.',
    },
    {
      id: 3,
      name: 'Michael Brown',
      role: 'Freelance Designer',
      rating: 5,
      comment: 'As a freelancer, I\'ve found amazing opportunities through this platform. The payment system is secure and the support is excellent.',
    },
  ];

  // Testimonial slider settings
  const testimonialSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section - AppSumo Style */}
      <section className="appsumo-hero">
        {/* Floating elements for visual appeal */}
        <div className="hero-floating-element hero-floating-element-1"></div>
        <div className="hero-floating-element hero-floating-element-2"></div>
        <div className="hero-floating-element hero-floating-element-3"></div>
        
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Left side - Headline */}
            <div className="lg:col-span-5 flex flex-col justify-center mb-8 lg:mb-0" data-aos="fade-right">
              {/* Main Headline and Subheadline */}
              <div className="mb-8 md:mb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Find the <span className="text-orange-500">perfect talent</span> for your business
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8">
                  Connect with top professionals, digital products, and software solutions all in one place
                </p>
              </div>
              
              <Link href="/gigs" className="appsumo-button inline-block text-center text-lg py-4 px-8">
                SHOP NOW
              </Link>
            </div>
            
            {/* Right side - Featured Categories */}
            <div className="lg:col-span-7 flex items-center">
              <div className="relative appsumo-categories-container w-full">
                {/* Swipeable slider with navigation arrows */}
                <div className="appsumo-slider-navigation">
                  <button 
                    className="appsumo-slider-arrow appsumo-slider-prev" 
                    aria-label="Previous slide"
                    onClick={handlePrevClick}
                  >
                    <svg width="12" height="20" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    className="appsumo-slider-arrow appsumo-slider-next" 
                    aria-label="Next slide"
                    onClick={handleNextClick}
                  >
                    <svg width="12" height="20" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L9 9L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                
                <div 
                  ref={sliderRef}
                  className="appsumo-categories-slider"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {mainCategories.map((category, index) => (
                    <div 
                      key={category.id}
                      className="appsumo-category-card" 
                      data-aos="fade-up" 
                      data-aos-delay={100 + (index * 100)}
                    >
                      {/* Add shine effect div */}
                      <div className="shine-effect"></div>
                      <div className="appsumo-category-content">
                        <h3 className="text-xl font-bold">{category.title}</h3>
                        <p className="text-gray-300">{category.description}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <div>
                            <span className="text-orange-500 font-bold text-base">{category.name}</span>
                          </div>
                          <Link href={category.link} className="appsumo-category-button">
                            Explore
                          </Link>
                        </div>
                      </div>
                      <div className="appsumo-category-image">
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={400}
                          height={300}
                          style={{ objectFit: 'cover', objectPosition: 'center' }}
                          className="w-full h-full"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading={index === 0 ? "eager" : "lazy"}
                          quality={85}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Slider pagination dots */}
                <div className="appsumo-slider-pagination">
                  <div className="appsumo-slider-dots">
                    {[0, 1, 2, 3].map((_, index) => (
                      <button 
                        key={index} 
                        className={`appsumo-slider-dot ${index === activeCategorySet ? 'active' : ''}`}
                        onClick={() => changeCategorySet(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Rest of the content */}
      {/* Featured Gigs Section - Using fixed SlideableGigCards */}
      <SlideableGigCards 
        gigs={gigs} 
        title="Explore Our <span>Gigs.</span>"
        subtitle="Find the perfect services for your business from our diverse range of categories"
      />

      {/* What Makes DreamGigs Different Section */}
      <section className="py-16 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-4 relative">
          {/* Animated background elements */}
          <div className="absolute top-10 left-10 opacity-20 animate-pulse">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="30" fill="#FF6900" fillOpacity="0.3"/>
            </svg>
          </div>
          <div className="absolute bottom-20 right-10 opacity-20" style={{animation: 'pulse 3s infinite'}}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="80" height="80" rx="20" fill="#FF6900" fillOpacity="0.2"/>
            </svg>
          </div>
          
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-orange-500">What Makes</span> DreamGigs Different
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
            <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
              We provide a unique platform that connects talented professionals with clients looking for quality services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-fade-in">
            {/* Feature 1 */}
            <div className="feature-card bg-gray-800 rounded-lg p-8 transition-all">
              <div className="flex flex-col items-start">
                <div className="feature-icon mb-6 flex-shrink-0">
                  <div className="bg-gray-700 p-3 rounded-lg inline-flex items-center justify-center">
                    <svg className="w-10 h-10 text-orange-500" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 3.33334C10.8 3.33334 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6667 20 36.6667C29.2 36.6667 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33334 20 3.33334ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6167L29.3167 10.9667L31.6667 13.3333L16.6667 28.3333Z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Trusted Services</h3>
                <p className="text-gray-300">
                  All our professionals are verified and reviewed by the community, ensuring you get the highest quality service every time.
                </p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="feature-card bg-gray-800 rounded-lg p-8 transition-all">
              <div className="flex flex-col items-start">
                <div className="feature-icon mb-6 flex-shrink-0">
                  <div className="bg-gray-700 p-3 rounded-lg inline-flex items-center justify-center">
                    <svg className="w-10 h-10 text-orange-500" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M33.3334 11.6667H30.0001V8.33334C30.0001 7.00001 28.9834 6.66667 28.3334 6.66667H11.6667C10.3334 6.66667 10.0001 7.68334 10.0001 8.33334V11.6667H6.66671C5.33337 11.6667 5.00004 12.6833 5.00004 13.3333V31.6667C5.00004 33 6.01671 33.3333 6.66671 33.3333H33.3334C34.6667 33.3333 35.0001 32.3167 35.0001 31.6667V13.3333C35.0001 12 33.9834 11.6667 33.3334 11.6667ZM13.3334 10H26.6667V11.6667H13.3334V10ZM31.6667 30H8.33337V15H31.6667V30ZM21.6667 18.3333H28.3334V25H21.6667V18.3333Z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Transparent Pricing</h3>
                <p className="text-gray-300">
                  Clear pricing with no hidden fees. Know exactly what you're paying for before you commit to any service.
                </p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="feature-card bg-gray-800 rounded-lg p-8 transition-all">
              <div className="flex flex-col items-start">
                <div className="feature-icon mb-6 flex-shrink-0">
                  <div className="bg-gray-700 p-3 rounded-lg inline-flex items-center justify-center">
                    <svg className="w-10 h-10 text-orange-500" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 3.33334C10.8 3.33334 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6667 20 36.6667C29.2 36.6667 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33334 20 3.33334ZM20 33.3333C12.65 33.3333 6.66671 27.35 6.66671 20C6.66671 12.65 12.65 6.66667 20 6.66667C27.35 6.66667 33.3334 12.65 33.3334 20C33.3334 27.35 27.35 33.3333 20 33.3333ZM20.8334 11.6667H18.3334V21.6667L27.0834 26.9167L28.3334 24.85L20.8334 20.4167V11.6667Z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Fast Delivery</h3>
                <p className="text-gray-300">
                  Get your projects completed on time, every time. Our professionals are committed to meeting deadlines without compromising quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Software Section */}
      {isClient && (
        <>
          {/* Software Products Data */}
          {(() => {
            // Example software products with updated image paths to use existing images
            const softwareProducts = [
              {
                id: 1,
                title: 'Project Management Software',
                price: 99.99,
                rating: 4.9,
                reviews: 128,
                images: ['/assets/img/software/software-01.jpg', '/assets/img/gigs/gigs-02.jpg'],
                seller: 'TechSolutions',
                location: 'San Francisco',
                badge: 'Software',
                featured: true,
                hot: true,
                delivery: 'Instant'
              },
              {
                id: 2,
                title: 'CRM System',
                price: 149.99,
                rating: 4.8,
                reviews: 86,
                images: ['/assets/img/software/software-02.jpg', '/assets/img/gigs/gigs-04.jpg'],
                seller: 'BusinessPro',
                location: 'New York',
                badge: 'Software',
                hot: true,
                delivery: 'Instant'
              },
              {
                id: 3,
                title: 'Accounting Software',
                price: 129.99,
                rating: 4.7,
                reviews: 92,
                images: ['/assets/img/software/software-03.jpg', '/assets/img/gigs/gigs-06.jpg'],
                seller: 'FinancePro',
                location: 'Chicago',
                badge: 'Software',
                featured: true,
                delivery: 'Instant'
              },
              {
                id: 4,
                title: 'HR Management System',
                price: 119.99,
                rating: 4.6,
                reviews: 74,
                images: ['/assets/img/software/software-04.jpg', '/assets/img/gigs/gigs-08.jpg'],
                seller: 'HRSolutions',
                location: 'Boston',
                badge: 'Software',
                delivery: 'Instant'
              },
              {
                id: 5,
                title: 'E-commerce Platform',
                price: 199.99,
                rating: 4.9,
                reviews: 118,
                images: ['/assets/img/software/software-05.jpg', '/assets/img/gigs/gigs-01.jpg'],
                seller: 'ShopTech',
                location: 'Seattle',
                badge: 'Software',
                featured: true,
                hot: true,
                delivery: 'Instant'
              },
              {
                id: 6,
                title: 'Marketing Automation Tool',
                price: 89.99,
                rating: 4.7,
                reviews: 82,
                images: ['/assets/img/software/software-06.jpg', '/assets/img/gigs/gigs-03.jpg'],
                seller: 'MarketPro',
                location: 'Austin',
                badge: 'Software',
                hot: false,
                delivery: 'Instant'
              }
            ];
            
            return (
              <SlideableGigCards 
                gigs={softwareProducts} 
                title="Explore Our <span>Software.</span>"
                subtitle="Discover powerful software solutions to streamline your business operations"
              />
            );
          })()}
        </>
      )}

      {/* We're here to help section */}
      <section className="py-16 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-4 relative">
          {/* Animated background elements */}
          <div className="absolute top-10 left-10 opacity-20 animate-pulse">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="30" fill="#FF6900" fillOpacity="0.3"/>
            </svg>
          </div>
          <div className="absolute bottom-20 right-10 opacity-20" style={{animation: 'pulse 3s infinite'}}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="80" height="80" rx="20" fill="#FF6900" fillOpacity="0.2"/>
            </svg>
          </div>
          
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-orange-500">We're</span> here help to find your Needs.
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
            <p className="text-gray-300 font-medium mt-4">
              Over 74K listings of Gigs- available today for you.
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 md:p-10 mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 stagger-fade-in">
              {/* Buy a Service Card */}
              <div className="feature-card bg-gray-800 rounded-lg p-6 transition-all">
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                  <div className="feature-icon mr-0 mb-4 md:mb-0 flex-shrink-0 icon-pulse">
                    <div className="bg-gray-700 p-3 rounded-lg inline-flex items-center justify-center w-16 h-16">
                      <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="md:ml-6">
                    <h3 className="text-xl font-bold mb-4 text-white">Buy a Service</h3>
                    <p className="text-gray-300 mb-6">
                      Explore homy's 50K+ Service and uncover your ideal needs.
                    </p>
                    <a href="/services" className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                      Get Started
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Sell a Service Card */}
              <div className="feature-card bg-gray-800 rounded-lg p-6 transition-all">
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                  <div className="feature-icon mr-0 mb-4 md:mb-0 flex-shrink-0 icon-pulse">
                    <div className="bg-gray-700 p-3 rounded-lg inline-flex items-center justify-center w-16 h-16">
                      <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="md:ml-6">
                    <h3 className="text-xl font-bold mb-4 text-white">Sell a Service</h3>
                    <p className="text-gray-300 mb-6">
                      Explore homy's 50K+ Service and uncover your ideal needs.
                    </p>
                    <a href="/sell" className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                      Add Service
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Join Us Card */}
              <div className="feature-card bg-gray-800 rounded-lg p-6 transition-all">
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                  <div className="feature-icon mr-0 mb-4 md:mb-0 flex-shrink-0 icon-pulse">
                    <div className="bg-gray-700 p-3 rounded-lg inline-flex items-center justify-center w-16 h-16">
                      <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="md:ml-6">
                    <h3 className="text-xl font-bold mb-4 text-white">Join Us</h3>
                    <p className="text-gray-300 mb-6">
                      Explore homy's 50K+ Service and uncover your ideal needs.
                    </p>
                    <a href="/join" className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                      Get Started
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Products Section */}
      {isClient && (
        <>
          {/* Digital Products Data */}
          {(() => {
            // Example digital products with updated image paths to use existing images
            const digitalProducts = [
              {
                id: 1,
                title: 'Premium Photoshop Actions Pack',
                price: 29.99,
                rating: 4.8,
                reviews: 156,
                images: ['/assets/img/gigs/gigs-09.jpg', '/assets/img/gigs/gigs-10.jpg'],
                seller: 'DesignAssets',
                location: 'California',
                badge: 'Design Resources',
                featured: true,
                hot: true,
                delivery: 'Instant'
              },
              {
                id: 2,
                title: 'Social Media Marketing eBook',
                price: 19.99,
                rating: 4.7,
                reviews: 92,
                images: ['/assets/img/gigs/gigs-11.jpg', '/assets/img/gigs/gigs-12.jpg'],
                seller: 'MarketingPro',
                location: 'Chicago',
                badge: 'eBooks & Guides',
                hot: true,
                delivery: 'Instant'
              },
              {
                id: 3,
                title: 'UI/UX Design System Template',
                price: 59.99,
                rating: 4.9,
                reviews: 78,
                images: ['/assets/img/gigs/gigs-05.jpg', '/assets/img/gigs/gigs-06.jpg'],
                seller: 'UXMasters',
                location: 'Berlin',
                badge: 'UI Templates',
                featured: true,
                delivery: 'Instant'
              },
              {
                id: 4,
                title: 'Stock Photo Collection (100 Images)',
                price: 39.99,
                rating: 4.6,
                reviews: 64,
                images: ['/assets/img/gigs/gigs-07.jpg', '/assets/img/gigs/gigs-08.jpg'],
                seller: 'StockImagery',
                location: 'Paris',
                badge: 'Photography',
                delivery: 'Instant'
              },
              {
                id: 5,
                title: 'WordPress Theme - Business Pro',
                price: 49.99,
                rating: 4.8,
                reviews: 112,
                images: ['/assets/img/gigs/gigs-01.jpg', '/assets/img/gigs/gigs-02.jpg'],
                seller: 'ThemeForge',
                location: 'Sydney',
                badge: 'WordPress',
                featured: true,
                hot: true,
                delivery: 'Instant'
              },
              {
                id: 6,
                title: 'Video Editing Presets Pack',
                price: 34.99,
                rating: 4.7,
                reviews: 86,
                images: ['/assets/img/gigs/gigs-03.jpg', '/assets/img/gigs/gigs-04.jpg'],
                seller: 'FilmEffects',
                location: 'Los Angeles',
                badge: 'Video Resources',
                hot: false,
                delivery: 'Instant'
              },
              {
                id: 7,
                title: 'SEO Strategy Guide 2023',
                price: 24.99,
                rating: 4.9,
                reviews: 73,
                images: ['/assets/img/gigs/gigs-09.jpg', '/assets/img/gigs/gigs-10.jpg'],
                seller: 'SEOguru',
                location: 'Toronto',
                badge: 'Digital Marketing',
                featured: true,
                delivery: 'Instant'
              },
              {
                id: 8,
                title: 'Premium Icon Pack (500+ Icons)',
                price: 19.99,
                rating: 4.8,
                reviews: 95,
                images: ['/assets/img/gigs/gigs-11.jpg', '/assets/img/gigs/gigs-12.jpg'],
                seller: 'IconCraft',
                location: 'Amsterdam',
                badge: 'Design Resources',
                hot: true,
                delivery: 'Instant'
              }
            ];
            
            return (
              <SlideableGigCards 
                gigs={digitalProducts} 
                title="Explore Our Digital <span>Products.</span>"
                subtitle="Download ready-to-use digital assets created by our talented community"
              />
            );
          })()}
        </>
      )}

      {/* Categories Section */}
      <section className="py-16 bg-black category-section">
        <div className="container mx-auto px-4 relative z-10">
          {/* Animated background elements */}
          <div className="absolute top-10 left-10 opacity-20 animate-pulse">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="30" fill="#FF6900" fillOpacity="0.3"/>
            </svg>
          </div>
          <div className="absolute bottom-20 right-10 opacity-20" style={{animation: 'float-element 15s infinite alternate ease-in-out'}}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="80" height="80" rx="20" fill="#FF6900" fillOpacity="0.2"/>
            </svg>
          </div>
          
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              <span className="relative inline-block">
                Popular <span className="text-orange-500">Categories.</span>
                <span className="absolute -bottom-2 left-0 w-24 h-1 bg-orange-500"></span>
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
            {/* Digital Marketing */}
            <div className="category-box" data-aos="fade-up" data-aos-delay="100">
              <div className="category-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.59 13.51L15.42 17.49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.41 6.51L8.59 10.49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="category-title">Digital Marketing</h3>
              <p className="category-count">100 Services</p>
            </div>
            
            {/* Programming & Tech */}
            <div className="category-box" data-aos="fade-up" data-aos-delay="150">
              <div className="category-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 18L22 12L16 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 6L2 12L8 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="category-title">Programming & Tech</h3>
              <p className="category-count">200 Services</p>
            </div>
            
            {/* Writing Translation */}
            <div className="category-box" data-aos="fade-up" data-aos-delay="200">
              <div className="category-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19L19 12L22 15L15 22L12 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 13L16.5 5.5L2 2L5.5 16.5L13 18L18 13Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 2L9.586 9.586" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 13C12.1046 13 13 12.1046 13 11C13 9.89543 12.1046 9 11 9C9.89543 9 9 9.89543 9 11C9 12.1046 9.89543 13 11 13Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="category-title">Writing Translation</h3>
              <p className="category-count">180 Services</p>
            </div>
            
            {/* Photography */}
            <div className="category-box" data-aos="fade-up" data-aos-delay="250">
              <div className="category-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="category-title">Photography</h3>
              <p className="category-count">230 Services</p>
            </div>
            
            {/* Artificial Intelligence */}
            <div className="category-box" data-aos="fade-up" data-aos-delay="300">
              <div className="category-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="category-title">Artificial Intelligence</h3>
              <p className="category-count">310 Services</p>
            </div>
            
            {/* Music & Audio */}
            <div className="category-box" data-aos="fade-up" data-aos-delay="350">
              <div className="category-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18V5L21 3V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 21C7.65685 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 19C19.6569 19 21 17.6569 21 16C21 14.3431 19.6569 13 18 13C16.3431 13 15 14.3431 15 16C15 17.6569 16.3431 19 18 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="category-title">Music & Audio</h3>
              <p className="category-count">270 Services</p>
            </div>
            
            {/* Design */}
            <div className="category-box" data-aos="fade-up" data-aos-delay="400">
              <div className="category-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19L19 12L22 15L15 22L12 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 13L16.5 5.5L2 2L5.5 16.5L13 18L18 13Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 2L9.586 9.586" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 13C12.1046 13 13 12.1046 13 11C13 9.89543 12.1046 9 11 9C9.89543 9 9 9.89543 9 11C9 12.1046 9.89543 13 11 13Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="category-title">Design</h3>
              <p className="category-count">450 Services</p>
            </div>
            
            {/* Business */}
            <div className="category-box" data-aos="fade-up" data-aos-delay="450">
              <div className="category-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="category-title">Business</h3>
              <p className="category-count">330 Services</p>
            </div>
            
            {/* Marketing & Sales */}
            <div className="category-box" data-aos="fade-up" data-aos-delay="500">
              <div className="category-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 20V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 20V4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 20V14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="category-title">Marketing & Sales</h3>
              <p className="category-count">250 Services</p>
            </div>
            
            {/* Social Media */}
            <div className="category-box" data-aos="fade-up" data-aos-delay="550">
              <div className="category-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.59 13.51L15.42 17.49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.41 6.51L8.59 10.49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="category-title">Social Media</h3>
              <p className="category-count">180 Services</p>
            </div>
          </div>
          
          <div className="absolute -bottom-10 -left-10 z-0">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.05">
              <path d="M100 0L200 100L100 200L0 100L100 0Z" fill="#FF6900"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="relative mb-12 text-center">
            <div className="absolute left-1/4 -top-6">
              <div className="h-4 w-4 rounded-full bg-orange-500"></div>
            </div>
            <div className="absolute right-1/3 -top-10">
              <div className="h-8 w-8 rounded-full border-2 border-orange-300"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Why People Love <span className="text-orange-500">with</span> DreamGigs
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial Card 1 */}
            <div className="testimonial-card">
              <div className="text-orange-500 text-4xl font-serif mb-4">"</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Great <span className="text-orange-500">Work</span></h3>
              <p className="text-gray-700 mb-6">
                "The best part about this service is the variety of skills available. I've hired designers, writers, and developers, all in one place."
              </p>
              <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                      ))}
                    </div>
              <div className="testimonial-user">
                <img 
                  src="/assets/img/profiles/avatar-1.jpg" 
                  alt="Gloria Weber" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-800">Gloria Weber</h4>
                  <p className="text-sm text-gray-600">United States</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial Card 2 */}
            <div className="testimonial-card">
              <div className="text-orange-500 text-4xl font-serif mb-4">"</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Seamless <span className="text-orange-500">Experience</span></h3>
              <p className="text-gray-700 mb-6">
                "I've completed several gigs on this site, and the experience has been seamless every time. Great for both freelancers and clients!"
              </p>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
                      </div>
              <div className="testimonial-user">
                <img 
                  src="/assets/img/profiles/avatar-2.jpg" 
                  alt="John Cramer" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                      <div>
                  <h4 className="font-medium text-gray-800">John Cramer</h4>
                  <p className="text-sm text-gray-600">UK</p>
                      </div>
                    </div>
                  </div>
            
            {/* Testimonial Card 3 */}
            <div className="testimonial-card">
              <div className="text-orange-500 text-4xl font-serif mb-4">"</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Great <span className="text-orange-500">Work</span></h3>
              <p className="text-gray-700 mb-6">
                "Finding the right freelancer for my project has never been easier. The platform is user-friendly, and the quality of talent is exceptional."
              </p>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
              <div className="testimonial-user">
                <img 
                  src="/assets/img/profiles/avatar-3.jpg" 
                  alt="Mary Marquez" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-800">Mary Marquez</h4>
                  <p className="text-sm text-gray-600">United States</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <button className="testimonial-nav-btn">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 1L1 7L7 13"></path>
              </svg>
            </button>
            <button className="testimonial-nav-btn">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 13L7 7L1 1"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-[#FF6900] text-white">
        <div className="container mx-auto px-4 text-center">
          <div data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">Join thousands of businesses and professionals on AIMporo Marketplace today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="bg-white text-[#FF6900] hover:bg-gray-100 px-8 py-3 rounded-lg font-medium">
                Sign Up Now
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-white hover:bg-white hover:text-[#FF6900] px-8 py-3 rounded-lg font-medium">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
