'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { orderService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import DeliveryPreview from './DeliveryPreview';
import notificationService from '@/services/notificationService';

interface Deliverable {
  id: number;
  title: string;
  description: string;
  files: DeliverableFile[];
  status: 'pending' | 'submitted' | 'accepted' | 'rejected';
  feedback?: string;
  created_at: string;
  updated_at: string;
  milestone?: boolean;
  deadline?: string;
}

interface DeliverableFile {
  id?: number;
  name: string;
  size: number;
  type: string;
  url?: string;
  preview?: string;
  file?: File;
}

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
    avatar?: string;
  };
  buyer: {
    id: number;
    name: string;
    avatar?: string;
  };
  price: number;
  quantity: number;
  total_price: number;
  status: 'pending' | 'in_progress' | 'delivered' | 'completed' | 'cancelled' | 'revision_requested';
  delivery_date: string;
  created_at: string;
  completed_at: string | null;
  deliverables: Deliverable[];
  requirements?: string;
  milestones: Milestone[];
}

interface Milestone {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed';
  deliverable_id?: number;
  created_at: string;
  updated_at: string;
}

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Deliverable submission state
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [files, setFiles] = useState<DeliverableFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Feedback state
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedbackForm, setShowFeedbackForm] = useState<boolean>(false);
  
  // Milestone state
  const [showMilestoneForm, setShowMilestoneForm] = useState<boolean>(false);
  const [milestoneTitle, setMilestoneTitle] = useState<string>('');
  const [milestoneDescription, setMilestoneDescription] = useState<string>('');
  const [milestoneDeadline, setMilestoneDeadline] = useState<string>('');
  const [isCreatingMilestone, setIsCreatingMilestone] = useState<boolean>(false);
  const [milestoneError, setMilestoneError] = useState<string | null>(null);
  
  // Deliverable state with milestone
  const [isMilestone, setIsMilestone] = useState<boolean>(false);
  const [deliverableDeadline, setDeliverableDeadline] = useState<string>('');
  
  // Preview state
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [previewFiles, setPreviewFiles] = useState<DeliverableFile[]>([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await orderService.getOrder(Number(id));
        // setOrder(response.data);
        
        // For demo purposes, use sample data
        useSampleData();
      } catch (err: any) {
        setError(err.message || 'Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  const useSampleData = () => {
    // Sample data for demonstration
    const sampleOrder: Order = {
      id: Number(id),
      gig: {
        id: 1,
        title: 'Professional Logo Design',
        thumbnail: '/assets/img/banner-img.png',
      },
      seller: {
        id: 2,
        name: 'John Designer',
        avatar: '/assets/img/profiles/avatar-02.jpg',
      },
      buyer: {
        id: 3,
        name: 'Alice Client',
        avatar: '/assets/img/profiles/avatar-03.jpg',
      },
      price: 49.99,
      quantity: 1,
      total_price: 49.99,
      status: 'in_progress',
      delivery_date: '2025-03-15',
      created_at: '2025-03-01',
      completed_at: null,
      deliverables: [
        {
          id: 1,
          title: 'Initial Concept',
          description: 'First draft of logo concepts based on your requirements.',
          files: [
            {
              id: 1,
              name: 'logo-concepts.pdf',
              size: 2500000,
              type: 'application/pdf',
              url: '#',
            }
          ],
          status: 'submitted',
          created_at: '2025-03-05',
          updated_at: '2025-03-05',
          milestone: true,
          deadline: '2025-03-07',
        }
      ],
      requirements: 'I need a modern, minimalist logo for my tech startup. The colors should be blue and gray, and it should convey innovation and trust.',
      milestones: [
        {
          id: 1,
          title: 'Initial Concepts',
          description: 'Provide 3-5 initial logo concepts based on requirements',
          deadline: '2025-03-07',
          status: 'completed',
          deliverable_id: 1,
          created_at: '2025-03-01',
          updated_at: '2025-03-05',
        },
        {
          id: 2,
          title: 'Refined Design',
          description: 'Refine the selected concept with client feedback',
          deadline: '2025-03-10',
          status: 'in_progress',
          created_at: '2025-03-01',
          updated_at: '2025-03-01',
        },
        {
          id: 3,
          title: 'Final Delivery',
          description: 'Deliver final logo files in all required formats',
          deadline: '2025-03-15',
          status: 'pending',
          created_at: '2025-03-01',
          updated_at: '2025-03-01',
        }
      ],
    };
    
    setOrder(sampleOrder);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Validate file types
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/zip'];
      const invalidFiles = newFiles.filter(file => !validTypes.includes(file.type));
      
      if (invalidFiles.length > 0) {
        setSubmitError(`Invalid file type(s): ${invalidFiles.map(f => f.name).join(', ')}. Allowed types: JPEG, PNG, PDF, ZIP.`);
        return;
      }
      
      // Validate file sizes (max 10MB per file)
      const maxSize = 10 * 1024 * 1024; // 10MB
      const oversizedFiles = newFiles.filter(file => file.size > maxSize);
      
      if (oversizedFiles.length > 0) {
        setSubmitError(`File(s) too large: ${oversizedFiles.map(f => f.name).join(', ')}. Maximum size: 10MB per file.`);
        return;
      }
      
      // Generate preview URLs for images
      const filesObj = newFiles.map(file => {
        const fileObj: DeliverableFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          file: file,
        };
        
        // Generate preview URL for images
        if (file.type.startsWith('image/')) {
          fileObj.preview = URL.createObjectURL(file);
        }
        
        return fileObj;
      });
      
      setFiles(prev => [...prev, ...filesObj]);
      setSubmitError(null);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitDeliverable = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setSubmitError('Please provide a title for your deliverable.');
      return;
    }
    
    if (files.length === 0) {
      setSubmitError('Please upload at least one file.');
      return;
    }
    
    if (isMilestone && !deliverableDeadline) {
      setSubmitError('Please provide a deadline for the milestone deliverable.');
      return;
    }
    
    // Show preview instead of submitting immediately
    setPreviewFiles(files.map(file => ({
      ...file,
      // If file is a File object, create a preview URL
      preview: file.file && file.file.type.startsWith('image/') 
        ? URL.createObjectURL(file.file) 
        : undefined
    })));
    setShowPreview(true);
  };

  const handleSubmitAfterPreview = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    setShowPreview(false);
    
    try {
      // Simulate file upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          
          // In a real app, this would be an API call to submit the deliverable
          // const formData = new FormData();
          // formData.append('title', title);
          // formData.append('description', description);
          // files.forEach(file => formData.append('files[]', file));
          // formData.append('is_milestone', isMilestone.toString());
          // if (isMilestone) formData.append('deadline', deliverableDeadline);
          // const response = await orderService.submitDeliverable(Number(id), formData);
          // const deliverableId = response.data.id;
          
          // For demo purposes, update the local state
          if (order) {
            const newDeliverable: Deliverable = {
              id: Math.floor(Math.random() * 1000),
              title,
              description,
              files: files.map(file => ({
                id: Math.floor(Math.random() * 1000),
                name: file.name,
                size: file.size,
                type: file.type,
                url: '#',
              })),
              status: 'submitted',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              milestone: isMilestone,
              deadline: isMilestone ? deliverableDeadline : undefined,
            };
            
            // If this is a milestone deliverable, update the milestone status
            let updatedMilestones = [...order.milestones];
            if (isMilestone) {
              const milestoneIndex = updatedMilestones.findIndex(m => 
                m.title.toLowerCase() === title.toLowerCase() && m.status !== 'completed'
              );
              
              if (milestoneIndex !== -1) {
                updatedMilestones[milestoneIndex] = {
                  ...updatedMilestones[milestoneIndex],
                  status: 'completed',
                  deliverable_id: newDeliverable.id,
                  updated_at: new Date().toISOString(),
                };
              }
            }
            
            setOrder({
              ...order,
              deliverables: [...order.deliverables, newDeliverable],
              status: 'delivered',
              milestones: updatedMilestones,
            });
            
            // Create a delivery notification for the buyer
            // In a real app, this would be handled by the backend
            // await notificationService.createDeliveryNotification(Number(id), newDeliverable.id);
            
            // Reset form
            setTitle('');
            setDescription('');
            setFiles([]);
            setUploadProgress(0);
            setIsMilestone(false);
            setDeliverableDeadline('');
          }
        }
      }, 300);
      
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit deliverable');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitFeedback = async (deliverableId: number, status: 'accepted' | 'rejected') => {
    if (status === 'rejected' && !feedback.trim()) {
      setSubmitError('Please provide feedback for the rejection.');
      return;
    }
    
    try {
      // In a real app, this would be an API call to submit feedback
      // await orderService.submitFeedback(Number(id), deliverableId, { status, feedback });
      
      // For demo purposes, update the local state
      if (order) {
        const updatedDeliverables = order.deliverables.map(deliverable => 
          deliverable.id === deliverableId 
            ? { ...deliverable, status, feedback, updated_at: new Date().toISOString() } 
            : deliverable
        );
        
        setOrder({
          ...order,
          deliverables: updatedDeliverables,
          status: status === 'accepted' ? 'completed' : 'revision_requested',
          completed_at: status === 'accepted' ? new Date().toISOString() : null,
        });
        
        setFeedback('');
        setShowFeedbackForm(false);
      }

      // Create a notification for the seller
      if (status === 'accepted') {
        // In a real app, this would be handled by the backend
        // await notificationService.createCompletionNotification(Number(id));
      } else if (status === 'rejected') {
        // In a real app, this would be handled by the backend
        // await notificationService.createRevisionNotification(Number(id), deliverableId, feedback);
      }
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit feedback');
    }
  };

  const handleCreateMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!milestoneTitle.trim()) {
      setMilestoneError('Please provide a title for the milestone.');
      return;
    }
    
    if (!milestoneDeadline) {
      setMilestoneError('Please provide a deadline for the milestone.');
      return;
    }
    
    setIsCreatingMilestone(true);
    setMilestoneError(null);
    
    try {
      // In a real app, this would be an API call to create a milestone
      // await orderService.createMilestone(Number(id), {
      //   title: milestoneTitle,
      //   description: milestoneDescription,
      //   deadline: milestoneDeadline,
      // });
      
      // For demo purposes, update the local state
      if (order) {
        const newMilestone: Milestone = {
          id: Math.floor(Math.random() * 1000),
          title: milestoneTitle,
          description: milestoneDescription,
          deadline: milestoneDeadline,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        setOrder({
          ...order,
          milestones: [...order.milestones, newMilestone],
        });
        
        // Reset form
        setMilestoneTitle('');
        setMilestoneDescription('');
        setMilestoneDeadline('');
        setShowMilestoneForm(false);
      }

      // Schedule reminders for the milestone
      // In a real app, this would be handled by the backend
      // await notificationService.scheduleReminders(newMilestone.id, [1, 3, 7]); // Remind 1, 3, and 7 days before deadline
    } catch (err: any) {
      setMilestoneError(err.message || 'Failed to create milestone');
    } finally {
      setIsCreatingMilestone(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'revision_requested':
        return 'bg-purple-100 text-purple-800';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMilestoneStatus = (milestone: Milestone) => {
    const deadlineDate = new Date(milestone.deadline);
    const today = new Date();
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (milestone.status === 'completed') {
      return { text: 'Completed', class: 'bg-green-100 text-green-800' };
    } else if (milestone.status === 'in_progress') {
      if (daysUntilDeadline < 0) {
        return { text: 'Overdue', class: 'bg-red-100 text-red-800' };
      } else if (daysUntilDeadline <= 2) {
        return { text: 'Due Soon', class: 'bg-yellow-100 text-yellow-800' };
      } else {
        return { text: 'In Progress', class: 'bg-blue-100 text-blue-800' };
      }
    } else {
      if (daysUntilDeadline < 0) {
        return { text: 'Missed', class: 'bg-red-100 text-red-800' };
      } else if (daysUntilDeadline <= 2) {
        return { text: 'Due Soon', class: 'bg-yellow-100 text-yellow-800' };
      } else {
        return { text: 'Pending', class: 'bg-gray-100 text-gray-800' };
      }
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDeadline < 0) {
      return `${Math.abs(daysUntilDeadline)} days overdue`;
    } else if (daysUntilDeadline === 0) {
      return 'Due today';
    } else if (daysUntilDeadline === 1) {
      return 'Due tomorrow';
    } else {
      return `${daysUntilDeadline} days remaining`;
    }
  };

  const isSeller = user?.id === order?.seller.id;
  const isBuyer = user?.id === order?.buyer.id;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => router.back()} 
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-4">Order not found</div>
        <Link 
          href="/dashboard/orders" 
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order #{order.id}</h1>
        <Link 
          href="/dashboard/orders" 
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back to Orders
        </Link>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Gig:</span>
                <span className="font-medium">{order.gig.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium">${order.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium">{order.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-medium">${order.total_price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                  {order.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Timeline</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium">{new Date(order.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Due:</span>
                <span className="font-medium">{new Date(order.delivery_date).toLocaleDateString()}</span>
              </div>
              {order.completed_at && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-medium">{new Date(order.completed_at).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      {order.requirements && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Requirements</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="whitespace-pre-line">{order.requirements}</p>
          </div>
        </div>
      )}

      {/* Milestones */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Milestones</h2>
          {isSeller && !showMilestoneForm && (
            <button
              onClick={() => setShowMilestoneForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Add Milestone
            </button>
          )}
        </div>
        
        {showMilestoneForm && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
            <h3 className="text-lg font-semibold mb-4">Create New Milestone</h3>
            
            <form onSubmit={handleCreateMilestone}>
              <div className="mb-4">
                <label htmlFor="milestone-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="milestone-title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Initial Concepts"
                  value={milestoneTitle}
                  onChange={(e) => setMilestoneTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="milestone-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="milestone-description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Describe what should be delivered in this milestone..."
                  value={milestoneDescription}
                  onChange={(e) => setMilestoneDescription(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="milestone-deadline" className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline *
                </label>
                <input
                  type="date"
                  id="milestone-deadline"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={milestoneDeadline}
                  onChange={(e) => setMilestoneDeadline(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              {milestoneError && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                  {milestoneError}
                </div>
              )}
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isCreatingMilestone}
                  className={`px-4 py-2 text-white rounded-lg transition-colors ${
                    isCreatingMilestone 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isCreatingMilestone ? 'Creating...' : 'Create Milestone'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowMilestoneForm(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        
        {order?.milestones.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-500 mb-2">No milestones defined yet</p>
            {isSeller && (
              <p className="text-sm">Create milestones to break down the project into manageable steps.</p>
            )}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Milestone
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deliverable
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order?.milestones.map((milestone) => {
                    const statusInfo = getMilestoneStatus(milestone);
                    const deliverable = order.deliverables.find(d => d.id === milestone.deliverable_id);
                    
                    return (
                      <tr key={milestone.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{milestone.title}</div>
                          {milestone.description && (
                            <div className="text-sm text-gray-500">{milestone.description}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{new Date(milestone.deadline).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">{getDaysUntilDeadline(milestone.deadline)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.class}`}>
                            {statusInfo.text}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {deliverable ? (
                            <a 
                              href="#deliverables" 
                              className="text-blue-600 hover:text-blue-800"
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('deliverables')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                            >
                              View Deliverable
                            </a>
                          ) : (
                            isSeller && milestone.status !== 'completed' ? (
                              <button
                                onClick={() => {
                                  setTitle(milestone.title);
                                  setDescription(milestone.description);
                                  setIsMilestone(true);
                                  setDeliverableDeadline(milestone.deadline);
                                  document.getElementById('deliverable-form')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="text-orange-600 hover:text-orange-800"
                              >
                                Submit Deliverable
                              </button>
                            ) : (
                              <span>Not submitted</span>
                            )
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Deliverables */}
      <div className="mb-8" id="deliverables">
        <h2 className="text-xl font-semibold mb-4">Deliverables</h2>
        
        {order.deliverables.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-500 mb-2">No deliverables yet</p>
            {isSeller && (
              <p className="text-sm">Submit your work using the form below.</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {order.deliverables.map((deliverable) => (
              <div key={deliverable.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{deliverable.title}</h3>
                      <p className="text-gray-500 text-sm">
                        Submitted on {new Date(deliverable.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(deliverable.status)}`}>
                      {deliverable.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                {deliverable.description && (
                  <div className="p-4 border-b border-gray-200">
                    <p className="whitespace-pre-line">{deliverable.description}</p>
                  </div>
                )}
                
                <div className="p-4">
                  <h4 className="font-medium mb-2">Files</h4>
                  <ul className="space-y-2">
                    {deliverable.files.map((file) => (
                      <li key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{file.name}</span>
                          <span className="ml-2 text-xs text-gray-500">({formatFileSize(file.size)})</span>
                        </div>
                        <a 
                          href={file.url} 
                          download={file.name}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Download
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {deliverable.feedback && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <h4 className="font-medium mb-2">Feedback</h4>
                    <p className="whitespace-pre-line">{deliverable.feedback}</p>
                  </div>
                )}
                
                {/* Buyer actions for submitted deliverables */}
                {isBuyer && deliverable.status === 'submitted' && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    {!showFeedbackForm ? (
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleSubmitFeedback(deliverable.id, 'accepted')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Accept Delivery
                        </button>
                        <button 
                          onClick={() => setShowFeedbackForm(true)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Request Revision
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmitFeedback(deliverable.id, 'rejected');
                      }}>
                        <div className="mb-4">
                          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                            Revision Feedback
                          </label>
                          <textarea
                            id="feedback"
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Please explain what needs to be revised..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex space-x-3">
                          <button 
                            type="submit"
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Submit Revision Request
                          </button>
                          <button 
                            type="button"
                            onClick={() => setShowFeedbackForm(false)}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Deliverable Submission Form (for sellers only) */}
      {isSeller && order?.status !== 'completed' && order?.status !== 'cancelled' && !showPreview && (
        <div className="bg-white border border-gray-200 rounded-lg p-6" id="deliverable-form">
          <h2 className="text-xl font-semibold mb-4">Submit Deliverable</h2>
          
          <form onSubmit={handleSubmitDeliverable}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Final Logo Design"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Describe what you're delivering..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is-milestone"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  checked={isMilestone}
                  onChange={(e) => setIsMilestone(e.target.checked)}
                />
                <label htmlFor="is-milestone" className="ml-2 block text-sm text-gray-700">
                  This is a milestone deliverable
                </label>
              </div>
            </div>
            
            {isMilestone && (
              <div className="mb-4">
                <label htmlFor="deliverable-deadline" className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline *
                </label>
                <input
                  type="date"
                  id="deliverable-deadline"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={deliverableDeadline}
                  onChange={(e) => setDeliverableDeadline(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required={isMilestone}
                />
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Files *
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Upload Files
                </label>
                <p className="mt-2 text-xs text-gray-500">
                  Allowed file types: JPEG, PNG, PDF, ZIP. Max size: 10MB per file.
                </p>
              </div>
              
              {files.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{file.name}</span>
                        <span className="ml-2 text-xs text-gray-500">({formatFileSize(file.size)})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {submitError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                {submitError}
              </div>
            )}
            
            {isSubmitting && (
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-orange-600 h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 py-2 text-white rounded-lg transition-colors ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Deliverable'}
            </button>
          </form>
        </div>
      )}

      {/* Deliverable Preview */}
      {showPreview && (
        <DeliveryPreview
          title={title}
          description={description}
          files={previewFiles}
          isMilestone={isMilestone}
          milestoneDeadline={deliverableDeadline}
          onSubmit={handleSubmitAfterPreview}
          onEdit={() => setShowPreview(false)}
          onCancel={() => {
            setShowPreview(false);
            // Clean up any created object URLs to prevent memory leaks
            previewFiles.forEach(file => {
              if (file.preview && file.file) {
                URL.revokeObjectURL(file.preview);
              }
            });
          }}
        />
      )}
    </div>
  );
} 