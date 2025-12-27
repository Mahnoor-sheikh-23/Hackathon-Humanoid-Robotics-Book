import React, { useState, useEffect } from 'react';
import './PersonalizationButton.css';

const PersonalizationButton = ({ content, userProfile, onContentChange }) => {
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [originalContent, setOriginalContent] = useState(content);
  const [personalizedContent, setPersonalizedContent] = useState('');

  const handleTogglePersonalization = async () => {
    if (!isPersonalized) {
      // Fetch personalized content from backend
      try {
        // Determine the correct API URL based on the environment
        const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
        const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
        const apiUrl = isLocalhost ? 'http://localhost:8000' : 'https://hackathon-humanoid-robotics-book-production.up.railway.app';

        const response = await fetch(`${apiUrl}/personalize/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: originalContent,
            user_profile: userProfile
          })
        });

        if (response.ok) {
          const data = await response.json();
          setPersonalizedContent(data.personalized_content);
          onContentChange(data.personalized_content);
          setIsPersonalized(true);
        } else {
          console.error('Failed to personalize content');
        }
      } catch (error) {
        console.error('Error personalizing content:', error);
      }
    } else {
      // Revert to original content
      onContentChange(originalContent);
      setIsPersonalized(false);
    }
  };

  return (
    <div className="personalization-container">
      <button
        className={`personalize-toggle-btn ${isPersonalized ? 'active' : ''}`}
        onClick={handleTogglePersonalization}
        title={isPersonalized ? "Show Original Content" : "Personalize This Content"}
      >
        {isPersonalized ? "👁️ Original" : "🎯 Personalize"}
      </button>
      {isPersonalized && (
        <div className="personalization-info">
          Content adapted to your background
        </div>
      )}
    </div>
  );
};

export default PersonalizationButton;