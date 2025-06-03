"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"

interface GameWonProps {
  score: number
  hearts: number
  bestScore: number
  onStartGame: () => void
  onResetGame: () => void
}

export default function GameWon({ score, hearts, bestScore, onStartGame, onResetGame }: GameWonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/90 border-green-500/30 backdrop-blur">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-400">Congratulations!</CardTitle>
          <p className="text-slate-300">You've completed all levels and become a phishing detection expert!</p>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="space-y-2">
            <div className="text-slate-300">
              Final Score: <span className="text-blue-300 font-semibold">{score}</span>
            </div>
            <div className="text-slate-300">
              Hearts Remaining: <span className="text-red-400 font-semibold">{hearts}</span>
            </div>
            {score === bestScore && <Badge className="bg-yellow-600/20 text-yellow-300">New Best Score!</Badge>}
          </div>
          <div className="space-y-2">
            <Button onClick={onStartGame} className="w-full bg-blue-600 hover:bg-blue-700">
              Play Again
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
