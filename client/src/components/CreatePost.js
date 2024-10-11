import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { createPostOnBlockchain } from '../Services/blockchainService';
import { GlobalContext } from '../context/GlobalContext';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [signer, setSigner] = useState(null);

  const { state, dispatch } = React.useContext(GlobalContext);

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

    } catch (error) {
      console.error('Error creating post:', error);
      dispatch({ type: 'POSTS_FETCH_ERROR', payload: error.message }); // Update error state
      // Handle specific error types here for better user feedback
      if (error.code === 4001) {
        alert('User denied transaction confirmation in MetaMask.');
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