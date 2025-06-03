import { Shield, Bug, Rocket, Wifi, Bomb } from "lucide-react"
import type { Enemy } from "../types/game-types"
import { ENEMY_TYPES } from "../utils/constants"

interface EnemyComponentProps {
  enemy: Enemy
}

export default function EnemyComponent({ enemy }: EnemyComponentProps) {
  const baseStyle = "absolute flex items-center justify-center rounded-lg border-2 shadow-lg"

  const renderEnemy = () => {
    switch (enemy.type) {
      case "phishing":
        return (
          <div className={`${baseStyle} w-20 h-16 bg-gradient-to-r from-yellow-600 to-yellow-800 border-yellow-400`}>
            <div className="text-center">
              <Shield className="w-8 h-8 text-yellow-200 mx-auto" />
              <div className="text-xs text-yellow-200 font-bold">PHISH</div>
            </div>
          </div>
        )
      case "ransomware":
        return (
          <div className={`${baseStyle} w-20 h-16 bg-gradient-to-r from-red-700 to-red-900 border-red-400`}>
            <div className="text-center">
              <Rocket className="w-8 h-8 text-red-200 mx-auto" />
              <div className="text-xs text-red-200 font-bold">RANSOM</div>
            </div>
          </div>
        )
      case "ddos":
        return (
          <div className={`${baseStyle} w-20 h-16 bg-gradient-to-r from-purple-600 to-purple-800 border-purple-400`}>
            <div className="text-center">
              <Wifi className="w-8 h-8 text-purple-200 mx-auto" />
              <div className="text-xs text-purple-200 font-bold">DDoS</div>
            </div>
          </div>
        )
      case "zeroday":
        return (
          <div className={`${baseStyle} w-20 h-16 bg-gradient-to-r from-orange-600 to-orange-800 border-orange-400`}>
            <div className="text-center">
              <Bomb className="w-8 h-8 text-orange-200 mx-auto" />
              <div className="text-xs text-orange-200 font-bold">0-DAY</div>
            </div>
          </div>
        )
      case "malware":
        return (
          <div className={`${baseStyle} w-20 h-16 bg-gradient-to-r from-green-600 to-green-800 border-green-400`}>
            <div className="text-center">
              <Bug className="w-8 h-8 text-green-200 mx-auto" />
              <div className="text-xs text-green-200 font-bold">MALWARE</div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="absolute" style={{ left: enemy.position.x, top: enemy.position.y }}>
      {renderEnemy()}
      {/* Health bar */}
      <div className="absolute -top-3 left-0 w-full h-1 bg-gray-600 rounded">
        <div
          className="h-full bg-red-500 rounded transition-all duration-200"
          style={{ width: `${(enemy.health / ENEMY_TYPES[enemy.type].health) * 100}%` }}
        />
      </div>
      {/* Enemy Name Label */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <span className="text-xs font-semibold px-2 py-1 bg-slate-900/80 text-yellow-400 rounded border border-yellow-500/50">
          {ENEMY_TYPES[enemy.type].name}
        </span>
      </div>
    </div>
  )
}
