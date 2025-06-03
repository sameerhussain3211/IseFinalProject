"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface GameOverProps {
  score: number
  bestScore: number
  onStartGame: () => void
  onResetGame: () => void
}

export default function GameOver({ score, bestScore, onStartGame, onResetGame }: GameOverProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/90 border-red-500/30 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-red-400">Game Over</CardTitle>
          <p className="text-slate-300">You ran out of hearts!</p>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="space-y-2">
            <div className="text-slate-300">
              Final Score: <span className="text-blue-300 font-semibold">{score}</span>
            </div>
            <div className="text-slate-300">
              Best Score: <span className="text-yellow-400 font-semibold">{bestScore}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Button onClick={onStartGame} className="w-full bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>
            <Button
              onClick={onResetGame}
              variant="outline"
              className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-600/10"
            >
              Main Menu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
