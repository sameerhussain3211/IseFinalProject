"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PhishingTechnique } from "../data/email-data"
import type { GameState } from "../hooks/use-game-state"
import { techniqueNames } from "../utils/game-utils"

interface StatisticsProps {
  techniqueStats: Record<PhishingTechnique, { correct: number; total: number }>
  bestScore: number
  onSetGameState: (state: GameState) => void
}

export default function Statistics({ techniqueStats, bestScore, onSetGameState }: StatisticsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800/90 border-blue-500/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-100 flex items-center">
            📊 Performance Statistics
          </CardTitle>
          <p className="text-slate-300">Your performance by phishing technique</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(techniqueStats).map(([technique, stats]) => {
            const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
            const hasData = stats.total > 0

            return (
              <div key={technique} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">{techniqueNames[technique as PhishingTechnique]}</span>
                  <div className="text-right">
                    <span className="text-slate-400 text-sm">
                      {stats.correct}/{stats.total}
                    </span>
                    {hasData && (
                      <span
                        className={`ml-2 font-semibold ${
                          percentage >= 80 ? "text-green-400" : percentage >= 60 ? "text-yellow-400" : "text-red-400"
                        }`}
                      >
                        {percentage}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      percentage >= 80 ? "bg-green-500" : percentage >= 60 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: hasData ? `${percentage}%` : "0%" }}
                  />
                </div>
                {!hasData && <p className="text-slate-500 text-xs">No attempts yet</p>}
              </div>
            )
          })}

          <div className="pt-4 border-t border-slate-600">
            <div className="text-center space-y-2">
              <div className="text-slate-300">
                Overall Best Score: <span className="text-yellow-400 font-semibold">{bestScore}</span>
              </div>
              <div className="text-xs text-slate-400">
                Play more games to improve your technique-specific performance!
              </div>
            </div>
          </div>

          <Button onClick={() => onSetGameState("menu")} className="w-full bg-blue-600 hover:bg-blue-700">
            Back to Menu
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
