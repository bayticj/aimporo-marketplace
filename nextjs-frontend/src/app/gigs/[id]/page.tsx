'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { gigService } from '@/services/api';
import ProductDetailsLayout from '@/components/ProductDetailsLayout';
import ServicePricingCard from '@/components/ServicePricingCard';
import ProductReviews from '@/components/ProductReviews';

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
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [params]);

  const handleOrderSubmit = async (packageType: 'basic' | 'standard' | 'premium') => {
    setOrderLoading(true);
    setOrderError(null);

    try {
      // Create order data
      const orderData = {
        gig_id: gig?.id,
        package_type: packageType,
        details: orderDetails,
        quantity: orderQuantity
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

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Mock pricing tiers for the service
  const pricingTiers = {
    basic: {
      name: 'Basic',
      description: 'Basic logo design with 2 revisions and standard file formats.',
      price: gig ? gig.price : 49.99,
      originalPrice: gig ? gig.price * 1.2 : 59.99,
      delivery_time: gig ? `${gig.delivery_time} days` : '2 days',
      revisions: '2 Revisions',
      features: [
        'Logo in PNG format',
        'Basic design options',
        'Commercial usage',
      ]
    },
    standard: {
      name: 'Standard',
      description: 'Enhanced logo design with more revisions and file formats.',
      price: gig ? gig.price * 1.5 : 74.99,
      originalPrice: gig ? gig.price * 1.8 : 89.99,
      delivery_time: gig ? `${gig.delivery_time - 1 > 0 ? gig.delivery_time - 1 : 1} days` : '1 day',
      revisions: '5 Revisions',
      features: [
        'Logo in PNG, JPG, PDF formats',
        'Multiple design options',
        'Commercial usage',
        'Source files included',
        'High resolution files'
      ]
    },
    premium: {
      name: 'Premium',
      description: 'Premium logo design with unlimited revisions and all file formats.',
      price: gig ? gig.price * 2 : 99.99,
      originalPrice: gig ? gig.price * 2.5 : 129.99,
      delivery_time: gig ? `${gig.delivery_time - 1 > 0 ? gig.delivery_time - 1 : 1} days` : '1 day',
      revisions: 'Unlimited Revisions',
      features: [
        'Logo in all formats',
        'Unlimited design options',
        'Commercial usage',
        'Source files included',
        'High resolution files',
        'Social media kit',
        'Stationery designs',
        'Priority support'
      ]
    }
  };
  
  // Mock reviews for the service
  const mockReviews = [
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: '/assets/img/profiles/avatar-2.jpg',
        country: 'United States'
      },
      rating: 5,
      title: 'Excellent service',
      comment: 'The designer did an amazing job with our logo. Very professional and responsive. Would highly recommend!',
      date: '2 weeks ago'
    },
    {
      id: 2,
      user: {
        name: 'Mary Smith',
        avatar: '/assets/img/profiles/avatar-3.jpg',
        country: 'Canada'
      },
      rating: 4.5,
      comment: 'Great experience working with this seller. They were quick to respond and incorporated all my feedback. The final logo looks great!',
      date: '1 month ago'
    },
    {
      id: 3,
      user: {
        name: 'David Brown',
        avatar: '/assets/img/profiles/avatar-4.jpg',
        country: 'United Kingdom'
      },
      rating: 5,
      title: 'Exceeded expectations',
      comment: 'The designer went above and beyond to create a logo that perfectly represents our brand. The quality of work was exceptional.',
      date: '2 months ago'
    }
  ];
  
  // Mock rating breakdown
  const ratingBreakdown = {
    five: 85,
    four: 24,
    three: 10,
    two: 3,
    one: 2
  };
  
  // Mock related services
  const relatedServices = [
    {
      id: 101,
      slug: 'business-card-design',
      title: 'Professional Business Card Design',
      price: 29.99,
      image: '/assets/img/gigs/gigs-02.jpg'
    },
    {
      id: 102,
      slug: 'social-media-kit',
      title: 'Social Media Graphics Package',
      price: 49.99,
      image: '/assets/img/gigs/gigs-03.jpg'
    },
    {
      id: 103,
      slug: 'brand-identity',
      title: 'Complete Brand Identity Package',
      price: 149.99,
      image: '/assets/img/gigs/gigs-04.jpg'
    }
  ];

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

  // Service features for each package
  const serviceFeatures = {
    basic: pricingTiers.basic.features,
    standard: pricingTiers.standard?.features || [],
    premium: pricingTiers.premium?.features || []
  };

  // Pricing section component
  const PricingSection = (
    <ServicePricingCard 
      pricingTiers={pricingTiers}
      onSelectPackage={handleOrderSubmit}
    />
  );

  // Reviews section component
  const ReviewsSection = (
    <ProductReviews 
      reviews={mockReviews}
      averageRating={gig.average_rating}
      totalReviews={gig.reviews_count}
      ratingBreakdown={ratingBreakdown}
    />
  );

  return (
    <ProductDetailsLayout
      type="gig"
      id={gig.id}
      title={gig.title}
      images={gig.images}
      description={gig.description}
      price={gig.price}
      discountedPrice={gig.price * 0.8}
      rating={gig.average_rating}
      reviewsCount={gig.reviews_count}
      deliveryTime={`${gig.delivery_time} days`}
      sellerName={gig.user.name}
      sellerAvatar={gig.user.profile.avatar}
      sellerLevel="Level 2 Seller"
      sellerLocation={gig.user.profile.location}
      sellerJoinDate={gig.user.profile.member_since}
      sellerRating={4.7}
      categoryName={gig.category.name}
      tags={gig.tags}
      isFavorite={isFavorite}
      onToggleFavorite={toggleFavorite}
      features={serviceFeatures}
      relatedProducts={relatedServices}
      reviewsSection={ReviewsSection}
      pricingSection={PricingSection}
    />
  );
} 