'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ProductDetailsLayout from '@/components/ProductDetailsLayout';
import ProductReviews from '@/components/ProductReviews';
import { FaDownload, FaFileAlt, FaDesktop, FaCode } from 'react-icons/fa';

// Mock API service (replace with actual service when available)
const softwareService = {
  getSoftware: async (id: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock response
    return {
      data: {
        id,
        title: 'Advanced Task Management Software',
        description: 'A powerful task management software for teams and individuals. Features include Kanban boards, time tracking, task dependencies, custom fields, and advanced reporting. Available for Windows, Mac, and Linux.',
        price: 79.99,
        original_price: 99.99,
        preview_path: '/assets/img/digital/digital-01.jpg',
        file_path: '/files/software.zip',
        file_type: 'application/zip',
        file_size: '154000000', // 154MB
        download_limit: null,
        user_id: 5,
        category_id: 3,
        is_featured: true,
        tags: ['productivity', 'task-management', 'project-management', 'kanban'],
        average_rating: 4.6,
        reviews_count: 38,
        created_at: '2023-07-10T00:00:00.000Z',
        updated_at: '2023-07-10T00:00:00.000Z',
        user: {
          id: 5,
          name: 'SoftwareExperts',
          email: 'software@example.com',
          profile: {
            avatar: '/assets/img/profiles/avatar-3.jpg',
            bio: 'Developing quality software solutions since 2015.',
            location: 'Berlin',
            member_since: '2018-06-20',
          }
        },
        category: {
          id: 3,
          name: 'Productivity Software'
        },
        system_requirements: {
          windows: 'Windows 10 or higher, 4GB RAM, 500MB disk space',
          mac: 'macOS 10.15 or higher, 4GB RAM, 500MB disk space',
          linux: 'Ubuntu 20.04 or equivalent, 4GB RAM, 500MB disk space'
        },
        license_type: 'Lifetime license for 1 user',
        version: '2.5.1',
        release_date: '2023-06-15'
      }
    };
  },
  purchaseSoftware: async (id: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response
    return {
      data: {
        success: true,
        message: 'Software purchased successfully',
        order_id: Math.floor(Math.random() * 1000000),
        download_url: '/api/download/software/' + id
      }
    };
  }
};

interface Software {
  id: number;
  title: string;
  description: string;
  price: number;
  original_price: number | null;
  preview_path: string;
  file_path: string;
  file_type: string;
  file_size: string;
  download_limit: number | null;
  user_id: number;
  category_id: number;
  is_featured: boolean;
  tags: string[];
  average_rating: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
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
  system_requirements: {
    windows: string;
    mac: string;
    linux: string;
  };
  license_type: string;
  version: string;
  release_date: string;
}

export default function SoftwareDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [software, setSoftware] = useState<Software | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [purchasing, setPurchasing] = useState<boolean>(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Format file size for display
  const formatFileSize = (sizeInBytes: string) => {
    const size = parseInt(sizeInBytes);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        setLoading(true);
        const id = params?.id;
        if (!id) {
          throw new Error('Software ID is required');
        }
        
        const response = await softwareService.getSoftware(Number(id));
        setSoftware(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch software details');
      } finally {
        setLoading(false);
      }
    };

    fetchSoftware();
  }, [params]);

  const handlePurchase = async () => {
    if (!user) {
      router.push(`/login?redirect=/software/${params?.id}`);
      return;
    }
    
    setPurchasing(true);
    setPurchaseError(null);
    
    try {
      const response = await softwareService.purchaseSoftware(Number(params?.id));
      setPurchaseSuccess(true);
      
      // Redirect to purchases page after a short delay
      setTimeout(() => {
        router.push('/account/purchases');
      }, 3000);
    } catch (err: any) {
      console.error('Error purchasing software:', err);
      setPurchaseError(err.message || 'Failed to purchase. Please try again later.');
    } finally {
      setPurchasing(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Mock reviews for the software
  const mockReviews = [
    {
      id: 1,
      user: {
        name: 'Robert Wilson',
        avatar: '/assets/img/profiles/avatar-8.jpg',
        country: 'Germany'
      },
      rating: 5,
      title: 'Best task management software I\'ve used',
      comment: 'Very intuitive interface and powerful features. The Kanban board is extremely customizable and the time tracking is accurate. Worth every penny!',
      date: '2 weeks ago'
    },
    {
      id: 2,
      user: {
        name: 'Emily Parker',
        avatar: '/assets/img/profiles/avatar-9.jpg',
        country: 'United Kingdom'
      },
      rating: 4,
      comment: 'Great software for managing my team\'s tasks. The reporting features provide valuable insights. Only giving 4 stars because the mobile app could be improved.',
      date: '1 month ago'
    },
    {
      id: 3,
      user: {
        name: 'Carlos Rodriguez',
        avatar: '/assets/img/profiles/avatar-10.jpg',
        country: 'Spain'
      },
      rating: 5,
      title: 'Perfect for distributed teams',
      comment: 'Our team is spread across 3 continents and this software has been the perfect solution for keeping everyone in sync. The customizable workflows are fantastic.',
      date: '2 months ago'
    }
  ];
  
  // Mock rating breakdown
  const ratingBreakdown = {
    five: 25,
    four: 10,
    three: 2,
    two: 1,
    one: 0
  };
  
  // Mock related products
  const relatedProducts = [
    {
      id: 301,
      slug: 'project-management-pro',
      title: 'Project Management Pro Suite',
      price: 129.99,
      image: '/assets/img/digital/digital-05.jpg'
    },
    {
      id: 302,
      slug: 'time-tracking-app',
      title: 'Time Tracking Application',
      price: 39.99,
      image: '/assets/img/digital/digital-06.jpg'
    },
    {
      id: 303,
      slug: 'team-collaboration-tool',
      title: 'Team Collaboration Platform',
      price: 89.99,
      image: '/assets/img/digital/digital-07.jpg'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !software) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Software</h2>
        <p className="text-gray-700 mb-6">{error || 'Software not found'}</p>
        <Link href="/software" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
          Back to Software
        </Link>
      </div>
    );
  }

  // Generate software preview images (use the same image for demo if needed)
  const softwareImages = software.preview_path 
    ? [software.preview_path, software.preview_path, software.preview_path, software.preview_path]
    : ['/assets/img/digital/digital-01.jpg', '/assets/img/digital/digital-01.jpg', '/assets/img/digital/digital-01.jpg', '/assets/img/digital/digital-01.jpg'];

  // Software features
  const softwareFeatures = {
    basic: [
      `Version: ${software.version}`,
      `License: ${software.license_type}`,
      `File size: ${formatFileSize(software.file_size)}`,
      'All future updates included',
      software.download_limit ? `Limited to ${software.download_limit} downloads` : 'Unlimited downloads'
    ]
  };

  // Extended description with system requirements
  const extendedDescription = (
    <>
      <p>{software.description}</p>
      
      <h3 className="text-lg font-bold mt-6 mb-3">System Requirements</h3>
      
      <div className="mb-2">
        <div className="flex items-center mb-1">
          <FaDesktop className="text-gray-600 mr-2" />
          <span className="font-medium">Windows:</span>
        </div>
        <p className="text-gray-700 ml-6">{software.system_requirements.windows}</p>
      </div>
      
      <div className="mb-2">
        <div className="flex items-center mb-1">
          <FaDesktop className="text-gray-600 mr-2" />
          <span className="font-medium">Mac:</span>
        </div>
        <p className="text-gray-700 ml-6">{software.system_requirements.mac}</p>
      </div>
      
      <div className="mb-2">
        <div className="flex items-center mb-1">
          <FaCode className="text-gray-600 mr-2" />
          <span className="font-medium">Linux:</span>
        </div>
        <p className="text-gray-700 ml-6">{software.system_requirements.linux}</p>
      </div>
      
      <h3 className="text-lg font-bold mt-6 mb-2">Release Information</h3>
      <p className="text-gray-700">Released on {new Date(software.release_date).toLocaleDateString()}</p>
    </>
  );

  // Pricing section component
  const PricingSection = (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="p-6">
        {/* Price and Download Info */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">₱{software.price.toFixed(0)}</span>
              {software.original_price && software.original_price > software.price && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ₱{software.original_price.toFixed(0)}
                </span>
              )}
            </div>
            {software.original_price && software.original_price > software.price && (
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {Math.round(((software.original_price - software.price) / software.original_price) * 100)}% OFF
              </span>
            )}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-700 text-sm mb-6">
          Lifetime license. Download immediately after purchase.
        </p>
        
        {/* Features List */}
        <div className="mb-6">
          {softwareFeatures.basic.map((feature, index) => (
            <div key={index} className="flex items-center mb-3">
              <FaFileAlt className="text-green-500 mr-2" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <button
          onClick={handlePurchase}
          disabled={purchasing}
          className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md transition duration-200 disabled:bg-orange-400 disabled:cursor-not-allowed"
        >
          {purchasing ? 'Processing...' : `Buy Now (₱${software.price.toFixed(0)})`}
        </button>
        
        {purchaseSuccess && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
            Purchase successful! Redirecting to your purchases...
          </div>
        )}
        
        {purchaseError && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
            {purchaseError}
          </div>
        )}
      </div>
    </div>
  );

  // Reviews section component
  const ReviewsSection = (
    <ProductReviews 
      reviews={mockReviews}
      averageRating={software.average_rating}
      totalReviews={software.reviews_count}
      ratingBreakdown={ratingBreakdown}
    />
  );

  return (
    <ProductDetailsLayout
      type="software"
      id={software.id}
      title={software.title}
      images={softwareImages}
      description={extendedDescription}
      price={software.price}
      discountedPrice={software.original_price || undefined}
      rating={software.average_rating}
      reviewsCount={software.reviews_count}
      deliveryTime="Instant Download"
      sellerName={software.user.name}
      sellerAvatar={software.user.profile.avatar}
      sellerLevel="Software Developer"
      sellerLocation={software.user.profile.location}
      sellerJoinDate={software.user.profile.member_since}
      sellerRating={4.9}
      categoryName={software.category.name}
      tags={software.tags}
      isFavorite={isFavorite}
      onToggleFavorite={toggleFavorite}
      features={softwareFeatures}
      relatedProducts={relatedProducts}
      reviewsSection={ReviewsSection}
      pricingSection={PricingSection}
    />
  );
} 