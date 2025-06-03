"use client"

import { GAME_WIDTH, GAME_HEIGHT } from "../utils/constants"
import Player from "./Player"
import EnemyComponent from "./Enemy"
import BulletComponent from "./Bullet"
import WrongAnswerNotification from "./WrongAnswerNotification"
import DefensePanel from "./DefensePanel"
import type { Enemy, Bullet, DefenseOption, Position } from "../types/game-types"

interface GameAreaProps {
  playerPos: Position
  enemies: Enemy[]
  bullets: Bullet[]
  wrongAnswer: boolean
  activeDefense: { enemy: Enemy; options: DefenseOption[] } | null
  onDefenseChoice: (option: DefenseOption) => void
}

export default function GameArea({
  playerPos,
  enemies,
  bullets,
  wrongAnswer,
  activeDefense,
  onDefenseChoice,
}: GameAreaProps) {
  return (
    <div
      className="relative bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-cyan-500/50 rounded-lg overflow-hidden"
      style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse"></div>
      </div>

      {/* Wrong Answer Notification */}
      <WrongAnswerNotification show={wrongAnswer} />

      {/* Player */}
      <Player position={playerPos} />

      {/* Bullets */}
      {bullets.map((bullet) => (
        <BulletComponent key={bullet.id} bullet={bullet} />
      ))}

      {/* Enemies */}
      {enemies.map((enemy) => (
        <EnemyComponent key={enemy.id} enemy={enemy} />
      ))}

      {/* Defense Panel */}
      {activeDefense && (
        <DefensePanel enemy={activeDefense.enemy} options={activeDefense.options} onSelect={onDefenseChoice} />
      )}
    </div>
  )
}
