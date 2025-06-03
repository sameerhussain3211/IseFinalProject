"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import type { Level } from "../hooks/use-game-state"

interface LevelCompleteProps {
  score: number
  hearts: number
  currentLevel: Level
  onNextLevel: () => void
}

export default function LevelComplete({ score, hearts, currentLevel, onNextLevel }: LevelCompleteProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/90 border-blue-500/30 backdrop-blur">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="h-16 w-16 text-yellow-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-100">Level Complete!</CardTitle>
          <p className="text-slate-300">Great job detecting those emails!</p>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="space-y-2">
            <div className="text-slate-300">
              Current Score: <span className="text-blue-300 font-semibold">{score}</span>
            </div>
            <div className="text-slate-300">
              Hearts Remaining: <span className="text-red-400 font-semibold">{hearts}</span>
            </div>
          </div>
          <Button onClick={onNextLevel} className="w-full bg-blue-600 hover:bg-blue-700">
            Continue to {currentLevel === "medium" ? "Hard" : "Next"} Level
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
