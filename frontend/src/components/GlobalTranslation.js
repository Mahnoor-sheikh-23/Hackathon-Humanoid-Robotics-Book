import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

let isTranslated = false;
let isLoading = false;

if (ExecutionEnvironment.canUseDOM) {
  // Create and inject the translation button into the navbar
  const createTranslationButton = () => {
    const container = document.getElementById('translation-button-container');
    if (!container || container.querySelector('.global-translation-button')) return;

    const button = document.createElement('button');
    button.className = 'global-translation-button';
    button.innerHTML = isTranslated ? 'EN' : 'UR';
    button.disabled = isLoading;

    button.style.cssText = `
      padding: 4px 8px;
      margin-left: 8px;
      background-color: ${isLoading ? '#cccccc' : '#4a6fa5'};
      color: white;
      border: none;
      border-radius: 4px;
      cursor: ${isLoading ? 'not-allowed' : 'pointer'};
      font-size: 14px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 30px;
    `;

    button.onclick = toggleTranslation;

    container.innerHTML = '';
    container.appendChild(button);
  };

  // Translation function
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

  // Translate page content
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

  // Restore original content
  const restoreOriginalContent = () => {
    const translatedElements = document.querySelectorAll('[data-original-content]');
    for (const element of translatedElements) {
      element.textContent = element.getAttribute('data-original-content');
      element.removeAttribute('data-original-content');
    }
  };

  // Toggle translation
  const toggleTranslation = async () => {
    if (isLoading) return;

    isLoading = true;
    updateButton();

    if (isTranslated) {
      // Restore original content
      restoreOriginalContent();
      document.body.dir = 'ltr';
      isTranslated = false;
    } else {
      // Translate content
      await translatePageContent();
      document.body.dir = 'rtl';
      isTranslated = true;
    }

    isLoading = false;
    updateButton();
  };

  // Update button state
  const updateButton = () => {
    const button = document.querySelector('.global-translation-button');
    if (button) {
      button.innerHTML = isLoading ? '...' : (isTranslated ? 'EN' : 'UR');
      button.disabled = isLoading;
      button.style.backgroundColor = isLoading ? '#cccccc' : '#4a6fa5';
    }
  };

  // Initialize button when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createTranslationButton);
  } else {
    createTranslationButton();
  }

  // Also try to create button after a short delay to ensure navbar is fully loaded
  setTimeout(createTranslationButton, 100);

  // Listen for route changes to recreate the button if needed
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    const result = originalPushState.apply(this, args);
    setTimeout(createTranslationButton, 100);
    return result;
  };

  history.replaceState = function (...args) {
    const result = originalReplaceState.apply(this, args);
    setTimeout(createTranslationButton, 100);
    return result;
  };

  window.addEventListener('popstate', () => {
    setTimeout(createTranslationButton, 100);
  });
}