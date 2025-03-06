'use client';

import React, { useState, useRef, useEffect } from 'react';

interface MessageInputProps {
  onSendMessage: (content: string, attachment?: File) => void;
  onTyping: (isTyping: boolean) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, onTyping }) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle typing indicator
  useEffect(() => {
    if (message.trim() && !typingTimeoutRef.current) {
      onTyping(true);
      typingTimeoutRef.current = setTimeout(() => {
        onTyping(false);
        typingTimeoutRef.current = null;
      }, 3000);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    };
  }, [message, onTyping]);

  const handleSendMessage = () => {
    if (message.trim() || attachment) {
      onSendMessage(message, attachment || undefined);
      setMessage('');
      setAttachment(null);
      onTyping(false);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const removeAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="message-input-container">
      {attachment && (
        <div className="attachment-preview">
          <div className="attachment-info">
            <i className="fas fa-file attachment-icon"></i>
            <span className="attachment-name">{attachment.name}</span>
            <span className="attachment-size">({(attachment.size / 1024).toFixed(2)} KB)</span>
          </div>
          <button 
            className="remove-attachment" 
            onClick={removeAttachment}
            aria-label="Remove attachment"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
      
      <div className="message-input-wrapper">
        <button 
          className="emoji-button" 
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          aria-label="Add emoji"
        >
          <i className="fas fa-smile"></i>
        </button>
        
        <textarea
          className="message-input"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={1}
        />
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/*,application/pdf,video/*,audio/*"
        />
        
        <button 
          className="attachment-button" 
          onClick={handleAttachmentClick}
          aria-label="Add attachment"
        >
          <i className="fas fa-paperclip"></i>
        </button>
        
        <button 
          className="send-button" 
          onClick={handleSendMessage}
          disabled={!message.trim() && !attachment}
          aria-label="Send message"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
      
      {showEmojiPicker && (
        <div className="emoji-picker">
          {/* Emoji picker would go here - for simplicity, we'll just show some common emojis */}
          <div className="emoji-grid">
            {['😀', '😂', '😍', '🥰', '😊', '👍', '❤️', '🎉', '🔥', '👏', '🙏', '🤔', '😢', '😎', '🤣'].map(emoji => (
              <button 
                key={emoji} 
                className="emoji-item" 
                onClick={() => {
                  setMessage(prev => prev + emoji);
                  setShowEmojiPicker(false);
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageInput; 