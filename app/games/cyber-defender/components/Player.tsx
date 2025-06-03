import type { Position } from "../types/game-types"

interface PlayerProps {
  position: Position
}

export default function Player({ position }: PlayerProps) {
  return (
    <div className="absolute transition-all duration-75" style={{ left: position.x, top: position.y }}>
      {/* Main fuselage */}
      <div className="relative w-16 h-10">
        {/* Body */}
        <div className="absolute w-12 h-6 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-r-full top-2 left-4 border border-cyan-300"></div>
        {/* Cockpit */}
        <div className="absolute w-6 h-4 bg-gradient-to-r from-blue-300 to-cyan-400 rounded-full top-3 left-6 border border-blue-200"></div>
        {/* Wings */}
        <div className="absolute w-8 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded top-1 left-2"></div>
        <div className="absolute w-8 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded bottom-1 left-2"></div>
        {/* Engine exhaust */}
        <div className="absolute w-3 h-1 bg-yellow-400 rounded-full top-4.5 left-0 animate-pulse shadow-lg shadow-yellow-400/50"></div>
        <div className="absolute w-2 h-1 bg-orange-400 rounded-full top-4.5 left-1 animate-pulse"></div>
        {/* Nose */}
        <div className="absolute w-2 h-3 bg-gradient-to-r from-cyan-300 to-blue-500 rounded-r-full top-3.5 right-0"></div>
      </div>
    </div>
  )
}
