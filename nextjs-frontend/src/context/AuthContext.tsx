'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api';
import { mockAuthService } from '@/services/mockAuth';
import { setAuthToken, removeAuthToken } from '@/utils/auth';

// Use mock service for development
const auth = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true' ? mockAuthService : authService;

interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, password_confirmation: string, account_type: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  hasRole: (role: string | string[]) => boolean;
  hasPermission: (permission: string | string[]) => boolean;
  activeRole: string | null;
  switchRole: (role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const response = await auth.getUser();
          setUser(response.data.user);
        }
      } catch (err) {
        localStorage.removeItem('auth_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Set initial active role when user is loaded
  useEffect(() => {
    if (user && user.roles && user.roles.length > 0) {
      // Check if there's a saved role in localStorage
      const savedRole = localStorage.getItem('activeRole');
      
      // Use the saved role if it exists and the user has that role
      if (savedRole && user.roles.includes(savedRole)) {
        setActiveRole(savedRole);
        console.log(`Restored active role from localStorage: ${savedRole}`);
      } else {
        // Otherwise use the first role
        setActiveRole(user.roles[0]);
        localStorage.setItem('activeRole', user.roles[0]);
        console.log(`Set initial active role: ${user.roles[0]}`);
      }
    } else {
      setActiveRole(null);
      localStorage.removeItem('activeRole');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await auth.login({ email, password });
      
      // Store token using the utility function
      setAuthToken(response.data.access_token);
      
      // Also set a cookie for middleware access
      document.cookie = `token=${response.data.access_token}; path=/; max-age=3600; SameSite=Strict`;
      
      setUser(response.data.user);
      
      // Add a small delay before redirecting to ensure state is updated
      setTimeout(() => {
        router.push('/dashboard');
      }, 100);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, password_confirmation: string, account_type: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await auth.register({ name, email, password, password_confirmation, account_type });
      setAuthToken(response.data.access_token);
      setUser(response.data.user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await auth.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear localStorage using the utility function
      removeAuthToken();
      localStorage.removeItem('activeRole');
      
      // Clear the token cookie
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
      
      setUser(null);
      setActiveRole(null);
      setLoading(false);
      router.push('/');
    }
  };

  const clearError = () => {
    setError(null);
  };

  const hasRole = (role: string | string[]) => {
    if (!user || !user.roles) return false;
    
    if (Array.isArray(role)) {
      return role.some(r => user.roles.includes(r));
    }
    
    return user.roles.includes(role);
  };

  const hasPermission = (permission: string | string[]) => {
    if (!user || !user.permissions) return false;
    
    if (Array.isArray(permission)) {
      return permission.some(p => user.permissions.includes(p));
    }
    
    return user.permissions.includes(permission);
  };

  const switchRole = (role: string) => {
    if (!user || !user.roles || !user.roles.includes(role)) {
      console.error(`Role ${role} not found in user roles:`, user?.roles);
      return;
    }
    
    console.log(`Switching to role: ${role}`);
    
    // Update the active role
    setActiveRole(role);
    
    // Store the active role in localStorage to persist it
    localStorage.setItem('activeRole', role);
    
    // Add a small delay to ensure state is updated before navigation
    setTimeout(() => {
      try {
        // Set a custom header for the next navigation to skip middleware auth check
        // This is a workaround since we can't access localStorage in middleware
        const headers = new Headers();
        headers.append('x-middleware-skip', 'true');
        
        // Navigate based on role
        if (role === 'admin') {
          router.push('/dashboard/admin');
        } else if (role === 'seller') {
          router.push('/dashboard/gigs');
        } else if (role === 'buyer') {
          router.push('/dashboard/orders/buying');
        } else {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error during role switch navigation:', error);
      }
    }, 100);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      register, 
      logout, 
      clearError,
      hasRole,
      hasPermission,
      activeRole,
      switchRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 