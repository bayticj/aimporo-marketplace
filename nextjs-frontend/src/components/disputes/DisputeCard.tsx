'use client';

import React from 'react';
import Link from 'next/link';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Tooltip } from '@nextui-org/react';
import { FaExclamationTriangle, FaEye, FaComments, FaFileUpload, FaArrowUp } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

interface DisputeCardProps {
  dispute: {
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
  };
  isCompact?: boolean;
}

const DisputeCard: React.FC<DisputeCardProps> = ({ dispute, isCompact = false }) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex justify-between items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{dispute.title}</h3>
            {dispute.is_escalated && (
              <Tooltip content="This dispute has been escalated">
                <span>
                  <FaExclamationTriangle className="text-warning" />
                </span>
              </Tooltip>
            )}
          </div>
          <p className="text-small text-default-500">Order #{dispute.order.id}</p>
        </div>
        <div className="flex gap-2">
          <Chip color={getStatusColor(dispute.status)} variant="flat" size="sm">
            {dispute.status.replace('_', ' ')}
          </Chip>
          <Chip color={getTypeColor(dispute.type)} variant="flat" size="sm">
            {dispute.type}
          </Chip>
        </div>
      </CardHeader>
      
      {!isCompact && (
        <CardBody>
          <p className="text-default-700 line-clamp-2">{dispute.description}</p>
          <div className="flex mt-2 gap-3">
            {dispute.comments_count !== undefined && (
              <div className="flex items-center gap-1 text-small text-default-500">
                <FaComments />
                <span>{dispute.comments_count} comments</span>
              </div>
            )}
            {dispute.evidence_count !== undefined && (
              <div className="flex items-center gap-1 text-small text-default-500">
                <FaFileUpload />
                <span>{dispute.evidence_count} evidence files</span>
              </div>
            )}
          </div>
        </CardBody>
      )}
      
      <CardFooter className="flex justify-between items-center">
        <div className="text-small text-default-500">
          {formatDate(dispute.created_at)}
        </div>
        <div className="flex gap-2">
          {dispute.status === 'open' && (
            <Button 
              as={Link}
              href={`/dashboard/disputes/${dispute.id}/escalate`}
              size="sm"
              variant="flat"
              color="warning"
              startContent={<FaArrowUp />}
            >
              Escalate
            </Button>
          )}
          <Button 
            as={Link}
            href={`/dashboard/disputes/${dispute.id}`}
            size="sm"
            variant="flat"
            color="primary"
            startContent={<FaEye />}
          >
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DisputeCard; 