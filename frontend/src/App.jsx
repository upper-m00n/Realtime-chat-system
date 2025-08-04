import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import OnlineUsersList from './components/OnlineUsersList';
import './App.css'; // We'll add some basic styles here

// Connect to the backend server
const socket = io('YOUR_BACKEND_URL'); // e.g., http://localhost:5000 or your Vercel URL

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('General'); // Default room
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingNotification, setTypingNotification] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chatMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setTypingNotification(''); // Clear typing indicator on new message
    });

    // Listen for chat history
    socket.on('chatHistory', (history) => {
      setMessages(history);
    });
    
    // Listen for online users update
    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    // Listen for typing indicator
    socket.on('typing', (notification) => {
      setTypingNotification(notification);
      // Clear notification after a few seconds
      setTimeout(() => setTypingNotification(''), 3000);
    });

    // Clean up listeners on component unmount
    return () => {
      socket.off('chatMessage');
      socket.off('chatHistory');
      socket.off('onlineUsers');
      socket.off('typing');
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && room.trim()) {
      setIsLoggedIn(true);
      socket.emit('joinRoom', { username, room });
    }
  };

  const handleSendMessage = (text) => {
    if (text.trim()) {
      socket.emit('chatMessage', { username, room, text });
    }
  };

  const handleTyping = () => {
    socket.emit('typing', { username, room });
  };
  
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h1>Join Chat</h1>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />
          <button type="submit">Join</button>
        </form>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <OnlineUsersList users={onlineUsers} room={room} />
      <div className="chat-main">
        <ChatWindow messages={messages} username={username} />
        <div className="chat-footer">
          <MessageInput onSendMessage={handleSendMessage} onTyping={handleTyping} />
          <TypingIndicator notification={typingNotification} />
        </div>
      </div>
    </div>
  );
}

export default App;