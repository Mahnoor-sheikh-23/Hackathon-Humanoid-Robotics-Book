import React, { useState } from 'react';

const SignupForm = ({ onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    programming_experience: '',
    robotics_knowledge: '',
    hardware_availability: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const submitData = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        programming_experience: formData.programming_experience,
        robotics_knowledge: formData.robotics_knowledge,
        hardware_availability: formData.hardware_availability
      };

      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('token_type', data.token_type);

        // Call the success callback
        onSignupSuccess && onSignupSuccess(data);
      } else {
        setError(data.detail || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Sign Up</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

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
            />
          </div>
        </div>

        <div className="form-row">
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

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

        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;