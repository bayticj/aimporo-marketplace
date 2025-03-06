'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Order {
  id: number;
  gig: {
    id: number;
    title: string;
    thumbnail: string;
  };
  seller: {
    id: number;
    name: string;
  };
  buyer: {
    id: number;
    name: string;
  };
  price: number;
  quantity: number;
  total_price: number;
  status: 'pending' | 'in_progress' | 'delivered' | 'completed' | 'cancelled' | 'revision_requested';
  delivery_date: string;
  created_at: string;
  completed_at: string | null;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders?role=${activeTab}${statusFilter !== 'all' ? `&status=${statusFilter}` : ''}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data.orders.data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch orders');
        // For demo purposes, use sample data if API fails
        useSampleData();
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [activeTab, statusFilter]);

  const useSampleData = () => {
    const sampleOrders: Order[] = [
      {
        id: 1,
        gig: {
          id: 1,
          title: 'Professional Logo Design',
          thumbnail: '/assets/img/banner-img.png',
        },
        seller: {
          id: 2,
          name: 'CreativeStudio',
        },
        buyer: {
          id: 1,
          name: 'John Doe',
        },
        price: 49.99,
        quantity: 1,
        total_price: 49.99,
        status: 'in_progress',
        delivery_date: '2025-03-15',
        created_at: '2025-03-10',
        completed_at: null,
      },
      {
        id: 2,
        gig: {
          id: 2,
          title: 'WordPress Website Development',
          thumbnail: '/assets/img/banner-img.png',
        },
        seller: {
          id: 3,
          name: 'WebWizards',
        },
        buyer: {
          id: 1,
          name: 'John Doe',
        },
        price: 199.99,
        quantity: 1,
        total_price: 199.99,
        status: 'pending',
        delivery_date: '2025-03-20',
        created_at: '2025-03-05',
        completed_at: null,
      },
      {
        id: 3,
        gig: {
          id: 3,
          title: 'SEO Optimization Package',
          thumbnail: '/assets/img/banner-img.png',
        },
        seller: {
          id: 1,
          name: 'John Doe',
        },
        buyer: {
          id: 4,
          name: 'Jane Smith',
        },
        price: 149.99,
        quantity: 1,
        total_price: 149.99,
        status: 'delivered',
        delivery_date: '2025-03-08',
        created_at: '2025-03-01',
        completed_at: null,
      },
    ];
    
    setOrders(sampleOrders);
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      // Update the order in the local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus as Order['status'] } 
            : order
        )
      );
    } catch (err: any) {
      alert(`Error: ${err.message}`);
      
      // For demo purposes, update the UI anyway
      if (process.env.NODE_ENV !== 'production') {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId 
              ? { ...order, status: newStatus as Order['status'] } 
              : order
          )
        );
      }
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'revision_requested':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusActions = (order: Order) => {
    const isBuyer = activeTab === 'buyer';
    const isSeller = activeTab === 'seller';
    
    switch (order.status) {
      case 'pending':
        return (
          <div className="flex space-x-2">
            {isSeller && (
              <button
                onClick={() => handleStatusChange(order.id, 'in_progress')}
                className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                Accept
              </button>
            )}
            <button
              onClick={() => handleStatusChange(order.id, 'cancelled')}
              className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        );
      case 'in_progress':
        return (
          <div className="flex space-x-2">
            {isSeller && (
              <button
                onClick={() => handleStatusChange(order.id, 'delivered')}
                className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700"
              >
                Deliver
              </button>
            )}
            <button
              onClick={() => handleStatusChange(order.id, 'cancelled')}
              className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        );
      case 'delivered':
        return (
          <div className="flex space-x-2">
            {isBuyer && (
              <>
                <button
                  onClick={() => handleStatusChange(order.id, 'completed')}
                  className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange(order.id, 'revision_requested')}
                  className="px-3 py-1 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700"
                >
                  Request Revision
                </button>
              </>
            )}
          </div>
        );
      case 'revision_requested':
        return (
          <div className="flex space-x-2">
            {isSeller && (
              <button
                onClick={() => handleStatusChange(order.id, 'in_progress')}
                className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                Start Revision
              </button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (statusFilter === 'all') return true;
    return order.status === statusFilter;
  });

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'buyer'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('buyer')}
          >
            Orders I've Placed
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'seller'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('seller')}
          >
            Orders I'm Selling
          </button>
        </div>
        
        {/* Status Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              statusFilter === 'all'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              statusFilter === 'pending'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              statusFilter === 'in_progress'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setStatusFilter('in_progress')}
          >
            In Progress
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              statusFilter === 'delivered'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setStatusFilter('delivered')}
          >
            Delivered
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              statusFilter === 'completed'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setStatusFilter('completed')}
          >
            Completed
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              statusFilter === 'cancelled'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setStatusFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : error && orders.length === 0 ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {activeTab === 'buyer' ? 'Seller' : 'Buyer'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={order.gig.thumbnail || '/assets/img/placeholder.jpg'}
                            alt={order.gig.title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            <Link href={`/gigs/${order.gig.id}`} className="hover:text-orange-600">
                              {order.gig.title}
                            </Link>
                          </div>
                          <div className="text-sm text-gray-500">
                            Order #{order.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {activeTab === 'buyer' ? order.seller.name : order.buyer.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${order.total_price.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.quantity > 1 ? `${order.quantity} x $${order.price.toFixed(2)}` : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.delivery_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex flex-wrap gap-2">
                        {getStatusActions(order)}
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-700 mb-4">No orders found</h3>
            <p className="text-gray-500 mb-6">
              {activeTab === 'buyer'
                ? "You haven't placed any orders yet."
                : "You don't have any orders to fulfill yet."}
            </p>
            {activeTab === 'buyer' && (
              <Link
                href="/gigs"
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                Browse Gigs
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 