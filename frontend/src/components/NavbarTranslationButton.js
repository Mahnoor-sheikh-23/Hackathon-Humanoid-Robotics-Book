import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

const NavbarTranslationButton = () => {
  const [isTranslated, setIsTranslated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Reset loading state when location changes
  useEffect(() => {
    setIsLoading(false);
  }, [location]);

  const toggleTranslation = async () => {
    if (isLoading) return;

    if (isTranslated) {
      // Restore original content
      restoreOriginalContent();
      document.body.dir = 'ltr';
    } else {
      // Translate content using MyMemory API
      setIsLoading(true);
      await translatePageContent();
      document.body.dir = 'rtl';
    }
    setIsTranslated(!isTranslated);
  };

  const translateText = async (text) => {
    if (!text.trim()) return text;

    try {
      // Use MyMemory API for translation
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ur`
      );

      const data = await response.json();
      return data.responseData.translatedText || text;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text if translation fails
    }
  };

  const translatePageContent = async () => {
    // Clear any previously translated content to avoid duplication
    restoreOriginalContent();

    // Target only the main content area, excluding sidebars, navigation, and technical elements
    const contentElements = document.querySelectorAll(
      '.markdown h1, .markdown h2, .markdown h3, .markdown h4, .markdown h5, .markdown h6, ' +
      '.markdown p, .markdown li, .markdown td, .markdown th, .markdown blockquote, ' +
      '.markdown dd, .markdown dt, .markdown section'
    );

    // Collect all text content to translate
    const elementsToTranslate = [];

    for (const element of contentElements) {
      const originalText = element.textContent.trim();
      if (originalText && originalText.length > 0 && originalText.length < 500) { // Limit text length
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

    setIsLoading(false);
  };

  const restoreOriginalContent = () => {
    const translatedElements = document.querySelectorAll('[data-original-content]');
    for (const element of translatedElements) {
      element.textContent = element.getAttribute('data-original-content');
      element.removeAttribute('data-original-content');
    }
  };

  return (
    <button
      onClick={toggleTranslation}
      className="navbar-translation-button"
      disabled={isLoading}
      style={{
        padding: '4px 8px',
        backgroundColor: isLoading ? '#cccccc' : '#4a6fa5',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        marginLeft: '8px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {isLoading ? '...' : (isTranslated ? 'EN' : 'UR')}
    </button>
  );
};

export default NavbarTranslationButton;