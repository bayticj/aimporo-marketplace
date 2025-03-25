'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

interface Transaction {
  id: string;
  type: 'withdrawal' | 'payment' | 'refund' | 'fee';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
  fromTo: string;
  reference: string;
}

interface PaymentMethod {
  id: string;
  type: 'bank' | 'paypal' | 'card';
  name: string;
  details: string;
  isDefault: boolean;
  lastUsed?: string;
}

export default function PaymentsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'transactions' | 'methods'>('transactions');
  const [timeFilter, setTimeFilter] = useState<'all' | 'this-month' | 'last-month'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'withdrawal' | 'payment' | 'refund' | 'fee'>('all');
  
  // Mock balance data
  const balance = {
    available: 3580.42,
    pending: 750.00,
    total: 4330.42
  };
  
  // Mock transactions data
  const transactions: Transaction[] = [
    {
      id: 'txn-1',
      type: 'payment',
      amount: 780.00,
      status: 'completed',
      date: '2023-10-15',
      description: 'Payment for software development project',
      fromTo: 'Alex Johnson',
      reference: 'ORD-12345'
    },
    {
      id: 'txn-2',
      type: 'withdrawal',
      amount: 1500.00,
      status: 'completed',
      date: '2023-10-10',
      description: 'Withdrawal to bank account',
      fromTo: 'Chase Bank ****1234',
      reference: 'WTH-98765'
    },
    {
      id: 'txn-3',
      type: 'fee',
      amount: 78.00,
      status: 'completed',
      date: '2023-10-15',
      description: 'Platform fee for software development project',
      fromTo: 'Platform',
      reference: 'FEE-12345'
    },
    {
      id: 'txn-4',
      type: 'payment',
      amount: 350.00,
      status: 'pending',
      date: '2023-10-20',
      description: 'Payment for product photography project',
      fromTo: 'Emma Wilson',
      reference: 'ORD-67890'
    },
    {
      id: 'txn-5',
      type: 'refund',
      amount: 125.00,
      status: 'completed',
      date: '2023-09-28',
      description: 'Partial refund for design project',
      fromTo: 'Michael Chen',
      reference: 'RFD-24680'
    },
    {
      id: 'txn-6',
      type: 'withdrawal',
      amount: 2000.00,
      status: 'pending',
      date: '2023-10-22',
      description: 'Withdrawal to PayPal',
      fromTo: 'PayPal account',
      reference: 'WTH-13579'
    }
  ];
  
  // Mock payment methods data
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'pm-1',
      type: 'bank',
      name: 'Chase Bank Account',
      details: '****1234',
      isDefault: true,
      lastUsed: '2023-10-10'
    },
    {
      id: 'pm-2',
      type: 'paypal',
      name: 'PayPal Account',
      details: 'user@example.com',
      isDefault: false,
      lastUsed: '2023-10-22'
    },
    {
      id: 'pm-3',
      type: 'card',
      name: 'Visa Credit Card',
      details: '****5678',
      isDefault: false
    }
  ];

  // Filter transactions
  const getFilteredTransactions = () => {
    let filtered = [...transactions];
    
    // Time filter
    if (timeFilter === 'this-month') {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      filtered = filtered.filter(txn => {
        const date = new Date(txn.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      });
    } else if (timeFilter === 'last-month') {
      const now = new Date();
      const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
      const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
      filtered = filtered.filter(txn => {
        const date = new Date(txn.date);
        return date.getMonth() === lastMonth && date.getFullYear() === year;
      });
    }
    
    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(txn => txn.type === typeFilter);
    }
    
    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get transaction status style
  const getStatusStyle = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get transaction type style and icon
  const getTypeInfo = (type: Transaction['type']) => {
    switch (type) {
      case 'payment':
        return {
          style: 'text-green-600',
          icon: (
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
          prefix: '+'
        };
      case 'withdrawal':
        return {
          style: 'text-orange-600',
          icon: (
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ),
          prefix: '-'
        };
      case 'refund':
        return {
          style: 'text-blue-600',
          icon: (
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          ),
          prefix: '-'
        };
      case 'fee':
        return {
          style: 'text-gray-600',
          icon: (
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          prefix: '-'
        };
      default:
        return {
          style: 'text-gray-600',
          icon: null,
          prefix: ''
        };
    }
  };

  // Get payment method icon
  const getPaymentMethodIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'bank':
        return (
          <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'paypal':
        return (
          <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.076 21H14.4l0.924-4H8.4l0.6-3h5.4l0.6-3h-5.4l0.6-3h7.8c2.786 0 4.8 1.733 4.2 4.5l-1.8 9c-0.515 2.767-2.443 4.5-5.229 4.5h-5.571z" />
            <path d="M19.5 9.5c-0.6 2.767-2.443 4.5-5.229 4.5h-2.571l-1.8 9h-3.6l1.8-9h-3.6l1.8-9h7.8c2.786 0 4.8 1.733 4.2 4.5z" opacity="0.3" />
          </svg>
        );
      case 'card':
        return (
          <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-medium">Payments & Finance</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your earnings, withdrawals, and payment methods</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Available Balance</p>
          <p className="text-2xl font-semibold text-green-600">{formatCurrency(balance.available)}</p>
          <button className="mt-3 px-4 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded-md">
            Withdraw Funds
          </button>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Pending Balance</p>
          <p className="text-2xl font-semibold text-yellow-600">{formatCurrency(balance.pending)}</p>
          <p className="mt-3 text-xs text-gray-500">
            Pending payments are released after order completion
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Total Balance</p>
          <p className="text-2xl font-semibold">{formatCurrency(balance.total)}</p>
          <p className="mt-3 text-xs text-gray-500">
            Total = Available + Pending
          </p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-2 px-1 ${
              activeTab === 'transactions'
                ? 'border-b-2 border-orange-500 text-orange-600 font-medium'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-200 border-b-2 border-transparent'
            }`}
          >
            Transaction History
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`py-2 px-1 ${
              activeTab === 'methods'
                ? 'border-b-2 border-orange-500 text-orange-600 font-medium'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-200 border-b-2 border-transparent'
            }`}
          >
            Payment Methods
          </button>
        </nav>
      </div>
      
      {/* Transactions Tab Content */}
      {activeTab === 'transactions' && (
        <>
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
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
              <select
                id="type-filter"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
              >
                <option value="all">All Types</option>
                <option value="payment">Payments</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="refund">Refunds</option>
                <option value="fee">Fees</option>
              </select>
            </div>
            
            <div className="ml-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1 opacity-0">Export</label>
              <button 
                className="px-4 py-2 border border-gray-300 bg-white rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Export CSV
              </button>
            </div>
          </div>
          
          {/* Transactions Table */}
          <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      From/To
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        No transactions found matching your filters
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((transaction) => {
                      const typeInfo = getTypeInfo(transaction.type);
                      return (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(transaction.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {transaction.description}
                            </div>
                            <div className="text-xs text-gray-500 capitalize">
                              {transaction.type}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.fromTo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.reference}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className={`flex items-center ${typeInfo.style}`}>
                              {typeInfo.icon}
                              {typeInfo.prefix}{formatCurrency(transaction.amount)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(transaction.status)}`}>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      
      {/* Payment Methods Tab Content */}
      {activeTab === 'methods' && (
        <>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Your Payment Methods</h2>
            <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-md">
              Add New Method
            </button>
          </div>
          
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-white p-4 border rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      {getPaymentMethodIcon(method.type)}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-sm font-medium text-gray-900">{method.name}</h3>
                        {method.isDefault && (
                          <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{method.details}</p>
                      {method.lastUsed && (
                        <p className="text-xs text-gray-400 mt-1">Last used: {formatDate(method.lastUsed)}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!method.isDefault && (
                      <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded">
                        Set as Default
                      </button>
                    )}
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-red-600 text-xs font-medium rounded">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">About Payment Methods</h3>
            <p className="text-sm text-gray-600 mb-3">
              You can add multiple payment methods to receive your earnings. The default method will be used automatically for withdrawals.
            </p>
            <p className="text-sm text-gray-600">
              Withdrawal processing time depends on the payment method and typically takes 1-5 business days.
            </p>
          </div>
        </>
      )}
      
      {/* Pagination for Transactions */}
      {activeTab === 'transactions' && filteredTransactions.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredTransactions.length}</span> out of <span className="font-medium">{transactions.length}</span> transactions
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