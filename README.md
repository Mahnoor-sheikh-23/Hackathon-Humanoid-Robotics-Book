# AI-Driven Development – Humanoid Robotics Book

A comprehensive textbook on Physical AI & Humanoid Robotics with integrated AI assistance.

## Features

- **Interactive Chatbot**: Get instant answers about the textbook content
- **Personalized Learning**: Content adapts to your background and experience
- **Multilingual Support**: Available in English and Urdu
- **Complete Learning Path**: From ROS 2 fundamentals to advanced NVIDIA Isaac integration
- **Hands-on Projects**: Practical exercises and capstone projects

## Technologies Used

- **Frontend**: Docusaurus for documentation, React for interactive components
- **Backend**: FastAPI for REST APIs, SQLAlchemy for ORM
- **Database**: PostgreSQL with Neon
- **Vector Database**: Qdrant for RAG (Retrieval Augmented Generation)
- **Authentication**: Better-Auth for user management
- **AI Integration**: OpenAI-compatible API with RAG system

## Installation

1. Clone the repository
2. Install backend dependencies: `pip install -r backend/requirements.txt`
3. Install frontend dependencies: `npm install` in the frontend directory
4. Set up environment variables (see `.env.example`)
5. Run database migrations: `alembic upgrade head`
6. Start the backend: `uvicorn src.main:app --reload`
7. Start the frontend: `npm run start` in the frontend directory

## Usage

The textbook is designed to be accessed through a web interface where students can:

### Chatbot Feature
- Navigate through chapters and modules
- Click the chatbot button (💬) in the bottom-right corner to interact with the AI assistant for questions about the textbook content

### Personalization Feature (Requires Login)
- **Login Required**: Access the personalization feature by logging in with your account
- **Personalize Button**: Once logged in, visit any chapter page and look for the "🎯 Personalize" button
- **Content Adaptation**: Click the button to adapt the content to your background and experience level
- **Toggle View**: Switch between personalized and original content using the toggle button
- **How to Use**:
  1. Sign up or log in to your account
  2. Navigate to any chapter in the textbook
  3. Look for the personalization button (it may appear after page load)
  4. Click "🎯 Personalize" to adapt content to your profile
  5. Use "👁️ Original" to switch back to the original content

### Multilingual Support
- Switch between English and Urdu translations using the translation button

## Architecture

The system consists of:
- A Docusaurus-based frontend for content presentation
- A FastAPI backend for API endpoints
- A RAG system for intelligent question answering
- PostgreSQL database for user management and content
- Qdrant vector database for document embeddings

## Contributing

We welcome contributions to improve the textbook content and functionality. Please follow the standard fork-and-pull request workflow.

## License

This project is licensed under the MIT License - see the LICENSE file for details.