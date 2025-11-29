"use client"

import { useState, useContext } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LearningContext } from "@/lib/db-context"
import { useAuth } from "@/hooks/use-auth"
import type { QuizQuestion } from "@/lib/types"
import { Sparkles, Award } from "lucide-react"

interface StudyPlanItem {
  subjectId: string
  subjectName: string
  hoursPerWeek: number
  priority: "high" | "medium" | "low"
  focusAreas: string[]
}

export function AIAssistantPanel() {
  const context = useContext(LearningContext)
  const { session } = useAuth()
  const [activeTab, setActiveTab] = useState("plan")
  const [weakAreas, setWeakAreas] = useState<string[]>(["Quadratic Equations", "Organic Chemistry"])
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizScore, setQuizScore] = useState<number | null>(null)

  if (!context || !session?.targetExam) {
    return null
  }

  const { getSubjectsForExam, getResourcesBySubject } = context
  const subjects = getSubjectsForExam(session.targetExam)

  // Generate personalized study plan
  const studyPlan: StudyPlanItem[] = subjects.slice(0, 3).map((subject) => ({
    subjectId: subject.id,
    subjectName: subject.name,
    hoursPerWeek: subject.weightage * 0.4,
    priority: subject.weightage > 30 ? "high" : "medium",
    focusAreas: ["Topic 1", "Topic 2", "Topic 3"].slice(0, 2),
  }))

  // Generate mock quiz questions based on weak areas
  const quizQuestions: QuizQuestion[] = [
    {
      id: "q1",
      text: "What is the sum of roots of the equation x² - 5x + 6 = 0?",
      options: ["1", "5", "6", "-5"],
      correctAnswer: 1,
      difficulty: "easy",
    },
    {
      id: "q2",
      text: "Find the nature of roots for x² - 4x + 4 = 0",
      options: ["Two distinct real roots", "Two equal real roots", "Complex roots", "No real roots"],
      correctAnswer: 1,
      difficulty: "medium",
    },
    {
      id: "q3",
      text: "Solve: 2x² + 3x - 2 = 0",
      options: ["x = 1/2 or x = -2", "x = -1/2 or x = 2", "x = 2 or x = -1", "No solution"],
      correctAnswer: 0,
      difficulty: "medium",
    },
  ]

  // Rank resources by relevance to weak areas
  const rankedResources = context.resources
    .filter((r) => weakAreas.some((area) => r.topic.toLowerCase().includes(area.toLowerCase())))
    .sort((a, b) => {
      if (a.difficulty === "easy") return -1
      if (b.difficulty === "easy") return 1
      return 0
    })
    .slice(0, 5)

  const handleQuizAnswer = (answerIndex: number) => {
    const currentQuestion = quizQuestions[currentQuestionIndex]
    if (answerIndex === currentQuestion.correctAnswer) {
      // Correct answer
      if (currentQuestionIndex === quizQuestions.length - 1) {
        setQuizScore((quizScore || 0) + 1)
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }
    } else {
      // Wrong answer
      if (currentQuestionIndex === quizQuestions.length - 1) {
        setQuizScore(quizScore || 0)
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle>AI Learning Assistant</CardTitle>
              <CardDescription>Personalized recommendations based on your learning patterns</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="plan">Study Plan</TabsTrigger>
              <TabsTrigger value="resources">Ranked Resources</TabsTrigger>
              <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
            </TabsList>

            {/* Study Plan Tab */}
            <TabsContent value="plan" className="space-y-4 mt-4">
              <div className="space-y-4">
                {studyPlan.map((item) => (
                  <Card key={item.subjectId} className="border">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{item.subjectName}</CardTitle>
                          <CardDescription>{item.hoursPerWeek.toFixed(1)} hours/week</CardDescription>
                        </div>
                        <Badge
                          variant={
                            item.priority === "high" ? "default" : item.priority === "medium" ? "secondary" : "outline"
                          }
                        >
                          {item.priority}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <p className="text-muted-foreground mb-2">Focus on:</p>
                        <div className="flex flex-wrap gap-2">
                          {item.focusAreas.map((area) => (
                            <Badge key={area} variant="outline">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Ranked Resources Tab */}
            <TabsContent value="resources" className="space-y-4 mt-4">
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm text-muted-foreground">Based on your weak areas: {weakAreas.join(", ")}</p>
              </div>
              <div className="space-y-3">
                {rankedResources.length > 0 ? (
                  rankedResources.map((resource, index) => (
                    <Card key={resource.id} className="border">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                Rank #{index + 1}
                              </Badge>
                              <Badge className="text-xs capitalize bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {resource.difficulty}
                              </Badge>
                            </div>
                            <p className="font-semibold text-sm">{resource.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{resource.topic}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Study
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground text-sm py-4">
                    No resources found for your weak areas
                  </p>
                )}
              </div>
            </TabsContent>

            {/* Quiz Tab */}
            <TabsContent value="quiz" className="space-y-4 mt-4">
              {quizScore === null ? (
                <div className="space-y-4">
                  <Card className="border-0 bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Question</p>
                          <p className="text-2xl font-bold">
                            {currentQuestionIndex + 1}/{quizQuestions.length}
                          </p>
                        </div>
                        <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Progress</p>
                            <p className="text-2xl font-bold">
                              {Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardContent className="pt-6 space-y-4">
                      <p className="font-semibold text-base">{quizQuestions[currentQuestionIndex].text}</p>
                      <div className="space-y-2">
                        {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start text-left h-auto p-3 bg-transparent"
                            onClick={() => handleQuizAnswer(index)}
                          >
                            <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                            {option}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                  <CardContent className="pt-8 text-center space-y-4">
                    <Award className="w-16 h-16 mx-auto text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-2xl font-bold">Quiz Complete!</p>
                      <p className="text-lg text-muted-foreground mt-2">
                        Score: {quizScore}/{quizQuestions.length}
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        setQuizScore(null)
                        setCurrentQuestionIndex(0)
                      }}
                    >
                      Retake Quiz
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
