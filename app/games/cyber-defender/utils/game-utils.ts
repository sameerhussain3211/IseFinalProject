import type { DefenseOption, EnemyType } from "../types/game-types"
import { DEFENSE_OPTIONS } from "./constants"

// Generate random defense options for an enemy
export const generateDefenseOptions = (enemyType: EnemyType): DefenseOption[] => {
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
export const generateQuestionId = (enemyType: string, correctOptionId: string): string => {
  return `${enemyType}-${correctOptionId}`
}
