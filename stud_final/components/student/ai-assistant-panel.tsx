"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { generatePersonalizedStudyPlan, rankResources, generateQuizForWeakAreas } from "@/lib/ai-utils"
import { mockSubjects, mockResources } from "@/lib/mock-data"

interface AIAssistantPanelProps {
  studentGrade: number
  targetExam: string
}

export default function AIAssistantPanel({ studentGrade, targetExam }: AIAssistantPanelProps) {
  const [activeTab, setActiveTab] = useState<"recommendations" | "resources" | "quizzes">("recommendations")
  const [weakAreas, setWeakAreas] = useState<string[]>(["Algebra", "Optics"])
  const [newWeakArea, setNewWeakArea] = useState("")

  const recommendations = useMemo(() => {
    const subjects = mockSubjects.filter((s) => s.examType === targetExam)
    return generatePersonalizedStudyPlan(studentGrade, targetExam, weakAreas, subjects)
  }, [studentGrade, targetExam, weakAreas])

  const rankedResources = useMemo(() => {
    const subjects = mockSubjects.filter((s) => s.examType === targetExam)
    const relevantResources = mockResources.filter((r) => subjects.some((s) => s.id === r.subjectId))
    const ranked = rankResources(relevantResources, studentGrade, targetExam, weakAreas, subjects)
    return ranked.slice(0, 5).map((r, idx) => ({
      ...r,
      rank: idx + 1,
      reason: `Ranked #${idx + 1} based on exam weightage, difficulty match, and weak area focus`,
    }))
  }, [studentGrade, targetExam, weakAreas])

  const quizzes = useMemo(() => {
    return generateQuizForWeakAreas(weakAreas, studentGrade < 10 ? "beginner" : "intermediate").map((q, idx) => ({
      id: q.id,
      title: q.title,
      questions: q.focusAreas.length,
      difficulty: q.difficulty,
      score: null,
    }))
  }, [studentGrade, weakAreas])

  const handleAddWeakArea = () => {
    if (newWeakArea.trim() && !weakAreas.includes(newWeakArea)) {
      setWeakAreas([...weakAreas, newWeakArea])
      setNewWeakArea("")
    }
  }

  const handleRemoveWeakArea = (area: string) => {
    setWeakAreas(weakAreas.filter((a) => a !== area))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <CardTitle>AI Study Assistant</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Personalized learning recommendations for Grade {studentGrade} - {targetExam}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-background rounded-lg p-4 border border-border">
            <p className="text-sm font-semibold mb-3">Weak Areas (helps AI prioritize)</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {weakAreas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {area}
                  <button onClick={() => handleRemoveWeakArea(area)} className="font-bold hover:opacity-70">
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add weak area (e.g., Algebra, Organic Chemistry)"
                value={newWeakArea}
                onChange={(e) => setNewWeakArea(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddWeakArea()}
                className="flex-1 px-3 py-2 rounded border border-border bg-background text-sm"
              />
              <Button onClick={handleAddWeakArea} size="sm" className="whitespace-nowrap">
                Add
              </Button>
            </div>
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => setActiveTab("recommendations")}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === "recommendations"
                  ? "text-primary border-b-2 border-primary -mb-px"
                  : "text-muted-foreground"
              }`}
            >
              💡 Study Plan
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === "resources" ? "text-primary border-b-2 border-primary -mb-px" : "text-muted-foreground"
              }`}
            >
              📊 Ranked Resources
            </button>
            <button
              onClick={() => setActiveTab("quizzes")}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === "quizzes" ? "text-primary border-b-2 border-primary -mb-px" : "text-muted-foreground"
              }`}
            >
              ❓ Smart Quizzes
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {activeTab === "recommendations" && (
              <>
                {recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition"
                  >
                    <div className="flex gap-3">
                      <span className="text-lg flex-shrink-0">
                        {idx === 0 ? "🎯" : idx === 1 ? "⚡" : idx === recommendations.length - 1 ? "📅" : "💡"}
                      </span>
                      <p className="text-sm leading-relaxed">{rec}</p>
                    </div>
                  </div>
                ))}
                <Button onClick={() => window.location.reload()} className="w-full bg-transparent" variant="outline">
                  Regenerate Study Plan
                </Button>
              </>
            )}

            {activeTab === "resources" && (
              <div className="space-y-3">
                {rankedResources.map((resource, idx) => (
                  <div
                    key={resource.id}
                    className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span className="font-bold text-lg text-primary min-w-fit">#{resource.rank}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{resource.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{resource.reason}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium">
                            {resource.type === "video" ? "🎥 Video" : resource.type === "note" ? "📄 Note" : "📝 Paper"}
                          </span>
                          <span className="text-xs text-muted-foreground capitalize">{resource.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "quizzes" && (
              <div className="space-y-3">
                {quizzes.length > 0 ? (
                  quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{quiz.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {quiz.questions} questions • {quiz.difficulty}
                        </p>
                      </div>
                      <Button size="sm" className="ml-4">
                        Start
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Add weak areas to generate targeted quizzes</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
