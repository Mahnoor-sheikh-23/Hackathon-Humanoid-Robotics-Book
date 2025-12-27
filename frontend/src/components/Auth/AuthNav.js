import React from 'react';
import { useAuth } from './AuthContext';

const AuthNav = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="auth-nav">
      {isAuthenticated ? (
        <div className="user-menu">
          <span className="welcome-text">Welcome, {user.username || 'User'}!</span>
          <button onClick={logout} className="logout-btn">Logout</button>
          <a href="/profile" className="profile-link">Profile</a>
        </div>
      ) : (
        <div className="guest-menu">
          <a href="/auth" className="login-btn">Login</a>
          <a href="/auth" className="signup-btn">Sign Up</a>
        </div>
      )}
    </div>
  );
};

export default AuthNav;