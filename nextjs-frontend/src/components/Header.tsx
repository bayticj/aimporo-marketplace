"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import NotificationCenter from './NotificationCenter';
import { mockMessageService } from '@/services/mockMessages';
import axios from '@/services/api';
import { useRouter } from 'next/navigation';
import searchService, { SearchTrend } from '@/services/searchService';

// Define a local mock function for notifications
const getMockUnreadCount = (): number => {
  // This would normally come from the API
  return 3; // Mock unread count
};

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<SearchTrend[]>([]);
  const [selectedTrend, setSelectedTrend] = useState<number | null>(null);
  const profileDropdownRef = useRef<HTMLLIElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  // Categories for the second navigation line
  const categories = [
    { id: 1, name: 'Marketplace', path: '/marketplace' },
    { id: 2, name: 'Gigs', path: '/gigs' },
    { id: 3, name: 'Digital Products', path: '/digital-products' },
    { id: 4, name: 'Software', path: '/software' },
    { id: 5, name: 'About', path: '/about' },
    { id: 6, name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    // Function to check if viewport is mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownRef]);

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

  // Fetch trending searches when component mounts
  useEffect(() => {
    const fetchTrendingSearches = async () => {
      try {
        // Use the new production-ready function
        const trends = await searchService.fetchTrendingSearches(5);
        setTrendingSearches(trends);
      } catch (error) {
        console.error('Error fetching trending searches:', error);
        // If there's an error, use the fallback function
        const fallbackTrends = searchService.getRealtimeTrendingSearches(5);
        setTrendingSearches(fallbackTrends);
      }
    };

    fetchTrendingSearches();

    // Set up a refresh interval (every 15 minutes)
    const refreshInterval = setInterval(() => {
      fetchTrendingSearches();
    }, 15 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  // Handle search suggestions when query changes
  useEffect(() => {
    const fetchSearchSuggestions = async () => {
      if (searchQuery.trim().length >= 2) {
        try {
          const response = await searchService.getSuggestions(searchQuery);
          if (response && response.suggestions) {
            const suggestions = response.suggestions.map((suggestion: any) => suggestion.text);
            setSearchSuggestions(suggestions);
          }
        } catch (error) {
          console.error('Error fetching search suggestions:', error);
        }
      } else {
        setSearchSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSearchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchDropdownRef.current && 
        !searchDropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const closeProfileDropdown = () => {
    setShowProfileDropdown(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setIsSearchFocused(false);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleTrendingSearchClick = (trend: SearchTrend) => {
    setSelectedTrend(trend.id);
    setSearchQuery(trend.name);
    
    // Short delay to show the selected state before navigating
    setTimeout(() => {
      setIsSearchFocused(false);
      router.push(`/search?q=${encodeURIComponent(trend.name)}`);
    }, 150);
  };

  return (
    <header className="header">
      {/* Main header with logo, search, and user controls */}
      <div className="header-nav">
        <div className="navbar-header">
          <Link href="/" className="navbar-brand logo">
            <Image 
              src="/assets/img/aimporo-logo.png" 
              alt="Aimporo Marketplace" 
              width={150} 
              height={40}
              style={{ 
                maxHeight: '40px', 
                width: 'auto', 
                objectFit: 'contain'
              }}
              priority
            />
          </Link>
        </div>
        
        {/* Search bar in header */}
        <div className="header-search-wrapper">
          <form onSubmit={handleSearch}>
            <div className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
            />
            <button type="submit">
              Search
            </button>
          </form>
          
          {/* Search suggestions dropdown */}
          {isSearchFocused && (
            <div 
              ref={searchDropdownRef}
              className="search-suggestions-dropdown"
            >
              {searchQuery.trim().length >= 2 && searchSuggestions.length > 0 ? (
                <div className="search-suggestions">
                  <h4 className="suggestions-title">Suggestions</h4>
                  <ul>
                    {searchSuggestions.map((suggestion, index) => (
                      <li key={`suggestion-${index}`}>
                        <button 
                          type="button" 
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="suggestion-item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          {suggestion}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                /* Always show trending searches when focused, even if no query */
                trendingSearches.length > 0 && (
                  <div className="trending-searches">
                    <h4 className="trending-title">
                      Trending Searches
                    </h4>
                    <ul>
                      {trendingSearches.map((trend, index) => (
                        <li key={`trend-${trend.id}`}>
                          <button 
                            type="button" 
                            onClick={() => handleTrendingSearchClick(trend)}
                            className="trending-item"
                          >
                            {index === 0 ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            )}
                            {trend.name}
                            <span className="category">{trend.category}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          )}
        </div>
        
        <ul className="header-navbar-rht">
          {user ? (
            <>
              {/* Messages Icon */}
              <li className="relative">
                <Link
                  href="/dashboard/messages"
                  className="p-2 text-gray-600 hover:text-orange-600 focus:outline-none"
                  aria-label="Messages"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {unreadMessages > 9 ? '9+' : unreadMessages}
                    </span>
                  )}
                </Link>
              </li>
              
              {/* Notification Bell */}
              <li className="relative">
                <button
                  onClick={toggleNotifications}
                  className="p-2 text-gray-600 hover:text-orange-600 focus:outline-none"
                  aria-label="Notifications"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <NotificationCenter onClose={() => setShowNotifications(false)} />
                )}
              </li>
              
              {/* Profile Avatar with Dropdown */}
              <li className="relative" ref={profileDropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center focus:outline-none"
                  aria-expanded={showProfileDropdown}
                  aria-label="Toggle profile dropdown"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border-2 border-orange-500">
                    {user ? (
                      <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-600 font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-600 font-bold">
                        U
                      </div>
                    )}
                  </div>
                </button>
                
                {showProfileDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-[1000] border border-gray-200 dropdown-menu" style={{ 
                    maxHeight: '90vh',
                    overflow: 'hidden auto'
                  }}>
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link href="/dashboard" onClick={closeProfileDropdown} className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </span>
                      Dashboard
                    </Link>
                    <Link href="/dashboard/profile" onClick={closeProfileDropdown} className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Profile
                    </Link>
                    <Link href="/dashboard/settings" onClick={closeProfileDropdown} className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Settings
                    </Link>
                    <Link href="/dashboard/earnings" onClick={closeProfileDropdown} className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Earnings
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={(e) => {
                          closeProfileDropdown();
                          logout();
                        }}
                        className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <span className="mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 12.586V8z" clipRule="evenodd" />
                          </svg>
                        </span>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/auth/signin" className="text-gray-700 hover:text-orange-600">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
          {isMobile && (
            <li className="mobile-menu-btn">
              <button
                className="text-gray-700 hover:text-orange-600 focus:outline-none"
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
            </li>
          )}
        </ul>
      </div>
      
      {/* Second line with categories */}
      {!isMobile && (
        <div className="categories-nav border-t border-gray-100">
          <div className="container mx-auto px-4">
            <ul className="flex items-center overflow-x-auto whitespace-nowrap">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={category.path} className="text-gray-700 hover:text-orange-600 font-medium">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Mobile menu */}
      <div className={`mobile-menu-wrapper ${showMobileMenu ? 'active' : ''}`}>
        <div className="mobile-menu-logo">
          <Image 
            src="/assets/img/aimporo-logo.png" 
            alt="Aimporo Marketplace" 
            width={120} 
            height={32}
            style={{ 
              maxHeight: '32px', 
              width: 'auto', 
              objectFit: 'contain',
              margin: '0 auto 15px'
            }}
          />
        </div>
        
        {/* Mobile search bar */}
        <form onSubmit={handleSearch} className="flex w-full mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
        
        <ul className="mobile-menu">
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={category.path} className="block py-2 text-gray-700 hover:text-orange-600">
                {category.name}
              </Link>
            </li>
          ))}
          {user && (
            <>
              <li className="border-t border-gray-100 mt-2 pt-2">
                <Link href="/dashboard" className="block py-2 text-gray-700 hover:text-orange-600">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/profile" className="block py-2 text-gray-700 hover:text-orange-600">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/dashboard/messages" className="block py-2 text-gray-700 hover:text-orange-600 relative">
                  Messages {unreadMessages > 0 && <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 ml-2 text-xs font-bold leading-none text-white bg-red-600 rounded-full">{unreadMessages > 9 ? '9+' : unreadMessages}</span>}
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header; 