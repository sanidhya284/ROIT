// src/components/PostFeed.js
import React, { useState, useEffect } from 'react';
import postContract from '../utils/postContract';
import './PostFeed.css';  // Add custom styles for the feed

const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const postCount = await postContract.methods.postCount().call();
    const fetchedPosts = [];
    for (let i = 1; i <= postCount; i++) {
      const post = await postContract.methods.getPost(i).call();
      fetchedPosts.push(post);
    }
    setPosts(fetchedPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index} className="post">
          <p>{post[1]}</p>
          <small>By: {post[2]}</small>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
