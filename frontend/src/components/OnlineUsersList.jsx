import React from 'react';

const OnlineUsersList = ({ users, room }) => {
  return (
    <div className="online-users-list">
      <h3>{room} - Online Users</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default OnlineUsersList;