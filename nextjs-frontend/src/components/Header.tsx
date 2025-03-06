"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import NotificationCenter from './NotificationCenter';
import { mockMessageService } from '@/services/mockMessages';
import axios from '@/services/api';

// Define a local mock function for notifications
const getMockUnreadCount = (): number => {
  // This would normally come from the API
  return 3; // Mock unread count
};

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        // Use the local mock function instead of the service
        const count = getMockUnreadCount();
        setUnreadCount(count);
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    };

    const fetchUnreadMessages = async () => {
      try {
        // Use mock service instead of real API
        const response = await mockMessageService.getUnreadCount();
        setUnreadMessages(response.unread_count);
      } catch (error) {
        console.error('Error fetching unread messages count:', error);
      }
    };

    if (user) {
      fetchUnreadCount();
      fetchUnreadMessages();
    }
  }, [user]);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-orange-600">
              Marketplace
            </Link>
            <nav className="hidden md:flex ml-10">
              <Link href="/" className="mr-6 text-gray-700 hover:text-orange-600">
                Home
              </Link>
              <Link href="/gigs" className="mr-6 text-gray-700 hover:text-orange-600">
                Gigs
              </Link>
              <Link href="/about" className="mr-6 text-gray-700 hover:text-orange-600">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-orange-600">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                {/* Messages Icon */}
                <div className="relative mr-4">
                  <Link
                    href="/dashboard/messages"
                    className="p-2 text-gray-600 hover:text-orange-600 focus:outline-none"
                    aria-label="Messages"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    {unreadMessages > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {unreadMessages > 9 ? '9+' : unreadMessages}
                      </span>
                    )}
                  </Link>
                </div>
                
                {/* Notification Bell */}
                <div className="relative mr-4">
                  <button
                    onClick={toggleNotifications}
                    className="p-2 text-gray-600 hover:text-orange-600 focus:outline-none"
                    aria-label="Notifications"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <NotificationCenter onClose={() => setShowNotifications(false)} />
                  )}
                </div>
                
                <Link href="/dashboard" className="mr-4 text-gray-700 hover:text-orange-600">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-orange-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="mr-4 text-gray-700 hover:text-orange-600">
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
            <button
              className="ml-4 md:hidden text-gray-700 hover:text-orange-600 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {showMobileMenu && (
          <nav className="mt-4 md:hidden">
            <Link href="/" className="block py-2 text-gray-700 hover:text-orange-600">
              Home
            </Link>
            <Link href="/gigs" className="block py-2 text-gray-700 hover:text-orange-600">
              Gigs
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-orange-600">
              About
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-orange-600">
              Contact
            </Link>
            {user && (
              <Link href="/dashboard/messages" className="block py-2 text-gray-700 hover:text-orange-600">
                Messages {unreadMessages > 0 && <span className="ml-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">{unreadMessages}</span>}
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 