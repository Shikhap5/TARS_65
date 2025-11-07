"use client"

import { useEffect, useState } from "react"
import { LoginPage } from "@/components/login-page"
import { StudentOnboarding } from "@/components/student-onboarding"
import { StudentDashboard } from "@/components/student-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"
import { AIAssistantPanel } from "@/components/ai-assistant-panel"
import { useAuth } from "@/hooks/use-auth"
import { LearningProvider } from "@/lib/db-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type AppState = "login" | "onboarding" | "student-dashboard" | "admin-dashboard"

function AppContent() {
  const { session, isLoading, isAuthenticated, isStudent, isAdmin, logout } = useAuth()
  const [appState, setAppState] = useState<AppState>("login")
  const [showAIPanel, setShowAIPanel] = useState(false)

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      setAppState("login")
    } else if (isStudent && !session?.targetExam) {
      setAppState("onboarding")
    } else if (isStudent) {
      setAppState("student-dashboard")
    } else if (isAdmin) {
      setAppState("admin-dashboard")
    }
  }, [isAuthenticated, isStudent, isAdmin, session?.targetExam, isLoading])

  const handleLogin = () => {
    if (isStudent && !session?.targetExam) {
      setAppState("onboarding")
    } else if (isStudent) {
      setAppState("student-dashboard")
    } else if (isAdmin) {
      setAppState("admin-dashboard")
    }
  }

  const handleLogout = () => {
    setShowAIPanel(false)
    logout()
    setAppState("login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {appState === "login" && <LoginPage onLoginSuccess={handleLogin} />}

      {appState === "onboarding" && <StudentOnboarding onComplete={() => setAppState("student-dashboard")} />}

      {appState === "student-dashboard" && (
        <>
          <StudentDashboard onLogout={handleLogout} onOpenAI={() => setShowAIPanel(true)} />
          <Dialog open={showAIPanel} onOpenChange={setShowAIPanel}>
            <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
              <DialogHeader>
                <DialogTitle>AI Learning Assistant</DialogTitle>
              </DialogHeader>
              <AIAssistantPanel />
            </DialogContent>
          </Dialog>
        </>
      )}

      {appState === "admin-dashboard" && <AdminDashboard onLogout={handleLogout} />}
    </>
  )
}

export default function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <LearningProvider>
      <AppContent />
    </LearningProvider>
  )
}
