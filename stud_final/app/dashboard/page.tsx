"use client"

import { useStudentSession } from "@/lib/use-student-session"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { mockSubjects } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SubjectCard from "@/components/student/subject-card"
import AIAssistantPanel from "@/components/student/ai-assistant-panel"
import ExamWeightageView from "@/components/student/exam-weightage-view"

export default function DashboardPage() {
  const { session, isLoaded, clearSession } = useStudentSession()
  const router = useRouter()
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    )
  }

  if (!session) {
    router.push("/")
    return null
  }

  const subjects = mockSubjects.filter((s) => s.examType === session.targetExam)

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Learning Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Grade {session.grade} • {session.targetExam}
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setSelectedSubject(null)}>
              Start Over
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                clearSession()
                router.push("/")
              }}
            >
              Change Selection
            </Button>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        {/* User Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <span className="text-3xl">📚</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Grade</p>
                  <p className="text-2xl font-bold">Grade {session.grade}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <span className="text-3xl">🎯</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Target Exam</p>
                  <p className="text-2xl font-bold">{session.targetExam}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-chart-1">
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Subjects Available</p>
                <p className="text-2xl font-bold">{subjects.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exam Weightage */}
        <div className="mb-8">
          <ExamWeightageView subjects={subjects} />
        </div>

        {/* Subjects */}
        {!selectedSubject && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Available Subjects</h2>
            <div className="grid grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  isSelected={false}
                  onSelect={() => setSelectedSubject(subject.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Subject Resources */}
        {selectedSubject && (
          <div className="space-y-8">
            <Button onClick={() => setSelectedSubject(null)} variant="outline">
              ← Back to Subjects
            </Button>
            <AIAssistantPanel studentGrade={session.grade} targetExam={session.targetExam} />
            <SubjectResourcesPanel subjectId={selectedSubject} />
          </div>
        )}
      </div>
    </main>
  )
}

function SubjectResourcesPanel({ subjectId }: { subjectId: string }) {
  const subject = mockSubjects.find((s) => s.id === subjectId)
  if (!subject) return null

  return (
    <div className="space-y-6">
      <ResourcesGrid subject={subject} />
    </div>
  )
}

function ResourcesGrid({ subject }: { subject: (typeof mockSubjects)[0] }) {
  const { mockResources } = require("@/lib/mock-data")
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<string | null>(null)

  const subjectResources = mockResources.filter((r: any) => r.subjectId === subject.id)
  const filteredResources = subjectResources.filter((r: any) => {
    if (difficultyFilter && r.difficulty !== difficultyFilter) return false
    if (typeFilter && r.type !== typeFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-6">
            <div>
              <p className="text-sm font-medium mb-3">Difficulty Level:</p>
              <div className="flex gap-2 flex-wrap">
                {["all", "beginner", "intermediate", "advanced"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficultyFilter(level === "all" ? null : level)}
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      (level === "all" && !difficultyFilter) || difficultyFilter === level
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Resource Type:</p>
              <div className="flex gap-2 flex-wrap">
                {["all", "video", "note", "paper"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type === "all" ? null : type)}
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      (type === "all" && !typeFilter) || typeFilter === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredResources.map((resource: any) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No resources found with the selected filters</p>
        </div>
      )}
    </div>
  )
}

function ResourceCard({ resource }: { resource: any }) {
  const typeIcons: Record<string, string> = {
    video: "🎥",
    note: "📄",
    paper: "📝",
  }

  const difficultyColors: Record<string, string> = {
    beginner: "text-green-600",
    intermediate: "text-yellow-600",
    advanced: "text-red-600",
  }

  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      {resource.thumbnail && (
        <div className="h-40 bg-secondary overflow-hidden rounded-t-lg">
          <img
            src={resource.thumbnail || "/placeholder.svg"}
            alt={resource.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="pt-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-sm line-clamp-2">{resource.title}</h3>
          <span className="text-2xl ml-2 flex-shrink-0">{typeIcons[resource.type]}</span>
        </div>
        <p className="text-xs text-muted-foreground mb-4 flex-1">{resource.description}</p>
        <div className="flex items-center justify-between pt-4 border-t">
          <span className={`text-xs font-semibold ${difficultyColors[resource.difficulty]}`}>
            {resource.difficulty.toUpperCase()}
          </span>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-primary hover:underline"
          >
            Open →
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
