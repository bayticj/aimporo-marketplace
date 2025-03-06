'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Card, CardBody, Spinner } from '@nextui-org/react';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { fetchWithAuth } from '@/services/api';
import DisputeEscalationForm from '@/components/disputes/DisputeEscalationForm';

interface Dispute {
  id: number;
  title: string;
  status: string;
  is_escalated: boolean;
}

const DisputeEscalatePage = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [dispute, setDispute] = useState<Dispute | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const disputeId = params.id as string;

  const fetchDispute = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetchWithAuth<{ success: boolean; data: Dispute }>(`/api/disputes/${disputeId}`);
      
      if (response.success && response.data) {
        setDispute(response.data);
        
        // Check if dispute can be escalated
        if (response.data.status !== 'open' || response.data.is_escalated) {
          setError('This dispute cannot be escalated.');
        }
      } else {
        setError('Failed to load dispute details.');
      }
    } catch (err) {
      console.error('Error fetching dispute:', err);
      setError('Failed to load dispute. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDispute();
  }, [disputeId]);

  const handleEscalate = async (data: { reason: string }) => {
    if (!dispute) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetchWithAuth<{ success: boolean; data: any }>(`/api/disputes/${disputeId}/escalate`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      if (response.success) {
        router.push(`/dashboard/disputes/${disputeId}`);
      } else {
        setError('Failed to escalate dispute.');
      }
    } catch (err) {
      console.error('Error escalating dispute:', err);
      setError('Failed to escalate dispute. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !dispute) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-danger-50 text-danger p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2">Error</h3>
          <p>{error || 'Dispute not found'}</p>
          <Button
            as={Link}
            href={`/dashboard/disputes/${disputeId}`}
            color="primary"
            variant="flat"
            className="mt-4"
          >
            Back to Dispute
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          as={Link}
          href={`/dashboard/disputes/${disputeId}`}
          variant="light"
          startContent={<FaArrowLeft />}
          className="mb-4"
        >
          Back to Dispute
        </Button>
        
        <h1 className="text-2xl font-bold">Escalate Dispute: {dispute.title}</h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <DisputeEscalationForm
          disputeId={dispute.id}
          onEscalate={handleEscalate}
          isLoading={isSubmitting}
        />
        
        <Card className="mt-6">
          <CardBody>
            <h3 className="text-lg font-semibold mb-2">What happens when you escalate?</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Our support team will review the dispute within 24-48 hours.</li>
              <li>Both parties will be notified of the escalation.</li>
              <li>The support team may request additional information from either party.</li>
              <li>A final decision will be made based on the evidence and our marketplace policies.</li>
              <li>The decision will be binding and may include refunds or other actions.</li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DisputeEscalatePage; 