// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const initializeSocket = require('./services/socket.service');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/rooms', require('./routes/room.routes'));

// Basic Health Check Route
app.get('/', (req, res) => {
  res.send('Backend Server is Running!');
});

// Setup HTTP and Socket.io Server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Initialize Socket.io logic
initializeSocket(io);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));