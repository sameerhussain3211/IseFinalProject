"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Users, BarChart3, BookOpen, Mail, LogOut } from "lucide-react"

interface AdminLayoutProps {
  activeSection: string
  onSectionChange: (section: string) => void
  onLogout: () => void
  children: React.ReactNode
}

export default function AdminLayout({ activeSection, onSectionChange, onLogout, children }: AdminLayoutProps) {
  const sections = [
    { id: "users", label: "User Management", icon: Users },
    { id: "progress", label: "Player Progress", icon: BarChart3 },
    { id: "quiz", label: "Quiz Management", icon: BookOpen },
    { id: "emails", label: "Email Scenarios", icon: Mail },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6 bg-slate-800/90 border-orange-500/30 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-orange-400" />
                <div>
                  <CardTitle className="text-2xl font-bold text-orange-100">HackShield Admin</CardTitle>
                  <p className="text-slate-300">Cybersecurity Training Platform Management</p>
                </div>
              </div>
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-red-500/30 text-red-300 hover:bg-red-600/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <Card className="lg:col-span-1 bg-slate-800/90 border-blue-500/30 backdrop-blur h-fit">
            <CardHeader>
              <CardTitle className="text-lg text-blue-100">Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <Button
                    key={section.id}
                    onClick={() => onSectionChange(section.id)}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeSection === section.id
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {section.label}
                  </Button>
                )
              })}
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  )
}
