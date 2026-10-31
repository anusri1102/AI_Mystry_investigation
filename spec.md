# AI MYSTERY ROOM
## Product Requirements & Technical Specification
**Document Type:** Single Source of Truth (SSOT)  
**Development Methodology:** Spec-Driven Development (SDD)  
**Project Status:** Initial Development Specification  
**Version:** 1.0  
**Target:** Codex AI Coding Agent

---

# 1. PROJECT OVERVIEW

## 1.1 Project Name
**AI Mystery Room**

## 1.2 Product Vision

AI Mystery Room is an interactive, AI-powered mystery investigation platform where users become detectives and solve fictional criminal cases generated dynamically using Artificial Intelligence.

Users provide a short scenario, story idea, or mystery theme. The application uses Google's Gemini AI to transform that input into a complete fictional investigation.

Each investigation contains:
- A mystery scenario.
- A list of suspects.
- A hidden culprit.
- Character backgrounds and motives.
- AI-generated investigation evidence.
- WhatsApp-style conversations.
- Images and crime-scene photographs.
- CCTV-style recordings.
- Witness statements.
- Additional clues and inconsistencies.

Users must investigate the available evidence, connect clues, identify contradictions, and select the person they believe is responsible.

The application evaluates the user's final accusation and reveals the actual solution with an explanation.

## 1.3 Core Concept

**User Input → AI Mystery Generation → Investigation → Evidence Analysis → Culprit Selection → AI-Powered Verdict**

The experience should feel like playing an interactive detective investigation rather than using a conventional AI chatbot.

## 1.4 Target Audience

- Mystery and detective-story enthusiasts.
- Users who enjoy puzzle-solving.
- Casual gamers.
- Users interested in crime investigation stories.
- People looking for interactive AI entertainment.

---

# 2. PRODUCT OBJECTIVES

The primary objectives are:

1. Allow users to create mysteries using their own story ideas.
2. Generate logically consistent fictional investigations.
3. Create multiple forms of AI-generated evidence.
4. Allow users to investigate evidence independently.
5. Ensure that the culprit is predetermined and cannot change during an investigation.
6. Evaluate the user's final accusation.
7. Provide a detailed explanation of the actual solution.
8. Deliver an immersive, modern detective-themed interface.

## 2.1 Core Product Principles

- Every mystery must have exactly one canonical culprit.
- Evidence must be consistent with the underlying solution.
- Evidence must not reveal the culprit too easily.
- Users must be able to investigate at their own pace.
- The AI must never change the solution after a case begins.
- The user must not see hidden investigation data before submitting an accusation.
- All cases must be fictional.

---

# 3. TECHNOLOGY STACK

## 3.1 Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend application |
| Vite | Development and build tooling |
| React Router | Client-side routing |
| Tailwind CSS | Styling and responsive design |
| Lucide React | Icons |
| Axios | API communication |
| React Context API | Global application state |

## 3.2 Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | Database object modeling |
| JWT | Authentication |
| bcrypt | Password hashing |
| Multer | File upload handling |
| Zod | Request and AI-output validation |

## 3.3 Artificial Intelligence

**Primary AI Provider: Google Gemini API**

Gemini will handle:

- Mystery scenario generation.
- Character and suspect creation.
- Motive generation.
- Evidence content generation.
- Investigation narrative generation.
- Logical consistency validation.
- Final verdict explanations.

For image and video generation, use separate provider adapters.

The application must support configurable AI asset-generation providers rather than assuming that every Gemini model supports image or video generation.

Recommended architecture:

- Gemini: Text, structured investigation data, conversations, witness statements and narrative.
- Image-generation provider: Crime-scene images and photographic evidence.
- Video-generation provider: Short CCTV-style clips, when supported and configured.
- Fallback: Clearly identified AI-generated still frames or storyboard evidence if video generation is unavailable.

Do not present a still image as an actual video recording.

## 3.4 Additional Services

| Service | Purpose |
|---|---|
| Cloudinary or compatible object storage | Store generated images and videos |
| MongoDB Atlas | Hosted database |
| Vercel | Frontend deployment |
| Render or equivalent | Backend deployment |

---

# 4. USER ROLES

The initial version will support two roles.

### 4.1 Guest User

A guest can:

- Visit the landing page.
- Create a mystery.
- Investigate generated cases.
- View suspects and evidence.
- Submit a final accusation.
- View the verdict.

Guest sessions must be associated with a secure session identifier.

### 4.2 Registered User

A registered user can:

- Perform all guest activities.
- Save investigation history.
- Revisit completed mysteries.
- View previous verdicts.
- Access their profile.

Authentication is optional for the MVP. Guest investigation must work without requiring registration.

---

# 5. APPLICATION STRUCTURE

## 5.1 Main Pages

The application must contain the following pages:

1. Landing Page
2. Create Mystery Page
3. Mystery Generation / Loading Page
4. Investigation Dashboard
5. Suspects Page or Panel
6. Evidence Viewer
7. Final Accusation Page
8. Verdict Page
9. Login / Registration Page
10. User Profile and Investigation History

## 5.2 Navigation

The primary navigation should include:

- Home
- Create Mystery
- My Investigations
- About

During an active investigation, the user should have access to:

- Case Overview
- Suspects
- Evidence
- Investigation Notes
- Submit Accusation

Navigation must not expose hidden solution information.

---

# 6. USER EXPERIENCE AND APPLICATION FLOW

## 6.1 Landing Page

The landing page introduces AI Mystery Room.

Required sections:

**Hero Section**
- Main headline: "Every Mystery Has a Secret. Can You Find It?"
- Supporting description.
- Primary CTA: "Start Investigating"
- Secondary CTA: "How It Works"

**How It Works**
1. Create your mystery.
2. Examine the evidence.
3. Identify the culprit.
4. Discover the truth.

**Features**
- AI-generated mysteries.
- Interactive investigations.
- Multiple evidence formats.
- Unexpected twists.

**Footer**
- About.
- Privacy Policy.
- Terms and Conditions.

## 6.2 Create Mystery Page

The user must be able to describe the mystery they want to investigate.

Required input:

- Mystery title (optional).
- Scenario description (required).
- Mystery category.
- Difficulty level.

Supported categories:

- Murder Mystery.
- Missing Person.
- Theft.
- Cybercrime.
- Corporate Conspiracy.
- General Mystery.

Difficulty levels:

- Easy.
- Medium.
- Hard.

The user can also select a random mystery option if they do not have a scenario idea.

Example user input:

"A wealthy businessman is found dead inside his locked mansion. Five people were present that night, and everyone has a different story."

CTA: **Generate Mystery**

Validation:
- Scenario description cannot be empty.
- Apply a reasonable maximum input length.
- Reject harmful, real-world targeting, or requests to investigate actual private individuals.
- Clearly indicate that generated cases are fictional.

## 6.3 Mystery Generation Page

After submission:

1. Display a generation animation.
2. Send the scenario to the backend.
3. Backend requests structured mystery generation from Gemini.
4. Validate the generated mystery.
5. Generate the required evidence assets.
6. Store the investigation and evidence.
7. Redirect to the Investigation Dashboard.

Display generation stages:

- Creating the case.
- Introducing suspects.
- Constructing the investigation.
- Generating evidence.
- Preparing the mystery.

Generation must support asynchronous processing and progress updates.

If an asset-generation provider fails, the case should remain usable with available evidence and a clearly indicated fallback.

---

# 7. INVESTIGATION DASHBOARD

This is the primary gameplay interface.

The dashboard should resemble a professional detective investigation workspace.

## 7.1 Dashboard Layout

**Top Section**
- Case ID.
- Case title.
- Difficulty.
- Investigation status.
- Progress indicator.

**Main Workspace**

Use a three-part layout on desktop:

Left sidebar:
- Case overview.
- Suspects.
- Evidence categories.
- Investigation notes.

Center:
- Selected evidence.
- Evidence details.
- Interactive viewer.

Right sidebar:
- Suspect quick information.
- Investigation progress.
- Important observations.

On smaller screens, use responsive tabs or collapsible panels.

## 7.2 Case Overview

Display:

- Case description.
- Incident date and time.
- Location.
- Victim information, if applicable.
- Known circumstances.
- Initial investigation summary.

The case overview must not disclose the culprit.

## 7.3 Suspect Section

Every mystery should contain between 3 and 6 suspects.

Each suspect should have:

- Unique suspect ID.
- Name.
- Age.
- Occupation.
- Profile photograph.
- Relationship to the incident.
- Background.
- Possible motive.
- Alibi.
- Known statements.

Important:

Suspect information must be generated from the canonical mystery data.

The interface must not identify the actual culprit before the user submits an accusation.

---

# 8. EVIDENCE SYSTEM

The evidence system is the most important component of the product.

Every investigation must contain multiple evidence types.

## 8.1 Evidence Categories

### A. WhatsApp-Style Conversations

Generate fictional chat conversations between suspects or relevant characters.

Each conversation should contain:

- Sender name.
- Recipient name.
- Message content.
- Timestamp.
- Message delivery status, where appropriate.
- Conversation history.

UI requirements:

- WhatsApp-inspired chat layout.
- Different message alignment for different participants.
- Realistic timestamps.
- Scrollable conversation.
- Optional multiple chat threads.

The design must not use actual private WhatsApp data or imply that fictional messages are authentic records.

### B. Image Evidence

Generate fictional investigation photographs.

Examples:

- Crime scene.
- Suspicious objects.
- Room photographs.
- Handwritten notes.
- Documents.
- Damaged items.
- Objects found at the scene.

Each image should have:

- Evidence ID.
- Title.
- Image file.
- Description.
- Discovery location.
- Timestamp.
- Related suspect, if applicable.
- Investigation relevance.

Images should open in a full-screen or enlarged viewer.

### C. CCTV Evidence

Generate fictional CCTV-style evidence.

Examples:

- Corridor footage.
- Entrance recordings.
- Parking area recordings.
- Suspicious movement.
- Timeline-related activity.

Each video should contain:

- Video file URL.
- Camera ID.
- Location.
- Recording date.
- Recording start and end time.
- Description.
- Related timeline events.

Player requirements:

- Play and pause.
- Seek bar.
- Timestamp overlay.
- Camera identifier.
- Full-screen support.

If a video-generation service is unavailable, use a clearly labeled alternative such as AI-generated CCTV still frames with timestamps.

### D. Witness Statements

Generate statements from characters who may have witnessed the incident.

Each statement contains:

- Witness name.
- Statement.
- Statement timestamp.
- Location.
- Reliability indicator.
- Related evidence references.

Witness statements can contain misleading information, but contradictions must be logically explainable.

### E. Documents and Additional Evidence

Optional evidence formats:

- Emails.
- Newspaper clippings.
- Handwritten notes.
- Receipts.
- Call logs.
- Timeline reports.
- Financial documents.

These should be generated as fictional investigation artifacts.

## 8.2 Evidence Metadata

Every evidence item must have:

- Unique ID.
- Evidence type.
- Title.
- Description.
- Asset URL, when applicable.
- Timestamp.
- Discovery location.
- Related suspects.
- Related evidence.
- Investigation relevance.
- Visibility status.

The actual solution, hidden clues, and internal reasoning must never be included in publicly accessible evidence metadata.

## 8.3 Evidence Interaction

Users must be able to:

- Open evidence.
- Zoom into images.
- Play videos.
- Read messages.
- Examine documents.
- Navigate between evidence items.
- Add personal investigation notes.
- Mark evidence as reviewed.

The system should track which evidence items the user has examined.

---

# 9. AI MYSTERY GENERATION ENGINE

## 9.1 Core Requirement

Gemini must generate a complete investigation with a consistent underlying solution.

The AI must not independently invent a new culprit when generating each evidence item.

## 9.2 Generation Pipeline

Step 1: Receive user scenario.

Step 2: Send structured prompt to Gemini.

Step 3: Generate the canonical investigation blueprint.

Step 4: Validate the blueprint.

Step 5: Generate suspect profiles.

Step 6: Generate the evidence manifest.

Step 7: Generate evidence content.

Step 8: Generate image/video assets using configured providers.

Step 9: Validate evidence against the canonical solution.

Step 10: Save the complete investigation.

Step 11: Mark the case as READY.

## 9.3 Canonical Mystery Blueprint

Gemini must return structured JSON containing:

- Case details.
- Incident details.
- Suspects.
- Actual culprit.
- Motive.
- Method of the fictional incident.
- Opportunity.
- Timeline.
- Evidence manifest.
- Evidence relationships.
- Red herrings.
- Contradictions.
- Correct explanation.
- Final verdict.

The canonical blueprint must be stored privately on the backend.

## 9.4 Mystery Logic Requirements

Every generated mystery must satisfy:

1. Exactly one actual culprit.
2. At least three suspects.
3. A believable motive.
4. A consistent timeline.
5. A plausible opportunity.
6. At least three meaningful clues.
7. At least one misleading clue.
8. At least one contradiction that helps identify the culprit.
9. Sufficient evidence to reach a defensible conclusion.
10. A solution that explains all important evidence.

The culprit must be identifiable through evidence, not random guessing.

## 9.5 AI Consistency Validation

Before publishing a mystery, the backend must validate:

- All suspect IDs exist.
- The culprit ID belongs to the suspect list.
- All evidence references are valid.
- Evidence timestamps are compatible with the timeline.
- The actual culprit's actions are consistent with the solution.
- Red herrings have explanations.
- No evidence directly contradicts the canonical solution without an intentional explanation.
- The mystery is solvable.

If validation fails, request a correction from Gemini with the validation errors.

Use a limited retry count. If validation still fails, do not publish the incomplete mystery.

## 9.6 Freeze the Solution

Once the investigation is marked READY:

- Store the canonical solution.
- Do not regenerate the culprit.
- Do not change suspect motives.
- Do not modify existing evidence in a way that changes the answer.
- Do not send the hidden solution to the frontend.
- Keep all verdict evaluation based on the stored canonical solution.

This is a critical architectural requirement.

---

# 10. GEMINI API INTEGRATION

## 10.1 Backend Integration

Gemini API calls must only happen on the backend.

Never expose:

- Gemini API key.
- Private prompts.
- Canonical solution.
- Internal AI validation data.

Use environment variables:

GEMINI_API_KEY  
GEMINI_MODEL

Use a configurable model identifier so the application can change models without modifying core business logic.

## 10.2 Structured Output

Request JSON output using a supported structured-output configuration.

Validate every response using Zod before saving it to MongoDB.

Do not assume that an AI-generated JSON response is automatically valid.

## 10.3 Prompt Architecture

Maintain separate prompts for:

- Mystery blueprint generation.
- Suspect generation.
- Evidence generation.
- Evidence consistency validation.
- Final verdict explanation.

All prompts must be stored in a dedicated backend prompts directory.

Suggested structure:

server/
  src/
    ai/
      geminiClient.js
      prompts/
        mystery.prompt.js
        suspects.prompt.js
        evidence.prompt.js
        validation.prompt.js
        verdict.prompt.js

## 10.4 AI Provider Abstraction

Create separate service interfaces:

- TextGenerationProvider.
- ImageGenerationProvider.
- VideoGenerationProvider.

Gemini is the default text-generation provider.

Image and video providers must be configurable independently.

The frontend must never depend on a specific AI provider.

---

# 11. FINAL ACCUSATION SYSTEM

After examining the evidence, the user must submit a final accusation.

## 11.1 Accusation Page

Display all suspects with:

- Profile image.
- Name.
- Short description.
- Selection control.

User must select exactly one suspect.

Optional input:

"Why do you think this person is responsible?"

The user can provide a short explanation.

CTA: **Submit Final Accusation**

## 11.2 Submission Rules

- Exactly one suspect must be selected.
- Accusation can be submitted only once in the MVP.
- The backend must verify the selected suspect belongs to the case.
- The accusation must be evaluated against the frozen canonical solution.
- The user cannot modify the accusation after submission.

## 11.3 Verdict Page

The result must display:

**If Correct:**
- Congratulations message.
- Correct culprit.
- Points awarded.
- Investigation performance.
- Explanation of the decisive clues.

**If Incorrect:**
- Investigation failed message.
- Actual culprit.
- Explanation of the correct solution.
- Why the selected suspect was not responsible.
- Important clues the user may have missed.

## 11.4 Verdict Scoring

Use a simple deterministic scoring system for MVP:

| Action | Points |
|---|---:|
| Correct culprit selection | 100 |
| Correct explanation of a decisive clue | Up to 20 bonus points |

The final score must be calculated by backend logic.

Do not allow Gemini to independently award arbitrary scores.

---

# 12. DATABASE DESIGN

Use MongoDB with Mongoose.

## 12.1 User Collection

Fields:

- _id
- username
- email
- passwordHash
- createdAt
- updatedAt

Password hashes must be stored instead of plaintext passwords.

## 12.2 Mystery Collection

Fields:

- _id
- caseId
- userId (nullable for guest users)
- sessionId
- title
- scenario
- category
- difficulty
- caseDescription
- incidentDetails
- suspects
- evidence
- timeline
- canonicalSolution
- generationStatus
- generationProgress
- createdAt
- updatedAt

Important:

canonicalSolution must be private backend data.

Do not expose this field through ordinary case APIs.

## 12.3 Suspect Structure

- suspectId
- name
- age
- occupation
- profileImageUrl
- background
- relationship
- motive
- alibi
- statements

The actual culprit designation belongs in canonicalSolution, not in public suspect objects.

## 12.4 Evidence Structure

- evidenceId
- type
- title
- description
- assetUrl
- metadata
- timestamp
- location
- relatedSuspectIds
- relatedEvidenceIds
- generationStatus

## 12.5 Investigation Collection

Fields:

- _id
- mysteryId
- userId
- sessionId
- viewedEvidenceIds
- investigationNotes
- status
- startedAt
- completedAt

## 12.6 Accusation Collection

Fields:

- _id
- mysteryId
- investigationId
- selectedSuspectId
- userExplanation
- isCorrect
- score
- verdictExplanation
- submittedAt

Store the actual verdict in the backend.

Never return the canonical solution in an active investigation response.

---

# 13. BACKEND API SPECIFICATION

Base URL:

/api/v1

## 13.1 Authentication

POST /auth/register

POST /auth/login

POST /auth/logout

GET /auth/me

## 13.2 Mystery APIs

POST /mysteries

Creates a mystery generation job.

GET /mysteries/:caseId

Returns public case information only.

GET /mysteries/:caseId/status

Returns generation status and progress.

GET /mysteries

Returns the user's investigation history.

DELETE /mysteries/:caseId

Deletes an eligible user-owned investigation.

## 13.3 Evidence APIs

GET /mysteries/:caseId/evidence

Returns evidence metadata.

GET /mysteries/:caseId/evidence/:evidenceId

Returns one evidence item.

POST /mysteries/:caseId/evidence/:evidenceId/view

Marks evidence as reviewed.

## 13.4 Investigation APIs

POST /investigations

Creates an investigation session.

GET /investigations/:investigationId

Returns investigation progress.

PATCH /investigations/:investigationId/notes

Saves investigation notes.

## 13.5 Accusation APIs

POST /investigations/:investigationId/accusation

Submits the final accusation.

GET /investigations/:investigationId/verdict

Returns the final verdict after submission.

All endpoints must include proper validation, authorization, and error handling.

---

# 14. FRONTEND DESIGN SYSTEM

## 14.1 Design Direction

The website must feel like a premium detective investigation platform.

Visual inspiration:

- Detective investigation rooms.
- Dark crime investigation interfaces.
- Evidence boards.
- Classified investigation files.
- Cinematic mystery games.

Avoid a generic SaaS dashboard appearance.

## 14.2 Color Palette

| Element | Color |
|---|---|
| Main background | #0B0F14 |
| Secondary background | #121923 |
| Card background | #19232F |
| Primary accent | #D6A84F |
| Primary text | #F5F5F5 |
| Secondary text | #A0AAB7 |
| Danger | #D9534F |
| Success | #48A879 |
| Borders | #293443 |

## 14.3 Typography

Use:

- Inter for body text.
- A cinematic serif font such as Playfair Display for selected headings.

## 14.4 UI Requirements

- Dark theme as default.
- Consistent spacing.
- Subtle transitions.
- Smooth page transitions.
- Interactive evidence cards.
- Responsive layouts.
- Accessible contrast.
- Loading skeletons.
- Clear error messages.
- Empty states.

## 14.5 Animations

Use animations selectively:

- Mystery generation animation.
- Evidence opening transitions.
- Hover effects.
- Verdict reveal animation.
- Subtle background effects.

Animations must not interfere with functionality or accessibility.

---

# 15. PROJECT DIRECTORY STRUCTURE

Use a clean MERN architecture.

ai-mystery-room/
|
|-- client/
|   |-- src/
|       |-- assets/
|       |-- components/
|       |   |-- common/
|       |   |-- layout/
|       |   |-- mystery/
|       |   |-- suspects/
|       |   |-- evidence/
|       |   |-- investigation/
|       |-- pages/
|       |-- context/
|       |-- hooks/
|       |-- services/
|       |-- utils/
|       |-- styles/
|       |-- App.jsx
|       |-- main.jsx
|       |-- index.css
|
|-- server/
|   |-- src/
|       |-- config/
|       |-- controllers/
|       |-- middleware/
|       |-- models/
|       |-- routes/
|       |-- services/
|       |   |-- ai/
|       |   |-- mystery/
|       |   |-- evidence/
|       |   |-- storage/
|       |-- prompts/
|       |-- validators/
|       |-- utils/
|       |-- app.js
|       |-- server.js
|
|-- .env.example
|-- .gitignore
|-- README.md

Keep controllers thin. Business logic belongs in service modules.

---

# 16. SECURITY REQUIREMENTS

1. Store API keys only in backend environment variables.
2. Hash passwords using bcrypt.
3. Validate all user inputs.
4. Validate all AI-generated structured outputs.
5. Implement rate limiting on mystery generation.
6. Protect user-owned investigation data.
7. Prevent users from accessing another user's private cases.
8. Prevent unauthorized verdict access before accusation submission.
9. Do not expose canonicalSolution through API responses.
10. Validate file uploads and generated asset URLs.
11. Restrict generated content to supported file formats and sizes.
12. Use secure session handling for guest investigations.
13. Apply appropriate CORS configuration.
14. Never execute generated AI content as code.
15. Keep secrets out of logs and frontend bundles.

All cases and evidence must be fictional. Do not use real private individuals' personal data or generate evidence intended to impersonate authentic records.

---

# 17. ERROR HANDLING

The application must handle:

- Gemini API failure.
- Invalid AI-generated JSON.
- Mystery generation timeout.
- Image generation failure.
- Video generation failure.
- Database connection failure.
- Invalid case ID.
- Missing evidence.
- Invalid suspect selection.
- Duplicate accusation.
- Unauthorized access.
- Network errors.

Display understandable messages to users.

Do not expose internal stack traces, API keys, or private AI prompts.

If optional media generation fails, the application should retain usable evidence and indicate that the asset is unavailable or provide a supported fallback.

---

# 18. PERFORMANCE REQUIREMENTS

- Lazy-load evidence images.
- Load video only when opened.
- Paginate investigation history.
- Avoid unnecessary Gemini requests.
- Store generated evidence instead of regenerating it on every request.
- Use asynchronous generation jobs.
- Cache suitable public case information.
- Optimize generated image sizes.
- Avoid blocking the main application while assets are being generated.

The investigation dashboard should remain usable on standard mobile and desktop connections.

---

# 19. TESTING REQUIREMENTS

## 19.1 Frontend Testing

Test:

- Navigation.
- Form validation.
- Mystery creation.
- Evidence navigation.
- Image viewer.
- Video player.
- Suspect selection.
- Accusation submission.
- Verdict rendering.
- Mobile responsiveness.

## 19.2 Backend Testing

Test:

- Authentication.
- Mystery generation.
- AI response validation.
- Database persistence.
- Evidence retrieval.
- Investigation progress.
- Accusation validation.
- Verdict calculation.
- Authorization.

## 19.3 AI Testing

Test generated mysteries for:

- Exactly one culprit.
- Valid suspect references.
- Logical timelines.
- Consistent motives.
- Evidence relevance.
- Explainable red herrings.
- Solvability.
- Correct verdict generation.

## 19.4 Critical Security Test

Attempt to retrieve the canonical solution using:

- Browser developer tools.
- Direct API requests.
- Modified request parameters.
- Unauthorized user sessions.

The solution must remain inaccessible until the verdict is legitimately revealed.

---

# 20. MVP DEVELOPMENT PRIORITIES

Development must follow this order.

## Phase 1: Project Foundation

- Initialize MERN project.
- Configure frontend and backend.
- Connect MongoDB.
- Configure environment variables.
- Establish routing and API communication.
- Implement initial design system.

## Phase 2: Core Mystery Generation

- Create mystery input page.
- Integrate Gemini.
- Generate canonical investigation blueprint.
- Generate suspects.
- Validate structured output.
- Store mystery in MongoDB.

## Phase 3: Investigation Interface

- Build investigation dashboard.
- Display case information.
- Display suspects.
- Build evidence navigation.
- Implement evidence viewer.

## Phase 4: AI Evidence Generation

- Generate fictional chat conversations.
- Generate image evidence.
- Generate witness statements.
- Implement video provider integration.
- Store media in object storage.

## Phase 5: Accusation and Verdict

- Build suspect selection.
- Implement accusation API.
- Implement deterministic scoring.
- Reveal verdict.
- Display solution explanation.

## Phase 6: User Accounts and History

- Implement authentication.
- Implement saved investigations.
- Build user profile.
- Add investigation history.

## Phase 7: Testing and Deployment

- Test all user flows.
- Fix UI and API errors.
- Perform security checks.
- Optimize performance.
- Deploy frontend and backend.

---

# 21. MVP SCOPE AND FEATURE PRIORITY

| Feature | Priority |
|---|---|
| Landing page | P0 |
| Create mystery | P0 |
| Gemini mystery generation | P0 |
| Canonical culprit storage | P0 |
| Suspect profiles | P0 |
| WhatsApp-style evidence | P0 |
| Image evidence | P0 |
| Witness statements | P0 |
| Investigation dashboard | P0 |
| Culprit selection | P0 |
| Verdict system | P0 |
| Investigation notes | P1 |
| CCTV video generation | P1 |
| User authentication | P1 |
| Investigation history | P1 |
| Leaderboards | P2 |
| Multiplayer investigations | P2 |
| Difficulty-based scoring enhancements | P2 |
| Public mystery sharing | P2 |

P0 = Required for a functional MVP.  
P1 = Important subsequent features.  
P2 = Future enhancements.

---

# 22. ACCEPTANCE CRITERIA

The MVP is considered complete only when all the following conditions are satisfied:

### Mystery Creation
- [ ] User can enter a custom scenario.
- [ ] User can select category and difficulty.
- [ ] Gemini generates a complete investigation.
- [ ] The generated investigation contains 3–6 suspects.
- [ ] Exactly one culprit is stored.
- [ ] The generated case is saved in MongoDB.

### Evidence
- [ ] The investigation contains multiple evidence types.
- [ ] Chat conversations are interactive and readable.
- [ ] Images can be opened and examined.
- [ ] Witness statements are available.
- [ ] CCTV functionality works when a video provider is configured.
- [ ] Evidence remains consistent with the canonical solution.

### Investigation
- [ ] User can navigate between suspects and evidence.
- [ ] User can mark evidence as reviewed.
- [ ] User can maintain investigation notes.
- [ ] Hidden solution data is not exposed.

### Verdict
- [ ] User can select one suspect.
- [ ] User can submit an accusation.
- [ ] Backend evaluates the answer correctly.
- [ ] Correct and incorrect verdicts display different results.
- [ ] The actual culprit and explanation are revealed after submission.

### General
- [ ] Website is responsive.
- [ ] API errors are handled.
- [ ] Security requirements are satisfied.
- [ ] Core user flow works from beginning to end.

---

# 23. CODEX DEVELOPMENT INSTRUCTIONS

This section is mandatory for the coding agent.

Codex must treat this document as the authoritative specification for AI Mystery Room.

## 23.1 Development Rules

1. Read the entire specification before writing code.
2. Follow the defined MERN architecture.
3. Do not introduce unrelated technologies or frameworks.
4. Do not skip required features.
5. Do not invent new product behavior without updating the specification.
6. Maintain a clean and modular codebase.
7. Use reusable React components.
8. Keep AI integration isolated in backend services.
9. Keep secrets in environment variables.
10. Validate AI output before database persistence.
11. Never expose the canonical solution before verdict submission.
12. Ensure the frontend uses real backend APIs rather than hardcoded demonstration data.
13. Use mock data only for explicitly identified development and testing purposes.
14. Maintain consistent naming conventions.
15. Do not leave nonfunctional buttons or placeholder interactions in completed features.

## 23.2 Implementation Workflow

For every development phase:

1. Review the relevant specification.
2. Identify dependencies.
3. Implement the feature.
4. Test its functionality.
5. Fix identified issues.
6. Update project documentation.
7. Mark completed acceptance criteria.
8. Proceed to the next phase.

Do not attempt to implement the entire application in one uncontrolled code-generation step.

## 23.3 Documentation Files

Maintain these additional files:

- README.md — Project setup and execution.
- ARCHITECTURE.md — System architecture and data flow.
- API.md — API endpoint documentation.
- DATABASE.md — MongoDB schema documentation.
- AI_PROMPTS.md — AI prompt inventory and versions.
- PROGRESS.md — Implementation progress.
- DECISIONS.md — Important technical decisions and deviations.

Any change to core product behavior must first be reflected in the specification.

## 23.4 Definition of Done

A feature is complete only when:

- Its frontend implementation exists.
- Its backend integration works where required.
- Data is correctly persisted where required.
- Validation is implemented.
- Error handling exists.
- Its acceptance criteria pass.
- It does not break existing features.

---

# 24. FINAL PRODUCT DEFINITION

AI Mystery Room is an AI-powered fictional investigation game.

The user is the detective.

Gemini is responsible for constructing the mystery.

The backend maintains the truth.

The evidence provides the clues.

The user makes the accusation.

The system reveals the verdict.

**The most important product requirement: Every mystery must be logically solvable, with one fixed culprit and evidence that supports the final answer.**

The goal is not simply to generate random crime stories. The goal is to create believable, interactive investigations where users must think like detectives to uncover the truth.

**END OF SPECIFICATION — VERSION 1.0**