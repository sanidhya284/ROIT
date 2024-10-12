import React, { useEffect, useState } from 'react';
import  GlobalState  from '../context/GlobalState';
import FollowList from '../components/FollowList';
import { fetchedPost } from '../Services/blockchainService'; // Assuming fetchUserPosts is defined in blockchainService.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const Profile = () => {
  const { state } = React.useContext(GlobalState);
  const currentUser = state.user;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadUserPosts = async () => {
      const fetchedPosts = await fetchedPosts(currentUser.address);
      setPosts(fetchedPosts);
    };
    loadUserPosts();
  }, [currentUser]);

  return (
    <div>
      <h1>Your Profile</h1>
      <p>Username: {currentUser.username}</p>
      {/* Display other user information here */}
      <h2>Your Posts</h2>
      {posts.map((post, index) => (
        <div key={index}>
          <p>{post.content}</p>
          <small>By: {post.author}</small>
        </div>
      ))}
      {/* Add sections for following/followers and edit profile options */}
      <FollowList type="following" /> {/* Render following list */}
      <FollowList type="followers" /> {/* Render followers list */}
    </div>
  );
};

export default Profile;