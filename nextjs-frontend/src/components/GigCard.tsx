import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface GigCardProps {
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
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const GigCard: React.FC<GigCardProps> = ({
  id,
  title,
  price,
  rating,
  reviews,
  images,
  seller,
  location,
  badge,
  featured = false,
  hot = false,
  delivery,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="gigs-card relative">
      <div className="gigs-img relative">
        <Link href={`/service/${id}`}>
          <Image 
            src={images[0]} 
            alt={title} 
            width={400} 
            height={300} 
            className="w-full h-full object-cover rounded-t-lg"
          />
        </Link>
        <div className="gigs-badges absolute top-4 left-4 flex gap-1">
          {featured && (
            <span className="featured bg-yellow-400 text-black text-xs font-medium px-2 py-1 rounded flex items-center">
              <i className="fas fa-star mr-1"></i> Featured
            </span>
          )}
          {hot && (
            <span className="hot bg-red-500 text-white text-xs font-medium px-2 py-1 rounded flex items-center">
              <i className="fas fa-fire mr-1"></i> Hot
            </span>
          )}
        </div>
        <div className="gig-controls absolute top-4 right-4 flex flex-col gap-2">
          <Link href={`/service/${id}`} className="block">
            <span className="share-icon bg-white rounded-full w-8 h-8 flex items-center justify-center text-gray-700 shadow-md hover:bg-gray-100">
              <i className="fas fa-external-link-alt"></i>
            </span>
          </Link>
          <button 
            onClick={() => onToggleFavorite(id)} 
            className="fav-icon bg-white rounded-full w-8 h-8 flex items-center justify-center text-gray-700 shadow-md hover:bg-gray-100"
          >
            <i className={`fas fa-heart ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}></i>
          </button>
        </div>
        <div className="user-thumb absolute -bottom-4 right-4">
          <Link href="#">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg shadow-md overflow-hidden">
              <Image 
                src={`/assets/img/avatars/avatar-${id}.jpg`}
                alt={seller}
                width={48}
                height={48}
                className="rounded-full"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.parentNode.innerHTML = seller.charAt(0);
                }}
              />
            </div>
          </Link>
        </div>
      </div>
      <div className="gigs-content p-4 bg-white rounded-b-lg">
        <div className="gigs-info flex justify-between items-center mb-2">
          <Link href="#" className="badge bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded">
            {badge}
          </Link>
          <p className="flex items-center text-sm text-gray-600">
            <i className="fas fa-map-pin mr-1"></i> {location}
          </p>
        </div>
        <div className="gigs-title mb-2">
          <h3 className="text-lg font-semibold leading-tight">
            <Link href={`/service/${id}`} className="hover:text-orange-500">
              {title}
            </Link>
          </h3>
        </div>
        <div className="star-rate mb-3">
          <span className="flex items-center text-sm">
            <i className="fas fa-star text-yellow-400 mr-1"></i> {rating.toFixed(1)} ({reviews} Reviews)
          </span>
        </div>
        <div className="gigs-card-footer flex justify-between items-center">
          <div className="gigs-share flex items-center gap-2">
            <Link href="#" className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-share-alt"></i>
            </Link>
            <span className="delivery badge bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
              <i className="far fa-clock mr-1"></i> Delivery in {delivery}
            </span>
          </div>
          <h5 className="text-xl font-bold text-gray-800">${price.toFixed(0)}</h5>
        </div>
      </div>
    </div>
  );
};

export default GigCard; 