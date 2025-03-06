import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PricingTier {
  title: string;
  description: string;
  price: number;
  delivery_time: string;
  revisions: string;
  features: string[];
}

interface Gig {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  seller: string;
  location: string;
  badge: string;
  featured?: boolean;
  hot?: boolean;
  delivery: string;
  status?: 'draft' | 'published';
  pricing_tiers?: {
    basic: PricingTier;
    standard: PricingTier;
    premium: PricingTier;
  };
}

interface GigListItemProps {
  gig: Gig;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (index: number) => void;
}

const GigListItem: React.FC<GigListItemProps> = ({ gig, index, isFavorite, onToggleFavorite }) => {
  // Fallback image in case the provided image doesn't load
  const fallbackImage = '/assets/img/placeholder.jpg';
  
  // Determine if this gig has pricing tiers
  const hasPricingTiers = gig.pricing_tiers && 
    gig.pricing_tiers.basic && 
    gig.pricing_tiers.basic.price;
  
  // Get the starting price (either single price or lowest tier)
  const startingPrice = hasPricingTiers && gig.pricing_tiers
    ? Math.min(
        Number(gig.pricing_tiers.basic?.price) || Infinity,
        Number(gig.pricing_tiers.standard?.price) || Infinity,
        Number(gig.pricing_tiers.premium?.price) || Infinity
      )
    : gig.price;

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden mb-4 hover:shadow-lg transition-shadow ${gig.status === 'draft' ? 'opacity-70' : ''}`}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 relative h-48 md:h-auto">
          {gig.status === 'draft' && (
            <div className="absolute top-2 right-2 z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Draft
            </div>
          )}
          <Link href={`/gigs/${gig.id}`}>
            <div className="w-full h-full relative">
              <Image 
                src={gig.images[0] || fallbackImage} 
                alt={gig.title}
                fill
                style={{ objectFit: 'cover' }}
                onError={(e: any) => {
                  // If image fails to load, set a fallback
                  if (e.target.src !== fallbackImage) {
                    e.target.src = fallbackImage;
                  }
                }}
              />
            </div>
          </Link>
          
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {gig.featured && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                Featured
              </span>
            )}
            {gig.hot && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 23C10.4537 23 8.97269 22.5892 7.68599 21.8258C6.39929 21.0625 5.36 20.0033 4.66667 18.7167C3.97333 17.43 3.62667 16.0125 3.62667 14.4642C3.62667 13.1775 3.85467 11.9217 4.31067 10.6967C4.76667 9.47167 5.41 8.28 6.24067 7.12167C7.07133 5.96333 8.02 4.87833 9.08667 3.86667C10.1533 2.85333 11.2533 1.94 12.3867 1.12667L12 0.666667L11.6133 1.12667C12.7467 1.94 13.8467 2.85333 14.9133 3.86667C15.98 4.87833 16.9287 5.96333 17.7593 7.12167C18.59 8.28 19.2333 9.47167 19.6893 10.6967C20.1453 11.9217 20.3733 13.1775 20.3733 14.4642C20.3733 16.0125 20.0267 17.43 19.3333 18.7167C18.64 20.0033 17.6007 21.0625 16.314 21.8258C15.0273 22.5892 13.5463 23 12 23Z" />
                </svg>
                Hot
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4 md:p-6 md:w-3/4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mb-2">
                {gig.badge}
              </span>
              <h3 className="text-xl font-semibold mb-2">
                <Link href={`/gigs/${gig.id}`} className="hover:text-orange-600 transition-colors">
                  {gig.title}
                </Link>
              </h3>
            </div>
            <div className="flex items-center">
              <button 
                className={`p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
                onClick={() => onToggleFavorite(index)}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-200">
              <Image 
                src={`/assets/img/avatar-${(index % 5) + 1}.jpg`} 
                alt={gig.seller}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium">{gig.seller}</span>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {gig.title.split(' ').slice(0, 15).join(' ')}...
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {hasPricingTiers && gig.pricing_tiers?.basic.features.slice(0, 3).map((feature, i) => (
              <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFC107" className="mr-1">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <span className="text-sm">{gig.rating.toFixed(1)} ({gig.reviews} reviews)</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                  <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM16.2 16.2L11 13V7H12.5V12.2L17 14.9L16.2 16.2Z" />
                </svg>
                Delivery in {gig.delivery}
              </div>
            </div>
            <div className="text-xl font-bold text-orange-600">
              ${startingPrice.toFixed(2)}
              {hasPricingTiers && <span className="text-xs text-gray-500 ml-1">Starting at</span>}
            </div>
          </div>
          
          {/* Availability indicator */}
          <div className="mt-3 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            <span className="text-xs text-gray-600">Available Now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigListItem; 