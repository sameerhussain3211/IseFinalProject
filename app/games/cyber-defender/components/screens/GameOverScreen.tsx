"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface GameOverScreenProps {
  score: number
  level: number
  onRestart: () => void
  onMainMenu: () => void
}

export default function GameOverScreen({ score, level, onRestart, onMainMenu }: GameOverScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-900 via-slate-900 to-red-900">
      <Card className="p-8 bg-slate-800/90 border-red-500/50 backdrop-blur">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-red-400">Mission Failed</h1>
          <p className="text-slate-300">The cyber threats have overwhelmed your defenses!</p>
          <div className="space-y-2">
            <p className="text-cyan-400">Final Score: {score}</p>
            <p className="text-cyan-400">Level Reached: {level}</p>
          </div>
          <div className="space-y-2">
            <Button onClick={onRestart} className="bg-cyan-600 hover:bg-cyan-700 text-white mr-4">
              Try Again
            </Button>
            <Button onClick={onMainMenu} variant="outline" className="border-cyan-500 text-cyan-400">
              Main Menu
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
