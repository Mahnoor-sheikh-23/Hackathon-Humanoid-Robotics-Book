---
id: 3
title: Generate Textbook Project Specification
stage: spec
date: 2025-12-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: physical-ai-humanoid-robotics-textbook
branch: master
user: unknown
command: /sp.specify
labels: ["specification", "project setup", "textbook", "rag chatbot", "docusaurus"]
links:
  spec: specs/physical-ai-humanoid-robotics-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/physical-ai-humanoid-robotics-textbook/spec.md
tests:
 - none
---

## Prompt



Create comprehensive specifications for the textbook project "Physical AI & Humanoid Robotics — A Complete Hands-On Course" for the Governor House Hackathon.

---

## PROJECT OVERVIEW

Project Name: Physical AI & Humanoid Robotics — A Complete Hands-On Course
Project Type: AI-Native Interactive Textbook with Embedded RAG Chatbot
Target Audience: Students with zero robotics background, aged 18-25, computer science or engineering background
Delivery Platform: Docusaurus static site deployed on GitHub Pages
Development Tools: Spec-Kit Plus, Claude Code, GitHub, Vercel (optional)
Deadline: Sunday, November 30, 2025, 6:00 PM PKT

---

## CORE DELIVERABLES (100 Base Points)

### Deliverable 1: Complete Textbook Content
Create a full-length educational textbook covering Physical AI and Humanoid Robotics with the following structure:

Module Breakdown:
- Weeks 1-2: Introduction to Physical AI and Embodied Intelligence (2-3 chapters)
- Weeks 3-5: Module 1 - The Robotic Nervous System using ROS 2 (4-5 chapters)
- Weeks 6-7: Module 2 - The Digital Twin with Gazebo and Unity (3-4 chapters)
- Weeks 8-10: Module 3 - The AI-Robot Brain using NVIDIA Isaac (4-5 chapters)
- Weeks 11-12: Module 4 - Vision-Language-Action Integration (3-4 chapters)
- Week 13: Capstone Project - The Autonomous Humanoid (2 chapters)

Total chapter count: Minimum 20 chapters, maximum 25 chapters

Each chapter must include:
- Learning objectives (3-5 bullets)
- Introduction (2-3 paragraphs)
- Core concepts with 3-layer explanations (analogy, plain English, technical)
- Hands-on tutorial with complete working code
- ASCII diagrams
- Key takeaways (5-7 bullets)
- 10 exercises (3 easy, 4 medium, 3 hard)
- Bridge to next chapter

Technical stack covered in content:
- ROS 2 Humble Hawksbill on Ubuntu 22.04
- Python 3.10+ for all code examples
- NVIDIA Isaac Sim 2023.1.0+
- Gazebo Fortress or Garden
- Unity 2022.3 LTS with Robotics packages
- OpenAI Whisper for voice commands
- Large Language Models for cognitive planning

Hardware platforms covered:
- NVIDIA Jetson Orin Nano (8GB) and Orin NX (16GB)
- Intel RealSense D435i depth camera
- ReSpeaker USB Mic Array
- Unitree Go2 and Unitree G1 humanoid robots
- Generic IMU sensors (BNO055)

### Deliverable 2: Docusaurus Static Site
Build a professional static website using Docusaurus that:
- Has clean, modern, educational design
- Includes navigation sidebar with all chapters organized by modules
- Has search functionality for finding content
- Is mobile-responsive
- Loads quickly (under 3 seconds)
- Uses Markdown format for all content (no HTML, no JSX, no MDX)
- Has proper meta tags for SEO
- Includes homepage with course overview and learning path

### Deliverable 3: GitHub Pages Deployment
Deploy the completed book to GitHub Pages with:
- Public GitHub repository with clear README
- Automated deployment via GitHub Actions
- Custom domain support (optional)
- HTTPS enabled
- Proper 404 error handling
- Clean URL structure (no .html extensions)

### Deliverable 4: Integrated RAG Chatbot
Build and embed a Retrieval-Augmented Generation chatbot within the book that:

Frontend requirements:
- Embedded chat widget on every page (bottom-right corner)
- Clean, modern chat interface
- Supports text input and displays formatted responses
- Shows typing indicators when processing
- Displays source citations with chapter references
- Allows users to select text on the page and ask questions about it
- Has conversation history within the session
- Includes clear/reset conversation button

Backend requirements:
- Built with FastAPI framework
- Uses OpenAI Agents SDK or ChatKit SDK
- Connects to Neon Serverless Postgres database for storing:
  - User conversations
  - Chat history
  - User preferences (if authentication enabled)
- Uses Qdrant Cloud Free Tier for vector storage:
  - Embed all chapter content as vectors
  - Perform semantic search for relevant context
  - Return top 3-5 most relevant chunks per query
- Implements proper error handling and rate limiting
- Returns responses with source citations (chapter number, section)
- Supports "selected text" questions where user highlights text and asks about it

API endpoints required:
- POST /chat: Send message and get response
- POST /chat/selected: Ask question about selected text
- GET /chat/history: Retrieve conversation history
- DELETE /chat/clear: Clear conversation history

Chatbot behavior:
- Answers questions strictly based on book content
- Provides chapter and section references for all answers
- Explains concepts in simple, student-friendly language
- Can handle follow-up questions with conversation context
- Admits when information is not in the book
- Suggests related chapters for deeper learning
- Can explain code examples from the book
- Can clarify exercises and provide hints without giving full solutions

---

## BONUS DELIVERABLES (Up to 200 Extra Points)

### Bonus 1: Claude Code Subagents and Agent Skills (+50 points)
Create reusable intelligence via Claude Code Subagents and Agent Skills:
- Design at least 3 specialized subagents for:
  1. Chapter content generation agent
  2. Code example verification agent
  3. Exercise generation agent
- Create agent skills that can be reused across the project
- Document how these subagents work in the repository
- Show clear evidence of using subagents in the development process

### Bonus 2: User Authentication with Better-Auth (+50 points)
Implement Signup and Signin functionality using Better-Auth that:

Signup process:
- Collects user information: name, email, password
- Asks background questions:
  - Programming experience level (beginner, intermediate, advanced)
  - Robotics knowledge (none, basic, some experience, experienced)
  - Hardware access (simulation only, Jetson board, full robot)
  - Learning goal (academic, career transition, hobby, research)
  - Preferred learning style (video, text, hands-on, mixed)
- Stores user profile in database
- Sends email verification

Signin process:
- Email and password authentication
- Remember me functionality
- Password reset via email
- Social login options (Google, GitHub) optional

User profile features:
- Dashboard showing learning progress
- Bookmarked chapters
- Completed exercises tracker
- Personal notes on chapters
- Customized learning path based on background

### Bonus 3: Content Personalization (+50 points)
Add personalization button at the start of each chapter that:
- Adapts content difficulty based on user background from signup
- For beginners: More detailed explanations, simpler analogies, additional resources
- For advanced users: Faster pace, advanced topics, research papers
- Shows/hides hardware-specific content based on user's available equipment
- Adjusts code complexity based on programming experience
- Provides personalized exercise recommendations
- Remembers user's preference for future sessions
- Has toggle to view original content vs personalized content

Implementation details:
- Button at top of each chapter: "Personalize This Chapter"
- Makes API call with user profile and chapter content
- Uses LLM to adapt content in real-time
- Displays adapted content smoothly without page reload
- Stores personalization preferences per user

### Bonus 4: Urdu Translation (+50 points)
Add translation button at the start of each chapter that:
- Translates entire chapter content to Urdu
- Maintains code blocks in English (only comments translated)
- Preserves formatting, diagrams, and structure
- Keeps technical terms in English with Urdu explanations
- Translates exercise instructions to Urdu
- Has toggle to switch back to English
- Uses high-quality translation (Google Translate API, DeepL, or LLM-based)
- Caches translations to avoid repeated API calls
- Works offline after first translation load

Implementation details:
- Button at top of each chapter: "اردو میں پڑھیں (Read in Urdu)"
- Smooth transition between languages
- Stores translation preference in user settings
- Maintains all functionality (chatbot, exercises) in translated view

---

## TECHNICAL ARCHITECTURE SPECIFICATIONS

### Frontend Stack:
- Docusaurus 3.x for static site generation
- React 18+ (comes with Docusaurus)
- TypeScript for type safety (optional but recommended)
- Tailwind CSS or CSS Modules for styling
- Chat widget component embedded globally

### Backend Stack:
- FastAPI (Python 3.10+)
- OpenAI Python SDK (for chat completions and embeddings)
- Neon Serverless Postgres (via asyncpg or psycopg3)
- Qdrant Cloud Python client
- Better-Auth SDK (if implementing authentication)
- CORS enabled for frontend communication

### Database Schema (Neon Postgres):
- users table: id, email, password_hash, name, profile_data, created_at
- conversations table: id, user_id, chapter_context, created_at
- messages table: id, conversation_id, role, content, timestamp
- user_preferences table: id, user_id, personalization_settings, language_preference

### Vector Database (Qdrant):
- Collection: book_chapters
- Vector dimension: 1536 (OpenAI text-embedding-3-small)
- Payload: chapter_number, section_title, content_chunk, page_url
- Distance metric: Cosine similarity

### Deployment Architecture:
- Frontend: GitHub Pages or Vercel
- Backend: Railway, Render, or Fly.io
- Database: Neon Serverless Postgres (free tier)
- Vector DB: Qdrant Cloud (free tier 1GB)
- Environment variables managed via .env files (not committed)

---

## QUALITY STANDARDS

### Content Quality:
- Zero plagiarism (all content original or properly cited)
- All code examples tested and working
- Clear progression from beginner to advanced
- Consistent terminology throughout
- Professional tone, zero marketing fluff
- Accurate technical information verified against official documentation

### Code Quality:
- All Python code follows PEP 8 style guide
- Type hints used throughout backend code
- Comprehensive error handling
- Input validation on all API endpoints
- Security best practices (no hardcoded secrets, SQL injection prevention)
- API rate limiting implemented
- Proper logging for debugging

### User Experience:
- Page load time under 3 seconds
- Chat responses under 5 seconds
- Mobile-responsive design
- Accessible (WCAG 2.1 AA compliance)
- Clear error messages
- Intuitive navigation
- Search functionality works accurately

### Documentation:
- Comprehensive README with:
  - Project description
  - Setup instructions
  - Environment variables needed
  - Deployment instructions
  - Architecture diagram
  - API documentation
  - Known issues and limitations
- Code comments for complex logic
- API endpoint documentation (OpenAPI/Swagger)

---

## SUBMISSION REQUIREMENTS

### Required Deliverables:
1. Public GitHub repository with all source code
2. Live deployed book URL (GitHub Pages or Vercel)
3. Demo video (under 90 seconds) showing:
   - Book navigation and content quality
   - RAG chatbot answering questions
   - Selected text question feature
   - Any bonus features implemented
4. WhatsApp number for live presentation invitation

### Demo Video Must Show:
- Homepage and course structure
- Opening a chapter and scrolling through content
- Using the embedded chatbot to ask a question
- Chatbot providing answer with chapter citation
- Selecting text and asking question about it
- Any bonus features in action (auth, personalization, translation)
- Quick overview of code quality (show GitHub repo briefly)

### GitHub Repository Must Include:
- Clean, organized folder structure
- README.md with setup instructions
- .env.example file showing required environment variables
- requirements.txt or package.json with all dependencies
- GitHub Actions workflow for automated deployment
- No sensitive information (API keys, passwords) committed
- Clear commit history showing development progress

---

## SUCCESS CRITERIA

The project will be evaluated on:

Base Functionality (100 points):
- Complete textbook content covering all modules (40 points)
- Professional Docusaurus site deployed successfully (20 points)
- Functional RAG chatbot integrated and working (30 points)
- Quality of content, code, and user experience (10 points)

Bonus Features (up to 200 points):
- Claude Code Subagents implementation (50 points)
- Better-Auth authentication and user profiles (50 points)
- Content personalization based on user background (50 points)
- Urdu translation functionality (50 points)

Overall Assessment:
- Technical complexity and implementation quality
- Innovation and creativity in features
- User experience and design polish
- Code quality and architecture
- Completeness of documentation
- Demo video clarity and professionalism

---

## CONSTRAINTS AND LIMITATIONS

Time Constraints:
- Submission deadline: Sunday, November 30, 2025, 6:00 PM
- Development time: approximately 4 weeks from hackathon announcement
- Live presentations start at 6:00 PM same day

Technical Constraints:
- Must use specified tools: Spec-Kit Plus, Claude Code, Docusaurus
- Must use Neon Postgres and Qdrant Cloud free tiers
- Backend must use FastAPI framework
- Frontend must use Docusaurus (no other frameworks)
- All content must be Markdown format

Budget Constraints:
- Use free tiers wherever possible
- Neon Postgres: Free tier with 0.5GB storage
- Qdrant Cloud: Free tier with 1GB cluster
- GitHub Pages: Free hosting
- OpenAI API: Pay per use (keep token usage optimized)

Quality Constraints:
- All code must be production-ready
- No broken links or features
- Mobile-responsive required
- Security best practices mandatory
- No hardcoded credentials

---

## RISK MITIGATION

Potential Risks and Solutions:

Risk: Running out of time
Solution: Prioritize base deliverables first, add bonus features only after core is complete

Risk: OpenAI API costs too high
Solution: Implement caching, rate limiting, and optimize prompts to reduce token usage

Risk: Chatbot provides incorrect information
Solution: Implement confidence scoring, always cite sources, add disclaimer about verification

Risk: Database exceeds free tier limits
Solution: Monitor usage, implement data retention policies, optimize queries

Risk: Deployment issues on deadline day
Solution: Deploy early and often, test thoroughly, have backup deployment option (Vercel)

Risk: Code quality issues
Solution: Use linting tools, write tests for critical functions, code review before submission

---

## APPENDIX: KEY RESOURCES

Official Documentation:
- Docusaurus: https://docusaurus.io/docs
- Spec-Kit Plus: https://github.com/panaversity/spec-kit-plus/
- OpenAI API: https://platform.openai.com/docs
- FastAPI: https://fastapi.tiangolo.com/
- Neon Postgres: https://neon.tech/docs
- Qdrant: https://qdrant.tech/documentation/
- Better-Auth: https://www.better-auth.com/docs

Course References:
- ROS 2 Documentation: https://docs.ros.org/
- NVIDIA Isaac Sim: https://developer.nvidia.com/isaac-sim
- Gazebo Documentation: https://gazebosim.org/docs

Example Projects:
- Panaversity AI Agents Book: https://ai-native.panaversity.org

---

Generate detailed specifications covering:
1. Complete chapter outline with titles and learning objectives
2. Exact file structure for Docusaurus project
3. Database schema definitions
4. API endpoint specifications
5. Frontend component structure
6. Deployment workflow steps
7. Testing strategy
8. Timeline and milestones
9. Team responsibilities (if applicable)
10. Backup and contingency plans

Make specifications detailed enough that any developer can implement the project by following them exactly.


## Response snapshot

Generated a comprehensive specification (`spec.md`) for the "Physical AI & Humanoid Robotics — A Complete Hands-On Course" textbook project, detailing content, architecture, and deliverables.

## Outcome

- ✅ Impact: Successfully defined the project scope, user stories, functional and non-functional requirements, detailed architecture, deployment, testing strategy, timeline, and backup plans. The specification includes a detailed chapter outline, file structure, database schema, API endpoints, frontend components, deployment workflow, testing strategy, timeline, team responsibilities, and backup plans.
- 🧪 Tests: none
- 📁 Files: Created `specs/physical-ai-humanoid-robotics-textbook/spec.md`.
- 🔁 Next prompts: Proceed with creating a detailed implementation plan (`plan.md`) based on this specification.
- 🧠 Reflection: Successfully generated a comprehensive specification document by parsing detailed user input and adhering to the `spec-template.md` structure. The agent-native fallback for PHR creation was utilized successfully.

## Evaluation notes (flywheel)

- Failure modes observed: The `.specify/scripts/bash/create-phr.sh` script was not found, necessitating an agent-native fallback for PHR creation.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Investigate the availability and functionality of `create-phr.sh` script to ensure automated PHR creation, or formalize the agent-native fallback process and ensure all template placeholders are automatically populated.
