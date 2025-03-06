'use client';

import React, { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { FaExclamationTriangle, FaSave } from 'react-icons/fa';

interface DisputeFormProps {
  orderId: number;
  onSubmit: (data: {
    order_id: number;
    type: string;
    title: string;
    description: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

const disputeTypes = [
  { value: 'refund', label: 'Refund Request' },
  { value: 'quality', label: 'Quality Issue' },
  { value: 'delivery', label: 'Delivery Problem' },
  { value: 'communication', label: 'Communication Issue' },
  { value: 'other', label: 'Other Issue' },
];

const DisputeForm: React.FC<DisputeFormProps> = ({
  orderId,
  onSubmit,
  isLoading = false,
}) => {
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!type) {
      newErrors.type = 'Please select a dispute type';
    }
    
    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
    } else if (title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Please enter a description';
    } else if (description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    try {
      await onSubmit({
        order_id: orderId,
        type,
        title,
        description,
      });
    } catch (error) {
      console.error('Error submitting dispute:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <FaExclamationTriangle className="text-warning text-xl" />
        <div>
          <h2 className="text-xl font-semibold">Open a Dispute</h2>
          <p className="text-small text-default-500">
            Please provide details about the issue with your order
          </p>
        </div>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardBody className="gap-4">
          <Select
            label="Dispute Type"
            placeholder="Select a dispute type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            errorMessage={errors.type}
            isInvalid={!!errors.type}
          >
            {disputeTypes.map((disputeType) => (
              <SelectItem key={disputeType.value} value={disputeType.value}>
                {disputeType.label}
              </SelectItem>
            ))}
          </Select>
          
          <Input
            label="Title"
            placeholder="Brief title describing the issue"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            errorMessage={errors.title}
            isInvalid={!!errors.title}
          />
          
          <Textarea
            label="Description"
            placeholder="Provide detailed information about the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={4}
            errorMessage={errors.description}
            isInvalid={!!errors.description}
          />
          
          <div className="bg-default-50 p-4 rounded-lg">
            <p className="text-small">
              <strong>Note:</strong> Opening a dispute will notify the other party and our support team.
              Please try to resolve the issue through direct communication first.
            </p>
          </div>
        </CardBody>
        
        <CardFooter className="justify-end">
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            startContent={<FaSave />}
          >
            Submit Dispute
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DisputeForm; 