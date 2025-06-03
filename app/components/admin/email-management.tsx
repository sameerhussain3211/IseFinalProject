"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Plus, Edit, Trash2, Save, X, Shield, AlertTriangle } from "lucide-react"
import { emailData, type Email, type PhishingTechnique } from "../../data/email-data"

export default function EmailManagement() {
  const [emails, setEmails] = useState<Record<"easy" | "medium" | "hard", Email[]>>(emailData)
  const [editingEmail, setEditingEmail] = useState<{ level: "easy" | "medium" | "hard"; id: number } | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<"easy" | "medium" | "hard">("easy")
  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState({
    subject: "",
    sender: "",
    content: "",
    isPhishing: false,
    technique: "" as PhishingTechnique | "",
  })

  const techniques: PhishingTechnique[] = [
    "urgency_scareware",
    "spoofing",
    "credential_harvesting",
    "lottery_advance_fee",
    "fake_security_alert",
    "typosquatting",
    "fake_compliance",
  ]

  const resetForm = () => {
    setFormData({
      subject: "",
      sender: "",
      content: "",
      isPhishing: false,
      technique: "",
    })
  }

  const handleAddEmail = () => {
    if (!formData.subject || !formData.sender || !formData.content) {
      setMessage("Please fill in all required fields")
      return
    }

    if (formData.isPhishing && !formData.technique) {
      setMessage("Please select a phishing technique for phishing emails")
      return
    }

    const newEmail: Email = {
      id: Math.max(...emails[selectedLevel].map((e) => e.id)) + 1,
      subject: formData.subject,
      sender: formData.sender,
      content: formData.content,
      isPhishing: formData.isPhishing,
      ...(formData.isPhishing && formData.technique && { technique: formData.technique }),
    }

    setEmails({
      ...emails,
      [selectedLevel]: [...emails[selectedLevel], newEmail],
    })

    setMessage("Email added successfully")
    setShowAddForm(false)
    resetForm()
  }

  const handleEditEmail = (level: "easy" | "medium" | "hard", email: Email) => {
    setFormData({
      subject: email.subject,
      sender: email.sender,
      content: email.content,
      isPhishing: email.isPhishing,
      technique: email.technique || "",
    })
    setEditingEmail({ level, id: email.id })
  }

  const handleUpdateEmail = () => {
    if (!editingEmail) return

    if (!formData.subject || !formData.sender || !formData.content) {
      setMessage("Please fill in all required fields")
      return
    }

    if (formData.isPhishing && !formData.technique) {
      setMessage("Please select a phishing technique for phishing emails")
      return
    }

    const updatedEmail: Email = {
      id: editingEmail.id,
      subject: formData.subject,
      sender: formData.sender,
      content: formData.content,
      isPhishing: formData.isPhishing,
      ...(formData.isPhishing && formData.technique && { technique: formData.technique }),
    }

    setEmails({
      ...emails,
      [editingEmail.level]: emails[editingEmail.level].map((e) => (e.id === editingEmail.id ? updatedEmail : e)),
    })

    setMessage("Email updated successfully")
    setEditingEmail(null)
    resetForm()
  }

  const handleDeleteEmail = (level: "easy" | "medium" | "hard", id: number) => {
    if (!confirm("Are you sure you want to delete this email?")) return

    setEmails({
      ...emails,
      [level]: emails[level].filter((e) => e.id !== id),
    })

    setMessage("Email deleted successfully")
  }

  return (
    <Card className="bg-slate-800/90 border-blue-500/30 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-blue-100 flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Email Scenario Management
          </CardTitle>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 hover:bg-green-700"
            disabled={showAddForm || editingEmail !== null}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Email
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {message && (
          <Alert className="border-blue-500/30 bg-blue-500/10">
            <AlertDescription className="text-blue-400">{message}</AlertDescription>
          </Alert>
        )}

        {/* Level Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {(["easy", "medium", "hard"] as const).map((level) => (
            <div key={level} className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="text-center">
                <div className="text-lg font-bold text-slate-200 capitalize">{level}</div>
                <div className="text-sm text-slate-400">{emails[level].length} emails</div>
                <div className="text-xs text-slate-500">
                  {emails[level].filter((e) => e.isPhishing).length} phishing,{" "}
                  {emails[level].filter((e) => !e.isPhishing).length} legitimate
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingEmail !== null) && (
          <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <h3 className="text-lg font-medium text-slate-200 mb-4">{editingEmail ? "Edit Email" : "Add New Email"}</h3>
            <div className="space-y-4">
              {showAddForm && (
                <div>
                  <Label className="text-slate-300">Difficulty Level</Label>
                  <Select
                    value={selectedLevel}
                    onValueChange={(value: "easy" | "medium" | "hard") => setSelectedLevel(value)}
                  >
                    <SelectTrigger className="bg-slate-600 border-slate-500 text-slate-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label className="text-slate-300">Subject *</Label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-slate-600 border-slate-500 text-slate-100"
                  placeholder="Email subject line"
                />
              </div>

              <div>
                <Label className="text-slate-300">Sender *</Label>
                <Input
                  value={formData.sender}
                  onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                  className="bg-slate-600 border-slate-500 text-slate-100"
                  placeholder="sender@example.com"
                />
              </div>

              <div>
                <Label className="text-slate-300">Email Content *</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="bg-slate-600 border-slate-500 text-slate-100 min-h-[200px]"
                  placeholder="Email body content..."
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPhishing"
                    checked={formData.isPhishing}
                    onChange={(e) => setFormData({ ...formData, isPhishing: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="isPhishing" className="text-slate-300">
                    This is a phishing email
                  </Label>
                </div>
              </div>

              {formData.isPhishing && (
                <div>
                  <Label className="text-slate-300">Phishing Technique *</Label>
                  <Select
                    value={formData.technique}
                    onValueChange={(value: PhishingTechnique) => setFormData({ ...formData, technique: value })}
                  >
                    <SelectTrigger className="bg-slate-600 border-slate-500 text-slate-100">
                      <SelectValue placeholder="Select phishing technique" />
                    </SelectTrigger>
                    <SelectContent>
                      {techniques.map((technique) => (
                        <SelectItem key={technique} value={technique}>
                          {technique.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex space-x-2">
                <Button
                  onClick={editingEmail ? handleUpdateEmail : handleAddEmail}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingEmail ? "Update" : "Add"} Email
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingEmail(null)
                    resetForm()
                  }}
                  className="border-slate-500 text-slate-300"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Emails List */}
        <div className="space-y-4">
          {(["easy", "medium", "hard"] as const).map((level) => (
            <div key={level}>
              <h3 className="text-lg font-medium text-slate-200 mb-3 capitalize">{level} Level</h3>
              <div className="space-y-3">
                {emails[level].map((email) => (
                  <div key={email.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {email.isPhishing ? (
                            <AlertTriangle className="h-4 w-4 text-red-400" />
                          ) : (
                            <Shield className="h-4 w-4 text-green-400" />
                          )}
                          <Badge
                            className={
                              email.isPhishing ? "bg-red-600/20 text-red-300" : "bg-green-600/20 text-green-300"
                            }
                          >
                            {email.isPhishing ? "Phishing" : "Legitimate"}
                          </Badge>
                          {email.technique && (
                            <Badge className="bg-purple-600/20 text-purple-300">
                              {email.technique.replace(/_/g, " ")}
                            </Badge>
                          )}
                          <span className="text-xs text-slate-500">ID: {email.id}</span>
                        </div>
                        <div className="text-slate-200 font-medium mb-1">{email.subject}</div>
                        <div className="text-sm text-slate-400 mb-2">From: {email.sender}</div>
                        <div className="text-sm text-slate-300 line-clamp-3">{email.content.substring(0, 200)}...</div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditEmail(level, email)}
                          disabled={showAddForm || editingEmail !== null}
                          className="border-blue-500/30 text-blue-300 hover:bg-blue-600/10"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteEmail(level, email.id)}
                          disabled={showAddForm || editingEmail !== null}
                          className="border-red-500/30 text-red-300 hover:bg-red-600/10"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
