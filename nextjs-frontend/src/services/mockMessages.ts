import { v4 as uuidv4 } from 'uuid';

// Define message interface
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
  is_system_message: boolean;
  created_at: string;
  updated_at: string;
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

// Define conversation interface
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

// Define messages record type
interface MessagesRecord {
  [key: string]: Message[];
}

// Mock data for conversations
export const mockConversations: Conversation[] = [
  {
    order_id: '1',
    gig_title: 'Professional Logo Design',
    other_user: {
      id: '2',
      name: 'Jane Smith',
      avatar: '/images/avatars/avatar-2.jpg'
    },
    last_message: {
      content: 'I\'ve sent you the final logo files. Please let me know if you need any revisions!',
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
    },
    unread_count: 2,
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
  },
  {
    order_id: '2',
    gig_title: 'Website Development',
    other_user: {
      id: '3',
      name: 'Michael Johnson',
      avatar: '/images/avatars/avatar-3.jpg'
    },
    last_message: {
      content: 'Can we schedule a call to discuss the website requirements?',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
    },
    unread_count: 0,
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
  },
  {
    order_id: '3',
    gig_title: 'Content Writing',
    other_user: {
      id: '4',
      name: 'Emily Davis',
      avatar: '/images/avatars/avatar-4.jpg'
    },
    last_message: {
      content: 'I\'ve completed the first draft of the article. Would you like to review it?',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
    },
    unread_count: 1,
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
  }
];

// Mock data for messages
export const mockMessages: MessagesRecord = {
  '1': [
    {
      id: uuidv4(),
      sender_id: '2',
      recipient_id: '1',
      order_id: '1',
      content: 'Hi there! I\'m starting work on your logo design today.',
      message_type: 'text',
      is_read: true,
      is_system_message: false,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      sender: {
        id: '2',
        name: 'Jane Smith',
        avatar: '/images/avatars/avatar-2.jpg'
      }
    },
    {
      id: uuidv4(),
      sender_id: '1',
      recipient_id: '2',
      order_id: '1',
      content: 'Great! Looking forward to seeing your work.',
      message_type: 'text',
      is_read: true,
      is_system_message: false,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30).toISOString(), // 2 days ago + 30 minutes
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30).toISOString(),
      sender: {
        id: '1',
        name: 'John Doe',
        avatar: '/images/avatars/avatar-1.jpg'
      }
    },
    {
      id: uuidv4(),
      sender_id: '2',
      recipient_id: '1',
      order_id: '1',
      content: 'I\'ve completed the initial concepts. Here are three options for you to review.',
      message_type: 'text',
      is_read: true,
      is_system_message: false,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      sender: {
        id: '2',
        name: 'Jane Smith',
        avatar: '/images/avatars/avatar-2.jpg'
      }
    },
    {
      id: uuidv4(),
      sender_id: '1',
      recipient_id: '2',
      order_id: '1',
      content: 'These look great! I think I prefer the second option, but could we make the colors a bit more vibrant?',
      message_type: 'text',
      is_read: true,
      is_system_message: false,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
      sender: {
        id: '1',
        name: 'John Doe',
        avatar: '/images/avatars/avatar-1.jpg'
      }
    },
    {
      id: uuidv4(),
      sender_id: '2',
      recipient_id: '1',
      order_id: '1',
      content: 'I\'ve sent you the final logo files. Please let me know if you need any revisions!',
      message_type: 'text',
      is_read: false,
      is_system_message: false,
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      sender: {
        id: '2',
        name: 'Jane Smith',
        avatar: '/images/avatars/avatar-2.jpg'
      }
    }
  ],
  '2': [
    {
      id: uuidv4(),
      sender_id: '3',
      recipient_id: '1',
      order_id: '2',
      content: 'Hello! I\'m excited to work on your website project.',
      message_type: 'text',
      is_read: true,
      is_system_message: false,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      sender: {
        id: '3',
        name: 'Michael Johnson',
        avatar: '/images/avatars/avatar-3.jpg'
      }
    },
    {
      id: uuidv4(),
      sender_id: '1',
      recipient_id: '3',
      order_id: '2',
      content: 'Hi Michael! Thanks for taking on this project. I have some specific requirements I\'d like to discuss.',
      message_type: 'text',
      is_read: true,
      is_system_message: false,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 45).toISOString(), // 3 days ago + 45 minutes
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 45).toISOString(),
      sender: {
        id: '1',
        name: 'John Doe',
        avatar: '/images/avatars/avatar-1.jpg'
      }
    },
    {
      id: uuidv4(),
      sender_id: '3',
      recipient_id: '1',
      order_id: '2',
      content: 'Can we schedule a call to discuss the website requirements?',
      message_type: 'text',
      is_read: true,
      is_system_message: false,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      sender: {
        id: '3',
        name: 'Michael Johnson',
        avatar: '/images/avatars/avatar-3.jpg'
      }
    }
  ],
  '3': [
    {
      id: uuidv4(),
      sender_id: '4',
      recipient_id: '1',
      order_id: '3',
      content: 'Hi! I\'ll be writing the content for your blog posts.',
      message_type: 'text',
      is_read: true,
      is_system_message: false,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      sender: {
        id: '4',
        name: 'Emily Davis',
        avatar: '/images/avatars/avatar-4.jpg'
      }
    },
    {
      id: uuidv4(),
      sender_id: '1',
      recipient_id: '4',
      order_id: '3',
      content: 'Great! I\'ve attached the topics and keywords I\'d like you to focus on.',
      message_type: 'text',
      is_read: true,
      is_system_message: false,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
      sender: {
        id: '1',
        name: 'John Doe',
        avatar: '/images/avatars/avatar-1.jpg'
      }
    },
    {
      id: uuidv4(),
      sender_id: '4',
      recipient_id: '1',
      order_id: '3',
      content: 'I\'ve completed the first draft of the article. Would you like to review it?',
      message_type: 'text',
      is_read: false,
      is_system_message: false,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      sender: {
        id: '4',
        name: 'Emily Davis',
        avatar: '/images/avatars/avatar-4.jpg'
      }
    }
  ]
};

// Mock service functions
export const mockMessageService = {
  getConversations: () => {
    return new Promise<{ conversations: Conversation[] }>((resolve) => {
      setTimeout(() => {
        resolve({ conversations: mockConversations });
      }, 500); // Simulate network delay
    });
  },
  
  getOrderMessages: (orderId: string) => {
    return new Promise<{ messages: Message[] }>((resolve) => {
      setTimeout(() => {
        resolve({ messages: mockMessages[orderId] || [] });
      }, 500); // Simulate network delay
    });
  },
  
  sendMessage: (orderId: string, content: string, fileUrl = '', fileName = '', fileType = '') => {
    return new Promise<{ data: Message }>((resolve) => {
      setTimeout(() => {
        const newMessage: Message = {
          id: uuidv4(),
          sender_id: '1', // Current user
          recipient_id: mockConversations.find(c => c.order_id === orderId)?.other_user.id || '',
          order_id: orderId,
          content,
          message_type: fileUrl ? 'file' : 'text',
          file_url: fileUrl,
          file_name: fileName,
          file_type: fileType,
          is_read: false,
          is_system_message: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          sender: {
            id: '1',
            name: 'John Doe',
            avatar: '/images/avatars/avatar-1.jpg'
          }
        };
        
        // Add to mock data
        if (!mockMessages[orderId]) {
          mockMessages[orderId] = [];
        }
        mockMessages[orderId].push(newMessage);
        
        // Update conversation last message
        const conversation = mockConversations.find(c => c.order_id === orderId);
        if (conversation) {
          conversation.last_message = {
            content,
            created_at: new Date().toISOString()
          };
          conversation.updated_at = new Date().toISOString();
        }
        
        resolve({ data: newMessage });
      }, 500); // Simulate network delay
    });
  },
  
  markAsRead: (messageId: string) => {
    return new Promise<{ message: string }>((resolve) => {
      setTimeout(() => {
        // Find and mark message as read
        Object.keys(mockMessages).forEach(orderId => {
          mockMessages[orderId].forEach(message => {
            if (message.id === messageId) {
              message.is_read = true;
              message.updated_at = new Date().toISOString();
            }
          });
        });
        
        // Update unread counts
        mockConversations.forEach(conversation => {
          const messages = mockMessages[conversation.order_id] || [];
          conversation.unread_count = messages.filter(m => !m.is_read && m.recipient_id === '1').length;
        });
        
        resolve({ message: 'Message marked as read' });
      }, 500); // Simulate network delay
    });
  },
  
  getUnreadCount: () => {
    return new Promise<{ unread_count: number }>((resolve) => {
      setTimeout(() => {
        let count = 0;
        mockConversations.forEach(conversation => {
          count += conversation.unread_count;
        });
        resolve({ unread_count: count });
      }, 500); // Simulate network delay
    });
  }
}; 