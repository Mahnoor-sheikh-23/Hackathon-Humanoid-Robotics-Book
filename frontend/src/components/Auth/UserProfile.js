import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    programming_experience: '',
    robotics_knowledge: '',
    hardware_availability: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      setMessage('Please log in to view your profile');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/profile', {
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

    if (!token) return;

    try {
      const response = await fetch('http://localhost:8000/auth/profile', {
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
    window.location.href = '/auth';
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!user) {
    return (
      <div className="profile-container">
        <h2>Profile</h2>
        <p>{message}</p>
        <button onClick={() => window.location.href = '/auth'}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Welcome, {user.username}!</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="profile-info">
        <h3>Your Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          <div className="info-item">
            <label>Programming Experience:</label>
            <span>{user.programming_experience || 'Not provided'}</span>
          </div>
          <div className="info-item">
            <label>Robotics Knowledge:</label>
            <span>{user.robotics_knowledge || 'Not provided'}</span>
          </div>
          <div className="info-item">
            <label>Hardware Availability:</label>
            <span>{user.hardware_availability || 'Not provided'}</span>
          </div>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className="edit-button"
        >
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>

        {editing && (
          <form onSubmit={handleSaveProfile} className="profile-edit-form">
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

            <div className="form-group">
              <label htmlFor="hardware_availability">Hardware Availability:</label>
              <textarea
                id="hardware_availability"
                name="hardware_availability"
                value={formData.hardware_availability}
                onChange={handleInputChange}
                placeholder="e.g., NVIDIA Jetson, GPU, Robot Lab, etc."
                rows="3"
                className="form-input"
              />
            </div>

            <button type="submit" className="save-button">
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;