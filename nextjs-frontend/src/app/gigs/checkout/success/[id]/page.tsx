'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import confetti from 'canvas-confetti';

interface Gig {
  id: number;
  title: string;
  price: number;
}

export default function PaymentSuccessPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const packageType = searchParams.get('package') || 'basic';
  
  const [loading, setLoading] = useState(true);
  const [gig, setGig] = useState<Gig | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');
  
  useEffect(() => {
    // Comment out authentication check for testing
    /*
    if (!user) {
      router.push('/auth/login');
      return;
    }
    */
    
    // Generate random order number
    const generateOrderNumber = () => {
      const randomNum = Math.floor(10000000 + Math.random() * 90000000);
      return `ORD-${randomNum}`;
    };
    
    // Fetch gig details - mocked for now
    const fetchGigAndCreateOrder = async () => {
      setLoading(true);
      try {
        // Trigger confetti animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        // Mock data
        const mockGig: Gig = {
          id: Number(id),
          title: 'Professional Website Development',
          price: 100,
        };
        
        setGig(mockGig);
        setOrderNumber(generateOrderNumber());
      } catch (error) {
        console.error('Error loading success data:', error);
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGigAndCreateOrder();
  }, [id, packageType, router, user]);

  const redirectToRequirements = () => {
    router.push(`/gigs/requirements/${orderNumber}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium text-gray-800">{orderNumber}</span>
            </div>
            
            {gig && (
              <div className="flex justify-between">
                <span className="text-gray-600">Gig:</span>
                <span className="font-medium text-gray-800 capitalize">{gig.title} ({packageType})</span>
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Next Steps</h3>
            <p className="text-gray-600 mb-4">Tell the seller what you need by providing project requirements.</p>
            
            <button 
              onClick={redirectToRequirements}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm"
            >
              Provide Requirements
            </button>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-600 text-sm">
              We've sent a confirmation email to your registered email address.
            </p>
            
            <div className="mt-4">
              <Link 
                href="/gigs/orders" 
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                View All Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 