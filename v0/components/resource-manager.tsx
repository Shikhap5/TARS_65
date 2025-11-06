"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface Resource {
  id: string
  grade: string
  subject: string
  topic: string
  description: string
  resources: string[]
  difficulty: string
}

interface ResourceManagerProps {
  resources: Resource[]
  setResources: (resources: Resource[]) => void
}

export function ResourceManager({ resources, setResources }: ResourceManagerProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    grade: "",
    subject: "",
    topic: "",
    description: "",
    resources: "",
    difficulty: "Intermediate",
  })

  const handleAddResource = () => {
    if (formData.grade && formData.subject && formData.topic) {
      const newResource: Resource = {
        id: Date.now().toString(),
        grade: formData.grade,
        subject: formData.subject,
        topic: formData.topic,
        description: formData.description,
        resources: formData.resources.split("\n").filter((r) => r.trim()),
        difficulty: formData.difficulty,
      }
      setResources([...resources, newResource])
      setFormData({
        grade: "",
        subject: "",
        topic: "",
        description: "",
        resources: "",
        difficulty: "Intermediate",
      })
      setShowForm(false)
    }
  }

  const handleDeleteResource = (id: string) => {
    setResources(resources.filter((r) => r.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Resource Management</h2>
          <p className="text-muted-foreground">Manage learning resources for all grades</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold"
        >
          {showForm ? "Cancel" : "Add Resource"}
        </button>
      </div>

      {showForm && (
        <Card className="p-6 bg-secondary/30">
          <h3 className="text-lg font-bold text-foreground mb-4">Add New Resource</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Grade</label>
                <input
                  type="text"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  placeholder="e.g., 9"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g., Mathematics"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Topic</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="e.g., Algebra Basics"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the topic..."
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Resources (one per line)</label>
              <textarea
                value={formData.resources}
                onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
                placeholder="Khan Academy: Algebra&#10;YouTube: Algebra Fundamentals"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <button
              onClick={handleAddResource}
              className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors"
            >
              Add Resource
            </button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {resources.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No resources yet. Add one to get started!</p>
          </Card>
        ) : (
          resources.map((resource) => (
            <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold bg-primary/20 text-primary px-2 py-1 rounded">
                      Grade {resource.grade}
                    </span>
                    <span className="text-sm font-semibold bg-accent/20 text-accent px-2 py-1 rounded">
                      {resource.subject}
                    </span>
                    <span className="text-sm font-semibold bg-secondary/40 text-secondary-foreground px-2 py-1 rounded">
                      {resource.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{resource.topic}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteResource(resource.id)}
                  className="ml-4 px-3 py-1 bg-destructive/20 text-destructive rounded-md hover:bg-destructive/30 transition-colors text-sm font-medium"
                >
                  Delete
                </button>
              </div>
              {resource.resources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-2">Resources:</p>
                  <ul className="space-y-1">
                    {resource.resources.map((res, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                        {res}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
