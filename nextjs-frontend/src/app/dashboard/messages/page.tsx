'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from '@/services/api';
import { mockMessageService } from '@/services/mockMessages';
import ChatContainer from '@/components/Chat/ChatContainer';
import { Card, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import Image from 'next/image';
import './messages.css';

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

const MessagesPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        
        // Use mock service instead of real API
        const response = await mockMessageService.getConversations();
        setConversations(response.conversations);
        
        // Select the first conversation by default if available
        if (response.conversations.length > 0) {
          setSelectedConversation(response.conversations[0]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError('Failed to load conversations. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchConversations();
    }
  }, [user]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Today - show time
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      // Yesterday
      return 'Yesterday';
    } else if (diffDays < 7) {
      // Within a week - show day name
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      // Older - show date
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    
    // Update local state to mark conversation as read
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.order_id === conversation.order_id
          ? { ...conv, unread_count: 0 }
          : conv
      )
    );
  };

  if (loading && !selectedConversation) {
    return (
      <div className="messages-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading conversations...</p>
      </div>
    );
  }

  if (error && !selectedConversation) {
    return (
      <div className="messages-error">
        <i className="fas fa-exclamation-circle error-icon"></i>
        <p>{error}</p>
        <button 
          className="btn btn-primary mt-3" 
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (conversations.length === 0 && !loading) {
    return (
      <div className="messages-empty">
        <i className="fas fa-comments empty-icon"></i>
        <h3>No Conversations Yet</h3>
        <p>When you start a conversation with a buyer or seller, it will appear here.</p>
      </div>
    );
  }

  return (
    <div className="messages-page">
      <h1 className="page-title">Messages</h1>
      
      <Card className="messages-container">
        <Row className="g-0 h-100">
          {/* Conversations List */}
          <Col md={4} className="conversations-column">
            <div className="conversations-header">
              <h2>Conversations</h2>
            </div>
            
            <ListGroup className="conversations-list">
              {conversations.map(conversation => (
                <ListGroup.Item 
                  key={conversation.order_id}
                  active={selectedConversation?.order_id === conversation.order_id}
                  onClick={() => handleSelectConversation(conversation)}
                  className="conversation-item"
                >
                  <div className="conversation-avatar">
                    {conversation.other_user.avatar ? (
                      <Image 
                        src={conversation.other_user.avatar} 
                        alt={`${conversation.other_user.name}'s avatar`} 
                        width={48} 
                        height={48} 
                        className="user-avatar-medium"
                      />
                    ) : (
                      <div className="default-avatar-medium">
                        {conversation.other_user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  <div className="conversation-details">
                    <div className="conversation-header">
                      <h3 className="conversation-name">{conversation.other_user.name}</h3>
                      <span className="conversation-time">
                        {conversation.last_message 
                          ? formatTime(conversation.last_message.created_at) 
                          : formatTime(conversation.updated_at)}
                      </span>
                    </div>
                    
                    <p className="conversation-preview">
                      {truncateText(conversation.last_message?.content || 'New conversation', 40)}
                    </p>
                    
                    <div className="conversation-footer">
                      <span className="conversation-gig">{truncateText(conversation.gig_title, 25)}</span>
                      {conversation.unread_count > 0 && (
                        <Badge bg="primary" className="unread-badge">
                          {conversation.unread_count}
                        </Badge>
                      )}
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          
          {/* Chat Container */}
          <Col md={8} className="chat-column">
            {selectedConversation ? (
              <ChatContainer 
                orderId={selectedConversation.order_id} 
                otherUser={selectedConversation.other_user}
              />
            ) : (
              <div className="select-conversation-prompt">
                <i className="fas fa-comments prompt-icon"></i>
                <h3>Select a Conversation</h3>
                <p>Choose a conversation from the list to start chatting.</p>
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default MessagesPage; 