"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Trophy, Target, BookOpen } from "lucide-react"
import { authUtils } from "../../utils/auth-utils"

interface PlayerProgress {
  userId: string
  username: string
  email: string
  gameScores: {
    phishingEmailHunt: { bestScore: number; gamesPlayed: number; lastPlayed: string }
    quiz: { averageScore: number; quizzesCompleted: number; lastPlayed: string }
  }
  joinDate: string
}

export default function PlayerProgress() {
  const [progress, setProgress] = useState<PlayerProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = async () => {
    try {
      const data = await authUtils.getPlayerProgress()
      setProgress(data)
    } catch (error) {
      console.error("Failed to load player progress")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-slate-800/90 border-blue-500/30 backdrop-blur">
        <CardContent className="p-6">
          <div className="text-center text-slate-300">Loading player progress...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800/90 border-blue-500/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl text-blue-100 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Player Progress & Scores
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {progress.map((player) => (
          <div key={player.userId} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-slate-200 font-medium">{player.username}</div>
                <div className="text-sm text-slate-400">{player.email}</div>
                <div className="text-xs text-slate-500">
                  Member since: {new Date(player.joinDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phishing Email Hunt Game */}
              <div className="p-3 bg-slate-600/50 rounded border border-slate-500">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-300 font-medium">Phishing Email Hunt</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Best Score:</span>
                    <Badge className="bg-yellow-600/20 text-yellow-300">
                      <Trophy className="h-3 w-3 mr-1" />
                      {player.gameScores.phishingEmailHunt.bestScore}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Games Played:</span>
                    <span className="text-slate-200">{player.gameScores.phishingEmailHunt.gamesPlayed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Played:</span>
                    <span className="text-slate-200">{player.gameScores.phishingEmailHunt.lastPlayed}</span>
                  </div>
                </div>
              </div>

              {/* Quiz Game */}
              <div className="p-3 bg-slate-600/50 rounded border border-slate-500">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="h-4 w-4 text-green-400" />
                  <span className="text-green-300 font-medium">Cybersecurity Quiz</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Average Score:</span>
                    <Badge
                      className={`${
                        player.gameScores.quiz.averageScore >= 80
                          ? "bg-green-600/20 text-green-300"
                          : player.gameScores.quiz.averageScore >= 60
                            ? "bg-yellow-600/20 text-yellow-300"
                            : "bg-red-600/20 text-red-300"
                      }`}
                    >
                      {player.gameScores.quiz.averageScore}%
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Quizzes Completed:</span>
                    <span className="text-slate-200">{player.gameScores.quiz.quizzesCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Played:</span>
                    <span className="text-slate-200">{player.gameScores.quiz.lastPlayed}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {progress.length === 0 && (
          <div className="text-center text-slate-400 py-8">No player progress data available</div>
        )}
      </CardContent>
    </Card>
  )
}
