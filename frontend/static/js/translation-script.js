// Very simple translation script
(function() {
  let isTranslated = false;
  let isLoading = false;

  // Wait for the page to be ready
  function waitForButton() {
    const button = document.getElementById('translation-toggle-btn');
    if (button) {
      // Add click handler
      button.addEventListener('click', function() {
        handleTranslationToggle(button);
      });
      console.log('Translation button found and handler attached');
    } else {
      // Try again in 500ms
      setTimeout(waitForButton, 500);
    }
  }

  // Handle the translation toggle
  async function handleTranslationToggle(button) {
    if (isLoading) return;

    isLoading = true;
    button.disabled = true;
    button.innerHTML = '...';
    button.style.backgroundColor = '#cccccc';

    if (isTranslated) {
      // Restore content
      restoreContent();
      document.body.dir = 'ltr';
      isTranslated = false;
      button.innerHTML = 'UR';
    } else {
      // Translate content
      await translateContent();
      document.body.dir = 'rtl';
      isTranslated = true;
      button.innerHTML = 'EN';
    }

    isLoading = false;
    button.disabled = false;
    button.style.backgroundColor = '#4a6fa5';
  }

  // Simple translation function
  async function translateText(text) {
    if (!text.trim()) return text;

    try {
      const response = await fetch(
        'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=en|ur'
      );
      const data = await response.json();
      return data.responseData.translatedText || text;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }

  // Translate the page content
  async function translateContent() {
    restoreContent(); // Clear any previous translations

    const elements = document.querySelectorAll(
      '.markdown h1, .markdown h2, .markdown h3, .markdown h4, .markdown h5, .markdown h6, ' +
      '.markdown p, .markdown li, .markdown td, .markdown th, .markdown blockquote'
    );

    for (const element of elements) {
      const originalText = element.textContent.trim();
      if (originalText && originalText.length > 0 && originalText.length < 500) {
        element.setAttribute('data-original-content', originalText);
        const translatedText = await translateText(originalText);
        element.textContent = translatedText;
      }
    }
  }

  // Restore original content
  function restoreContent() {
    const elements = document.querySelectorAll('[data-original-content]');
    for (const element of elements) {
      element.textContent = element.getAttribute('data-original-content');
      element.removeAttribute('data-original-content');
    }
  }

  // Start looking for the button when the page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      waitForButton();
    });
  } else {
    waitForButton();
  }

  // Handle navigation events
  const originalPushState = history.pushState;
  history.pushState = function() {
    const ret = originalPushState.apply(this, arguments);
    setTimeout(waitForButton, 1000); // Wait for new page to load
    return ret;
  };
})();