# Websocket Connection Fix

## Issue
The dashboard/messages page was showing a websocket connection error because the Socket.IO client was trying to connect to a server at `http://localhost:3012` (default fallback), but the actual Socket.IO server is running on the same port as the Next.js application (port 3000).

## Solution
Add the following environment variable to your `.env.local` file:

```
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

This ensures that the Socket.IO client connects to the correct server URL.

## Technical Details

### Socket.IO Client Configuration
In `src/context/SocketContext.tsx`, the Socket.IO client is initialized with:

```typescript
const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3012', {
  withCredentials: true,
  transports: ['websocket', 'polling'],
});
```

### Socket.IO Server Configuration
In `server.js`, the Socket.IO server is initialized on the same HTTP server as the Next.js application:

```javascript
// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL || `http://localhost:${port}`,
    methods: ['GET', 'POST'],
    credentials: true
  }
});
```

## Verification
After adding the environment variable, restart the Next.js development server and verify that the websocket connection is established successfully by:

1. Opening the browser's developer tools
2. Going to the Network tab
3. Filtering for "WS" (WebSocket) connections
4. Checking that the connection to `http://localhost:3000/socket.io/` is established

You should no longer see the "Error: websocket error" message in the console. 