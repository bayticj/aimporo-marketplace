'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/context/SocketContext';
import { useAuth } from '@/context/AuthContext';
import axios from '@/services/api';
import { mockMessageService } from '@/services/mockMessages';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './ChatStyles.css';

interface ChatContainerProps {
  orderId: string;
  otherUser: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  order_id: string;
  content: string;
  message_type: string;
  file_url?: string;
  file_name?: string;
  file_type?: string;
  is_read: boolean;
  read_at?: string;
  is_system_message: boolean;
  created_at: string;
  updated_at: string;
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface MessageEvent {
  id: string;
  sender_id: string;
  recipient_id: string;
  order_id: string;
  content: string;
  message_type: string;
  file_url?: string;
  file_name?: string;
  file_type?: string;
  is_read: boolean;
  read_at?: string;
  is_system_message: boolean;
  created_at: string;
  updated_at: string;
  orderId: string;
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface TypingEvent {
  userId: string;
  username: string;
  isTyping: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ orderId, otherUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { socket, isConnected, joinRoom, leaveRoom, sendMessage, setTyping } = useSocket();

  // Fetch messages when component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        // Use mock service instead of real API
        const response = await mockMessageService.getOrderMessages(orderId);
        setMessages(response.messages);
        setError(null);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [orderId]);

  // Join the chat room when component mounts
  useEffect(() => {
    if (isConnected) {
      joinRoom(orderId);
    }

    return () => {
      if (isConnected) {
        leaveRoom(orderId);
      }
    };
  }, [isConnected, joinRoom, leaveRoom, orderId]);

  // Listen for new messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data: MessageEvent) => {
      // Only add the message if it's not already in the list
      setMessages(prevMessages => {
        const messageExists = prevMessages.some(msg => msg.id === data.id);
        if (messageExists) return prevMessages;
        
        // Convert MessageEvent to Message
        const newMessage: Message = {
          id: data.id,
          sender_id: data.sender_id,
          recipient_id: data.recipient_id,
          order_id: data.order_id,
          content: data.content,
          message_type: data.message_type,
          file_url: data.file_url,
          file_name: data.file_name,
          file_type: data.file_type,
          is_read: data.is_read,
          read_at: data.read_at,
          is_system_message: data.is_system_message,
          created_at: data.created_at,
          updated_at: data.updated_at,
          sender: data.sender
        };
        
        return [...prevMessages, newMessage];
      });
    };

    const handleTyping = (data: TypingEvent) => {
      if (data.userId !== user?.id?.toString()) {
        setIsTyping(data.isTyping);
        setTypingUser(data.isTyping ? data.username : null);
      }
    };

    socket.on('receive-message', handleNewMessage);
    socket.on('user-typing', handleTyping);

    return () => {
      socket.off('receive-message', handleNewMessage);
      socket.off('user-typing', handleTyping);
    };
  }, [socket, user]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mark messages as read
  useEffect(() => {
    const markMessagesAsRead = async () => {
      try {
        const unreadMessages = messages.filter(
          msg => !msg.is_read && msg.sender_id !== user?.id?.toString()
        );

        for (const msg of unreadMessages) {
          // Use mock service instead of real API
          await mockMessageService.markAsRead(msg.id);
        }

        // Update local state to mark messages as read
        if (unreadMessages.length > 0) {
          setMessages(prevMessages =>
            prevMessages.map(msg =>
              !msg.is_read && msg.sender_id !== user?.id?.toString()
                ? { ...msg, is_read: true, read_at: new Date().toISOString() }
                : msg
            )
          );
        }
      } catch (err) {
        console.error('Error marking messages as read:', err);
      }
    };

    if (messages.length > 0 && user) {
      markMessagesAsRead();
    }
  }, [messages, user]);

  const handleSendMessage = async (content: string, attachment?: File) => {
    if (!user || !content.trim()) return;

    try {
      let fileUrl = '';
      let fileName = '';
      let fileType = '';

      // Handle file upload if attachment exists
      if (attachment) {
        const formData = new FormData();
        formData.append('file', attachment);
        formData.append('order_id', orderId);

        // In a real app, we would upload the file to the server
        // For now, we'll just simulate it
        fileUrl = URL.createObjectURL(attachment);
        fileName = attachment.name;
        fileType = attachment.type;
      }

      // Use mock service instead of real API
      const response = await mockMessageService.sendMessage(
        orderId, 
        content,
        fileUrl,
        fileName,
        fileType
      );

      const newMessage = response.data;

      // Add message to local state
      setMessages(prevMessages => [...prevMessages, newMessage]);

      // Send message through socket
      sendMessage({
        ...newMessage,
        orderId,
      });

      // Reset typing indicator
      setTyping(orderId, false);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    }
  };

  const handleTyping = (isTyping: boolean) => {
    setTyping(orderId, isTyping);
  };

  if (loading) {
    return <div className="chat-loading">Loading messages...</div>;
  }

  if (error) {
    return <div className="chat-error">{error}</div>;
  }

  return (
    <div className="chat-container">
      <ChatHeader otherUser={otherUser} />
      
      <MessageList 
        messages={messages} 
        currentUserId={user?.id?.toString() || ''} 
        isTyping={isTyping}
        typingUser={typingUser}
      />
      
      <div ref={messagesEndRef} />
      
      <MessageInput 
        onSendMessage={handleSendMessage} 
        onTyping={handleTyping}
      />
    </div>
  );
};

export default ChatContainer; 