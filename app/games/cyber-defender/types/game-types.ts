// Define the core game types
export interface Position {
  x: number
  y: number
}

export interface Enemy {
  id: string
  type: EnemyType
  position: Position
  health: number
  speed: number
  damage: number
  defenseShown: boolean
  defenseOptions?: DefenseOption[]
}

export interface Bullet {
  id: string
  position: Position
  velocity: Position
}

export interface DefenseOption {
  id: string
  label: string
  correct: boolean
}

export interface EnemyConfig {
  name: string
  icon: string
  color: string
  health: number
  speed: number
  damage: number
}

export type EnemyType = "phishing" | "ransomware" | "ddos" | "zeroday" | "malware"
export type GameState = "menu" | "playing" | "paused" | "gameOver" | "levelComplete" | "victory"
