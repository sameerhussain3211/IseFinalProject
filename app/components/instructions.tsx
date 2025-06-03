"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import type { GameState } from "../hooks/use-game-state"

interface InstructionsProps {
  onSetGameState: (state: GameState) => void
}

export default function Instructions({ onSetGameState }: InstructionsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800/90 border-blue-500/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-100 flex items-center">
            <BookOpen className="h-6 w-6 mr-2" />
            How to Play Phishing Email Hunt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-300">
          <div>
            <h3 className="font-semibold text-blue-300 mb-2">What is Phishing?</h3>
            <p>
              Phishing is a cyber attack where criminals send fake emails pretending to be from legitimate organizations
              to steal your personal information, passwords, or money.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-blue-300 mb-2">Game Rules:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>You have 5 hearts (lives) to complete all three levels</li>
              <li>Each level has 8 emails in random order</li>
              <li>Read each email carefully and decide if it's phishing or legitimate</li>
              <li>Lose a heart for each wrong answer</li>
              <li>Complete all levels to win the game</li>
              <li>Earn 10 points for each correct answer</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-blue-300 mb-2">Red Flags to Look For:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Urgent language and threats</li>
              <li>Suspicious sender addresses (typos, wrong domains)</li>
              <li>Requests for personal information</li>
              <li>Poor grammar and spelling</li>
              <li>Unexpected attachments or links</li>
              <li>Too-good-to-be-true offers</li>
            </ul>
          </div>

          <Button onClick={() => onSetGameState("menu")} className="w-full bg-blue-600 hover:bg-blue-700">
            Back to Menu
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
