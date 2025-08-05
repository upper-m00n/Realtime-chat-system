
const Message = require('../models/message.model');

const onlineUsers = {};      
const socketUserMap = {};    

// initialize 
const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom', async ({ username, room }) => {
      socket.join(room);
      socketUserMap[socket.id] = { username, room };

      if (!onlineUsers[room]) {
        onlineUsers[room] = [];
      }
      onlineUsers[room] = [...new Set([...onlineUsers[room], username])];

      console.log(`${username} joined room: ${room}`);

      try {
        const history = await Message.find({ room }).sort({ timestamp: 1 }).limit(50);
        socket.emit('chatHistory', history);
      } catch (err) {
        console.error('Error fetching chat history:', err);
      }

      io.to(room).emit('onlineUsers', onlineUsers[room]);
    });

    socket.on('chatMessage', async ({ username, room, text }) => {
      const newMessage = new Message({ room, username, text });
      try {
        await newMessage.save();
        io.to(room).emit('chatMessage', newMessage);
      } catch (err) {
        console.error('Error saving message:', err);
      }
    });

    socket.on('typing', ({ username, room }) => {
      socket.broadcast.to(room).emit('typing', `${username} is typing...`);
    });

    socket.on('disconnect', () => {
      const userData = socketUserMap[socket.id];
      if (userData) {
        const { username, room } = userData;
        console.log(`${username} disconnected from room: ${room}`);

        if (onlineUsers[room]) {
          onlineUsers[room] = onlineUsers[room].filter(user => user !== username);
          io.to(room).emit('onlineUsers', onlineUsers[room]);
        }
        
        delete socketUserMap[socket.id];
      }
    });
  });
};

module.exports = initializeSocket;