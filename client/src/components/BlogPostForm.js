import React, { useState } from 'react';
import './Blog.css';

// handle creating the blog post
const BlogPostForm = ({ setPosts, currentUser }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // get the server url for creating a post
    fetch('http://localhost:5000/api/createPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postTitle, postAuthor: currentUser, postContent }),
    })
      .then(response => response.json())
      .then(newPost => {
        setPosts(prev => [newPost, ...prev]);
        setPostTitle('');
        setPostContent('');
      });
  };

  return (
    // submit the additions to the blog post (title and actual content)
    <form onSubmit={handleSubmit}>
      <input type="text" value={postTitle} onChange={e => setPostTitle(e.target.value)} placeholder="Title" required />
      <textarea value={postContent} onChange={e => setPostContent(e.target.value)} placeholder="Write your post" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BlogPostForm;
