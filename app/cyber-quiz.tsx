"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { quizQuestions, type QuizQuestion } from "./data/quiz-data"

type QuizState = "topics" | "questions" | "results"

// Change the component definition to accept a prop for returning to the main menu
export default function CyberSecurityQuiz({ returnToMainMenu }: { returnToMainMenu: () => void }) {
  const [quizState, setQuizState] = useState<QuizState>("topics")
  const [selectedTopic, setSelectedTopic] = useState<string>("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [topicQuestions, setTopicQuestions] = useState<QuizQuestion[]>([])

  // Get unique topics from questions
  const topics = Array.from(new Set(quizQuestions.map((q) => q.topic)))

  const selectTopic = (topic: string) => {
    const filteredQuestions = quizQuestions.filter((q) => q.topic === topic)
    setTopicQuestions(filteredQuestions)
    setSelectedTopic(topic)
    setCurrentQuestionIndex(0)
    setScore(0)
    setAnsweredQuestions([])
    setQuizState("questions")
  }

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || answeredQuestions.includes(currentQuestionIndex)) return

    setSelectedAnswer(answerIndex)

    const currentQuestion = topicQuestions[currentQuestionIndex]
    const isCorrect = answerIndex === currentQuestion.correctAnswer

    if (isCorrect) {
      setScore((prev) => prev + 1)
    }

    setAnsweredQuestions((prev) => [...prev, currentQuestionIndex])
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)

    if (currentQuestionIndex < topicQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setQuizState("results")
    }
  }

  const restartQuiz = () => {
    setQuizState("topics")
    setSelectedTopic("")
    setCurrentQuestionIndex(0)
    setScore(0)
    setAnsweredQuestions([])
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  // Topic Selection Screen
  if (quizState === "topics") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-slate-800/90 border-blue-500/30 backdrop-blur">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-16 w-16 text-blue-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-blue-100">Cybersecurity Quiz</CardTitle>
            <p className="text-slate-300">Test your knowledge on various cybersecurity topics</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-300 mb-4">Select a topic to begin:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topics.map((topic) => (
                <Button
                  key={topic}
                  onClick={() => selectTopic(topic)}
                  className="bg-slate-700 hover:bg-blue-700 text-left h-auto py-3"
                >
                  <div>
                    <div className="font-medium">{topic}</div>
                    <div className="text-xs text-slate-300 mt-1">
                      {quizQuestions.filter((q) => q.topic === topic).length} questions
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={returnToMainMenu}
              variant="outline"
              className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-600/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Main Menu
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Questions Screen
  if (quizState === "questions") {
    const currentQuestion = topicQuestions[currentQuestionIndex]
    const isAnswered = selectedAnswer !== null
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-slate-800/90 border-blue-500/30 backdrop-blur">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                {selectedTopic}
              </Badge>
              <Badge variant="outline" className="border-green-500/30 text-green-300">
                Question {currentQuestionIndex + 1} of {topicQuestions.length}
              </Badge>
            </div>
            <CardTitle className="text-xl font-bold text-blue-100">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={`w-full justify-start text-left h-auto py-3 px-4 ${
                    selectedAnswer === index
                      ? isCorrect
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-red-600 hover:bg-red-600"
                      : isAnswered && index === currentQuestion.correctAnswer
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-slate-700 hover:bg-blue-700"
                  }`}
                >
                  <div className="flex items-start">
                    {isAnswered && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    {isAnswered && selectedAnswer === index && !isCorrect && (
                      <XCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <span>{option}</span>
                  </div>
                </Button>
              ))}
            </div>

            {showExplanation && (
              <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-sm text-slate-300">{currentQuestion.explanation}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={restartQuiz}
              variant="outline"
              className="border-blue-500/30 text-blue-300 hover:bg-blue-600/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Topics
            </Button>
            {isAnswered && (
              <Button onClick={nextQuestion} className="bg-blue-600 hover:bg-blue-700">
                {currentQuestionIndex < topicQuestions.length - 1 ? "Next Question" : "See Results"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Results Screen
  if (quizState === "results") {
    const percentage = Math.round((score / topicQuestions.length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/90 border-blue-500/30 backdrop-blur">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-16 w-16 text-blue-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-blue-100">Quiz Results</CardTitle>
            <p className="text-slate-300">{selectedTopic}</p>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="text-5xl font-bold text-blue-100 mb-2">{percentage}%</div>
            <p className="text-xl text-slate-300">
              You scored <span className="text-blue-300 font-semibold">{score}</span> out of{" "}
              <span className="text-blue-300 font-semibold">{topicQuestions.length}</span>
            </p>

            <div className="pt-4">
              {percentage >= 80 ? (
                <p className="text-green-400">Excellent! You have strong knowledge in this area.</p>
              ) : percentage >= 60 ? (
                <p className="text-yellow-400">
                  Good job! You have decent knowledge, but there's room for improvement.
                </p>
              ) : (
                <p className="text-red-400">You might want to study this topic more. Keep learning!</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button onClick={() => selectTopic(selectedTopic)} className="w-full bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>
            <Button
              onClick={restartQuiz}
              variant="outline"
              className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-600/10"
            >
              Choose Another Topic
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return null
}
