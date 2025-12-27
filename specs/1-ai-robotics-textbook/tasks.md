# Tasks: Physical AI & Humanoid Robotics Textbook

**Input**: Design documents from `/specs/1-ai-robotics-textbook/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create root project directories: `backend/`, `frontend/`, `docs/`, `scripts/`
- [x] T002 Initialize Docusaurus project in `frontend/` (Manual initialization may be required due to tool limitations)
- [x] T003 [P] Configure Docusaurus `frontend/sidebars.js` for module/chapter hierarchy
- [x] T004 Initialize FastAPI project in `backend/`
- [x] T005 [P] Configure linting (Black, ESLint) and formatting (Prettier) for `backend/` and `frontend/`
- [X] T006 [P] Setup `.env.example` and load environment variables in `backend/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Setup Neon Serverless Postgres database connection in `backend/src/db.py`
- [X] T008 [P] Define `users`, `conversations`, `messages`, `user_preferences` tables in `backend/src/models/` and apply migrations
- [X] T009 Setup Qdrant Cloud connection in `backend/src/vector_db.py`
- [X] T010 Implement Better-Auth SDK integration for basic signup/signin in `backend/src/auth.py`
- [X] T011 Implement base logging and error handling in `backend/src/main.py`
- [X] T012 Configure CORS for `backend/` in `backend/src/main.py`
- [X] T013 Implement offline content ingestion pipeline (chunking, embedding, Qdrant storage) in `scripts/ingest_content.py`
- [X] T014 Set up automated GitHub Actions for Docusaurus deployment in `.github/workflows/deploy.yml`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Learning Core Robotics Concepts (Priority: P1) 🎯 MVP

**Goal**: Deliver a complete educational experience through comprehensive, hands-on textbook content.

**Independent Test**: A student can navigate through any module, understand the 3-layer explanations of core concepts, successfully complete a hands-on tutorial, and attempt the exercises. The textbook delivers on its promise of being a "Complete Hands-On Course".

### Implementation for User Story 1

- [X] T015 [P] [US1] Create Docusaurus `docs/introduction/` folder and initial `index.md`, `ch1_foundations.md`, `ch2_robot_anatomy.md`
- [x] T016 [P] [US1] Create Docusaurus `docs/module1-ros2/` folder and initial `ch3_ros2_core.md`, `ch4_rclpy.md`, `ch5_urdf.md`, `ch6_launch_files.md`
- [x] T017 [P] [US1] Create Docusaurus `docs/module2-digital-twin/` folder and initial `ch7_gazebo_intro.md`, `ch8_sensors_sim.md`, `ch9_interactive_envs.md`
- [X] T018 [P] [US1] Create Docusaurus `docs/module3-nvidia-isaac/` folder and initial `ch10_isaac_sim.md`, `ch11_isaac_ros_vslam.md`, `ch12_nav2.md`, `ch13_rl_isaac_gym.md`, `ch14_sim_to_real.md`
- [X] T019 [P] [US1] Create Docusaurus `docs/module4-vla/` folder and initial `ch15_whisper_llm.md`, `ch16_llm_planning.md`, `ch17_multimodal.md`
- [X] T020 [P] [US1] Create Docusaurus `docs/capstone/` folder and initial `ch18_integration.md`, `ch19_capstone_project.md`
- [X] T021 [P] [US1] Create Docusaurus `docs/appendices/` folder and initial `appA_hardware.md`, `appB_jetson_setup.md`, `appC_realsense_setup.md`, `appD_linux_ros2_install.md`, `appE_glossary.md`, `appF_ros2_cheatsheet.md`, `appG_python_cheatsheet.md`
- [X] T022 [US1] Implement Chapter Content Generation Subagent in `backend/src/agents/chapter_gen_agent.py`
- [X] T023 [US1] Implement Code Example Verification Subagent in `backend/src/agents/code_verify_agent.py`
- [X] T024 [US1] Implement Exercise Generation Subagent in `backend/src/agents/exercise_gen_agent.py`
- [X] T025 [P] [US1] Populate Front Matter chapters (`frontend/docs/introduction/index.md`, etc.)
- [X] T026 [P] [US1] Populate Weeks 1-2 chapters (`frontend/docs/introduction/ch*.md`)
- [X] T027 [P] [US1] Populate Weeks 3-5 chapters (`frontend/docs/module1-ros2/ch*.md`)
- [X] T028 [P] [US1] Populate Weeks 6-7 chapters (`frontend/docs/module2-digital-twin/ch*.md`)
- [X] T029 [P] [US1] Populate Weeks 8-10 chapters (`frontend/docs/module3-nvidia-isaac/ch*.md`)
- [X] T030 [P] [US1] Populate Weeks 11-12 chapters (`frontend/docs/module4-vla/ch*.md`)
- [x] T031 [P] [US1] Populate Week 13 chapters (`frontend/docs/capstone/ch*.md`)
- [X] T032 [P] [US1] Populate Appendices (`frontend/docs/appendices/app*.md`)
- [X] T033 [US1] Verify all Python code examples (Python 3.10+) within `docs/` content

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Interacting with an AI Chatbot (Priority: P1)

**Goal**: Provide an embedded chatbot for context-aware answers and guidance.

**Independent Test**: A student can ask a question related to the book content and receive an accurate, sourced answer, demonstrating the chatbot's ability to retrieve and synthesize information.

### Implementation for User Story 2

- [X] T034 [P] [US2] Implement frontend chat widget React component in `frontend/src/components/ChatWidget.js` (or `.tsx`)
- [X] T035 [P] [US2] Implement FastAPI `/chat` endpoint for sending messages in `backend/src/routers/chat.py`
- [X] T036 [P] [US2] Implement FastAPI `/chat/selected` endpoint for selected text questions in `backend/src/routers/chat.py`
- [X] T037 [P] [US2] Implement FastAPI `/chat/history` endpoint for conversation history in `backend/src/routers/chat.py`
- [X] T038 [P] [US2] Implement FastAPI `/chat/clear` endpoint for clearing conversation in `backend/src/routers/chat.py`
- [X] T039 [US2] Integrate OpenAI Agents SDK or ChatKit SDK in `backend/src/services/chatbot_service.py`
- [X] T040 [US2] Integrate Qdrant vector search for retrieval in `backend/src/services/chatbot_service.py`
- [X] T041 [US2] Implement LLM for response generation and source citation in `backend/src/services/chatbot_service.py`
- [X] T042 [US2] Implement typing indicators in `frontend/src/components/ChatWidget.js`
- [X] T043 [US2] Implement conversation history display in `frontend/src/components/ChatWidget.js`
- [X] T044 [US2] Implement clear/reset conversation button in `frontend/src/components/ChatWidget.js`
- [X] T045 [US2] Implement error handling and rate limiting for chat endpoints in `backend/src/routers/chat.py`
- [X] T046 [US2] Test chatbot retrieval correctness via `backend/tests/test_chatbot.py`
- [X] T047 [US2] Test selected-text-only answering via `backend/tests/test_chatbot.py`
- [X] T048 [US2] Test hallucination prevention via `backend/tests/test_chatbot.py`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Accessing the Textbook Online (Priority: P1)

**Goal**: Provide a professional, fast-loading, mobile-responsive static website.

**Independent Test**: A student can access the textbook through a web browser, navigate through its sections, and view content on different devices, confirming the site's accessibility and functionality.

### Implementation for User Story 3

- [X] T049 [US3] Configure Docusaurus for clean, modern, educational design in `frontend/docusaurus.config.js` and `frontend/src/css/custom.css`
- [X] T050 [US3] Implement Docusaurus navigation sidebar in `frontend/sidebars.js`
- [X] T051 [US3] Implement Docusaurus search functionality in `frontend/docusaurus.config.js`
- [X] T052 [US3] Ensure Docusaurus site is mobile-responsive (`frontend/src/css/custom.css` and React components)
- [X] T053 [US3] Verify page load times (under 3 seconds) through manual testing and Lighthouse
- [X] T054 [US3] Implement proper meta tags for SEO in `frontend/docusaurus.config.js`
- [X] T055 [US3] Design and implement homepage in `frontend/src/pages/index.js` (or `.tsx`)
- [X] T056 [US3] Configure GitHub Actions for automated deployment to GitHub Pages (`.github/workflows/deploy.yml`)
- [X] T057 [US3] Configure custom domain support (optional) in `frontend/static/CNAME`
- [X] T058 [US3] Ensure HTTPS is enabled (GitHub Pages default) - verification task
- [X] T059 [US3] Implement proper 404 error handling in `frontend/src/pages/404.js` (or `.tsx`)
- [X] T060 [US3] Configure clean URL structure (Docusaurus default) - verification task

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Bonus 2: User Authentication with Better-Auth (Priority: Bonus)

**Goal**: Implement full signup/sign-in with Better-Auth, including user profile management.

**Independent Test**: A user can successfully sign up, sign in, and their profile data (including background questions) is correctly stored and retrieved.

### Implementation for Bonus 2

- [X] T061 [P] [US-Auth] Implement Better-Auth signup forms (name, email, password, background questions) in `frontend/src/components/Auth/Signup.js`
- [X] T062 [P] [US-Auth] Implement Better-Auth signin forms (email, password) in `frontend/src/components/Auth/Signin.js`
- [X] T063 [US-Auth] Integrate Better-Auth SDK for signup/signin in `backend/src/routers/auth.py`
- [X] T064 [US-Auth] Store user profile data in Neon Postgres `users` table via `backend/src/models/user.py`
- [X] T065 [US-Auth] Implement email verification via Better-Auth in `backend/src/auth.py`
- [X] T066 [P] [US-Auth] Implement "remember me" functionality in `frontend/src/components/Auth/Signin.js`
- [X] T067 [P] [US-Auth] Implement password reset functionality in `frontend/src/components/Auth/ResetPassword.js`
- [X] T068 [P] [US-Auth] Implement social login (Google, GitHub) (optional) in `frontend/src/components/Auth/SocialLogin.js`
- [X] T069 [US-Auth] Implement user dashboard (learning progress, bookmarks, completed exercises, notes) in `frontend/src/pages/dashboard.js`
- [X] T070 [US-Auth] Store learning progress, bookmarks, completed exercises, notes in Neon Postgres tables (`backend/src/models/user_progress.py`, `backend/src/models/user_bookmarks.py`, etc.)

---

## Phase 7: Bonus 3: Content Personalization (+50 points) (Priority: Bonus)

**Goal**: Allow logged-in users to personalize chapter content based on their background.

**Independent Test**: A logged-in user can click "Personalize This Chapter" and see content rewritten based on their profile, with the ability to toggle back to original content.

### Implementation for Bonus 3

- [X] T071 [P] [US-Personalize] Implement "Personalize This Chapter" button in `frontend/src/components/PersonalizationButton.js`
- [X] T072 [US-Personalize] Implement FastAPI endpoint for personalization in `backend/src/routers/personalization.py`
- [X] T073 [US-Personalize] Integrate LLM for content rewriting based on user profile in `backend/src/services/personalization_service.py`
- [X] T074 [US-Personalize] Implement caching for personalized content in Neon Postgres `user_preferences` table
- [X] T075 [US-Personalize] Implement frontend toggle for original vs. personalized content in `frontend/src/components/PersonalizationButton.js`
- [X] T076 [US-Personalize] Test personalization logic for different user profiles in `backend/tests/test_personalization.py`
- [X] T077 [US-Personalize] Test cache invalidation for personalized content in `backend/tests/test_personalization.py`

---

## Phase 8: Bonus 4: Urdu Translation (+50 points) (Priority: Bonus)

**Goal**: Provide chapter-level Urdu translation with code block preservation.

**Independent Test**: A user can click "Read in Urdu" and see the chapter translated, with code blocks remaining English, and then toggle back to English.

### Implementation for Bonus 4

- [X] T078 [P] [US-Urdu] Implement "اردو میں پڑھیں (Read in Urdu)" button in `frontend/src/components/TranslationButton.js`
- [X] T079 [US-Urdu] Implement FastAPI endpoint for Urdu translation in `backend/src/routers/translation.py`
- [X] T080 [US-Urdu] Integrate LLM (or Google Translate API/DeepL) for translation in `backend/src/services/translation_service.py`
- [X] T081 [US-Urdu] Implement caching for translated content in Neon Postgres `user_preferences` table
- [X] T082 [US-Urdu] Implement frontend toggle for English vs. Urdu content in `frontend/src/components/TranslationButton.js`
- [x] T083 [US-Urdu] Test semantic preservation and technical correctness of Urdu translation in `backend/tests/test_translation.py`

---

## Phase 9: Bonus 1: Claude Code Subagents and Agent Skills (+50 points) (Priority: Bonus)

**Goal**: Create reusable intelligence via Claude Code Subagents and Agent Skills.

**Independent Test**: The documented subagents and skills can be successfully invoked and perform their intended functions during development.

### Implementation for Bonus 1

- [X] T084 [US-Agents] Document Chapter Content Generation Agent in `docs/developer/agents/chapter_gen.md`
- [X] T085 [US-Agents] Document Code Example Verification Agent in `docs/developer/agents/code_verify.md`
- [X] T086 [US-Agents] Document Exercise Generation Agent in `docs/developer/agents/exercise_gen.md`
- [X] T087 [P] [US-Agents] Document Agent Skills (chapter-gen, code-verify, exercise-gen, glossary-extractor, diagram-assist, citation-checker) in `docs/developer/skills/`
- [X] T088 [US-Agents] Ensure evidence of using subagents is captured during development (e.g., in PHRs or specific logs)

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T089 Documentation updates for `README.md`, API documentation (OpenAPI/Swagger auto-generated via FastAPI)
- [X] T090 Code cleanup and refactoring across `backend/` and `frontend/`
- [X] T091 Performance optimization (frontend asset loading, backend query optimization)
- [X] T092 Security hardening (input validation, dependency scanning, secret management)
- [X] T093 Final review of all quality validation criteria

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1 - Learning Core Robotics Concepts)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1 - Interacting with an AI Chatbot)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P1 - Accessing the Textbook Online)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **Bonus 2 (User Authentication)**: Can start after Foundational (Phase 2)
- **Bonus 3 (Content Personalization)**: Depends on Bonus 2 for user profiles and Foundational (Phase 2) for content and LLM integration.
- **Bonus 4 (Urdu Translation)**: Depends on Foundational (Phase 2) for content and LLM integration.
- **Bonus 1 (Claude Code Subagents and Agent Skills)**: Can be worked on concurrently with content generation (US1) and other features that might use these agents.

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, User Stories 1, 2, and 3 can start in parallel (if team capacity allows)
- Bonus 2 (Auth) can start in parallel with US1, US2, US3.
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members
- Content population tasks (T025-T032) within US1 can be highly parallelized.

---

## Parallel Example: User Story 1

```bash
# Launch all content population tasks for User Story 1 (highly parallelizable):
Task: "Populate Front Matter chapters in frontend/docs/introduction/index.md"
Task: "Populate Weeks 1-2 chapters in frontend/docs/introduction/ch*.md"
# ...and so on for all T025-T032
```

---

## Implementation Strategy

### MVP First (User Stories 1, 2, 3 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Content)
4. Complete Phase 4: User Story 2 (Chatbot)
5. Complete Phase 5: User Story 3 (Docusaurus Site)
6. **STOP and VALIDATE**: Test all three core user stories independently and together
7. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Content) → Test independently → Deploy/Demo
3. Add User Story 2 (Chatbot) → Test independently → Deploy/Demo
4. Add User Story 3 (Docusaurus Site) → Test independently → Deploy/Demo
5. Add Bonus features in preferred order → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Content)
   - Developer B: User Story 2 (Chatbot)
   - Developer C: User Story 3 (Docusaurus Site)
   - Developer D: Bonus Features (Auth, Personalization, Translation, Agents)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
