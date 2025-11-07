"use client"
import type { Subject, Resource } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ResourceCard } from "./resource-card"
import { BookOpen } from "lucide-react"

interface SubjectSectionProps {
  subject: Subject
  resources: Resource[]
  isAdmin?: boolean
  onDeleteResource?: (resourceId: string) => void
}

export function SubjectSection({ subject, resources, isAdmin, onDeleteResource }: SubjectSectionProps) {
  const videos = resources.filter((r) => r.type === "video")
  const pdfs = resources.filter((r) => r.type === "pdf")
  const questions = resources.filter((r) => r.type === "question")

  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-all">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <CardTitle>{subject.name}</CardTitle>
            </div>
            <CardDescription>{subject.totalQuestions && `${subject.totalQuestions} questions`}</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{subject.weightage}%</div>
            <p className="text-xs text-muted-foreground">Exam Weightage</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Preparation Progress</span>
            <span className="font-semibold">0%</span>
          </div>
          <Progress value={0} className="h-2" />
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="videos">Videos {videos.length > 0 && `(${videos.length})`}</TabsTrigger>
            <TabsTrigger value="notes">Notes {pdfs.length > 0 && `(${pdfs.length})`}</TabsTrigger>
            <TabsTrigger value="papers">Papers {questions.length > 0 && `(${questions.length})`}</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-3 mt-4">
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} onDelete={onDeleteResource} isAdmin={isAdmin} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-sm py-4">No video resources available</p>
            )}
          </TabsContent>

          <TabsContent value="notes" className="space-y-3 mt-4">
            {pdfs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pdfs.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} onDelete={onDeleteResource} isAdmin={isAdmin} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-sm py-4">No study notes available</p>
            )}
          </TabsContent>

          <TabsContent value="papers" className="space-y-3 mt-4">
            {questions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} onDelete={onDeleteResource} isAdmin={isAdmin} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-sm py-4">No question papers available</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
