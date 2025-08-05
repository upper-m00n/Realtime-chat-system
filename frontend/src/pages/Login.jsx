import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'https://realtime-chat-system-nkxh.onrender.com'; // backend url

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
      onLoginSuccess(response.data.user); 
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed.');
    }
  };

  // guest mode
  const handleGuestLogin = () => {
    // Generate guest username 
    const randomId = Math.floor(Math.random() * 10000);
    const guestUser = {
      username: `Guest${randomId}`,
      id: `guest_${randomId}` 
    };
    onLoginSuccess(guestUser);
    navigate('/');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
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
        <p className="form-link">
            Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>

      <div className="guest-mode-separator">
        <span>or</span>
      </div>
      <button type="button" className="guest-button" onClick={handleGuestLogin}>
        Continue as Guest
      </button>
    </div>
  );
}

export default Login;