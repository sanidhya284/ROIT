// src/components/ProfileSidebar.js
import React from 'react';

const ProfileSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      style={{
        ...styles.sidebar,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
      }}
    >
      <button onClick={toggleSidebar} style={styles.closeButton}>X</button>
      <ul style={styles.sidebarList}>
        <li style={styles.sidebarItem}>
          <i className="fas fa-user" style={styles.icon}></i> My Profile
        </li>
        <li style={styles.sidebarItem}>
          <i className="fas fa-cog" style={styles.icon}></i> Settings
        </li>
        <li style={styles.sidebarItem}>
          <i className="fas fa-shield-alt" style={styles.icon}></i> Transparency Mode
        </li>
      </ul>
    </div>
  );
};

// Internal CSS styles for Profile Sidebar
const styles = {
  sidebar: {
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100%',
    width: '250px',
    backgroundColor: '#444',
    color: 'white',
    boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.5)',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 1000, // Ensures it's above other content
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
  },
  closeButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    alignSelf: 'flex-end',
    marginBottom: '1rem',
  },
  sidebarList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    flexGrow: 1,
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 0',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  icon: {
    marginRight: '0.5rem',
  },
  sidebarItemHover: {
    backgroundColor: '#555',
  },
};

export default ProfileSidebar;