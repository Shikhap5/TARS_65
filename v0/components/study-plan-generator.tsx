"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface StudyPlanGeneratorProps {
  grade: string
}

const STUDY_TOPICS = {
  "6": ["Basic Math", "English Grammar", "Science Basics", "Geography", "History"],
  "7": ["Algebra", "Advanced Grammar", "Physics Basics", "World Capitals", "Ancient Civilizations"],
  "8": ["Geometry", "Literature", "Chemistry Basics", "Modern History", "Geography Advanced"],
  "9": ["Algebra Advanced", "Critical Reading", "Biology", "World Wars", "Economics"],
  "10": ["Trigonometry", "Shakespeare", "Organic Chemistry", "Modern Era", "Calculus Intro"],
  "11": ["Calculus", "American Literature", "Advanced Chemistry", "Government", "Physics Advanced"],
  "12": ["Advanced Calculus", "Comparative Literature", "Quantum Physics", "World Politics", "Advanced Biology"],
}

export function StudyPlanGenerator({ grade }: StudyPlanGeneratorProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [generatedPlan, setGeneratedPlan] = useState<any>(null)

  const topics = STUDY_TOPICS[grade as keyof typeof STUDY_TOPICS] || []

  const generatePlan = (topic: string) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const dailyPlan = daysOfWeek.map((day, idx) => ({
      day,
      focus: idx % 2 === 0 ? "Theory & Concepts" : "Practice & Examples",
      duration: idx % 3 === 0 ? "45 mins" : "60 mins",
      activities: [
        "Review previous day notes",
        idx % 2 === 0 ? "Watch educational videos" : "Solve practice problems",
        "Create summary notes",
        "Quiz yourself",
      ],
    }))

    setGeneratedPlan({
      topic,
      difficulty: Math.random() > 0.5 ? "Beginner" : Math.random() > 0.5 ? "Intermediate" : "Advanced",
      estimatedTime: Math.floor(Math.random() * 3) + 2,
      weekPlan: dailyPlan,
    })
  }

  return (
    <div className="space-y-6">
      {!generatedPlan ? (
        <div>
          <h3 className="text-lg font-bold text-foreground mb-4">Select a Topic</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setSelectedTopic(topic)
                  generatePlan(topic)
                }}
                className="text-left"
              >
                <Card className="p-4 hover:bg-secondary cursor-pointer transition-all border-2 border-transparent hover:border-primary">
                  <p className="font-semibold text-foreground">{topic}</p>
                  <p className="text-sm text-muted-foreground">Generate personalized plan</p>
                </Card>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => setGeneratedPlan(null)}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-muted transition-colors"
          >
            Back to Topics
          </button>

          <Card className="p-6 bg-secondary/30">
            <h3 className="text-2xl font-bold text-foreground mb-4">{generatedPlan.topic}</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <p className="font-bold text-foreground">{generatedPlan.difficulty}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Time</p>
                <p className="font-bold text-foreground">{generatedPlan.estimatedTime} weeks</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Format</p>
                <p className="font-bold text-foreground">Weekly Schedule</p>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            {generatedPlan.weekPlan.map((day: any) => (
              <Card key={day.day} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-foreground">{day.day}</h4>
                    <p className="text-sm text-muted-foreground">{day.focus}</p>
                  </div>
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {day.duration}
                  </span>
                </div>
                <ul className="space-y-1">
                  {day.activities.map((activity: string, idx: number) => (
                    <li key={idx} className="text-sm text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
