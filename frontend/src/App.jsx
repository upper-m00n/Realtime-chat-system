import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Lobby from './pages/Lobby';
import ChatPage from './pages/ChatPage';

const API_URL = 'https://realtime-chat-system-nkxh.onrender.com';
const socket = io(API_URL);

function App() {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingNotification, setTypingNotification] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Socket event listeners
    socket.on('chatMessage', (message) => {
      setMessages((prev) => [...prev, message]);
      setTypingNotification('');
    });
    socket.on('chatHistory', (history) => setMessages(history));
    socket.on('onlineUsers', (users) => setOnlineUsers(users));
    socket.on('typing', (notification) => {
      setTypingNotification(notification);
      setTimeout(() => setTypingNotification(''), 3000);
    });

    return () => { // Cleanup listeners
      socket.off('chatMessage');
      socket.off('chatHistory');
      socket.off('onlineUsers');
      socket.off('typing');
    };
  }, []);

  useEffect(() => {
      // If user joins a new room, clear old messages
      setMessages([]);
  }, [room]);


  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleJoinRoom = (roomName) => {
    if (user && roomName) {
        setRoom(roomName);
        socket.emit('joinRoom', { username: user.username, room: roomName });
    }
  };

  const handleSendMessage = (text) => {
    if (text.trim() && user && room) {
      socket.emit('chatMessage', { username: user.username, room, text });
    }
  };

  const handleTyping = () => {
    if (user && room) {
        socket.emit('typing', { username: user.username, room });
    }
  };

  return (
    <div className="app-container">
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        
        <Route 
          path="/" 
          element={user ? <Lobby user={user} onJoinRoom={handleJoinRoom} /> : <Login onLoginSuccess={handleLoginSuccess} />} 
        />
        <Route 
          path="/chat/:roomName" 
          element={user ? <ChatPage 
              user={user} 
              messages={messages}
              onlineUsers={onlineUsers}
              typingNotification={typingNotification}
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
            /> : <Login onLoginSuccess={handleLoginSuccess} />} 
        />
      </Routes>
    </div>
  );
}

export default App;