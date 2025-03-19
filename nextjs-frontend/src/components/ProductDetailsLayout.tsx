import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaShareAlt, FaStar, FaStarHalfAlt, FaRegStar, FaMapMarkerAlt, FaUserAlt, FaCheck, FaTimes } from 'react-icons/fa';

interface ProductDetailsLayoutProps {
  type: 'gig' | 'digital' | 'software';
  id: number;
  title: string;
  images: string[];
  description: ReactNode;
  price: number;
  discountedPrice?: number;
  rating: number;
  reviewsCount: number;
  deliveryTime: string;
  sellerName: string;
  sellerAvatar: string;
  sellerLevel: string;
  sellerLocation: string;
  sellerJoinDate: string;
  sellerRating: number;
  categoryName: string;
  tags: string[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
  features?: {basic: string[], standard?: string[], premium?: string[]};
  relatedProducts: any[];
  reviewsSection: ReactNode;
  pricingSection: ReactNode;
}

const ProductDetailsLayout: React.FC<ProductDetailsLayoutProps> = ({
  type,
  id,
  title,
  images,
  description,
  price,
  discountedPrice,
  rating,
  reviewsCount,
  deliveryTime,
  sellerName,
  sellerAvatar,
  sellerLevel,
  sellerLocation,
  sellerJoinDate,
  sellerRating,
  categoryName,
  tags,
  isFavorite,
  onToggleFavorite,
  features,
  relatedProducts,
  reviewsSection,
  pricingSection
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  
  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };
  
  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-gray-700 hover:text-orange-500">Home</Link>
            <span className="mx-2 text-gray-500">›</span>
            <Link href={`/${type === 'gig' ? 'gigs' : type === 'digital' ? 'digital-products' : 'software'}`} 
                  className="text-gray-700 hover:text-orange-500">
              {type === 'gig' ? 'Services' : type === 'digital' ? 'Digital Products' : 'Software'}
            </Link>
            <span className="mx-2 text-gray-500">›</span>
            <span className="text-gray-900">{title}</span>
          </div>
        </div>
      </div>
      
      {/* Product Details Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Product Header */}
          <div className="p-6 border-b">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
            <div className="flex flex-wrap items-center mt-3 gap-4">
              {/* Rating */}
              <div className="flex items-center">
                <div className="flex mr-1">
                  {renderStars(rating)}
                </div>
                <span className="text-sm text-gray-700">{rating.toFixed(1)} ({reviewsCount} reviews)</span>
              </div>
              
              {/* Category */}
              <div className="flex items-center">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {categoryName}
                </span>
              </div>
              
              {/* Share & Favorite Buttons */}
              <div className="flex items-center ml-auto">
                <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 mr-2">
                  <FaShareAlt className="text-gray-600" />
                </button>
                <button 
                  onClick={onToggleFavorite} 
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-600" />}
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 p-6">
              {/* Product Images */}
              <div className="mb-8">
                <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-4">
                  <Image 
                    src={images[activeImageIndex]} 
                    alt={title} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div 
                      key={index} 
                      className={`relative h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${index === activeImageIndex ? 'border-orange-500' : 'border-transparent'}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <Image 
                        src={image} 
                        alt={`${title} ${index + 1}`} 
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tabs Navigation */}
              <div className="border-b mb-6">
                <div className="flex space-x-8">
                  <button
                    className={`pb-4 font-medium ${activeTab === 'overview' 
                      ? 'text-orange-500 border-b-2 border-orange-500' 
                      : 'text-gray-700 hover:text-gray-900'}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`pb-4 font-medium ${activeTab === 'reviews' 
                      ? 'text-orange-500 border-b-2 border-orange-500' 
                      : 'text-gray-700 hover:text-gray-900'}`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews ({reviewsCount})
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              <div>
                {activeTab === 'overview' ? (
                  <>
                    {/* Description */}
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-4">Description</h2>
                      <div className="prose max-w-none text-gray-700">
                        {description}
                      </div>
                    </div>
                    
                    {/* Features */}
                    {features && features.basic && features.basic.length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">Features</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {features.basic.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Tags */}
                    {tags && tags.length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">Tags</h2>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag, index) => (
                            <Link 
                              href={`/search?tag=${tag}`} 
                              key={index}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  // Reviews Tab
                  <div>
                    {reviewsSection}
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column - Pricing and Seller Info */}
            <div className="lg:col-span-1 p-6 bg-gray-50">
              {/* Pricing Cards */}
              <div className="mb-8">
                {pricingSection}
              </div>
              
              {/* Seller Information */}
              <div className="bg-white rounded-lg border p-6 mb-8">
                <h2 className="text-lg font-bold mb-4">About the Seller</h2>
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={sellerAvatar} 
                      alt={sellerName} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{sellerName}</h3>
                    <p className="text-sm text-gray-700">{sellerLevel}</p>
                    <div className="flex mt-1">
                      {renderStars(sellerRating)}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex">
                    <FaMapMarkerAlt className="text-gray-500 mr-2 mt-1" />
                    <span className="text-gray-700">{sellerLocation}</span>
                  </div>
                  <div className="flex">
                    <FaUserAlt className="text-gray-500 mr-2 mt-1" />
                    <span className="text-gray-700">Member since {sellerJoinDate}</span>
                  </div>
                </div>
                
                <button className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50">
                  Contact Seller
                </button>
              </div>
              
              {/* Related Products */}
              {relatedProducts && relatedProducts.length > 0 && (
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="text-lg font-bold mb-4">You May Also Like</h2>
                  <div className="space-y-4">
                    {relatedProducts.slice(0, 3).map((product, index) => (
                      <Link href={`/${type}/${product.slug}`} key={index} className="block">
                        <div className="flex items-center hover:bg-gray-50 p-2 rounded">
                          <div className="relative w-16 h-16 rounded overflow-hidden mr-3">
                            <Image 
                              src={product.image} 
                              alt={product.title} 
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 truncate">{product.title}</h3>
                            <p className="text-sm text-orange-600 font-medium">₱{product.price}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLayout; 