// src/components/CreatePostModal.js
import React from 'react';
import CreatePost from './CreatePost'; // Reintroduce the import statement
import './CreatePostModal.css';

const CreatePostModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <CreatePost onPostCreate={onClose} /> {/* Reintroduce the CreatePost component */}
      </div>
    </div>
  );
};

export default CreatePostModal;