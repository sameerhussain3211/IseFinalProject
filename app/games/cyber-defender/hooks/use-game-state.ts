"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import type { Enemy, Bullet, Position, GameState, DefenseOption, EnemyType } from "../types/game-types"
import { ENEMY_TYPES, ENEMIES_PER_LEVEL, GAME_WIDTH, GAME_HEIGHT } from "../utils/constants"
import { generateDefenseOptions, generateQuestionId } from "../utils/game-utils"

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>("menu")
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(5)
  const [playerPos, setPlayerPos] = useState<Position>({ x: 50, y: 300 })
  const [enemies, setEnemies] = useState<Enemy[]>([])
  const [bullets, setBullets] = useState<Bullet[]>([])
  const [keys, setKeys] = useState<Set<string>>(new Set())
  const [activeDefense, setActiveDefense] = useState<{ enemy: Enemy; options: DefenseOption[] } | null>(null)
  const [enemiesDestroyed, setEnemiesDestroyed] = useState(0)
  const [nextEnemyTimer, setNextEnemyTimer] = useState(0)
  const [wrongAnswer, setWrongAnswer] = useState(false)
  const [perfectRun, setPerfectRun] = useState(true)
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set())

  const gameLoopRef = useRef<number>()
  const lastShotRef = useRef(0)
  const defenseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prev) => new Set(prev).add(e.key.toLowerCase()))
      if (e.key === " ") {
        e.preventDefault()
        shoot()
      }
      if (e.key === "Escape" && gameState === "playing") {
        e.preventDefault()
        setGameState("paused")
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const newKeys = new Set(prev)
        newKeys.delete(e.key.toLowerCase())
        return newKeys
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [gameState])

  // Player movement
  useEffect(() => {
    if (gameState !== "playing") return

    const movePlayer = () => {
      setPlayerPos((prev) => {
        let newX = prev.x
        let newY = prev.y
        const speed = 5

        if (keys.has("a") || keys.has("arrowleft")) newX = Math.max(0, newX - speed)
        if (keys.has("d") || keys.has("arrowright")) newX = Math.min(GAME_WIDTH - 80, newX + speed)
        if (keys.has("w") || keys.has("arrowup")) newY = Math.max(0, newY - speed)
        if (keys.has("s") || keys.has("arrowdown")) newY = Math.min(GAME_HEIGHT - 50, newY + speed)

        return { x: newX, y: newY }
      })
    }

    const interval = setInterval(movePlayer, 16)
    return () => clearInterval(interval)
  }, [keys, gameState])

  // Shooting function
  const shoot = useCallback(() => {
    const now = Date.now()
    if (now - lastShotRef.current < 200) return // Rate limit shooting

    lastShotRef.current = now
    const newBullet: Bullet = {
      id: Math.random().toString(),
      position: { x: playerPos.x + 70, y: playerPos.y + 20 },
      velocity: { x: 8, y: 0 },
    }
    setBullets((prev) => [...prev, newBullet])
  }, [playerPos])

  // Enemy spawning
  const spawnEnemy = useCallback(() => {
    const enemyTypes = Object.keys(ENEMY_TYPES) as Array<EnemyType>
    const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)]
    const enemyConfig = ENEMY_TYPES[randomType]

    // Generate unique defense options for this enemy
    const defenseOptions = generateDefenseOptions(randomType)

    // Create a unique key for this question set
    const correctOption = defenseOptions.find((opt) => opt.correct)
    const questionKey = generateQuestionId(randomType, correctOption?.id || "")

    // Check if we've used this question before
    if (usedQuestions.has(questionKey)) {
      // Try again to get a different question
      return spawnEnemy()
    }

    // Add this question to used questions
    setUsedQuestions((prev) => new Set([...prev, questionKey]))

    const newEnemy: Enemy = {
      id: Math.random().toString(),
      type: randomType,
      position: { x: GAME_WIDTH, y: Math.random() * (GAME_HEIGHT - 80) + 40 },
      health: enemyConfig.health + Math.floor(level / 3),
      speed: enemyConfig.speed + level * 0.05,
      damage: enemyConfig.damage,
      defenseShown: false,
      defenseOptions: defenseOptions,
    }
    setEnemies((prev) => [...prev, newEnemy])
  }, [level, usedQuestions])

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return

    const gameLoop = () => {
      // Move bullets
      setBullets((prev) =>
        prev
          .map((bullet) => ({
            ...bullet,
            position: {
              x: bullet.position.x + bullet.velocity.x,
              y: bullet.position.y + bullet.velocity.y,
            },
          }))
          .filter((bullet) => bullet.position.x < GAME_WIDTH + 50),
      )

      // Move enemies
      setEnemies((prev) =>
        prev
          .map((enemy) => ({
            ...enemy,
            position: {
              x: enemy.position.x - enemy.speed,
              y: enemy.position.y,
            },
          }))
          .filter((enemy) => enemy.position.x > -120),
      )

      // Check bullet-enemy collisions
      setBullets((prevBullets) => {
        const remainingBullets = [...prevBullets]
        setEnemies((prevEnemies) => {
          return prevEnemies
            .map((enemy) => {
              const hitBulletIndex = remainingBullets.findIndex(
                (bullet) =>
                  bullet.position.x >= enemy.position.x &&
                  bullet.position.x <= enemy.position.x + 80 &&
                  bullet.position.y >= enemy.position.y &&
                  bullet.position.y <= enemy.position.y + 60,
              )

              if (hitBulletIndex !== -1) {
                remainingBullets.splice(hitBulletIndex, 1)
                const newHealth = enemy.health - 1

                if (newHealth <= 0) {
                  setScore((prev) => prev + 5) // +5 for destroying enemy
                  setEnemiesDestroyed((prev) => prev + 1)
                  return null
                }

                return { ...enemy, health: newHealth }
              }
              return enemy
            })
            .filter(Boolean) as Enemy[]
        })
        return remainingBullets
      })

      // Check player-enemy collisions
      setEnemies((prevEnemies) => {
        const collidingEnemy = prevEnemies.find(
          (enemy) =>
            enemy.position.x <= playerPos.x + 70 &&
            enemy.position.x + 80 >= playerPos.x &&
            enemy.position.y <= playerPos.y + 40 &&
            enemy.position.y + 60 >= playerPos.y,
        )

        if (collidingEnemy) {
          setLives((prev) => Math.max(0, prev - 1))
          setPerfectRun(false)
          return prevEnemies.filter((e) => e.id !== collidingEnemy.id)
        }
        return prevEnemies
      })

      // Show defense options for enemies that reach certain position
      setEnemies((prevEnemies) => {
        return prevEnemies.map((enemy) => {
          if (!enemy.defenseShown && enemy.position.x <= GAME_WIDTH * 0.6) {
            setActiveDefense({
              enemy,
              options: enemy.defenseOptions || [],
            })
            return { ...enemy, defenseShown: true }
          }
          return enemy
        })
      })

      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState, playerPos])

  // Spawn enemies one by one
  useEffect(() => {
    if (gameState !== "playing") return

    const spawnInterval = setInterval(() => {
      setNextEnemyTimer((prev) => {
        if (prev <= 0 && enemies.length === 0) {
          spawnEnemy()
          return 3000 - level * 200 // 3 seconds between enemies, decreasing with level
        }
        return Math.max(0, prev - 100)
      })
    }, 100)

    return () => clearInterval(spawnInterval)
  }, [gameState, level, spawnEnemy, enemies.length])

  // Check game over
  useEffect(() => {
    if (lives <= 0) {
      setGameState("gameOver")
    }
  }, [lives])

  // Check level completion
  useEffect(() => {
    if (enemiesDestroyed >= ENEMIES_PER_LEVEL) {
      if (perfectRun && lives === 5) {
        setGameState("victory")
      } else {
        setGameState("levelComplete")
      }
    }
  }, [enemiesDestroyed, lives, perfectRun])

  // Clear wrong answer notification
  useEffect(() => {
    if (wrongAnswer) {
      const timer = setTimeout(() => {
        setWrongAnswer(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [wrongAnswer])

  // Handle defense choice
  const handleDefenseChoice = (option: DefenseOption) => {
    if (!activeDefense) return

    // Clear the timeout when user makes a choice
    if (defenseTimeoutRef.current) {
      clearTimeout(defenseTimeoutRef.current)
      defenseTimeoutRef.current = null
    }

    if (option.correct) {
      setScore((prev) => prev + 5) // +5 for correct answer
      setEnemies((prev) => prev.filter((e) => e.id !== activeDefense.enemy.id))
      setEnemiesDestroyed((prev) => prev + 1)
    } else {
      setLives((currentLives) => Math.max(0, currentLives - 1))
      setScore((prev) => Math.max(0, prev - 5))
      setPerfectRun(false)
      setWrongAnswer(true)
      // Remove the enemy after wrong answer
      setEnemies((prev) => prev.filter((e) => e.id !== activeDefense.enemy.id))
    }
    setActiveDefense(null)
  }

  // Defense timeout - reduce life if no answer is given
  useEffect(() => {
    if (activeDefense) {
      const timeout = setTimeout(() => {
        setLives((currentLives) => Math.max(0, currentLives - 1))
        setPerfectRun(false)
        setWrongAnswer(true)
        // Remove the enemy after timeout
        setEnemies((prev) => prev.filter((e) => e.id !== activeDefense.enemy.id))
        setActiveDefense(null)
      }, 8000) // 8 seconds to answer

      defenseTimeoutRef.current = timeout

      return () => {
        if (defenseTimeoutRef.current) {
          clearTimeout(defenseTimeoutRef.current)
          defenseTimeoutRef.current = null
        }
      }
    } else {
      if (defenseTimeoutRef.current) {
        clearTimeout(defenseTimeoutRef.current)
        defenseTimeoutRef.current = null
      }
    }
  }, [activeDefense])

  // Game control functions
  const startGame = () => {
    setGameState("playing")
    setLevel(1)
    setScore(0)
    setLives(5)
    setPlayerPos({ x: 50, y: 300 })
    setEnemies([])
    setBullets([])
    setEnemiesDestroyed(0)
    setActiveDefense(null)
    setNextEnemyTimer(2000)
    setPerfectRun(true)
    setWrongAnswer(false)
    setUsedQuestions(new Set()) // Reset used questions
  }

  const pauseGame = () => {
    if (gameState === "playing") {
      setGameState("paused")
    }
  }

  const resumeGame = () => {
    if (gameState === "paused") {
      setGameState("playing")
    }
  }

  const nextLevel = () => {
    setLevel((prev) => prev + 1)
    setEnemiesDestroyed(0)
    setEnemies([])
    setBullets([])
    setNextEnemyTimer(2000)
    setGameState("playing")
    setUsedQuestions(new Set()) // Reset used questions for new level
  }

  const goToMainMenu = () => {
    setGameState("menu")
  }

  return {
    // State
    gameState,
    level,
    score,
    lives,
    playerPos,
    enemies,
    bullets,
    activeDefense,
    enemiesDestroyed,
    nextEnemyTimer,
    wrongAnswer,
    perfectRun,

    // Actions
    setGameState,
    startGame,
    pauseGame,
    resumeGame,
    nextLevel,
    goToMainMenu,
    shoot,
    handleDefenseChoice,
  }
}
