"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup } from "@/components/ui/radio-group"
import { useAuth } from "@/hooks/use-auth"
import type { ExamType } from "@/lib/types"
import { BookMarked } from "lucide-react"

interface StudentOnboardingProps {
  onComplete: () => void
}

const EXAM_TYPES: ExamType[] = ["CBSE", "ICSE", "JEE", "NEET", "SAT", "IB", "Olympiad"]
const GRADES = Array.from({ length: 12 }, (_, i) => i + 1)

export function StudentOnboarding({ onComplete }: StudentOnboardingProps) {
  const [step, setStep] = useState<"grade" | "exam">("grade")
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null)
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null)
  const { updateSession } = useAuth()

  const handleGradeSelect = (grade: number) => {
    setSelectedGrade(grade)
  }

  const handleExamSelect = (exam: ExamType) => {
    setSelectedExam(exam)
  }

  const handleNext = () => {
    if (step === "grade" && selectedGrade !== null) {
      setStep("exam")
    }
  }

  const handleComplete = () => {
    if (selectedGrade !== null && selectedExam !== null) {
      updateSession({ grade: selectedGrade, targetExam: selectedExam })
      onComplete()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 shadow-xl">
        <CardHeader className="space-y-2 text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <BookMarked className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Personalize Your Learning Journey</CardTitle>
          <CardDescription>
            {step === "grade"
              ? "Select your current grade (1-12)"
              : "Choose your target exam board or competitive exam"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === "grade" ? (
            <div>
              <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
                <RadioGroup value={selectedGrade?.toString() || ""}>
                  {GRADES.map((grade) => (
                    <label
                      key={grade}
                      className="cursor-pointer flex items-center"
                      onClick={() => handleGradeSelect(grade)}
                    >
                      <Button
                        variant={selectedGrade === grade ? "default" : "outline"}
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault()
                          handleGradeSelect(grade)
                        }}
                      >
                        {grade}
                      </Button>
                    </label>
                  ))}
                </RadioGroup>
              </div>
              <Button onClick={handleNext} disabled={selectedGrade === null} className="w-full mt-8">
                Continue
              </Button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {EXAM_TYPES.map((exam) => (
                  <Button
                    key={exam}
                    variant={selectedExam === exam ? "default" : "outline"}
                    onClick={() => handleExamSelect(exam)}
                    className="p-6 h-auto flex flex-col items-start"
                  >
                    <span className="text-base font-semibold">{exam}</span>
                  </Button>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep("grade")
                    setSelectedGrade(null)
                  }}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button onClick={handleComplete} disabled={selectedExam === null} className="flex-1">
                  Start Learning
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
