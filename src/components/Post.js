// src/components/Post.js
import React from 'react';
import './Post.css';

const Post = ({ title, image, text }) => {
  return (
    <div className={`post-container ${image ? 'post-with-image' : 'post-no-image'}`}>
      <div className="post-header">{title}</div>

      {image && (
        <div className="post-image-container">
          <img src={image} alt="Post" className="post-image" />
        </div>
      )}

      {!image && <div className="post-text">{text.substring(0, 100)}...</div>}

      <div className="post-footer">
        <button className="post-action">Like</button>
        <button className="post-action">Dislike</button>
        <button className="post-action">Share</button>
        <button className="post-action">More</button>
      </div>
    </div>
  );
};

export default Post;
