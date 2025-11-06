"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store-context"

interface QuizSystemProps {
  grade: string
}

const QUIZ_QUESTIONS = {
  "6": [
    { q: "What is 5 + 3?", options: ["6", "7", "8", "9"], correct: 2 },
    { q: "Which is the largest planet?", options: ["Earth", "Jupiter", "Saturn", "Mars"], correct: 1 },
  ],
  "9": [
    { q: "Solve: 2x + 5 = 13", options: ["x = 2", "x = 4", "x = 6", "x = 8"], correct: 1 },
    {
      q: "What is photosynthesis?",
      options: ["Water absorption", "Energy conversion", "Nutrient absorption", "Respiration"],
      correct: 1,
    },
  ],
}

export function QuizSystem({ grade }: QuizSystemProps) {
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [completed, setCompleted] = useState(false)
  const { addStudySession } = useStore()

  const questions = QUIZ_QUESTIONS[grade as keyof typeof QUIZ_QUESTIONS] || QUIZ_QUESTIONS["6"]

  const handleAnswer = (optionIdx: number) => {
    const isCorrect = optionIdx === questions[currentQuestion].correct
    if (isCorrect) setScore(score + 1)
    setAnswers([...answers, optionIdx])

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCompleted(true)
      const percentage = Math.round(((score + (isCorrect ? 1 : 0)) / questions.length) * 100)
      addStudySession({
        id: `quiz-${Date.now()}`,
        grade,
        topic: "Quiz Practice",
        startedAt: new Date(),
        completedAt: new Date(),
        score: percentage,
        totalQuestions: questions.length,
      })
    }
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Card className="p-8 max-w-md w-full text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready for a Quiz?</h3>
          <p className="text-muted-foreground mb-6">Test your knowledge on topics from your study plan.</p>
          <button
            onClick={() => setStarted(true)}
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors"
          >
            Start Quiz
          </button>
        </Card>
      </div>
    )
  }

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Card className="p-8 max-w-md w-full text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Quiz Complete!</h3>
          <p className="text-5xl font-bold text-primary mb-4">{percentage}%</p>
          <p className="text-muted-foreground mb-6">
            You scored {score} out of {questions.length}
          </p>
          <button
            onClick={() => {
              setStarted(false)
              setCurrentQuestion(0)
              setScore(0)
              setAnswers([])
              setCompleted(false)
            }}
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors"
          >
            Retake Quiz
          </button>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </h3>
        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <Card className="p-6">
        <p className="text-xl font-semibold text-foreground mb-6">{question.q}</p>
        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className="w-full p-4 text-left rounded-md border-2 border-border hover:border-primary hover:bg-secondary transition-all"
            >
              <p className="font-medium text-foreground">{option}</p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
