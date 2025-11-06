"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { StudyPlanGenerator } from "./study-plan-generator"
import { QuizSystem } from "./quiz-system"
import { useStore } from "@/lib/store-context"

interface StudentDashboardProps {
  grade: string
  onChangeGrade: () => void
}

export function StudentDashboard({ grade, onChangeGrade }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "study-plan" | "quiz">("overview")
  const { getStudyStats } = useStore()
  const stats = getStudyStats()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Grade {grade} Dashboard</h2>
          <p className="text-muted-foreground">Your personalized learning journey</p>
        </div>
        <button
          onClick={onChangeGrade}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-muted transition-colors"
        >
          Change Grade
        </button>
      </div>

      <div className="flex gap-2 border-b border-border">
        {["overview", "study-plan", "quiz"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "overview" && "Overview"}
            {tab === "study-plan" && "Study Plan"}
            {tab === "quiz" && "Quiz"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <h3 className="font-bold text-foreground mb-2">Study Streak</h3>
            <p className="text-3xl font-bold text-primary">{stats.streak} days</p>
            <p className="text-sm text-muted-foreground">Keep it going!</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-bold text-foreground mb-2">Total Sessions</h3>
            <p className="text-3xl font-bold text-accent">{stats.totalSessions}</p>
            <p className="text-sm text-muted-foreground">Study sessions completed</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-bold text-foreground mb-2">Quiz Average</h3>
            <p className="text-3xl font-bold text-primary">{stats.averageScore}%</p>
            <p className="text-sm text-muted-foreground">Great progress!</p>
          </Card>
        </div>
      )}

      {activeTab === "study-plan" && <StudyPlanGenerator grade={grade} />}
      {activeTab === "quiz" && <QuizSystem grade={grade} />}
    </div>
  )
}
