"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CYBERSECURITY_TIPS } from "../../utils/constants"

interface LevelCompleteScreenProps {
  score: number
  level: number
  lives: number
  onNextLevel: () => void
}

export default function LevelCompleteScreen({ score, level, lives, onNextLevel }: LevelCompleteScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-900 via-slate-900 to-green-900">
      <Card className="p-8 bg-slate-800/90 border-green-500/50 backdrop-blur max-w-md">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-400">Level Complete!</h1>
          <p className="text-slate-300">Excellent work, Cyber Defender!</p>
          <div className="space-y-2">
            <p className="text-cyan-400">Score: {score}</p>
            <p className="text-cyan-400">Level: {level}</p>
            <p className="text-yellow-400">Lives Remaining: {lives}/5</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <h3 className="text-cyan-400 font-semibold mb-2">💡 Cybersecurity Tip:</h3>
            <p className="text-sm text-slate-300">{CYBERSECURITY_TIPS[(level - 1) % CYBERSECURITY_TIPS.length]}</p>
          </div>
          <Button onClick={onNextLevel} className="bg-cyan-600 hover:bg-cyan-700 text-white">
            Next Level
          </Button>
        </div>
      </Card>
    </div>
  )
}
