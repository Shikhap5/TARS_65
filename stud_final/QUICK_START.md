# Quick Start Guide

## Login & Explore

### Step 1: Login as Student
1. Go to http://localhost:3000
2. Click "Student Login"
3. Enter:
   - Username: `student1`
   - Password: `password123`
4. Complete onboarding:
   - Grade: Select 11
   - Target Exam: Select "JEE Main"

### Step 2: Explore Dashboard
- View your grade and target exam info
- See exam weightage chart
- Browse Mathematics, Physics, Chemistry subjects

### Step 3: Use AI Study Assistant
1. Click on "Mathematics" subject
2. Scroll to "AI Study Assistant"
3. Add weak areas:
   - Click "Add weak area"
   - Type "Algebra"
   - Press Enter or click "Add"
4. Watch AI recommendations update
5. Check "Study Plan" tab for personalized advice
6. See "Ranked Resources" for priority learning materials
7. Take "Smart Quizzes" generated for your weak areas

### Step 4: Explore Resources
- Browse videos, notes, and past papers
- Filter by difficulty (Beginner, Intermediate, Advanced)
- Filter by type (Video, Note, Paper)
- Click "Open" to access resources

---

## Admin Features

### Step 1: Login as Admin
1. Go to http://localhost:3000
2. Click "Admin Login"
3. Enter:
   - Username: `admin1`
   - Password: `admin123`

### Step 2: Import YouTube Video
1. Go to "Video Lessons" tab
2. Click "+ Add New"
3. Copy a YouTube URL (e.g., https://www.youtube.com/watch?v=WUvTyaaNkzM)
4. Paste in "Import YouTube Video" field
5. Click "Import"
6. Fill details:
   - Title: "Calculus Basics"
   - Description: "Learn calculus fundamentals"
   - Difficulty: "Beginner"
7. Click "Save Resource"
8. New video appears in resource list

### Step 3: Manage Resources
- Click Edit (✏️) to modify resource
- Click Delete (🗑️) to remove resource
- Resources automatically available to all students

### Step 4: Manage Question Papers
1. Go to "Question Papers" tab
2. Click "+ Add New"
3. Upload PDF or paste link
4. Set difficulty level
5. Save and make available for practice

### Step 5: Configure Weightage
1. Go to "Exam Weightage" tab
2. Adjust percentage for each subject
3. System shows total = 100%
4. Students see updated prioritization

---

## AI Features Demo

### Weak Area Management
- Add: "Optics" → AI will rank optics resources #1
- Add: "Organic Chemistry" → Related resources move up
- Remove: Click × on any weak area → Recommendations update
- Maximum focus: 30-40% of study time on weak areas

### Study Plan Tips
- Grade 9: Focus on fundamentals, 15 hours/week
- Grade 10: Build intermediate concepts, 17.5 hours/week
- Grade 11: Master advanced topics, 20 hours/week
- All plans adjust for weak areas

### Resource Ranking
High priority (Rank #1):
- Matches weak areas
- High subject weightage
- Difficult question papers
- Matches student grade

Low priority (Rank 5+):
- Not in weak areas
- Optional/supplementary
- May be too easy/hard

### Smart Quizzes
- Generated from weak areas
- Difficulty matches your grade
- Covers concepts, problems, mistakes, formulas
- Click "Start" to begin practice

---

## Keyboard Shortcuts

- **Tab**: Navigate between form fields
- **Enter**: Submit form / Add weak area
- **Esc**: Close dialog/modal
- **Ctrl+L**: Go to login page

---

## Troubleshooting

### YouTube Import Not Working
- Check URL format (must include youtube.com or youtu.be)
- Try different URL format:
  - `https://youtube.com/watch?v=VIDEO_ID` ✓
  - `https://youtu.be/VIDEO_ID` ✓
  - `https://youtube.com/embed/VIDEO_ID` ✓

### Weak Areas Not Updating
- Refresh page (Ctrl+R)
- Clear browser cache
- Try different weak area name
- Check spelling and capitalization

### Dashboard Not Loading
- Log out and log back in
- Check if grade and exam are selected in onboarding
- Ensure browser cookies are enabled

### Resources Not Showing
- Verify subject matches target exam
- Check difficulty filter is set to "All"
- Check resource type filter is set to "All"

---

## Tips & Tricks

1. **Study Efficiently**: Follow the AI Study Plan for optimal time allocation
2. **Use Weak Areas**: Adding weak areas improves all recommendations
3. **Practice Papers**: Question papers ranked highest for exam prep
4. **Regular Practice**: Take smart quizzes 2-3 times per week
5. **Import Variety**: Import videos from different creators for multiple perspectives
6. **Mobile-Friendly**: While web-optimized, works on tablets too

---

## File Structure
\`\`\`
Components:
- /components/student/ai-assistant-panel.tsx - AI recommendations
- /components/admin/resource-manager.tsx - YouTube import
- /lib/ai-utils.ts - All AI algorithms

Usage:
- generatePersonalizedStudyPlan() - Study recommendations
- rankResources() - Resource prioritization
- convertToYouTubeEmbed() - YouTube URL conversion
\`\`\`

---

## Feature Limitations (Current Version)

- Local data only (no database persistence)
- Single session AI state
- Max 5 weak areas
- Mock data for demo (easily replaced with real DB)
- No real quiz scoring (ready for implementation)

---

## Next Steps

1. ✓ Test student login and AI features
2. ✓ Test admin YouTube import
3. ✓ Add multiple weak areas
4. ✓ Try different exam types
5. ✓ Filter resources by difficulty/type
6. ✓ Import personal YouTube links
7. → Ready for database integration
8. → Ready for mobile app conversion
9. → Ready for real quiz implementation
10. → Ready for progress tracking

---

## Support

For detailed information:
- See `AI_FEATURES.md` for AI algorithm details
- See `ENHANCED_FEATURES.md` for new capabilities
- See `README.md` for full documentation
