"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Target, Trophy, BookOpen, LogOut, User, Rocket } from "lucide-react"
import type { GameState } from "../hooks/use-game-state"
import type { User as UserType } from "../types/auth"

interface MainMenuProps {
  bestScore: number
  user: UserType | null
  onStartGame: () => void
  onStartCyberDefender: () => void
  onSetGameState: (state: GameState) => void
  onLogout: () => void
}

export default function MainMenu({
  bestScore,
  user,
  onStartGame,
  onStartCyberDefender,
  onSetGameState,
  onLogout,
}: MainMenuProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/90 border-blue-500/30 backdrop-blur">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-blue-400" />
          </div>
          <CardTitle className="text-3xl font-bold text-blue-100">HackShield</CardTitle>
          <p className="text-slate-300">Your cybersecurity training platform</p>

          {user && (
            <div className="flex items-center justify-center space-x-2 mt-4 p-2 bg-slate-700/50 rounded-lg">
              <User className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm">Welcome, {user.username}!</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Best Score:</span>
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
              <Trophy className="h-3 w-3 mr-1" />
              {bestScore}
            </Badge>
          </div>
          <Button onClick={onStartCyberDefender} className="w-full bg-cyan-600 hover:bg-cyan-700">
            <Rocket className="h-4 w-4 mr-2" />
            Cyber Defender: Sky Strike
          </Button>
          <Button onClick={onStartGame} className="w-full bg-blue-600 hover:bg-blue-700">
            <Target className="h-4 w-4 mr-2" />
            Phishing Email Hunt
          </Button>
          <Button onClick={() => onSetGameState("quiz")} className="w-full bg-green-600 hover:bg-green-700">
            <BookOpen className="h-4 w-4 mr-2" />
            Cybersecurity Quiz
          </Button>
          <Button
            onClick={() => onSetGameState("instructions")}
            variant="outline"
            className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-600/10"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Instructions
          </Button>
          <Button
            onClick={() => onSetGameState("statistics")}
            variant="outline"
            className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-600/10"
          >
            📊 Statistics
          </Button>

          {user && (
            <Button
              onClick={onLogout}
              variant="outline"
              className="w-full border-red-500/30 text-red-300 hover:bg-red-600/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
