import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { GlobalProvider } from './context/GlobalState'; // Import GlobalProvider

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const Profile = React.lazy(() => import('./pages/Profile'));
const CreatePost = React.lazy(() => import('./components/CreatePost'));
const Messages = React.lazy(() => import('./pages/Messages')); // Add a new route for messages

function App() {
  return (
    <GlobalProvider> {/* Wrap the app inside GlobalProvider */}
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        {/* Navigation menu */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/create-post">Create Post</Link></li>
            <li><Link to="/messages">Messages</Link></li>
          </ul>
        </nav>

        {/* Router and Suspense for lazy loading routes */}
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/messages" element={<Messages />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </GlobalProvider>
  );
}

export default App;