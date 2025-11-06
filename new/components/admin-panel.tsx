"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { resources as initialResources } from "@/lib/data"
import type { Resource } from "@/lib/types"

interface AdminPanelProps {
  username: string
  onLogout: () => void
}

export function AdminPanel({ username, onLogout }: AdminPanelProps) {
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [formData, setFormData] = useState({
    title: "",
    type: "video" as const,
    subject: "",
    difficulty: "medium" as const,
    topics: "",
    url: "",
    description: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.subject || !formData.description) {
      alert("Please fill in all required fields")
      return
    }

    const newResource: Resource = {
      id: `res-${Date.now()}`,
      title: formData.title,
      type: formData.type,
      subject: formData.subject,
      difficulty: formData.difficulty,
      topics: formData.topics.split(",").map((t) => t.trim()),
      url: formData.url || undefined,
      description: formData.description,
    }

    setResources([...resources, newResource])
    setFormData({
      title: "",
      type: "video",
      subject: "",
      difficulty: "medium",
      topics: "",
      url: "",
      description: "",
    })
    alert("Resource added successfully!")
  }

  const handleDeleteResource = (id: string) => {
    setResources(resources.filter((r) => r.id !== id))
    alert("Resource deleted successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-purple-900 dark:text-purple-100">Admin Panel</h1>
            <p className="text-muted-foreground">Manage learning resources • {username}</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>

        <Tabs defaultValue="manage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">Manage Resources</TabsTrigger>
            <TabsTrigger value="add">Add New Resource</TabsTrigger>
          </TabsList>

          {/* Manage Resources Tab */}
          <TabsContent value="manage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Resources</CardTitle>
                <CardDescription>Total resources: {resources.length}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {resources.map((resource) => (
                    <Card key={resource.id} className="border-l-4 border-l-purple-500">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                              <Badge className="capitalize bg-purple-100 text-purple-800 dark:bg-purple-900">
                                {resource.type}
                              </Badge>
                              <Badge variant="outline">{resource.subject}</Badge>
                              <Badge variant="secondary">{resource.difficulty}</Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">Topics: {resource.topics.join(", ")}</div>
                          </div>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteResource(resource.id)}>
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Resource Tab */}
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Add New Learning Resource</CardTitle>
                <CardDescription>Create a new resource to add to the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddResource} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Resource Title *</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Quadratic Equations Explained"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Resource Type *</Label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      >
                        <option value="video">Video</option>
                        <option value="pdf">PDF</option>
                        <option value="practice">Practice Questions</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g., Mathematics, Physics, Biology"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level *</Label>
                      <select
                        id="difficulty"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topics">Topics (comma-separated) *</Label>
                    <Input
                      id="topics"
                      name="topics"
                      value={formData.topics}
                      onChange={handleInputChange}
                      placeholder="e.g., Quadratic Equations, Algebra, Mixed Topics"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Brief description of the resource"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="url">Resource URL (optional)</Label>
                    <Input
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      placeholder="https://example.com/resource"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Add Resource
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
