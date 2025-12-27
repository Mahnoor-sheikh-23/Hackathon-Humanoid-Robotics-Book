// Immediately check authentication status and redirect if needed
if (typeof window !== 'undefined') {
  // List of protected paths that require authentication
  const protectedPaths = [
    '/docs',
    '/module',
    '/ch',
    '/foundation',
    '/tutorials',
    '/research-papers',
    '/support',
    '/contact'
  ];

  // Check if we're on a protected page and redirect if not authenticated
  const checkAuth = () => {
    const currentPath = window.location.pathname;
    const isProtected = protectedPaths.some(path => currentPath.includes(path));

    // Only perform expensive auth check if we're on a protected path
    if (isProtected) {
      // Check if user is authenticated by looking for the token in localStorage
      const token = localStorage.getItem('access_token');
      if (!token) {
        // Store the current URL to return to after login
        sessionStorage.setItem('returnUrl', window.location.href);
        // Redirect to auth page with base path immediately
        const basePath = window.location.pathname.startsWith('/Hackathon-Humanoid-Robotics-Book') ? '/Hackathon-Humanoid-Robotics-Book' : '';
        window.location.href = `${basePath}/auth`;
        return true; // Indicate that redirect happened
      }
    }
    return false;
  };

  // Run the check immediately when the script loads
  const redirected = checkAuth();

  // If we didn't redirect immediately (because we were on a non-protected page initially),
  // set up monitoring for navigation to protected pages
  if (!redirected) {
    // Monitor for URL changes using the History API
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(state, title, url) {
      originalPushState.call(this, state, title, url);
      // Check auth after navigation to handle protected paths
      // Use a minimal timeout to not interfere with Docusaurus routing
      setTimeout(() => {
        if (url && protectedPaths.some(path => url.includes(path))) {
          checkAuth();
        }
      }, 1); // Very short timeout to allow Docusaurus routing to complete
    };

    history.replaceState = function(state, title, url) {
      originalReplaceState.call(this, state, title, url);
      // Check auth after navigation to handle protected paths
      // Use a minimal timeout to not interfere with Docusaurus routing
      setTimeout(() => {
        if (url && protectedPaths.some(path => url.includes(path))) {
          checkAuth();
        }
      }, 1); // Very short timeout to allow Docusaurus routing to complete
    };

    // Also monitor for hash changes and popstate for client-side navigation
    // Only check auth if current path is protected to avoid slowing down navigation
    window.addEventListener('popstate', function() {
      const currentPath = window.location.pathname;
      const isProtected = protectedPaths.some(path => currentPath.includes(path));
      if (isProtected) {
        checkAuth();
      }
    });
    window.addEventListener('hashchange', function() {
      const currentPath = window.location.pathname;
      const isProtected = protectedPaths.some(path => currentPath.includes(path));
      if (isProtected) {
        checkAuth();
      }
    });
  }
}