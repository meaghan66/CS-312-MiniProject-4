import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Blog.css';

// handle editing an existing post
const Edit = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // grab the post to edit
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/editPost/${postId}`);
        setTitle(response.data.postTitle);
        setBody(response.data.postContent);
        setCurrentUser(response.data.currentUser);
      } catch (error) {
        console.error('Error fetching the post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  // handle submitting changes to post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/editPost/${postId}`, { 
        postTitle: title, 
        postContent: body 
      });
      // redirect to the main blog page
      navigate('/api');
    } catch (error) {
      console.error('Error updating the post:', error);
    }
  };

  return (
    // return the post changes
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
        required 
      />
      <textarea 
        value={body} 
        onChange={(e) => setBody(e.target.value)} 
        placeholder="Body" 
        required 
      />
      <button type="submit">Update Post</button>
    </form>
  );
};

export default Edit;
