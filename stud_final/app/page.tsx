"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const GRADES = Array.from({ length: 12 }, (_, i) => i + 1)
const EXAM_OPTIONS = {
  board: [
    { id: "cbse", name: "CBSE" },
    { id: "icse", name: "ICSE" },
    { id: "state", name: "State Board" },
  ],
  competitive: [
    { id: "jee-main", name: "JEE Main" },
    { id: "jee-advanced", name: "JEE Advanced" },
    { id: "neet", name: "NEET" },
    { id: "sat", name: "SAT" },
    { id: "olympiad", name: "Olympiad" },
  ],
}

export default function HomePage() {
  const router = useRouter()
  const [step, setStep] = useState<"category" | "grade" | "exam">("category")
  const [selectedCategory, setSelectedCategory] = useState<"board" | "competitive" | null>(null)
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null)
  const [selectedExam, setSelectedExam] = useState<string | null>(null)

  const handleContinue = () => {
    if (step === "category" && selectedCategory) {
      setStep("grade")
    } else if (step === "grade" && selectedGrade) {
      setStep("exam")
    } else if (step === "exam" && selectedExam) {
      // Save to localStorage and navigate
      const session = {
        grade: selectedGrade,
        targetExam: selectedExam,
        selectedCategory: selectedCategory,
      }
      localStorage.setItem("studentSession", JSON.stringify(session))
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (step === "exam") {
      setStep("grade")
      setSelectedExam(null)
    } else if (step === "grade") {
      setStep("category")
      setSelectedGrade(null)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Learning Resources & Exam Planner
          </h1>
          <p className="text-lg text-muted-foreground">
            Access YouTube lessons, study materials, and previous year papers for all exams
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-8 mb-12">
          {["category", "grade", "exam"].map((s, idx) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                  step === s || ["category", "grade", "exam"].indexOf(step) > idx
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {idx + 1}
              </div>
              <span className="text-sm font-medium capitalize hidden sm:inline">{s}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Category Selection */}
        {step === "category" && (
          <Card className="border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Select Your Exam Category</CardTitle>
              <p className="text-muted-foreground mt-2">Choose between school board or competitive exams</p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => {
                  setSelectedCategory("board")
                  handleContinue()
                }}
                className={`p-8 rounded-xl border-2 transition-all text-center ${
                  selectedCategory === "board" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-4xl mb-3">🏫</div>
                <h3 className="text-xl font-bold mb-2">School Board</h3>
                <p className="text-sm text-muted-foreground">CBSE, ICSE, State Boards (Grades 1-12)</p>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory("competitive")
                  handleContinue()
                }}
                className={`p-8 rounded-xl border-2 transition-all text-center ${
                  selectedCategory === "competitive"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="text-xl font-bold mb-2">Competitive Exams</h3>
                <p className="text-sm text-muted-foreground">JEE, NEET, SAT, Olympiad</p>
              </button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Grade Selection */}
        {step === "grade" && selectedCategory && (
          <Card className="border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Select Your Grade</CardTitle>
              <p className="text-muted-foreground mt-2">
                {selectedCategory === "board" ? "Grade 1 to 12" : "Recommended for grades 10-12"}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-6">
                {GRADES.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`p-3 rounded-lg font-bold text-lg transition-all ${
                      selectedGrade === grade
                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <Button onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                  ← Back
                </Button>
                <Button onClick={handleContinue} disabled={!selectedGrade} className="flex-1">
                  Continue →
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Exam Selection */}
        {step === "exam" && selectedCategory && (
          <Card className="border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {selectedCategory === "board" ? "Select Your Board" : "Select Your Exam"}
              </CardTitle>
              <p className="text-muted-foreground mt-2">Grade {selectedGrade}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {(selectedCategory === "board" ? EXAM_OPTIONS.board : EXAM_OPTIONS.competitive).map((exam) => (
                  <button
                    key={exam.id}
                    onClick={() => setSelectedExam(exam.name)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                      selectedExam === exam.name
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {exam.name}
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <Button onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                  ← Back
                </Button>
                <Button onClick={handleContinue} disabled={!selectedExam} className="flex-1">
                  Start Learning →
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
