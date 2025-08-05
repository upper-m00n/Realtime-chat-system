import React from 'react';
import './ChatHeader.css';
import { useNavigate } from 'react-router-dom';

const ChatHeader = ({ room, onlineCount }) => {
  const navigate=useNavigate();
  const handleExitRoom =()=>{
    navigate('/')
  }

  return (
    <div className="chat-header">
      <img src="https://via.placeholder.com/40" alt="group-icon" className="group-icon" />
      <div className="header-info">
        <h3 className="room-name">{room}</h3>
        <div>
          <span className="online-status"> {onlineCount} users online</span>
         <button onClick={handleExitRoom}>Exit Room</button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;