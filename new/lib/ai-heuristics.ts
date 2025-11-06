import type { Resource, StudyPlan, Subject } from "./types"

export function generateStudyPlan(
  examId: string,
  subjects: Subject[],
  weakTopics: string[],
  resources: Resource[],
): StudyPlan[] {
  const weeks = 8
  const studyPlan: StudyPlan[] = []

  // Sort subjects by weightage (descending)
  const sortedSubjects = [...subjects].sort((a, b) => b.weightage - a.weightage)

  for (let week = 1; week <= weeks; week++) {
    const weekPlan: StudyPlan = {
      week,
      subjects: [],
      totalHours: 0,
    }

    // Prioritize subjects with high weightage
    for (const subject of sortedSubjects) {
      const subjectResources = resources
        .filter((r) => r.subject === subject.name)
        .sort((a, b) => {
          // Prioritize resources matching weak topics
          const aHasWeakTopic = a.topics.some((t) => weakTopics.includes(t))
          const bHasWeakTopic = b.topics.some((t) => weakTopics.includes(t))
          if (aHasWeakTopic !== bHasWeakTopic) return aHasWeakTopic ? -1 : 1

          // Then sort by difficulty (easy first for foundational, hard for later weeks)
          const difficultyScore = { easy: 1, medium: 2, hard: 3 }
          const diffOrder = week > 5 ? -1 : 1
          return (difficultyScore[a.difficulty] - difficultyScore[b.difficulty]) * diffOrder
        })
        .slice(0, 3)

      if (subjectResources.length > 0) {
        const totalResourceHours = subjectResources.length * 2
        weekPlan.subjects.push({
          subject: subject.name,
          resources: subjectResources,
          topics: subjectResources.flatMap((r) => r.topics),
          priority: weakTopics.some((t) => subjectResources.some((r) => r.topics.includes(t)))
            ? "high"
            : subject.weightage > 30
              ? "medium"
              : "low",
        })
        weekPlan.totalHours += totalResourceHours
      }
    }

    studyPlan.push(weekPlan)
  }

  return studyPlan
}

export function rankResources(
  resources: Resource[],
  weakTopics: string[],
  userDifficulty: "easy" | "medium" | "hard" = "medium",
): Resource[] {
  return [...resources].sort((a, b) => {
    // 1. Resources matching weak topics get highest priority
    const aMatchesWeak = a.topics.some((t) => weakTopics.includes(t)) ? 1 : 0
    const bMatchesWeak = b.topics.some((t) => weakTopics.includes(t)) ? 1 : 0
    if (aMatchesWeak !== bMatchesWeak) return bMatchesWeak - aMatchesWeak

    // 2. Resources matching user difficulty level
    const difficultyOrder = { easy: 0, medium: 1, hard: 2 }
    const aUserMatch = Math.abs(difficultyOrder[a.difficulty] - difficultyOrder[userDifficulty])
    const bUserMatch = Math.abs(difficultyOrder[b.difficulty] - difficultyOrder[userDifficulty])
    if (aUserMatch !== bUserMatch) return aUserMatch - bUserMatch

    // 3. Videos over PDFs/practice (more engaging for learning)
    const typeScore = { video: 0, pdf: 1, practice: 2 }
    return typeScore[a.type] - typeScore[b.type]
  })
}
