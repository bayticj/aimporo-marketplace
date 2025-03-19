'use client';

import React, { useState, useEffect } from 'react';
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

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
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
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          {/* Breadcrumb navigation */}
          <nav className="flex text-sm mb-2">
            <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link href="/services" className="text-gray-600 hover:text-blue-600">Services</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link href="/services/digital-marketing" className="text-gray-600 hover:text-blue-600">Digital Marketing</Link>
          </nav>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">I will design, redesign wordpress website using elementor pro</h1>
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center text-gray-600 hover:text-blue-600 border border-gray-300 rounded px-3 py-1">
                <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add to Wishlist
              </button>
              
              <button className="flex items-center text-gray-600 hover:text-blue-600 border border-gray-300 rounded px-3 py-1">
                <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08261 9.84066C7.54305 9.32015 6.80891 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15C6.80891 15 7.54305 14.6798 8.08261 14.1593L15.0227 18.6294C15.0077 18.7508 15 18.8745 15 19C15 20.6569 16.3431 22 18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C17.1911 16 16.457 16.3202 15.9174 16.8407L8.97733 12.3706C8.99229 12.2492 9 12.1255 9 12C9 11.8745 8.99229 11.7508 8.97733 11.6294L15.9174 7.15934C16.457 7.67985 17.1911 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Share this gigs
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-amber-500 mr-1.5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.85 8.3L22 9.3L17 14.1L18.18 21L12 17.77L5.82 21L7 14.1L2 9.3L9.15 8.3L12 2Z" />
                </svg>
                <span className="text-gray-600">Created 3 weeks ago</span>
              </div>
              
              <div className="flex items-center text-blue-600">
                <svg className="w-5 h-5 text-blue-600 mr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-medium">15 Order in queue</span>
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
            {/* Main Service Image */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="relative h-[300px] md:h-[500px] w-full">
                <Image 
                  src={gig.images[activeImageIndex] || '/assets/img/banner-img.png'} 
                  alt={gig.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              
              {/* Thumbnail Gallery */}
              {gig.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-4">
                  {gig.images.map((image, index) => (
                    <div 
                      key={index} 
                      className={`relative h-20 rounded-md overflow-hidden cursor-pointer border-2 
                        ${index === activeImageIndex ? 'border-blue-500' : 'border-gray-200'}`}
                      onClick={() => handleImageClick(index)}
                    >
                      <Image 
                        src={image} 
                        alt={`${gig.title} ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Service Details Tab Panel */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              {/* Tab Navigation */}
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  <button 
                    className={`px-6 py-3 font-medium text-sm focus:outline-none whitespace-nowrap
                      ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button 
                    className={`px-6 py-3 font-medium text-sm focus:outline-none whitespace-nowrap
                      ${activeTab === 'requirements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                    onClick={() => setActiveTab('requirements')}
                  >
                    Requirements
                  </button>
                  <button 
                    className={`px-6 py-3 font-medium text-sm focus:outline-none whitespace-nowrap
                      ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews ({gig.reviews_count || 0})
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'description' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">About This Service</h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-line">{gig.description}</p>
                    </div>
                    
                    {/* Service Tags */}
                    {gig.tags && gig.tags.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {gig.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'requirements' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Service Requirements</h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-line">
                        {gig.requirements || 'No specific requirements provided by the seller.'}
                      </p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
                    
                    {gig.reviews_count ? (
                      <div className="flex items-center mb-6">
                        <div className="flex-shrink-0 mr-4">
                          <div className="bg-blue-50 text-blue-700 p-3 rounded-full font-bold text-xl">
                            {typeof gig.average_rating === 'number' ? gig.average_rating.toFixed(1) : 'N/A'}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className="w-5 h-5" 
                                fill={i < Math.floor(gig.average_rating || 0) ? "#FFC107" : "#E0E0E0"} 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-gray-600 ml-2">
                              Based on {gig.reviews_count} reviews
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500">No reviews yet.</p>
                    )}
                    
                    {/* Demo Reviews */}
                    <div className="space-y-6">
                      <div className="border-b pb-6">
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 mr-4 flex items-center justify-center uppercase font-medium">
                            M
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center mb-1">
                              <h4 className="font-medium mr-2">Michael K.</h4>
                              <div className="flex items-center text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-gray-500 text-sm">2 weeks ago</span>
                            </div>
                            <p className="text-gray-700">
                              Exceptional design work! The UI/UX was exactly what I needed for my business website.
                              Communication was great, and delivery was faster than expected.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-b pb-6">
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 mr-4 flex items-center justify-center uppercase font-medium">
                            S
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center mb-1">
                              <h4 className="font-medium mr-2">Sarah J.</h4>
                              <div className="flex items-center text-yellow-400 mr-2">
                                {[...Array(4)].map((_, i) => (
                                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                                <svg className="w-4 h-4" fill="#E0E0E0" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                              <span className="text-gray-500 text-sm">1 month ago</span>
                            </div>
                            <p className="text-gray-700">
                              Good design, though I needed a few extra revisions to get exactly what I wanted.
                              Overall, I'm happy with the final result and would recommend this service.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Pricing & Seller Info */}
          <div className="lg:col-span-1">
            {/* Pricing Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 sticky top-6">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Service Package</h2>
                
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">₱{gig.price.toFixed(2)}</span>
                    {discountPercentage && gig.original_price && (
                      <>
                        <span className="ml-3 text-gray-500 line-through text-lg">
                          ₱{gig.original_price.toFixed(2)}
                        </span>
                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                          Save {discountPercentage}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Features List */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Professional & modern design</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Fully responsive design</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">{gig.delivery_time} day delivery</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Unlimited revisions</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Source files included</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
                    Continue (₱{gig.price.toFixed(2)})
                  </button>
                  <button className="w-full py-3 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors">
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>
            
            {/* Seller Info Card */}
            {gig.user && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">About The Seller</h2>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-white mr-4">
                      {gig.user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{gig.user.name}</h3>
                      {gig.user.profile?.location && (
                        <p className="text-gray-600 text-sm">{gig.user.profile.location}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Seller Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-500">Member since</p>
                      <p className="font-medium">{gig.user.profile?.member_since ? new Date(gig.user.profile.member_since).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-500">Response time</p>
                      <p className="font-medium">1 hour</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-500">Last delivery</p>
                      <p className="font-medium">1 day ago</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-500">Languages</p>
                      <p className="font-medium">English</p>
                    </div>
                  </div>
                  
                  {/* Seller Bio */}
                  {gig.user.profile?.bio && (
                    <div className="mb-4">
                      <p className="text-gray-700 text-sm">{gig.user.profile.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
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
                  <div className="flex items-center text-yellow-400 text-sm mb-2">
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