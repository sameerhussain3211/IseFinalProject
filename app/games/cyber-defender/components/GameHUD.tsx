"use client"

import { Button } from "@/components/ui/button"
import { Heart, Pause, Home } from "lucide-react"

interface GameHUDProps {
  level: number
  score: number
  lives: number
  enemiesDestroyed: number
  nextEnemyTimer: number
  onPause: () => void
  onMainMenu: () => void
}

export default function GameHUD({
  level,
  score,
  lives,
  enemiesDestroyed,
  nextEnemyTimer,
  onPause,
  onMainMenu,
}: GameHUDProps) {
  return (
    <div className="flex justify-between items-center mb-4 text-white">
      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <span className="text-cyan-400">Level: {level}</span>
          <span className="text-cyan-400">Score: {score}</span>
          <span className="text-cyan-400 font-bold">
            Enemies: {enemiesDestroyed}/{10}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-red-400">Lives:</span>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Heart
                key={i}
                className={`w-6 h-6 ${i < lives ? "text-red-500 fill-red-500" : "text-gray-600 fill-gray-600"}`}
              />
            ))}
          </div>
          <span className="text-cyan-400 ml-2">({lives}/5)</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-cyan-400 text-sm">Next Enemy: {Math.ceil(nextEnemyTimer / 1000)}s</div>
        <div className="flex space-x-2">
          <Button
            onClick={onPause}
            variant="outline"
            size="sm"
            className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/20"
          >
            <Pause className="w-4 h-4 mr-1" />
            Pause
          </Button>
          <Button
            onClick={onMainMenu}
            variant="outline"
            size="sm"
            className="border-red-500 text-red-400 hover:bg-red-500/20"
          >
            <Home className="w-4 w-4 mr-1" />
            Menu
          </Button>
        </div>
      </div>
    </div>
  )
}
