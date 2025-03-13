"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import NotificationCenter from './NotificationCenter';
import { mockMessageService } from '@/services/mockMessages';
import axios from '@/services/api';
import { useRouter } from 'next/navigation';
import searchService, { SearchTrend } from '@/services/searchService';
import { formatDistanceToNow } from 'date-fns';

// Define interfaces for message dropdown
interface UnreadMessage {
  conversation: {
    order_id: string;
    gig_title: string;
    other_user: {
      id: string;
      name: string;
      avatar?: string;
    };
    unread_count: number;
  };
  message: {
    id: string;
    content: string;
    created_at: string;
  };
}

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
  const [showMessageDropdown, setShowMessageDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unreadMessagesList, setUnreadMessagesList] = useState<UnreadMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<SearchTrend[]>([]);
  const [selectedTrend, setSelectedTrend] = useState<number | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchWidth, setSearchWidth] = useState('600px');
  const [searchMargin, setSearchMargin] = useState('0 20px');
  const profileDropdownRef = useRef<HTMLLIElement>(null);
  const desktopNotificationBellRef = useRef<HTMLLIElement>(null);
  const mobileNotificationBellRef = useRef<HTMLLIElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const messageDropdownRef = useRef<HTMLLIElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Function to fetch unread messages
  const fetchUnreadMessages = async () => {
    try {
      setIsLoadingMessages(true);
      // Fetch unread count
      const response = await mockMessageService.getUnreadCount();
      setUnreadMessages(response.unread_count);
      
      // Fetch unread messages list if there are any
      if (response.unread_count > 0) {
        const messagesResponse = await mockMessageService.getUnreadMessages();
        setUnreadMessagesList(messagesResponse.unread_messages);
      } else {
        setUnreadMessagesList([]);
      }
    } catch (error) {
      console.error('Error fetching unread messages count:', error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

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
      const width = window.innerWidth;
      setIsMobile(width < 970); // Updated to match the 969px breakpoint
      
      // Update search field width based on screen size
      if (width < 850) {
        setSearchWidth('250px');
        setSearchMargin('0 8px');
      } else if (width < 992) {
        setSearchWidth('350px');
        setSearchMargin('0 10px');
      } else if (width < 1200) {
        setSearchWidth('450px');
        setSearchMargin('0 15px');
      } else {
        setSearchWidth('600px');
        setSearchMargin('0 20px');
      }
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Add click outside listener for profile dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current && 
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
      
      if (
        messageDropdownRef.current && 
        !messageDropdownRef.current.contains(event.target as Node)
      ) {
        setShowMessageDropdown(false);
      }
      
      if (
        searchDropdownRef.current && 
        !searchDropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
      
      // Close mobile search when clicking outside
      const searchButton = document.querySelector('[aria-label="Search"]');
      if (
        showMobileSearch &&
        mobileSearchRef.current && 
        !mobileSearchRef.current.contains(event.target as Node) &&
        searchButton !== event.target &&
        !searchButton?.contains(event.target as Node)
      ) {
        setShowMobileSearch(false);
      }

      // Close notification dropdown when clicking outside
      if (
        desktopNotificationBellRef.current &&
        !desktopNotificationBellRef.current.contains(event.target as Node) &&
        mobileNotificationBellRef.current &&
        !mobileNotificationBellRef.current.contains(event.target as Node) &&
        showNotifications
      ) {
        setShowNotifications(false);
      }
      
      // Close mobile menu when clicking outside
      if (
        showMobileMenu &&
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Refresh messages when user returns to the tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && user) {
        fetchUnreadMessages();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Set up periodic refresh of unread messages (every 30 seconds)
    const messageRefreshInterval = setInterval(() => {
      if (user) {
        fetchUnreadMessages();
      }
    }, 30000);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(messageRefreshInterval);
    };
  }, [profileDropdownRef, messageDropdownRef, searchDropdownRef, searchInputRef, mobileSearchRef, showMobileSearch, user]);

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

  // Limit unread messages to maximum of 3
  const limitedUnreadMessages = useMemo(() => {
    return unreadMessagesList.slice(0, 3);
  }, [unreadMessagesList]);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // Close other dropdowns when opening notifications
    if (!showNotifications) {
      setShowProfileDropdown(false);
      setShowMessageDropdown(false);
      setShowMobileSearch(false);
    }
  };

  const toggleMessageDropdown = () => {
    if (!showMessageDropdown && unreadMessagesList.length === 0) {
      // If we're opening the dropdown and don't have messages loaded yet, fetch them
      fetchUnreadMessages();
    }
    setShowMessageDropdown(!showMessageDropdown);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    // Close other dropdowns when opening profile dropdown
    if (!showProfileDropdown) {
      setShowNotifications(false);
      setShowMessageDropdown(false);
      setShowMobileSearch(false);
    }
  };

  const closeMessageDropdown = () => {
    setShowMessageDropdown(false);
  };

  const closeProfileDropdown = () => {
    setShowProfileDropdown(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      setShowMobileSearch(false);
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

  const handleMessageIconHover = () => {
    // Prefetch messages when hovering over the icon
    if (unreadMessagesList.length === 0 && !isLoadingMessages) {
      fetchUnreadMessages();
    }
  };

  // Function to handle clicking on a message in the dropdown
  const handleMessageClick = async (orderId: string) => {
    try {
      // Mark the conversation as read
      const result = await mockMessageService.markConversationAsRead(orderId);
      
      // Update the unread count
      if (result.success) {
        setUnreadMessages(result.unread_count);
        
        // Update the unread messages list by removing the read messages
        setUnreadMessagesList(prev => 
          prev.filter(item => item.conversation.order_id !== orderId)
        );
      }
      
      // Close the dropdown
      closeMessageDropdown();
    } catch (error) {
      console.error('Error marking conversation as read:', error);
    }
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    // Focus the search input when opening mobile search
    if (!showMobileSearch) {
      setTimeout(() => {
        const mobileSearchInput = document.getElementById('mobile-search-input');
        if (mobileSearchInput) {
          mobileSearchInput.focus();
        }
      }, 100);
    }
  };

  // Function to close mobile search
  const closeMobileSearch = () => {
    setShowMobileSearch(false);
  };

  // Function to handle clicks outside the mobile search
  const handleMobileSearchOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close if clicking on the overlay background
    if (e.target === e.currentTarget) {
      closeMobileSearch();
    }
  };

  return (
    <header className="header">
      {/* Main header with logo, search, and user controls */}
      <div className="header-nav" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: isMobile ? '0 12px' : '0 24px',
        flexWrap: 'nowrap'
      }}>
        {/* Mobile header items - left side */}
        {isMobile && (
          <div className="mobile-header-left" style={{ zIndex: 20, width: '80px' }}>
            {/* Mobile menu button (hamburger) */}
            <button
              ref={mobileMenuButtonRef}
              className="mobile-nav-btn text-gray-600 hover:text-orange-600 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Menu"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Logo - centered on mobile */}
        <div 
          className={`navbar-header ${isMobile ? 'navbar-header-mobile' : ''}`}
          style={isMobile ? { 
            position: 'absolute', 
            left: '50%', 
            top: '50%', 
            transform: 'translate(-50%, -50%)', 
            zIndex: 1 
          } : {
            flexShrink: 0
          }}
        >
          <Link href="/" className="navbar-brand logo">
            <Image 
              src="/assets/img/aimporo-logo.png" 
              alt="Aimporo Marketplace" 
              width={isMobile ? 110 : 150}
              height={isMobile ? 30 : 40}
              style={{ 
                maxHeight: isMobile ? '30px' : '40px', 
                width: 'auto', 
                objectFit: 'contain'
              }}
              priority
            />
          </Link>
        </div>
        
        {/* Search bar in header - hidden on mobile */}
        <div className="header-search-wrapper" style={!isMobile ? {
          flex: '1',
          maxWidth: searchWidth,
          margin: searchMargin,
          minWidth: '180px'
        } : {}}>
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
        
        {/* Right side icons */}
        <ul className="header-navbar-rht" style={isMobile ? 
          { zIndex: 20, width: '100px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' } : 
          { display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, marginLeft: '10px' }
        }>
          {!isMobile && (
            <>
              {user ? (
                <>
                  {/* Messages Icon - Only on desktop */}
                  <li className="relative" ref={messageDropdownRef}>
                    <button
                      onClick={toggleMessageDropdown}
                      onMouseEnter={handleMessageIconHover}
                      className="p-2 text-gray-700 hover:text-orange-600 focus:outline-none"
                      aria-label="Messages"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      {unreadMessages > 0 && (
                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                          {unreadMessages > 9 ? '9+' : unreadMessages}
                        </span>
                      )}
                    </button>
                    
                    {/* Messages Dropdown */}
                    {showMessageDropdown && (
                      <div 
                        className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl z-[1000] border border-gray-200 dropdown-menu transform transition-all duration-200 ease-in-out origin-top-right" 
                        style={{ 
                          maxHeight: '90vh',
                          overflow: 'hidden auto',
                          animation: 'dropdownFadeIn 0.2s ease-out'
                        }}
                      >
                        <div className="px-4 py-3 border-b border-gray-200">
                          <h3 className="text-sm font-semibold text-gray-700">Messages</h3>
                        </div>
                        
                        <div className="max-h-[60vh] overflow-y-auto">
                          {isLoadingMessages ? (
                            <div className="px-4 py-6 text-center">
                              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                              <p className="mt-2 text-sm text-gray-500">Loading messages...</p>
                            </div>
                          ) : limitedUnreadMessages.length > 0 ? (
                            <div>
                              {limitedUnreadMessages.map((item) => (
                                <Link 
                                  key={item.message.id} 
                                  href={`/dashboard/messages/${item.conversation.order_id}`}
                                  className="block px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                  onClick={() => handleMessageClick(item.conversation.order_id)}
                                >
                                  <div className="flex items-start">
                                    <div className="flex-shrink-0 mr-3">
                                      {item.conversation.other_user.avatar ? (
                                        <Image 
                                          src={item.conversation.other_user.avatar} 
                                          alt={item.conversation.other_user.name}
                                          width={40}
                                          height={40}
                                          className="rounded-full"
                                        />
                                      ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                          <span className="text-gray-600 font-medium">
                                            {item.conversation.other_user.name.charAt(0)}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {item.conversation.other_user.name}
                                      </p>
                                      <p className="text-sm text-gray-500 truncate">
                                        {item.conversation.gig_title}
                                      </p>
                                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                        {item.message.content}
                                      </p>
                                      <p className="text-xs text-gray-400 mt-1">
                                        {formatDistanceToNow(new Date(item.message.created_at), { addSuffix: true })}
                                      </p>
                                    </div>
                                    {item.conversation.unread_count > 1 && (
                                      <div className="ml-2 mt-1">
                                        <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                          {item.conversation.unread_count}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <div className="px-4 py-6 text-center text-gray-500">
                              <p>No unread messages</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                          <Link 
                            href="/dashboard/messages" 
                            className="flex items-center justify-center text-sm font-medium text-orange-600 hover:text-orange-700"
                            onClick={closeMessageDropdown}
                          >
                            <span className="mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            {unreadMessagesList.length > 3 
                              ? `View all messages (${unreadMessagesList.length - 3} more)` 
                              : 'View all messages'}
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                  
                  {/* Notification Bell - Only on desktop */}
                  <li className="relative" ref={desktopNotificationBellRef}>
                    <button
                      onClick={toggleNotifications}
                      className="p-2 text-gray-700 hover:text-orange-600 focus:outline-none"
                      aria-label="Notifications"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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
                </>
              ) : (
                <>
                  <li style={{ display: 'flex', alignItems: 'center', marginRight: '0px' }}>
                    <Link href="/auth/signin" className="auth-button-signin" style={{ flexShrink: 0 }}>
                      Sign In
                    </Link>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', marginLeft: '-2px' }}>
                    <Link
                      href="/auth/register"
                      className="auth-button-signup"
                      style={{ flexShrink: 0 }}
                    >
                      Get Started
                    </Link>
                  </li>
                </>
              )}
            </>
          )}
          
          {/* Mobile right side icons */}
          {/* Mobile search icon - always in DOM but controlled by CSS */}
          <li className="mobile-search-container">
            <button
              onClick={toggleMobileSearch}
              className="mobile-nav-btn mobile-search-icon text-gray-600 hover:text-orange-600 focus:outline-none"
              aria-label="Search"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </li>
          
          {isMobile && (
            <>
              {user && (
                <>
                  {/* Notification Bell on mobile */}
                  <li className="relative" ref={mobileNotificationBellRef}>
                    <button
                      onClick={toggleNotifications}
                      className="mobile-nav-btn text-gray-700 hover:text-orange-600 focus:outline-none"
                      aria-label="Notifications"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center notification-badge text-white bg-red-600 rounded-full" style={{ zIndex: 30 }}>
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </button>
                    {showNotifications && (
                      <NotificationCenter onClose={() => setShowNotifications(false)} />
                    )}
                  </li>
                </>
              )}
            </>
          )}
          
          {/* Profile Avatar with Dropdown - Always visible */}
          {user && (
            <li className="relative" ref={profileDropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center focus:outline-none mobile-profile-btn"
                aria-expanded={showProfileDropdown}
                aria-label="Toggle profile dropdown"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <div 
                  className={`rounded-full bg-gray-200 overflow-hidden border-2 border-orange-500 ${isMobile ? 'w-8 h-8' : 'w-9 h-9'}`} 
                  style={{ 
                    minWidth: isMobile ? '32px' : '36px', 
                    minHeight: isMobile ? '32px' : '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
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
                <div 
                  className={`
                    ${isMobile ? 'fixed inset-x-0 top-16 mx-auto w-[95%] max-w-sm' : 'absolute right-0 top-full mt-2 w-56'} 
                    bg-white rounded-lg shadow-xl py-2 z-[1001] border border-gray-200 
                  `}
                  style={{ 
                    maxHeight: '90vh',
                    overflow: 'hidden auto',
                    animation: isMobile ? 'slide-down 0.2s ease-out forwards' : 'dropdownFadeIn 0.2s ease-out'
                  }}
                >
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
          )}
        </ul>
      </div>
      
      {/* Mobile search overlay */}
      {showMobileSearch && (
        <div 
          ref={mobileSearchRef}
          className="mobile-search-overlay fixed inset-0 bg-black bg-opacity-50 z-[1002] flex items-start justify-center pt-16 px-4"
          onClick={handleMobileSearchOutsideClick}
        >
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-4 animate-slide-down">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Search</h3>
              <button 
                onClick={closeMobileSearch}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                id="mobile-search-input"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Search for products..."
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
            
            {/* Trending searches in mobile search overlay */}
            {trendingSearches.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Trending Searches
                </h4>
                <ul className="space-y-2">
                  {trendingSearches.map((trend) => (
                    <li key={`mobile-trend-${trend.id}`}>
                      <button 
                        type="button" 
                        onClick={() => {
                          setSearchQuery(trend.name);
                          setShowMobileSearch(false);
                          router.push(`/search?q=${encodeURIComponent(trend.name)}`);
                        }}
                        className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {trend.name}
                        <span className="ml-auto text-xs text-gray-500">{trend.category}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      
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
      
      {/* Mobile menu backdrop */}
      {showMobileMenu && (
        <div 
          className="mobile-menu-backdrop"
          onClick={closeMobileMenu}
        ></div>
      )}
      
      {/* Mobile menu */}
      <div 
        ref={mobileMenuRef}
        className={`mobile-menu-wrapper ${showMobileMenu ? 'active' : ''}`}
      >
        <ul className="mobile-menu">
          {categories.map((category) => (
            <li key={category.id}>
              <Link 
                href={category.path} 
                className="block py-2 text-gray-700 hover:text-orange-600"
                onClick={closeMobileMenu}
              >
                {category.name}
              </Link>
            </li>
          ))}
          {user ? (
            <>
              <li className="border-t border-gray-100 mt-2 pt-2">
                <Link 
                  href="/dashboard" 
                  className="block py-2 text-gray-700 hover:text-orange-600"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard/profile" 
                  className="block py-2 text-gray-700 hover:text-orange-600"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard/messages" 
                  className="block py-2 text-gray-700 hover:text-orange-600 relative"
                  onClick={closeMobileMenu}
                >
                  Messages {unreadMessages > 0 && <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 ml-2 text-xs font-bold leading-none text-white bg-red-600 rounded-full">{unreadMessages > 9 ? '9+' : unreadMessages}</span>}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Login/Signup buttons in mobile menu */}
              <li className="border-t border-gray-100 mt-4 pt-4">
                <div className="flex flex-col gap-3">
                  <Link 
                    href="/auth/signin" 
                    className="w-full py-3 px-4 bg-white border border-orange-500 text-orange-500 font-medium rounded-lg text-center hover:bg-orange-50 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/register" 
                    className="w-full py-3 px-4 bg-orange-500 text-white font-semibold rounded-lg text-center hover:bg-orange-600 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Get Started
                  </Link>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
      
      {/* Add animation styles */}
      <style jsx global>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.2s ease-out forwards;
        }
        
        .mobile-search-overlay {
          backdrop-filter: blur(4px);
        }
        
        .mobile-menu-backdrop {
          position: fixed;
          top: 60px;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
          animation: fade-in 0.2s ease-out;
          backdrop-filter: blur(2px);
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @media (min-width: 768px) {
          .md\\:block {
            display: block;
          }
          
          .md\\:hidden {
            display: none;
          }
        }
        
        @media (max-width: 767px) {
          .hidden {
            display: none;
          }
          
          /* Mobile header layout */
          .header {
            position: relative;
            overflow: visible;
          }
          
          .header-nav {
            display: grid;
            grid-template-columns: 80px 1fr 80px;
            align-items: center;
            padding: 0 12px;
            height: 60px;
            max-width: 100%;
            box-sizing: border-box;
            position: relative;
          }
          
          .navbar-header-mobile {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: none;
            z-index: 1;
          }
          
          .navbar-header-mobile .logo {
            pointer-events: auto;
          }
          
          .mobile-header-left {
            grid-column: 1;
            display: flex;
            align-items: center;
            z-index: 10;
            justify-self: start;
            position: relative;
          }
          
          .header-navbar-rht {
            grid-column: 3;
            margin-left: auto;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10;
            justify-self: end;
            position: relative;
          }
          
          /* Style mobile buttons */
          .mobile-nav-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #4b5563;
          }
          
          .mobile-nav-btn:hover {
            color: #ff5a1f;
          }
          
          .mobile-profile-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
};

export default Header; 