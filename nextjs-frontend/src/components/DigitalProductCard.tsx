import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DigitalProduct, DigitalProductCategory } from '@/services/digitalProductService';
import { formatCurrency } from '@/utils/currency';
import '@/style/pricing.css';
import ShortDescriptionDisplay from './ShortDescriptionDisplay';

interface DigitalProductCardProps {
  product: DigitalProduct;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const DigitalProductCard: React.FC<DigitalProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
}) => {
  const [imageError, setImageError] = React.useState(false);
  
  // Debug logs for description
  console.log(`DigitalProductCard ${product.id} - short_description:`, product.short_description);
  console.log(`DigitalProductCard ${product.id} - description:`, product.description);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const imageSrc = imageError || !product.preview_path 
    ? '/assets/img/placeholder.jpg' 
    : product.preview_path;
  
  // Function to render the styled price
  const renderStyledPrice = (price: number, originalPrice?: number | null) => {
    // Calculate discount percentage if original price exists
    const discountPercentage = originalPrice && originalPrice > price 
      ? Math.round(((originalPrice - price) / originalPrice) * 100) 
      : null;
    
    return (
      <div className="price-container">
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span className="price-amount">₱{price.toFixed(0)}</span>
          <span className="price-plan">/one-time</span>
        </div>
        {originalPrice && originalPrice > price && (
          <span className="price-original" style={{ marginLeft: '8px', textDecoration: 'line-through', display: 'inline-block' }}>
            ₱{originalPrice.toFixed(0)}
          </span>
        )}
        {discountPercentage && discountPercentage >= 10 && (
          <span className="discount-badge" style={{ display: 'block' }}>-{discountPercentage}%</span>
        )}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        {/* Product Image */}
        <div className="relative h-48 w-full">
          <Image
            src={imageSrc}
            alt={product.title}
            fill
            style={{ objectFit: 'cover' }}
            onError={handleImageError}
          />
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? '#f97316' : 'none'}
            stroke={isFavorite ? '#f97316' : 'currentColor'}
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-2">
          {product.categories?.map((category) => (
            <Link
              key={category.id}
              href={`/digital-products?category=${category.slug}`}
              className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full hover:bg-orange-200"
            >
              {category.name}
            </Link>
          ))}
        </div>
        
        {/* Title */}
        <Link href={`/digital-products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-orange-600 mb-0 line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        {/* Professional short description display with proper newline handling */}
        <div className="text-sm text-gray-600 mb-3">
          {product.short_description ? (
            typeof product.short_description === 'string' && product.short_description.includes('\n') ? (
              <div className="py-0">
                {product.short_description.split('\n').map((line, index) => (
                  <p key={index} className="line-clamp-1 mb-0">{line}</p>
                ))}
              </div>
            ) : (
              <p className="line-clamp-3 py-0">{product.short_description}</p>
            )
          ) : product.description ? (
            <p className="line-clamp-3 py-0">{product.description.substring(0, 100)}</p>
          ) : (
            <p className="py-0">No description available</p>
          )}
        </div>
        
        {/* Price and Buy Button */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-orange-600">
            {renderStyledPrice(product.price, product.original_price)}
          </span>
          <Link
            href={`/digital-products/${product.id}`}
            className="px-3 py-1.5 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DigitalProductCard; 