'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Badge, 
  Button, 
  Card, 
  CardBody, 
  CardHeader, 
  Chip, 
  Divider, 
  Spinner, 
  Tab, 
  Tabs, 
  Tooltip 
} from '@nextui-org/react';
import { 
  FaArrowLeft, 
  FaExclamationTriangle, 
  FaFileAlt, 
  FaFileUpload, 
  FaArrowUp 
} from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { fetchWithAuth } from '@/services/api';
import DisputeCommentList from '@/components/disputes/DisputeCommentList';
import DisputeEvidenceUploader from '@/components/disputes/DisputeEvidenceUploader';

interface Dispute {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'under_review' | 'resolved' | 'closed';
  type: 'refund' | 'quality' | 'delivery' | 'communication' | 'other';
  created_at: string;
  updated_at: string;
  is_escalated: boolean;
  resolution_notes?: string;
  refund_amount?: number;
  resolved_at?: string;
  order: {
    id: number;
    total_amount: number;
    status: string;
    buyer: {
      id: number;
      name: string;
    };
    seller: {
      id: number;
      name: string;
    };
    gig: {
      id: number;
      title: string;
    };
  };
  user: {
    id: number;
    name: string;
  };
  resolver?: {
    id: number;
    name: string;
  };
  comments: Array<{
    id: number;
    comment: string;
    created_at: string;
    is_admin_comment: boolean;
    is_system_comment: boolean;
    user: {
      id: number;
      name: string;
      avatar?: string;
    };
  }>;
  evidence: Array<{
    id: number;
    file_path: string;
    file_name: string;
    file_type: string;
    description?: string;
    created_at: string;
    file_url: string;
    user: {
      id: number;
      name: string;
    };
  }>;
}

const DisputeDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [dispute, setDispute] = useState<Dispute | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('discussion');
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isUploadingEvidence, setIsUploadingEvidence] = useState(false);
  
  const disputeId = params.id as string;

  const fetchDispute = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetchWithAuth<{ success: boolean; data: Dispute }>(`/api/disputes/${disputeId}`);
      
      if (response.success && response.data) {
        setDispute(response.data);
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

  const handleAddComment = async (comment: string) => {
    if (!dispute) return;
    
    setIsAddingComment(true);
    
    try {
      const response = await fetchWithAuth<{ success: boolean; data: any }>(`/api/disputes/${disputeId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment }),
      });
      
      if (response.success) {
        await fetchDispute(); // Refresh the dispute data
      } else {
        setError('Failed to add comment.');
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment. Please try again later.');
    } finally {
      setIsAddingComment(false);
    }
  };

  const handleUploadEvidence = async (file: File, description: string) => {
    if (!dispute) return;
    
    setIsUploadingEvidence(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', description);
      
      const response = await fetchWithAuth<{ success: boolean; data: any }>(`/api/disputes/${disputeId}/evidence`, {
        method: 'POST',
        body: formData,
        headers: {
          // Don't set Content-Type here, it will be set automatically with the boundary
        },
      });
      
      if (response.success) {
        await fetchDispute(); // Refresh the dispute data
        setActiveTab('evidence'); // Switch to evidence tab
      } else {
        setError('Failed to upload evidence.');
      }
    } catch (err) {
      console.error('Error uploading evidence:', err);
      setError('Failed to upload evidence. Please try again later.');
    } finally {
      setIsUploadingEvidence(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'warning';
      case 'under_review':
        return 'primary';
      case 'resolved':
        return 'success';
      case 'closed':
        return 'default';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'refund':
        return 'danger';
      case 'quality':
        return 'warning';
      case 'delivery':
        return 'primary';
      case 'communication':
        return 'secondary';
      case 'other':
        return 'default';
      default:
        return 'default';
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
            href="/dashboard/disputes"
            color="primary"
            variant="flat"
            className="mt-4"
          >
            Back to Disputes
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
          href="/dashboard/disputes"
          variant="light"
          startContent={<FaArrowLeft />}
          className="mb-4"
        >
          Back to Disputes
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{dispute.title}</h1>
            <p className="text-default-500">
              Dispute #{dispute.id} for Order #{dispute.order.id}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Chip color={getStatusColor(dispute.status)} variant="flat">
              {dispute.status.replace('_', ' ')}
            </Chip>
            <Chip color={getTypeColor(dispute.type)} variant="flat">
              {dispute.type}
            </Chip>
            {dispute.is_escalated && (
              <Chip color="warning" variant="flat" startContent={<FaExclamationTriangle />}>
                Escalated
              </Chip>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold">Dispute Details</h2>
            </CardHeader>
            <CardBody>
              <p className="whitespace-pre-line mb-4">{dispute.description}</p>
              
              {dispute.status === 'resolved' && (
                <div className="bg-success-50 p-4 rounded-lg mt-4">
                  <h3 className="font-semibold text-success-700 mb-2">Resolution</h3>
                  {dispute.resolution_notes && (
                    <p className="text-success-700 mb-2">{dispute.resolution_notes}</p>
                  )}
                  {dispute.refund_amount && dispute.refund_amount > 0 && (
                    <p className="text-success-700">
                      <strong>Refund Amount:</strong> ${dispute.refund_amount.toFixed(2)}
                    </p>
                  )}
                  {dispute.resolver && (
                    <p className="text-success-700 text-sm mt-2">
                      Resolved by {dispute.resolver.name} on {new Date(dispute.resolved_at!).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader>
              <Tabs 
                aria-label="Dispute tabs"
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
              >
                <Tab key="discussion" title="Discussion" />
                <Tab 
                  key="evidence" 
                  title={
                    <div className="flex items-center gap-1">
                      <span>Evidence</span>
                      <Badge content={dispute.evidence.length} color="primary" size="sm">
                        <FaFileAlt />
                      </Badge>
                    </div>
                  } 
                />
              </Tabs>
            </CardHeader>
            <CardBody>
              {activeTab === 'discussion' ? (
                <DisputeCommentList
                  comments={dispute.comments}
                  onAddComment={handleAddComment}
                  isLoading={isAddingComment}
                  disputeStatus={dispute.status}
                />
              ) : (
                <div className="space-y-6">
                  {(dispute.status === 'open' || dispute.status === 'under_review') && (
                    <DisputeEvidenceUploader
                      onUpload={handleUploadEvidence}
                      isLoading={isUploadingEvidence}
                      disputeStatus={dispute.status}
                    />
                  )}
                  
                  <h3 className="text-xl font-semibold">Evidence Files</h3>
                  
                  {dispute.evidence.length === 0 ? (
                    <div className="text-center p-6 bg-default-50 rounded-lg">
                      <p className="text-default-500">No evidence files have been uploaded yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dispute.evidence.map((item) => (
                        <Card key={item.id} className="hover:shadow-md transition-shadow">
                          <CardBody>
                            <div className="flex items-center gap-3 mb-2">
                              <FaFileUpload className="text-primary text-xl" />
                              <div>
                                <p className="font-medium">{item.file_name}</p>
                                <p className="text-tiny text-default-500">
                                  Uploaded by {item.user.name} on {new Date(item.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            {item.description && (
                              <p className="text-sm text-default-700 mt-2">{item.description}</p>
                            )}
                            <Button
                              as="a"
                              href={item.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              color="primary"
                              variant="flat"
                              size="sm"
                              className="mt-3"
                            >
                              View File
                            </Button>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold">Order Information</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Gig</h3>
                  <p>{dispute.order.gig.title}</p>
                </div>
                <Divider />
                <div>
                  <h3 className="font-medium">Buyer</h3>
                  <p>{dispute.order.buyer.name}</p>
                </div>
                <Divider />
                <div>
                  <h3 className="font-medium">Seller</h3>
                  <p>{dispute.order.seller.name}</p>
                </div>
                <Divider />
                <div>
                  <h3 className="font-medium">Order Status</h3>
                  <p>{dispute.order.status}</p>
                </div>
                <Divider />
                <div>
                  <h3 className="font-medium">Order Amount</h3>
                  <p>${dispute.order.total_amount.toFixed(2)}</p>
                </div>
              </div>
              
              <Button
                as={Link}
                href={`/dashboard/orders/${dispute.order.id}`}
                color="primary"
                variant="flat"
                className="mt-4 w-full"
              >
                View Order Details
              </Button>
            </CardBody>
          </Card>
          
          {dispute.status === 'open' && !dispute.is_escalated && (
            <Card>
              <CardHeader className="bg-warning-50">
                <div className="flex items-center gap-2 text-warning-700">
                  <FaExclamationTriangle />
                  <h2 className="text-lg font-semibold">Need Help?</h2>
                </div>
              </CardHeader>
              <CardBody>
                <p className="mb-4">
                  If you can't resolve this dispute directly with the other party,
                  you can escalate it to our support team for review.
                </p>
                <Button
                  as={Link}
                  href={`/dashboard/disputes/${dispute.id}/escalate`}
                  color="warning"
                  startContent={<FaArrowUp />}
                  className="w-full"
                >
                  Escalate Dispute
                </Button>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisputeDetailPage; 