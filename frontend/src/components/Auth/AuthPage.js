import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import '../../css/auth.css';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleAuthSuccess = (authData) => {
    // Redirect or update UI based on successful authentication
    console.log('Authentication successful:', authData);
    window.location.href = '/'; // Redirect to home after successful login/signup
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome to Humanoid Robotics</h1>
          <p>Join our community to access personalized content</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLoginView ? 'active' : ''}`}
            onClick={() => setIsLoginView(true)}
          >
            Login
          </button>
          <button
            className={`auth-tab ${!isLoginView ? 'active' : ''}`}
            onClick={() => setIsLoginView(false)}
          >
            Sign Up
          </button>
        </div>

        <div className="auth-content">
          {isLoginView ? (
            <LoginForm onLoginSuccess={handleAuthSuccess} />
          ) : (
            <SignupForm onSignupSuccess={handleAuthSuccess} />
          )}
        </div>

        <div className="auth-footer">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;