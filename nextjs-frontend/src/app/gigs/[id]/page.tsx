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
  delivery_time: string;
  requirements: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  category: string;
  subcategory: string;
  rating: number;
  reviews: number;
  images: string[];
  tags: string[];
  is_featured: boolean;
  is_active: boolean;
}

export default function GigDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [gig, setGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orderRequirements, setOrderRequirements] = useState<string>('');
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        setLoading(true);
        const id = params?.id;
        if (!id) {
          throw new Error('Gig ID is required');
        }
        
        const response = await gigService.getGig(Number(id));
        setGig(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch gig details');
        // For demo purposes, use sample data if API fails
        setGig({
          id: 1,
          title: 'Professional Logo Design',
          description: 'I will create a professional, modern logo for your business or brand. The package includes unlimited revisions, multiple file formats, and full copyright ownership.',
          price: 49.99,
          delivery_time: '2 days',
          requirements: 'Please provide your business name, any specific colors or styles you prefer, and a brief description of your business.',
          user: {
            id: 2,
            name: 'CreativeStudio',
            email: 'creative@example.com',
          },
          category: 'Design & Creative',
          subcategory: 'Logo Design',
          rating: 4.8,
          reviews: 124,
          images: ['/assets/img/banner-img.png', '/assets/img/banner-img.png', '/assets/img/banner-img.png'],
          tags: ['logo', 'design', 'branding'],
          is_featured: true,
          is_active: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [params]);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      router.push('/auth/login');
      return;
    }
    
    try {
      setOrderLoading(true);
      setOrderError(null);
      
      if (!gig) return;
      
      const orderData = {
        gig_id: gig.id,
        buyer_id: user.id,
        seller_id: gig.user.id,
        total_amount: gig.price,
        requirements: orderRequirements,
        status: 'pending',
      };
      
      await orderService.createOrder(orderData);
      setOrderSuccess(true);
      setOrderRequirements('');
      
      // Redirect to orders page after successful order
      setTimeout(() => {
        router.push('/dashboard/orders');
      }, 2000);
      
    } catch (err: any) {
      setOrderError(err.message || 'Failed to place order');
    } finally {
      setOrderLoading(false);
    }
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
                    <span className="ml-1 text-gray-700">{gig.rating.toFixed(1)} ({gig.reviews} reviews)</span>
                  </div>
                  <div className="text-gray-600">
                    <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded">
                      {gig.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-orange-600">${gig.price.toFixed(2)}</p>
                <p className="text-gray-600">Delivery in {gig.delivery_time}</p>
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
                    src={gig.images[0]} 
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
                    <p className="text-gray-600">Professional {gig.subcategory} Expert</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="mr-4">
                    <span className="font-medium">Member since:</span> Jan 2023
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
              <div className="bg-gray-50 p-6 rounded-lg shadow-md sticky top-6">
                <h3 className="text-xl font-bold mb-4">Order This Gig</h3>
                
                {orderSuccess ? (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">Order placed successfully! Redirecting to your orders...</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleOrderSubmit}>
                    {orderError && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                        <p className="text-sm text-red-700">{orderError}</p>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Project Requirements</label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        rows={5}
                        placeholder={gig.requirements}
                        value={orderRequirements}
                        onChange={(e) => setOrderRequirements(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-700">Price:</span>
                      <span className="font-bold">${gig.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-700">Service Fee:</span>
                      <span className="font-bold">${(gig.price * 0.05).toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-6 pt-4 border-t">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-lg font-bold text-orange-600">${(gig.price * 1.05).toFixed(2)}</span>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={orderLoading || authLoading || !user}
                      className="w-full py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:bg-gray-400"
                    >
                      {orderLoading ? 'Processing...' : user ? 'Continue to Checkout' : 'Sign in to Order'}
                    </button>
                    
                    {!user && !authLoading && (
                      <p className="text-center mt-4 text-sm text-gray-600">
                        Please{' '}
                        <Link href="/auth/signin" className="text-orange-600 hover:underline">
                          sign in
                        </Link>{' '}
                        to place an order
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 