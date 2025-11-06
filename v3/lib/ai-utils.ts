import type { Resource, Subject } from "./types"

// Simple local AI utility for generating study plans without API calls
export function generatePersonalizedStudyPlan(
  studentGrade: number,
  targetExam: string,
  weakAreas: string[],
  subjects: Subject[],
) {
  const totalHours = studentGrade < 10 ? 15 : 20
  const weeklyHours = totalHours / 7

  const recommendations: string[] = []

  // Rule 1: Grade-based recommendations
  if (studentGrade < 8) {
    recommendations.push(`Focus on fundamentals first - strong basics form the foundation for ${targetExam} success`)
  } else if (studentGrade < 10) {
    recommendations.push(`Build upon intermediate concepts - ${targetExam} requires deeper understanding`)
  } else {
    recommendations.push(`Master advanced topics - crucial for competitive exams like ${targetExam}`)
  }

  // Rule 2: Weak area prioritization
  if (weakAreas.length > 0) {
    const topWeakArea = weakAreas[0]
    recommendations.push(`PRIORITY: Allocate 30-40% of your study time to ${topWeakArea} - your weakest area`)
  }

  // Rule 3: High weightage topics
  const sortedByWeightage = [...subjects].sort((a, b) => b.examWeightage - a.examWeightage)
  if (sortedByWeightage.length > 0) {
    recommendations.push(
      `${sortedByWeightage[0].name} has highest weightage (${sortedByWeightage[0].examWeightage}%) - dedicate ${Math.round(weeklyHours * 2)} hours/week here`,
    )
  }

  // Rule 4: Study pattern
  recommendations.push(`Recommended daily study: ${weeklyHours.toFixed(1)} hours with 15-min breaks every 45 mins`)

  // Rule 5: Resource strategy
  recommendations.push(
    "Study strategy: Video lessons (concept building) → Study notes (reinforcement) → Question papers (practice)",
  )

  // Rule 6: Exam-specific advice
  if (targetExam.includes("JEE") || targetExam.includes("NEET")) {
    recommendations.push("Competitive exam focus: Practice previous 10 years papers, solve timed mock tests")
  } else if (targetExam.includes("SAT")) {
    recommendations.push("SAT preparation: Focus on time management and test-taking strategies")
  } else {
    recommendations.push("School board exam: Cover all topics in syllabus thoroughly, practice board-style questions")
  }

  return recommendations
}

// Ranking algorithm for resources based on multiple factors
export function rankResources(
  resources: Resource[],
  studentGrade: number,
  targetExam: string,
  weakAreas: string[],
  subjects: Subject[],
): Resource[] {
  const scoredResources = resources.map((resource) => {
    let score = 0

    // Factor 1: Difficulty match (beginner > intermediate > advanced based on grade)
    const difficultyWeights: Record<string, Record<string, number>> = {
      beginner: { beginner: 3, intermediate: 2, advanced: 1 },
      intermediate: { beginner: 2, intermediate: 3, advanced: 2 },
      advanced: { beginner: 1, intermediate: 2, advanced: 3 },
    }

    const gradeLevel = studentGrade < 8 ? "beginner" : studentGrade < 11 ? "intermediate" : "advanced"
    score += (difficultyWeights[gradeLevel]?.[resource.difficulty] || 1) * 10

    // Factor 2: Subject weightage
    const subject = subjects.find((s) => s.id === resource.subjectId)
    if (subject) {
      score += subject.examWeightage * 0.5
    }

    // Factor 3: Weak area bonus
    if (weakAreas.length > 0 && weakAreas.some((area) => resource.title.toLowerCase().includes(area.toLowerCase()))) {
      score += 30
    }

    // Factor 4: Resource type priority (for exam prep)
    const typeWeights: Record<string, number> = { video: 2, note: 3, paper: 4 }
    score += (typeWeights[resource.type] || 1) * 5

    return { resource, score }
  })

  return scoredResources.sort((a, b) => b.score - a.score).map((item) => item.resource)
}

// Generate quiz based on weak areas
export function generateQuizForWeakAreas(weakAreas: string[], difficulty: string) {
  const quizTopics = [
    "What are the key concepts in this topic?",
    "Can you solve a typical problem from this area?",
    "Explain the common mistakes students make here",
    "How does this topic relate to the exam?",
    "What are the formulas you need to memorize?",
  ]

  return weakAreas.map((area, idx) => ({
    id: `quiz-${idx}`,
    title: `${area} - ${difficulty} Challenge`,
    topic: area,
    focusAreas: quizTopics.slice(0, Math.ceil(Math.random() * 3) + 2),
    difficulty,
  }))
}

// Extract YouTube video ID from URL
export function extractYouTubeVideoId(url: string): string | null {
  // Handle various YouTube URL formats
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(youtubeRegex)
  return match ? match[1] : null
}

// Convert YouTube URL to embed format
export function convertToYouTubeEmbed(url: string): string | null {
  const videoId = extractYouTubeVideoId(url)
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null
}

// Validate YouTube URL
export function isValidYouTubeUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/.test(url)
}
