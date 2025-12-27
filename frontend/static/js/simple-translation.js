// Simple translation button that appears on all pages
(function() {
  // Create the translation button - appears on all pages now
  function createTranslationButton() {
    // Remove any existing translation button
    const existingBtn = document.getElementById('simple-translation-btn');
    if (existingBtn) {
      existingBtn.remove();
    }

    // Create button element - now appears on all pages
    const button = document.createElement('button');
    button.id = 'simple-translation-btn';
    button.innerHTML = 'Translate to Urdu';
    button.style.cssText = `
      position: fixed !important;
      top: 70px !important;
      right: 20px !important;
      z-index: 10000 !important;
      padding: 8px 16px !important;
      background-color: #4a6fa5 !important;
      color: white !important;
      border: none !important;
      border-radius: 4px !important;
      cursor: pointer !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2) !important;
    `;

    // Add click handler
    button.addEventListener('click', function() {
      handleTranslationToggle(button);
    });

    // Add button to the page
    document.body.appendChild(button);
  }

  // Translation state
  let isTranslated = false;
  let isLoading = false;

  // Handle translation toggle
  async function handleTranslationToggle(button) {
    if (isLoading) return;

    isLoading = true;
    button.disabled = true;
    button.innerHTML = 'Translating...';
    button.style.backgroundColor = '#cccccc';

    if (isTranslated) {
      // Restore original content
      restoreOriginalContent();
      document.body.dir = 'ltr';
      isTranslated = false;
      button.innerHTML = 'Translate to Urdu';
    } else {
      // Translate content
      await translatePageContent();
      document.body.dir = 'rtl';
      isTranslated = true;
      button.innerHTML = 'View English';
    }

    isLoading = false;
    button.disabled = false;
    button.style.backgroundColor = '#4a6fa5';
  }

  // Translate text using MyMemory API
  async function translateText(text) {
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
  }

  // Translate page content
  async function translatePageContent() {
    restoreOriginalContent(); // Clear any previous translations

    const contentElements = document.querySelectorAll(
      '.markdown h1, .markdown h2, .markdown h3, .markdown h4, .markdown h5, .markdown h6, ' +
      '.markdown p, .markdown li, .markdown td, .markdown th, .markdown blockquote, ' +
      '.markdown dd, .markdown dt, .markdown section'
    );

    // Process elements one by one to avoid blocking the UI
    for (const element of contentElements) {
      const originalText = element.textContent.trim();
      if (originalText && originalText.length > 0 && originalText.length < 500) {
        if (!element.hasAttribute('data-original-content')) {
          element.setAttribute('data-original-content', originalText);
        }

        const translatedText = await translateText(originalText);
        element.textContent = translatedText;
      }
    }
  }

  // Restore original content
  function restoreOriginalContent() {
    const translatedElements = document.querySelectorAll('[data-original-content]');
    for (const element of translatedElements) {
      element.textContent = element.getAttribute('data-original-content');
      element.removeAttribute('data-original-content');
    }
  }

  // Initialize when page is ready - always show button now
  function init() {
    createTranslationButton();
  }

  // Handle route changes (for SPA) - always show button
  const originalPushState = history.pushState;
  history.pushState = function() {
    const ret = originalPushState.apply(this, arguments);
    setTimeout(() => {
      // Remove old button and create new one
      const oldBtn = document.getElementById('simple-translation-btn');
      if (oldBtn) oldBtn.remove();

      createTranslationButton();
    }, 100);
    return ret;
  };

  // Also listen for popstate for back/forward navigation
  window.addEventListener('popstate', function() {
    setTimeout(() => {
      const oldBtn = document.getElementById('simple-translation-btn');
      if (oldBtn) oldBtn.remove();

      createTranslationButton();
    }, 100);
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();