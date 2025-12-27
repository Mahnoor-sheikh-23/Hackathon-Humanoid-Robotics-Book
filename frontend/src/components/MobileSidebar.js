import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/Auth/AuthContext';

const MobileSidebar = ({ sidebarShown, toggleSidebar }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const [basePath, setBasePath] = useState('');

  useEffect(() => {
    const path = window.location.pathname;
    const base = path.startsWith('/Hackathon-Humanoid-Robotics-Book') ? '/Hackathon-Humanoid-Robotics-Book' : '';
    setBasePath(base);
  }, []);

  const handleLogout = () => {
    logout();
    if (toggleSidebar) toggleSidebar();
  };

  const handleLinkClick = () => {
    if (toggleSidebar) toggleSidebar();
  };

  return (
    <>
      {sidebarShown && (
        <div
          className="mobile-sidebar-overlay"
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <div
            className="mobile-sidebar-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '80%',
              maxWidth: '320px',
              height: '100vh',
              backgroundColor: '#0a192f',
              boxShadow: '-2px 0 10px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              transform: 'translateX(0)',
              transition: 'transform 0.3s ease',
            }}
          >
            <div className="mobile-sidebar-header" style={{
              padding: '1rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 26, 47, 0.8)'
            }}>
              <h3 style={{ margin: 0, color: '#64ffda', fontSize: '1.2rem', fontWeight: '600' }}>Menu</h3>
              <button
                className="mobile-sidebar-close"
                onClick={toggleSidebar}
                aria-label="Close menu"
                style={{
                  background: 'rgba(100, 255, 218, 0.1)',
                  border: '2px solid #64ffda',
                  color: '#64ffda',
                  fontSize: '1.8rem',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'normal',
                  lineHeight: '1'
                }}
              >
                ×
              </button>
            </div>

            {/* Auth Links Section - appears at the top */}
            <div className="mobile-auth-section" style={{
              padding: '1rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(100, 255, 218, 0.05)',
              marginBottom: '1rem',
              wordWrap: 'break-word',
              overflow: 'hidden'
            }}>
              {isAuthenticated ? (
                <>
                  <div style={{
                    padding: '0.5rem 0',
                    color: '#8892b0',
                    fontSize: '0.85rem',
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    Welcome, {user?.username || 'User'}
                  </div>
                  <a
                    href={`${basePath}/profile`}
                    className="menu__link"
                    onClick={handleLinkClick}
                    style={{ display: 'block', padding: '0.75rem', color: '#ccd6f6', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', wordWrap: 'break-word' }}
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="menu__link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                    style={{ display: 'block', padding: '0.75rem', color: '#ff6b6b', textDecoration: 'none', wordWrap: 'break-word' }}
                  >
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <a
                    href={`${basePath}/auth`}
                    className="menu__link"
                    onClick={handleLinkClick}
                    style={{ display: 'block', padding: '0.75rem', color: '#ccd6f6', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', wordWrap: 'break-word' }}
                  >
                    Login
                  </a>
                  <a
                    href={`${basePath}/auth`}
                    className="menu__link"
                    onClick={handleLinkClick}
                    style={{ display: 'block', padding: '0.75rem', color: '#ccd6f6', textDecoration: 'none', wordWrap: 'break-word' }}
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>

            {/* Original Docusaurus Menu Items */}
            <div className="mobile-sidebar-menu" style={{ flex: 1, overflowY: 'auto', padding: '0 1rem' }}>
              <ul className="menu__list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li className="menu__list-item" style={{ marginBottom: '0.5rem' }}>
                  <a href={`${basePath}/`} className="menu__link" style={{ display: 'block', padding: '0.75rem', color: '#ccd6f6', textDecoration: 'none', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.1)'} onMouseOut={(e) => e.target.style.backgroundColor = ''}>Home</a>
                </li>
                <li className="menu__list-item" style={{ marginBottom: '0.5rem' }}>
                  <a href={`${basePath}/docs/module1-ros2/ch3_ros2_core`} className="menu__link" style={{ display: 'block', padding: '0.75rem', color: '#ccd6f6', textDecoration: 'none', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.1)'} onMouseOut={(e) => e.target.style.backgroundColor = ''}>Reading</a>
                </li>
                <li className="menu__list-item" style={{ marginBottom: '0.5rem' }}>
                  <a href={`${basePath}/blog`} className="menu__link" style={{ display: 'block', padding: '0.75rem', color: '#ccd6f6', textDecoration: 'none', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.1)'} onMouseOut={(e) => e.target.style.backgroundColor = ''}>Blog</a>
                </li>
                <li className="menu__list-item" style={{ marginBottom: '0.5rem' }}>
                  <a href={`${basePath}/docs/module1-ros2/ch3_ros2_core`} className="menu__link" style={{ display: 'block', padding: '0.75rem', color: '#ccd6f6', textDecoration: 'none', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.1)'} onMouseOut={(e) => e.target.style.backgroundColor = ''}>Books</a>
                </li>
                <li className="menu__list-item" style={{ marginBottom: '0.5rem' }}>
                  <a href={`${basePath}/about`} className="menu__link" style={{ display: 'block', padding: '0.75rem', color: '#ccd6f6', textDecoration: 'none', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.1)'} onMouseOut={(e) => e.target.style.backgroundColor = ''}>About</a>
                </li>
              </ul>
            </div>

            <div className="mobile-sidebar-footer" style={{
              padding: '1rem',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center',
              color: '#8892b0',
              fontSize: '0.8rem'
            }}>
              Humanoid Robotics Book
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSidebar;