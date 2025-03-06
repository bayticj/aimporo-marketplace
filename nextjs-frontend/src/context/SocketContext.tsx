'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  order_id: string;
  content: string;
  message_type: string;
  orderId: string;
  [key: string]: any; // For any additional properties
}

interface TypingData {
  orderId: string;
  userId: string;
  username: string;
  isTyping: boolean;
}

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinRoom: (orderId: string) => void;
  leaveRoom: (orderId: string) => void;
  sendMessage: (data: Message) => void;
  setTyping: (orderId: string, isTyping: boolean) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  joinRoom: () => {},
  leaveRoom: () => {},
  sendMessage: () => {},
  setTyping: () => {},
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Only connect if user is authenticated
    if (!user) return;

    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3012', {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    socketInstance.on('connect', () => {
      console.log('Socket connected');
      setIsConnected(true);
      
      // Set user status to online
      socketInstance.emit('status-change', {
        userId: user.id,
        status: 'online'
      });
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      if (socketInstance) {
        // Set user status to offline before disconnecting
        socketInstance.emit('status-change', {
          userId: user.id,
          status: 'offline'
        });
        socketInstance.disconnect();
      }
    };
  }, [user]);

  const joinRoom = (orderId: string) => {
    if (socket && isConnected) {
      socket.emit('join-room', orderId);
    }
  };

  const leaveRoom = (orderId: string) => {
    if (socket && isConnected) {
      socket.emit('leave-room', orderId);
    }
  };

  const sendMessage = (data: Message) => {
    if (socket && isConnected) {
      socket.emit('send-message', data);
    }
  };

  const setTyping = (orderId: string, isTyping: boolean) => {
    if (socket && isConnected && user) {
      const typingData: TypingData = {
        orderId,
        userId: user.id?.toString() || '',
        username: user.name || '',
        isTyping
      };
      socket.emit('typing', typingData);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, isConnected, joinRoom, leaveRoom, sendMessage, setTyping }}>
      {children}
    </SocketContext.Provider>
  );
}; 