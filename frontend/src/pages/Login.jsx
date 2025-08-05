import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000'; // Or your deployed backend URL

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
      onLoginSuccess(response.data.user); // Pass user data up to App.js
      navigate('/'); // Navigate to the Lobby on successful login
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
         <p style={{textAlign: 'center', marginTop: '1rem'}}>
            Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;