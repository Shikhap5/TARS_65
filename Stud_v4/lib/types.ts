export type UserRole = "student" | "admin"
export type ExamType = "CBSE" | "ICSE" | "JEE" | "NEET" | "SAT" | "IB" | "Olympiad"
export type ResourceType = "video" | "pdf" | "question" | "quiz"
export type DifficultyLevel = "easy" | "medium" | "hard"

export interface User {
  id: string
  username: string
  password: string
  role: UserRole
  grade?: number // 1-12 for students
  targetExam?: ExamType
  createdAt: Date
}

export interface Subject {
  id: string
  name: string
  grade: number
  examType: ExamType
  weightage: number
  totalQuestions?: number
}

export interface Resource {
  id: string
  type: ResourceType
  title: string
  subjectId: string
  topic: string
  difficulty: DifficultyLevel
  url?: string
  content?: string
  fileUrl?: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface StudyPlan {
  id: string
  studentId: string
  subjects: PlanSubject[]
  weeklyHours: number
  targetDate: Date
  createdAt: Date
}

export interface PlanSubject {
  subjectId: string
  hoursPerWeek: number
  priority: "high" | "medium" | "low"
  focusAreas: string[]
}

export interface Quiz {
  id: string
  studentId: string
  subjectId: string
  questions: QuizQuestion[]
  score?: number
  completedAt?: Date
}

export interface QuizQuestion {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  studentAnswer?: number
  difficulty: DifficultyLevel
}

export interface Session {
  userId: string
  role: UserRole
  username: string
  grade?: number
  targetExam?: ExamType
}
