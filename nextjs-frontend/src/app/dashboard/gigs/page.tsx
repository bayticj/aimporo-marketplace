'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { gigService } from '@/services/api';
import { toast } from 'react-hot-toast';
import { formatCurrency } from '@/utils/currency';

interface Gig {
  id: number;
  title: string;
  description: string;
  price: number;
  delivery_time: number;
  thumbnail: string | null;
  is_active: boolean;
  created_at: string;
}

const GigsPage = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        const response = await gigService.getGigs({ user_gigs: true });
        setGigs(response.data.gigs.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching gigs:', err);
        setError('Failed to load gigs. Please try again later.');
        toast.error('Failed to load gigs');
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  const handleToggleStatus = async (gigId: number, currentStatus: boolean) => {
    try {
      await gigService.updateGig(gigId, { is_active: !currentStatus });
      
      // Update local state
      setGigs(prevGigs => 
        prevGigs.map(gig => 
          gig.id === gigId ? { ...gig, is_active: !currentStatus } : gig
        )
      );
      
      toast.success(`Gig ${currentStatus ? 'paused' : 'activated'} successfully`);
    } catch (error) {
      console.error('Error updating gig status:', error);
      toast.error('Failed to update gig status');
    }
  };

  const handleDeleteGig = async (gigId: number) => {
    if (!confirm('Are you sure you want to delete this gig?')) {
      return;
    }
    
    try {
      await gigService.deleteGig(gigId);
      
      // Remove from local state
      setGigs(prevGigs => prevGigs.filter(gig => gig.id !== gigId));
      
      toast.success('Gig deleted successfully');
    } catch (error) {
      console.error('Error deleting gig:', error);
      toast.error('Failed to delete gig');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Gigs</h1>
        <Link 
          href="/dashboard/gigs/create" 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create New Gig
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      ) : gigs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 mb-4">You haven't created any gigs yet.</p>
          <Link 
            href="/dashboard/gigs/create" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Your First Gig
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map(gig => (
            <div key={gig.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                {gig.thumbnail ? (
                  <img 
                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${gig.thumbnail}`} 
                    alt={gig.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded ${gig.is_active ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                  {gig.is_active ? 'Active' : 'Paused'}
                </div>
              </div>
              
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2">{gig.title}</h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{gig.description}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-lg">{formatCurrency(gig.price)}</span>
                  <span className="text-sm text-gray-500">Delivery: {gig.delivery_time} day{gig.delivery_time !== 1 ? 's' : ''}</span>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleToggleStatus(gig.id, gig.is_active)}
                      className={`px-3 py-1 text-xs rounded-md ${gig.is_active ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
                    >
                      {gig.is_active ? 'Pause' : 'Activate'}
                    </button>
                    <button 
                      onClick={() => handleDeleteGig(gig.id)}
                      className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                  <Link 
                    href={`/dashboard/gigs/edit/${gig.id}`}
                    className="px-3 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-md"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GigsPage; 