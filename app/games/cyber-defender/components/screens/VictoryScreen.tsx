"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface VictoryScreenProps {
  score: number
  level: number
  onNextLevel: () => void
}

export default function VictoryScreen({ score, level, onNextLevel }: VictoryScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-cyan-900 via-slate-900 to-blue-900">
      <Card className="p-8 bg-slate-800/90 border-cyan-500/50 backdrop-blur max-w-md">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-cyan-400">PERFECT VICTORY!</h1>
          <p className="text-slate-300">You've mastered cybersecurity defenses with a flawless performance!</p>
          <div className="space-y-2">
            <p className="text-cyan-400">Perfect Score: {score}</p>
            <p className="text-cyan-400">Level: {level}</p>
            <p className="text-green-400">All 5 Lives Preserved!</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <h3 className="text-cyan-400 font-semibold mb-2">💡 Cybersecurity Expert:</h3>
            <p className="text-sm text-slate-300">
              Your perfect understanding of cyber threats makes you an elite defender of digital realms!
            </p>
          </div>
          <div className="space-y-2">
            <Button onClick={onNextLevel} className="bg-cyan-600 hover:bg-cyan-700 text-white">
              Next Challenge
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
