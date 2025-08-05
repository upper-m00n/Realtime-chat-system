import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Lobby.css'; // Make sure this CSS file is imported

const API_URL = 'http://localhost:5000'; // Or your deployed backend URL

function Lobby({ user, onJoinRoom }) {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  
  // New state for UI feedback
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/rooms`);
        setRooms(response.data);
        if (response.data.length > 0) {
          setSelectedRoom(response.data[0].roomName);
        }
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    
    setIsLoading(true); // Start loading
    setMessage({ text: '', type: '' }); // Clear previous messages

    try {
      const response = await axios.post(`${API_URL}/api/rooms`, { roomName: newRoomName });
      const newRoom = response.data;
      setRooms([...rooms, newRoom]);
      setSelectedRoom(newRoom.roomName);
      setNewRoomName('');
      setMessage({ text: `Room "${newRoom.roomName}" created successfully!`, type: 'success' });
    } catch (error) {
      const errorMsg = error.response?.data?.msg || 'Failed to create room.';
      setMessage({ text: errorMsg, type: 'error' });
      console.error('Failed to create room:', errorMsg);
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  const handleJoinClick = () => {
    if (selectedRoom) {
      onJoinRoom(selectedRoom);
      navigate(`/chat/${selectedRoom}`);
    }
  };

  return (
    <div className="lobby-container">
      <div className="lobby-header">
        <h2>Welcome, {user.username}!</h2>
        <p>Select a room to join or create a new one.</p>
      </div>
      
      <div className="join-room-section">
        <h3>Join a Room</h3>
        <div className="input-group">
          <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} disabled={rooms.length === 0}>
            {rooms.length === 0 ? (
              <option>No rooms available</option>
            ) : (
              rooms.map((room) => (
                <option key={room._id} value={room.roomName}>
                  {room.roomName}
                </option>
              ))
            )}
          </select>
          <button onClick={handleJoinClick} disabled={!selectedRoom}>
            Join Room
          </button>
        </div>
      </div>

      <div className="divider"></div>

      <div className="create-room-section">
        <h3>Create a New Room</h3>
        <form onSubmit={handleCreateRoom} className="input-group">
          <input
            type="text"
            placeholder="Enter new room name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !newRoomName.trim()}>
            {isLoading ? 'Creating...' : 'Create'}
          </button>
        </form>
        {message.text && (
          <p className={`message ${message.type}`}>{message.text}</p>
        )}
      </div>
    </div>
  );
}

export default Lobby;