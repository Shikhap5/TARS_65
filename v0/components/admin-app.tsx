"use client"

import { useState } from "react"
import { ResourceManager } from "./resource-manager"

export function AdminApp() {
  const [resources, setResources] = useState([
    {
      id: "1",
      grade: "9",
      subject: "Mathematics",
      topic: "Algebra Basics",
      description: "Introduction to algebraic expressions and equations",
      resources: ["Khan Academy: Algebra", "YouTube: Algebra Fundamentals"],
      difficulty: "Beginner",
    },
    {
      id: "2",
      grade: "9",
      subject: "Science",
      topic: "Cell Biology",
      description: "Understanding cell structure and function",
      resources: ["Khan Academy: Cells", "Amoeba Sisters: Cell Structure"],
      difficulty: "Intermediate",
    },
  ])

  return <ResourceManager resources={resources} setResources={setResources} />
}
