"use client"

import { useState } from "react"
import { StudentApp } from "@/components/student-app"
import { AdminApp } from "@/components/admin-app"

export default function Home() {
  const [mode, setMode] = useState<"student" | "admin">("student")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">LearnPlan</h1>
            <p className="text-sm text-muted-foreground">Personalized Learning & Exam Planner</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode("student")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                mode === "student"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setMode("admin")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                mode === "admin"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">{mode === "student" ? <StudentApp /> : <AdminApp />}</main>
    </div>
  )
}
