"use client"

import { useState } from "react"
import AdminLayout from "./admin-layout"
import UserManagement from "./user-management"
import PlayerProgress from "./player-progress"
import QuizManagement from "./quiz-management"
import EmailManagement from "./email-management"

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState("users")

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return <UserManagement />
      case "progress":
        return <PlayerProgress />
      case "quiz":
        return <QuizManagement />
      case "emails":
        return <EmailManagement />
      default:
        return <UserManagement />
    }
  }

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection} onLogout={onLogout}>
      {renderContent()}
    </AdminLayout>
  )
}
