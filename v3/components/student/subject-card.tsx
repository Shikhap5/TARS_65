"use client"

import type { Subject } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"

interface SubjectCardProps {
  subject: Subject
  isSelected: boolean
  onSelect: () => void
}

export default function SubjectCard({ subject, isSelected, onSelect }: SubjectCardProps) {
  return (
    <Card
      onClick={onSelect}
      className={`cursor-pointer transition-all hover:shadow-lg ${isSelected ? "ring-2 ring-primary shadow-lg" : ""}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <span className="text-2xl">📚</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">{subject.name}</h3>
            <p className="text-sm text-muted-foreground">{subject.examBoard}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Exam Weightage:</span>
            <span className="font-semibold text-primary">{subject.examWeightage}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Topics:</span>
            <span className="font-semibold">{subject.topics.length}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: `${subject.examWeightage}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
