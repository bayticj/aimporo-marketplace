"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import RoleBasedAccess from '@/components/auth/RoleBasedAccess';
import { formatCurrency } from '@/utils/currency';

interface Order {
  id: number;
  title: string;
  status: string;
  date: string;
  price: number;
  type: 'buying' | 'selling';
}

interface Notification {
  id: number;
  type: 'delivery' | 'revision' | 'deadline' | 'completion' | 'reminder';
  title: string;
  message: string;
  orderId: number;
  createdAt: string;
  read: boolean;
}

interface Gig {
  id: number;
  title: string;
  views: number;
  orders: number;
  status: 'active' | 'paused' | 'draft';
}

export default function DashboardPage() {
  const { user, hasRole } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // For now, we'll use mock data
        setOrders([
          {
            id: 1,
            title: 'Logo Design Project',
            status: 'in-progress',
            date: '2025-03-15',
            price: 150,
            type: 'buying'
          },
          {
            id: 2,
            title: 'Website Development',
            status: 'completed',
            date: '2025-03-10',
            price: 500,
            type: 'selling'
          },
          {
            id: 3,
            title: 'Content Writing',
            status: 'pending',
            date: '2025-03-20',
            price: 200,
            type: 'buying'
          },
          {
            id: 4,
            title: 'Mobile App Design',
            status: 'in-progress',
            date: '2025-03-18',
            price: 350,
            type: 'selling'
          }
        ]);

        // Mock gigs
        setGigs([
          {
            id: 1,
            title: 'Professional Logo Design',
            views: 245,
            orders: 12,
            status: 'active'
          },
          {
            id: 2,
            title: 'Website Development',
            views: 189,
            orders: 8,
            status: 'active'
          },
          {
            id: 3,
            title: 'Mobile App UI Design',
            views: 120,
            orders: 5,
            status: 'draft'
          }
        ]);

        // Mock notifications
        setNotifications([
          {
            id: 1,
            type: 'delivery',
            title: 'New Delivery',
            message: 'Your order #1234 has been delivered',
            orderId: 1234,
            createdAt: '2025-03-15T10:30:00',
            read: false
          },
          {
            id: 2,
            type: 'revision',
            title: 'Revision Requested',
            message: 'Client has requested revisions for order #5678',
            orderId: 5678,
            createdAt: '2025-03-14T14:45:00',
            read: true
          },
          {
            id: 3,
            type: 'deadline',
            title: 'Deadline Approaching',
            message: 'Order #9012 is due in 2 days',
            orderId: 9012,
            createdAt: '2025-03-13T09:15:00',
            read: false
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Buyer Dashboard Stats */}
        <RoleBasedAccess allowedRoles={['buyer', 'admin']}>
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">My Orders</h3>
              <span className="text-2xl font-bold text-blue-600">
                {orders.filter(order => order.type === 'buying').length}
              </span>
            </div>
            <p className="text-gray-600">Orders you've placed</p>
            <Link href="/dashboard/orders/buying" className="text-blue-600 hover:underline mt-4 inline-block">
              View my orders
            </Link>
          </div>
        </RoleBasedAccess>
        
        {/* Seller Dashboard Stats */}
        <RoleBasedAccess allowedRoles={['seller', 'admin']}>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Orders to Fulfill</h3>
              <span className="text-2xl font-bold text-green-600">
                {orders.filter(order => order.type === 'selling' && order.status !== 'completed').length}
              </span>
            </div>
            <p className="text-gray-600">Active orders to complete</p>
            <Link href="/dashboard/orders/selling" className="text-green-600 hover:underline mt-4 inline-block">
              View orders
            </Link>
          </div>
        </RoleBasedAccess>
        
        {/* Seller Dashboard Stats */}
        <RoleBasedAccess allowedRoles={['seller', 'admin']}>
          <div className="bg-purple-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">My Gigs</h3>
              <span className="text-2xl font-bold text-purple-600">
                {gigs.length}
              </span>
            </div>
            <p className="text-gray-600">Services you're offering</p>
            <Link href="/dashboard/gigs" className="text-purple-600 hover:underline mt-4 inline-block">
              Manage gigs
            </Link>
          </div>
        </RoleBasedAccess>
        
        {/* Notifications - For All Users */}
        <div className="bg-amber-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <span className="text-2xl font-bold text-amber-600">
              {notifications.filter(n => !n.read).length}
            </span>
          </div>
          <p className="text-gray-600">Unread notifications</p>
          <button 
            onClick={() => {
              setNotifications(notifications.map(n => ({ ...n, read: true })));
            }}
            className="text-amber-600 hover:underline mt-4 inline-block"
          >
            Mark all as read
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Buyer: Recent Orders */}
        <RoleBasedAccess allowedRoles={['buyer', 'admin']}>
          <div>
            <h2 className="text-xl font-semibold mb-4">My Recent Orders</h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              {orders.filter(order => order.type === 'buying').length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {orders
                    .filter(order => order.type === 'buying')
                    .slice(0, 3)
                    .map(order => (
                      <div key={order.id} className="p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{order.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{formatDate(order.date)}</span>
                          <span>{formatCurrency(order.price)}</span>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="p-4 text-gray-500">No orders found</p>
              )}
              <div className="bg-gray-100 p-3 text-center">
                <Link href="/dashboard/orders/buying" className="text-blue-600 hover:underline">
                  View all orders
                </Link>
              </div>
            </div>
          </div>
        </RoleBasedAccess>
        
        {/* Seller: Orders to Fulfill */}
        <RoleBasedAccess allowedRoles={['seller', 'admin']}>
          <div>
            <h2 className="text-xl font-semibold mb-4">Orders to Fulfill</h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              {orders.filter(order => order.type === 'selling').length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {orders
                    .filter(order => order.type === 'selling')
                    .slice(0, 3)
                    .map(order => (
                      <div key={order.id} className="p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{order.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{formatDate(order.date)}</span>
                          <span>{formatCurrency(order.price)}</span>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="p-4 text-gray-500">No orders found</p>
              )}
              <div className="bg-gray-100 p-3 text-center">
                <Link href="/dashboard/orders/selling" className="text-blue-600 hover:underline">
                  View all orders
                </Link>
              </div>
            </div>
          </div>
        </RoleBasedAccess>
        
        {/* Seller: My Gigs */}
        <RoleBasedAccess allowedRoles={['seller', 'admin']}>
          <div>
            <h2 className="text-xl font-semibold mb-4">My Gigs</h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              {gigs.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {gigs.slice(0, 3).map(gig => (
                    <div key={gig.id} className="p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{gig.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(gig.status)}`}>
                          {gig.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{gig.views} views</span>
                        <span>{gig.orders} orders</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="p-4 text-gray-500">No gigs found</p>
              )}
              <div className="bg-gray-100 p-3 text-center">
                <Link href="/dashboard/gigs" className="text-blue-600 hover:underline">
                  Manage all gigs
                </Link>
              </div>
            </div>
          </div>
        </RoleBasedAccess>
        
        {/* Recent Notifications - For All Users */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {notifications.slice(0, 3).map(notification => (
                  <div key={notification.id} className={`p-4 hover:bg-gray-100 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{notification.title}</h3>
                      <span className="text-xs text-gray-500">{new Date(notification.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-4 text-gray-500">No notifications found</p>
            )}
            <div className="bg-gray-100 p-3 text-center">
              <button className="text-blue-600 hover:underline">
                View all notifications
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Admin Dashboard */}
      <RoleBasedAccess allowedRoles={['admin']}>
        <div className="mt-8 border-t pt-8">
          <h2 className="text-xl font-semibold mb-6">Admin Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-indigo-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Total Users</h3>
                <span className="text-2xl font-bold text-indigo-600">125</span>
              </div>
              <p className="text-gray-600">Registered users</p>
              <Link href="/dashboard/admin/users" className="text-indigo-600 hover:underline mt-4 inline-block">
                Manage users
              </Link>
            </div>
            
            <div className="bg-pink-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Total Gigs</h3>
                <span className="text-2xl font-bold text-pink-600">48</span>
              </div>
              <p className="text-gray-600">Active services</p>
              <Link href="/dashboard/admin/gigs" className="text-pink-600 hover:underline mt-4 inline-block">
                Manage gigs
              </Link>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Total Orders</h3>
                <span className="text-2xl font-bold text-teal-600">87</span>
              </div>
              <p className="text-gray-600">Processed orders</p>
              <Link href="/dashboard/admin/orders" className="text-teal-600 hover:underline mt-4 inline-block">
                View all orders
              </Link>
            </div>
          </div>
        </div>
      </RoleBasedAccess>
    </div>
  );
} 