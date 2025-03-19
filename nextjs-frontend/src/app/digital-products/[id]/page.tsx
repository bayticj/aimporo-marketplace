'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getDigitalProduct, purchaseDigitalProduct, getPreview } from '@/services/digitalProductService';
import ProductDetailsLayout from '@/components/ProductDetailsLayout';
import ProductReviews from '@/components/ProductReviews';
import { FaDownload, FaFile } from 'react-icons/fa';

interface DigitalProduct {
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
}

export default function DigitalProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [product, setProduct] = useState<DigitalProduct | null>(null);
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
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const id = params?.id;
        if (!id) {
          throw new Error('Product ID is required');
        }
        
        const response = await getDigitalProduct(Number(id));
        setProduct(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch digital product details');
        // For demo purposes, use sample data if API fails
        setProduct({
          id: 1,
          title: 'Premium UI Kit for Web Designers',
          description: 'A comprehensive UI kit with over 500 components for modern web design. Includes responsive layouts, form elements, navigation components, and more. All components are fully customizable and available in both light and dark modes.',
          price: 59.99,
          original_price: 79.99,
          preview_path: '/assets/img/gigs/gigs-01.jpg',
          file_path: '/files/ui-kit.zip',
          file_type: 'application/zip',
          file_size: '256000000', // 256MB
          download_limit: null,
          user_id: 3,
          category_id: 2,
          is_featured: true,
          tags: ['ui-kit', 'design', 'web-design', 'figma'],
          average_rating: 4.7,
          reviews_count: 52,
          created_at: '2023-05-15T00:00:00.000Z',
          updated_at: '2023-05-15T00:00:00.000Z',
          user: {
            id: 3,
            name: 'DesignMaster',
            email: 'design@example.com',
            profile: {
              avatar: '/assets/img/profiles/avatar-2.jpg',
              bio: 'UI/UX designer with 8 years of experience creating beautiful digital experiences.',
              location: 'San Francisco',
              member_since: '2019-03-15',
            }
          },
          category: {
            id: 2,
            name: 'UI Design'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  const handlePurchase = async () => {
    if (!user) {
      router.push(`/login?redirect=/digital-products/${params?.id}`);
      return;
    }
    
    setPurchasing(true);
    setPurchaseError(null);
    
    try {
      const response = await purchaseDigitalProduct(Number(params?.id));
      setPurchaseSuccess(true);
      
      // Redirect to purchases page after a short delay
      setTimeout(() => {
        router.push('/account/purchases');
      }, 3000);
    } catch (err: any) {
      console.error('Error purchasing digital product:', err);
      setPurchaseError(err.message || 'Failed to purchase. Please try again later.');
    } finally {
      setPurchasing(false);
    }
  };

  const handlePreview = async () => {
    try {
      const blob = await getPreview(Number(params?.id));
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error('Error getting preview:', err);
      alert('Failed to load preview. Please try again later.');
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Mock reviews for the product
  const mockReviews = [
    {
      id: 1,
      user: {
        name: 'Alex Johnson',
        avatar: '/assets/img/profiles/avatar-5.jpg',
        country: 'United States'
      },
      rating: 5,
      title: 'Excellent UI Kit',
      comment: 'This UI kit saved me so much time on my project. The components are well-designed and easy to customize. Highly recommended!',
      date: '1 week ago'
    },
    {
      id: 2,
      user: {
        name: 'Sarah Williams',
        avatar: '/assets/img/profiles/avatar-6.jpg',
        country: 'Australia'
      },
      rating: 4,
      comment: 'Great value for money. The components are high quality and the documentation is clear. Would have given 5 stars if there were more dark mode options.',
      date: '2 weeks ago'
    },
    {
      id: 3,
      user: {
        name: 'Michael Chen',
        avatar: '/assets/img/profiles/avatar-7.jpg',
        country: 'Singapore'
      },
      rating: 5,
      title: 'Perfect for my startup project',
      comment: 'I used this UI kit for my startup's MVP and it helped me launch much faster. The design is clean and modern, and the code is well-structured.',
      date: '1 month ago'
    }
  ];
  
  // Mock rating breakdown
  const ratingBreakdown = {
    five: 35,
    four: 12,
    three: 3,
    two: 1,
    one: 1
  };
  
  // Mock related products
  const relatedProducts = [
    {
      id: 201,
      slug: 'admin-dashboard-template',
      title: 'Admin Dashboard Template',
      price: 39.99,
      image: '/assets/img/digital/digital-02.jpg'
    },
    {
      id: 202,
      slug: 'ecommerce-theme',
      title: 'E-commerce Website Theme',
      price: 49.99,
      image: '/assets/img/digital/digital-03.jpg'
    },
    {
      id: 203,
      slug: 'icon-pack',
      title: 'Premium Icon Pack - 2000+ Icons',
      price: 19.99,
      image: '/assets/img/digital/digital-04.jpg'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h2>
        <p className="text-gray-700 mb-6">{error || 'Product not found'}</p>
        <Link href="/digital-products" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
          Back to Digital Products
        </Link>
      </div>
    );
  }

  // Generate product preview images (use the same image for demo if needed)
  const productImages = product.preview_path 
    ? [product.preview_path, product.preview_path, product.preview_path, product.preview_path]
    : ['/assets/img/digital/digital-01.jpg', '/assets/img/digital/digital-01.jpg', '/assets/img/digital/digital-01.jpg', '/assets/img/digital/digital-01.jpg'];

  // Product features
  const productFeatures = {
    basic: [
      `File type: ${product.file_type.split('/')[1]?.toUpperCase() || 'FILE'}`,
      `File size: ${formatFileSize(product.file_size)}`,
      'Lifetime access',
      'Commercial usage license',
      product.download_limit ? `Limited to ${product.download_limit} downloads` : 'Unlimited downloads'
    ]
  };

  // Pricing section component
  const PricingSection = (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="p-6">
        {/* Price and Download Info */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">₱{product.price.toFixed(0)}</span>
              {product.original_price && product.original_price > product.price && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ₱{product.original_price.toFixed(0)}
                </span>
              )}
            </div>
            {product.original_price && product.original_price > product.price && (
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
              </span>
            )}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-700 text-sm mb-6">
          Instant download after purchase. All files included.
        </p>
        
        {/* Features List */}
        <div className="mb-6">
          {productFeatures.basic.map((feature, index) => (
            <div key={index} className="flex items-center mb-3">
              <FaDownload className="text-green-500 mr-2" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Preview Button */}
        {product.preview_path && (
          <button
            onClick={handlePreview}
            className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition duration-200 mb-3"
          >
            Preview
          </button>
        )}
        
        {/* CTA Button */}
        <button
          onClick={handlePurchase}
          disabled={purchasing}
          className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md transition duration-200 disabled:bg-orange-400 disabled:cursor-not-allowed"
        >
          {purchasing ? 'Processing...' : `Buy Now (₱${product.price.toFixed(0)})`}
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
      averageRating={product.average_rating}
      totalReviews={product.reviews_count}
      ratingBreakdown={ratingBreakdown}
    />
  );

  return (
    <ProductDetailsLayout
      type="digital"
      id={product.id}
      title={product.title}
      images={productImages}
      description={product.description}
      price={product.price}
      discountedPrice={product.original_price || undefined}
      rating={product.average_rating}
      reviewsCount={product.reviews_count}
      deliveryTime="Instant Download"
      sellerName={product.user.name}
      sellerAvatar={product.user.profile.avatar}
      sellerLevel="Pro Seller"
      sellerLocation={product.user.profile.location}
      sellerJoinDate={product.user.profile.member_since}
      sellerRating={4.8}
      categoryName={product.category.name}
      tags={product.tags}
      isFavorite={isFavorite}
      onToggleFavorite={toggleFavorite}
      features={productFeatures}
      relatedProducts={relatedProducts}
      reviewsSection={ReviewsSection}
      pricingSection={PricingSection}
    />
  );
} 