import React from 'react';
import { theme } from '@/style/theme';

export type BadgeVariant = 'primary' | 'accent' | 'featured' | 'hot' | 'success' | 'error' | 'warning' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  /**
   * Badge content
   */
  children: React.ReactNode;
  
  /**
   * Badge variant
   */
  variant?: BadgeVariant;
  
  /**
   * Badge size
   */
  size?: BadgeSize;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Badge component for displaying status, categories, or labels
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-500 text-white',
    accent: 'bg-accent-500 text-accent-900',
    featured: 'bg-primary-500 text-white',
    hot: 'bg-accent-500 text-accent-900',
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    warning: 'bg-warning text-accent-900',
    info: 'bg-info text-white',
  };
  
  // Combined classes
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  
  return (
    <span className={combinedClasses}>
      {children}
    </span>
  );
};

export default Badge; 