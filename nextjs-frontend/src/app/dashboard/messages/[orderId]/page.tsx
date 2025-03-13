'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { mockMessageService } from '@/services/mockMessages';
import ChatContainer from '@/components/Chat/ChatContainer';
import { Card, Row, Col } from 'react-bootstrap';
import { useParams, useRouter } from 'next/navigation';
import '../messages.css';

interface Conversation {
  order_id: string;
  gig_title: string;
  other_user: {
    id: string;
    name: string;
    avatar?: string;
  };
  last_message?: {
    content: string;
    created_at: string;
  };
  unread_count: number;
  updated_at: string;
}

const ConversationPage = () => {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setLoading(true);
        
        // Get the specific conversation
        const response = await mockMessageService.getConversation(orderId);
        
        if (!response.conversation) {
          setError('Conversation not found');
          setLoading(false);
          return;
        }
        
        setConversation(response.conversation);
        
        // Mark all messages in this conversation as read
        await mockMessageService.markConversationAsRead(orderId);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching conversation:', err);
        setError('Failed to load conversation');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchConversation();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading conversation...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Card className="text-center">
          <Card.Body>
            <Card.Title className="text-danger">Error</Card.Title>
            <Card.Text>{error}</Card.Text>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => router.push('/dashboard/messages')}
            >
              Back to Messages
            </button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="p-4">
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Conversation Not Found</Card.Title>
            <Card.Text>The conversation you're looking for doesn't exist or has been removed.</Card.Text>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => router.push('/dashboard/messages')}
            >
              Back to Messages
            </button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="messages-container p-4">
      <Row>
        <Col>
          <Card className="chat-card">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <button 
                  className="btn btn-sm btn-outline-secondary me-3 d-md-none"
                  onClick={() => router.push('/dashboard/messages')}
                >
                  <i className="bi bi-arrow-left"></i>
                </button>
                <h5 className="mb-0">{conversation.gig_title}</h5>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <ChatContainer orderId={orderId} otherUser={conversation.other_user} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ConversationPage; 