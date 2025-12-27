import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/Auth/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    programming_experience: '',
    robotics_knowledge: '',
    hardware_availability: ''
  });
  const [message, setMessage] = useState('');
  const { user, login, logout, isAuthenticated } = useAuth();

  // Check URL hash on component mount to redirect to profile if needed
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#profile' && isAuthenticated) {
      // Redirect to the profile page instead of showing embedded view
      const basePath = window.location.pathname.startsWith('/Hackathon-Humanoid-Robotics-Book') ? '/Hackathon-Humanoid-Robotics-Book' : '';
      window.location.href = `${basePath}/profile`;
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine the base API URL based on environment
    const getApiBaseUrl = () => {
      if (typeof window !== 'undefined') {
        // Check if we're on the production site
        const currentHost = window.location.hostname;
        if (currentHost.includes('github.io')) {
          // Production: use the Railway deployment
          return 'https://hackathon-humanoid-robotics-book-production.up.railway.app';
        } else {
          // Development: use localhost
          return 'http://localhost:8000';
        }
      }
      return 'http://localhost:8000'; // Default fallback
    };

    const apiBaseUrl = getApiBaseUrl();

    try {
      if (isLogin) {
        // Login request
        const response = await fetch(`${apiBaseUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store token and user info
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('token_type', data.token_type);
          localStorage.setItem('username', formData.username);

          // Update auth context
          login({
            token: data.access_token,
            username: formData.username
          });

          // Dispatch auth change event to notify navbar
          window.dispatchEvent(new CustomEvent('authChange', { detail: { isAuthenticated: true } }));

          setMessage('Login successful! Redirecting...');
          setTimeout(() => {
            // Check if there's a return URL stored in sessionStorage
            const returnUrl = sessionStorage.getItem('returnUrl');
            if (returnUrl) {
              sessionStorage.removeItem('returnUrl'); // Clean up
              window.location.href = returnUrl;
            } else {
              // Use the correct base path for redirection
              const basePath = window.location.pathname.startsWith('/Hackathon-Humanoid-Robotics-Book') ? '/Hackathon-Humanoid-Robotics-Book' : '';
              if (window.location.hash === '#profile') {
                window.location.href = `${basePath}/profile`;
              } else {
                window.location.href = `${basePath}/`;
              }
            }
          }, 500); // Reduced from 1000ms to 500ms for faster redirect
        } else {
          setMessage(data.detail || 'Login failed');
        }
      } else {
        // Registration request
        const response = await fetch(`${apiBaseUrl}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            username: formData.username,
            password: formData.password,
            programming_experience: formData.programming_experience,
            robotics_knowledge: formData.robotics_knowledge,
            hardware_availability: formData.hardware_availability
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store token and user info
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('token_type', data.token_type);
          localStorage.setItem('username', formData.username);

          // Update auth context
          login({
            token: data.access_token,
            username: formData.username
          });

          // Dispatch auth change event to notify navbar
          window.dispatchEvent(new CustomEvent('authChange', { detail: { isAuthenticated: true } }));

          setMessage('Registration successful! Redirecting...');
          setTimeout(() => {
            // Check if there's a return URL stored in sessionStorage
            const returnUrl = sessionStorage.getItem('returnUrl');
            if (returnUrl) {
              sessionStorage.removeItem('returnUrl'); // Clean up
              window.location.href = returnUrl;
            } else {
              // Use the correct base path for redirection
              const basePath = window.location.pathname.startsWith('/Hackathon-Humanoid-Robotics-Book') ? '/Hackathon-Humanoid-Robotics-Book' : '';
              window.location.href = `${basePath}/`;
            }
          }, 500); // Reduced from 1000ms to 500ms for faster redirect
        } else {
          setMessage(data.detail || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setMessage('Network error: Unable to connect to the server. Please make sure the backend is running.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  // If showing profile and user is authenticated, redirect to profile page
  if (showProfile && isAuthenticated) {
    // Redirect to the profile page instead of showing the embedded profile view
    const basePath = window.location.pathname.startsWith('/Hackathon-Humanoid-Robotics-Book') ? '/Hackathon-Humanoid-Robotics-Book' : '';
    window.location.href = `${basePath}/profile`;
    return null;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Humanoid Robotics Book</h1>
          <p>Access your personalized learning experience</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true);
              setShowProfile(false);
            }}
          >
            Login
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setShowProfile(false);
            }}
          >
            Sign Up
          </button>
        </div>

        {message && (
          <div className={message.includes('successful') ? 'success-message neon' : 'error-message'}>
            {message}
          </div>
        )}

        <div className="auth-form-container">
          <form onSubmit={handleSubmit} className="auth-form">
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required={!isLogin}
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your password"
              />
            </div>

            {!isLogin && (
              <>
                <div className="form-group">
                  <label htmlFor="programming_experience">Programming Experience:</label>
                  <input
                    type="text"
                    id="programming_experience"
                    name="programming_experience"
                    value={formData.programming_experience}
                    onChange={handleChange}
                    placeholder="e.g., Python, C++, ROS, JavaScript"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="robotics_knowledge">Robotics Knowledge:</label>
                  <select
                    id="robotics_knowledge"
                    name="robotics_knowledge"
                    value={formData.robotics_knowledge}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select your level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="hardware_availability">Hardware Availability:</label>
                  <textarea
                    id="hardware_availability"
                    name="hardware_availability"
                    value={formData.hardware_availability}
                    onChange={handleChange}
                    placeholder="e.g., NVIDIA Jetson, GPU, Robot Lab, etc."
                    rows="3"
                    className="form-input"
                  />
                </div>
              </>
            )}

            <button type="submit" className="submit-button">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>

            <div className="auth-footer">
              <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;