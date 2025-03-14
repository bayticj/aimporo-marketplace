import React from 'react';
import Link from 'next/link';

interface CategoryCardProps {
  title: string;
  count: number;
  description: string;
  icon: React.ReactNode;
  category: string;
  delay: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  count, 
  description, 
  icon, 
  category,
  delay
}) => {
  return (
    <Link href={`/gigs?category=${category}`} className="category-card-link">
      <div className="category-card" data-aos="fade-up" data-aos-delay={delay}>
        <div className="particles">
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
        </div>
        <div className="category-front">
          <div className="category-icon-wrapper">
            {icon}
          </div>
          <h3 className="category-title">{title}</h3>
          <p className="category-count">{count} Services</p>
        </div>
        <div className="category-back">
          <div className="category-back-content">
            <h3>{title}</h3>
            <p>{description}</p>
            <span className="view-services">View Services</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard; 