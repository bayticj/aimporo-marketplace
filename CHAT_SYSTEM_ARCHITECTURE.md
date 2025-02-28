# Chat System Architecture

## Technology Stack

### Real-time Communication
- **Primary Options**:
  - Laravel WebSockets
    - Self-hosted solution
    - Better for scaling
    - Cost-effective
    - Full control
  - Pusher
    - Managed solution
    - Quick setup
    - Built-in dashboard
    - Usage-based pricing

### Backend Components
- **Event Broadcasting**
  - Laravel Echo Server
    - WebSocket server
    - Channel management
    - Authentication
    - Presence channels

- **Message Processing**
  - Laravel Events
    - Real-time broadcasting
    - Event queuing
    - Message formatting

- **Storage Solutions**
  - Primary: PostgreSQL
    - User data
    - Chat metadata
    - Relationships
  - Secondary: MongoDB
    - Chat history
    - Message storage
    - Media metadata
  - Cache: Redis
    - Online status
    - Typing indicators
    - Temporary data
    - Message queue

### Frontend Components
- **WebSocket Client**
  - Laravel Echo
    - Connection management
    - Channel subscription
    - Event handling

- **State Management**
  - TanStack Query
    - Message caching
    - Optimistic updates
    - Real-time sync

- **UI Components**
  - Chat interface
  - Message bubbles
  - Input components
  - Media previews

- **Features**
  - emoji-mart
    - Emoji picker
    - Emoji rendering
  - react-mention
    - @mentions
    - User suggestions
  - react-virtualized
    - Message list virtualization
    - Performance optimization

### File Handling
- **Storage**
  - AWS S3/Cloudinary
    - File storage
    - CDN delivery
    - Image optimization

- **Processing**
  - FFmpeg
    - Video processing
    - Audio processing
    - Thumbnails
  - Sharp
    - Image resizing
    - Format conversion
    - Optimization

## Implementation Details

### Database Schema

```sql
-- Users Table (existing)
users
  id
  name
  avatar
  ...

-- Chat Rooms
chat_rooms
  id
  name
  type (private, group, public)
  created_at
  updated_at

-- Room Members
room_members
  id
  room_id
  user_id
  role (admin, member)
  joined_at
  last_read_at

-- Messages
messages
  id
  room_id
  user_id
  content
  type (text, file, system)
  created_at
  updated_at
  deleted_at

-- Message Attachments
message_attachments
  id
  message_id
  file_url
  file_type
  file_size
  metadata (JSON)

-- Message Reactions
message_reactions
  id
  message_id
  user_id
  reaction_type
  created_at
```

### WebSocket Events

```typescript
interface ChatEvents {
  // Message Events
  'message.sent': (message: Message) => void;
  'message.updated': (message: Message) => void;
  'message.deleted': (messageId: string) => void;

  // Typing Events
  'typing.started': (userId: string) => void;
  'typing.stopped': (userId: string) => void;

  // Presence Events
  'user.online': (userId: string) => void;
  'user.offline': (userId: string) => void;

  // Read Receipt Events
  'message.read': (messageId: string, userId: string) => void;
}
```

### API Endpoints

```typescript
// Chat Room Endpoints
POST   /api/chat/rooms           // Create chat room
GET    /api/chat/rooms           // List chat rooms
GET    /api/chat/rooms/:id       // Get room details
PUT    /api/chat/rooms/:id       // Update room
DELETE /api/chat/rooms/:id       // Delete room

// Message Endpoints
POST   /api/chat/rooms/:id/messages      // Send message
GET    /api/chat/rooms/:id/messages      // Get messages
PUT    /api/chat/messages/:id            // Update message
DELETE /api/chat/messages/:id            // Delete message

// Member Endpoints
POST   /api/chat/rooms/:id/members       // Add member
DELETE /api/chat/rooms/:id/members/:id   // Remove member
PUT    /api/chat/rooms/:id/members/:id   // Update member role
```

## Features Implementation

### 1. Basic Chat Features

#### Real-time Messaging
```typescript
// Frontend Component
const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    Echo.private(`chat.${roomId}`)
      .listen('MessageSent', (e: MessageEvent) => {
        setMessages(prev => [...prev, e.message]);
      });
  }, [roomId]);
};

// Backend Event
class MessageSent implements ShouldBroadcast {
  public function broadcastOn() {
    return new PrivateChannel('chat.' . $this->message->room_id);
  }
}
```

#### Typing Indicators
```typescript
const handleTyping = debounce(() => {
  Echo.private(`chat.${roomId}`)
    .whisper('typing', {
      user: currentUser,
      timestamp: Date.now()
    });
}, 300);
```

#### Read Receipts
```typescript
const markAsRead = async (messageId: string) => {
  await axios.post(`/api/chat/messages/${messageId}/read`);
  Echo.private(`chat.${roomId}`).whisper('message.read', {
    messageId,
    userId: currentUser.id
  });
};
```

### 2. Advanced Features

#### File Sharing
```typescript
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post('/api/chat/upload', formData);
  return response.data.url;
};
```

#### Message Threading
```typescript
interface ThreadedMessage extends Message {
  parent_id?: string;
  reply_count: number;
}

const ThreadView: React.FC<ThreadProps> = ({ parentMessage }) => {
  const { data: replies } = useQuery(['replies', parentMessage.id], 
    () => fetchReplies(parentMessage.id)
  );
};
```

#### Message Search
```typescript
const searchMessages = async (query: string) => {
  const response = await axios.get('/api/chat/search', {
    params: { q: query }
  });
  return response.data;
};
```

## Security Considerations

### 1. Authentication
- JWT token validation
- Channel authentication
- Rate limiting

### 2. Data Protection
- Message encryption
- File scanning
- Input sanitization

### 3. Access Control
- Room-level permissions
- User roles
- Message ownership

## Scaling Considerations

### 1. Database
- Message partitioning
- Index optimization
- Archive strategy

### 2. WebSocket
- Connection pooling
- Load balancing
- Failover handling

### 3. Media
- CDN integration
- Image optimization
- Caching strategy

## Monitoring

### 1. Performance Metrics
- Message delivery time
- WebSocket connection status
- API response times

### 2. Error Tracking
- Failed message delivery
- Connection issues
- File upload errors

### 3. Analytics
- Active users
- Message volume
- Feature usage

## Development Workflow

1. Local Setup
2. Testing Strategy
3. Deployment Process
4. Monitoring Setup
5. Maintenance Plan 