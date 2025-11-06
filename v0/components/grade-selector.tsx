"use client"

import { Card } from "@/components/ui/card"

interface GradeSelectorProps {
  onSelectGrade: (grade: string) => void
}

export function GradeSelector({ onSelectGrade }: GradeSelectorProps) {
  const grades = ["6", "7", "8", "9", "10", "11", "12"]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-2">Select Your Grade</h2>
        <p className="text-muted-foreground text-lg">Choose your current grade level to get started</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-2xl">
        {grades.map((grade) => (
          <button key={grade} onClick={() => onSelectGrade(grade)} className="group">
            <Card className="p-6 text-center hover:bg-secondary cursor-pointer transition-all hover:shadow-lg border-2 border-transparent hover:border-primary">
              <span className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform inline-block">
                {grade}
              </span>
            </Card>
          </button>
        ))}
      </div>
    </div>
  )
}
