import React, { useState, useEffect } from 'react';

const TranslationButton = () => {
  const [isTranslated, setIsTranslated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window !== 'undefined') {
      const checkAndSetShowButton = () => {
        const pathname = window.location.pathname;
        // Check for various documentation path patterns
        const isDocsPage = pathname.startsWith('/docs/') ||
                          pathname.includes('/module') ||
                          pathname.includes('/ch') ||
                          pathname.includes('/appendices') ||
                          pathname.includes('/capstone') ||
                          pathname.includes('/introduction');

        setShowButton(isDocsPage);
      };

      // Initial check
      checkAndSetShowButton();

      // Listen for route changes (for SPA navigation)
      const handleRouteChange = () => {
        setTimeout(() => {
          checkAndSetShowButton();
        }, 100); // Small delay to ensure route has fully changed
      };

      // For Docusaurus, we can listen to the history API
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;

      history.pushState = function (...args) {
        const result = originalPushState.apply(this, args);
        handleRouteChange();
        return result;
      };

      history.replaceState = function (...args) {
        const result = originalReplaceState.apply(this, args);
        handleRouteChange();
        return result;
      };

      window.addEventListener('popstate', handleRouteChange);

      // Also listen to hash changes which might occur in Docusaurus
      window.addEventListener('hashchange', handleRouteChange);

      return () => {
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
        window.removeEventListener('popstate', handleRouteChange);
        window.removeEventListener('hashchange', handleRouteChange);
      };
    }
  }, []);

  const toggleTranslation = async () => {
    if (isLoading) return;

    setIsLoading(true);

    if (isTranslated) {
      // Restore original content
      restoreOriginalContent();
      document.body.dir = 'ltr';
      setIsTranslated(false);
    } else {
      // Translate content
      await translatePageContent();
      document.body.dir = 'rtl';
      setIsTranslated(true);
    }

    setIsLoading(false);
  };

  const translateText = async (text) => {
    if (!text.trim()) return text;

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ur`
      );

      const data = await response.json();
      return data.responseData.translatedText || text;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  const translatePageContent = async () => {
    // Clear any previously translated content
    restoreOriginalContent();

    // Target only the main content area
    const contentElements = document.querySelectorAll(
      '.markdown h1, .markdown h2, .markdown h3, .markdown h4, .markdown h5, .markdown h6, ' +
      '.markdown p, .markdown li, .markdown td, .markdown th, .markdown blockquote, ' +
      '.markdown dd, .markdown dt, .markdown section'
    );

    // Collect all text content to translate
    const elementsToTranslate = [];
    for (const element of contentElements) {
      const originalText = element.textContent.trim();
      if (originalText && originalText.length > 0 && originalText.length < 500) {
        if (!element.hasAttribute('data-original-content')) {
          element.setAttribute('data-original-content', originalText);
        }
        elementsToTranslate.push({ element, originalText });
      }
    }

    // Translate each element's content
    for (const { element, originalText } of elementsToTranslate) {
      const translatedText = await translateText(originalText);
      element.textContent = translatedText;
    }
  };

  const restoreOriginalContent = () => {
    const translatedElements = document.querySelectorAll('[data-original-content]');
    for (const element of translatedElements) {
      element.textContent = element.getAttribute('data-original-content');
      element.removeAttribute('data-original-content');
    }
  };

  // Only render if we're on a /docs page
  if (!showButton) {
    return null;
  }

  return (
    <button
      onClick={toggleTranslation}
      disabled={isLoading}
      style={{
        position: 'fixed',
        top: '70px',  // Below the navbar
        right: '20px', // Right side
        zIndex: '10000',
        padding: '8px 16px',
        backgroundColor: isLoading ? '#cccccc' : '#4a6fa5',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        fontWeight: '500',
      }}
    >
      {isLoading ? 'Translating...' : (isTranslated ? 'View English' : 'Translate to Urdu')}
    </button>
  );
};

export default TranslationButton;