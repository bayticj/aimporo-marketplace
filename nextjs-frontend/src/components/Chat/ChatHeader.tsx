'use client';

import React from 'react';
import Image from 'next/image';

interface ChatHeaderProps {
  otherUser: {
    id: string;
    name: string;
    avatar?: string;
  };
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ otherUser }) => {
  return (
    <div className="chat-header">
      <div className="user-info">
        <div className="avatar-container">
          {otherUser.avatar ? (
            <Image 
              src={otherUser.avatar} 
              alt={`${otherUser.name}'s avatar`} 
              width={40} 
              height={40} 
              className="user-avatar"
            />
          ) : (
            <div className="default-avatar">
              {otherUser.name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="status-indicator online"></span>
        </div>
        <div className="user-details">
          <h3 className="user-name">{otherUser.name}</h3>
          <span className="user-status">Online</span>
        </div>
      </div>
      <div className="header-actions">
        <button className="action-button" aria-label="Search messages">
          <i className="fas fa-search"></i>
        </button>
        <button className="action-button" aria-label="More options">
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader; 