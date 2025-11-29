# Personalized Learning Resources & Exam Planner
## Public Student Learning Platform

### Overview
A completely open-access learning platform designed for students of all grades (1-12) to access curated learning resources for both school board exams and competitive exams.

### Key Features

#### 1. No Authentication Required
- Zero login barriers
- Direct access to all resources
- Session data stored locally in browser

#### 2. Dual Exam Categories
- **School Board**: CBSE, ICSE, State Boards (Grades 1-12)
- **Competitive**: JEE Main, JEE Advanced, NEET, SAT, Olympiad (Grades 10-12)

#### 3. Comprehensive Subject Coverage

**School Board Subjects (All Grades)**
- Mathematics
- Science
- English

**JEE Subjects** (Competitive)
- Mathematics (33% weightage)
- Physics (33% weightage)
- Chemistry (34% weightage)

**NEET Subjects** (Competitive)
- Biology (50% weightage)
- Physics (25% weightage)
- Chemistry (25% weightage)

#### 4. Learning Resources by Type

**Video Lessons (YouTube)**
- Embedded YouTube videos
- Supports all YouTube URL formats
- Direct access to video tutorials
- Filtered by difficulty level

**Study Notes (PDF)**
- Comprehensive study materials
- Topic-wise organized content
- Downloadable for offline access
- Progressive difficulty levels

**Previous Year Question Papers**
- Publicly available exam papers
- Complete with solutions
- Actual exam difficulty level
- Multiple years available

#### 5. Exam Weightage Display
- Subject-wise importance visualization
- Priority ranking for study planning
- Interactive bar charts showing percentage breakdown
- Helps students allocate study time effectively

#### 6. Smart Filtering
- Filter by difficulty level (Beginner, Intermediate, Advanced)
- Filter by resource type (Videos, Notes, Papers)
- Combined filtering for targeted learning

#### 7. AI Study Assistant (Local)
- Personalized study plans based on grade
- Resource ranking algorithm
- Smart quiz generation for weak areas
- All computations done locally (no API calls)

### How to Use

#### Step 1: Select Exam Category
Homepage presents two options:
- 🏫 School Board (for any grade 1-12)
- 🏆 Competitive Exams (primarily grades 10-12)

#### Step 2: Choose Your Grade
Select from grades 1-12 using interactive grade selector

#### Step 3: Select Target Exam
Choose specific exam:
- Board users: CBSE, ICSE, or State Board
- Competitive users: JEE Main, JEE Advanced, NEET, SAT, or Olympiad

#### Step 4: Access Dashboard
- View all available subjects
- See exam weightage breakdown
- Browse resources by subject
- Apply filters for focused learning

### Session Management
- Session data stored in browser's localStorage
- No server communication required
- Start over option resets selection
- Change selection maintains browsing history

### Resource Architecture

#### Mock Data Structure
\`\`\`
Topics (organized by subject)
├── Each topic has multiple resources
├── Video lessons (YouTube embedded)
├── Study notes (PDF links)
└── Question papers (PDF links)
\`\`\`

#### Exam Types Supported
\`\`\`
School Board
├── CBSE (Grades 1-12)
├── ICSE (Grades 1-12)
└── State Board (Grades 1-12)

Competitive
├── JEE Main (Grades 10-12)
├── JEE Advanced (Grades 10-12)
├── NEET (Grades 11-12)
├── SAT (Grades 10-12)
└── Olympiad (Grades 6-12)
\`\`\`

### AI Features (All Local Processing)

#### 1. Personalized Study Plans
- Grade-based recommendations
- Exam type considerations
- Weak area prioritization
- Study time allocation

#### 2. Intelligent Resource Ranking
- Multi-factor scoring algorithm
- Difficulty-grade matching
- Subject weightage consideration
- Weak area bonus points
- Resource type prioritization

#### 3. Smart Quiz Generation
- Based on identified weak areas
- Multiple question types
- Difficulty-scaled questions
- Topic-specific focus

### Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Storage**: localStorage (session management)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Language**: TypeScript
- **AI**: Local algorithms (no external API)

### File Structure
\`\`\`
app/
├── page.tsx (Homepage - Category/Grade/Exam Selection)
├── dashboard/page.tsx (Main learning dashboard)
└── layout.tsx (Root layout)

lib/
├── types.ts (TypeScript interfaces)
├── mock-data.ts (All subjects and resources)
├── ai-utils.ts (AI algorithms)
└── use-student-session.ts (Session management hook)

components/
├── student/ (All student components)
├── ui/ (shadcn/ui components)
└── simple-tabs.tsx (Custom tab component)
\`\`\`

### Future Enhancements
- Progress tracking and statistics
- User-generated notes and annotations
- Live doubt clearing sessions
- Performance analytics
- Customizable study schedules
- Mobile app version
- Offline resource downloads
- Community forum
- Peer study groups

### Data Privacy
- All data stored locally in browser
- No server-side tracking
- No personal information required
- No cookies or analytics
- Complete user privacy

### Accessibility
- Web-only layout (optimized for desktop)
- Clear information hierarchy
- Filter-based content discovery
- Grade-appropriate difficulty levels
- Multiple resource types for different learning styles

---

**Platform Status**: Production Ready
**Last Updated**: November 2024
**License**: Open Source
