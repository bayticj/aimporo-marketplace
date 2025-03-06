'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const DashboardSidebar = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'grid' },
    { name: 'My Gigs', path: '/dashboard/gigs', icon: 'briefcase' },
    { name: 'My Orders', path: '/dashboard/orders', icon: 'shopping-bag' },
    { name: 'Disputes', path: '/dashboard/disputes', icon: 'exclamation-triangle' },
    { name: 'Profile', path: '/dashboard/profile', icon: 'user' },
  ];

  return (
    <div className="dashboard-sidebar">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-2xl font-bold text-orange-600 mx-auto mb-3">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <h3 className="text-lg font-semibold">{user?.name || 'User'}</h3>
          <p className="text-gray-600 text-sm">{user?.email || 'user@example.com'}</p>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                pathname === item.path
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3">
                <i className={`fas fa-${item.icon}`}></i>
              </span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar; 