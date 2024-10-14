// src/components/PostSection.js
import React, { useState, useEffect } from 'react';
import Post from './Post'; // Import the Post component
import './PostSection.css';  // Add custom styles for the section

const PostSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Sample posts data: each post has a title, optional image, and text content
    const fetchedPosts = [
      { title: 'First Post with Image', image: 'https://picsum.photos/200/300', text: '' },
      { title: 'Second Post without Image', text: 'This is the second post without any image. Here is a little excerpt of the post content.' },
      { title: 'Third Post with Image', image: 'https://picsum.photos/500/200', text: '' },
      { title: 'Fourth Post without Image', text: 'This post doesn’t have an image, but it includes a brief description to give context.' },
    ];
    setPosts(fetchedPosts);
  }, []);

  return (
    <div className="post-section">
      {posts.map((post, index) => (
        <Post key={index} title={post.title} image={post.image} text={post.text} />
      ))}
    </div>
  );
};

export default PostSection;
