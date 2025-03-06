import React, { useState } from 'react';
import Image from 'next/image';

interface DeliverableFile {
  id?: number;
  name: string;
  size: number;
  type: string;
  url?: string;
  file?: File;
  preview?: string;
}

interface DeliveryPreviewProps {
  title: string;
  description: string;
  files: DeliverableFile[];
  isMilestone: boolean;
  milestoneDeadline?: string;
  onSubmit: () => void;
  onEdit: () => void;
  onCancel: () => void;
}

const DeliveryPreview: React.FC<DeliveryPreviewProps> = ({
  title,
  description,
  files,
  isMilestone,
  milestoneDeadline,
  onSubmit,
  onEdit,
  onCancel,
}) => {
  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const toggleExpand = (fileName: string) => {
    setIsExpanded(prev => ({
      ...prev,
      [fileName]: !prev[fileName],
    }));
  };

  const getFilePreview = (file: DeliverableFile) => {
    const fileType = file.type.split('/')[0];
    
    if (fileType === 'image' && (file.preview || file.url)) {
      return (
        <div className="relative h-40 w-full rounded-md overflow-hidden">
          <Image
            src={file.preview || file.url || ''}
            alt={file.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      );
    } else if (fileType === 'application' && file.type.includes('pdf')) {
      return (
        <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-2 text-sm font-medium">PDF Document</p>
          </div>
        </div>
      );
    } else if (file.type.includes('zip') || file.type.includes('x-zip')) {
      return (
        <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <p className="mt-2 text-sm font-medium">ZIP Archive</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-2 text-sm font-medium">File</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Preview Your Delivery</h2>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Submit Delivery
          </button>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-1">Title</h3>
          <p className="text-gray-700">{title}</p>
        </div>
        
        {description && (
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-1">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
          </div>
        )}
        
        {isMilestone && milestoneDeadline && (
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-1">Milestone Deadline</h3>
            <p className="text-gray-700">{new Date(milestoneDeadline).toLocaleDateString()}</p>
          </div>
        )}
      </div>

      <h3 className="text-lg font-medium mb-3">Files ({files.length})</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <div 
            key={index} 
            className={`border border-gray-200 rounded-lg overflow-hidden ${
              isExpanded[file.name] ? 'col-span-full' : ''
            }`}
          >
            <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="truncate flex-1 font-medium">{file.name}</div>
              <button
                onClick={() => toggleExpand(file.name)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                {isExpanded[file.name] ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
            
            <div className={isExpanded[file.name] ? 'p-4' : 'p-0'}>
              {isExpanded[file.name] ? (
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/3">
                    {getFilePreview(file)}
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="font-medium mb-2">{file.name}</h4>
                    <p className="text-sm text-gray-500 mb-1">Type: {file.type}</p>
                    <p className="text-sm text-gray-500 mb-3">Size: {formatFileSize(file.size)}</p>
                    
                    {file.preview && (
                      <a 
                        href={file.preview} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Preview
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-40">
                  {getFilePreview(file)}
                </div>
              )}
            </div>
            
            <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
              {formatFileSize(file.size)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm text-yellow-700">
              <strong>Important:</strong> Please review your delivery carefully before submitting. Once submitted, the client will be notified and can review your work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPreview; 