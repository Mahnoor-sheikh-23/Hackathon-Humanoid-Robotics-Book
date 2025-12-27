import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '../components/Auth/AuthContext';
import Chatbot from '../components/Chatbot';
import TranslationButton from '../components/TranslationButton';
import MobileSidebar from '../components/MobileSidebar';
import ChapterPersonalization from '../components/ChapterPersonalization';

// Component to show auth links in navbar area
const AuthLinks = () => {
  const { user, logout: contextLogout, isAuthenticated, loading } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    contextLogout();
  };

  // Function to update navbar based on auth status
  const updateNavbar = () => {
    // Find the desktop navbar container
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Check if auth links container already exists for desktop
    let authContainer = document.getElementById('auth-links-container');
    if (!authContainer) {
      // Create a container for auth links
      authContainer = document.createElement('div');
      authContainer.id = 'auth-links-container';
      authContainer.style.display = 'flex';
      authContainer.style.alignItems = 'center';
      authContainer.style.gap = '1rem';
      authContainer.style.marginLeft = '1rem';

      // Add to the right side of the navbar
      const navbarRight = document.querySelector('.navbar__items--right');
      if (navbarRight) {
        // Insert before the last few items to not interfere with theme controls
        navbarRight.appendChild(authContainer);
      } else {
        // If no right items container exists, add to main navbar
        navbar.appendChild(authContainer);
      }
    }

    // Update the desktop content based on auth status
    authContainer.innerHTML = '';

    // Check if we're on a mobile view (screen width < 997px is Bootstrap's breakpoint for md)
    const isMobile = window.innerWidth < 997;

    // Check if we're on a documentation page
    const isDocsPage = window.location.pathname.startsWith('/docs/');

    // Only show auth links if we're done loading the auth state AND we're not on mobile
    if (!loading && !isMobile) {
      if (isAuthenticated) {
        // Add personalization button to documentation pages only
        if (isDocsPage && authContainer) {
          // Create the personalization button
          const personalizationBtn = document.createElement('button');
          personalizationBtn.className = 'navbar__link personalization-btn';
          personalizationBtn.textContent = '🎯 Personalize';
          personalizationBtn.style.marginRight = '1rem';
          personalizationBtn.style.backgroundColor = '#007cba';
          personalizationBtn.style.border = 'none';
          personalizationBtn.style.color = 'white';
          personalizationBtn.style.padding = '0.25rem 0.75rem';
          personalizationBtn.style.borderRadius = '4px';
          personalizationBtn.style.cursor = 'pointer';
          personalizationBtn.title = 'Personalize content based on your profile';

          // Add click handler
          personalizationBtn.onclick = (e) => {
            e.preventDefault();

            // Get current content
            const contentElement = document.querySelector('.markdown');
            if (!contentElement) {
              alert('Content not found');
              return;
            }

            const originalContent = contentElement.innerHTML;
            const userProfile = {
              programming_experience: user?.programmingExperience || '',
              robotics_knowledge: user?.roboticsKnowledge || '',
              hardware_availability: user?.hardwareAvailability || ''
            };

            // Determine API URL
            const hostname = window.location.hostname;
            const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
            const apiUrl = isLocalhost ? 'http://localhost:8000' : 'https://hackathon-humanoid-robotics-book-production.up.railway.app';

            // Show processing state
            personalizationBtn.textContent = 'Processing...';
            personalizationBtn.disabled = true;

            fetch(`${apiUrl}/personalize/`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                content: originalContent,
                user_profile: userProfile
              })
            })
            .then(response => {
              if (response.ok) {
                return response.json().then(data => {
                  contentElement.innerHTML = data.personalized_content;
                  contentElement.setAttribute('data-original-content', originalContent);

                  // Update button to revert
                  personalizationBtn.textContent = '👁️ Original';
                  personalizationBtn.title = 'Revert to original content';

                  // Set up revert functionality
                  personalizationBtn.onclick = (e) => {
                    e.preventDefault();
                    const original = contentElement.getAttribute('data-original-content');
                    if (original) {
                      contentElement.innerHTML = original;
                      personalizationBtn.textContent = '🎯 Personalize';
                      personalizationBtn.title = 'Personalize content based on your profile';
                      // Reset to personalization functionality
                      personalizationBtn.onclick = arguments.callee;
                    }
                  };
                });
              } else {
                alert('Failed to personalize content');
                personalizationBtn.textContent = '🎯 Personalize';
                personalizationBtn.disabled = false;
              }
            })
            .catch(error => {
              console.error('Error:', error);
              alert('Error personalizing content');
              personalizationBtn.textContent = '🎯 Personalize';
              personalizationBtn.disabled = false;
            });
          };

          // Add the button to the auth container
          authContainer.appendChild(personalizationBtn);
        }

        const profileLink = document.createElement('a');
        // Use the correct path with base URL
        const basePath = window.location.pathname.startsWith('/Hackathon-Humanoid-Robotics-Book') ? '/Hackathon-Humanoid-Robotics-Book' : '';
        profileLink.href = `${basePath}/profile`;
        profileLink.className = 'navbar__link';
        profileLink.textContent = 'Profile';
        profileLink.style.marginRight = '1rem';
        // Handle profile link click to navigate to profile page
        profileLink.onclick = (e) => {
          e.preventDefault();
          window.location.href = `${basePath}/profile`;
        };
        authContainer.appendChild(profileLink);

        const logoutLink = document.createElement('a');
        logoutLink.href = '#';
        logoutLink.className = 'navbar__link';
        logoutLink.textContent = 'Logout';
        logoutLink.onclick = (e) => {
          e.preventDefault();
          handleLogout(e);
        };
        authContainer.appendChild(logoutLink);
      } else {
        const basePath = window.location.pathname.startsWith('/Hackathon-Humanoid-Robotics-Book') ? '/Hackathon-Humanoid-Robotics-Book' : '';
        const loginLink = document.createElement('a');
        loginLink.href = `${basePath}/auth`;
        loginLink.className = 'navbar__link';
        loginLink.textContent = 'Login';
        loginLink.style.marginRight = '1rem';
        loginLink.onclick = (e) => {
          e.preventDefault();
          window.location.href = `${basePath}/auth`;
        };
        authContainer.appendChild(loginLink);

        const signupLink = document.createElement('a');
        signupLink.href = `${basePath}/auth`;
        signupLink.className = 'navbar__link';
        signupLink.textContent = 'Sign Up';
        signupLink.onclick = (e) => {
          e.preventDefault();
          window.location.href = `${basePath}/auth`;
        };
        authContainer.appendChild(signupLink);
      }
    } else if (isMobile) {
      // On mobile, hide the navbar auth links since they appear in the sidebar
      if (authContainer) {
        authContainer.style.display = 'none';
      }
    }
  };

  // Update navbar when component mounts and when auth state changes
  useEffect(() => {
    // First, run the original updateNavbar
    updateNavbar();

    // Set up a more persistent mutation observer to handle navbar changes
    const navbarObserver = new MutationObserver((mutations) => {
      let needsUpdate = false;

      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const node of [...mutation.addedNodes, ...mutation.removedNodes]) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node;
              if (element.classList &&
                  (element.classList.contains('navbar') ||
                   element.classList.contains('navbar__items--right') ||
                   element.classList.contains('navbar__inner') ||
                   element.classList.contains('navbar-sidebar'))) {
                needsUpdate = true;
                break;
              }
            }
          }
        }
      }

      if (needsUpdate) {
        setTimeout(updateNavbar, 100);
      }
    });

    navbarObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Listen for auth change events
    const handleAuthChange = () => {
      // Update navbar after a short delay to ensure state has been updated
      setTimeout(updateNavbar, 100);
    };
    window.addEventListener('authChange', handleAuthChange);

    // Listen for storage events to detect logout from other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'access_token' && e.newValue === null) {
        // Token was removed, update navbar
        setTimeout(updateNavbar, 100);
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Listen for mobile menu toggle events
    const handleMobileMenuToggle = () => {
      // Update mobile menu when it's opened
      setTimeout(updateNavbar, 100);
    };

    // Listen for clicks that might affect the mobile menu
    document.addEventListener('click', (e) => {
      // Check if mobile menu toggle button was clicked
      if (e.target.closest('.navbar__toggle') || e.target.closest('.navbar-sidebar__close')) {
        setTimeout(updateNavbar, 100);
      }
    });

    // Also listen for keyboard events that might open/close mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // When escape is pressed, menu might be closing, but let's update anyway
        setTimeout(updateNavbar, 100);
      }
    });

    // Set up a periodic check to ensure links are always present (every 5 seconds)
    const interval = setInterval(() => {
      updateNavbar();
    }, 5000);

    // Add resize event listener to handle mobile/desktop switching
    const handleResize = () => {
      updateNavbar();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      navbarObserver.disconnect();
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('click', handleMobileMenuToggle);
      window.removeEventListener('resize', handleResize); // Clean up the resize listener
      clearInterval(interval); // Clean up the interval
    };
  }, [isAuthenticated, user, loading]);

  return null; // This component doesn't render anything itself
};

const RootWithAuth = ({ children }) => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [sidebarShown, setSidebarShown] = useState(false);
  const [ragApiUrl, setRagApiUrl] = useState('');

  useEffect(() => {
    // Get the RAG API URL from Docusaurus config
    if (typeof window !== 'undefined') {
      // In browser, use the config from Docusaurus
      const config = window?.__APP_DATA__?.siteConfig?.customFields?.ragApiUrl;
      if (config) {
        setRagApiUrl(config);
      } else {
        // Fallback to default
        setRagApiUrl('https://hackathon-humanoid-robotics-book-production.up.railway.app/');
      }
    }

    // Add event listener to handle mobile menu toggle
    const handleMobileMenuToggle = (e) => {
      if (e.target.closest('.navbar__toggle')) {
        setSidebarShown(prev => !prev);
      }
    };

    document.addEventListener('click', handleMobileMenuToggle);

    return () => {
      document.removeEventListener('click', handleMobileMenuToggle);
    };
  }, []);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const toggleSidebar = () => {
    setSidebarShown(!sidebarShown);
  };

  // The effect for personalization event handling has been removed
  // as personalization is now handled in the DocPage Layout component

  // Removed the personalization button injection from Root.js
  // Using the DocPage theme override instead for better reliability

  return (
    <AuthProvider>
      <AuthLinks />
      <>
        {children}
        <MobileSidebar sidebarShown={sidebarShown} toggleSidebar={toggleSidebar} />
        <TranslationButton />
        <div className="chatbot-launcher">
          {/* Personalization button - available on all pages for logged-in users */}
          {typeof window !== 'undefined' && localStorage.getItem('access_token') && (
            <button
              className="personalization-btn-near-chatbot"
              onClick={async () => {
                // Get current content
                const contentElement = document.querySelector('.markdown');
                if (!contentElement) {
                  alert('No content found on this page to personalize');
                  return;
                }

                const originalContent = contentElement.innerHTML;

                // Get user from localStorage or context
                const token = localStorage.getItem('access_token');
                if (!token) {
                  alert('Please log in to use personalization feature');
                  return;
                }

                // Get user profile
                const user = window.__authContext?.user || null;
                const userProfile = {
                  programming_experience: user?.programmingExperience || '',
                  robotics_knowledge: user?.roboticsKnowledge || '',
                  hardware_availability: user?.hardwareAvailability || ''
                };

                // Determine API URL based on the ragApiUrl state from the component
                const hostname = window.location.hostname;
                const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
                const apiUrl = isLocalhost ? 'http://localhost:8000' : 'https://hackathon-humanoid-robotics-book-production.up.railway.app';

                try {
                  // Show processing state
                  const personalizationBtn = document.querySelector('.personalization-btn-near-chatbot');
                  if (personalizationBtn) {
                    personalizationBtn.innerHTML = '<div style="width: 20px; height: 20px; border: 2px solid #fff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>';
                    personalizationBtn.disabled = true;

                    // Add CSS for the spinner animation
                    if (!document.querySelector('#spinner-animation')) {
                      const style = document.createElement('style');
                      style.id = 'spinner-animation';
                      style.textContent = `
                        @keyframes spin {
                          0% { transform: rotate(0deg); }
                          100% { transform: rotate(360deg); }
                        }
                      `;
                      document.head.appendChild(style);
                    }
                  }

                  // First, let's test if we can reach the API by making a simple test call
                  console.log('Attempting to personalize content...');
                  console.log('API URL:', `${apiUrl}/personalize/`);
                  console.log('User profile:', userProfile);
                  console.log('Content length:', originalContent.length);

                  const response = await fetch(`${apiUrl}/personalize/`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`  // Add proper authorization header
                    },
                    body: JSON.stringify({
                      content: originalContent,
                      user_profile: userProfile
                    })
                  });

                  console.log('Response status:', response.status);

                  if (response.ok) {
                    const data = await response.json();
                    console.log('Received personalized content, length:', data.personalized_content?.length || 0);

                    if (data.personalized_content) {
                      contentElement.innerHTML = data.personalized_content;
                      contentElement.setAttribute('data-original-content', originalContent);

                      // Update button to revert
                      if (personalizationBtn) {
                        personalizationBtn.innerHTML = '👁️';
                        personalizationBtn.title = 'Revert to original content';
                        personalizationBtn.onclick = () => {
                          const original = contentElement.getAttribute('data-original-content');
                          if (original) {
                            contentElement.innerHTML = original;
                            personalizationBtn.innerHTML = '🎯';
                            personalizationBtn.title = 'Personalize content based on your profile';
                            personalizationBtn.onclick = arguments.callee; // Reset to original function
                          }
                        };
                      }

                      // Show success message
                      alert('Content has been personalized successfully!');
                    } else {
                      alert('Received response but no personalized content. Please check console for details.');
                    }
                  } else {
                    const errorData = await response.json().catch(() => ({}));
                    console.error('Personalization error:', errorData);
                    alert(`Failed to personalize content: ${response.status} - ${errorData.detail || 'Unknown error'}`);
                  }
                } catch (error) {
                  console.error('Error:', error);
                  console.error('Error details:', error.message, error.stack);
                  alert(`Error personalizing content: ${error.message}`);
                } finally {
                  // Reset button state if it's still in processing state
                  const personalizationBtn = document.querySelector('.personalization-btn-near-chatbot');
                  if (personalizationBtn && personalizationBtn.innerHTML.includes('spin')) {
                    const hasOriginalContent = document.querySelector('.markdown')?.getAttribute('data-original-content');
                    personalizationBtn.innerHTML = hasOriginalContent ? '👁️' : '🎯';
                    personalizationBtn.title = hasOriginalContent ? 'Revert to original content' : 'Personalize content based on your profile';
                    personalizationBtn.disabled = false;
                  }
                }
              }}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#007cba',
                fontSize: '24px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                position: 'relative',
                overflow: 'hidden',
                margin: '0 10px',
                transition: 'all 0.3s ease',
                zIndex: 1000
              }}
              title="Personalize content based on your profile"
            >
              🎯
            </button>
          )}
          <button onClick={toggleChatbot} className="chatbot-button">
            💬
          </button>
        </div>

        {showChatbot && ragApiUrl && (
          <div className="chatbot-widget">
            <div className="chatbot-header">
              <h3>Physical AI & Humanoid Robotics Assistant</h3>
              <button
                onClick={toggleChatbot}
                className="chatbot-close-button"
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>
            <Chatbot ragApiUrl={ragApiUrl} onClose={toggleChatbot} />
          </div>
        )}
      </>
    </AuthProvider>
  );
};

export default RootWithAuth;