'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import RoleBasedAccess from '@/components/auth/RoleBasedAccess';
import Link from 'next/link';
import Image from 'next/image';
import RoleSwitcher from '@/components/auth/RoleSwitcher';

// Navigation item component
interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  showForRoles?: string[];
}

const NavItem = ({ href, icon, label, isActive, showForRoles }: NavItemProps) => {
  const { activeRole, hasRole } = useAuth();
  const pathname = usePathname();
  
  // Skip rendering if item is restricted to specific roles and user doesn't have any of them
  if (showForRoles && showForRoles.length > 0 && 
      (activeRole ? !showForRoles.includes(activeRole) : true) && 
      !showForRoles.some(role => hasRole(role))) {
    return null;
  }

  // Check if current path matches this nav item
  // Use exact match for root dashboard, pathname.includes for others
  const isCurrentPage = isActive !== undefined 
    ? isActive 
    : href === '/dashboard' 
      ? pathname === '/dashboard'
      : pathname.startsWith(href);
  
  return (
    <Link 
      href={href}
      className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
        isCurrentPage
          ? 'bg-orange-500 text-white' 
          : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'
      } mb-1.5`}
    >
      <span className={`${isCurrentPage ? 'text-white' : 'text-gray-500'} mr-3`}>
        {icon}
      </span>
      {label}
      {isCurrentPage && (
        <span className="ml-auto bg-orange-400 w-1.5 h-1.5 rounded-full"></span>
      )}
    </Link>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout, hasRole, switchRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex gap-6 py-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-6 bg-white rounded-xl shadow-sm">
              {/* Profile Section */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-orange-500 text-white text-lg font-medium">
                      H
            </div>
              </div>
              <div>
                    <h3 className="font-medium text-gray-900">Harry Brooks</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-600">USA</span>
                      <span className="text-sm text-gray-400">•</span>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600">5.0</span>
                        <span className="text-xs text-gray-400">(45)</span>
              </div>
            </div>
          </div>
                  <button className="ml-auto">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-3">
                <NavItem 
                  href="/dashboard" 
                  icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>}
                  label="Dashboard"
                />
                
                <NavItem 
                  href="/dashboard/gigs" 
                  icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>}
                  label="Manage Gigs"
                  showForRoles={['seller', 'admin']}
                />

                <NavItem 
                  href="/dashboard/purchase" 
                  icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>}
                  label="My Orders"
                />

                <NavItem 
                  href="/dashboard/sales" 
                  icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>}
                  label="Sales"
                  showForRoles={['seller', 'admin']}
                />

                <NavItem 
                  href="/dashboard/files" 
                  icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <polyline points="13 2 13 9 20 9" />
                  </svg>}
                  label="Files"
                  showForRoles={['admin']}
                />

                <NavItem 
                  href="/dashboard/reviews" 
                  icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>}
                  label="My Reviews"
                  showForRoles={['seller', 'admin']}
                />

                <NavItem 
                  href="/dashboard/wishlist" 
                  icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>}
                  label="Wishlist"
                />

                <NavItem 
                  href="/dashboard/messages" 
                  icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>}
                  label="Messages"
                />

                <NavItem 
                  href="/dashboard/wallet" 
                  icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>}
                  label="Wallet"
                />

                <NavItem 
                  href="/dashboard/payments" 
                  icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>}
                  label="Payments"
                  showForRoles={['seller', 'admin']}
                />

                <NavItem 
                  href="/dashboard/settings" 
                  icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>}
                  label="Settings"
                />
          </nav>
        </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-xl p-6">
          {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 