"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Bug, Rocket, Wifi, Bomb, AlertTriangle, Heart, Pause, Home, Play, RotateCcw } from "lucide-react"
import CyberDefenderGame from "../games/cyber-defender/CyberDefenderGame"

// ==================== TYPES ====================
interface Position {
  x: number
  y: number
}

interface Enemy {
  id: string
  type: "phishing" | "ransomware" | "ddos" | "zeroday" | "malware"
  position: Position
  health: number
  speed: number
  damage: number
  defenseShown: boolean
  defenseOptions?: DefenseOption[]
}

interface Bullet {
  id: string
  position: Position
  velocity: Position
}

interface DefenseOption {
  id: string
  label: string
  correct: boolean
}

interface EnemyConfig {
  name: string
  icon: string
  color: string
  health: number
  speed: number
  damage: number
}

type GameState = "menu" | "playing" | "paused" | "gameOver" | "levelComplete" | "victory"

// ==================== CONSTANTS ====================
const GAME_WIDTH = 800
const GAME_HEIGHT = 600
const ENEMIES_PER_LEVEL = 10

// Defense options pool
const DEFENSE_OPTIONS = {
  phishing: {
    correct: [
      { id: "p1", label: "Enable 2FA" },
      { id: "p2", label: "Verify Email Source" },
      { id: "p3", label: "Check URLs Before Clicking" },
      { id: "p4", label: "Use Email Filtering" },
      { id: "p5", label: "Report Suspicious Emails" },
    ],
    wrong: [
      { id: "p6", label: "Click Suspicious Links" },
      { id: "p7", label: "Share Password via Email" },
      { id: "p8", label: "Ignore Email Warnings" },
      { id: "p9", label: "Download Unknown Attachments" },
      { id: "p10", label: "Reply with Personal Information" },
      { id: "p11", label: "Disable Email Security" },
      { id: "p12", label: "Use Same Password Everywhere" },
    ],
  },
  ransomware: {
    correct: [
      { id: "r1", label: "Backup Data Regularly" },
      { id: "r2", label: "Install Security Updates" },
      { id: "r3", label: "Use Ransomware Protection" },
      { id: "r4", label: "Implement Access Controls" },
      { id: "r5", label: "Use Email Scanning" },
    ],
    wrong: [
      { id: "r6", label: "Pay Ransom Immediately" },
      { id: "r7", label: "Disable Security Software" },
      { id: "r8", label: "Ignore Warning Messages" },
      { id: "r9", label: "Open Unknown Email Attachments" },
      { id: "r10", label: "Disable System Updates" },
      { id: "r11", label: "Share Encryption Keys" },
      { id: "r12", label: "Use Outdated Software" },
    ],
  },
  ddos: {
    correct: [
      { id: "d1", label: "Install Firewall" },
      { id: "d2", label: "Enable Rate Limiting" },
      { id: "d3", label: "Use DDoS Protection Service" },
      { id: "d4", label: "Implement Traffic Filtering" },
      { id: "d5", label: "Scale Network Resources" },
    ],
    wrong: [
      { id: "d6", label: "Restart Router Only" },
      { id: "d7", label: "Disable Network Security" },
      { id: "d8", label: "Increase Bandwidth Only" },
      { id: "d9", label: "Ignore Traffic Spikes" },
      { id: "d10", label: "Turn Off All Servers" },
      { id: "d11", label: "Delete Firewall Rules" },
      { id: "d12", label: "Expose Network Ports" },
    ],
  },
  zeroday: {
    correct: [
      { id: "z1", label: "Update Software Immediately" },
      { id: "z2", label: "Apply Security Patches" },
      { id: "z3", label: "Use Intrusion Detection" },
      { id: "z4", label: "Enable Runtime Protection" },
      { id: "z5", label: "Implement Defense in Depth" },
    ],
    wrong: [
      { id: "z6", label: "Disable All Updates" },
      { id: "z7", label: "Download Suspicious Files" },
      { id: "z8", label: "Ignore Security Alerts" },
      { id: "z9", label: "Run Untrusted Code" },
      { id: "z10", label: "Disable Vulnerability Scanning" },
      { id: "z11", label: "Share Exploit Information" },
      { id: "z12", label: "Use Legacy Systems" },
    ],
  },
  malware: {
    correct: [
      { id: "m1", label: "Run Antivirus Scan" },
      { id: "m2", label: "Use Malware Protection" },
      { id: "m3", label: "Scan Downloaded Files" },
      { id: "m4", label: "Enable Real-time Protection" },
      { id: "m5", label: "Use Application Whitelisting" },
    ],
    wrong: [
      { id: "m6", label: "Download More RAM" },
      { id: "m7", label: "Disable Antivirus" },
      { id: "m8", label: "Clear Browser Cache Only" },
      { id: "m9", label: "Run Unknown Executables" },
      { id: "m10", label: "Ignore Security Warnings" },
      { id: "m11", label: "Install Pirated Software" },
      { id: "m12", label: "Click on Pop-up Ads" },
    ],
  },
}

const ENEMY_TYPES: Record<string, EnemyConfig> = {
  phishing: {
    name: "Phishing Drone",
    icon: "🎣",
    color: "text-yellow-400",
    health: 2,
    speed: 0.5,
    damage: 15,
  },
  ransomware: {
    name: "Ransomware Rocket",
    icon: "🚀",
    color: "text-red-400",
    health: 3,
    speed: 0.6,
    damage: 25,
  },
  ddos: {
    name: "DDoS Swarm",
    icon: "🐝",
    color: "text-purple-400",
    health: 1,
    speed: 0.8,
    damage: 10,
  },
  zeroday: {
    name: "Zero-Day Bomber",
    icon: "💣",
    color: "text-orange-400",
    health: 4,
    speed: 0.45,
    damage: 30,
  },
  malware: {
    name: "Malware Bug",
    icon: "🐛",
    color: "text-green-400",
    health: 2,
    speed: 0.55,
    damage: 20,
  },
}

const CYBERSECURITY_TIPS = [
  "Always verify the sender before clicking email links or downloading attachments.",
  "Keep your software and operating systems updated with the latest security patches.",
  "Use strong, unique passwords and enable two-factor authentication whenever possible.",
  "Regular backups can save you from ransomware attacks - store them offline!",
  "Be cautious of public Wi-Fi and use VPN for sensitive activities.",
]

// ==================== UTILITY FUNCTIONS ====================
// Function to generate random defense options
const generateDefenseOptions = (enemyType: keyof typeof DEFENSE_OPTIONS): DefenseOption[] => {
  const options = DEFENSE_OPTIONS[enemyType]

  // Get one random correct option
  const correctIndex = Math.floor(Math.random() * options.correct.length)
  const correctOption = {
    ...options.correct[correctIndex],
    correct: true,
  }

  // Shuffle wrong options and take 3
  const shuffledWrong = [...options.wrong].sort(() => Math.random() - 0.5).slice(0, 3)
  const wrongOptions = shuffledWrong.map((option) => ({
    ...option,
    correct: false,
  }))

  // Combine and shuffle all options
  return [...wrongOptions, correctOption].sort(() => Math.random() - 0.5)
}

// Generate a unique ID for a question based on enemy type and correct option
const generateQuestionId = (enemyType: string, correctOptionId: string): string => {
  return `${enemyType}-${correctOptionId}`
}

// ==================== COMPONENT FUNCTIONS ====================
function Player({ position }: { position: Position }) {
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

function EnemyComponent({ enemy }: { enemy: Enemy }) {
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

function BulletComponent({ bullet }: { bullet: Bullet }) {
  return (
    <div
      className="absolute w-4 h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full shadow-lg shadow-yellow-400/50"
      style={{ left: bullet.position.x, top: bullet.position.y }}
    />
  )
}

function GameHUD({
  level,
  score,
  lives,
  enemiesDestroyed,
  nextEnemyTimer,
  onPause,
  onMainMenu,
}: {
  level: number
  score: number
  lives: number
  enemiesDestroyed: number
  nextEnemyTimer: number
  onPause: () => void
  onMainMenu: () => void
}) {
  return (
    <div className="flex justify-between items-center mb-4 text-white">
      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <span className="text-cyan-400">Level: {level}</span>
          <span className="text-cyan-400">Score: {score}</span>
          <span className="text-cyan-400 font-bold">
            Enemies: {enemiesDestroyed}/{ENEMIES_PER_LEVEL}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-red-400">Lives:</span>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Heart
                key={i}
                className={`w-6 h-6 ${i < lives ? "text-red-500 fill-red-500" : "text-gray-600 fill-gray-600"}`}
              />
            ))}
          </div>
          <span className="text-cyan-400 ml-2">({lives}/5)</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-cyan-400 text-sm">Next Enemy: {Math.ceil(nextEnemyTimer / 1000)}s</div>
        <div className="flex space-x-2">
          <Button
            onClick={onPause}
            variant="outline"
            size="sm"
            className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/20"
          >
            <Pause className="w-4 h-4 mr-1" />
            Pause
          </Button>
          <Button
            onClick={onMainMenu}
            variant="outline"
            size="sm"
            className="border-red-500 text-red-400 hover:bg-red-500/20"
          >
            <Home className="w-4 w-4 mr-1" />
            Menu
          </Button>
        </div>
      </div>
    </div>
  )
}

function DefensePanel({
  enemy,
  options,
  onSelect,
}: {
  enemy: Enemy
  options: DefenseOption[]
  onSelect: (option: DefenseOption) => void
}) {
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

function WrongAnswerNotification({ show }: { show: boolean }) {
  if (!show) return null

  return (
    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
      <div className="bg-red-900/90 text-white px-6 py-3 rounded-lg border-2 border-red-500 shadow-lg flex items-center space-x-2">
        <AlertTriangle className="text-yellow-400 w-6 h-6" />
        <span className="font-bold">WRONG ANSWER! -1 LIFE</span>
      </div>
    </div>
  )
}

function MenuScreen({ onStartGame, onBackToMain }: { onStartGame: () => void; onBackToMain: () => void }) {
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

function GameOverScreen({
  score,
  level,
  onRestart,
  onMainMenu,
}: {
  score: number
  level: number
  onRestart: () => void
  onMainMenu: () => void
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-900 via-slate-900 to-red-900">
      <Card className="p-8 bg-slate-800/90 border-red-500/50 backdrop-blur">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-red-400">Mission Failed</h1>
          <p className="text-slate-300">The cyber threats have overwhelmed your defenses!</p>
          <div className="space-y-2">
            <p className="text-cyan-400">Final Score: {score}</p>
            <p className="text-cyan-400">Level Reached: {level}</p>
          </div>
          <div className="space-y-2">
            <Button onClick={onRestart} className="bg-cyan-600 hover:bg-cyan-700 text-white mr-4">
              Try Again
            </Button>
            <Button onClick={onMainMenu} variant="outline" className="border-cyan-500 text-cyan-400">
              Main Menu
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

function VictoryScreen({ score, level, onNextLevel }: { score: number; level: number; onNextLevel: () => void }) {
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

function LevelCompleteScreen({
  score,
  level,
  lives,
  onNextLevel,
}: {
  score: number
  level: number
  lives: number
  onNextLevel: () => void
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-900 via-slate-900 to-green-900">
      <Card className="p-8 bg-slate-800/90 border-green-500/50 backdrop-blur max-w-md">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-400">Level Complete!</h1>
          <p className="text-slate-300">Excellent work, Cyber Defender!</p>
          <div className="space-y-2">
            <p className="text-cyan-400">Score: {score}</p>
            <p className="text-cyan-400">Level: {level}</p>
            <p className="text-yellow-400">Lives Remaining: {lives}/5</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <h3 className="text-cyan-400 font-semibold mb-2">💡 Cybersecurity Tip:</h3>
            <p className="text-sm text-slate-300">{CYBERSECURITY_TIPS[(level - 1) % CYBERSECURITY_TIPS.length]}</p>
          </div>
          <Button onClick={onNextLevel} className="bg-cyan-600 hover:bg-cyan-700 text-white">
            Next Level
          </Button>
        </div>
      </Card>
    </div>
  )
}

function PauseScreen({
  score,
  level,
  lives,
  onResume,
  onRestart,
  onMainMenu,
}: {
  score: number
  level: number
  lives: number
  onResume: () => void
  onRestart: () => void
  onMainMenu: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="p-8 bg-slate-800/95 border-cyan-500/50 backdrop-blur">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-cyan-400">Game Paused</h1>

          <div className="space-y-2 text-slate-300">
            <p>
              Level: <span className="text-cyan-400">{level}</span>
            </p>
            <p>
              Score: <span className="text-cyan-400">{score}</span>
            </p>
            <p>
              Lives: <span className="text-red-400">{lives}/5</span>
            </p>
          </div>

          <div className="bg-slate-700/50 p-4 rounded-lg text-sm text-slate-400">
            <p className="font-semibold text-cyan-400 mb-2">Controls:</p>
            <div className="space-y-1">
              <p>🎮 WASD/Arrow Keys to move</p>
              <p>🔫 Spacebar to shoot</p>
              <p>🛡️ Click defense buttons to counter threats</p>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Button
              onClick={onResume}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
            >
              <Play className="w-4 h-4 mr-2" />
              Resume Game
            </Button>

            <Button
              onClick={onRestart}
              variant="outline"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/20 flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart Level
            </Button>

            <Button
              onClick={onMainMenu}
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500/20 flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Main Menu
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

// ==================== MAIN GAME COMPONENT ====================
export default function CyberDefenderWrapper({ onBackToMain }: { onBackToMain: () => void }) {
  return <CyberDefenderGame onBackToMain={onBackToMain} />
}
