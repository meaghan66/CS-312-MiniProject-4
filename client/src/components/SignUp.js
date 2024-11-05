import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Blog.css';

// handle signing up
const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // get the given server url for signing up
    fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    })
      // handle errors
      .then(response => {
        if (!response.ok) {
          throw new Error('Error creating account');
        }
        return response.json();
      })
      // once a successful sign up, send over to the sign in page
      .then(() => {
        navigate('/api/signin');
      })
      .catch(error => setErrorMessage(error.message));
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {/* handle error messages if necessary */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        {/* allow for input from user for account */}
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/api/signin">Sign in here</a></p>
    </div>
  );
};

export default SignUp;
