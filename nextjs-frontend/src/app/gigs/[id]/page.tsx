'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { gigService, orderService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

interface Gig {
  id: number;
  title: string;
  description: string;
  price: number;
  delivery_time: number;
  requirements: string;
  location: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  average_rating: number;
  reviews_count: number;
  is_featured: boolean;
  is_active: boolean;
  user: {
    id: number;
    name: string;
    email: string;
    profile: {
      avatar: string;
      bio: string;
      location: string;
      member_since: string;
    }
  };
  category: {
    id: number;
    name: string;
  };
}

export default function GigDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [gig, setGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<string>('');
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        setLoading(true);
        const id = params?.id;
        if (!id) {
          throw new Error('Gig ID is required');
        }
        
        const response = await gigService.getGig(Number(id));
        setGig(response.data.gig);
        if (response.data.gig.thumbnail) {
          setActiveImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${response.data.gig.thumbnail}`);
        } else if (response.data.gig.images && response.data.gig.images.length > 0) {
          setActiveImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${response.data.gig.images[0]}`);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch gig details');
        // For demo purposes, use sample data if API fails
        setGig({
          id: 1,
          title: 'Professional Logo Design',
          description: 'I will create a professional, modern logo for your business or brand. The package includes unlimited revisions, multiple file formats, and full copyright ownership.',
          price: 49.99,
          delivery_time: 2,
          requirements: 'Please provide your business name, any specific colors or styles you prefer, and a brief description of your business.',
          location: 'New York',
          thumbnail: '/assets/img/banner-img.png',
          images: ['/assets/img/banner-img.png', '/assets/img/banner-img.png', '/assets/img/banner-img.png'],
          tags: ['logo', 'design', 'branding'],
          average_rating: 4.8,
          reviews_count: 124,
          is_featured: true,
          is_active: true,
          user: {
            id: 2,
            name: 'CreativeStudio',
            email: 'creative@example.com',
            profile: {
              avatar: '/assets/img/profiles/avatar-1.jpg',
              bio: 'Professional graphic designer with over 5 years of experience.',
              location: 'New York',
              member_since: '2020-01-01',
            }
          },
          category: {
            id: 5,
            name: 'Graphic Design'
          }
        });
        setActiveImage('/assets/img/banner-img.png');
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [params]);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderLoading(true);
    setOrderError(null);

    try {
      // Create order data
      const orderData = {
        gig_id: gig.id,
        details: orderDetails,
        quantity: orderQuantity,
        total_price: gig.price * orderQuantity
      };

      // Send order to API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }

      // Order successful
      setOrderSuccess(true);
    } catch (err: any) {
      setOrderError(err.message || 'Failed to place order. Please try again.');
      
      // For demo purposes, simulate success if API fails
      if (process.env.NODE_ENV !== 'production') {
        setTimeout(() => {
          setOrderSuccess(true);
        }, 1000);
      }
    } finally {
      setOrderLoading(false);
    }
  };

  const handleImageClick = (image: string) => {
    setActiveImage(image);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !gig) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Gig</h2>
        <p className="text-gray-700 mb-6">{error || 'Gig not found'}</p>
        <Link href="/gigs" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
          Back to Gigs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Gig Header */}
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{gig.title}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-700">{gig.average_rating.toFixed(1)} ({gig.reviews_count} reviews)</span>
                  </div>
                  <div className="text-gray-600">
                    <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded">
                      {gig.category.name}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-orange-600">${gig.price.toFixed(2)}</p>
                <p className="text-gray-600">Delivery in {gig.delivery_time} day{gig.delivery_time !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          {/* Gig Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
            <div className="md:col-span-2">
              {/* Gig Images */}
              <div className="mb-8">
                <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden">
                  <Image 
                    src={activeImage} 
                    alt={gig.title} 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {gig.images.slice(1).map((image, index) => (
                    <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                      <Image 
                        src={image} 
                        alt={`${gig.title} ${index + 2}`} 
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Gig Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Gig</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{gig.description}</p>
                </div>
              </div>

              {/* Seller Info */}
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-bold mb-4">About The Seller</h2>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-white mr-4">
                    {gig.user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{gig.user.name}</h3>
                    <p className="text-gray-600">{gig.user.profile?.location || gig.location}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="mr-4">
                    <span className="font-medium">Member since:</span> {gig.user.profile?.member_since || 'Jan 2023'}
                  </div>
                  <div>
                    <span className="font-medium">Response time:</span> 1 hour
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {gig.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Box */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-2xl font-bold mb-4">${gig.price}</h2>
                <p className="text-gray-600 mb-6">
                  <svg className="w-5 h-5 inline-block mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {gig.delivery_time} day{gig.delivery_time !== 1 ? 's' : ''} delivery
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>High-quality design</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Unlimited revisions</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Commercial use rights</span>
                  </div>
                </div>
                
                {orderSuccess ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <p className="font-medium">Order placed successfully!</p>
                    <p className="text-sm mt-1">You can track your order in your dashboard.</p>
                    <div className="mt-4">
                      <Link href="/dashboard/orders" className="block w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-center">
                        View Order
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleOrderSubmit}>
                    {orderError && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <p>{orderError}</p>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Project Details</label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        rows={4}
                        placeholder="Describe your project requirements..."
                        value={orderDetails}
                        onChange={(e) => setOrderDetails(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-1">Quantity</label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
                        required
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <span>Service</span>
                        <span>${gig.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Quantity</span>
                        <span>x {orderQuantity}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${(gig.price * orderQuantity).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                      disabled={orderLoading}
                    >
                      {orderLoading ? 'Processing...' : `Continue (${(gig.price * orderQuantity).toFixed(2)})`}
                    </button>
                  </form>
                )}
                
                <div className="mt-4 text-center">
                  <button className="text-orange-600 hover:underline">
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 