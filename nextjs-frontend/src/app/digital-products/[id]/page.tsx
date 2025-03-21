'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getDigitalProduct, purchaseDigitalProduct, getPreview, DigitalProduct } from '@/services/digitalProductService';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/utils/currency';
import '@/style/pricing.css';

interface DigitalProductPageProps {
  params: {
    id: string;
  };
}

// Define the enhanced product interface with optional properties
interface EnhancedDigitalProduct extends DigitalProduct {
  screenshots?: string[];
  features?: string[];
  downloads?: number;
}

const DigitalProductPage: React.FC<DigitalProductPageProps> = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState<EnhancedDigitalProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'standard' | 'premium'>('basic');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  
  // Add refs for sidebar and recently viewed section
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarContainerRef = useRef<HTMLDivElement>(null);
  const recentlyViewedRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  const { user } = useAuth();
  
  // Calculate discount percentage
  const calculateDiscount = () => {
    if (product?.original_price && product.price) {
      return Math.round(((product.original_price - product.price) / product.original_price) * 100);
    }
    return 0;
  };
  
  const discountPercentage = calculateDiscount();
  
  // Function to handle thumbnail image click
  const handleImageClick = (index: number) => {
    setIsTransitioning(true);
    setCurrentImageIndex(index);
    setPreviewImage(product?.screenshots?.[index] || '');
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Function to navigate between images
  const navigateImage = (direction: 'prev' | 'next') => {
    if (!product?.screenshots || product.screenshots.length <= 1) return;
    
    setIsTransitioning(true);
    let newIndex = currentImageIndex;
    
    if (direction === 'prev') {
      newIndex = (currentImageIndex - 1 + product.screenshots.length) % product.screenshots.length;
    } else {
      newIndex = (currentImageIndex + 1) % product.screenshots.length;
    }
    
    setCurrentImageIndex(newIndex);
    setPreviewImage(product.screenshots[newIndex]);
    setTimeout(() => setIsTransitioning(false), 300);
  };
  
  // Format file size for display
  const formatFileSize = (sizeInBytes: string) => {
    const size = parseInt(sizeInBytes);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getDigitalProduct(parseInt(id));
        
        // Add mock images for better demonstration
        const mockImages = [
          '/assets/img/test/Clinic Manager.jpg',
          '/assets/img/test/Attendance Template.png',
          '/assets/img/test/Construction Estimator.png',
          '/assets/img/test/Company Payroll System 3.png',
          '/assets/img/banner-img.png'
        ];
        
        // Create an enhancedProduct with these mock images
        const enhancedProduct: EnhancedDigitalProduct = {
          ...response.data,
          screenshots: mockImages,
          features: [
            "High-quality digital asset",
            "Instant download after purchase",
            "Compatible with major software",
            "Regular updates included",
            "Email support for installation"
          ]
        };
        
        setProduct(enhancedProduct);
        setPreviewImage(mockImages[0]);
        setCurrentImageIndex(0);
      } catch (err) {
        console.error('Error fetching digital product:', err);
        
        // Fallback to mock data if API fails
        const mockImages = [
          '/assets/img/test/Clinic Manager.jpg',
          '/assets/img/test/Attendance Template.png',
          '/assets/img/test/Construction Estimator.png',
          '/assets/img/test/Company Payroll System 3.png',
          '/assets/img/banner-img.png'
        ];
        
        const mockProduct: EnhancedDigitalProduct = {
          id: parseInt(id),
          user_id: 1,
          title: 'Digital Product ' + id,
          description: 'This is a premium digital product that can help you streamline your workflow and increase productivity.\n\nIt includes multiple templates, assets, and resources that are ready to use out of the box.\n\nPurchase now and get instant access to all the features!',
          price: 29.99,
          original_price: 49.99,
          file_path: '/files/digital-product.zip',
          file_name: 'digital-product-package.zip',
          file_size: '15728640', // 15MB in bytes
          file_type: 'ZIP Archive',
          preview_path: null,
          download_limit: null,
          is_featured: true,
          status: 'published',
          created_at: '2023-05-15T00:00:00.000Z',
          updated_at: '2023-06-01T00:00:00.000Z',
          rating: 4.5,
          reviews: 24,
          seller: 'DigitalCreator',
          screenshots: mockImages,
          features: [
            "High-quality digital asset",
            "Instant download after purchase",
            "Compatible with major software",
            "Regular updates included",
            "Email support for installation"
          ],
          downloads: 150
        };
        
        setProduct(mockProduct);
        setPreviewImage(mockImages[0]);
        setCurrentImageIndex(0);
        setError(null); // Clear error since we're showing mock data
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handlePurchase = async (packageType: 'basic' | 'standard' | 'premium') => {
    if (!user) {
      router.push(`/login?redirect=/digital-products/${id}`);
      return;
    }
    
    setPurchasing(true);
    setPurchaseError(null);
    
    try {
      let price = product?.price || 0;
      if (packageType === 'standard') price = product?.price ? product.price * 1.5 : 0;
      if (packageType === 'premium') price = product?.price ? product.price * 2 : 0;
      
      const response = await purchaseDigitalProduct(parseInt(id), price);
      setPurchaseSuccess(true);
      
      // Handle download or redirection
      if (response.data?.download_url) {
        window.open(response.data.download_url, '_blank');
      }
    } catch (err: any) {
      setPurchaseError(err.message || 'Failed to process your purchase. Please try again.');
    } finally {
      setPurchasing(false);
    }
  };
  
  const handlePreview = async () => {
    try {
      const blob = await getPreview(parseInt(id));
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error('Error getting preview:', err);
      alert('Failed to load preview. Please try again later.');
    }
  };
  
  // Get product image URL helper
  const getProductImageUrl = (path: string | null) => {
    if (!path) return '/assets/img/placeholder.jpg';
    
    // If it's already a local path starting with /assets, return it as is
    if (path.startsWith('/assets/')) {
      return path;
    }
    
    // If it's a local path for test images, return it as is
    if (path.startsWith('/')) {
      return path;
    }
    
    // Otherwise, it's likely from the API storage
    return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
  };

  // Generate a deterministic avatar number based on the product ID or seller name
  const getAvatarNumber = (productId: number, sellerName: string) => {
    // Use the product ID if available, otherwise hash the seller name
    const hashValue = productId || sellerName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Ensure it's between 1 and 10 (we have 10 avatar images)
    return (hashValue % 10) + 1;
  };
  
  // Calculate seller level based on product rating
  const getSellerLevel = () => {
    if (!product) return 'New Seller';
    const rating = product.rating || 0;
    if (rating >= 4.8) return 'Top Rated';
    if (rating >= 4.5) return 'Level 2';
    if (rating >= 4.0) return 'Level 1';
    return 'New Seller';
  };

  // Function to render the styled price
  const renderStyledPrice = (price: number, originalPrice?: number | null) => {
    const discountPercentage = originalPrice && originalPrice > price 
      ? Math.round(((originalPrice - price) / originalPrice) * 100) 
      : null;
    
    return (
      <div className="price-container">
        <span className="price-amount">₱{price.toFixed(0)}</span>
        <span className="price-plan">/lifetime</span>
        {originalPrice && originalPrice > price && (
          <span className="price-original">₱{originalPrice.toFixed(0)}</span>
        )}
        {discountPercentage && discountPercentage >= 10 && (
          <span className="discount-badge">-{discountPercentage}%</span>
        )}
      </div>
    );
  };

  // Add to existing CSS for the component somewhere in the file:
  const imageTransitionStyle = isTransitioning 
    ? "opacity-50 transform scale-95 transition-all duration-300" 
    : "opacity-100 transform scale-100 transition-all duration-300";

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
      const relatedServicesSection = document.querySelector('.mt-12'); // Related services section or any footer element
      
      if (!container || !leftColumn || !reviewsEl) {
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
      const relatedServicesTop = relatedServicesSection ? relatedServicesSection.getBoundingClientRect().top + scrollY : document.body.scrollHeight;
      
      // Calculate absolute positions
      const sidebarContainerTop = sidebarContainerRect.top + scrollY;
      const reviewsBottom = reviewsRect.bottom + scrollY;
      
      // Preserve the width of the sidebar to avoid layout shifts
      const sidebarWidth = sidebarContainer.offsetWidth;
      
      // Define the top offset for sticky positioning
      const stickyTopOffset = 24; // px from the top when sticky
      
      // Check if we should make the sidebar sticky
      if (scrollY + stickyTopOffset > sidebarContainerTop) {
        // Don't show the sidebar when we've scrolled to related services section
        if (relatedServicesSection && scrollY + stickyTopOffset > relatedServicesTop - 50) {
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

  if (loading) {
    return (
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="content bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto text-center">
            <div className="text-orange-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Failed to load digital product</h2>
            <p className="text-gray-600 mb-6">
              {error || 'The requested product could not be found. Please try again later or choose another product.'}
            </p>
            <div className="flex justify-center">
              <Link href="/digital-products" className="btn bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                  Back to Digital Products
                </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Check if the current user is the owner of the product
  const isOwner = user && user.id === product.user_id;

  return (
    <div className="content bg-gray-100">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb navigation */}
          <nav className="flex text-sm mb-3">
            <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <span className="mx-2 text-gray-500">&gt;</span>
            <Link href="/digital-products" className="text-gray-600 hover:text-blue-600">Digital Products</Link>
            <span className="mx-2 text-gray-500">&gt;</span>
            <span className="text-gray-800">{product.title}</span>
          </nav>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h1>
          
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
                Share this product
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
                <span className="text-sm font-medium">Instant Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {purchaseSuccess && (
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Purchase Successful!</h4>
                <p>Thank you for your purchase. You will be redirected to your purchases page shortly.</p>
              </div>
            </div>
          </div>
        )}
        
        {purchaseError && (
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="alert alert-danger" role="alert">
                {purchaseError}
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Product Images & Descriptions */}
          <div className="lg:col-span-2">
            {/* Product Title and Basic Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-700 mb-2">{product.title}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-gray-600 text-sm">{product.rating || '5.0'}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-gray-600 text-sm">{product.reviews || 0} reviews</span>
                </div>
                <span className="mx-2 text-gray-500">•</span>
                <div className="text-gray-600 text-sm">Instant Delivery</div>
              </div>
              
              {/* Image Slider */}
              <div className="relative mb-6">
                {/* Main Image */}
                <div className="bg-gray-100 rounded-xl overflow-hidden relative aspect-video">
                  <Image 
                    src={getProductImageUrl(previewImage)} 
                    alt={product.title} 
                    className={`w-full h-full object-cover ${imageTransitionStyle}`}
                    width={800}
                    height={450}
                  />
                </div>
                
                {/* Previous/Next Image Buttons if multiple images */}
                {product.screenshots && product.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateImage('prev')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-gray-900 transition-all hover:shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => navigateImage('next')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-gray-900 transition-all hover:shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                
                {/* Thumbnail Navigation */}
                {product.screenshots && product.screenshots.length > 1 && (
                  <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                    {product.screenshots.map((image, i) => (
                    <button 
                        key={i}
                        onClick={() => handleImageClick(i)}
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-200 ${
                          i === currentImageIndex ? 'ring-2 ring-orange-500' : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Image 
                          src={getProductImageUrl(image)}
                          alt={`${product.title} - Image ${i + 1}`}
                          className="w-full h-full object-cover"
                          width={80}
                          height={80}
                        />
                    </button>
                    ))}
                  </div>
                )}
              </div>
              </div>
              
            {/* Product Description */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-700">About this product</h2>
              <div>
                {product.description?.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 mb-4">{paragraph}</p>
                ))}
                  </div>
                  </div>
            
            {/* Why you'll love this */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Why you will love this</h2>
              <div className="prose prose-gray max-w-none text-gray-600">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">Premium Quality:</strong> This product has been carefully crafted with attention to detail to provide you with the highest quality digital assets.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">Instant Access:</strong> Immediately download after purchase - no waiting time or delays, just instant access to all features and resources.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">Easy to Use:</strong> Intuitive design makes it simple to implement and customize, even if you don't have extensive technical knowledge.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">Ongoing Updates:</strong> Purchase once and receive all future updates at no additional cost, ensuring you always have the latest features.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">Dedicated Support:</strong> Our team is ready to help with any questions you might have about installation, customization, or troubleshooting.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Product Features</h2>
              <div className="prose prose-gray max-w-none text-gray-600">
                <ul className="space-y-3">
                  {product.features && product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    </li>
                  ))}
                  {!product.features && (
                    <>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="text-gray-700">High-quality, ready-to-use digital content</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="text-gray-700">Instant download after purchase</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="text-gray-700">Compatible with industry-standard software</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="text-gray-700">Easy to customize and adapt to your needs</span>
                        </div>
                      </li>
                    </>
                  )}
                </ul>
                </div>
              </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <details className="border border-gray-200 rounded-xl">
                  <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50 rounded-xl text-gray-600">
                    <span>What do I get after purchasing?</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 text-gray-600 border-t border-gray-200">
                    After completing your purchase, you'll receive an email with download instructions. You can also access your purchase immediately from your account dashboard.
            </div>
                </details>
                
                <details className="border border-gray-200 rounded-xl">
                  <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50 rounded-xl text-gray-600">
                    <span>Can I use this product for commercial projects?</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 text-gray-600 border-t border-gray-200">
                    Yes, all our digital products come with a commercial license. You can use them in both personal and commercial projects.
          </div>
                </details>
                
                <details className="border border-gray-200 rounded-xl">
                  <summary className="p-4 font-medium cursor-pointer focus:outline-none flex justify-between items-center hover:bg-gray-50 rounded-xl text-gray-600">
                    <span>Do you offer refunds?</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 text-gray-600 border-t border-gray-200">
                    Due to the digital nature of our products, we generally don't offer refunds. However, if you encounter any issues with the product, please contact our support team for assistance.
                    </div>
                </details>
              </div>
            </div>

            {/* Get to know the seller section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-5 text-gray-700">Get to know {product?.seller || 'the Creator'}</h2>
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Seller Avatar & Basic Info */}
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-3">
                  <Image 
                        src={`/assets/img/profiles/avatar-${getAvatarNumber(product?.id || 1, product?.seller || 'Seller')}.jpg`}
                        alt={product?.seller || 'Seller'}
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-white shadow-md"
                      />
                      <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                    <h3 className="text-lg font-bold text-gray-800">{product?.seller || 'Digital Creator'}</h3>
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
                      <span className="ml-1 text-gray-700 font-medium">{product?.rating?.toFixed(1) || '5.0'}</span>
                      <span className="ml-1 text-gray-600">({product?.reviews || 45} Reviews)</span>
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
                      Hello, Greetings! My name is {product?.seller || 'Digital Creator'}, and I am an experienced affiliate marketer and 
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
                    <div className="text-4xl font-bold text-gray-700">{product?.rating?.toFixed(1) || '4.8'}</div>
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star}
                          className={`w-5 h-5 ${star <= Math.round(product?.rating || 4.8) ? 'text-orange-500' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{product?.reviews || 24} reviews</div>
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
                {/* Review 1 */}
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
                    Excellent product! This digital asset exceeded my expectations. It was incredibly easy to use 
                    and implement, and the quality is outstanding. The documentation is comprehensive and made 
                    setup a breeze. Highly recommended!
                  </p>
                </div>
                
                {/* Review 2 */}
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
                    Good product overall. The quality is great and it works as described. I had a few minor issues 
                    with implementation, but the customer support was responsive and helped me resolve them quickly. 
                    Would purchase from this seller again.
                  </p>
                </div>
                
                {/* Review 3 */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center mb-3">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                        RJ
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Robert Johnson</h4>
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
                    Absolutely perfect! This is exactly what I was looking for. The files are well-organized, 
                    the design is modern and clean, and it saved me countless hours of work. The seller was also 
                    very helpful when I had questions. Five stars all the way!
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
                        <div className="text-xl font-bold text-gray-800">₱{product?.price.toFixed(2) || '29.99'}</div>
                        <div className="text-gray-700 font-medium">Basic</div>
                      </th>
                      <th className="py-3 px-4 text-center font-medium text-gray-600">
                        <div className="text-xl font-bold text-gray-800">₱{product?.price ? (product.price * 1.5).toFixed(2) : '44.99'}</div>
                        <div className="text-gray-700 font-medium">Standard</div>
                      </th>
                      <th className="py-3 px-4 text-center font-medium text-gray-600">
                        <div className="text-xl font-bold text-gray-800">₱{product?.price ? (product.price * 2).toFixed(2) : '59.99'}</div>
                        <div className="text-gray-700 font-medium">Premium</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 text-gray-600">Description</td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        BASIC PACKAGE
                        <div className="mt-2 text-sm">
                          Basic version with essential features and standard support.
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        STANDARD PACKAGE
                        <div className="mt-2 text-sm">
                          Enhanced version with additional features and extended support.
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        PREMIUM PACKAGE
                        <div className="mt-2 text-sm">
                          Complete solution with all features, priority support, and exclusive bonuses.
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
                            value="instant"
                            checked={true}
                            className="sr-only"
                          />
                          <span className="w-4 h-4 rounded-full border border-orange-500 bg-orange-500 inline-block mr-2"></span>
                          Instant
                        </label>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        <label className="flex items-center justify-center cursor-pointer">
                          <input
                            type="radio"
                            name="standardDelivery"
                            value="instant"
                            checked={true}
                            className="sr-only"
                          />
                          <span className="w-4 h-4 rounded-full border border-orange-500 bg-orange-500 inline-block mr-2"></span>
                          Instant
                        </label>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-center">
                        <label className="flex items-center justify-center cursor-pointer">
                          <input
                            type="radio"
                            name="premiumDelivery"
                            value="instant"
                            checked={true}
                            className="sr-only"
                          />
                          <span className="w-4 h-4 rounded-full border border-orange-500 bg-orange-500 inline-block mr-2"></span>
                          Instant
                        </label>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4 text-gray-600">Source Files</td>
                      <td className="py-4 px-4 text-center">
                        <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
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
                      <td className="py-4 px-4 text-gray-600">Commercial Use</td>
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
                        <div className="text-gray-600 text-sm">14 days</div>
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
                        <div className="text-xl font-bold text-gray-800 mb-3">₱{product?.price?.toFixed(2) || '29.99'}</div>
                  <button 
                          onClick={() => handlePurchase('basic')}
                          className="w-full h-12 py-2.5 px-6 max-w-[240px] mx-auto rounded-xl text-white bg-orange-600 font-medium hover:bg-orange-700 transition-colors text-lg"
                    disabled={purchasing}
                  >
                          {purchasing ? 'Processing...' : 'Select'}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="text-xl font-bold text-gray-800 mb-3">₱{product?.price ? (product.price * 1.5).toFixed(2) : '44.99'}</div>
                        <button 
                          onClick={() => handlePurchase('standard')}
                          className="w-full h-12 py-2.5 px-6 max-w-[240px] mx-auto rounded-xl text-white bg-orange-600 font-medium hover:bg-orange-700 transition-colors text-lg"
                          disabled={purchasing}
                        >
                          {purchasing ? 'Processing...' : 'Select'}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="text-xl font-bold text-gray-800 mb-3">₱{product?.price ? (product.price * 2).toFixed(2) : '59.99'}</div>
                        <button 
                          onClick={() => handlePurchase('premium')}
                          className="w-full h-12 py-2.5 px-6 max-w-[240px] mx-auto rounded-xl text-white bg-orange-600 font-medium hover:bg-orange-700 transition-colors text-lg"
                          disabled={purchasing}
                        >
                          {purchasing ? 'Processing...' : 'Select'}
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
                        {selectedPackage === 'basic' && product?.price && `₱${product.price.toFixed(2)}`}
                        {selectedPackage === 'standard' && product?.price && `₱${(product.price * 1.5).toFixed(2)}`}
                        {selectedPackage === 'premium' && product?.price && `₱${(product.price * 2).toFixed(2)}`}
                      </span>
                      {discountPercentage > 0 && product?.original_price && selectedPackage === 'basic' && (
                        <>
                          <span className="ml-3 text-gray-500 line-through text-lg">
                            ₱{product.original_price.toFixed(2)}
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
                        {selectedPackage === 'basic' && '3 day delivery'}
                        {selectedPackage === 'standard' && '2 day delivery'}
                        {selectedPackage === 'premium' && '1 day delivery'}
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
                    onClick={() => handlePurchase(selectedPackage)}
                    className="w-full py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors mb-4"
                    disabled={purchasing}
                  >
                    {purchasing ? 'Processing...' : 'Buy this gig'}
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
                    <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                      <Image 
                        src={`/assets/img/profiles/avatar-${getAvatarNumber(product?.id || 1, product?.seller || 'Seller')}.jpg`}
                        alt={product?.seller || 'Seller'}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
      </div>
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 flex items-center">
                      {product?.seller || 'Seller Name'}
                      <span className="ml-2 inline-flex items-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-1.5"></span>
                        <span className="text-xs text-green-600">Online</span>
                      </span>
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{product?.rating?.toFixed(1) || '4.9'}</span>
                      <span className="ml-1 text-gray-600">({product?.reviews || 98} Reviews)</span>
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
      
      {/* Related Products Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Related Products</h2>
          <p className="text-gray-600 mb-6">You might be interested in these products as well</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product Card 1 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <Link href="/digital-products/1" className="block">
                <div className="relative pt-[60%] bg-gray-200">
                  <Image 
                    src="/assets/img/test/Attendance Template.png" 
                    alt="Attendance Template" 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    width={300}
                    height={180}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-3 overflow-hidden">
                      <Image 
                        src="/assets/img/avatar-1.jpg" 
                        alt="Seller" 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-md font-semibold text-gray-800 hover:text-orange-600 transition-colors line-clamp-2">
                      Attendance Template
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1">4.1 (15 reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">3 day delivery</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">₱149.00</div>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Product Card 2 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <Link href="/digital-products/2" className="block">
                <div className="relative pt-[60%] bg-gray-200">
                  <Image 
                    src="/assets/img/test/Class Student Manager.png" 
                    alt="Class Student Manager" 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    width={300}
                    height={180}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-3 overflow-hidden">
                      <Image 
                        src="/assets/img/avatar-2.jpg" 
                        alt="Seller" 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-md font-semibold text-gray-800 hover:text-orange-600 transition-colors line-clamp-2">
                      Class Student Manager
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1">4.2 (20 reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">3 day delivery</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">₱199.00</div>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Product Card 3 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <Link href="/digital-products/3" className="block">
                <div className="relative pt-[60%] bg-gray-200">
                  <Image 
                    src="/assets/img/test/Clinic Manager.png" 
                    alt="Clinic Manager" 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    width={300}
                    height={180}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-3 overflow-hidden">
                      <Image 
                        src="/assets/img/avatar-3.jpg" 
                        alt="Seller" 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-md font-semibold text-gray-800 hover:text-orange-600 transition-colors line-clamp-2">
                      Clinic Manager System
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1">4.3 (25 reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">3 day delivery</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">₱249.00</div>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Product Card 4 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <Link href="/digital-products/4" className="block">
                <div className="relative pt-[60%] bg-gray-200">
                  <Image 
                    src="/assets/img/test/Company Payroll System.png" 
                    alt="Company Payroll System" 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    width={300}
                    height={180}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-3 overflow-hidden">
                      <Image 
                        src="/assets/img/avatar-4.jpg" 
                        alt="Seller" 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-md font-semibold text-gray-800 hover:text-orange-600 transition-colors line-clamp-2">
                      Company Payroll System
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1">4.4 (30 reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">3 day delivery</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">₱299.00</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Recently Viewed Section */}
        <div className="mb-8" ref={recentlyViewedRef}>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Recently Viewed</h2>
          <p className="text-gray-600 mb-6">Services you've browsed recently</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Recently Viewed Product Card 1 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <Link href="/digital-products/5" className="block">
                <div className="relative pt-[60%] bg-gray-200">
                  <Image 
                    src="/assets/img/test/Construction Estimator.png" 
                    alt="Construction Estimator" 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    width={300}
                    height={180}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-3 overflow-hidden">
                      <Image 
                        src="/assets/img/avatar-5.jpg" 
                        alt="Seller" 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-md font-semibold text-gray-800 hover:text-orange-600 transition-colors line-clamp-2">
                      Construction Estimator Template
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1">4.5 (18 reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">3 day delivery</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">₱179.00</div>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Recently Viewed Product Card 2 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <Link href="/digital-products/1" className="block">
                <div className="relative pt-[60%] bg-gray-200">
                  <Image 
                    src="/assets/img/test/Attendance Template.png" 
                    alt="Attendance Template" 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    width={300}
                    height={180}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-3 overflow-hidden">
                      <Image 
                        src="/assets/img/avatar-1.jpg" 
                        alt="Seller" 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-md font-semibold text-gray-800 hover:text-orange-600 transition-colors line-clamp-2">
                      Attendance Template
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1">4.1 (15 reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">3 day delivery</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">₱149.00</div>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Recently Viewed Product Card 3 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <Link href="/digital-products/3" className="block">
                <div className="relative pt-[60%] bg-gray-200">
                  <Image 
                    src="/assets/img/test/Clinic Manager.png" 
                    alt="Clinic Manager" 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    width={300}
                    height={180}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-3 overflow-hidden">
                      <Image 
                        src="/assets/img/avatar-3.jpg" 
                        alt="Seller" 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-md font-semibold text-gray-800 hover:text-orange-600 transition-colors line-clamp-2">
                      Clinic Manager System
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1">4.3 (25 reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">3 day delivery</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">₱249.00</div>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Recently Viewed Product Card 4 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <Link href="/digital-products/2" className="block">
                <div className="relative pt-[60%] bg-gray-200">
                  <Image 
                    src="/assets/img/test/Class Student Manager.png" 
                    alt="Class Student Manager" 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    width={300}
                    height={180}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-3 overflow-hidden">
                      <Image 
                        src="/assets/img/avatar-2.jpg" 
                        alt="Seller" 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-md font-semibold text-gray-800 hover:text-orange-600 transition-colors line-clamp-2">
                      Class Student Manager
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1">4.2 (20 reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">3 day delivery</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">₱199.00</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal for Order Confirmation */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Add your order confirmation content here */}
        </div>
      )}
    </div>
  );
};

export default DigitalProductPage; 