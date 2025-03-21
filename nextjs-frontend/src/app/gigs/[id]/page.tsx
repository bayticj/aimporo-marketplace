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
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarContainerRef = useRef<HTMLDivElement>(null);

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
                  <button className="w-full py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors mb-4">
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
            <h2 className="text-2xl font-bold mb-2">Related Services</h2>
            <p className="text-gray-600">You might be interested in these services as well</p>
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
        
        {/* FAQ Section */}
        <div className="mt-12 mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600">Got questions? Find your answers here</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <details className="border-b">
              <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50">
                <span>What do I need to provide to get started?</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-4 pb-4 text-gray-700">
                <p>To get started, I'll need your brand guidelines (if available), color preferences, examples of websites you like, and a brief description of your business and target audience. The more information you provide, the better I can tailor the design to your needs.</p>
              </div>
            </details>
            
            <details className="border-b">
              <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50">
                <span>How many revisions are included?</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-4 pb-4 text-gray-700">
                <p>This package includes unlimited revisions until you're 100% satisfied with the design. I want to ensure you get exactly what you need for your project.</p>
              </div>
            </details>
            
            <details className="border-b">
              <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50">
                <span>What files will I receive?</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-4 pb-4 text-gray-700">
                <p>You'll receive all source files (PSD/Figma/Sketch files depending on your preference), optimized JPG/PNG files, and any other assets created during the design process. All files will be properly organized and labeled for easy use.</p>
              </div>
            </details>
            
            <details className="border-b">
              <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50">
                <span>Do you provide development services too?</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-4 pb-4 text-gray-700">
                <p>This service is for design only. However, I do offer website development services as well. Please contact me if you're interested in having your design implemented as a fully functional website.</p>
              </div>
            </details>
            
            <details>
              <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50">
                <span>Can I get a refund if I'm not satisfied?</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-4 pb-4 text-gray-700">
                <p>I offer a 100% satisfaction guarantee. If you're not happy with the design and we can't resolve it through revisions, I'll provide a full refund within the first 7 days of delivery.</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
} 