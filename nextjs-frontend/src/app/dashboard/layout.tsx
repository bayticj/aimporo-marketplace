'use client';

import React, { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'grid' },
    { name: 'My Gigs', path: '/dashboard/gigs', icon: 'briefcase' },
    { name: 'My Orders', path: '/dashboard/orders', icon: 'shopping-bag' },
    { name: 'Profile', path: '/dashboard/profile', icon: 'user' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-2xl font-bold text-orange-600 mx-auto mb-3">
                  {user.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
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
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 