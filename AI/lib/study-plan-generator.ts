// Rule-based study plan generator using heuristics

export interface Subject {
  name: string
  weightage: number // 0-100 percentage
  weakTopics: string[]
  currentLevel: "beginner" | "intermediate" | "advanced"
}

export interface StudyPlanItem {
  id: string
  topic: string
  subject: string
  priority: number // 1-10, 10 being highest
  estimatedHours: number
  reason: string
}

export function generateStudyPlan(subjects: Subject[]): StudyPlanItem[] {
  const plan: StudyPlanItem[] = []
  let itemId = 0

  // Sort subjects by weightage (high to low)
  const sortedSubjects = [...subjects].sort((a, b) => b.weightage - a.weightage)

  for (const subject of sortedSubjects) {
    // Priority formula: weightage * weak topic count + level multiplier
    const levelMultiplier =
      subject.currentLevel === "beginner" ? 1.5 : subject.currentLevel === "intermediate" ? 1.2 : 1.0

    const basePriority = Math.min(10, (subject.weightage / 100) * 10 * levelMultiplier)

    // Create plan items for each weak topic
    for (const topic of subject.weakTopics) {
      const priority = Math.min(10, basePriority + 1) // Weak topics get +1 boost
      const estimatedHours = Math.ceil((priority / 10) * 5) + (subject.currentLevel === "beginner" ? 2 : 0)

      plan.push({
        id: `plan-${itemId++}`,
        topic,
        subject: subject.name,
        priority,
        estimatedHours,
        reason: `High weightage (${subject.weightage}%) + identified weak area`,
      })
    }

    // Add main topic review if not already in weak topics
    const mainTopicInWeak = subject.weakTopics.some((t) => t.toLowerCase() === subject.name.toLowerCase())
    if (!mainTopicInWeak) {
      plan.push({
        id: `plan-${itemId++}`,
        topic: `${subject.name} - Overview & Core Concepts`,
        subject: subject.name,
        priority: Math.max(5, basePriority - 1),
        estimatedHours: 3,
        reason: `Strong subject weightage (${subject.weightage}%) - maintain strength`,
      })
    }
  }

  // Sort final plan by priority (descending)
  return plan.sort((a, b) => b.priority - a.priority)
}
