import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = ({ ragApiUrl, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize with welcome message if no messages exist
    if (messages.length === 0) {
      setMessages([
        { id: 1, text: "Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics textbook. Ask me anything about the content!", sender: 'bot' }
      ]);
    }

    // Load conversation history
    loadConversationHistory();

    scrollToBottom();
  }, [messages]);

  // Function to load conversation history
  const loadConversationHistory = async () => {
    try {
      // Determine the API URL based on environment
      const getApiUrl = () => {
        if (typeof window !== 'undefined') {
          const hostname = window.location.hostname;
          if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:8000';
          } else {
            return 'https://hackathon-humanoid-robotics-book-production.up.railway.app';
          }
        }
        return 'http://localhost:8000';
      };

      const apiUrl = getApiUrl();

      // For now, we'll simulate conversation history from localStorage
      // In a real implementation, this would call an API endpoint
      const savedConversations = localStorage.getItem('chatbot_conversations');
      if (savedConversations) {
        setConversations(JSON.parse(savedConversations));
      }
    } catch (error) {
      console.error('Error loading conversation history:', error);
    }
  };

  // Function to save conversation
  const saveConversation = (newMessages) => {
    // Filter out the initial welcome message when saving conversations
    const messagesToSave = newMessages.filter(msg => msg.text !== "Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics textbook. Ask me anything about the content!");

    if (messagesToSave.length === 0) return; // Don't save empty conversations

    const conversation = {
      id: Date.now(),
      title: messagesToSave.length > 0 ? messagesToSave[0].text.substring(0, 30) + '...' : 'New Conversation',
      messages: messagesToSave,
      timestamp: new Date().toISOString()
    };

    const updatedConversations = [conversation, ...conversations.slice(0, 9)]; // Keep last 10 conversations
    setConversations(updatedConversations);
    localStorage.setItem('chatbot_conversations', JSON.stringify(updatedConversations));
  };

  // Function to start a new conversation
  const startNewConversation = () => {
    setMessages([
      { id: 1, text: "Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics textbook. Ask me anything about the content!", sender: 'bot' }
    ]);
    setCurrentConversationId(null);
    setShowHistory(false);
  };

  // Function to load a conversation
  const loadConversation = (conversation) => {
    setMessages(conversation.messages);
    setCurrentConversationId(conversation.id);
    setShowHistory(false);
  };

  // Function to clear current conversation
  const clearConversation = async () => {
    try {
      // Determine the API URL based on environment
      const getApiUrl = () => {
        if (typeof window !== 'undefined') {
          const hostname = window.location.hostname;
          if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:8000';
          } else {
            return 'https://hackathon-humanoid-robotics-book-production.up.railway.app';
          }
        }
        return 'http://localhost:8000';
      };

      const apiUrl = getApiUrl();

      // In a real implementation, this would call an API endpoint to clear conversation
      // For now, we'll just reset the messages
      setMessages([
        { id: 1, text: "Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics textbook. Ask me anything about the content!", sender: 'bot' }
      ]);
      setCurrentConversationId(null);
    } catch (error) {
      console.error('Error clearing conversation:', error);
      // Fallback: just reset messages
      setMessages([
        { id: 1, text: "Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics textbook. Ask me anything about the content!", sender: 'bot' }
      ]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Determine the API URL based on environment
      const getApiUrl = () => {
        if (typeof window !== 'undefined') {
          // Check if we're in development (localhost) or production
          const hostname = window.location.hostname;
          if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:8000';
          } else {
            // Production URL
            return 'https://hackathon-humanoid-robotics-book-production.up.railway.app';
          }
        }
        return 'http://localhost:8000'; // Default to local
      };

      const apiUrl = getApiUrl();

      // Call the RAG API
      const response = await fetch(`${apiUrl}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputValue })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Check if the response is a "not found" type response and handle general queries
      let responseText = data.response;
      const lowerQuery = inputValue.toLowerCase();
      const isGeneralQuery = ['hello', 'hi', 'hey', 'how are you', 'what is your name', 'who are you', 'help', 'start', 'test', 'hi there', 'hello there'].some(gq => lowerQuery.includes(gq));

      // If it's a general query and the response indicates no context found, provide a friendly response
      if (isGeneralQuery && (responseText.toLowerCase().includes("don't know based on the provided context") ||
                             responseText.toLowerCase().includes("i don't know") ||
                             responseText.toLowerCase().includes("no context provided"))) {
        const generalResponses = [
          "Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics textbook. I can help you with questions about the book content!",
          "Hi there! I'm here to help you with questions about Physical AI & Humanoid Robotics. What would you like to know about the textbook?",
          "Hello! I specialize in answering questions about the Physical AI & Humanoid Robotics textbook. Feel free to ask me anything related to the book content!"
        ];
        responseText = generalResponses[Math.floor(Math.random() * generalResponses.length)];
      }

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot',
        sources: data.source_documents || []
      };

      // Use functional update to ensure we have the latest messages
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, botMessage];

        // Save the conversation to history
        if (updatedMessages.length > 1) { // Only save if it's more than just the welcome message
          saveConversation(updatedMessages);
        }

        return updatedMessages;
      });
    } catch (error) {
      console.error('Error sending message:', error);

      // Check if this might be a general query that the RAG system can't handle
      const lowerQuery = inputValue.toLowerCase();
      const generalQueries = ['hello', 'hi', 'hey', 'how are you', 'what is your name', 'who are you', 'help', 'start', 'test'];
      const isGeneralQuery = generalQueries.some(gq => lowerQuery.includes(gq));

      let responseText = "Sorry, I encountered an error processing your request. Please try again.";

      if (isGeneralQuery) {
        // Provide a friendly response for general queries
        const generalResponses = [
          "Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics textbook. I can help you with questions about the book content!",
          "Hi there! I'm here to help you with questions about Physical AI & Humanoid Robotics. What would you like to know about the textbook?",
          "Hello! I specialize in answering questions about the Physical AI & Humanoid Robotics textbook. Feel free to ask me anything related to the book content!"
        ];
        responseText = generalResponses[Math.floor(Math.random() * generalResponses.length)];
      }

      // Add error/fallback message
      const errorMessage = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot'
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chat Controls */}
      <div className="chatbot-controls-top">
        <button
          className="history-toggle-btn"
          onClick={() => setShowHistory(!showHistory)}
          title={showHistory ? "Hide History" : "Show History"}
        >
          📜
        </button>
        <button
          className="new-conversation-btn"
          onClick={startNewConversation}
          title="New Conversation"
        >
          ➕
        </button>
        <button
          className="clear-chat-btn"
          onClick={clearConversation}
          title="Clear Chat"
        >
          🗑️
        </button>
      </div>

      {/* Conversation History Panel */}
      {showHistory && (
        <div className="chat-history-panel">
          <div className="history-header">
            <h4>Previous Conversations</h4>
            <button
              className="close-history-btn"
              onClick={() => setShowHistory(false)}
            >
              ×
            </button>
          </div>
          <div className="history-list">
            {conversations.length > 0 ? (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="history-item"
                  onClick={() => loadConversation(conv)}
                >
                  <div className="history-title">{conv.title}</div>
                  <div className="history-date">
                    {new Date(conv.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-history">No previous conversations</div>
            )}
          </div>
        </div>
      )}

      {/* Chat Messages Area */}
      <div className="chatbot-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender}-message animate-fade-in`}
          >
            <div className="message-content">
              <div className="message-bubble">
                <p>{message.text}</p>
                {message.sources && message.sources.length > 0 && (
                  <div className="message-sources">
                    <details>
                      <summary>Sources 🔍</summary>
                      {message.sources.map((source, index) => (
                        <div key={index} className="source-item">
                          <p><strong>Source {index + 1}:</strong> {source.content.substring(0, 100)}...</p>
                        </div>
                      ))}
                    </details>
                  </div>
                )}
              </div>
              <div className="message-sender">
                {message.sender === 'bot' ? '🤖 Assistant' : '👤 You'}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message bot-message animate-fade-in">
            <div className="message-content">
              <div className="message-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="message-sender">🤖 Assistant is typing...</div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Area */}
      <form className="chatbot-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask question about the textbook content..."
          disabled={isLoading}
          className="chat-input"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="send-button"
        >
          {isLoading ? '⏳' : '➤'}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;