"use client"

import { createContext, type ReactNode, useState, useCallback } from "react"
import type { Resource, Subject } from "./types"
import { MOCK_RESOURCES, EXAM_SUBJECTS } from "./mock-data"

interface LearningContextType {
  resources: Resource[]
  subjects: Record<string, Subject[]>
  addResource: (resource: Resource) => void
  deleteResource: (resourceId: string) => void
  updateResource: (resourceId: string, updates: Partial<Resource>) => void
  getResourcesBySubject: (subjectId: string) => Resource[]
  getSubjectsForExam: (examType: string) => Subject[]
}

export const LearningContext = createContext<LearningContextType | null>(null)

export function LearningProvider({ children }: { children: ReactNode }) {
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES)

  const addResource = useCallback((resource: Resource) => {
    setResources((prev) => [...prev, resource])
  }, [])

  const deleteResource = useCallback((resourceId: string) => {
    setResources((prev) => prev.filter((r) => r.id !== resourceId))
  }, [])

  const updateResource = useCallback((resourceId: string, updates: Partial<Resource>) => {
    setResources((prev) => prev.map((r) => (r.id === resourceId ? { ...r, ...updates } : r)))
  }, [])

  const getResourcesBySubject = useCallback(
    (subjectId: string) => resources.filter((r) => r.subjectId === subjectId),
    [resources],
  )

  const getSubjectsForExam = useCallback((examType: string) => {
    return EXAM_SUBJECTS[examType as keyof typeof EXAM_SUBJECTS] || []
  }, [])

  return (
    <LearningContext.Provider
      value={{
        resources,
        subjects: EXAM_SUBJECTS,
        addResource,
        deleteResource,
        updateResource,
        getResourcesBySubject,
        getSubjectsForExam,
      }}
    >
      {children}
    </LearningContext.Provider>
  )
}

export function useLearning() {
  const context = useContext(LearningContext)
  if (!context) {
    throw new Error("useLearning must be used within LearningProvider")
  }
  return context
}

import { useContext } from "react"
