# AI Study Assistant Features

## Overview
The Personalized Learning Resources & Exam Planner includes an advanced AI Study Assistant that provides intelligent, personalized learning recommendations without requiring external API calls. All AI functionality is implemented locally using smart algorithms.

## Key Features

### 1. Personalized Study Plan Generation
The AI generates customized study plans based on:
- **Student Grade Level** (1-12): Adjusts complexity and time allocation
- **Target Exam Type**: JEE, NEET, SAT, School Board, Olympiads
- **Weak Areas**: Student-identified areas needing focus
- **Subject Weightage**: Prioritizes high-importance subjects

**Algorithm Logic:**
- Allocates study hours based on grade level (15 hours/week for grades <10, 20 hours/week for grades 10+)
- Dedicates 30-40% of study time to weak areas
- Recommends optimal study time distribution across subjects
- Provides grade-specific learning strategies

### 2. Intelligent Resource Ranking
Resources are ranked using a multi-factor scoring system:

**Ranking Factors:**
- **Difficulty Match** (weighted 10x): Matches resource difficulty to student level
- **Subject Weightage** (weighted 0.5x): Prioritizes high-weightage subjects
- **Weak Area Bonus** (+30 points): Boosts resources covering identified weak areas
- **Resource Type Priority**: Papers (highest) > Notes > Videos for exam prep
- **Exam Relevance**: Considers target exam requirements

**Scoring Formula:**
\`\`\`
Score = (Difficulty Match × 10) + (Weightage × 0.5) + (Weak Area Bonus) + (Type Weight × 5)
\`\`\`

### 3. Smart Quiz Generation
Generates contextual quizzes focused on:
- Weak areas identified by the student
- Difficulty level matching student grade
- Specific focus areas (definitions, problems, relationships, formulas, mistakes)

### 4. YouTube Video Import
Admins can easily import YouTube videos as learning resources:

**Supported URL Formats:**
- Direct links: `https://youtube.com/watch?v=VIDEO_ID`
- Short links: `https://youtu.be/VIDEO_ID`
- Embed URLs: `https://youtube.com/embed/VIDEO_ID`

**Features:**
- Automatic URL validation
- Automatic conversion to embed format
- Error handling for invalid URLs
- Seamless integration with resource management system

## Implementation Details

### Files Added/Modified

#### New Files:
- `lib/ai-utils.ts` - Core AI algorithms and utilities
- `AI_FEATURES.md` - This documentation

#### Modified Files:
- `components/student/ai-assistant-panel.tsx` - Enhanced with AI logic
- `components/admin/resource-manager.tsx` - YouTube import functionality

### AI Algorithms

#### Study Plan Generation (`generatePersonalizedStudyPlan`)
\`\`\`typescript
Input: studentGrade, targetExam, weakAreas[], subjects[]
Output: array of personalized recommendations

Logic:
1. Determine time allocation based on grade
2. Prioritize weak areas (30-40% of time)
3. Recommend subject-wise time distribution based on weightage
4. Add daily study schedule with break recommendations
5. Provide exam-specific strategies
6. Add resource usage recommendations
\`\`\`

#### Resource Ranking (`rankResources`)
\`\`\`typescript
Input: resources[], studentGrade, targetExam, weakAreas[], subjects[]
Output: sorted array of resources by relevance score

Logic:
1. Calculate difficulty match score (grade-dependent)
2. Add subject weightage contribution
3. Bonus for weak area coverage
4. Add resource type priority
5. Sort by total score in descending order
\`\`\`

#### Quiz Generation (`generateQuizForWeakAreas`)
\`\`\`typescript
Input: weakAreas[], difficulty
Output: array of quiz objects focused on weak areas

Topics Generated:
- Key concepts in the area
- Typical problem solving
- Common mistakes
- Exam relevance
- Formula memorization
\`\`\`

### YouTube URL Utilities

#### `extractYouTubeVideoId(url)`
Extracts video ID from any YouTube URL format using regex pattern matching.

#### `convertToYouTubeEmbed(url)`
Converts any YouTube URL to standard embed format for iframe embedding.

#### `isValidYouTubeUrl(url)`
Validates if URL is from YouTube domain.

## Usage Examples

### For Students

1. **Add Weak Areas:**
   - Navigate to AI Study Assistant panel
   - Add weak areas (e.g., "Algebra", "Optics")
   - AI automatically regenerates recommendations

2. **View Study Plan:**
   - Switch to "Study Plan" tab in AI Assistant
   - Review personalized recommendations
   - Allocate daily study time accordingly

3. **Explore Ranked Resources:**
   - Switch to "Ranked Resources" tab
   - Resources are listed in priority order
   - Each resource shows ranking reason
   - Click "Open" to access the resource

4. **Take Smart Quizzes:**
   - Switch to "Smart Quizzes" tab
   - Quizzes are generated based on weak areas
   - Start quiz to practice

### For Admins

1. **Import YouTube Video:**
   - Go to Admin Dashboard
   - Click "Add New" in Video Lessons section
   - Paste YouTube URL in the "Import YouTube Video" field
   - Click "Import" button
   - Fill other details (title, description, difficulty)
   - Click "Save Resource"

2. **Supported YouTube URLs:**
   \`\`\`
   https://www.youtube.com/watch?v=WUvTyaaNkzM
   https://youtu.be/WUvTyaaNkzM
   https://www.youtube.com/embed/WUvTyaaNkzM
   \`\`\`

## AI Customization

The AI algorithms can be customized by modifying parameters in `lib/ai-utils.ts`:

- **Weak Area Priority**: Change 30-40% allocation in `generatePersonalizedStudyPlan`
- **Difficulty Weights**: Adjust `difficultyWeights` in `rankResources`
- **Weightage Factor**: Modify `subject.examWeightage * 0.5` multiplier
- **Resource Type Priorities**: Update `typeWeights` object

## Performance Notes

- All AI processing happens on client-side (no API calls)
- Algorithms run instantly even with large resource libraries
- No network latency for recommendations
- Fully functional offline

## Future Enhancements

- Machine learning-based weak area detection
- Progress tracking and adaptive recommendations
- Timed study sessions with break reminders
- Quiz performance analytics
- Peer comparison (anonymized)
- Predictive difficulty suggestions
\`\`\`

Now let me create an updated README with all features:
