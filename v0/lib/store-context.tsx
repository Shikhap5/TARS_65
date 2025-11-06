"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface StudySession {
  id: string
  grade: string
  topic: string
  startedAt: Date
  completedAt?: Date
  score?: number
  totalQuestions?: number
}

export interface StudentProgress {
  grade: string
  studySessions: StudySession[]
  topicsCovered: Map<string, number>
  averageScore: number
  currentStreak: number
}

interface StoreContextType {
  progress: StudentProgress
  addStudySession: (session: StudySession) => void
  updateStudySession: (id: string, updates: Partial<StudySession>) => void
  getStudyStats: () => { totalSessions: number; averageScore: number; streak: number }
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<StudentProgress>({
    grade: "",
    studySessions: [],
    topicsCovered: new Map(),
    averageScore: 0,
    currentStreak: 5,
  })

  const addStudySession = (session: StudySession) => {
    const updatedSessions = [...progress.studySessions, session]
    const averageScore =
      updatedSessions.length > 0
        ? Math.round(
            updatedSessions.reduce((sum, s) => sum + (s.score || 0), 0) /
              updatedSessions.filter((s) => s.score !== undefined).length,
          )
        : 0

    setProgress({
      ...progress,
      studySessions: updatedSessions,
      averageScore,
    })
  }

  const updateStudySession = (id: string, updates: Partial<StudySession>) => {
    const updatedSessions = progress.studySessions.map((s) => (s.id === id ? { ...s, ...updates } : s))
    setProgress({
      ...progress,
      studySessions: updatedSessions,
    })
  }

  const getStudyStats = () => ({
    totalSessions: progress.studySessions.length,
    averageScore: progress.averageScore,
    streak: progress.currentStreak,
  })

  return (
    <StoreContext.Provider value={{ progress, addStudySession, updateStudySession, getStudyStats }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within StoreProvider")
  }
  return context
}
