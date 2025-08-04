import React, { useEffect, useRef } from 'react';

const ChatWindow = ({ messages, username }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.username === username ? 'my-message' : 'other-message'}`}>
          <div className="message-sender">{msg.username}</div>
          <div className="message-text">{msg.text}</div>
          <div className="message-time">{new Date(msg.timestamp).toLocaleTimeString()}</div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;