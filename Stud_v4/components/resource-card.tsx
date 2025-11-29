"use client"

import type { Resource } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, FileText, HelpCircle, Trash2 } from "lucide-react"

interface ResourceCardProps {
  resource: Resource
  onDelete?: (resourceId: string) => void
  isAdmin?: boolean
}

const TYPE_ICONS = {
  video: Play,
  pdf: FileText,
  question: HelpCircle,
  quiz: HelpCircle,
}

const DIFFICULTY_COLORS = {
  easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export function ResourceCard({ resource, onDelete, isAdmin }: ResourceCardProps) {
  const Icon = TYPE_ICONS[resource.type]

  const handleAccess = () => {
    if (resource.url) {
      window.open(resource.url, "_blank")
    } else if (resource.fileUrl) {
      // In a real app, this would download or open the PDF
      window.open(resource.fileUrl, "_blank")
    }
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 flex flex-col">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            <div className="bg-primary/10 p-2 rounded">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base truncate">{resource.title}</CardTitle>
              <CardDescription className="text-xs">{resource.topic}</CardDescription>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs capitalize">
            {resource.type}
          </Badge>
          <Badge className={`text-xs capitalize ${DIFFICULTY_COLORS[resource.difficulty]}`}>
            {resource.difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {resource.description && <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>}
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1" onClick={handleAccess} disabled={!resource.url && !resource.fileUrl}>
            {resource.type === "video" ? "Watch" : "Open"}
          </Button>
          {isAdmin && (
            <Button size="sm" variant="destructive" onClick={() => onDelete?.(resource.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
