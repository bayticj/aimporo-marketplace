'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { gigService } from '@/services/api';

interface Gig {
  id: number;
  title: string;
  description: string;
  price: number;
  delivery_time: number;
  requirements?: string;
  location?: string;
  thumbnail?: string;
  images: string[];
  tags?: string[];
  average_rating?: number;
  reviews_count?: number;
  is_featured?: boolean;
  is_active?: boolean;
  user?: {
    id: number;
    name: string;
    email?: string;
    profile?: {
      avatar?: string;
      bio?: string;
      location?: string;
      member_since?: string;
    }
  };
  category?: {
    id: number;
    name: string;
  };
  original_price?: number;
}

export default function GigDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [gig, setGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('description');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('basic');
  const [basicDeliveryOption, setBasicDeliveryOption] = useState<string>("1day");
  const [standardDeliveryOption, setStandardDeliveryOption] = useState<string>("2days");
  const [premiumDeliveryOption, setPremiumDeliveryOption] = useState<string>("5days");
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const [orderPackage, setOrderPackage] = useState<string>('basic');
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarContainerRef = useRef<HTMLDivElement>(null);
  // Add useRef for the scrollable container
  const recentlyViewedRef = useRef<HTMLDivElement>(null);
  // Add a state for closing animation
  const [isClosing, setIsClosing] = useState(false);

  // Function to handle opening the order modal
  const handleOpenOrderModal = (packageType: string) => {
    setOrderPackage(packageType);
    setShowOrderModal(true);
  };

  // Modify the close handler to include animation
  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowOrderModal(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  // CSS for hiding scrollbar
  const scrollStyle = {
    scrollbarWidth: 'none' as 'none',
    msOverflowStyle: 'none' as 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  };

  useEffect(() => {
    const fetchGig = async () => {
      try {
        setLoading(true);
        const id = params?.id;
        if (!id) {
          throw new Error('Gig ID is required');
        }
        
        try {
        const response = await gigService.getGig(Number(id));
        setGig(response.data.gig);
      } catch (err: any) {
          console.error('API error:', err);
          
          // Fallback to demo data for development
          const demoGig: Gig = {
            id: Number(id),
            title: 'I will design modern website UI UX design',
            description: `I will design a modern and clean website UI UX design for your business or personal project.

Key Features:
• Modern and clean design
• Responsive design for all devices
• Unlimited revisions until satisfaction
• Quick turnaround time
• High-quality source files included
• SEO-friendly design

My design process ensures your website not only looks great but also delivers an exceptional user experience. I focus on creating intuitive interfaces that guide users seamlessly through your site while maintaining your brand identity.

Contact me today to discuss your project requirements!`,
            price: 149.99,
            delivery_time: 3,
            images: [
              '/assets/img/test/Clinic Manager.jpg',
              '/assets/img/test/Attendace Template.png',
              '/assets/img/test/Construction Estimator.png',
              '/assets/img/test/Company Payroll System 3.png',
            ],
            tags: ['website', 'ui/ux', 'design', 'responsive'],
          average_rating: 4.8,
            reviews_count: 42,
            location: 'Manila, Philippines',
          user: {
              id: 1,
              name: 'John Designer',
            profile: {
                location: 'Manila, Philippines',
                member_since: '2023-01-01',
                bio: "I'm a professional UI/UX designer with over 5 years of experience creating beautiful, functional websites and applications.",
            }
          },
          category: {
              id: 1,
              name: 'Web Design'
            },
            original_price: 199.99,
            requirements: 'Please provide your brand guidelines, desired color scheme, and any reference websites you like.'
          };
          
          setGig(demoGig);
        }
      } catch (err: any) {
        console.error('Error in fetchGig:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [params]);

  // Handle responsive behavior for sticky sidebar
  useEffect(() => {
    let lastScrollTime = 0;
    const scrollThrottle = 10; // ms between scroll updates
    let resizeTimeout: NodeJS.Timeout | null = null;
    
    // Debounced resize handler to avoid excessive calculations
    const debouncedResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = setTimeout(() => {
        handleResize();
      }, 100); // 100ms debounce
    };
    
    const handleResize = () => {
      if (!sidebarRef.current || !sidebarContainerRef.current) return;
      
      // Reset sidebar styles based on screen size
      if (window.innerWidth <= 1024) {
        // Mobile view - restore normal document flow
        resetSidebarStyles();
      } else {
        // Call handleScroll to set the initial position
        handleScroll();
      }
    };
    
    // Reset sidebar to default state
    const resetSidebarStyles = () => {
      if (!sidebarRef.current) return;
      
      sidebarRef.current.style.position = '';
      sidebarRef.current.style.top = '';
      sidebarRef.current.style.width = '';
      sidebarRef.current.style.left = '';
      sidebarRef.current.style.right = '';
      sidebarRef.current.style.opacity = '1';
      sidebarRef.current.style.visibility = 'visible';
    };
    
    // Handle scroll to ensure the sidebar doesn't go beyond defined boundaries
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < scrollThrottle) return;
      lastScrollTime = now;
      
      if (!sidebarRef.current || !sidebarContainerRef.current || window.innerWidth <= 1024) return;
      
      const container = document.querySelector('.container');
      const leftColumn = document.querySelector('.lg\\:col-span-2');
      const reviewsSections = document.querySelectorAll('.lg\\:col-span-2 > .bg-white.rounded-xl.shadow-sm.p-6.mb-6');
      const reviewsEl = reviewsSections.length > 0 ? reviewsSections[reviewsSections.length - 1] : null;
      const relatedServicesSection = document.querySelector('.mt-12'); // Related services section
      
      if (!container || !leftColumn || !reviewsEl || !relatedServicesSection) {
        resetSidebarStyles();
        return;
      }
      
      const sidebar = sidebarRef.current;
      const sidebarContainer = sidebarContainerRef.current;
      
      // Get the positions and dimensions
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const sidebarRect = sidebar.getBoundingClientRect();
      const sidebarContainerRect = sidebarContainer.getBoundingClientRect();
      const reviewsRect = reviewsEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relatedServicesRect = relatedServicesSection.getBoundingClientRect();
      
      // Calculate absolute positions
      const sidebarContainerTop = sidebarContainerRect.top + scrollY;
      const reviewsBottom = reviewsRect.bottom + scrollY;
      const relatedServicesTop = relatedServicesRect.top + scrollY;
      
      // Preserve the width of the sidebar to avoid layout shifts
      const sidebarWidth = sidebarContainer.offsetWidth;
      
      // Define the top offset for sticky positioning
      const stickyTopOffset = 24; // px from the top when sticky
      
      // Check if we should make the sidebar sticky
      if (scrollY + stickyTopOffset > sidebarContainerTop) {
        // Don't show the sidebar when we've scrolled to related services section
        if (scrollY + stickyTopOffset > relatedServicesTop - 50) {
          // Hide the sidebar completely when we reach related services
          sidebar.style.opacity = '0';
          sidebar.style.visibility = 'hidden';
        } 
        // Check if we need to stop stickiness because we've reached the end of the reviews section
        else if (scrollY + stickyTopOffset + sidebarRect.height > reviewsBottom) {
          // When we're at reviews bottom, stop it there and don't let it go into related services
          sidebar.style.opacity = '1';
          sidebar.style.visibility = 'visible';
          sidebar.style.position = 'absolute';
          sidebar.style.top = `${reviewsBottom - sidebarRect.height - sidebarContainerTop}px`;
          sidebar.style.width = `${sidebarWidth}px`;
        } else {
          // Normal sticky behavior
          sidebar.style.opacity = '1';
          sidebar.style.visibility = 'visible';
          sidebar.style.position = 'fixed';
          sidebar.style.top = `${stickyTopOffset}px`;
          sidebar.style.width = `${sidebarWidth}px`;
        }
      } else {
        // Reset to normal document flow when scrolled to the top
        sidebar.style.opacity = '1';
        sidebar.style.visibility = 'visible';
        resetSidebarStyles();
      }
    };

    // Initial call
    handleResize();
    
    // Set up event listeners
    window.addEventListener('resize', debouncedResize);
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleImageClick = (index: number) => {
    if (index !== activeImageIndex) {
      setIsTransitioning(true);
      setActiveImageIndex(index);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };
  
  const navigateImage = (direction: 'prev' | 'next') => {
    setIsTransitioning(true);
    if (gig && gig.images.length > 1) {
      if (direction === 'prev') {
        setActiveImageIndex(prev => prev === 0 ? gig.images.length - 1 : prev - 1);
      } else {
        setActiveImageIndex(prev => prev === gig.images.length - 1 ? 0 : prev + 1);
      }
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Calculate discount percentage if available
  const calculateDiscount = () => {
    if (gig?.original_price && gig.original_price > gig.price) {
      return Math.round(((gig.original_price - gig.price) / gig.original_price) * 100);
    }
    return null;
  };

  const discountPercentage = calculateDiscount();

  // Function to handle scrolling
  const handleScroll = (direction: 'left' | 'right') => {
    if (recentlyViewedRef.current) {
      const scrollAmount = 300; // Adjust as needed
      const currentScroll = recentlyViewedRef.current.scrollLeft;
      
      recentlyViewedRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !gig) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Service</h2>
        <p className="text-gray-700 mb-6">{error || 'Service not found'}</p>
        <Link href="/" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  // Keep the main DIV tag as the outer container and fix the return statement structure
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb navigation */}
          <nav className="flex text-sm mb-3">
            <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <span className="mx-2 text-gray-500">&gt;</span>
            <Link href="/services" className="text-gray-600 hover:text-blue-600">Services</Link>
            <span className="mx-2 text-gray-500">&gt;</span>
            <Link href="/services/digital-marketing" className="text-gray-600 hover:text-blue-600">Digital Marketing</Link>
          </nav>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">I will design, redesign wordpress website using elementor pro</h1>
          
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-3 mb-2 md:mb-0">
              <button className="flex items-center text-gray-700 hover:text-blue-600 border border-gray-300 rounded-md px-4 py-1.5 bg-white shadow-sm transition-all hover:shadow">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add to Wishlist
              </button>
              
              <button className="flex items-center text-gray-700 hover:text-blue-600 border border-gray-300 rounded-md px-4 py-1.5 bg-white shadow-sm transition-all hover:shadow">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08261 9.84066C7.54305 9.32015 6.80891 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15C6.80891 15 7.54305 14.6798 8.08261 14.1593L15.0227 18.6294C15.0077 18.7508 15 18.8745 15 19C15 20.6569 16.3431 22 18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C17.1911 16 16.457 16.3202 15.9174 16.8407L8.97733 12.3706C8.99229 12.2492 9 12.1255 9 12C9 11.8745 8.99229 11.7508 8.97733 11.6294L15.9174 7.15934C16.457 7.67985 17.1911 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                Share this gigs
              </button>
                  </div>
            
            <div className="flex items-center gap-5">
              <div className="flex items-center bg-white px-3 py-1.5 rounded-md shadow-sm">
                <svg className="w-4 h-4 text-orange-500 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.85 8.3L22 9.3L17 14.1L18.18 21L12 17.77L5.82 21L7 14.1L2 9.3L9.15 8.3L12 2Z" />
                </svg>
                <span className="text-gray-700 text-sm font-medium">Created 3 weeks ago</span>
              </div>
              
              <div className="flex items-center bg-orange-50 text-orange-600 px-3 py-1.5 rounded-md shadow-sm">
                <svg className="w-4 h-4 text-orange-600 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-medium">15 Order in queue</span>
              </div>
            </div>
              </div>
            </div>
          </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Service Images & Descriptions */}
          <div className="lg:col-span-2">
            {/* Gig Title and Basic Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-700 mb-2">{gig.title}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-gray-600 text-sm">{gig.average_rating?.toFixed(1)}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-gray-600 text-sm">{gig.reviews_count || 0} reviews</span>
                </div>
                <span className="mx-2 text-gray-500">•</span>
                <div className="text-gray-600 text-sm">15 orders in queue</div>
              </div>
              
              {/* Image Slider */}
              <div className="relative mb-6">
                {/* Main Image */}
                <div className="bg-gray-100 rounded-xl overflow-hidden relative aspect-video">
                  <Image 
                    src={gig.images[activeImageIndex] || '/assets/img/banner-img.png'} 
                    alt={gig.title}
                    className="w-full h-full object-cover"
                    width={800}
                    height={450}
                  />
                </div>
                
                {/* Previous Image Button */}
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-gray-900"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Next Image Button */}
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-gray-900"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Thumbnail Navigation */}
                <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                  {gig.images.map((image, i) => (
                    <button
                      key={i}
                      onClick={() => handleImageClick(i)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden ${
                        i === activeImageIndex ? 'ring-2 ring-orange-500' : 'opacity-70'
                      }`}
                    >
                      <Image 
                        src={image} 
                        alt={`Thumbnail ${i + 1}`} 
                        className="w-full h-full object-cover"
                        width={80}
                        height={80}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Gig Description */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-700">About This Gig</h2>
              <div className="prose prose-gray max-w-none text-gray-600">
                <p>
                  Welcome to my gig! I specialize in creating stunning, modern, and responsive websites 
                  that will help your business stand out from the competition. With over 5 years of 
                  experience in web design and development, I ensure high-quality work delivered on time.
                </p>
                <p>
                  My approach is user-centered, focusing on creating intuitive interfaces that provide 
                  excellent user experiences. I use the latest technologies and best practices to build 
                  websites that are not only visually appealing but also performant and SEO-friendly.
                </p>
                <h3 className="text-gray-700">Why choose me?</h3>
                <ul>
                  <li>Professional and clean designs tailored to your brand</li>
                  <li>Fully responsive layouts that work on all devices</li>
                  <li>SEO-optimized structure for better search engine rankings</li>
                  <li>Fast loading speeds for improved user retention</li>
                  <li>Clear communication throughout the project</li>
                </ul>
                <p>
                  I'm committed to delivering high-quality work that exceeds your expectations. Let's work 
                  together to bring your vision to life!
                </p>
              </div>
            </div>

            {/* Why Work With Me Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Why Work With Me</h2>
              <div className="prose prose-gray max-w-none text-gray-600">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">Expertise & Experience:</strong> With over 5 years of experience in web design, I've worked with clients across various industries to deliver exceptional results.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">Clear Communication:</strong> I maintain transparent communication throughout the project, ensuring you're always informed about progress and timelines.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">Attention to Detail:</strong> I focus on the small details that make a big difference, from typography to color schemes and visual hierarchy.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">Client Satisfaction:</strong> My high rating and positive reviews reflect my commitment to ensuring clients are completely satisfied with the final product.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">Post-Delivery Support:</strong> I don't disappear after delivery - I provide ongoing support to ensure your website functions perfectly.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Checkout My Recent Works Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Checkout My Recent Works</h2>
              <div className="relative overflow-hidden">
                {/* Portfolio Slider */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-700 font-medium">Portfolio Showcase</h3>
                  <div className="flex space-x-2">
                    <button className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  {/* Portfolio Item 1 */}
                  <div className="flex-shrink-0 w-64 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <div className="h-40 relative">
                      <Image 
                        src="/assets/img/test/Clinic Manager.jpg" 
                        alt="Portfolio Work 1" 
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-gray-700 mb-1">E-Commerce Website</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">Modern online store with seamless checkout process and responsive design.</p>
                    </div>
                  </div>
                  
                  {/* Portfolio Item 2 */}
                  <div className="flex-shrink-0 w-64 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <div className="h-40 relative">
                      <Image 
                        src="/assets/img/test/Attendace Template.png" 
                        alt="Portfolio Work 2" 
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-gray-700 mb-1">Finance Dashboard</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">Intuitive admin dashboard for financial analytics and reporting.</p>
                    </div>
                  </div>
                  
                  {/* Portfolio Item 3 */}
                  <div className="flex-shrink-0 w-64 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <div className="h-40 relative">
                      <Image 
                        src="/assets/img/test/Construction Estimator.png" 
                        alt="Portfolio Work 3" 
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-gray-700 mb-1">Corporate Website</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">Professional business website with custom animations and modern UI.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section - Moved from bottom to before reviews */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <details className="border border-gray-200 rounded-xl">
                  <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50 rounded-xl text-gray-600">
                    <span>What do I need to provide to get started?</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    <p>To get started, I'll need your brand guidelines (if available), color preferences, examples of websites you like, and a brief description of your business and target audience. The more information you provide, the better I can tailor the design to your needs.</p>
                  </div>
                </details>
                
                <details className="border border-gray-200 rounded-xl">
                  <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50 rounded-xl text-gray-600">
                    <span>How many revisions are included?</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    <p>This package includes unlimited revisions until you're 100% satisfied with the design. I want to ensure you get exactly what you need for your project.</p>
                  </div>
                </details>
                
                <details className="border border-gray-200 rounded-xl">
                  <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50 rounded-xl text-gray-600">
                    <span>What files will I receive?</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    <p>You'll receive all source files (PSD/Figma/Sketch files depending on your preference), optimized JPG/PNG files, and any other assets created during the design process. All files will be properly organized and labeled for easy use.</p>
                  </div>
                </details>
                
                <details className="border border-gray-200 rounded-xl">
                  <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50 rounded-xl text-gray-600">
                    <span>Do you provide development services too?</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    <p>This service is for design only. However, I do offer website development services as well. Please contact me if you're interested in having your design implemented as a fully functional website.</p>
                  </div>
                </details>
                
                <details className="border border-gray-200 rounded-xl">
                  <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50 rounded-xl text-gray-600">
                    <span>Can I get a refund if I'm not satisfied?</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    <p>I offer a 100% satisfaction guarantee. If you're not happy with the design and we can't resolve it through revisions, I'll provide a full refund within the first 7 days of delivery.</p>
                  </div>
                </details>
              </div>
            </div>

            {/* Get to know the seller section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-5 text-gray-700">Get to know Adrian Revolt</h2>
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Seller Avatar & Basic Info */}
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-3">
                      <Image 
                        src="/assets/img/profiles/avatar-1.jpg" 
                        alt="Adrian Revolt"
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-white shadow-md"
                      />
                      <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Adrian Revolt</h3>
                    <div className="flex items-center mt-1 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
                        Online
                      </span>
                    </div>
                    <div className="flex items-center mt-2">
                      <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-gray-700 font-medium">5.0</span>
                      <span className="ml-1 text-gray-600">(45 Reviews)</span>
                    </div>
                  </div>
                </div>
                
                {/* Seller Details and Bio */}
                <div className="md:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">From</span>
                      <span className="text-gray-700 font-medium">United States</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Member Since</span>
                      <span className="text-gray-700 font-medium">25 Jan 2024</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Speaks</span>
                      <span className="text-gray-700 font-medium">English, Portuguese</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Last Project Delivery</span>
                      <span className="text-gray-700 font-medium">29 Jan 2024</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Avg Response Time</span>
                      <span className="text-gray-700 font-medium">About 8 hours</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">About Me</h4>
                    <p className="text-gray-600">
                      Hello, Greetings! My name is Adrian, and I am an experienced affiliate marketer and 
                      website developer. I have over five years experience in digital affiliate marketing &
                      WordPress website development.
                    </p>
                    <button className="text-orange-500 font-medium mt-2 hover:text-orange-600 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full md:w-auto py-2.5 px-6 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-medium">
                  Contact Me
                </button>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Reviews</h2>
              
              {/* Review Stats */}
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="text-4xl font-bold text-gray-700">{gig.average_rating?.toFixed(1)}</div>
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star}
                          className={`w-5 h-5 ${star <= Math.round(gig.average_rating || 0) ? 'text-orange-500' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{gig.reviews_count || 0} reviews</div>
                  </div>
                </div>
                
                <div className="flex-grow">
                  {/* Rating Breakdown */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const percent = rating === 5 ? 75 : 
                                      rating === 4 ? 20 : 
                                      rating === 3 ? 5 : 
                                      rating === 2 ? 0 : 0;
                      return (
                        <div key={rating} className="flex items-center">
                          <div className="flex items-center w-20">
                            <span className="text-sm text-gray-600">{rating}</span>
                            <svg className="w-4 h-4 text-orange-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <div className="relative flex-grow h-2 ml-2 bg-gray-200 rounded-xl">
                            <div 
                              className="absolute h-full bg-orange-500 rounded-xl" 
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">{percent}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Review List */}
              <div className="space-y-6">
                {/* Sample Review 1 */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center mb-3">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                        JS
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">John Smith</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg 
                              key={star}
                              className={`w-4 h-4 ${star <= 5 ? 'text-orange-500' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="mx-2">•</span>
                        <span>2 months ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Excellent service! The designer understood my requirements perfectly and delivered 
                    a professional website that exceeded my expectations. Communication was clear and 
                    prompt throughout the process. Highly recommended!
                  </p>
                </div>
                
                {/* Sample Review 2 */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center mb-3">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                        AT
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Anna Thompson</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg 
                              key={star}
                              className={`w-4 h-4 ${star <= 4 ? 'text-orange-500' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="mx-2">•</span>
                        <span>1 month ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Good work overall. The design looks great and the website functions well. There 
                    were a few minor revisions needed, but the seller was accommodating and made the 
                    changes quickly. Would use their services again.
                  </p>
                </div>
              </div>
              
              {/* Show More Reviews Button */}
              <div className="mt-8 text-center">
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                  Show More Reviews
                </button>
              </div>
            </div>

            {/* Compare Packages Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-5 text-gray-700">Compare packages</h2>
              
              <div className="overflow-x-auto pb-2">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Package</th>
                      <th className="py-3 px-4 text-center font-medium text-gray-600">
                        <div className="text-xl font-bold text-gray-800">₱{gig.price.toFixed(2)}</div>
                        <div className="text-gray-700 font-medium">Basic</div>
                      </th>
                      <th className="py-3 px-4 text-center font-medium text-gray-600">
                        <div className="text-xl font-bold text-gray-800">₱{(gig.price * 1.5).toFixed(2)}</div>
                        <div className="text-gray-700 font-medium">Standard</div>
                      </th>
                      <th className="py-3 px-4 text-center font-medium text-gray-600">
                        <div className="text-xl font-bold text-gray-800">₱{(gig.price * 2).toFixed(2)}</div>
                        <div className="text-gray-700 font-medium">Premium</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 text-gray-600">Description</td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        SHOPIFY BUG FIX
                        <div className="mt-2 text-sm">
                          Fix 1 simple html, CSS or liquid bug on Shopify.
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        SHOPIFY CUSTOM CODING
                        <div className="mt-2 text-sm">
                          Fix 3 simple HTML, CSS, JS or liquid bugs / Develop 1 custom section.
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        BUILD SHOPIFY WEBSITE
                        <div className="mt-2 text-sm">
                          Premium Theme Customization / Develop 4 custom sections / 1 custom page with custom functionality.
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 text-gray-600">Revisions</td>
                      <td className="py-4 px-4 text-gray-600 text-center">2</td>
                      <td className="py-4 px-4 text-gray-600 text-center">5</td>
                      <td className="py-4 px-4 text-gray-600 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 text-gray-600">Delivery Time</td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        <label className="flex items-center justify-center cursor-pointer">
                          <input
                            type="radio"
                            name="basicDelivery"
                            value="1day"
                            checked={basicDeliveryOption === "1day"}
                            onChange={() => setBasicDeliveryOption("1day")}
                            className="sr-only"
                          />
                          <span className={`w-4 h-4 rounded-full border ${basicDeliveryOption === "1day" ? "border-orange-500 bg-orange-500" : "border-gray-400"} inline-block mr-2 hover:border-orange-500`}></span>
                          1 day
                        </label>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        <div className="flex flex-col items-center">
                          <label className="flex items-center mb-2 cursor-pointer">
                            <input
                              type="radio"
                              name="standardDelivery"
                              value="2days"
                              checked={standardDeliveryOption === "2days"}
                              onChange={() => setStandardDeliveryOption("2days")}
                              className="sr-only"
                            />
                            <span className={`w-4 h-4 rounded-full border ${standardDeliveryOption === "2days" ? "border-orange-500 bg-orange-500" : "border-gray-400"} inline-block mr-2 hover:border-orange-500`}></span>
                            2 days
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="standardDelivery"
                              value="1day"
                              checked={standardDeliveryOption === "1day"}
                              onChange={() => setStandardDeliveryOption("1day")}
                              className="sr-only"
                            />
                            <span className={`w-4 h-4 rounded-full border ${standardDeliveryOption === "1day" ? "border-orange-500 bg-orange-500" : "border-gray-400"} inline-block mr-2 hover:border-orange-500`}></span>
                            1 day (+₱{(30).toFixed(2)})
                          </label>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        <div className="flex flex-col items-center">
                          <label className="flex items-center mb-2 cursor-pointer">
                            <input
                              type="radio"
                              name="premiumDelivery"
                              value="5days"
                              checked={premiumDeliveryOption === "5days"}
                              onChange={() => setPremiumDeliveryOption("5days")}
                              className="sr-only"
                            />
                            <span className={`w-4 h-4 rounded-full border ${premiumDeliveryOption === "5days" ? "border-orange-500 bg-orange-500" : "border-gray-400"} inline-block mr-2 hover:border-orange-500`}></span>
                            5 days
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="premiumDelivery"
                              value="3days"
                              checked={premiumDeliveryOption === "3days"}
                              onChange={() => setPremiumDeliveryOption("3days")}
                              className="sr-only"
                            />
                            <span className={`w-4 h-4 rounded-full border ${premiumDeliveryOption === "3days" ? "border-orange-500 bg-orange-500" : "border-gray-400"} inline-block mr-2 hover:border-orange-500`}></span>
                            3 days (+₱{(100).toFixed(2)})
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 text-gray-600">Source Code</td>
                      <td className="py-4 px-4 text-center">
                        <svg className="w-6 h-6 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <svg className="w-6 h-6 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <svg className="w-6 h-6 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 text-gray-600">Responsive Design</td>
                      <td className="py-4 px-4 text-center">
                        <svg className="w-6 h-6 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <svg className="w-6 h-6 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <svg className="w-6 h-6 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 text-gray-600">Premium Support</td>
                      <td className="py-4 px-4 text-center">
                        <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="text-gray-600 text-sm">30 days</div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="text-gray-600 text-sm">60 days</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4"></td>
                      <td className="py-4 px-4 text-center">
                        <div className="text-xl font-bold text-gray-800 mb-3">₱{gig.price.toFixed(2)}</div>
                        <button 
                          onClick={() => handleOpenOrderModal('basic')}
                          className="w-full h-12 py-2.5 px-6 max-w-[240px] mx-auto rounded-xl text-white bg-orange-600 font-medium hover:bg-orange-700 transition-colors text-lg"
                        >
                          Select
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="text-xl font-bold text-gray-800 mb-3">₱{(gig.price * 1.5).toFixed(2)}</div>
                        <button 
                          onClick={() => handleOpenOrderModal('standard')}
                          className="w-full h-12 py-2.5 px-6 max-w-[240px] mx-auto rounded-xl text-white bg-orange-600 font-medium hover:bg-orange-700 transition-colors text-lg"
                        >
                          Select
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="text-xl font-bold text-gray-800 mb-3">₱{(gig.price * 2).toFixed(2)}</div>
                        <button 
                          onClick={() => handleOpenOrderModal('premium')}
                          className="w-full h-12 py-2.5 px-6 max-w-[240px] mx-auto rounded-xl text-white bg-orange-600 font-medium hover:bg-orange-700 transition-colors text-lg"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Right Column - Pricing & Seller Info */}
          <div className="lg:col-span-1" ref={sidebarContainerRef}>
            <div className="w-full" ref={sidebarRef}>
              {/* Pricing Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-700">Price</h2>
                  
                  {/* Package Tabs */}
                  <div className="bg-gray-100 rounded-xl mb-4 p-1 grid grid-cols-3 gap-1">
                    <button 
                      className={`py-2 rounded-xl text-sm font-medium transition-colors ${selectedPackage === 'basic' ? 'bg-white shadow-sm text-gray-700' : 'text-gray-600 hover:text-gray-800'}`}
                      onClick={() => setSelectedPackage('basic')}
                    >
                      Basic
                    </button>
                    <button 
                      className={`py-2 rounded-xl text-sm font-medium transition-colors ${selectedPackage === 'standard' ? 'bg-white shadow-sm text-gray-700' : 'text-gray-600 hover:text-gray-800'}`}
                      onClick={() => setSelectedPackage('standard')}
                    >
                      Standard
                    </button>
                    <button 
                      className={`py-2 rounded-xl text-sm font-medium transition-colors ${selectedPackage === 'premium' ? 'bg-white shadow-sm text-gray-700' : 'text-gray-600 hover:text-gray-800'}`}
                      onClick={() => setSelectedPackage('premium')}
                    >
                      Premium
                    </button>
                  </div>
                  
                  {/* Price Display */}
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-800">
                        {selectedPackage === 'basic' && `₱${gig.price.toFixed(2)}`}
                        {selectedPackage === 'standard' && `₱${(gig.price * 1.5).toFixed(2)}`}
                        {selectedPackage === 'premium' && `₱${(gig.price * 2).toFixed(2)}`}
                      </span>
                      {discountPercentage && gig.original_price && selectedPackage === 'basic' && (
                        <>
                          <span className="ml-3 text-gray-500 line-through text-lg">
                            ₱{gig.original_price.toFixed(2)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Package Description */}
                  <div className="mb-4">
                    {selectedPackage === 'basic' && (
                      <p className="text-gray-600 text-sm">
                        Get a basic website design with essential features and functionality.
                      </p>
                    )}
                    {selectedPackage === 'standard' && (
                      <p className="text-gray-600 text-sm">
                        Standard package includes enhanced design elements and additional pages.
                      </p>
                    )}
                    {selectedPackage === 'premium' && (
                      <p className="text-gray-600 text-sm">
                        Premium package with advanced features, priority support, and expedited delivery.
                      </p>
                    )}
                  </div>
                  
                  {/* Features List */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">Professional & modern design</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">Responsive layout</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">
                        {selectedPackage === 'basic' && `${gig.delivery_time} day delivery`}
                        {selectedPackage === 'standard' && `${gig.delivery_time - 1} day delivery`}
                        {selectedPackage === 'premium' && `${gig.delivery_time - 2 > 0 ? gig.delivery_time - 2 : 1} day delivery`}
                      </span>
                    </div>
                    
                    {(selectedPackage === 'standard' || selectedPackage === 'premium') && (
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-600">Source files included</span>
                      </div>
                    )}
                    
                    {selectedPackage === 'premium' && (
                      <>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-600">Premium support (60 days)</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-600">Enhanced SEO optimization</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Buy Button */}
                  <button 
                    onClick={() => handleOpenOrderModal(selectedPackage)}
                    className="w-full py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors mb-4"
                  >
                    Buy this gig
                  </button>
                  
                  {/* Service Stats */}
                  <div className="flex border border-gray-200 rounded-xl divide-x divide-gray-200">
                    <div className="flex items-center px-2 py-1.5 flex-1 justify-center">
                      <svg className="w-3.5 h-3.5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-medium text-gray-700">3 day</span>
                    </div>
                    <div className="flex items-center px-2 py-1.5 flex-1 justify-center">
                      <svg className="w-3.5 h-3.5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span className="text-xs font-medium text-gray-700">15</span>
                    </div>
                    <div className="flex items-center px-2 py-1.5 flex-1 justify-center">
                      <svg className="w-3.5 h-3.5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-xs font-medium text-gray-700">800</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Seller Info Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 w-full mb-6">
                {/* Seller Avatar & Status */}
                <div className="flex items-center mb-4">
                  <div className="relative mr-4">
                    {gig.user?.profile?.avatar ? (
                      <Image 
                        src={gig.user.profile.avatar}
                        alt={gig.user.name || 'Seller'}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-15 h-15 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xl font-semibold">
                        {gig.user?.name?.charAt(0) || 'S'}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 flex items-center">
                      {gig.user?.name || 'Seller Name'}
                      <span className="ml-2 inline-flex items-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-1"></span>
                        <span className="text-xs text-green-600">Online</span>
                      </span>
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{gig.average_rating?.toFixed(1) || '4.9'}</span>
                      <span className="mx-1">•</span>
                      <span>{gig.reviews_count || 98} reviews</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Button */}
                <button className="w-full py-2.5 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-medium">
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Services Section */}
        <div className="mt-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-600">Related Services</h2>
            <p className="text-gray-500">You might be interested in these services as well</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Related Service Cards */}
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full">
                  <Image 
                    src={`/assets/img/test/${['Attendace Template.png', 'Class Student Manager.jpg', 'Clinic Manager.jpg', 'Company Payroll System 3.png'][index-1]}`} 
                    alt={`Related Service ${index}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden mr-2 flex-shrink-0">
                      <Image 
                        src="/assets/img/profiles/avatar-1.jpg"
                        alt="Seller"
                        width={32}
                        height={32}
                      />
                    </div>
                    <span className="text-sm font-medium">Design Expert</span>
                  </div>
                  <h3 className="text-base font-medium mb-2 line-clamp-2">
                    <Link href={`/gigs/${index+100}`} className="text-gray-800 hover:text-blue-600">
                      {[
                        'I will design responsive website UI/UX',
                        'I will create professional logo design',
                        'I will design mobile app UI/UX',
                        'I will create branding identity for your business'
                      ][index-1]}
                    </Link>
                  </h3>
                  <div className="flex items-center text-orange-400 text-sm mb-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-600">{(4 + index * 0.1).toFixed(1)}</span>
                    <span className="ml-1 text-gray-500">({(10 + index * 5)} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-3 mt-2">
                    <span className="text-sm text-gray-600 flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      3 day delivery
                    </span>
                    <span className="font-bold text-gray-900">₱{(99 + index * 50).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Viewed Section */}
        <div className="mt-16 mb-12">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-600">Recently Viewed</h2>
              <p className="text-gray-500">Services you've browsed recently</p>
            </div>
            <div className="flex space-x-2">
              <button className="rounded-full w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors scroll-prev" onClick={() => handleScroll('left')}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="rounded-full w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors scroll-next" onClick={() => handleScroll('right')}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div 
            className="overflow-x-auto pb-4 hide-scrollbar" 
            ref={recentlyViewedRef}
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none' 
            }}
          >
            <style jsx global>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="flex space-x-6 min-w-max">
              {/* Recently Viewed Cards */}
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={`recent-${index}`} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow w-72 flex-shrink-0">
                  <div className="relative h-44 w-full">
                    <Image 
                      src={`/assets/img/test/${['Construction Estimator.png', 'Attendace Template.png', 'Clinic Manager.jpg', 'Company Payroll System 3.png', 'Class Student Manager.jpg', 'Construction Estimator.png'][index-1]}`} 
                      alt={`Recently Viewed ${index}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden mr-2 flex-shrink-0">
                        <Image 
                          src="/assets/img/profiles/avatar-1.jpg"
                          alt="Seller"
                          width={32}
                          height={32}
                        />
                      </div>
                      <span className="text-sm font-medium">Creative Studio</span>
                    </div>
                    <h3 className="text-base font-medium mb-2 line-clamp-2">
                      <Link href={`/gigs/${index+200}`} className="text-gray-800 hover:text-blue-600">
                        {[
                          'I will build custom WordPress website',
                          'I will develop React.js frontend',
                          'I will create eye-catching banners',
                          'I will build e-commerce store',
                          'I will develop mobile app UI',
                          'I will create SEO-friendly website'
                        ][index-1]}
                      </Link>
                    </h3>
                    <div className="flex items-center text-orange-400 text-sm mb-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-gray-600">{(4.2 + index * 0.1).toFixed(1)}</span>
                      <span className="ml-1 text-gray-500">({(25 + index * 8)} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between border-t pt-3 mt-2">
                      <span className="text-sm text-gray-600 flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        {index} day delivery
                      </span>
                      <span className="font-bold text-gray-900">₱{(149 + index * 35).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <>
          {/* Modal Overlay */}
          <div 
            className="fixed inset-0 z-[1000]" 
            onClick={handleCloseModal}
            style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
          ></div>

          {/* Modal Panel */}
          <div className={`fixed inset-y-0 right-0 z-[1001] w-full sm:w-[450px] bg-white overflow-y-auto shadow-xl flex flex-col ${isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
            {/* Add keyframes for the animation */}
            <style jsx global>{`
              @keyframes slideInRight {
                from {
                  transform: translateX(100%);
                }
                to {
                  transform: translateX(0);
                }
              }
              
              @keyframes slideOutRight {
                from {
                  transform: translateX(0);
                }
                to {
                  transform: translateX(100%);
                }
              }
              
              .animate-slide-in-right {
                animation: slideInRight 0.3s ease-out forwards;
              }
              
              .animate-slide-out-right {
                animation: slideOutRight 0.3s ease-in forwards;
              }
            `}</style>
            
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200 flex justify-between items-center px-6 py-4">
              <h2 className="text-xl font-bold text-gray-800">Order options</h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
              {/* Package Info */}
              <div className="mb-6 bg-gray-50 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 capitalize">{orderPackage}</h3>
                  <span className="text-xl font-bold text-orange-500">
                    ₱{orderPackage === 'basic' ? (gig?.price || 0).toFixed(2) :
                       orderPackage === 'standard' ? ((gig?.price || 0) * 1.5).toFixed(2) :
                       ((gig?.price || 0) * 2).toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-700">{gig?.title}</p>
              </div>
              
              <div className="pt-4 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">How often do you need this order?</h3>
                
                {/* Order Type Selection */}
                <div className="border border-gray-300 rounded-xl mb-6 overflow-hidden shadow-sm">
                  {/* Single Order Option */}
                  <div className="p-5 bg-white">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-medium text-gray-800">Single order</h4>
                      </div>
                      <span className="font-semibold text-lg text-orange-500">
                        ₱{orderPackage === 'basic' ? (gig?.price || 0).toFixed(2) :
                          orderPackage === 'standard' ? ((gig?.price || 0) * 1.5).toFixed(2) :
                          ((gig?.price || 0) * 2).toFixed(2)}
                      </span>
                    </div>
                    
                    {/* Quantity Selector */}
                    <div className="pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Gig Quantity</span>
                        <div className="flex items-center">
                          <button 
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                            onClick={() => {/* Decrement logic */}}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </button>
                          <span className="mx-4 font-medium">1</span>
                          <button 
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                            onClick={() => {/* Increment logic */}}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Order Extras */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Upgrade your order with extras</h3>
                  
                  <div className="border border-gray-300 rounded-xl p-5 mb-4 hover:border-orange-200 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-lg font-medium text-gray-800">Speed Optimization <span className="text-gray-500 font-normal text-sm">(+1 day)</span></h4>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                          </label>
                        </div>
                        <p className="text-gray-600 mt-1">I will do Shopify speed optimization and boost your store score.</p>
                        <p className="text-orange-500 font-semibold mt-2">₱35</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Total */}
              <div className="border-t border-gray-200 py-4 mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">Order Total:</h3>
                  <span className="text-xl font-bold text-orange-500">₱{((gig?.price || 0) * (orderPackage === 'basic' ? 1 : orderPackage === 'standard' ? 1.5 : 2)).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Sticky Continue Button */}
            <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 mt-auto z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <button 
                onClick={handleCloseModal}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-4 rounded-full transition-colors mb-2 shadow-sm"
              >
                Continue (₱{((gig?.price || 0) * (orderPackage === 'basic' ? 1 : orderPackage === 'standard' ? 1.5 : 2)).toFixed(2)})
              </button>
              <p className="text-center text-gray-500 text-sm">You won't be charged yet</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 