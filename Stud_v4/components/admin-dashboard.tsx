"use client"

import type React from "react"

import { useState, useContext } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { LearningContext } from "@/lib/db-context"
import type { Resource, ResourceType, DifficultyLevel, ExamType } from "@/lib/types"
import { LogOut, Plus } from "lucide-react"
import { EXAM_SUBJECTS } from "@/lib/mock-data"
import { ResourceCard } from "./resource-card"

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const context = useContext(LearningContext)
  const [selectedExam, setSelectedExam] = useState<ExamType>("CBSE")
  const [activeTab, setActiveTab] = useState("manage")

  // Form states for adding resources
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    description: "",
    type: "video" as ResourceType,
    difficulty: "medium" as DifficultyLevel,
    url: "",
    fileUrl: "",
    subjectId: "",
  })

  if (!context) {
    return null
  }

  const { resources, addResource, deleteResource } = context
  const subjects = EXAM_SUBJECTS[selectedExam]
  const examResources = resources.filter((r) => {
    const resourceSubject = subjects.find((s) => s.id === r.subjectId)
    return !!resourceSubject
  })

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.subjectId || !formData.title) {
      alert("Please fill in required fields")
      return
    }

    const newResource: Resource = {
      id: `r${Date.now()}`,
      type: formData.type,
      title: formData.title,
      subjectId: formData.subjectId,
      topic: formData.topic,
      difficulty: formData.difficulty,
      url: formData.type === "video" ? formData.url : undefined,
      fileUrl: formData.type !== "video" ? formData.fileUrl : undefined,
      description: formData.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    addResource(newResource)
    setFormData({
      title: "",
      topic: "",
      description: "",
      type: "video",
      difficulty: "medium",
      url: "",
      fileUrl: "",
      subjectId: "",
    })

    alert("Resource added successfully!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage learning resources and content</p>
          </div>
          <Button variant="destructive" size="sm" onClick={onLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="manage">Manage Resources</TabsTrigger>
            <TabsTrigger value="add">Add Resource</TabsTrigger>
            <TabsTrigger value="weightage">Exam Weightage</TabsTrigger>
          </TabsList>

          {/* Manage Resources Tab */}
          <TabsContent value="manage" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Exam Board</CardTitle>
                <CardDescription>Filter resources by exam type</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedExam} onValueChange={(val) => setSelectedExam(val as ExamType)}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CBSE">CBSE</SelectItem>
                    <SelectItem value="ICSE">ICSE</SelectItem>
                    <SelectItem value="JEE">JEE</SelectItem>
                    <SelectItem value="NEET">NEET</SelectItem>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="IB">IB</SelectItem>
                    <SelectItem value="Olympiad">Olympiad</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              {subjects.map((subject) => {
                const subjectResources = examResources.filter((r) => r.subjectId === subject.id)

                if (subjectResources.length === 0) {
                  return (
                    <Card key={subject.id} className="border-dashed">
                      <CardHeader>
                        <CardTitle className="text-base">{subject.name}</CardTitle>
                        <CardDescription>No resources added yet</CardDescription>
                      </CardHeader>
                    </Card>
                  )
                }

                return (
                  <Card key={subject.id}>
                    <CardHeader>
                      <CardTitle className="text-base">{subject.name}</CardTitle>
                      <CardDescription>{subjectResources.length} resources</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {subjectResources.map((resource) => (
                          <ResourceCard key={resource.id} resource={resource} onDelete={deleteResource} isAdmin />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Add Resource Tab */}
          <TabsContent value="add" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Resource</CardTitle>
                <CardDescription>Upload study materials, videos, or question papers</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddResource} className="space-y-6">
                  {/* Exam and Subject Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Target Exam</label>
                      <Select value={selectedExam} onValueChange={(val) => setSelectedExam(val as ExamType)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CBSE">CBSE</SelectItem>
                          <SelectItem value="ICSE">ICSE</SelectItem>
                          <SelectItem value="JEE">JEE</SelectItem>
                          <SelectItem value="NEET">NEET</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="IB">IB</SelectItem>
                          <SelectItem value="Olympiad">Olympiad</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject*</label>
                      <Select
                        value={formData.subjectId}
                        onValueChange={(val) => setFormData({ ...formData, subjectId: val })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject.id} value={subject.id}>
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Resource Details */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Resource Title*</label>
                    <Input
                      placeholder="e.g., Quadratic Equations Tutorial"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Topic</label>
                      <Input
                        placeholder="e.g., Algebra"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Resource Type</label>
                      <Select
                        value={formData.type}
                        onValueChange={(val) => setFormData({ ...formData, type: val as ResourceType })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video (YouTube)</SelectItem>
                          <SelectItem value="pdf">PDF/Notes</SelectItem>
                          <SelectItem value="question">Question Paper</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Difficulty Level</label>
                      <Select
                        value={formData.difficulty}
                        onValueChange={(val) => setFormData({ ...formData, difficulty: val as DifficultyLevel })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {formData.type === "video" ? "YouTube URL" : "File URL"}
                      </label>
                      <Input
                        placeholder={formData.type === "video" ? "https://youtube.com/embed/..." : "/path/to/file.pdf"}
                        value={formData.type === "video" ? formData.url : formData.fileUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [formData.type === "video" ? "url" : "fileUrl"]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Brief description of the resource"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2">
                    <Plus className="w-4 h-4" />
                    Add Resource
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exam Weightage Tab */}
          <TabsContent value="weightage" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Exam Weightage Distribution</CardTitle>
                <CardDescription>Subject-wise weightage for {selectedExam}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{subject.name}</span>
                        <span className="text-2xl font-bold text-primary">{subject.weightage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all"
                          style={{ width: `${subject.weightage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <Card className="border-dashed mt-6">
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground">
                        Total Weightage: {subjects.reduce((sum, s) => sum + s.weightage, 0)}%
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
