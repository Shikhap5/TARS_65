"use client"

import { useState } from "react"
import { AuthContainer } from "@/components/auth-container"
import { StudentDashboard } from "@/components/student-dashboard"
import { AdminPanel } from "@/components/admin-panel"

type AuthState = "login" | "student-dashboard" | "admin-panel"

export default function Home() {
  const [authState, setAuthState] = useState<AuthState>("login")
  const [userRole, setUserRole] = useState<"student" | "admin" | null>(null)
  const [username, setUsername] = useState("")

  const handleAuthenticate = (role: "student" | "admin", name: string) => {
    setUserRole(role)
    setUsername(name)
    setAuthState(role === "student" ? "student-dashboard" : "admin-panel")
  }

  const handleLogout = () => {
    setAuthState("login")
    setUserRole(null)
    setUsername("")
  }

  return (
    <main>
      {authState === "login" && <AuthContainer onAuthenticate={handleAuthenticate} />}
      {authState === "student-dashboard" && <StudentDashboard username={username} onLogout={handleLogout} />}
      {authState === "admin-panel" && <AdminPanel username={username} onLogout={handleLogout} />}
    </main>
  )
}
