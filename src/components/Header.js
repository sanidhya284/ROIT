// src/components/Header.js
import React, { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import CreatePostModal from './CreatePostModal'; // Ensure this import is correct
import './Header.css';

const Header = () => {
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!isRightSidebarOpen);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo.png" alt="ROIT Logo" className="logo-img" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        <div className="profile" onClick={toggleRightSidebar}>
          <img src="/images/profile-pic.jpeg" alt="Profile" className="profile-pic" />
        </div>
        <button className="create-post-button" onClick={toggleModal}>
          <i className="fas fa-plus"></i>
        </button>
      </nav>
      <ProfileSidebar isOpen={isRightSidebarOpen} toggleSidebar={toggleRightSidebar} />
      {isModalOpen && <CreatePostModal onClose={toggleModal} />}
    </header>
  );
};

export default Header;