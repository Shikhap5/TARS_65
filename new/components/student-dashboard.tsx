"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { exams, resources, examWeightages } from "@/lib/data"
import { generateStudyPlan, rankResources } from "@/lib/ai-heuristics"

interface StudentDashboardProps {
  username: string
  onLogout: () => void
}

export function StudentDashboard({ username, onLogout }: StudentDashboardProps) {
  const [selectedExam, setSelectedExam] = useState<string | null>(null)
  const [weakTopics, setWeakTopics] = useState<string[]>([])
  const [completedResources, setCompletedResources] = useState<string[]>([])
  const [showExamSelector, setShowExamSelector] = useState(true)

  const currentExam = useMemo(() => exams.find((e) => e.id === selectedExam), [selectedExam])
  const currentWeightages = useMemo(() => examWeightages[selectedExam || ""] || [], [selectedExam])
  const studyPlan = useMemo(
    () => (selectedExam ? generateStudyPlan(selectedExam, currentWeightages, weakTopics, resources) : []),
    [selectedExam, currentWeightages, weakTopics],
  )

  const filteredResources = useMemo(() => {
    if (!selectedExam) return []
    const subjectNames = currentExam?.subjects || []
    const subjectResources = resources.filter((r) => subjectNames.includes(r.subject))
    return rankResources(subjectResources, weakTopics)
  }, [selectedExam, currentExam?.subjects, weakTopics])

  const toggleWeakTopic = (topic: string) => {
    setWeakTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
  }

  const toggleResource = (resourceId: string) => {
    setCompletedResources((prev) =>
      prev.includes(resourceId) ? prev.filter((id) => id !== resourceId) : [...prev, resourceId],
    )
  }

  if (showExamSelector && !selectedExam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100">Welcome, {username}!</h1>
              <p className="text-muted-foreground mt-2">Select your exam to get started</p>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map((exam) => (
              <Card
                key={exam.id}
                className="cursor-pointer hover:shadow-lg transition-shadow hover:border-blue-300"
                onClick={() => {
                  setSelectedExam(exam.id)
                  setShowExamSelector(false)
                }}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{exam.name}</CardTitle>
                  <CardDescription>{exam.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {exam.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100">StudyHub</h1>
            <p className="text-muted-foreground">
              {currentExam?.name} • {username}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedExam(null)
                setShowExamSelector(true)
              }}
            >
              Change Exam
            </Button>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="resources" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="weak-topics">Weak Topics</TabsTrigger>
            <TabsTrigger value="study-plan">Study Plan</TabsTrigger>
          </TabsList>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Curated Learning Resources</CardTitle>
                <CardDescription>
                  {filteredResources.length} resources available for {currentExam?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredResources.map((resource) => (
                    <Card key={resource.id} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{resource.title}</h3>
                              <Badge className="capitalize bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                {resource.type}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={
                                  resource.difficulty === "easy"
                                    ? "text-green-600"
                                    : resource.difficulty === "medium"
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                }
                              >
                                {resource.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {resource.topics.map((topic) => (
                                <Badge key={topic} variant="secondary" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button
                            onClick={() => toggleResource(resource.id)}
                            className={
                              completedResources.includes(resource.id) ? "bg-green-600 hover:bg-green-700" : ""
                            }
                          >
                            {completedResources.includes(resource.id) ? "✓ Done" : "Mark Done"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Weak Topics Tab */}
          <TabsContent value="weak-topics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Identify Your Weak Topics</CardTitle>
                <CardDescription>
                  Select topics where you need more practice. These will be prioritized in your study plan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentWeightages.map((subject) => {
                    const subjectTopics = Array.from(
                      new Set(resources.filter((r) => r.subject === subject.name).flatMap((r) => r.topics)),
                    )
                    return (
                      <div key={subject.id}>
                        <h3 className="font-semibold mb-3 text-lg text-blue-900 dark:text-blue-100">
                          {subject.name} ({subject.weightage}%)
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {subjectTopics.map((topic) => (
                            <Badge
                              key={topic}
                              onClick={() => toggleWeakTopic(topic)}
                              className="cursor-pointer transition-all"
                              variant={weakTopics.includes(topic) ? "default" : "outline"}
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Plan Tab */}
          <TabsContent value="study-plan" className="space-y-6">
            {studyPlan.length > 0 ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Personalized 8-Week Study Plan</CardTitle>
                    <CardDescription>Based on exam weightages and your weak topics</CardDescription>
                  </CardHeader>
                </Card>

                {studyPlan.map((week) => (
                  <Card key={week.week}>
                    <CardHeader>
                      <CardTitle className="text-lg">Week {week.week}</CardTitle>
                      <CardDescription>Estimated study time: {week.totalHours} hours</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {week.subjects.map((subjectPlan, idx) => (
                          <div key={idx} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">{subjectPlan.subject}</h4>
                              <Badge
                                className={
                                  subjectPlan.priority === "high"
                                    ? "bg-red-100 text-red-800 dark:bg-red-900"
                                    : subjectPlan.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900"
                                      : "bg-green-100 text-green-800 dark:bg-green-900"
                                }
                              >
                                {subjectPlan.priority.toUpperCase()} Priority
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              {subjectPlan.resources.map((res) => (
                                <div key={res.id} className="text-sm flex items-start gap-2">
                                  <span className="text-blue-600 dark:text-blue-400">•</span>
                                  <span>{res.title}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">Select weak topics to generate your personalized study plan</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
