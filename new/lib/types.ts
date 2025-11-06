export type UserRole = "student" | "admin"

export interface Exam {
  id: string
  name: string
  grade: string
  description: string
  subjects: string[]
}

export interface Subject {
  id: string
  name: string
  weightage: number
  weakTopics: string[]
}

export interface Resource {
  id: string
  title: string
  type: "video" | "pdf" | "practice"
  subject: string
  difficulty: "easy" | "medium" | "hard"
  topics: string[]
  url?: string
  description: string
  duration?: string
}

export interface StudyPlan {
  week: number
  subjects: {
    subject: string
    resources: Resource[]
    topics: string[]
    priority: "high" | "medium" | "low"
  }[]
  totalHours: number
}

export interface StudentProfile {
  studentId: string
  selectedExam: string
  weakTopics: string[]
  completedResources: string[]
  studyPlan: StudyPlan[]
}

export interface AuthState {
  role: UserRole | null
  isAuthenticated: boolean
  username: string
}
