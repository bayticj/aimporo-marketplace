'use client';

import React, { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Textarea } from '@nextui-org/react';
import { FaArrowUp, FaExclamationTriangle } from 'react-icons/fa';

interface DisputeEscalationFormProps {
  disputeId: number;
  onEscalate: (data: { reason: string }) => Promise<void>;
  isLoading?: boolean;
}

const DisputeEscalationForm: React.FC<DisputeEscalationFormProps> = ({
  disputeId,
  onEscalate,
  isLoading = false,
}) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!reason.trim()) {
      setError('Please provide a reason for escalation');
      return false;
    }
    
    if (reason.length < 20) {
      setError('Please provide a more detailed explanation (at least 20 characters)');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    try {
      await onEscalate({ reason });
    } catch (error) {
      console.error('Error escalating dispute:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <FaExclamationTriangle className="text-warning text-xl" />
        <div>
          <h2 className="text-xl font-semibold">Escalate Dispute</h2>
          <p className="text-small text-default-500">
            Escalating this dispute will involve our support team for resolution
          </p>
        </div>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardBody className="gap-4">
          <div className="bg-warning-50 p-4 rounded-lg mb-4">
            <p className="text-warning-700">
              <strong>Important:</strong> Before escalating, please ensure you've tried to resolve the issue
              directly with the other party through the dispute comments.
            </p>
          </div>
          
          <Textarea
            label="Reason for Escalation"
            placeholder="Please explain why you need to escalate this dispute and what resolution you're seeking..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            minRows={4}
            errorMessage={error}
            isInvalid={!!error}
          />
          
          <div className="bg-default-50 p-4 rounded-lg">
            <p className="text-small">
              <strong>Note:</strong> Once escalated, our support team will review the dispute and may
              contact both parties for additional information. The final decision will be binding.
            </p>
          </div>
        </CardBody>
        
        <CardFooter className="justify-end">
          <Button
            type="submit"
            color="warning"
            isLoading={isLoading}
            startContent={<FaArrowUp />}
          >
            Escalate Dispute
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DisputeEscalationForm; 