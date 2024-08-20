import React, { useState } from 'react';
import axios from 'axios';
import logo from './assets/La Villa.png'; 
import image2 from './assets/room1.jpeg';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupUsernameError, setSignupUsernameError] = useState('');
  const [signupPasswordError, setSignupPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    setSignupUsernameError('');
    setSignupPasswordError('');
    setConfirmPasswordError('');

    let valid = true;

    if (username === '') {
      setSignupUsernameError('Username is required.');
      valid = false;
    }

    if (password.length < 8) {
      setSignupPasswordError('Password must be at least 8 characters long.');
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    }

    if (valid) {
      axios.post('http://localhost:3000/signup', { username, password, confirmPassword })
        .then(result => {
          console.log(result);
          alert('Sign up successful! Please log in.');
          window.location.href = '/login';
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.signupContainer}>
        <img
          src={logo}
          alt="Logo"
          style={styles.logo}
        />
        <h2 style={styles.heading}>Sign Up</h2>
        <form id="signupForm" onSubmit={handleSignupSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="signupUsername">Username:</label>
            <input
              type="text"
              id="signupUsername"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
            {signupUsernameError && (
              <span style={styles.errorMessage}>{signupUsernameError}</span>
            )}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="signupPassword">Password:</label>
            <input
              type="password"
              id="signupPassword"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            {signupPasswordError && (
              <span style={styles.errorMessage}>{signupPasswordError}</span>
            )}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
            />
            {confirmPasswordError && (
              <span style={styles.errorMessage}>{confirmPasswordError}</span>
            )}
          </div>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        <p style={styles.signInText}>
          Already have an account? <a href="/login" style={styles.signInLink}>Login here</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: 'Roboto, sans-serif',
    backgroundImage: `url(${image2})`, // Use the imported image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
  },
  signupContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background for readability
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '360px',
  },
  logo: {
    width: '100px',
    marginBottom: '20px',
  },
  heading: {
    color: '#007BFF',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
  },
  errorMessage: {
    color: 'red',
    fontSize: '0.9em',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  signInText: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#555',
  },
  signInLink: {
    color: '#007BFF',
    textDecoration: 'none',
  },
};

export default Signup;
