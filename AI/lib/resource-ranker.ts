// Rule-based resource ranking system

export interface Resource {
  id: string
  title: string
  type: "youtube" | "pdf" | "past-paper"
  difficulty: "beginner" | "intermediate" | "advanced"
  relevantTopics: string[]
  quality: number // 1-5 rating
  duration?: number // in minutes for videos
  url: string
}

export interface RankedResource extends Resource {
  relevanceScore: number
  difficultyMatch: number
  finalScore: number
  ranking: number
}

export function rankResources(
  resources: Resource[],
  topic: string,
  userLevel: "beginner" | "intermediate" | "advanced",
  targetDifficulty: "beginner" | "intermediate" | "advanced",
): RankedResource[] {
  const ranked: RankedResource[] = resources.map((resource) => {
    // 1. Topic relevance score (0-40 points)
    const topicMatch = resource.relevantTopics.map((t) => t.toLowerCase()).includes(topic.toLowerCase())
    const relevanceScore = topicMatch ? 40 : 0

    // 2. Difficulty match score (0-30 points)
    let difficultyMatch = 0
    const difficultyLevels = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
    }
    const resourceDiff = difficultyLevels[resource.difficulty]
    const targetDiff = difficultyLevels[targetDifficulty]
    const userDiff = difficultyLevels[userLevel]

    // Perfect match or one level above current level = high score
    if (resource.difficulty === targetDifficulty || (resourceDiff === userDiff + 1 && resourceDiff <= targetDiff + 1)) {
      difficultyMatch = 30
    } else if (Math.abs(resourceDiff - targetDiff) === 1) {
      difficultyMatch = 20
    } else if (resourceDiff === userDiff) {
      difficultyMatch = 15
    }

    // 3. Quality score (0-20 points)
    const qualityScore = (resource.quality / 5) * 20

    // 4. Resource type bonus (0-10 points)
    // Past papers for exam prep, videos for understanding, PDFs for reference
    let typeBonus = 0
    if (resource.type === "past-paper" && (targetDifficulty === "intermediate" || targetDifficulty === "advanced")) {
      typeBonus = 10
    } else if (resource.type === "youtube" && userLevel === "beginner") {
      typeBonus = 8
    } else if (resource.type === "pdf") {
      typeBonus = 5
    }

    const finalScore = relevanceScore + difficultyMatch + qualityScore + typeBonus

    return {
      ...resource,
      relevanceScore,
      difficultyMatch,
      finalScore,
      ranking: 0,
    }
  })

  // Sort by final score and assign rankings
  ranked.sort((a, b) => b.finalScore - a.finalScore)
  ranked.forEach((resource, index) => {
    resource.ranking = index + 1
  })

  return ranked
}

// Filter resources by topic and difficulty
export function filterResourcesByRelevance(resources: Resource[], topic: string, minRelevance = 0.5): Resource[] {
  return resources.filter((resource) => {
    const hasTopicMatch = resource.relevantTopics.map((t) => t.toLowerCase()).includes(topic.toLowerCase())
    return hasTopicMatch
  })
}
