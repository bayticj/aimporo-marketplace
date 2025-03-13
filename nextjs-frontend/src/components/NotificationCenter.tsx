"use client";

import React, { useState, useEffect, useRef } from 'react';
import DeliveryNotification from './DeliveryNotification';
import notificationService, { Notification } from '@/services/notificationService';

interface NotificationCenterProps {
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we're on mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        // In a real app, this would fetch from the API
        // const data = await notificationService.getNotifications();
        const data = notificationService.getMockNotifications();
        setNotifications(data);
        setError(null);
      } catch (err: any) {
        setError('Failed to load notifications');
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [onClose]);

  const handleMarkAsRead = async (id: number) => {
    // In a real app, this would call the API
    // await notificationService.markNotificationAsRead(id);
    
    // Update local state
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = async () => {
    // In a real app, this would call the API
    // await notificationService.markAllNotificationsAsRead();
    
    // Update local state
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  return (
    <>
      <div 
        ref={notificationRef}
        className={`
          fixed md:absolute 
          ${isMobile ? 'inset-x-0 top-16 mx-auto notification-dropdown-mobile' : 'top-16 right-4'} 
          ${isMobile ? 'w-[95%] max-w-sm' : 'w-96'} 
          max-h-[90vh] md:max-h-[80vh] 
          bg-white border border-gray-200 rounded-lg shadow-lg 
          overflow-hidden z-[1001] 
          flex flex-col
        `}
        style={{
          maxWidth: isMobile ? '95%' : '384px',
          animation: isMobile ? 'slide-down 0.2s ease-out forwards' : 'dropdownFadeIn 0.2s ease-out'
        }}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <div className="flex items-center">
            {getUnreadCount() > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 mr-3"
              >
                Mark all as read
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close notification center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1 p-4">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">
              {error}
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p>No notifications yet</p>
            </div>
          ) : (
            <>
              {notifications.map(notification => (
                <DeliveryNotification
                  key={notification.id}
                  id={notification.id}
                  type={notification.type}
                  title={notification.title}
                  message={notification.message}
                  orderId={notification.orderId}
                  createdAt={notification.createdAt}
                  read={notification.read}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationCenter; 