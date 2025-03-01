'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { orderService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

interface Order {
  id: number;
  gig: {
    id: number;
    title: string;
    price: number;
  };
  buyer: {
    id: number;
    name: string;
  };
  seller: {
    id: number;
    name: string;
  };
  total_amount: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  delivery_date: string;
  created_at: string;
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderService.getOrders();
        setOrders(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch orders');
        // For demo purposes, use sample data if API fails
        const sampleOrders: Order[] = [
          {
            id: 1,
            gig: {
              id: 1,
              title: 'Professional Logo Design',
              price: 49.99,
            },
            buyer: {
              id: 1,
              name: 'John Doe',
            },
            seller: {
              id: 2,
              name: 'CreativeStudio',
            },
            total_amount: 49.99,
            status: 'in_progress',
            delivery_date: '2023-04-15',
            created_at: '2023-04-10',
          },
          {
            id: 2,
            gig: {
              id: 2,
              title: 'WordPress Website Development',
              price: 199.99,
            },
            buyer: {
              id: 1,
              name: 'John Doe',
            },
            seller: {
              id: 3,
              name: 'WebWizards',
            },
            total_amount: 199.99,
            status: 'pending',
            delivery_date: '2023-04-20',
            created_at: '2023-04-05',
          },
          {
            id: 3,
            gig: {
              id: 3,
              title: 'SEO Optimization Package',
              price: 149.99,
            },
            buyer: {
              id: 4,
              name: 'Jane Smith',
            },
            seller: {
              id: 1,
              name: 'John Doe',
            },
            total_amount: 149.99,
            status: 'completed',
            delivery_date: '2023-03-25',
            created_at: '2023-03-15',
          },
        ];
        setOrders(sampleOrders);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'buyer') {
      return order.buyer.id === user?.id;
    } else {
      return order.seller.id === user?.id;
    }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'buyer'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('buyer')}
        >
          Orders I've Placed
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'seller'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('seller')}
        >
          Orders I'm Selling
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gig
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === 'buyer' ? 'Seller' : 'Buyer'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link href={`/gigs/${order.gig.id}`} className="text-orange-600 hover:underline">
                      {order.gig.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activeTab === 'buyer' ? order.seller.name : order.buyer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.total_amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                      {order.status.replace('_', ' ').charAt(0).toUpperCase() + order.status.replace('_', ' ').slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.delivery_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href={`/dashboard/orders/${order.id}`} className="text-orange-600 hover:text-orange-900">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-4">No orders found</h3>
          {activeTab === 'buyer' ? (
            <>
              <p className="text-gray-500 mb-6">You haven't placed any orders yet</p>
              <Link href="/gigs" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
                Browse Gigs
              </Link>
            </>
          ) : (
            <>
              <p className="text-gray-500 mb-6">You don't have any orders to fulfill</p>
              <Link href="/dashboard/gigs/create" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
                Create a Gig
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
} 