'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Order {
  id: string;
  title: string;
  seller: string;
  status: 'in-progress' | 'completed' | 'revision' | 'cancelled';
  date: string;
  dueDate: string;
  price: number;
  image: string;
}

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock orders data
  const orders: Order[] = [
    {
      id: 'ORD-7851',
      title: 'Logo Design for My New Startup',
      seller: 'DesignMaster',
      status: 'in-progress',
      date: '2024-01-15',
      dueDate: '2024-01-19',
      price: 120,
      image: '/images/services/logo-design.jpg'
    },
    {
      id: 'ORD-7852',
      title: 'Website Development with React',
      seller: 'CodePro',
      status: 'completed',
      date: '2024-01-10',
      dueDate: '2024-01-12',
      price: 350,
      image: '/images/services/web-development.jpg'
    },
    {
      id: 'ORD-7853',
      title: 'Social Media Marketing Campaign',
      seller: 'MarketingGuru',
      status: 'revision',
      date: '2024-01-05',
      dueDate: '2024-01-08',
      price: 200,
      image: '/images/services/social-media.jpg'
    },
    {
      id: 'ORD-7854',
      title: 'Mobile App UI Design',
      seller: 'UIWizard',
      status: 'completed',
      date: '2023-12-20',
      dueDate: '2023-12-25',
      price: 250,
      image: '/images/services/mobile-ui.jpg'
    },
    {
      id: 'ORD-7855',
      title: 'Content Writing for Blog',
      seller: 'WordSmith',
      status: 'cancelled',
      date: '2023-12-15',
      dueDate: '2023-12-20',
      price: 100,
      image: '/images/services/content-writing.jpg'
    }
  ];

  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return order.status === 'in-progress' || order.status === 'revision';
    if (activeTab === 'completed') return order.status === 'completed' || order.status === 'cancelled';
    return true;
  }).filter(order => {
    // Filter by search term
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      order.id.toLowerCase().includes(term) ||
      order.title.toLowerCase().includes(term) ||
      order.seller.toLowerCase().includes(term)
    );
  });

  // Helper function to get status badge color
  const getStatusBadgeClass = (status: Order['status']) => {
    switch (status) {
      case 'in-progress':
        return 'bg-blue-100 text-blue-600';
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'revision':
        return 'bg-yellow-100 text-yellow-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Navigate to order detail page
  const navigateToOrderDetail = (orderId: string) => {
    router.push(`/dashboard/purchase/${orderId}/requirements`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium">My Orders</h1>
        <div className="flex items-center">
          <div className="relative">
            <input 
              type="text" 
              className="pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" 
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'all' 
              ? 'text-orange-500 border-b-2 border-orange-500' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('all')}
        >
          ALL ORDERS
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'active' 
              ? 'text-orange-500 border-b-2 border-orange-500' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('active')}
        >
          Active
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'completed' 
              ? 'text-orange-500 border-b-2 border-orange-500' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "Try adjusting your search terms." : "Start browsing and place an order!"}
            </p>
            <div className="mt-6">
              <Link href="/search" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                Browse Services
              </Link>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SERVICE</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ORDER DATE</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DUE ON</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigateToOrderDetail(order.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                        <Image 
                          src={order.image} 
                          alt={order.title}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback for missing images
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/40";
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.title}</div>
                      <div className="text-sm text-gray-500">{order.seller}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.dueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${order.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(order.status)}`}>
                        {order.status === 'in-progress' ? 'In Progress' : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm" onClick={(e) => e.stopPropagation()}>
                      {order.status === 'completed' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`Reordering service: ${order.id}`);
                          }}
                          className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded hover:bg-green-600"
                        >
                          Order Again
                        </button>
                      ) : order.status === 'in-progress' || order.status === 'revision' ? (
                        <Link 
                          href={`/dashboard/purchase/${order.id}/requirements`}
                          className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded hover:bg-orange-600"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Status
                        </Link>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`Reordering service: ${order.id}`);
                          }}
                          className="px-3 py-1 bg-gray-200 text-gray-500 text-xs font-medium rounded"
                        >
                          Order Again
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Table Footer */}
            <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing {filteredOrders.length} of {orders.length} orders
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded text-sm disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 border rounded bg-gray-50 text-sm">1</button>
                <button className="px-3 py-1 border rounded text-sm disabled:opacity-50" disabled>Next</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 