'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import RoleBasedAccess from '@/components/auth/RoleBasedAccess';
import Link from 'next/link';
import RoleSwitcher from '@/components/auth/RoleSwitcher';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout, hasRole, switchRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [loading, user, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated and not loading, don't render children
  if (!user && !loading) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="dashboard-container">
        <div className="dashboard-sidebar bg-white shadow-md">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="text-xl font-bold text-orange-600">
                Marketplace
              </Link>
              
              {/* Add Role Switcher here */}
              {user && user.roles && user.roles.length > 1 && (
                <RoleSwitcher />
              )}
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                {user?.name && (
                  <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-lg font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <div className="font-medium">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
            </div>
          </div>
          <nav className="space-y-1">
            <Link href="/dashboard" className="flex items-center px-4 py-3 rounded-lg transition-colors bg-orange-50 text-orange-600">
              <span className="mr-3">
                <i className="fas fa-grid"></i>
              </span>
              <span>Dashboard</span>
            </Link>
            
            {/* Common navigation items for all users */}
            <Link href="/dashboard/profile" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50">
              <span className="mr-3">
                <i className="fas fa-user"></i>
              </span>
              <span>Profile</span>
            </Link>
            
            {/* Seller-specific navigation items */}
            <RoleBasedAccess allowedRoles={['seller', 'admin']} checkActiveRoleOnly={true}>
              <Link href="/dashboard/gigs" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50">
                <span className="mr-3">
                  <i className="fas fa-briefcase"></i>
                </span>
                <span>My Gigs</span>
              </Link>
              <Link href="/dashboard/orders/selling" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50">
                <span className="mr-3">
                  <i className="fas fa-clipboard-list"></i>
                </span>
                <span>Orders to Fulfill</span>
              </Link>
              <Link href="/dashboard/earnings" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50">
                <span className="mr-3">
                  <i className="fas fa-money-bill"></i>
                </span>
                <span>Earnings</span>
              </Link>
            </RoleBasedAccess>
            
            {/* Buyer-specific navigation items */}
            <RoleBasedAccess allowedRoles={['buyer', 'admin']} checkActiveRoleOnly={true}>
              <Link href="/dashboard/orders/buying" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50">
                <span className="mr-3">
                  <i className="fas fa-shopping-bag"></i>
                </span>
                <span>My Orders</span>
              </Link>
              <Link href="/dashboard/favorites" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50">
                <span className="mr-3">
                  <i className="fas fa-heart"></i>
                </span>
                <span>Favorites</span>
              </Link>
            </RoleBasedAccess>
            
            {/* Admin-specific navigation items */}
            <RoleBasedAccess allowedRoles={['admin']} checkActiveRoleOnly={true}>
              <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Admin
              </div>
              <Link href="/dashboard/admin/users" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50">
                <span className="mr-3">
                  <i className="fas fa-users"></i>
                </span>
                <span>User Management</span>
              </Link>
              <Link href="/dashboard/admin/roles" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50">
                <span className="mr-3">
                  <i className="fas fa-user-shield"></i>
                </span>
                <span>Role Management</span>
              </Link>
              <Link href="/dashboard/admin/gigs" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50">
                <span className="mr-3">
                  <i className="fas fa-tasks"></i>
                </span>
                <span>Gig Management</span>
              </Link>
              <Link href="/dashboard/admin/orders" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50">
                <span className="mr-3">
                  <i className="fas fa-clipboard-check"></i>
                </span>
                <span>Order Management</span>
              </Link>
              
              {/* Software License System Navigation */}
              <Link href="/dashboard/software" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50">
                <span className="mr-3">
                  <i className="fas fa-key"></i>
                </span>
                <span>Software Licenses</span>
              </Link>
            </RoleBasedAccess>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50 mt-4"
            >
              <span className="mr-3">
                <i className="fas fa-sign-out-alt"></i>
              </span>
              <span>Logout</span>
            </button>
          </nav>
        </div>
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
} 