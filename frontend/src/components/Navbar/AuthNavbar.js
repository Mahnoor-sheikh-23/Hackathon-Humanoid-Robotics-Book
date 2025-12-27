import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';

const AuthNavbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [basePath, setBasePath] = useState('');

  useEffect(() => {
    // Determine the base path based on current URL
    const path = window.location.pathname;
    const base = path.startsWith('/Hackathon-Humanoid-Robotics-Book') ? '/Hackathon-Humanoid-Robotics-Book' : '';
    setBasePath(base);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  if (isAuthenticated) {
    return (
      <div className="auth-navbar-links">
        <span className="navbar__text" style={{ marginRight: '1rem' }}>
          Welcome, {user?.username || 'User'}
        </span>
        <a
          href={`${basePath}/profile`}
          className="navbar__link"
          style={{ marginRight: '1rem' }}
        >
          Profile
        </a>
        <a
          href="#"
          className="navbar__link"
          onClick={handleLogout}
        >
          Logout
        </a>
      </div>
    );
  } else {
    return (
      <div className="auth-navbar-links">
        <a
          href={`${basePath}/auth`}
          className="navbar__link"
          style={{ marginRight: '1rem' }}
        >
          Login
        </a>
        <a
          href={`${basePath}/auth`}
          className="navbar__link"
        >
          Sign Up
        </a>
      </div>
    );
  }
};

export default AuthNavbar;