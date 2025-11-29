"use client"

import { useState, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import { LearningContext } from "@/lib/db-context"
import { SubjectSection } from "./subject-section"
import { LogOut, Search, Settings } from "lucide-react"
import type { DifficultyLevel } from "@/lib/types"

interface StudentDashboardProps {
  onLogout: () => void
  onOpenAI?: () => void
}

export function StudentDashboard({ onLogout, onOpenAI }: StudentDashboardProps) {
  const { session } = useAuth()
  const context = useContext(LearningContext)
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | "all">("all")

  if (!context || !session?.targetExam) {
    return <div>Loading...</div>
  }

  const { getSubjectsForExam, getResourcesBySubject } = context
  const subjects = getSubjectsForExam(session.targetExam)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Grade {session.grade} • {session.targetExam} Preparation
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onOpenAI} className="gap-2 bg-transparent">
              <Settings className="w-4 h-4" />
              AI Assistant
            </Button>
            <Button variant="destructive" size="sm" onClick={onLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Resources</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by topic or title..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty Level</label>
                <Select value={difficultyFilter} onValueChange={(val) => setDifficultyFilter(val as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Info</label>
                <div className="flex items-center h-10 text-sm text-muted-foreground">
                  {subjects.length} subjects • {context.resources.length} resources
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subjects and Resources */}
        <div className="space-y-6">
          {subjects.map((subject) => {
            let subjectResources = getResourcesBySubject(subject.id)

            if (searchQuery) {
              subjectResources = subjectResources.filter(
                (r) => r.title.toLowerCase().includes(searchQuery) || r.topic.toLowerCase().includes(searchQuery),
              )
            }

            if (difficultyFilter !== "all") {
              subjectResources = subjectResources.filter((r) => r.difficulty === difficultyFilter)
            }

            return <SubjectSection key={subject.id} subject={subject} resources={subjectResources} />
          })}
        </div>
      </main>
    </div>
  )
}
