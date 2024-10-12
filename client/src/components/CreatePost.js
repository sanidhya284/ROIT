import React, { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import { createPostOnBlockchain, fetchPosts } from '../Services/blockchainService';
import  GlobalState  from './GlobalState';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [signer, setSigner] = useState(null);
  const [fetchedPosts, setFetchedPosts] = useState([]); // Add state for fetched posts

  const { state, dispatch } = React.useContext(GlobalState);

  // Function to request MetaMask connection
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);
        dispatch({ type: 'USER_LOGIN', payload: accounts[0] }); // Update user state
        console.log('MetaMask connected:', accounts[0]);
      } catch (error) {
        console.error('User denied MetaMask connection:', error);
        alert('Please connect MetaMask to continue.');
      }
    } else {
      alert('MetaMask is not installed. Please install it to continue.');
    }
  };

  // Connect on component mount
  useEffect(() => {
    connectMetaMask();
  }, []);  // Dependency on component mount

  // Function to fetch posts from the blockchain
  const fetchPosts = async () => {
    try {
      // Replace with your logic to fetch posts from the blockchain
      const response = await fetch('https://your-api-endpoint/posts'); // Placeholder API call
      const fetchedData = await response.json();
      setFetchedPosts(fetchedData); // Update fetchedPosts state
    } catch (error) {
      console.error('Error fetching posts:', error);
      dispatch({ type: 'POSTS_FETCH_ERROR', payload: error.message }); // Update error state
    }
  };

  // Handle post creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!signer) {
      alert('Please connect to MetaMask first.');
      return;
    }

    try {
      await createPostOnBlockchain(content, signer);
      alert('Post created successfully on blockchain!');
      setContent(''); // Clear the content after submission

      // Trigger post refresh using dispatch to update global state
      dispatch({ type: 'POSTS_FETCH_START' }); // Start loading indicator
      await fetchPosts(); // Fetch updated posts from blockchain
      dispatch({ type: 'POSTS_FETCH_SUCCESS', payload: fetchedPosts }); // Update posts
      const updatedPosts = await fetchPosts();
      dispatch({ type: 'POSTS_FETCH_SUCCESS', payload: updatedPosts });
  
    } catch (error) {
      console.error('Error creating post:', error);
      dispatch({ type: 'POSTS_FETCH_ERROR', payload: error.message }); // Update error state
      // Handle specific error types here for better user feedback
      if (error.code === 4001) {
        alert('User denied transaction confirmation in MetaMask.');
      } else if (error.code === -32000) {
        alert('Transaction reverted. Check if the contract logic is correct.');
      } else if (error.message.includes('insufficient funds')) {
        alert('Insufficient funds. Please ensure you have enough ETH.');
      } else {
        alert('An error occurred while creating the post.');
      }
    }
  };
  

  return (
    <div>
      <h2>Create a New Post</h2>
      <p>Connected MetaMask account: {state.user ? state.user : 'Not connected'}</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here..."
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;