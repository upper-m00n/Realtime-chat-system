import React from 'react';
import './ChatHeader.css'; // Create this new CSS file

const ChatHeader = ({ room, onlineCount }) => {
  const handleDisplayUser=()=>{
    
  }

  return (
    <div className="chat-header">
      <img src="https://via.placeholder.com/40" alt="group-icon" className="group-icon" />
      <div className="header-info">
        <h3 className="room-name">{room}</h3>
        <span className="online-status" onClick={handleDisplayUser}>{onlineCount} users online</span>
      </div>
    </div>
  );
};

export default ChatHeader;