import React from 'react';

export interface PageBannerProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ 
  title, 
  subtitle, 
  bgImage = '/assets/img/banners/default-banner.jpg' 
}) => {
  return (
    <div 
      className="relative py-16 px-4 rounded-lg overflow-hidden bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage})`,
        backgroundColor: '#f97316' // Fallback orange color if image fails to load
      }}
    >
      <div className="container mx-auto text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl max-w-3xl mx-auto">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageBanner; 