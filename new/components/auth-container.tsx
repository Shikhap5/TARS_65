"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { STUDENT_PASSWORD, ADMIN_PASSWORD } from "@/lib/data"

interface AuthContainerProps {
  onAuthenticate: (role: "student" | "admin", username: string) => void
}

export function AuthContainer({ onAuthenticate }: AuthContainerProps) {
  const [selectedRole, setSelectedRole] = useState<"student" | "admin" | null>(null)
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username.trim()) {
      setError("Please enter a username")
      return
    }

    const correctPassword = selectedRole === "student" ? STUDENT_PASSWORD : ADMIN_PASSWORD

    if (password === correctPassword) {
      onAuthenticate(selectedRole, username)
    } else {
      setError("Invalid password. Please try again.")
      setPassword("")
    }
  }

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-blue-600">StudyHub</CardTitle>
            <CardDescription>Personalized Learning & Exam Planner</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-muted-foreground mb-6">Select your role to continue</p>
            <Button
              onClick={() => setSelectedRole("student")}
              className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
            >
              Student Login
            </Button>
            <Button
              onClick={() => setSelectedRole("admin")}
              variant="outline"
              className="w-full h-12 text-base font-semibold"
            >
              Admin Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>{selectedRole === "student" ? "Student" : "Admin"} Login</CardTitle>
          <CardDescription>
            Enter your credentials to access {selectedRole === "student" ? "learning resources" : "the admin panel"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Demo password: {selectedRole === "student" ? "student123" : "admin123"}
              </p>
            </div>
            {error && <div className="p-3 bg-red-100 text-red-700 rounded text-sm">{error}</div>}
            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setSelectedRole(null)
                  setPassword("")
                  setUsername("")
                  setError("")
                }}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
