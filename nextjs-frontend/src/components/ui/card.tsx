import React from 'react';
import { theme } from '@/style/theme';

export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;
  
  /**
   * Card title
   */
  title?: React.ReactNode;
  
  /**
   * Card subtitle
   */
  subtitle?: React.ReactNode;
  
  /**
   * Card image
   */
  image?: string;
  
  /**
   * Card image alt text
   */
  imageAlt?: string;
  
  /**
   * Card footer
   */
  footer?: React.ReactNode;
  
  /**
   * Card hover effect
   */
  hover?: boolean;
  
  /**
   * Card shadow
   */
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  
  /**
   * Card border radius
   */
  rounded?: 'none' | 'sm' | 'md' | 'lg';
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * Card component for displaying content in a contained format
 */
export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  image,
  imageAlt = '',
  footer,
  hover = false,
  shadow = 'md',
  rounded = 'md',
  className = '',
  onClick,
}) => {
  // Base classes
  const baseClasses = 'bg-white border border-gray-200 overflow-hidden';
  
  // Shadow classes
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };
  
  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
  };
  
  // Hover classes
  const hoverClasses = hover ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg' : '';
  
  // Clickable classes
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  // Combined classes
  const combinedClasses = `${baseClasses} ${shadowClasses[shadow]} ${roundedClasses[rounded]} ${hoverClasses} ${clickableClasses} ${className}`;
  
  return (
    <div className={combinedClasses} onClick={onClick}>
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={imageAlt} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        {title && (
          <div className="mb-2">
            {typeof title === 'string' ? (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            ) : (
              title
            )}
            
            {subtitle && (
              <div className="mt-1 text-sm text-gray-500">
                {subtitle}
              </div>
            )}
          </div>
        )}
        
        <div className="text-gray-700">
          {children}
        </div>
      </div>
      
      {footer && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 