"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Plus, Edit, Trash2, Save, X } from "lucide-react"
import { quizQuestions, type QuizQuestion } from "../../data/quiz-data"

export default function QuizManagement() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(quizQuestions)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState({
    topic: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
  })

  const resetForm = () => {
    setFormData({
      topic: "",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
    })
  }

  const handleAddQuestion = () => {
    if (!formData.topic || !formData.question || formData.options.some((opt) => !opt) || !formData.explanation) {
      setMessage("Please fill in all fields")
      return
    }

    const newQuestion: QuizQuestion = {
      id: Math.max(...questions.map((q) => q.id)) + 1,
      ...formData,
    }

    setQuestions([...questions, newQuestion])
    setMessage("Question added successfully")
    setShowAddForm(false)
    resetForm()
  }

  const handleEditQuestion = (question: QuizQuestion) => {
    setFormData({
      topic: question.topic,
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    })
    setEditingId(question.id)
  }

  const handleUpdateQuestion = () => {
    if (!formData.topic || !formData.question || formData.options.some((opt) => !opt) || !formData.explanation) {
      setMessage("Please fill in all fields")
      return
    }

    setQuestions(
      questions.map((q) =>
        q.id === editingId
          ? {
              ...q,
              ...formData,
            }
          : q,
      ),
    )

    setMessage("Question updated successfully")
    setEditingId(null)
    resetForm()
  }

  const handleDeleteQuestion = (id: number) => {
    if (!confirm("Are you sure you want to delete this question?")) return

    setQuestions(questions.filter((q) => q.id !== id))
    setMessage("Question deleted successfully")
  }

  const topics = Array.from(new Set(questions.map((q) => q.topic)))

  return (
    <Card className="bg-slate-800/90 border-blue-500/30 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-blue-100 flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Quiz Question Management
          </CardTitle>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 hover:bg-green-700"
            disabled={showAddForm || editingId !== null}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {message && (
          <Alert className="border-blue-500/30 bg-blue-500/10">
            <AlertDescription className="text-blue-400">{message}</AlertDescription>
          </Alert>
        )}

        {/* Add/Edit Form */}
        {(showAddForm || editingId !== null) && (
          <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <h3 className="text-lg font-medium text-slate-200 mb-4">
              {editingId ? "Edit Question" : "Add New Question"}
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Topic</Label>
                <Input
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="bg-slate-600 border-slate-500 text-slate-100"
                  placeholder="e.g., Phishing & Malware"
                />
              </div>

              <div>
                <Label className="text-slate-300">Question</Label>
                <Textarea
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="bg-slate-600 border-slate-500 text-slate-100"
                  placeholder="Enter the question..."
                />
              </div>

              <div>
                <Label className="text-slate-300">Answer Options</Label>
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...formData.options]
                        newOptions[index] = e.target.value
                        setFormData({ ...formData, options: newOptions })
                      }}
                      className="bg-slate-600 border-slate-500 text-slate-100"
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant={formData.correctAnswer === index ? "default" : "outline"}
                      onClick={() => setFormData({ ...formData, correctAnswer: index })}
                      className={
                        formData.correctAnswer === index
                          ? "bg-green-600 hover:bg-green-700"
                          : "border-slate-500 text-slate-300"
                      }
                    >
                      {formData.correctAnswer === index ? "Correct" : "Mark Correct"}
                    </Button>
                  </div>
                ))}
              </div>

              <div>
                <Label className="text-slate-300">Explanation</Label>
                <Textarea
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  className="bg-slate-600 border-slate-500 text-slate-100"
                  placeholder="Explain why this is the correct answer..."
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={editingId ? handleUpdateQuestion : handleAddQuestion}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingId ? "Update" : "Add"} Question
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingId(null)
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

        {/* Questions List */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-slate-300">Topics:</span>
            {topics.map((topic) => (
              <Badge key={topic} className="bg-blue-600/20 text-blue-300">
                {topic} ({questions.filter((q) => q.topic === topic).length})
              </Badge>
            ))}
          </div>

          {questions.map((question) => (
            <div key={question.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className="bg-purple-600/20 text-purple-300">{question.topic}</Badge>
                    <span className="text-xs text-slate-500">ID: {question.id}</span>
                  </div>
                  <div className="text-slate-200 font-medium mb-2">{question.question}</div>
                  <div className="space-y-1 mb-2">
                    {question.options.map((option, index) => (
                      <div
                        key={index}
                        className={`text-sm p-2 rounded ${
                          index === question.correctAnswer
                            ? "bg-green-600/20 text-green-300 border border-green-500/30"
                            : "bg-slate-600/50 text-slate-300"
                        }`}
                      >
                        {index + 1}. {option}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-slate-400">
                    <strong>Explanation:</strong> {question.explanation}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditQuestion(question)}
                    disabled={showAddForm || editingId !== null}
                    className="border-blue-500/30 text-blue-300 hover:bg-blue-600/10"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteQuestion(question.id)}
                    disabled={showAddForm || editingId !== null}
                    className="border-red-500/30 text-red-300 hover:bg-red-600/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {questions.length === 0 && <div className="text-center text-slate-400 py-8">No quiz questions available</div>}
      </CardContent>
    </Card>
  )
}
