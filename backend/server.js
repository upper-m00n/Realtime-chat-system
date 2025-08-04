require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const Message = require('./models/message.model');

const app = express();
app.use(cors()); // Allow requests from your React frontend
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // In production, restrict this to your frontend URL
    methods: ['GET', 'POST'],
  },
});

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- In-memory store for online users ---
// In a larger app, you might use Redis for this
const onlineUsers = {}; // { "roomName": [user1, user2], ... }

// --- Socket.io Logic ---
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Event: joinRoom
  socket.on('joinRoom', async ({ username, room }) => {
    socket.join(room);
    console.log(`${username} joined room: ${room}`);

    // Add user to the online list
    if (!onlineUsers[room]) {
      onlineUsers[room] = [];
    }
    onlineUsers[room] = [...new Set([...onlineUsers[room], username])]; // Avoid duplicates

    // Load chat history from MongoDB
    try {
      const history = await Message.find({ room }).sort({ timestamp: 1 }).limit(50);
      socket.emit('chatHistory', history); // Send history to the joining user
    } catch (err) {
      console.error('Error fetching chat history:', err);
    }

    // Broadcast to the room that a new user has joined
    socket.to(room).emit('userJoined', `${username} has joined the chat`);

    // Broadcast updated online users list
    io.to(room).emit('onlineUsers', onlineUsers[room]);
  });

  // Event: chatMessage
  socket.on('chatMessage', async ({ username, room, text }) => {
    const newMessage = new Message({ room, username, text });
    try {
      await newMessage.save();
      // Broadcast message to everyone in the room
      io.to(room).emit('chatMessage', newMessage);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  // Event: typing
  socket.on('typing', ({ username, room }) => {
    socket.broadcast.to(room).emit('typing', `${username} is typing...`);
  });

  // Event: disconnect
  socket.on('disconnecting', () => {
    // Find the rooms the user was in
    const rooms = Array.from(socket.rooms).filter(item => item !== socket.id);
    // This logic is simplified. A robust solution would track which username belongs to which socket.id
    // For now, we don't know the username on disconnect, so we can't easily remove them from onlineUsers
    // A better approach is to map socket.id to username on 'joinRoom'
    console.log(`User disconnected: ${socket.id}`);
  });
});

// --- Basic Express Route for Health Check ---
app.get('/', (req, res) => {
  res.send('Backend Server is Running!');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));