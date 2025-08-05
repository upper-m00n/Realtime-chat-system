import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000'; // Or your deployed backend URL

function Lobby({ user, onJoinRoom }) {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [selectedRoom,setSelectedRoom]= useState('');
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

  const handleJoinClick = () => {
      if(selectedRoom){
        onJoinRoom(selectedRoom);
        navigate(`/chat/${selectedRoom}`);
      }
  };

  return (
    <div className="lobby-container" style={{padding: '2rem'}}>
      <h2>Welcome, {user.username}!</h2>
      <h3>Join a Room</h3>
      <div className="room-list">
  {/* The dropdown correctly updates the 'selectedRoom' state */}
      <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
        
        {/* Correct way to handle empty state in a select */}
        {rooms.length === 0 && <option disabled>No rooms available</option>}

        {rooms.map((room) => (
          <option key={room._id} value={room.roomName}>
            {room.roomName}
          </option>
        ))}
      </select>

      {/* THE FIX: 
        We pass the handleJoinClick function itself.
        This function will be executed ONLY when the user clicks the button.
      */}
      <button onClick={handleJoinClick} disabled={!selectedRoom}>
        Join Room
      </button>
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