"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Home, RotateCcw } from "lucide-react"
import type { Level } from "../hooks/use-game-state"

interface PauseScreenProps {
  score: number
  level: Level
  hearts: number
  onResume: () => void
  onRestart: () => void
  onMainMenu: () => void
}

export default function PauseScreen({ score, level, hearts, onResume, onRestart, onMainMenu }: PauseScreenProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="p-8 bg-slate-800/95 border-blue-500/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-100 text-center">Game Paused</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2 text-slate-300">
            <p>
              Level: <span className="text-blue-400">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
            </p>
            <p>
              Score: <span className="text-blue-400">{score}</span>
            </p>
            <p>
              Lives: <span className="text-red-400">{hearts}/5</span>
            </p>
          </div>

          <div className="bg-slate-700/50 p-4 rounded-lg text-sm text-slate-400">
            <p className="font-semibold text-blue-400 mb-2">Game Instructions:</p>
            <div className="space-y-1">
              <p>• Read each email carefully</p>
              <p>• Identify if it's a phishing attempt or legitimate</p>
              <p>• Click "Phishing" or "Legitimate" to answer</p>
              <p>• Earn 10 points for each correct answer</p>
              <p>• Lose a life for each wrong answer</p>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Button
              onClick={onResume}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
            >
              <Play className="w-4 h-4 mr-2" />
              Resume Game
            </Button>

            <Button
              onClick={onRestart}
              variant="outline"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/20 flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart Game
            </Button>

            <Button
              onClick={onMainMenu}
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500/20 flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Main Menu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
