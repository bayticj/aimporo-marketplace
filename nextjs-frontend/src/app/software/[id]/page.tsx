'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { getSoftwareProduct, SoftwareProduct as ApiSoftwareProduct, SoftwarePlan } from '../../../services/softwareService';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import '@/style/pricing.css';
import { Icon } from '@iconify/react';

// Custom CSS for the sliders
const sliderStyles = `
  .slider-transition {
    transition: all 0.3s ease-in-out;
  }
  
  .thumbnail-gallery {
    display: flex;
    overflow-x: auto;
    gap: 0.5rem;
    scrollbar-width: thin;
    scrollbar-color: #f97316 #f1f1f1;
  }
  
  .thumbnail-gallery::-webkit-scrollbar {
    height: 6px;
  }
  
  .thumbnail-gallery::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .thumbnail-gallery::-webkit-scrollbar-thumb {
    background-color: #f97316;
    border-radius: 10px;
  }
`;

interface SoftwarePageProps {
  params: {
    id: string;
  };
}

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  duration_days: number | null;
  features: string[];
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  billing_cycle: string;
}

// Extended interface with optional UI-specific properties
interface SoftwareProductUI extends ApiSoftwareProduct {
  id: number;
  thumbnail?: string;
  screenshots: string[]; // Make this required but ensure mockData provides it
  logo?: string;
  features: string[]; // Make this required but ensure mockData provides it
  system_requirements?: string;
  plans: SoftwarePlan[];
  name: string;
  version: string;
  partner_name: string;
  description: string;
  downloads?: number;
}

const SoftwareProductPage: React.FC<SoftwarePageProps> = ({ params }) => {
  const slug = params.id; // Using the id param as slug
  const [product, setProduct] = useState<SoftwareProductUI | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('2');
  const [currentPrice, setCurrentPrice] = useState<number>(199);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [basicDeliveryOption, setBasicDeliveryOption] = useState("instant");
  const [standardDeliveryOption, setStandardDeliveryOption] = useState("instant");
  const [premiumDeliveryOption, setPremiumDeliveryOption] = useState("instant");
  
  // Image slider state
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  
  // Sidebar refs for sticky behavior
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarContainerRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  const { user } = useAuth();
  
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
      const contentSections = document.querySelectorAll('.lg\\:col-span-2 > .bg-white.rounded-xl.shadow-sm.p-6.mb-6');
      const lastContentSection = contentSections.length > 0 ? contentSections[contentSections.length - 1] : null;
      const footerSection = document.querySelector('footer'); // Or any bottom boundary element
      
      if (!container || !leftColumn || !lastContentSection) {
        resetSidebarStyles();
        return;
      }
      
      const sidebar = sidebarRef.current;
      const sidebarContainer = sidebarContainerRef.current;
      
      // Get the positions and dimensions
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const sidebarRect = sidebar.getBoundingClientRect();
      const sidebarContainerRect = sidebarContainer.getBoundingClientRect();
      const lastContentRect = lastContentSection.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Calculate absolute positions
      const sidebarContainerTop = sidebarContainerRect.top + scrollY;
      const lastContentBottom = lastContentRect.bottom + scrollY;
      
      // Preserve the width of the sidebar to avoid layout shifts
      const sidebarWidth = sidebarContainer.offsetWidth;
      
      // Define the top offset for sticky positioning
      const stickyTopOffset = 24; // px from the top when sticky
      
      // Check if we should make the sidebar sticky
      if (scrollY + stickyTopOffset > sidebarContainerTop) {
        // Check if we need to stop stickiness because we've reached the end of the content
        if (scrollY + stickyTopOffset + sidebarRect.height > lastContentBottom) {
          // When we're at the content bottom, stop it there
          sidebar.style.opacity = '1';
          sidebar.style.visibility = 'visible';
          sidebar.style.position = 'absolute';
          sidebar.style.top = `${lastContentBottom - sidebarRect.height - sidebarContainerTop}px`;
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
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setErrorMessage(null);
      
      try {
        const response = await getSoftwareProduct(slug);
        console.log('Software product response:', response);
        
        if (response && (response.data || response)) {
          const productData = response.data || response;
          
          // Ensure all required fields exist for UI rendering
          const extendedProduct: SoftwareProductUI = {
            ...productData,
            screenshots: productData.screenshots || [],
            features: productData.features || (productData.plans && productData.plans[0]?.features) || []
          };
          
          setProduct(extendedProduct);
          
          // Set the default selected plan to the first one
          if (productData.plans && productData.plans.length > 0) {
            setSelectedPlan(productData.plans[0].id.toString());
          }
        } else {
          setErrorMessage('Failed to load software product data');
        }
      } catch (err) {
        console.error('Error fetching software product:', err);
        setErrorMessage('Failed to load software product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [slug]);
  
  const handlePurchase = async () => {
    if (!user) {
      router.push(`/login?redirect=/software/${slug}`);
      return;
    }
    
    if (!selectedPlan) {
      alert('Please select a plan to purchase');
      return;
    }
    
    // Redirect to checkout page with product and plan details
    router.push(`/checkout/software?product_slug=${slug}&plan_id=${selectedPlan}`);
  };
  
  const formatPlanDuration = (durationDays: number | null): string => {
    if (durationDays === null) return 'Lifetime';
    if (durationDays <= 31) return 'Monthly';
    if (durationDays <= 93) return 'Quarterly';
    if (durationDays <= 186) return 'Semi-Annual';
    return 'Annual';
  };
  
  // Image slider navigation functions
  const handleImageClick = (index: number) => {
    if (index !== activeImageIndex) {
      setIsTransitioning(true);
      setActiveImageIndex(index);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };
  
  const navigateImage = (direction: 'prev' | 'next') => {
    setIsTransitioning(true);
    if (product && product.screenshots.length > 1) {
      if (direction === 'prev') {
        setActiveImageIndex(prev => prev === 0 ? product.screenshots.length - 1 : prev - 1);
      } else {
        setActiveImageIndex(prev => prev === product.screenshots.length - 1 ? 0 : prev + 1);
      }
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };
  
  // Function to get avatar color number based on ID
  function getAvatarNumber(id: string | number): string {
    if (typeof id === 'number') {
      id = id.toString();
    }
    // Generate a number between 1 and 9 based on the id string
    const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((sum % 9) + 1).toString(); // Returns a string between "1" and "9"
  }
  
  // Get logo image URL
  const logoImage = useMemo(() => {
    if (product?.logo) {
      return product.logo;
    }
    // Fallback to a placeholder image
    return '/assets/images/software-placeholder.png';
  }, [product]);
  
  if (loading) {
    return (
      <div className="content bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (errorMessage || !product) {
    return (
      <div className="content bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto text-center">
            <div className="text-orange-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Failed to load software product</h2>
            <p className="text-gray-600 mb-6">
              {errorMessage || 'The requested product could not be found. Please try again later or choose another product.'}
            </p>
            <div className="flex justify-center">
              <Link href="/software" className="btn bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                Back to Software Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get the placeholder image if no screenshots available
  const productImages = product.screenshots && product.screenshots.length > 0 
    ? product.screenshots 
    : ['/assets/img/test/Class Student Manager.jpg', '/assets/img/test/Clinic Manager.jpg'];

  return (
    <div className="content bg-gray-100">
      {/* Apply slider styles */}
      <style jsx global>{sliderStyles}</style>
      
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb navigation */}
          <nav className="flex text-sm mb-3">
            <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <span className="mx-2 text-gray-500">&gt;</span>
            <Link href="/software" className="text-gray-600 hover:text-blue-600">Software</Link>
            <span className="mx-2 text-gray-500">&gt;</span>
            <span className="text-gray-800">{product.name}</span>
          </nav>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
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
                Share this software
              </button>
            </div>
            
            <div className="flex items-center gap-5">
              <div className="flex items-center bg-white px-3 py-1.5 rounded-md shadow-sm">
                <svg className="w-4 h-4 text-orange-500 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.85 8.3L22 9.3L17 14.1L18.18 21L12 17.77L5.82 21L7 14.1L2 9.3L9.15 8.3L12 2Z" />
                </svg>
                <span className="text-gray-700 text-sm font-medium">Version {product.version}</span>
              </div>
              
              <div className="flex items-center bg-orange-50 text-orange-600 px-3 py-1.5 rounded-md shadow-sm">
                <svg className="w-4 h-4 text-orange-600 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-medium">By {product.partner_name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Product Preview and Description */}
            <div className="lg:col-span-2">
            {/* Image Slider */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="relative mb-6">
                {/* Main Image */}
                <div className={`bg-gray-100 rounded-lg overflow-hidden relative aspect-video ${isTransitioning ? 'opacity-80' : 'opacity-100'} slider-transition`}>
                  <Image
                    src={product.screenshots && product.screenshots.length > 0 
                      ? product.screenshots[activeImageIndex] 
                      : '/assets/img/test/Class Student Manager.jpg'} 
                    alt={product.name || 'Software screenshot'}
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
                <div className="mt-4 thumbnail-gallery pb-2">
                  {product.screenshots && product.screenshots.length > 0 ? (
                    product.screenshots.map((screenshot, i) => (
                      <button
                        key={i}
                        onClick={() => handleImageClick(i)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                          i === activeImageIndex ? 'ring-2 ring-orange-500' : 'opacity-70'
                        }`}
                      >
                        <Image 
                          src={screenshot} 
                          alt={`Thumbnail ${i + 1}`} 
                          className="w-full h-full object-cover"
                          width={80}
                          height={80}
                        />
                      </button>
                    ))
                  ) : (
                    <>
                      <button
                        onClick={() => handleImageClick(0)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ring-2 ring-orange-500`}
                      >
                        <Image 
                          src="/assets/img/test/Class Student Manager.jpg" 
                          alt="Thumbnail 1" 
                          className="w-full h-full object-cover"
                          width={80}
                          height={80}
                        />
                      </button>
                      <button
                        onClick={() => handleImageClick(1)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden opacity-70`}
                      >
                        <Image 
                          src="/assets/img/test/Clinic Manager.jpg" 
                          alt="Thumbnail 2" 
                          className="w-full h-full object-cover"
                          width={80}
                          height={80}
                        />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About this software</h3>
              <div className="prose max-w-none text-gray-700">
                {product.description?.split('\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Why You'll Love This Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why You'll Love This</h3>
              <div className="prose max-w-none text-gray-700">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">Intuitive Design:</strong> User-friendly interface that's easy to navigate, requiring minimal training for your team to get up and running quickly.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">Regular Updates:</strong> Continuous improvement with regular feature updates and security patches to keep your software current with industry standards.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">Reliable Performance:</strong> Built with efficiency in mind, ensuring fast processing even with large datasets and multiple concurrent users.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">Excellent Support:</strong> Access to our dedicated support team who are ready to assist with any questions or issues you might encounter.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">Customization Options:</strong> Flexible settings and configurations that allow you to tailor the software to your specific business needs.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
              <div className="prose max-w-none text-gray-700">
                <ul className="space-y-3">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">System Requirements</h3>
              <div className="prose max-w-none text-gray-700">
                <p>{product.system_requirements || "No specific system requirements provided."}</p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              
              <div className="space-y-4">
                <details className="border border-gray-200 rounded-xl">
                  <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50 rounded-xl text-gray-600">
                    <span>Is this a one-time purchase or subscription?</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    <p>This depends on the plan you choose. We offer both one-time purchase options with lifetime licenses and subscription-based plans. Each plan clearly indicates the duration of the license you'll receive.</p>
                  </div>
                </details>
                
                <details className="border border-gray-200 rounded-xl">
                  <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50 rounded-xl text-gray-600">
                    <span>Do you offer technical support?</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    <p>Yes, all our software purchases include technical support. Our standard support period is 30 days, but this can be extended with premium plans. Our support team is available via email and live chat during business hours.</p>
                  </div>
                </details>
                
                <details className="border border-gray-200 rounded-xl">
                  <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50 rounded-xl text-gray-600">
                    <span>Can I install this on multiple devices?</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    <p>Standard licenses allow installation on one primary device. If you need to install the software on multiple devices, please check our "Team" or "Enterprise" plans which include multi-device licenses or contact us for a custom licensing solution.</p>
                  </div>
                </details>
                
                <details className="border border-gray-200 rounded-xl">
                  <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50 rounded-xl text-gray-600">
                    <span>How often do you release updates?</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    <p>We release major updates approximately every quarter, with minor updates and bug fixes released as needed. All updates within your license period are included at no additional cost. Lifetime license holders receive updates for the current major version of the software.</p>
              </div>
                </details>
                
                <details className="border border-gray-200 rounded-xl">
                  <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50 rounded-xl text-gray-600">
                    <span>Do you offer refunds?</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    <p>Yes, we offer a 30-day money-back guarantee if you're not satisfied with our software. If the software doesn't meet your needs, contact our support team within 30 days of purchase for a full refund.</p>
                  </div>
                </details>
              </div>
            </div>

            {/* Get to know the developer section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold mb-5 text-gray-900">Get to know {product.partner_name}</h3>
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Developer Avatar & Basic Info */}
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-3">
                      {product.logo ? (
                        <Image 
                          src={product.logo} 
                          alt={product.partner_name || 'Software developer'}
                          width={120}
                          height={120}
                          className="rounded-full border-4 border-white shadow-md"
                        />
                      ) : (
                        <div className={`w-28 h-28 rounded-full bg-orange-${getAvatarNumber(product.id)}-100 flex items-center justify-center text-orange-${getAvatarNumber(product.id)}-600 text-4xl font-bold border-4 border-white shadow-md`}>
                          {product.partner_name ? product.partner_name.charAt(0) : 'S'}
                        </div>
                      )}
                      <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{product.partner_name}</h3>
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
                      <span className="ml-1 text-gray-700 font-medium">4.9</span>
                      <span className="ml-1 text-gray-600">(32 Reviews)</span>
                    </div>
                  </div>
                </div>
                
                {/* Developer Details and Bio */}
                <div className="md:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">From</span>
                      <span className="text-gray-700 font-medium">United States</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Member Since</span>
                      <span className="text-gray-700 font-medium">15 Mar 2023</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Software Products</span>
                      <span className="text-gray-700 font-medium">12</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Last Update</span>
                      <span className="text-gray-700 font-medium">14 Feb 2024</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Avg Response Time</span>
                      <span className="text-gray-700 font-medium">About 6 hours</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">About Developer</h4>
                    <p className="text-gray-600">
                      We are a team of experienced software developers specializing in creating professional business solutions. 
                      With over 10 years of industry experience, we've developed software for a wide range of industries including 
                      finance, healthcare, education, and retail.
                    </p>
                    <button className="text-orange-500 font-medium mt-2 hover:text-orange-600 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full md:w-auto py-2.5 px-6 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-medium">
                  Contact Developer
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
                    <div className="text-4xl font-bold text-gray-700">4.8</div>
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star}
                          className={`w-5 h-5 ${star <= 5 ? 'text-orange-500' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">32 reviews</div>
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
                        RK
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Robert Kim</h4>
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
                        <span>2 weeks ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Excellent software! The intuitive interface made it extremely easy to integrate into our existing
                    workflow. The support team was responsive and helpful when we had questions. This has saved us
                    countless hours of manual work and improved our team's productivity significantly.
                  </p>
                </div>
                
                {/* Sample Review 2 */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center mb-3">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                        ML
                      </div>
                    </div>
                        <div>
                      <h4 className="font-medium text-gray-700">Maria Lopez</h4>
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
                    Overall a solid software product. The features work as advertised and it's quite reliable.
                    I encountered a few minor issues with the setup, but the documentation was comprehensive and
                    I was able to resolve them. Regular updates have added useful features and the performance
                    has been consistently good. Would recommend for small to medium sized businesses.
                  </p>
                </div>
                
                {/* Sample Review 3 */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center mb-3">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                        JD
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">James Davis</h4>
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
                        <span>3 months ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Incredible value for the price! This software has completely transformed how we manage our
                    projects. The customization options allowed us to tailor it perfectly to our workflows,
                    and the customer support has been exceptional. Any time we've had questions or needed assistance,
                    the response has been quick and helpful. Highly recommend to anyone looking for a robust,
                    reliable solution.
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
                        <div className="text-xl font-bold text-gray-800">$99.00</div>
                        <div className="text-gray-700 font-medium">Basic</div>
                      </th>
                      <th className="py-3 px-4 text-center font-medium text-gray-600">
                        <div className="text-xl font-bold text-gray-800">$199.00</div>
                        <div className="text-gray-700 font-medium">Standard</div>
                      </th>
                      <th className="py-3 px-4 text-center font-medium text-gray-600">
                        <div className="text-xl font-bold text-gray-800">$349.00</div>
                        <div className="text-gray-700 font-medium">Premium</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 text-gray-600">Description</td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        BASIC LICENSE
                        <div className="mt-2 text-sm">
                          Single user license with essential features for individual use.
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        STANDARD LICENSE
                        <div className="mt-2 text-sm">
                          Up to 5 users with additional features and integration options.
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        ENTERPRISE LICENSE
                        <div className="mt-2 text-sm">
                          Unlimited users with all premium features, priority support, and customization options.
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 text-gray-600">License Duration</td>
                      <td className="py-4 px-4 text-gray-600 text-center">1 Year</td>
                      <td className="py-4 px-4 text-gray-600 text-center">3 Years</td>
                      <td className="py-4 px-4 text-gray-600 text-center">Lifetime</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 text-gray-600">Activation Time</td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        <label className="flex items-center justify-center cursor-pointer">
                          <input
                            type="radio"
                            name="basicDelivery"
                            value="instant"
                            checked={basicDeliveryOption === "instant"}
                            onChange={() => setBasicDeliveryOption("instant")}
                            className="sr-only"
                          />
                          <span className={`w-4 h-4 rounded-full border ${basicDeliveryOption === "instant" ? "border-orange-500 bg-orange-500" : "border-gray-400"} inline-block mr-2 hover:border-orange-500`}></span>
                          Instant
                        </label>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        <div className="flex flex-col items-center">
                          <label className="flex items-center mb-2 cursor-pointer">
                            <input
                              type="radio"
                              name="standardDelivery"
                              value="instant"
                              checked={standardDeliveryOption === "instant"}
                              onChange={() => setStandardDeliveryOption("instant")}
                              className="sr-only"
                            />
                            <span className={`w-4 h-4 rounded-full border ${standardDeliveryOption === "instant" ? "border-orange-500 bg-orange-500" : "border-gray-400"} inline-block mr-2 hover:border-orange-500`}></span>
                            Instant
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="standardDelivery"
                              value="setup"
                              checked={standardDeliveryOption === "setup"}
                              onChange={() => setStandardDeliveryOption("setup")}
                              className="sr-only"
                            />
                            <span className={`w-4 h-4 rounded-full border ${standardDeliveryOption === "setup" ? "border-orange-500 bg-orange-500" : "border-gray-400"} inline-block mr-2 hover:border-orange-500`}></span>
                            With setup (+$20.00)
                          </label>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        <div className="flex flex-col items-center">
                          <label className="flex items-center mb-2 cursor-pointer">
                            <input
                              type="radio"
                              name="premiumDelivery"
                              value="instant"
                              checked={premiumDeliveryOption === "instant"}
                              onChange={() => setPremiumDeliveryOption("instant")}
                              className="sr-only"
                            />
                            <span className={`w-4 h-4 rounded-full border ${premiumDeliveryOption === "instant" ? "border-orange-500 bg-orange-500" : "border-gray-400"} inline-block mr-2 hover:border-orange-500`}></span>
                            Instant
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="premiumDelivery"
                              value="custom"
                              checked={premiumDeliveryOption === "custom"}
                              onChange={() => setPremiumDeliveryOption("custom")}
                              className="sr-only"
                            />
                            <span className={`w-4 h-4 rounded-full border ${premiumDeliveryOption === "custom" ? "border-orange-500 bg-orange-500" : "border-gray-400"} inline-block mr-2 hover:border-orange-500`}></span>
                            Custom setup (+$50.00)
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 text-gray-600">Source Code</td>
                      <td className="py-4 px-4 text-center">
                        <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <svg className="w-6 h-6 mx-auto text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 text-gray-600">API Access</td>
                      <td className="py-4 px-4 text-center">
                        <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <svg className="w-6 h-6 mx-auto text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <svg className="w-6 h-6 mx-auto text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 text-gray-600">Technical Support</td>
                      <td className="py-4 px-4 text-center">
                        <div className="text-gray-600 text-sm">30 days</div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="text-gray-600 text-sm">1 year</div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="text-gray-600 text-sm">Lifetime</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4"></td>
                      <td className="py-4 px-4 text-center">
                        <button 
                          onClick={() => {
                            setSelectedPlan('1');
                            setCurrentPrice(99);
                          }}
                          className="py-2.5 px-6 bg-orange-600 text-white rounded-lg transition-colors font-medium hover:bg-orange-700"
                        >
                          Select
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button 
                          onClick={() => {
                            setSelectedPlan('2');
                            setCurrentPrice(199);
                          }}
                          className="py-2.5 px-6 bg-orange-600 text-white rounded-lg transition-colors font-medium hover:bg-orange-700"
                        >
                          Select
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button 
                          onClick={() => {
                            setSelectedPlan('3');
                            setCurrentPrice(349);
                          }}
                          className="py-2.5 px-6 bg-orange-600 text-white rounded-lg transition-colors font-medium hover:bg-orange-700"
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

          {/* Right column - Pricing and Seller Info */}
          <div className="lg:col-span-1" ref={sidebarContainerRef}>
            <div className="w-full" ref={sidebarRef}>
              {/* Pricing Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-700">Price</h2>
                  
                  {/* Package Tabs */}
                  <div className="bg-gray-100 rounded-xl mb-4 p-1 grid grid-cols-3 gap-1">
                    {product.plans && product.plans.map((plan, index) => (
                      <button 
                        key={index}
                        className={`py-2 rounded-xl text-sm font-medium transition-colors ${selectedPlan === plan.id.toString() ? 'bg-white shadow-sm text-gray-700' : 'text-gray-600 hover:text-gray-800'}`}
                        onClick={() => setSelectedPlan(plan.id.toString())}
                      >
                        {plan.name}
                      </button>
                    ))}
                  </div>
                  
                  {/* Price Display */}
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-800">
                        ${product.plans?.find(p => p.id.toString() === selectedPlan)?.price.toFixed(2) || '99.99'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Package Description */}
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm">
                      {product.plans?.find(p => p.id.toString() === selectedPlan)?.description || 'Get this premium software with full features and functionality.'}
                    </p>
                  </div>
                  
                  {/* Features List */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">Professional software solution</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">Regular updates</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">
                        {product.plans?.find(p => p.id.toString() === selectedPlan)?.duration_days !== undefined
                          ? `${formatPlanDuration(product.plans?.find(p => p.id.toString() === selectedPlan)?.duration_days || null)} license`
                          : 'Lifetime license'}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">Technical support included</span>
                    </div>
                  </div>

                  {/* Purchase Button */}
                <button
                  onClick={handlePurchase}
                    className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors mb-4"
                >
                    <svg className="w-5 h-5 mr-2 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 18V6M6 8l4 8M14 16l4-8M8 6h12a2 2 0 012 2v8a2 2 0 01-2 2H8m-5-10v10a2 2 0 002 2h17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Purchase Now
                </button>

                  {/* Software Stats */}
                  <div className="flex border border-gray-200 rounded-xl divide-x divide-gray-200">
                    <div className="flex items-center px-2 py-1.5 flex-1 justify-center">
                      <svg className="w-3.5 h-3.5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-medium text-gray-700">{formatPlanDuration(product.plans?.find(p => p.id.toString() === selectedPlan)?.duration_days || null)}</span>
                    </div>
                    <div className="flex items-center px-2 py-1.5 flex-1 justify-center">
                      <svg className="w-3.5 h-3.5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span className="text-xs font-medium text-gray-700">{product.downloads || '250'}+</span>
                    </div>
                    <div className="flex items-center px-2 py-1.5 flex-1 justify-center">
                      <svg className="w-3.5 h-3.5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                      <span className="text-xs font-medium text-gray-700">Ver {product.version}</span>
                    </div>
              </div>
            </div>
          </div>

              {/* Seller Info Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 w-full mb-6">
                {/* Seller Avatar & Status */}
                <div className="flex items-center mb-4">
                  <div className="relative mr-4">
                    <div className={`w-15 h-15 rounded-full bg-orange-${getAvatarNumber(product.id)}-100 flex items-center justify-center text-orange-${getAvatarNumber(product.id)}-600`}>
                      {product.logo ? (
                        <Image 
                          src={product.logo} 
                          alt={product.partner_name || 'Software provider'} 
                          width={60} 
                          height={60} 
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-xl font-bold">{product.partner_name ? product.partner_name.charAt(0) : 'S'}</span>
                      )}
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 flex items-center">
                      {product.partner_name || 'Software Provider'}
                      <span className="ml-2 inline-flex items-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-1"></span>
                        <span className="text-xs text-green-600">Online</span>
                      </span>
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>4.9</span>
                      <span className="mx-1">•</span>
                      <span>Top Software Provider</span>
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
      </div>
    </div>
  );
};

export default SoftwareProductPage; 