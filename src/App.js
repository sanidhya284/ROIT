// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PostSection from './components/PostSection'; // Import PostSection
import MessageButton from './components/MessageButton';
import './App.css';
import './styles.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <main className="content">
          <PostSection />  {/* Render PostSection instead of individual posts */}
        </main>
      </div>
      <MessageButton />
    </div>
  );
};

export default App;
