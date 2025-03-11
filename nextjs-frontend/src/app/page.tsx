'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import GigCard from '../components/GigCard';
import SlideableGigCards from '../components/SlideableGigCards';
import { useRouter } from 'next/navigation';

// Add AOS type declaration
declare global {
  interface Window {
    AOS: any;
  }
}

export default function Home() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Navigation function
  const navigateToMarketplace = () => {
    console.log('Navigating to marketplace');
    router.push('/marketplace');
  };
  
  // Direct navigation function that doesn't rely on Next.js router
  const goToMarketplace = () => {
    console.log('Going to marketplace via direct navigation');
    // Use direct window location for maximum compatibility
    window.location.href = '/marketplace';
  };

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
  
  // State for category slider - start with a high index in the middle of our array
  const [activeCategorySet, setActiveCategorySet] = useState(15); // Start in the middle of our array
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Main categories only
  const mainCategories = [
    { 
      id: 'gigs', 
      title: 'Growth Hacking Services', 
      description: 'Find top-rated freelancers for any project',
      name: 'Gigs',
      image: '/assets/img/categories/growth-hacking.png',
      link: '/gigs'
    },
    { 
      id: 'digital', 
      title: 'Digital Products', 
      description: 'Pay once. Download instantly, use forever.',
      name: 'Digital Products',
      image: '/assets/img/categories/digital-products.png',
      link: '/digital-products'
    },
    { 
      id: 'software', 
      title: 'Business Software', 
      description: 'Streamline your business operations',
      name: 'Software',
      image: '/assets/img/categories/business-software.png',
      link: '/software'
    }
  ];
  
  // Create a much longer array for truly infinite scrolling
  // We'll create 10 copies of the array to ensure we never reach the end
  const continuousCarouselItems = Array(10).fill(null).flatMap(() => [...mainCategories]);
  
  // Function to handle carousel navigation
  const changeCategorySet = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Handle infinite scrolling at edges
    let targetIndex = index;
    if (index < 0) {
      targetIndex = continuousCarouselItems.length - 1;
    } else if (index >= continuousCarouselItems.length) {
      targetIndex = 0;
    }
    
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
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };
  
  // Handle arrow navigation with infinite scroll
  const handlePrevClick = () => {
    changeCategorySet(activeCategorySet - 1);
  };
  
  const handleNextClick = () => {
    changeCategorySet(activeCategorySet + 1);
  };
  
  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
    
    // Also update scroll position for direct feedback during touch
    if (sliderRef.current && touchStart) {
      const distance = touchStart - e.touches[0].clientX;
      sliderRef.current.scrollLeft += distance / 5;
      setTouchStart(e.touches[0].clientX);
    }
  };
  
  // Handle touch events for swipe with infinite scroll
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      // Handle infinite scrolling for touch swipe
      let newIndex = activeCategorySet + 1;
      if (newIndex >= continuousCarouselItems.length) {
        newIndex = 0;
      }
      changeCategorySet(newIndex);
    }
    
    if (isRightSwipe) {
      // Handle infinite scrolling for touch swipe
      let newIndex = activeCategorySet - 1;
      if (newIndex < 0) {
        newIndex = continuousCarouselItems.length - 1;
      }
      changeCategorySet(newIndex);
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };
  
  // Set initial position to the middle of the array
  useEffect(() => {
    if (sliderRef.current && isClient) {
      // Start in the middle of our very long array to ensure we have room to scroll in both directions
      const initialIndex = Math.floor(continuousCarouselItems.length / 2);
      setActiveCategorySet(initialIndex);
      
      const cardWidth = sliderRef.current.querySelector('.appsumo-category-card')?.clientWidth || 0;
      const gap = 24;
      const scrollPosition = initialIndex * (cardWidth + gap);
      
      sliderRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'auto' // No animation for initial position
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, continuousCarouselItems.length]);
  
  // Add global mouse up event to handle cases where mouse is released outside the slider
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);
  
  // Handle scroll events to detect when we need to implement infinite scrolling
  useEffect(() => {
    const handleInfiniteScroll = () => {
      if (sliderRef.current && !isTransitioning) {
        const scrollPosition = sliderRef.current.scrollLeft;
        const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        
        // If we're at the beginning or end, implement infinite scrolling
        if (scrollPosition <= 0 && activeCategorySet === 0) {
          // We're at the beginning, jump to the end
          const newIndex = continuousCarouselItems.length - 1;
          setTimeout(() => {
            changeCategorySet(newIndex);
          }, 50);
        } else if (scrollPosition >= maxScroll && activeCategorySet === continuousCarouselItems.length - 1) {
          // We're at the end, jump to the beginning
          setTimeout(() => {
            changeCategorySet(0);
          }, 50);
        }
      }
    };
    
    const sliderElement = sliderRef.current;
    if (sliderElement) {
      sliderElement.addEventListener('scroll', handleInfiniteScroll);
    }
    
    return () => {
      if (sliderElement) {
        sliderElement.removeEventListener('scroll', handleInfiniteScroll);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategorySet, isTransitioning, continuousCarouselItems.length]);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current && !isTransitioning) {
        const scrollPosition = sliderRef.current.scrollLeft;
        const cardWidth = sliderRef.current.querySelector('.appsumo-category-card')?.clientWidth || 0;
        const gap = 24;
        
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
        image: '/assets/img/test/Automated Purchase Order.png',
        link: '/digital-products'
      },
      { 
        id: 'software', 
        title: 'Powerful software solutions', 
        description: 'Streamline your business operations',
        name: 'Software',
        image: '/assets/img/test/Bill of Materials.png',
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
        image: '/assets/img/test/Class Student Manager.jpg',
        link: '/marketing'
      },
      { 
        id: 'design', 
        title: 'Professional design services', 
        description: 'Stand out with stunning visuals',
        name: 'Design',
        image: '/assets/img/test/Clinic Manager.jpg',
        link: '/design'
      },
      { 
        id: 'writing', 
        title: 'Compelling content creation', 
        description: 'Words that convert and engage',
        name: 'Writing',
        image: '/assets/img/test/Company Payroll System 3.png',
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
        image: '/assets/img/test/Construction Estimator.png',
        link: '/video'
      },
      { 
        id: 'audio', 
        title: 'High-quality audio services', 
        description: 'Sound that resonates with your audience',
        name: 'Audio',
        image: '/assets/img/test/Automated Purchase Order.png',
        link: '/audio'
      },
      { 
        id: 'consulting', 
        title: 'Expert consulting services', 
        description: 'Strategic guidance for your business',
        name: 'Consulting',
        image: '/assets/img/test/Bill of Materials.png',
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

  // Example gigs data
  const gigs = [
    {
      id: 1,
      title: 'Professional Logo Design',
      price: 99.99,
      original_price: 149.99,
      rating: 4.9,
      reviews: 128,
      images: ['/assets/img/test/Automated Purchase Order.png', '/assets/img/test/Bill of Materials.png'],
      seller: 'LogoMaster',
      location: 'New York',
      badge: 'Logo Design',
      featured: true,
      hot: true,
      delivery: '3 days',
      description: 'I will design a professional, modern logo for your business or brand. Includes unlimited revisions, multiple concepts, and all file formats you need for print and digital use.',
      short_description: 'Professional, modern logo design.\nUnlimited revisions and multiple concepts.\nAll file formats for print and digital use.'
    },
    {
      id: 2,
      title: 'Website Development - WordPress',
      price: 299.99,
      original_price: 399.99,
      rating: 4.8,
      reviews: 95,
      images: ['/assets/img/test/Class Student Manager.jpg', '/assets/img/test/Clinic Manager.jpg'],
      seller: 'WebDev',
      location: 'London',
      badge: 'Web Development',
      hot: true,
      delivery: '7 days',
      description: 'I will create a professional WordPress website for your business or personal brand. Includes responsive design, SEO optimization, and integration with your preferred plugins and tools.',
      short_description: 'Professional WordPress website development.\nResponsive design and SEO optimization.\nCustom plugin integration and setup.'
    },
    {
      id: 3,
      title: 'Social Media Management',
      price: 199.99,
      original_price: 249.99,
      rating: 4.7,
      reviews: 87,
      images: ['/assets/img/test/Company Payroll System 3.png', '/assets/img/test/Construction Estimator.png'],
      seller: 'SocialPro',
      location: 'Miami',
      badge: 'Social Media',
      featured: true,
      delivery: '30 days',
      description: 'I will manage your social media accounts for one month, creating and scheduling content, engaging with your audience, and providing analytics reports to track growth and engagement.',
      short_description: 'Complete social media management for one month.\nContent creation and audience engagement.\nDetailed analytics and growth reports.'
    },
    {
      id: 4,
      title: 'SEO Optimization Package',
      price: 149.99,
      original_price: 199.99,
      rating: 4.6,
      reviews: 76,
      images: ['/assets/img/test/Automated Purchase Order.png', '/assets/img/test/Bill of Materials.png'],
      seller: 'SEOexpert',
      location: 'Chicago',
      badge: 'SEO',
      delivery: '14 days',
      description: 'I will optimize your website for search engines to improve your rankings and organic traffic. Includes keyword research, on-page optimization, technical SEO audit, and backlink strategy.',
      short_description: 'Complete website SEO optimization package.\nKeyword research and on-page optimization.\nTechnical audit and backlink strategy.'
    },
    {
      id: 5,
      title: 'Professional Video Editing',
      price: 89.99,
      original_price: 129.99,
      rating: 4.8,
      reviews: 104,
      images: ['/assets/img/test/Class Student Manager.jpg', '/assets/img/test/Clinic Manager.jpg'],
      seller: 'VideoEditor',
      location: 'Los Angeles',
      badge: 'Video Editing',
      featured: true,
      delivery: '5 days',
      description: 'I will professionally edit your video content for YouTube, social media, or business presentations. Includes color correction, transitions, effects, music, and basic animation.',
      short_description: 'Professional video editing service.\nColor correction, transitions, and effects.\nMusic integration and basic animation.'
    },
    {
      id: 6,
      title: 'Content Writing Services',
      price: 79.99,
      original_price: 99.99,
      rating: 4.7,
      reviews: 92,
      images: ['/assets/img/test/Company Payroll System 3.png', '/assets/img/test/Construction Estimator.png'],
      seller: 'ContentPro',
      location: 'Toronto',
      badge: 'Content Writing',
      hot: true,
      delivery: '3 days',
      description: 'I will write engaging, SEO-optimized content for your website, blog, or marketing materials. Includes research, keyword optimization, and up to 2 revisions to ensure your satisfaction.',
      short_description: 'SEO-optimized content writing services.\nResearch-backed and engaging articles.\nUp to 2 revisions included.'
    },
    {
      id: 7,
      title: 'E-commerce Product Photography',
      price: 149.99,
      original_price: 199.99,
      rating: 4.9,
      reviews: 68,
      images: ['/assets/img/test/Automated Purchase Order.png', '/assets/img/test/Bill of Materials.png'],
      seller: 'ProductShots',
      location: 'Berlin',
      badge: 'Photography',
      delivery: '7 days',
      description: 'I will provide professional product photography for your e-commerce store. Includes high-resolution images, multiple angles, lifestyle shots, and basic retouching for up to 10 products.',
      short_description: 'Professional e-commerce product photography.\nHigh-resolution images with multiple angles.\nLifestyle shots and basic retouching included.'
    },
    {
      id: 8,
      title: 'Mobile App UI/UX Design',
      price: 249.99,
      original_price: 349.99,
      rating: 4.8,
      reviews: 83,
      images: ['/assets/img/test/Class Student Manager.jpg', '/assets/img/test/Clinic Manager.jpg'],
      seller: 'AppDesigner',
      location: 'San Francisco',
      badge: 'UI/UX Design',
      hot: true,
      delivery: '10 days',
      description: 'I will design a modern, user-friendly UI/UX for your mobile application. Includes wireframes, high-fidelity mockups, interactive prototypes, and design system documentation.',
      short_description: 'Modern mobile app UI/UX design.\nWireframes and high-fidelity mockups.\nInteractive prototypes and design system.'
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

  // Handle mouse events for drag-to-swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    if (sliderRef.current) {
      setIsDragging(true);
      setDragStart(e.clientX);
      // Prevent default behavior to avoid text selection during drag
      e.preventDefault();
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && sliderRef.current) {
      e.preventDefault(); // Prevent any default behavior during drag
      const currentPosition = e.clientX;
      const distance = dragStart - currentPosition;
      
      // Directly update the scroll position based on mouse movement
      sliderRef.current.scrollLeft += distance;
      
      // Update drag start position for next move event
      setDragStart(currentPosition);
    }
  };
  
  const handleMouseUp = () => {
    if (isDragging && sliderRef.current) {
      setIsDragging(false);
      
      // After releasing, snap to the nearest card
      if (sliderRef.current) {
        const scrollPosition = sliderRef.current.scrollLeft;
        const cardWidth = sliderRef.current.querySelector('.appsumo-category-card')?.clientWidth || 0;
        const gap = 24; // 1.5rem gap
        
        if (cardWidth > 0) {
          // Calculate the index based on scroll position
          let newIndex = Math.round(scrollPosition / (cardWidth + gap));
          
          // Handle infinite scrolling for mouse drag
          if (newIndex < 0) {
            newIndex = continuousCarouselItems.length - 1;
          } else if (newIndex >= continuousCarouselItems.length) {
            newIndex = 0;
          }
          
          changeCategorySet(newIndex);
        }
      }
    }
  };
  
  // Handle mouse leave to prevent stuck dragging state
  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp(); // Use the same logic as mouse up
    }
  };

  return (
    <main className="overflow-x-hidden overflow-y-auto">
      {/* Hero Section - AppSumo Style */}
      <section className="appsumo-hero">
        {/* Floating elements for visual appeal */}
        <div className="hero-floating-element hero-floating-element-1"></div>
        <div className="hero-floating-element hero-floating-element-2"></div>
        <div className="hero-floating-element hero-floating-element-3"></div>
        
        <div className="container mx-auto px-4 py-6 md:py-10 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 w-full">
            {/* Left side - Headline */}
            <div 
              className="lg:col-span-5 flex flex-col justify-center mb-6 lg:mb-0" 
              data-aos="fade-right"
            >
              {/* Main Headline and Subheadline */}
              <div className="mb-6 md:mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  The Marketplace to <span className="text-orange-500">Amplify</span> businesses 10X more.
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6">
                  Connect with top strategists and specialists, digital products, and software solutions all in one place
                </p>
              </div>
              
              <div style={{ position: 'relative', zIndex: 1000 }}>
                <a 
                  href="/marketplace"
                  style={{
                    backgroundColor: isPressed ? '#E05800' : isHovered ? '#FF7A1F' : '#FF6900',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '12px 24px',
                    borderRadius: '50px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'uppercase',
                    position: 'relative',
                    zIndex: 999,
                    boxShadow: isHovered ? '0 8px 20px rgba(255, 105, 0, 0.4)' : '0 4px 12px rgba(255, 105, 0, 0.3)',
                    transform: isPressed ? 'translateY(2px)' : isHovered ? 'translateY(-3px)' : 'none',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => {
                    setIsHovered(false);
                    setIsPressed(false);
                  }}
                  onMouseDown={() => setIsPressed(true)}
                  onMouseUp={() => setIsPressed(false)}
                >
                  SHOP NOW
                </a>
              </div>
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
                  className={`appsumo-categories-slider ${isDragging ? 'dragging' : ''}`}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                >
                  {continuousCarouselItems.map((category, index) => (
                    <div 
                      key={`${category.id}-${index}`}
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
                          width={600}
                          height={400}
                          style={{ 
                            objectFit: 'cover' as 'cover', 
                            objectPosition: 'center',
                            width: '100%',
                            height: '100%'
                          }}
                          className="w-full h-full rounded-b-xl"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 3} // Prioritize loading the first few images
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Custom navigation buttons below the cards */}
                <div className="category-arrows-container">
                  <div className="category-arrows-wrapper">
                    <button 
                      className="category-arrow-btn" 
                      onClick={handlePrevClick}
                      aria-label="Previous slide"
                    >
                      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button 
                      className="category-arrow-btn" 
                      onClick={handleNextClick}
                      aria-label="Next slide"
                    >
                      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
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
        isServices={true}
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
                original_price: 149.99,
                rating: 4.9,
                reviews: 128,
                images: ['/assets/img/test/Company Payroll System 3.png', '/assets/img/test/Construction Estimator.png'],
                seller: 'TechSolutions',
                location: 'San Francisco',
                badge: 'Software',
                featured: true,
                hot: true,
                delivery: 'Instant',
                description: 'A comprehensive project management software solution for teams of all sizes. Features include task tracking, team collaboration, Gantt charts, and resource allocation.',
                short_description: 'Comprehensive project management solution.\nTask tracking and team collaboration features.\nGantt charts and resource allocation tools.'
              },
              {
                id: 2,
                title: 'CRM System',
                price: 149.99,
                original_price: 199.99,
                rating: 4.8,
                reviews: 86,
                images: ['/assets/img/test/Attendace Template.png', '/assets/img/test/Bill of Materials.png'],
                seller: 'BusinessPro',
                location: 'New York',
                badge: 'Software',
                hot: true,
                delivery: 'Instant',
                description: 'A powerful customer relationship management system to manage leads, customers, and sales. Includes contact management, sales pipeline, and reporting features.',
                short_description: 'Powerful customer relationship management system.\nContact management and sales pipeline tools.\nComprehensive reporting and analytics features.'
              },
              {
                id: 3,
                title: 'Accounting Software',
                price: 129.99,
                original_price: 179.99,
                rating: 4.7,
                reviews: 92,
                images: ['/assets/img/test/Class Student Manager.jpg', '/assets/img/test/Clinic Manager.jpg'],
                seller: 'FinancePro',
                location: 'Chicago',
                badge: 'Software',
                featured: true,
                delivery: 'Instant',
                description: 'A complete accounting software solution for small to medium businesses. Features include invoicing, expense tracking, financial reporting, and tax preparation.',
                short_description: 'Complete accounting software for businesses.\nInvoicing and expense tracking functionality.\nFinancial reporting and tax preparation tools.'
              },
              {
                id: 4,
                title: 'HR Management System',
                price: 119.99,
                original_price: 159.99,
                rating: 4.6,
                reviews: 74,
                images: ['/assets/img/test/Company Payroll System 3.png', '/assets/img/test/Construction Estimator.png'],
                seller: 'HRSolutions',
                location: 'Boston',
                badge: 'Software',
                delivery: 'Instant',
                description: 'A comprehensive HR management system for employee data, payroll, benefits, and performance tracking. Streamlines HR processes and improves employee experience.',
                short_description: 'Comprehensive HR management system.\nEmployee data, payroll, and benefits tracking.\nPerformance management and HR analytics.'
              },
              {
                id: 5,
                title: 'E-commerce Platform',
                price: 199.99,
                original_price: 299.99,
                rating: 4.9,
                reviews: 118,
                images: ['/assets/img/test/Automated Purchase Order.png', '/assets/img/test/Bill of Materials.png'],
                seller: 'ShopTech',
                location: 'Seattle',
                badge: 'Software',
                featured: true,
                hot: true,
                delivery: 'Instant',
                description: 'A complete e-commerce platform to build and manage your online store. Features include product management, payment processing, shipping integration, and marketing tools.',
                short_description: 'Complete e-commerce platform solution.\nProduct management and payment processing.\nShipping integration and marketing tools.'
              },
              {
                id: 6,
                title: 'Marketing Automation Tool',
                price: 89.99,
                original_price: 129.99,
                rating: 4.7,
                reviews: 82,
                images: ['/assets/img/test/Attendace Template.png', '/assets/img/test/Class Student Manager.jpg'],
                seller: 'MarketPro',
                location: 'Austin',
                badge: 'Software',
                hot: false,
                delivery: 'Instant',
                description: 'A powerful marketing automation tool to streamline your marketing campaigns. Features include email marketing, social media scheduling, lead scoring, and analytics.',
                short_description: 'Powerful marketing automation solution.\nEmail marketing and social media scheduling.\nLead scoring and comprehensive analytics.'
              }
            ];
            
            return (
              <SlideableGigCards 
                gigs={softwareProducts} 
                title="Explore Our <span>Software.</span>"
                subtitle="Discover powerful software solutions to streamline your business operations"
                isDigitalProducts={true}
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
                title: 'Professional Photoshop Actions',
                price: 29.99,
                original_price: 49.99,
                rating: 4.8,
                reviews: 105,
                images: ['/assets/img/test/Automated Purchase Order.png', '/assets/img/test/Bill of Materials.png'],
                seller: 'DesignPro',
                location: 'Los Angeles',
                badge: 'Design Resources',
                featured: true,
                hot: true,
                delivery: 'Instant',
                description: 'A collection of professional Photoshop actions to enhance your photos and streamline your editing workflow. Includes color grading, retouching, and special effects actions.',
                short_description: 'Professional Photoshop actions collection.\nColor grading and retouching presets included.\nStreamline your photo editing workflow.'
              },
              {
                id: 2,
                title: 'Social Media Marketing eBook',
                price: 19.99,
                original_price: 29.99,
                rating: 4.7,
                reviews: 92,
                images: ['/assets/img/test/Attendace Template.png', '/assets/img/test/Class Student Manager.jpg'],
                seller: 'MarketingPro',
                location: 'Chicago',
                badge: 'eBooks & Guides',
                hot: true,
                delivery: 'Instant',
                description: 'A comprehensive guide to social media marketing strategies for businesses of all sizes. Learn how to grow your audience, increase engagement, and convert followers into customers.',
                short_description: 'Comprehensive social media marketing guide.\nStrategies for audience growth and engagement.\nConvert followers into paying customers.'
              },
              {
                id: 3,
                title: 'UI/UX Design System Template',
                price: 59.99,
                original_price: 89.99,
                rating: 4.9,
                reviews: 78,
                images: ['/assets/img/test/Clinic Manager.jpg', '/assets/img/test/Company Payroll System 3.png'],
                seller: 'UXMasters',
                location: 'Berlin',
                badge: 'UI Templates',
                featured: true,
                delivery: 'Instant',
                description: 'A complete UI/UX design system template with hundreds of components, styles, and layouts. Perfect for web and mobile app design projects with consistent and modern aesthetics.',
                short_description: 'Complete UI/UX design system template.\nHundreds of components, styles, and layouts.\nPerfect for web and mobile app projects.'
              },
              {
                id: 4,
                title: 'Stock Photo Collection (100 Images)',
                price: 39.99,
                original_price: 59.99,
                rating: 4.6,
                reviews: 64,
                images: ['/assets/img/test/Construction Estimator.png', '/assets/img/test/Automated Purchase Order.png'],
                seller: 'StockImagery',
                location: 'Paris',
                badge: 'Photography',
                delivery: 'Instant',
                description: 'A curated collection of 100 high-resolution stock photos for commercial use. Includes a variety of subjects, compositions, and styles to enhance your marketing materials and website.',
                short_description: 'Curated collection of 100 high-resolution photos.\nVariety of subjects, compositions, and styles.\nEnhance your marketing materials and website.'
              },
              {
                id: 5,
                title: 'Business Plan Template Bundle',
                price: 49.99,
                original_price: 79.99,
                rating: 4.8,
                reviews: 87,
                images: ['/assets/img/test/Bill of Materials.png', '/assets/img/test/Attendace Template.png'],
                seller: 'BizStrategy',
                location: 'Toronto',
                badge: 'Business',
                featured: true,
                delivery: 'Instant',
                description: 'A comprehensive SEO strategy guide for 2023 with the latest techniques and algorithms. Learn how to improve your website ranking and drive organic traffic.',
                short_description: 'Comprehensive SEO strategy guide for 2023.\nLatest techniques and algorithm updates included.\nImprove website ranking and organic traffic.'
              },
              {
                id: 8,
                title: 'Premium Icon Pack (500+ Icons)',
                price: 19.99,
                original_price: 34.99,
                rating: 4.8,
                reviews: 95,
                images: ['/assets/img/test/Construction Estimator.png', '/assets/img/test/Clinic Manager.jpg'],
                seller: 'IconCraft',
                location: 'Amsterdam',
                badge: 'Design Resources',
                hot: true,
                delivery: 'Instant',
                description: 'A premium icon pack with over 500 high-quality icons in multiple formats and styles. Perfect for web design, app development, and marketing materials.',
                short_description: 'Premium pack with 500+ high-quality icons.\nMultiple formats and styles included.\nPerfect for web, app, and marketing projects.'
              }
            ];
            
            return (
              <SlideableGigCards 
                gigs={digitalProducts} 
                title="Digital <span>Products.</span>"
                subtitle="Instant downloads for your creative and business needs"
                isDigitalProducts={true}
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
