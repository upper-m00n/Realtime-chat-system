import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5'; // Import the send icon
import './MessageInput.css'; // Create this new CSS file

const MessageInput = ({ onSendMessage, onTyping }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-form">
      <input
        type="text"
        className="message-input"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onTyping();
        }}
        placeholder="Type a message..."
      />
      <button type="submit" className="send-button">
        <IoSend size={22} />
      </button>
    </form>
  );
};

export default MessageInput;