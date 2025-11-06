"use client"

import type { Subject } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ExamWeightageViewProps {
  subjects: Subject[]
}

export default function ExamWeightageView({ subjects }: ExamWeightageViewProps) {
  const colors = ["#0066cc", "#00aa66", "#ff6633", "#9933cc"]

  if (subjects.length === 0) {
    return (
      <Card className="border-2 border-accent/30 col-span-3">
        <CardHeader>
          <CardTitle className="text-xl">Exam Weightage Distribution</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">Prioritize subjects based on exam weightage</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No subjects available yet.</p>
        </CardContent>
      </Card>
    )
  }

  const highestWeightageSubject = subjects.reduce((a, b) => (a.examWeightage > b.examWeightage ? a : b))
  const maxWeightage = Math.max(...subjects.map((s) => s.examWeightage))

  return (
    <Card className="border-2 border-accent/30 col-span-3">
      <CardHeader>
        <CardTitle className="text-xl">Exam Weightage Distribution</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">Prioritize subjects based on exam weightage</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Simple Bar Chart */}
        <div className="space-y-4">
          {subjects.map((subject, idx) => (
            <div key={subject.id}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{subject.name}</span>
                <span className="text-sm font-bold" style={{ color: colors[idx % colors.length] }}>
                  {subject.examWeightage}%
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all"
                  style={{
                    width: `${subject.examWeightage}%`,
                    backgroundColor: colors[idx % colors.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 pt-6 border-t">
          {subjects.map((subject, idx) => (
            <div key={subject.id} className="p-4 bg-secondary/50 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">{subject.name}</p>
              <p className="text-2xl font-bold" style={{ color: colors[idx % colors.length] }}>
                {subject.examWeightage}%
              </p>
              <p className="text-xs text-muted-foreground mt-2">{subject.topics.length} topics</p>
            </div>
          ))}
        </div>

        {/* Study Suggestion */}
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
          <p className="text-sm font-semibold text-accent mb-2">Study Suggestion</p>
          <p className="text-sm text-foreground/80">
            Focus on <strong>{highestWeightageSubject.name}</strong> as it has the highest weightage ({maxWeightage}%).
            Allocate your study time proportionally to each subject's weightage for optimal preparation.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
