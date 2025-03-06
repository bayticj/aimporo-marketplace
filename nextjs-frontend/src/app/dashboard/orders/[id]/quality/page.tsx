'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import DeliverableReview from '@/components/DeliverableReview';
import AcceptanceCriteria from '@/components/AcceptanceCriteria';
import QualityChecklist from '@/components/QualityChecklist';

// Mock data for demonstration
const mockDeliverable = {
  id: 1,
  title: 'Logo Design Final Delivery',
  description: 'Final logo design with all requested revisions and file formats.',
  files: [
    {
      id: 1,
      name: 'logo_final.png',
      url: '/mock/logo_final.png',
      file_type: 'image/png',
    },
    {
      id: 2,
      name: 'logo_vector.svg',
      url: '/mock/logo_vector.svg',
      file_type: 'image/svg+xml',
    },
    {
      id: 3,
      name: 'brand_guidelines.pdf',
      url: '/mock/brand_guidelines.pdf',
      file_type: 'application/pdf',
    },
  ],
  created_at: '2025-03-07T14:30:00Z',
  status: 'pending',
};

const mockAcceptanceCriteria = [
  {
    id: 'criterion-1',
    description: 'Logo must be provided in both PNG and SVG formats',
  },
  {
    id: 'criterion-2',
    description: 'Logo must work well on both light and dark backgrounds',
  },
  {
    id: 'criterion-3',
    description: 'Brand guidelines document must be included',
  },
  {
    id: 'criterion-4',
    description: 'All files must be properly named according to conventions',
  },
];

const mockQualityCategories = [
  {
    id: 'cat-1',
    name: 'Technical Requirements',
    items: [
      {
        id: 'tech-1',
        label: 'Files are in the correct format',
        checked: false,
        required: true,
      },
      {
        id: 'tech-2',
        label: 'Resolution meets specifications',
        checked: false,
        required: true,
      },
      {
        id: 'tech-3',
        label: 'Color profile is correct',
        checked: false,
        required: false,
      },
    ],
  },
  {
    id: 'cat-2',
    name: 'Design Quality',
    items: [
      {
        id: 'design-1',
        label: 'Design matches project brief',
        checked: false,
        required: true,
      },
      {
        id: 'design-2',
        label: 'Typography is appropriate',
        checked: false,
        required: false,
      },
      {
        id: 'design-3',
        label: 'Color scheme is consistent',
        checked: false,
        required: true,
      },
    ],
  },
  {
    id: 'cat-3',
    name: 'Usability',
    items: [
      {
        id: 'usability-1',
        label: 'Works well at different sizes',
        checked: false,
        required: true,
      },
      {
        id: 'usability-2',
        label: 'Readable in all contexts',
        checked: false,
        required: true,
      },
      {
        id: 'usability-3',
        label: 'Accessible to color-blind users',
        checked: false,
        required: false,
      },
    ],
  },
];

const QualityControlPage = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = Number(params.id);
  
  const [deliverable, setDeliverable] = useState(mockDeliverable);
  const [acceptanceCriteria, setAcceptanceCriteria] = useState(mockAcceptanceCriteria);
  const [qualityCategories, setQualityCategories] = useState(mockQualityCategories);
  const [isQualityComplete, setIsQualityComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch the order, deliverable, criteria, and checklist from API
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [orderId]);
  
  const handleAcceptDeliverable = async (id: number, rating: number, feedback: string) => {
    // In a real app, call API to accept the deliverable
    console.log('Accepting deliverable:', { id, rating, feedback });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update local state
    setDeliverable({
      ...deliverable,
      status: 'accepted',
    });
    
    // Navigate back to order details
    router.push(`/dashboard/orders/${orderId}`);
  };
  
  const handleRequestRevision = async (id: number, feedback: string) => {
    // In a real app, call API to request revision
    console.log('Requesting revision:', { id, feedback });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update local state
    setDeliverable({
      ...deliverable,
      status: 'revision_requested',
    });
    
    // Navigate back to order details
    router.push(`/dashboard/orders/${orderId}`);
  };
  
  const handleSaveCriteria = async (criteria: any[]) => {
    // In a real app, call API to save acceptance criteria
    console.log('Saving criteria:', criteria);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update local state
    setAcceptanceCriteria(criteria);
  };
  
  const handleSaveChecklist = async (categories: any[]) => {
    // In a real app, call API to save quality checklist
    console.log('Saving checklist:', categories);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update local state
    setQualityCategories(categories);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Quality Control</h1>
        <p className="text-gray-600">
          Review the deliverable and ensure it meets all quality standards before accepting.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DeliverableReview
            deliverable={deliverable}
            onAccept={handleAcceptDeliverable}
            onRequestRevision={handleRequestRevision}
          />
        </div>
        
        <div className="space-y-6">
          <AcceptanceCriteria
            orderId={orderId}
            initialCriteria={acceptanceCriteria}
            onSave={handleSaveCriteria}
            readOnly={deliverable.status !== 'pending'}
          />
          
          <QualityChecklist
            categories={qualityCategories}
            onSave={handleSaveChecklist}
            onComplete={setIsQualityComplete}
            readOnly={deliverable.status !== 'pending'}
          />
        </div>
      </div>
    </div>
  );
};

export default QualityControlPage; 