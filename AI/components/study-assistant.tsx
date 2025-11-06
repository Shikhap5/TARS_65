"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateStudyPlan, type Subject, type StudyPlanItem } from "@/lib/study-plan-generator"
import { rankResources, type Resource, type RankedResource } from "@/lib/resource-ranker"
import { BookOpen, Target, TrendingUp, Zap } from "lucide-react"

// Mock data
const MOCK_RESOURCES: Resource[] = [
  {
    id: "vid1",
    title: "Calculus Fundamentals - Complete Guide",
    type: "youtube",
    difficulty: "beginner",
    relevantTopics: ["calculus", "limits", "derivatives"],
    quality: 5,
    duration: 180,
    url: "#",
  },
  {
    id: "vid2",
    title: "Advanced Derivatives & Integration",
    type: "youtube",
    difficulty: "advanced",
    relevantTopics: ["calculus", "derivatives", "integration"],
    quality: 4,
    duration: 240,
    url: "#",
  },
  {
    id: "pdf1",
    title: "Calculus Past Papers 2020-2024",
    type: "past-paper",
    difficulty: "intermediate",
    relevantTopics: ["calculus", "derivatives", "integrals"],
    quality: 5,
    url: "#",
  },
  {
    id: "pdf2",
    title: "Linear Algebra Reference Guide",
    type: "pdf",
    difficulty: "intermediate",
    relevantTopics: ["linear algebra", "matrices", "vectors"],
    quality: 4,
    url: "#",
  },
  {
    id: "vid3",
    title: "Quantum Mechanics Basics",
    type: "youtube",
    difficulty: "intermediate",
    relevantTopics: ["quantum mechanics", "physics"],
    quality: 4,
    duration: 120,
    url: "#",
  },
  {
    id: "pp1",
    title: "Physics Mock Exams 2024",
    type: "past-paper",
    difficulty: "advanced",
    relevantTopics: ["quantum mechanics", "physics", "thermodynamics"],
    quality: 5,
    url: "#",
  },
]

export default function StudyAssistant() {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      name: "Calculus",
      weightage: 40,
      weakTopics: ["derivatives", "integrals"],
      currentLevel: "intermediate",
    },
    {
      name: "Linear Algebra",
      weightage: 30,
      weakTopics: ["eigenvalues", "matrix operations"],
      currentLevel: "intermediate",
    },
    {
      name: "Physics",
      weightage: 30,
      weakTopics: ["quantum mechanics"],
      currentLevel: "beginner",
    },
  ])

  const [studyPlan, setStudyPlan] = useState<StudyPlanItem[]>([])
  const [selectedTopic, setSelectedTopic] = useState<string>("")
  const [rankedResources, setRankedResources] = useState<RankedResource[]>([])
  const [userLevel, setUserLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate")

  const handleGeneratePlan = () => {
    const plan = generateStudyPlan(subjects)
    setStudyPlan(plan)
  }

  const handleRankResources = (topic: string) => {
    if (!topic) return
    setSelectedTopic(topic)
    const ranked = rankResources(MOCK_RESOURCES, topic, userLevel, "intermediate")
    setRankedResources(ranked)
  }

  const updateSubject = (index: number, field: keyof Subject, value: any) => {
    const updated = [...subjects]
    updated[index] = { ...updated[index], [field]: value }
    setSubjects(updated)
  }

  const addWeakTopic = (index: number, topic: string) => {
    if (!topic.trim()) return
    const updated = [...subjects]
    if (!updated[index].weakTopics.includes(topic)) {
      updated[index].weakTopics.push(topic)
    }
    setSubjects(updated)
  }

  const removeWeakTopic = (index: number, topic: string) => {
    const updated = [...subjects]
    updated[index].weakTopics = updated[index].weakTopics.filter((t) => t !== topic)
    setSubjects(updated)
  }

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return "bg-red-100 text-red-700"
    if (priority >= 6) return "bg-orange-100 text-orange-700"
    return "bg-blue-100 text-blue-700"
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-blue-600"
    return "text-slate-600"
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-900">Study Plan AI</h1>
          </div>
          <p className="text-lg text-slate-600">Personalized learning plans powered by intelligent resource ranking</p>
        </div>

        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger value="setup" className="flex gap-2">
              <Target className="w-4 h-4" />
              Setup
            </TabsTrigger>
            <TabsTrigger value="plan" className="flex gap-2">
              <BookOpen className="w-4 h-4" />
              Study Plan
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex gap-2">
              <TrendingUp className="w-4 h-4" />
              Resources
            </TabsTrigger>
          </TabsList>

          {/* Setup Tab */}
          <TabsContent value="setup" className="space-y-4">
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle>Configure Your Subjects</CardTitle>
                <CardDescription>Set subject weightages and identify weak areas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {subjects.map((subject, index) => (
                  <div key={index} className="border-b border-slate-200 pb-6 last:border-0">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Subject Name</label>
                        <Input
                          value={subject.name}
                          onChange={(e) => updateSubject(index, "name", e.target.value)}
                          placeholder="e.g., Calculus"
                          className="border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Weightage (%)</label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={subject.weightage}
                          onChange={(e) => updateSubject(index, "weightage", Number.parseInt(e.target.value))}
                          className="border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Current Level</label>
                        <Select
                          value={subject.currentLevel}
                          onValueChange={(value: any) => updateSubject(index, "currentLevel", value)}
                        >
                          <SelectTrigger className="border-slate-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Weak Topics</label>
                      <div className="flex gap-2 mb-3">
                        <Input
                          placeholder="Add weak topic..."
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              addWeakTopic(index, e.currentTarget.value)
                              e.currentTarget.value = ""
                            }
                          }}
                          className="border-slate-300"
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            const input = document.querySelector(
                              `input[placeholder="Add weak topic..."]`,
                            ) as HTMLInputElement
                            if (input) {
                              addWeakTopic(index, input.value)
                              input.value = ""
                            }
                          }}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {subject.weakTopics.map((topic) => (
                          <Badge
                            key={topic}
                            variant="secondary"
                            className="bg-slate-200 text-slate-700 cursor-pointer hover:bg-slate-300"
                            onClick={() => removeWeakTopic(index, topic)}
                          >
                            {topic} ✕
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  onClick={handleGeneratePlan}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Generate Study Plan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Plan Tab */}
          <TabsContent value="plan" className="space-y-4">
            {studyPlan.length > 0 ? (
              <div className="space-y-3">
                <Card className="bg-white border-slate-200">
                  <CardHeader>
                    <CardTitle>Your Personalized Study Plan</CardTitle>
                    <CardDescription>
                      {studyPlan.length} topics prioritized by importance and difficulty
                    </CardDescription>
                  </CardHeader>
                </Card>

                {studyPlan.map((item) => (
                  <Card key={item.id} className="bg-white border-slate-200 hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-slate-900">{item.topic}</h3>
                            <Badge className="bg-slate-100 text-slate-700">{item.subject}</Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{item.reason}</p>
                          <div className="flex items-center gap-6 text-sm text-slate-600">
                            <span>⏱️ {item.estimatedHours} hours</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRankResources(item.topic)}
                              className="border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                              Find Resources
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-slate-700 mb-1">Priority</div>
                          <Badge className={getPriorityColor(item.priority)}>{item.priority.toFixed(1)}/10</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white border-slate-200">
                <CardContent className="pt-12 pb-12 text-center">
                  <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">Generate a study plan from the Setup tab to get started</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            {selectedTopic ? (
              <div className="space-y-4">
                <Card className="bg-white border-slate-200">
                  <CardHeader>
                    <CardTitle>Top Resources for "{selectedTopic}"</CardTitle>
                    <CardDescription>
                      Ranked by relevance, difficulty match, and quality (Your level:{" "}
                      <Badge className="inline-block ml-1 bg-blue-100 text-blue-700">{userLevel}</Badge>)
                    </CardDescription>
                  </CardHeader>
                </Card>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Learning Level</label>
                  <Select
                    value={userLevel}
                    onValueChange={(value: any) => {
                      setUserLevel(value)
                      handleRankResources(selectedTopic)
                    }}
                  >
                    <SelectTrigger className="w-full border-slate-300 max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {rankedResources.length > 0 ? (
                  <div className="space-y-3">
                    {rankedResources.map((resource) => (
                      <Card key={resource.id} className="bg-white border-slate-200 hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-slate-900">{resource.title}</h3>
                                <Badge className="bg-blue-100 text-blue-700 capitalize">
                                  {resource.type === "past-paper" ? "Past Paper" : resource.type}
                                </Badge>
                                <Badge className="bg-slate-100 text-slate-700 capitalize">{resource.difficulty}</Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                                <span>★ {resource.quality}/5 Quality</span>
                                {resource.duration && <span>⏱️ {resource.duration} min</span>}
                              </div>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                Open Resource
                              </Button>
                            </div>
                            <div className="text-right">
                              <div className="mb-3">
                                <div className="text-xs font-medium text-slate-500 mb-1">Score</div>
                                <div className={`text-2xl font-bold ${getScoreColor(resource.finalScore)}`}>
                                  {resource.finalScore.toFixed(0)}
                                </div>
                                <div className="text-xs text-slate-500">/ 100</div>
                              </div>
                              <div className="text-xs text-slate-500">
                                <span className="block">#{resource.ranking} Ranked</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                            <p>
                              <strong>Relevance:</strong> +{resource.relevanceScore}
                            </p>
                            <p>
                              <strong>Difficulty Match:</strong> +{resource.difficultyMatch}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="bg-white border-slate-200">
                    <CardContent className="pt-12 pb-12 text-center">
                      <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-600">No resources found for this topic</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="bg-white border-slate-200">
                <CardContent className="pt-12 pb-12 text-center">
                  <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">Click "Find Resources" on a study plan item to rank resources</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
