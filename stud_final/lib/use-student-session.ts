"use client"

import { useState, useEffect } from "react"
import type { StudentSession } from "./types"

export function useStudentSession() {
  const [session, setSession] = useState<StudentSession | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("studentSession")
    if (stored) {
      setSession(JSON.parse(stored))
    }
    setIsLoaded(true)
  }, [])

  const updateSession = (newSession: StudentSession) => {
    setSession(newSession)
    localStorage.setItem("studentSession", JSON.stringify(newSession))
  }

  const clearSession = () => {
    setSession(null)
    localStorage.removeItem("studentSession")
  }

  return { session, isLoaded, updateSession, clearSession }
}
