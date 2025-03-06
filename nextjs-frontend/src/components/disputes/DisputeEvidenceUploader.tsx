'use client';

import React, { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea } from '@nextui-org/react';
import { FaFileUpload, FaTrash } from 'react-icons/fa';

interface DisputeEvidenceUploaderProps {
  onUpload: (file: File, description: string) => Promise<void>;
  isLoading?: boolean;
  disputeStatus: 'open' | 'under_review' | 'resolved' | 'closed';
}

const DisputeEvidenceUploader: React.FC<DisputeEvidenceUploaderProps> = ({
  onUpload,
  isLoading = false,
  disputeStatus,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);
  
  const isDisputeActive = disputeStatus === 'open' || disputeStatus === 'under_review';
  
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      try {
        await onUpload(file, description);
        setFile(null);
        setDescription('');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };
  
  if (!isDisputeActive) {
    return (
      <div className="text-center p-4 bg-default-100 rounded-lg">
        <p className="text-default-500">This dispute is {disputeStatus}. No new evidence can be added.</p>
      </div>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-xl font-semibold">Upload Evidence</h3>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardBody className="gap-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              dragActive ? 'border-primary bg-primary-50' : 'border-default-200 hover:border-primary-200'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            {file ? (
              <div className="flex flex-col items-center">
                <FaFileUpload className="text-4xl text-primary mb-2" />
                <p className="font-medium">{file.name}</p>
                <p className="text-small text-default-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <Button
                  color="danger"
                  variant="light"
                  size="sm"
                  startContent={<FaTrash />}
                  className="mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FaFileUpload className="text-4xl text-default-400 mb-2" />
                <p className="font-medium">Drag and drop a file here, or click to select</p>
                <p className="text-small text-default-500 mt-1">
                  Maximum file size: 10MB
                </p>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
          </div>
          
          <Textarea
            label="Description"
            placeholder="Describe what this evidence shows or proves..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={2}
          />
        </CardBody>
        
        <CardFooter className="justify-end">
          <Button
            type="submit"
            color="primary"
            isDisabled={!file || isLoading}
            isLoading={isLoading}
            startContent={<FaFileUpload />}
          >
            Upload Evidence
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DisputeEvidenceUploader; 