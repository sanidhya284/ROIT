// src/components/CreatePost.js
import React, { useState } from 'react';
import postContract from '../utils/postContract';
import web3 from '../utils/web3';
import './CreatePost.css';

const CreatePost = ({ onPostCreate }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      const gasPrice = await web3.eth.getGasPrice(); // Get the current gas price

      await postContract.methods.createPost(content).send({
        from: accounts[0],
        gasPrice: gasPrice, // Set the gas price explicitly
      });

      onPostCreate();
      setContent('');
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <div>
        <textarea
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePost;