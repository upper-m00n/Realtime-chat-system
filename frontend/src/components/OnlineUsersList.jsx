import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; 
import './ChatPage.css'
const OnlineUsersList = ({ users, room }) => {
  return (
    <div className="online-users-list">
      <div className="online-users-header">
        <h3>{room}</h3>
        <span className="status-indicator"></span> 
        <span>{users.length} Online</span>
      </div>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <FaUserCircle className="user-icon" size={22} />
            <span className="username-text">{user}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnlineUsersList;