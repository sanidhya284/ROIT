import React, { useEffect, useState } from 'react';
import { fetchPosts } from './services/web3';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await fetchPosts();
      setPosts(posts);
    };
    loadPosts();
  }, []);

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <p>{post.content}</p>
          <small>By: {post.author}</small>
        </div>
      ))}
    </div>
  );
};

export default PostList;
