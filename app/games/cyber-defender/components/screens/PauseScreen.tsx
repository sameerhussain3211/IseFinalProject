"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, RotateCcw, Home } from "lucide-react"

interface PauseScreenProps {
  score: number
  level: number
  lives: number
  onResume: () => void
  onRestart: () => void
  onMainMenu: () => void
}

export default function PauseScreen({ score, level, lives, onResume, onRestart, onMainMenu }: PauseScreenProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="p-8 bg-slate-800/95 border-cyan-500/50 backdrop-blur">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-cyan-400">Game Paused</h1>

          <div className="space-y-2 text-slate-300">
            <p>
              Level: <span className="text-cyan-400">{level}</span>
            </p>
            <p>
              Score: <span className="text-cyan-400">{score}</span>
            </p>
            <p>
              Lives: <span className="text-red-400">{lives}/5</span>
            </p>
          </div>

          <div className="bg-slate-700/50 p-4 rounded-lg text-sm text-slate-400">
            <p className="font-semibold text-cyan-400 mb-2">Controls:</p>
            <div className="space-y-1">
              <p>🎮 WASD/Arrow Keys to move</p>
              <p>🔫 Spacebar to shoot</p>
              <p>🛡️ Click defense buttons to counter threats</p>
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
              Restart Level
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
        </div>
      </Card>
    </div>
  )
}
