import React, { useState, useEffect } from 'react';
import Chatbot from '../components/Chatbot';

const Root = ({ children }) => {
  const [showChatbot, setShowChatbot] = useState(false);
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
  }, []);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <>
      {children}
      <div className="chatbot-launcher">
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
          <Chatbot ragApiUrl={ragApiUrl} />
        </div>
      )}
    </>
  );
};

export default Root;