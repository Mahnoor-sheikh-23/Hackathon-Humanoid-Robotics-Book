import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem('access_token');
    if (token) {
      // In a real implementation, we'd verify the token and fetch user data
      // For now, we'll just set a basic user object
      // We'll also try to get user info from the token payload or localStorage
      const tokenPayload = parseJwt(token);
      setUser({
        token,
        username: tokenPayload?.username || localStorage.getItem('username') || 'User'
      });
    }
    setLoading(false);
  }, []);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error parsing JWT:', e);
      return null;
    }
  };

  const login = (userData) => {
    setUser(userData);

    // Dispatch a custom event to notify other parts of the app
    window.dispatchEvent(new CustomEvent('authChange', { detail: { isAuthenticated: true } }));
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('username');
    setUser(null);

    // Dispatch a custom event to notify other parts of the app
    window.dispatchEvent(new CustomEvent('authChange', { detail: { isAuthenticated: false } }));

    // Redirect to home page with proper base path
    const basePath = window.location.pathname.startsWith('/Hackathon-Humanoid-Robotics-Book') ? '/Hackathon-Humanoid-Robotics-Book' : '';
    window.location.href = `${basePath}/`;
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;