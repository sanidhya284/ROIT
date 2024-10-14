import React from 'react';
import './Sidebar.css'; // Make sure to style the sidebar

const Sidebar = () => {
  // Sample data for people you are following (can be replaced with dynamic data later)
  const following = [
    { id: 1, name: 'John Doe', avatar: '/images/avatar1.jpg' },
    { id: 2, name: 'Jane Smith', avatar: '/images/avatar2.jpg' },
    { id: 3, name: 'Alice Johnson', avatar: '/images/avatar3.jpg' },
  ];

  return (
    <aside className="sidebar">
      <h3>Following</h3>
      <ul>
        {following.map((person) => (
          <li key={person.id} className="following-item">
            <img
              src={person.avatar} // Avatar image from the public folder
              alt={person.name}
              className="following-avatar"
            />
            <span>{person.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
