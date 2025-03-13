const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
// Get port from command line arguments or use default
const initialPort = parseInt(process.argv[2], 10) || process.env.PORT || 3003;

// Initialize Next.js
const app = next({ dev, hostname });
const handle = app.getRequestHandler();

// Function to try starting the server on different ports
const startServer = (port) => {
  return new Promise((resolve, reject) => {
    // Create HTTP server
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error occurred handling', req.url, err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });

    // Initialize Socket.IO
    const io = new Server(server, {
      path: '/api/socketio',
      cors: {
        origin: process.env.NEXT_PUBLIC_FRONTEND_URL || `http://localhost:${port}`,
        methods: ['GET', 'POST'],
        credentials: true
      },
      transports: ['websocket', 'polling'],
      allowEIO3: true,
      pingTimeout: 60000
    });

    // Socket.IO connection handler
    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);

      // Join a chat room (order-specific)
      socket.on('join-room', (orderId) => {
        socket.join(`order-${orderId}`);
        console.log(`User ${socket.id} joined room: order-${orderId}`);
      });

      // Leave a chat room
      socket.on('leave-room', (orderId) => {
        socket.leave(`order-${orderId}`);
        console.log(`User ${socket.id} left room: order-${orderId}`);
      });

      // Handle new message
      socket.on('send-message', (data) => {
        // Broadcast to everyone in the room except the sender
        socket.to(`order-${data.orderId}`).emit('receive-message', data);
        console.log(`Message sent in room order-${data.orderId}:`, data.content);
      });

      // Handle typing indicator
      socket.on('typing', (data) => {
        socket.to(`order-${data.orderId}`).emit('user-typing', {
          userId: data.userId,
          username: data.username,
          isTyping: data.isTyping
        });
      });

      // Handle user going online/offline
      socket.on('status-change', (data) => {
        io.emit('user-status-change', {
          userId: data.userId,
          status: data.status
        });
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });

    // Try to start the server
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use.`);
        reject(err);
      } else {
        console.error('Server error:', err);
        reject(err);
      }
    });

    server.listen(port, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`> Ready on http://${hostname}:${port}`);
        resolve(server);
      }
    });
  });
};

// Try to start the server with port fallback
app.prepare().then(async () => {
  let currentPort = initialPort;
  const maxAttempts = 5;
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      await startServer(currentPort);
      // If successful, exit the loop
      break;
    } catch (err) {
      if (err.code === 'EADDRINUSE' && attempt < maxAttempts - 1) {
        // Try the next port
        currentPort++;
        console.log(`Attempting to use port ${currentPort} instead...`);
      } else {
        // Either it's not a port issue or we've run out of attempts
        console.error('Failed to start server:', err);
        process.exit(1);
      }
    }
  }
}); 