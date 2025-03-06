'use client';

import React from 'react';
import Image from 'next/image';

interface Message {
  id: string;
  sender_id: string;
  content: string;
  message_type: string;
  file_url?: string;
  file_name?: string;
  file_type?: string;
  is_read: boolean;
  is_system_message: boolean;
  created_at: string;
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  isTyping: boolean;
  typingUser: string | null;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  currentUserId, 
  isTyping, 
  typingUser 
}) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderFileAttachment = (message: Message) => {
    if (!message.file_url) return null;

    const isImage = message.file_type?.startsWith('image/');
    const isPdf = message.file_type === 'application/pdf';
    const isVideo = message.file_type?.startsWith('video/');
    const isAudio = message.file_type?.startsWith('audio/');

    if (isImage) {
      return (
        <div className="message-attachment image-attachment">
          <a href={message.file_url} target="_blank" rel="noopener noreferrer">
            <Image 
              src={message.file_url} 
              alt={message.file_name || 'Image attachment'} 
              width={200} 
              height={150} 
              className="attachment-preview"
            />
          </a>
        </div>
      );
    }

    if (isPdf) {
      return (
        <div className="message-attachment pdf-attachment">
          <a href={message.file_url} target="_blank" rel="noopener noreferrer" className="file-link">
            <i className="fas fa-file-pdf file-icon"></i>
            <span className="file-name">{message.file_name}</span>
          </a>
        </div>
      );
    }

    if (isVideo) {
      return (
        <div className="message-attachment video-attachment">
          <video controls className="video-preview">
            <source src={message.file_url} type={message.file_type} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    if (isAudio) {
      return (
        <div className="message-attachment audio-attachment">
          <audio controls className="audio-preview">
            <source src={message.file_url} type={message.file_type} />
            Your browser does not support the audio tag.
          </audio>
        </div>
      );
    }

    // Default file attachment
    return (
      <div className="message-attachment file-attachment">
        <a href={message.file_url} target="_blank" rel="noopener noreferrer" className="file-link">
          <i className="fas fa-file file-icon"></i>
          <span className="file-name">{message.file_name}</span>
        </a>
      </div>
    );
  };

  return (
    <div className="message-list">
      {messages.map(message => {
        const isCurrentUser = message.sender_id === currentUserId;
        const messageClass = isCurrentUser ? 'message-sent' : 'message-received';
        
        if (message.is_system_message) {
          return (
            <div key={message.id} className="message-system">
              <div className="message-content">{message.content}</div>
              <div className="message-time">{formatTime(message.created_at)}</div>
            </div>
          );
        }

        return (
          <div key={message.id} className={`message ${messageClass}`}>
            {!isCurrentUser && message.sender && (
              <div className="message-avatar">
                {message.sender.avatar ? (
                  <Image 
                    src={message.sender.avatar} 
                    alt={`${message.sender.name}'s avatar`} 
                    width={32} 
                    height={32} 
                    className="user-avatar-small"
                  />
                ) : (
                  <div className="default-avatar-small">
                    {message.sender.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            )}
            <div className="message-bubble">
              {renderFileAttachment(message)}
              <div className="message-content">{message.content}</div>
              <div className="message-meta">
                <span className="message-time">{formatTime(message.created_at)}</span>
                {isCurrentUser && (
                  <span className="message-status">
                    {message.is_read ? (
                      <i className="fas fa-check-double read-icon"></i>
                    ) : (
                      <i className="fas fa-check sent-icon"></i>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {isTyping && (
        <div className="typing-indicator">
          <div className="typing-avatar">
            <div className="default-avatar-small">
              {typingUser ? typingUser.charAt(0).toUpperCase() : '?'}
            </div>
          </div>
          <div className="typing-bubble">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="typing-text">{typingUser} is typing...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList; 