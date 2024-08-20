import React, { useState } from 'react';
import logo from './assets/La Villa.png';
import image2 from './assets/room1.jpeg';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === 'Sreeleka' && password === 'sreeleka11' || username === 'Sasmitha' && password === 'sasmitha05') {
      window.location.href = '/Dashboard';
      return;
    }

    axios.post('http://localhost:3000/login', { username, password })
      .then(result => {
        setMessage(result.data); 
        if (result.data === "Success") {
          window.location.href = '/home';
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${image2})`, // Use the imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        margin: 0,
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <div
        style={{
          width: '360px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background for readability
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: '100px',
            marginBottom: '20px',
          }}
        />
        <h2 style={{ marginBottom: '20px', color: '#007BFF' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#007BFF'}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
          Don't have an account? <a href="/signup" style={{ color: '#007BFF', textDecoration: 'none' }}>Sign up here</a>
        </p>
        <div id="message" style={{ marginTop: '20px', color: '#d9534f' }}>
          {message}
        </div>
      </div>
    </div>
  );
}

export default Login;
