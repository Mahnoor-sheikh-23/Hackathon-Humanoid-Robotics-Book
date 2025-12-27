import React, { useState } from 'react';
import { useAuth } from './Auth/AuthContext';

const DocPersonalizationButton = () => {
  const { user } = useAuth();
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [isPersonalized, setIsPersonalized] = useState(false);

  const handlePersonalize = async () => {
    if (!user) return;

    setIsPersonalizing(true);

    try {
      // Get the current page content
      const contentElement = document.querySelector('.markdown');
      if (!contentElement) {
        console.error('No markdown content found');
        return;
      }

      const originalContent = contentElement.innerHTML;
      const userProfile = {
        programming_experience: user.programmingExperience || '',
        robotics_knowledge: user.roboticsKnowledge || '',
        hardware_availability: user.hardwareAvailability || ''
      };

      // Determine the correct API URL based on the environment
      const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
      const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
      const apiUrl = isLocalhost ? 'http://localhost:8000' : 'https://hackathon-humanoid-robotics-book-production.up.railway.app';

      // Call the personalization API
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
        // Update the content with personalized version
        contentElement.innerHTML = data.personalized_content;
        setIsPersonalized(true);
        // Store original content in a data attribute for later revert
        contentElement.setAttribute('data-original-content', originalContent);
      } else {
        console.error('Failed to personalize content');
        alert('Failed to personalize content. Please try again.');
      }
    } catch (error) {
      console.error('Error personalizing content:', error);
      alert('Error personalizing content. Please try again.');
    } finally {
      setIsPersonalizing(false);
    }
  };

  const handleRevert = () => {
    const contentElement = document.querySelector('.markdown');
    const originalContent = contentElement?.getAttribute('data-original-content');

    if (contentElement && originalContent) {
      contentElement.innerHTML = originalContent;
      setIsPersonalized(false);
    }
  };

  if (!user) {
    return (
      <div style={{
        padding: '1rem',
        backgroundColor: '#f0f8ff',
        border: '1px solid #007cba',
        borderRadius: '4px',
        margin: '1rem 0'
      }}>
        <p><strong>💡 Personalize Content:</strong> Log in to personalize this content based on your background and experience level.</p>
      </div>
    );
  }

  return (
    <div style={{ margin: '1rem 0' }}>
      <button
        onClick={isPersonalized ? handleRevert : handlePersonalize}
        disabled={isPersonalizing}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: isPersonalized ? '#6c757d' : '#007cba',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '0.5rem'
        }}
      >
        {isPersonalizing ? 'Processing...' : isPersonalized ? '👁️ Original' : '🎯 Personalize'}
      </button>
      <span style={{ fontSize: '0.9em', color: '#666' }}>
        {isPersonalized
          ? 'Content has been personalized based on your profile'
          : 'Adapt content to your experience level'}
      </span>
    </div>
  );
};

export default DocPersonalizationButton;