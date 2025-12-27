import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/Auth/AuthContext';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    programming_experience: '',
    robotics_knowledge: '',
    hardware_availability: ''
  });
  const [message, setMessage] = useState('');
  const { user: authUser, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('access_token');

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

    if (!token) {
      setMessage('Please log in to view your profile');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setFormData({
          programming_experience: userData.programming_experience || '',
          robotics_knowledge: userData.robotics_knowledge || '',
          hardware_availability: userData.hardware_availability || ''
        });
      } else {
        setMessage('Failed to load profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage('Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');

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

    if (!token) return;

    try {
      const response = await fetch(`${apiBaseUrl}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Profile updated successfully!');
        setEditing(false);
        fetchUserProfile(); // Refresh profile data
      } else {
        const errorData = await response.json();
        setMessage(errorData.detail || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('username');
    // Dispatch auth change event to notify navbar
    window.dispatchEvent(new CustomEvent('authChange', { detail: { isAuthenticated: false } }));
    // Use proper base path for redirect
    const basePath = window.location.pathname.startsWith('/Hackathon-Humanoid-Robotics-Book') ? '/Hackathon-Humanoid-Robotics-Book' : '';
    window.location.href = `${basePath}/auth`;
  };

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Profile</h1>
            <p>Loading your information...</p>
          </div>
          <div className="auth-form-container">
            <div className="auth-form">
              <div className="loading">Loading profile...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Profile</h1>
            <p>Please log in to view your profile</p>
          </div>
          <div className="auth-form-container">
            <div className="auth-form">
              <button
                onClick={() => window.location.href = '/auth'}
                className="submit-button"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card profile-card">
        <div className="auth-header profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <span className="initials">
                {user?.username?.charAt(0)?.toUpperCase() || authUser?.username?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>
          <h1>Your Profile</h1>
          <p className="profile-subtitle">Manage your account and preferences</p>
        </div>

        {message && (
          <div className={message.includes('successfully') ? 'success-message neon' : 'error-message'}>
            {message}
          </div>
        )}

        <div className="auth-form-container">
          <div className="auth-form profile-form">
            <div className="profile-header-section">
              <h2 className="welcome-text">
                Welcome, <span className="highlight">{user?.username || authUser?.username || 'User'}!</span>
              </h2>
              <button onClick={handleLogout} className="logout-button">
                <i className="logout-icon">🚪</i> Logout
              </button>
            </div>

            <div className="profile-section">
              <h3 className="section-title">
                <i className="section-icon">👤</i> Personal Information
              </h3>
              <div className="profile-grid">
                <div className="profile-card-item">
                  <label className="profile-label">Username</label>
                  <div className="profile-value">{user?.username || authUser?.username || 'Not provided'}</div>
                </div>
                <div className="profile-card-item">
                  <label className="profile-label">Email</label>
                  <div className="profile-value">{user?.email || 'Not provided'}</div>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3 className="section-title">
                <i className="section-icon">🤖</i> Technical Background
              </h3>
              <div className="profile-grid">
                <div className="profile-card-item">
                  <label className="profile-label">Programming Experience</label>
                  <div className="profile-value">{user?.programming_experience || 'Not provided'}</div>
                </div>
                <div className="profile-card-item">
                  <label className="profile-label">Robotics Knowledge</label>
                  <div className="profile-value">{user?.robotics_knowledge || 'Not provided'}</div>
                </div>
                <div className="profile-card-item full-width">
                  <label className="profile-label">Hardware Availability</label>
                  <div className="profile-value profile-textarea">
                    {user?.hardware_availability || 'Not provided'}
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button
                onClick={() => setEditing(!editing)}
                className="edit-button"
              >
                {editing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
              <button
                onClick={() => {
                  // Navigate back to main page
                  const basePath = window.location.pathname.startsWith('/Hackathon-Humanoid-Robotics-Book') ? '/Hackathon-Humanoid-Robotics-Book' : '';
                  window.location.href = `${basePath}/`;
                }}
                className="dashboard-button"
              >
                Back to Dashboard
              </button>
            </div>

            {editing && (
              <div className="profile-edit-section">
                <h3 className="section-title edit-title">
                  <i className="section-icon">✏️</i> Edit Profile
                </h3>
                <form onSubmit={handleSaveProfile} className="profile-edit-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="programming_experience">Programming Experience:</label>
                      <input
                        type="text"
                        id="programming_experience"
                        name="programming_experience"
                        value={formData.programming_experience}
                        onChange={handleInputChange}
                        placeholder="e.g., Python, C++, ROS, JavaScript"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="robotics_knowledge">Robotics Knowledge:</label>
                      <select
                        id="robotics_knowledge"
                        name="robotics_knowledge"
                        value={formData.robotics_knowledge}
                        onChange={handleInputChange}
                        className="form-input"
                      >
                        <option value="">Select your level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group full-width">
                      <label htmlFor="hardware_availability">Hardware Availability:</label>
                      <textarea
                        id="hardware_availability"
                        name="hardware_availability"
                        value={formData.hardware_availability}
                        onChange={handleInputChange}
                        placeholder="e.g., NVIDIA Jetson, GPU, Robot Lab, etc."
                        rows="4"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="edit-actions">
                    <button type="submit" className="save-button">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-card {
          animation: fadeInUp 0.6s ease-out;
          overflow: visible;
        }

        .profile-header {
          text-align: center;
          margin-bottom: 30px;
          position: relative;
        }

        .profile-avatar {
          margin-bottom: 20px;
        }

        .avatar-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #64ffda 0%, #0a192f 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          border: 3px solid rgba(100, 255, 218, 0.3);
          box-shadow: 0 0 30px rgba(100, 255, 218, 0.2);
          animation: pulse 2s infinite;
        }

        .initials {
          font-size: 2.5rem;
          font-weight: bold;
          color: #64ffda;
        }

        .profile-subtitle {
          color: #8892b0;
          font-size: 1.1rem;
          margin-top: 10px;
        }

        .profile-header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(100, 255, 218, 0.1);
        }

        .welcome-text {
          color: #ccd6f6;
          font-size: 1.8rem;
          margin: 0;
          font-weight: 600;
        }

        .highlight {
          color: #64ffda;
          text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
        }

        .logout-button {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logout-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
        }

        .logout-icon {
          font-size: 18px;
        }

        .profile-section {
          margin-bottom: 35px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
          padding: 25px;
          border: 1px solid rgba(100, 255, 218, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .profile-section:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          border-color: rgba(100, 255, 218, 0.2);
        }

        .section-title {
          color: #64ffda;
          font-size: 1.4rem;
          margin: 0 0 20px 0;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
        }

        .edit-title {
          color: #64ffda;
          margin-top: 30px;
          border-top: 1px solid rgba(100, 255, 218, 0.1);
          padding-top: 25px;
        }

        .section-icon {
          font-size: 1.2rem;
        }

        .profile-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .profile-card-item {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .profile-card-item:hover {
          background: rgba(100, 255, 218, 0.05);
          border-color: rgba(100, 255, 218, 0.2);
          transform: translateY(-2px);
        }

        .profile-card-item.full-width {
          grid-column: 1 / -1;
        }

        .profile-label {
          display: block;
          color: #8892b0;
          font-size: 0.9rem;
          margin-bottom: 8px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .profile-value {
          color: #ccd6f6;
          font-size: 1.1rem;
          font-weight: 500;
        }

        .profile-textarea {
          min-height: 80px;
          display: flex;
          align-items: center;
        }

        .profile-actions {
          display: flex;
          gap: 15px;
          margin: 30px 0;
          justify-content: center;
        }

        .edit-button {
          background: linear-gradient(135deg, #64ffda 0%, #52e0c4 100%);
          color: #0a192f;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .edit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(100, 255, 218, 0.3);
        }

        .dashboard-button {
          background: linear-gradient(135deg, #5d68ff 0%, #64ffda 100%);
          color: #0a192f;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .dashboard-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(100, 255, 218, 0.3);
        }

        .profile-edit-section {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
          padding: 25px;
          border: 1px solid rgba(100, 255, 218, 0.1);
          margin-top: 20px;
          animation: slideIn 0.4s ease-out;
        }

        .profile-edit-form {
          margin-top: 20px;
        }

        .form-row {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }

        .form-row .form-group {
          flex: 1;
        }

        .form-group.full-width {
          flex: 1 1 100%;
        }

        .edit-actions {
          text-align: center;
          margin-top: 20px;
        }

        .save-button {
          background: linear-gradient(135deg, #64ffda 0%, #52e0c4 100%);
          color: #0a192f;
          border: none;
          padding: 14px 30px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .save-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(100, 255, 218, 0.3);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(100, 255, 218, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(100, 255, 218, 0); }
          100% { box-shadow: 0 0 0 0 rgba(100, 255, 218, 0); }
        }

        @media (max-width: 768px) {
          .profile-header-section {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }

          .logout-button {
            align-self: center;
            width: fit-content;
            margin: 0 auto;
          }

          .profile-grid {
            grid-template-columns: 1fr;
          }

          .profile-actions {
            flex-direction: column;
            align-items: center;
          }

          .form-row {
            flex-direction: column;
            gap: 0;
          }

          .welcome-text {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;