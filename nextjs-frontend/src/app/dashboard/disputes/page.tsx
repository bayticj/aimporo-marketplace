'use client';

import React, { useEffect, useState } from 'react';
import { Button, Chip, Pagination, Select, SelectItem, Spinner, Tab, Tabs } from '@nextui-org/react';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import DisputeCard from '@/components/disputes/DisputeCard';
import { useAuth } from '@/context/AuthContext';
import { fetchWithAuth } from '@/services/api';

interface Dispute {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'under_review' | 'resolved' | 'closed';
  type: 'refund' | 'quality' | 'delivery' | 'communication' | 'other';
  created_at: string;
  updated_at: string;
  is_escalated: boolean;
  order: {
    id: number;
    total_amount: number;
  };
  user: {
    id: number;
    name: string;
  };
  comments_count?: number;
  evidence_count?: number;
}

interface DisputesResponse {
  data: {
    data: Dispute[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

const DisputesPage = () => {
  const { user } = useAuth();
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const fetchDisputes = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Use the API URL from environment variables or default to the API service baseURL
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      let url = `${baseUrl}/disputes?page=${currentPage}`;
      
      if (user && user.roles && user.roles.includes('admin')) {
        url = `${baseUrl}/admin/disputes?page=${currentPage}`;
      }
      
      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`;
      }
      
      if (typeFilter !== 'all') {
        url += `&type=${typeFilter}`;
      }
      
      console.log('Fetching disputes from:', url);
      
      const response = await fetchWithAuth<DisputesResponse>(url);
      console.log('Disputes response:', response);
      
      if (response.data) {
        setDisputes(response.data.data);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.last_page);
      }
    } catch (err) {
      console.error('Error fetching disputes:', err);
      setError('Failed to load disputes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDisputes();
    }
  }, [currentPage, statusFilter, typeFilter, user]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Disputes</h1>
        <Button
          as={Link}
          href="/dashboard/orders"
          color="primary"
          startContent={<FaPlus />}
        >
          Open New Dispute
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Tabs 
            aria-label="Dispute status"
            selectedKey={statusFilter}
            onSelectionChange={(key) => setStatusFilter(key as string)}
          >
            <Tab key="all" title="All" />
            <Tab key="open" title="Open" />
            <Tab key="under_review" title="Under Review" />
            <Tab key="resolved" title="Resolved" />
            <Tab key="closed" title="Closed" />
          </Tabs>
          
          <div className="flex gap-2">
            <Select
              label="Type"
              placeholder="Filter by type"
              value={typeFilter}
              onChange={handleTypeChange}
              className="w-40"
            >
              <SelectItem key="all" value="all">All Types</SelectItem>
              <SelectItem key="refund" value="refund">Refund</SelectItem>
              <SelectItem key="quality" value="quality">Quality</SelectItem>
              <SelectItem key="delivery" value="delivery">Delivery</SelectItem>
              <SelectItem key="communication" value="communication">Communication</SelectItem>
              <SelectItem key="other" value="other">Other</SelectItem>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="bg-danger-50 text-danger p-4 rounded-lg text-center">
            {error}
          </div>
        ) : disputes.length === 0 ? (
          <div className="bg-default-50 p-8 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">No disputes found</h3>
            <p className="text-default-500 mb-4">
              {statusFilter !== 'all' || typeFilter !== 'all'
                ? 'Try changing your filters to see more results.'
                : 'You haven\'t opened any disputes yet.'}
            </p>
            <Button
              as={Link}
              href="/dashboard/orders"
              color="primary"
              variant="flat"
            >
              View Your Orders
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {disputes.map((dispute) => (
              <DisputeCard key={dispute.id} dispute={dispute} />
            ))}
          </div>
        )}

        {!isLoading && disputes.length > 0 && totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination
              total={totalPages}
              initialPage={currentPage}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DisputesPage; 