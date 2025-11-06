"use client"

import { useState } from "react"
import { GradeSelector } from "./grade-selector"
import { StudentDashboard } from "./student-dashboard"

export function StudentApp() {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null)

  if (!selectedGrade) {
    return <GradeSelector onSelectGrade={setSelectedGrade} />
  }

  return <StudentDashboard grade={selectedGrade} onChangeGrade={() => setSelectedGrade(null)} />
}
