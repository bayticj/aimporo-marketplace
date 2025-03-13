"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface NotificationProps {
  id: number;
  type: 'delivery' | 'revision' | 'deadline' | 'completion' | 'reminder';
  title: string;
  message: string;
  orderId: number;
  createdAt: string;
  read: boolean;
  onMarkAsRead: (id: number) => void;
}

const DeliveryNotification: React.FC<NotificationProps> = ({
  id,
  type,
  title,
  message,
  orderId,
  createdAt,
  read,
  onMarkAsRead,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeAgo, setTimeAgo] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    const calculateTimeAgo = () => {
      const now = new Date();
      const notificationDate = new Date(createdAt);
      const diffInSeconds = Math.floor((now.getTime() - notificationDate.getTime()) / 1000);
      
      if (diffInSeconds < 60) {
        return 'just now';
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
      } else {
        return notificationDate.toLocaleDateString();
      }
    };
    
    setTimeAgo(calculateTimeAgo());
    
    // Update time ago every minute
    const interval = setInterval(() => {
      setTimeAgo(calculateTimeAgo());
    }, 60000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [createdAt]);

  const handleDismiss = () => {
    setIsVisible(false);
    onMarkAsRead(id);
  };

  const getIcon = () => {
    const iconSize = isMobile ? "w-8 h-8" : "w-10 h-10";
    const svgSize = isMobile ? "h-5 w-5" : "h-6 w-6";
    
    switch (type) {
      case 'delivery':
        return (
          <div className={`flex-shrink-0 ${iconSize} rounded-full bg-green-100 flex items-center justify-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`${svgSize} text-green-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'revision':
        return (
          <div className={`flex-shrink-0 ${iconSize} rounded-full bg-yellow-100 flex items-center justify-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`${svgSize} text-yellow-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        );
      case 'deadline':
        return (
          <div className={`flex-shrink-0 ${iconSize} rounded-full bg-red-100 flex items-center justify-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`${svgSize} text-red-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'completion':
        return (
          <div className={`flex-shrink-0 ${iconSize} rounded-full bg-blue-100 flex items-center justify-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`${svgSize} text-blue-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'reminder':
        return (
          <div className={`flex-shrink-0 ${iconSize} rounded-full bg-purple-100 flex items-center justify-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`${svgSize} text-purple-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        );
      default:
        return (
          <div className={`flex-shrink-0 ${iconSize} rounded-full bg-gray-100 flex items-center justify-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`${svgSize} text-gray-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`mb-3 p-3 md:p-4 border rounded-lg shadow-sm transition-all ${read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
      <div className="flex items-start">
        {getIcon()}
        
        <div className="ml-2 md:ml-3 flex-1">
          <div className="flex justify-between items-start">
            <h3 className={`text-sm font-medium ${read ? 'text-gray-900' : 'text-blue-900'} line-clamp-1`}>{title}</h3>
            <div className="flex items-center ml-2 flex-shrink-0">
              <span className="text-xs text-gray-500 mr-2 whitespace-nowrap">{timeAgo}</span>
              <button 
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-500 p-1"
                aria-label="Dismiss notification"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{message}</p>
          
          <div className="mt-2 md:mt-3">
            <Link 
              href={`/dashboard/orders/${orderId}`}
              className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              View Order
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-1.5 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryNotification; 