const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
// Get port from command line arguments or use default
const port = parseInt(process.argv[2], 10) || process.env.PORT || 3000;

// Initialize Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
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
    cors: {
      origin: process.env.NEXT_PUBLIC_FRONTEND_URL || `http://localhost:${port}`,
      methods: ['GET', 'POST'],
      credentials: true
    }
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

  // Start the server
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
}); 