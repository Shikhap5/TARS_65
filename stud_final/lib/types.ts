export interface StudentSession {
  grade: number
  targetExam: string
  selectedCategory: string
}

export interface Subject {
  id: string
  name: string
  examBoard: string
  examType: string
  category: "board" | "competitive"
  examWeightage: number
  topics: Topic[]
}

export interface Topic {
  id: string
  name: string
  subjectId: string
  difficulty: "beginner" | "intermediate" | "advanced"
  order: number
}

export interface Resource {
  id: string
  type: "video" | "note" | "paper"
  title: string
  topicId: string
  subjectId: string
  description: string
  url: string
  difficulty: "beginner" | "intermediate" | "advanced"
  thumbnail?: string
  createdAt: Date
  updatedAt: Date
}

export interface Quiz {
  id: string
  title: string
  questions: QuizQuestion[]
  topicId: string
  difficulty: "beginner" | "intermediate" | "advanced"
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface StudentProgress {
  grade: number
  targetExam: string
  topicId: string
  completedResources: string[]
  quizScores: number[]
  averageScore: number
  lastAccessed: Date
}
