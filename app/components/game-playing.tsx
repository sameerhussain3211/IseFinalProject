"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Mail, Pause, Home } from "lucide-react"
import type { Email } from "../data/email-data"
import type { Level } from "../hooks/use-game-state"

interface GamePlayingProps {
  currentLevel: Level
  score: number
  hearts: number
  currentEmailIndex: number
  emails: Email[]
  currentEmail: Email
  showFeedback: boolean
  feedback: string
  onHandleAnswer: (answer: boolean) => void
  onNextEmail: () => void
  onPause: () => void
  onMainMenu: () => void
}

export default function GamePlaying({
  currentLevel,
  score,
  hearts,
  currentEmailIndex,
  emails,
  currentEmail,
  showFeedback,
  feedback,
  onHandleAnswer,
  onNextEmail,
  onPause,
  onMainMenu,
}: GamePlayingProps) {
  const progress = ((currentEmailIndex + 1) / emails.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-blue-500/30 text-blue-300">
              Level: {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}
            </Badge>
            <Badge variant="outline" className="border-green-500/30 text-green-300">
              Score: {score}
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart key={i} className={`h-6 w-6 ${i < hearts ? "text-red-500 fill-red-500" : "text-slate-600"}`} />
              ))}
            </div>

            {/* Add pause and back buttons */}
            <div className="flex space-x-2">
              <Button
                onClick={onPause}
                variant="outline"
                size="sm"
                className="border-yellow-500/30 text-yellow-300 hover:bg-yellow-600/10"
              >
                <Pause className="h-4 w-4 mr-1" />
                Pause
              </Button>
              <Button
                onClick={onMainMenu}
                variant="outline"
                size="sm"
                className="border-red-500/30 text-red-300 hover:bg-red-600/10"
              >
                <Home className="h-4 w-4 mr-1" />
                Menu
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
          <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        {/* Email Display */}
        <Card className="bg-slate-800/90 border-blue-500/30 backdrop-blur mb-6">
          <CardHeader>
            <div className="flex items-center space-x-2 text-slate-300">
              <Mail className="h-5 w-5" />
              <span className="text-sm">
                Email {currentEmailIndex + 1} of {emails.length}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-slate-400">
                From: <span className="text-slate-200">{currentEmail.sender}</span>
              </div>
              <div className="text-sm text-slate-400">
                Subject: <span className="text-slate-200">{currentEmail.subject}</span>
              </div>
            </div>

            <div className="border-t border-slate-600 pt-4">
              <div className="text-slate-200 leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto">
                {currentEmail.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Answer Buttons */}
        {!showFeedback ? (
          <div className="flex space-x-4 justify-center">
            <Button
              onClick={() => onHandleAnswer(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
              size="lg"
            >
              🎣 Phishing
            </Button>
            <Button
              onClick={() => onHandleAnswer(false)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              size="lg"
            >
              ✅ Legitimate
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div
              className={`text-lg font-semibold ${feedback.startsWith("Correct") ? "text-green-400" : "text-red-400"}`}
            >
              {feedback}
            </div>
            <Button onClick={onNextEmail} className="bg-blue-600 hover:bg-blue-700">
              {hearts <= 0 ? "Game Over" : "Next Email"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
