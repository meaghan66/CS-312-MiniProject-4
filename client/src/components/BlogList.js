import React, { useEffect, useState } from 'react';
import BlogPostForm from './BlogPostForm';
import { useNavigate } from 'react-router-dom';
import './Blog.css';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // get the url from the server where all the posts are
    fetch('http://localhost:5000/api')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response not good :(');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data.existingPosts);
        setCurrentUser(data.currentUser);
      })
      // handle any errors in displaying posts
      .catch(error => console.error('Error: issue with fetch operation:', error));
  }, []);

  const handleDelete = (index) => {
    // get the server url for deleting a given post
    fetch('http://localhost:5000/api/deletePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index }),
    })
      .then(() => {
        setPosts(posts.filter(post => post.index !== index));
      });
  };

  const handleEdit = (postId) => {
    // go to the edit post page
    navigate(`/api/editPost/${postId}`);
  };

  return (
    <div>
      {/* show main page */}
      <h1>BlogChamp 2.0</h1>
      <BlogPostForm setPosts={setPosts} currentUser={currentUser} />

      <hr />
      {posts.length > 0 ? (
        // display all of the potsts
        posts.slice().reverse().map(post => (
          <div key={post.index}>
            <h2>{post.postTitle}</h2>
            <h3>@{post.postAuthor}</h3>
            <p>{post.postContent}</p>
            <p>{post.date}</p>
            {/* if the user is the owner of a post */}
            {post.postAuthor === currentUser && (
              <>
                {/* the buttons for editing and deleting a post become available */}
                <button onClick={() => handleDelete(post.index)}>Delete</button>
                <button onClick={() => handleEdit(post.index)}>Edit</button>
              </>
            )}
            <hr />
          </div>
        ))
      ) : (
        // otherwise, if no posts are in the list, show accordingly
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default BlogList;
