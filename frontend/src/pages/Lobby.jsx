import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000'; // Or your deployed backend URL

function Lobby({ user, onJoinRoom }) {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch rooms when component mounts
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/rooms`);
        setRooms(response.data);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    try {
      const response = await axios.post(`${API_URL}/api/rooms`, { roomName: newRoomName });
      setRooms([...rooms, response.data]); // Add new room to the list
      setNewRoomName('');
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  const handleJoinRoom = (roomName) => {
      onJoinRoom(roomName);
      navigate(`/chat/${roomName}`);
  };

  return (
    <div className="lobby-container" style={{padding: '2rem'}}>
      <h2>Welcome, {user.username}!</h2>
      <h3>Join a Room</h3>
      <div className="room-list">
        {rooms.map((room) => (
          <button key={room._id} onClick={() => handleJoinRoom(room.roomName)}>
            {room.roomName}
          </button>
        ))}
      </div>
      <hr />
      <h3>Or Create a New Room</h3>
      <form onSubmit={handleCreateRoom}>
        <input
          type="text"
          placeholder="New room name"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
}

export default Lobby;