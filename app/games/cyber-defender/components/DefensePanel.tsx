"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Enemy, DefenseOption } from "../types/game-types"
import { ENEMY_TYPES } from "../utils/constants"

interface DefensePanelProps {
  enemy: Enemy
  options: DefenseOption[]
  onSelect: (option: DefenseOption) => void
}

export default function DefensePanel({ enemy, options, onSelect }: DefensePanelProps) {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10">
      <Card className="p-4 bg-slate-800/95 border-yellow-500/70 backdrop-blur-sm shadow-2xl w-80">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-yellow-400 font-bold text-lg">🚨 THREAT DETECTED</h3>
            <p className="text-red-400 font-semibold">{ENEMY_TYPES[enemy.type].name}</p>
            <p className="text-slate-300 text-sm mt-2">Choose the correct defense:</p>
            <p className="text-yellow-400 text-xs">1 correct, 3 wrong options</p>
          </div>
          <div className="text-center mb-2">
            <div className="text-yellow-400 text-sm">Time to respond: 8 seconds</div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {options.map((option) => (
              <Button
                key={option.id}
                onClick={() => onSelect(option)}
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 text-left justify-start h-auto py-3 px-4"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
