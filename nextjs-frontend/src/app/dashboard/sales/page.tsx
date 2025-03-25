'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

interface Sale {
  id: string;
  buyer: {
    name: string;
    avatar: string;
    country: string;
  };
  gig: {
    title: string;
    image: string;
  };
  orderDate: string;
  amount: number;
  status: 'completed' | 'in_progress' | 'cancelled' | 'delivered';
  isPaid: boolean;
}

export default function SalesPage() {
  const [timeFilter, setTimeFilter] = useState<'all' | 'this-month' | 'last-month'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress' | 'delivered' | 'cancelled'>('all');
  
  // Mock sales data
  const sales: Sale[] = [
    {
      id: 'order-1',
      buyer: {
        name: 'Alex Johnson',
        avatar: '/images/avatars/alex.jpg',
        country: 'United States'
      },
      gig: {
        title: 'Designing and developing software applications',
        image: '/images/services/software-development.jpg'
      },
      orderDate: '2023-09-15',
      amount: 780,
      status: 'completed',
      isPaid: true
    },
    {
      id: 'order-2',
      buyer: {
        name: 'Sarah Miller',
        avatar: '/images/avatars/sarah.jpg',
        country: 'Canada'
      },
      gig: {
        title: 'I will develop openai, dalle, chat gpt app for you',
        image: '/images/services/ai-development.jpg'
      },
      orderDate: '2023-09-22',
      amount: 830,
      status: 'delivered',
      isPaid: true
    },
    {
      id: 'order-3',
      buyer: {
        name: 'Michael Chen',
        avatar: '/images/avatars/michael.jpg',
        country: 'Singapore'
      },
      gig: {
        title: 'I will do implementing chatbots on websites or applications',
        image: '/images/services/chatbot-integration.jpg'
      },
      orderDate: '2023-10-05',
      amount: 750,
      status: 'in_progress',
      isPaid: false
    },
    {
      id: 'order-4',
      buyer: {
        name: 'Emma Wilson',
        avatar: '/images/avatars/emma.jpg',
        country: 'Australia'
      },
      gig: {
        title: 'I will do professional lifestyle and product photography',
        image: '/images/services/product-photography.jpg'
      },
      orderDate: '2023-10-12',
      amount: 350,
      status: 'cancelled',
      isPaid: false
    },
    {
      id: 'order-5',
      buyer: {
        name: 'Carlos Rodriguez',
        avatar: '/images/avatars/carlos.jpg',
        country: 'Spain'
      },
      gig: {
        title: 'Managing and optimizing paid advertising campaigns',
        image: '/images/services/paid-advertising.jpg'
      },
      orderDate: '2023-10-18',
      amount: 680,
      status: 'in_progress',
      isPaid: true
    }
  ];

  // Filter sales based on time
  const getFilteredSales = () => {
    let filtered = [...sales];
    
    // Time filter
    if (timeFilter === 'this-month') {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      filtered = filtered.filter(sale => {
        const date = new Date(sale.orderDate);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      });
    } else if (timeFilter === 'last-month') {
      const now = new Date();
      const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
      const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
      filtered = filtered.filter(sale => {
        const date = new Date(sale.orderDate);
        return date.getMonth() === lastMonth && date.getFullYear() === year;
      });
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(sale => sale.status === statusFilter);
    }
    
    return filtered;
  };

  const filteredSales = getFilteredSales();
  
  // Calculate statistics
  const totalSales = filteredSales.length;
  const totalRevenue = filteredSales.reduce((sum, sale) => sum + (sale.isPaid ? sale.amount : 0), 0);
  const pendingRevenue = filteredSales.reduce((sum, sale) => sum + (!sale.isPaid ? sale.amount : 0), 0);
  const completedSales = filteredSales.filter(sale => sale.status === 'completed').length;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Status badge style
  const getStatusBadgeClass = (status: Sale['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-medium">Sales Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Manage and track your sales and revenue</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Total Sales</p>
          <p className="text-2xl font-semibold">{totalSales}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Total Revenue</p>
          <p className="text-2xl font-semibold text-green-600">{formatCurrency(totalRevenue)}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Pending Revenue</p>
          <p className="text-2xl font-semibold text-orange-500">{formatCurrency(pendingRevenue)}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Completed Orders</p>
          <p className="text-2xl font-semibold text-blue-600">{completedSales}</p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label htmlFor="time-filter" className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
          <select
            id="time-filter"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as any)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
          >
            <option value="all">All Time</option>
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="in_progress">In Progress</option>
            <option value="delivered">Delivered</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      {/* Sales Table */}
      <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buyer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gig
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No sales found matching your filters
                  </td>
                </tr>
              ) : (
                filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
                          <Image
                            src={sale.buyer.avatar}
                            alt={sale.buyer.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://via.placeholder.com/40?text=User";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{sale.buyer.name}</div>
                          <div className="text-xs text-gray-500">{sale.buyer.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                          <Image
                            src={sale.gig.image}
                            alt={sale.gig.title}
                            width={40}
                            height={40}
                            className="h-10 w-10 object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://via.placeholder.com/40?text=Gig";
                            }}
                          />
                        </div>
                        <div className="ml-4 max-w-xs">
                          <div className="text-sm font-medium text-gray-900 truncate">{sale.gig.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(sale.orderDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(sale.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(sale.status)}`}>
                        {sale.status.replace('_', ' ').charAt(0).toUpperCase() + sale.status.replace('_', ' ').slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sale.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {sale.isPaid ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-orange-500 hover:text-orange-700 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filteredSales.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredSales.length}</span> out of <span className="font-medium">{sales.length}</span> results
          </div>
          <nav className="inline-flex rounded-md shadow-sm">
            <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 border-t border-b border-gray-300 bg-orange-500 text-sm font-medium text-white">
              1
            </button>
            <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
} 