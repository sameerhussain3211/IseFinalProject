"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface MenuScreenProps {
  onStartGame: () => void
  onBackToMain: () => void
}

export default function MenuScreen({ onStartGame, onBackToMain }: MenuScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <Card className="p-8 bg-slate-800/90 border-cyan-500/50 backdrop-blur">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">Cyber Defender</h1>
          <h2 className="text-2xl text-cyan-300">Sky Strike</h2>
          <p className="text-slate-300 max-w-md">
            Defend cyberspace from digital threats! Use your skills and cybersecurity knowledge to protect the digital
            realm.
          </p>
          <div className="space-y-2 text-sm text-slate-400">
            <p>🎮 WASD/Arrow Keys to move</p>
            <p>🔫 Spacebar to shoot</p>
            <p>🛡️ Click defense buttons to counter threats</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg text-sm text-slate-300">
            <p className="font-semibold text-cyan-400">Mission Objective:</p>
            <p>Defeat all 10 enemies with all 5 lives intact and all correct answers to win!</p>
            <p className="text-yellow-400 mt-2">Each threat has 1 correct and 3 wrong defense options!</p>
          </div>
          <div className="space-y-3">
            <Button onClick={onStartGame} className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 w-full">
              Start Mission
            </Button>
            <Button
              onClick={onBackToMain}
              variant="outline"
              className="border-blue-500/30 text-blue-300 hover:bg-blue-600/10 w-full"
            >
              Back to HackShield
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
