import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { GlobalProvider } from './context/GlobalState'; // Import GlobalProvider

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const Profile = React.lazy(() => import('./pages/Profile'));
const CreatePost = React.lazy(() => import('./components/CreatePost'));

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

        {/* Router and Suspense for lazy loading routes */}
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          </Suspense>
        </Router>
      </div>
    </GlobalProvider>
  );
}

export default App;
