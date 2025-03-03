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
  // Fallback image in case the provided image doesn't load
  const fallbackImage = '/assets/img/placeholder.jpg';

  return (
    <div className="gigs-card">
      <div className="gigs-img">
        <Link href={`/service/${id}`}>
          <Image 
            src={images[0] || fallbackImage} 
            alt={title} 
            fill
            style={{ objectFit: 'cover' }}
            onError={(e: any) => {
              // If image fails to load, set a fallback
              if (e.target.src !== fallbackImage) {
                e.target.src = fallbackImage;
              }
            }}
          />
        </Link>
        <div className="gigs-badges">
          {featured && (
            <span className="featured">
              <svg className="mr-1" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Featured
            </span>
          )}
          {hot && (
            <span className="hot">
              <svg className="mr-1" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 23C10.4537 23 8.97269 22.5892 7.68599 21.8258C6.39929 21.0625 5.36 20.0033 4.66667 18.7167C3.97333 17.43 3.62667 16.0125 3.62667 14.4642C3.62667 13.1775 3.85467 11.9217 4.31067 10.6967C4.76667 9.47167 5.41 8.28 6.24067 7.12167C7.07133 5.96333 8.02 4.87833 9.08667 3.86667C10.1533 2.85333 11.2533 1.94 12.3867 1.12667L12 0.666667L11.6133 1.12667C12.7467 1.94 13.8467 2.85333 14.9133 3.86667C15.98 4.87833 16.9287 5.96333 17.7593 7.12167C18.59 8.28 19.2333 9.47167 19.6893 10.6967C20.1453 11.9217 20.3733 13.1775 20.3733 14.4642C20.3733 16.0125 20.0267 17.43 19.3333 18.7167C18.64 20.0033 17.6007 21.0625 16.314 21.8258C15.0273 22.5892 13.5463 23 12 23ZM12 3.56667C10.2267 5.13 8.82267 6.69333 7.788 8.25667C6.75333 9.82 6.236 11.4258 6.236 13.0742C6.236 14.3608 6.51733 15.5242 7.08 16.5642C7.64267 17.6042 8.41333 18.4275 9.392 19.0342C10.3707 19.6408 11.4333 19.9442 12.58 19.9442C13.7267 19.9442 14.7893 19.6408 15.768 19.0342C16.7467 18.4275 17.5173 17.6042 18.08 16.5642C18.6427 15.5242 18.924 14.3608 18.924 13.0742C18.924 11.4258 18.4067 9.82 17.372 8.25667C16.3373 6.69333 14.9333 5.13 13.16 3.56667C12.7733 3.18 12.38 2.81 11.98 2.45667C11.62 2.81 11.2467 3.18 10.86 3.56667H12V3.56667Z" />
              </svg>
              Hot
            </span>
          )}
        </div>
        <div className="gig-actions">
          <button className="action-btn share-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08261 9.84066C7.54305 9.32015 6.80891 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15C6.80891 15 7.54305 14.6798 8.08261 14.1593L15.0227 18.6294C15.0077 18.7508 15 18.8745 15 19C15 20.6569 16.3431 22 18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C17.1911 16 16.457 16.3202 15.9174 16.8407L8.97733 12.3706C8.99229 12.2492 9 12.1255 9 12C9 11.8745 8.99229 11.7508 8.97733 11.6294L15.9174 7.15934C16.457 7.67985 17.1911 8 18 8Z" fill="currentColor" />
            </svg>
          </button>
          <button 
            className={`action-btn fav-btn ${isFavorite ? 'active' : ''}`}
            onClick={() => onToggleFavorite(id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
        <div className="seller-avatar">
          <Image 
            src={`/assets/img/profiles/avatar-${Math.floor(Math.random() * 10) + 1}.jpg`} 
            alt={seller}
            width={44}
            height={44}
            className="rounded-full"
            onError={(e: any) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="avatar-fallback">
            {seller.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
      <div className="gigs-content">
        <div className="gigs-info">
          <span className="badge">
            <span className="badge-dot"></span>
            {badge}
          </span>
          <span className="location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
            </svg>
            {location}
          </span>
        </div>
        <div className="gigs-title">
          <h3>
            <Link href={`/service/${id}`}>
              {title}
            </Link>
          </h3>
        </div>
        <div className="star-rate">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFC107" />
            </svg>
            {rating.toFixed(1)} ({reviews} Reviews)
          </span>
        </div>
        <div className="gigs-card-footer">
          <div className="delivery">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
              <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM16.2 16.2L11 13V7H12.5V12.2L17 14.9L16.2 16.2Z" fill="currentColor" />
            </svg>
            Delivery in {delivery}
          </div>
          <h5>${price}</h5>
        </div>
      </div>
    </div>
  );
};

export default GigCard; 