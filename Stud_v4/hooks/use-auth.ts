"use client"

import { useState, useCallback, useEffect } from "react"
import type { Session } from "@/lib/types"
import { MOCK_USERS } from "@/lib/mock-data"

const SESSION_KEY = "learning_app_session"

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY)
    if (stored) {
      setSession(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  const login = useCallback((username: string, password: string) => {
    const user = MOCK_USERS.find((u) => u.username === username && u.password === password)

    if (!user) {
      return { success: false, error: "Invalid credentials" }
    }

    const newSession: Session = {
      userId: user.id,
      role: user.role,
      username: user.username,
      grade: user.grade,
      targetExam: user.targetExam,
    }

    setSession(newSession)
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession))
    return { success: true }
  }, [])

  const updateSession = useCallback(
    (updates: Partial<Session>) => {
      const updated = { ...session, ...updates } as Session
      setSession(updated)
      localStorage.setItem(SESSION_KEY, JSON.stringify(updated))
    },
    [session],
  )

  const logout = useCallback(() => {
    setSession(null)
    localStorage.removeItem(SESSION_KEY)
  }, [])

  return {
    session,
    isLoading,
    isAuthenticated: !!session,
    isStudent: session?.role === "student",
    isAdmin: session?.role === "admin",
    login,
    updateSession,
    logout,
  }
}
