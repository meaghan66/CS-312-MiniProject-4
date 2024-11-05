import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Blog.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // get the server url for the sign in page
    fetch('http://localhost:5000/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    // handle errors with signin in
      .then(response => {
        if (!response.ok) {
          throw new Error('Invalid credentials');
        }
        return response.json();
      })
      // after success, redirect to the blog page
      .then(() => {
        navigate('/api');
      })
      .catch(error => setErrorMessage(error.message));
  };

  return (
    <div>
      <h1>Sign In</h1>
      {/* handle error messages as needed */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {/* input details for signing in */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account? <a href="/api/signup">Sign up here</a></p>
    </div>
  );
};

export default SignIn;
