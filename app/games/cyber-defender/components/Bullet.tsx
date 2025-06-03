import type { Bullet } from "../types/game-types"

interface BulletComponentProps {
  bullet: Bullet
}

export default function BulletComponent({ bullet }: BulletComponentProps) {
  return (
    <div
      className="absolute w-4 h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full shadow-lg shadow-yellow-400/50"
      style={{ left: bullet.position.x, top: bullet.position.y }}
    />
  )
}
