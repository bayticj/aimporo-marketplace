import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface DeliverableFile {
  id: number;
  name: string;
  url: string;
  file_type: string;
}

interface Deliverable {
  id: number;
  title: string;
  description: string;
  files: DeliverableFile[];
  created_at: string;
  status: 'pending' | 'accepted' | 'revision_requested';
}

interface QualityCheckItem {
  id: string;
  label: string;
  checked: boolean;
}

interface DeliverableReviewProps {
  deliverable: Deliverable;
  onAccept: (id: number, rating: number, feedback: string) => Promise<void>;
  onRequestRevision: (id: number, feedback: string) => Promise<void>;
}

const DeliverableReview: React.FC<DeliverableReviewProps> = ({
  deliverable,
  onAccept,
  onRequestRevision,
}) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewMode, setReviewMode] = useState<'accept' | 'revision' | null>(null);
  
  // Quality checklist items
  const [qualityChecklist, setQualityChecklist] = useState<QualityCheckItem[]>([
    { id: 'requirements', label: 'Meets all requirements', checked: false },
    { id: 'quality', label: 'High quality execution', checked: false },
    { id: 'complete', label: 'Complete and ready to use', checked: false },
    { id: 'expectations', label: 'Meets or exceeds expectations', checked: false },
    { id: 'format', label: 'Correct format and specifications', checked: false },
  ]);

  const handleChecklistChange = (id: string) => {
    setQualityChecklist(prevList => 
      prevList.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const allChecked = qualityChecklist.every(item => item.checked);
  
  const handleAccept = async () => {
    if (!allChecked) {
      toast.error('Please complete the quality checklist before accepting');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onAccept(deliverable.id, rating, feedback);
      toast.success('Deliverable accepted successfully');
      setReviewMode(null);
      setFeedback('');
    } catch (error) {
      console.error('Error accepting deliverable:', error);
      toast.error('Failed to accept deliverable');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRequestRevision = async () => {
    if (!feedback.trim()) {
      toast.error('Please provide feedback for the revision request');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onRequestRevision(deliverable.id, feedback);
      toast.success('Revision requested successfully');
      setReviewMode(null);
      setFeedback('');
    } catch (error) {
      console.error('Error requesting revision:', error);
      toast.error('Failed to request revision');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderFilePreview = (file: DeliverableFile) => {
    const fileType = file.file_type.toLowerCase();
    
    if (fileType.includes('image')) {
      return (
        <img 
          src={file.url} 
          alt={file.name} 
          className="max-w-full h-auto max-h-96 rounded-md"
        />
      );
    } else if (fileType.includes('pdf')) {
      return (
        <div className="flex items-center justify-center bg-gray-100 p-4 rounded-md">
          <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
            <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
          </svg>
          <span className="ml-2 text-gray-700">{file.name}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center bg-gray-100 p-4 rounded-md">
          <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
          <span className="ml-2 text-gray-700">{file.name}</span>
        </div>
      );
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{deliverable.title}</h2>
        <p className="text-gray-600 mb-4">{deliverable.description}</p>
        
        <div className="text-sm text-gray-500 mb-4">
          Submitted on {new Date(deliverable.created_at).toLocaleDateString()} at {new Date(deliverable.created_at).toLocaleTimeString()}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {deliverable.files.map(file => (
            <div key={file.id} className="border border-gray-200 rounded-md p-3">
              <div className="mb-2">
                {renderFilePreview(file)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium truncate">{file.name}</span>
                <a 
                  href={file.url} 
                  download={file.name}
                  className="text-indigo-600 hover:text-indigo-800 text-sm"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quality Control Checklist */}
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-medium mb-3">Quality Checklist</h3>
        <div className="space-y-2">
          {qualityChecklist.map(item => (
            <div key={item.id} className="flex items-center">
              <input
                type="checkbox"
                id={`quality-${item.id}`}
                checked={item.checked}
                onChange={() => handleChecklistChange(item.id)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor={`quality-${item.id}`} className="ml-2 block text-sm text-gray-700">
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Review Actions */}
      {deliverable.status === 'pending' && (
        <div className="border-t border-gray-200 pt-4">
          {reviewMode === null ? (
            <div className="flex space-x-4">
              <button
                onClick={() => setReviewMode('accept')}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Accept Deliverable
              </button>
              <button
                onClick={() => setReviewMode('revision')}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Request Revision
              </button>
            </div>
          ) : reviewMode === 'accept' ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Accept Deliverable</h3>
              
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <svg
                        className={`h-8 w-8 ${
                          star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Feedback */}
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                  Feedback (Optional)
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Share your thoughts about the deliverable..."
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleAccept}
                  disabled={isSubmitting || !allChecked}
                  className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                    (isSubmitting || !allChecked) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Acceptance'}
                </button>
                <button
                  onClick={() => setReviewMode(null)}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Request Revision</h3>
              
              <div>
                <label htmlFor="revision-feedback" className="block text-sm font-medium text-gray-700 mb-1">
                  Revision Instructions
                </label>
                <textarea
                  id="revision-feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Please explain what changes are needed..."
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleRequestRevision}
                  disabled={isSubmitting || !feedback.trim()}
                  className={`px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${
                    (isSubmitting || !feedback.trim()) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Processing...' : 'Submit Revision Request'}
                </button>
                <button
                  onClick={() => setReviewMode(null)}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      
      {deliverable.status === 'accepted' && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-800">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Deliverable Accepted</span>
          </div>
        </div>
      )}
      
      {deliverable.status === 'revision_requested' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-800">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Revision Requested</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliverableReview; 