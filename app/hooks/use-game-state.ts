"use client"

import { useState, useEffect } from "react"
import { emailData, type PhishingTechnique, type Email } from "../data/email-data"
import { shuffleArray } from "../utils/game-utils"

export type GameState =
  | "menu"
  | "instructions"
  | "statistics"
  | "playing"
  | "paused"
  | "levelComplete"
  | "gameOver"
  | "gameWon"
  | "quiz"
export type Level = "easy" | "medium" | "hard"

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>("menu")
  const [currentLevel, setCurrentLevel] = useState<Level>("easy")
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0)
  const [hearts, setHearts] = useState(5)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [feedback, setFeedback] = useState<string>("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [shuffledEmails, setShuffledEmails] = useState<Email[]>([])
  const [techniqueStats, setTechniqueStats] = useState<Record<PhishingTechnique, { correct: number; total: number }>>({
    urgency_scareware: { correct: 0, total: 0 },
    spoofing: { correct: 0, total: 0 },
    credential_harvesting: { correct: 0, total: 0 },
    lottery_advance_fee: { correct: 0, total: 0 },
    fake_security_alert: { correct: 0, total: 0 },
    typosquatting: { correct: 0, total: 0 },
    fake_compliance: { correct: 0, total: 0 },
  })

  // Load best score from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("hackshield-best-score")
    if (saved) {
      setBestScore(Number.parseInt(saved))
    }
  }, [])

  // Save best score to localStorage
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem("hackshield-best-score", score.toString())
    }
  }, [score, bestScore])

  const getCurrentEmails = () => shuffledEmails
  const getCurrentEmail = () => shuffledEmails[currentEmailIndex]

  const startGame = () => {
    setGameState("playing")
    setCurrentLevel("easy")
    setCurrentEmailIndex(0)
    setHearts(5)
    setScore(0)
    setFeedback("")
    setShowFeedback(false)
    setShuffledEmails(shuffleArray(emailData.easy))
  }

  const pauseGame = () => {
    setGameState("paused")
  }

  const resumeGame = () => {
    setGameState("playing")
  }

  const handleAnswer = (playerAnswer: boolean) => {
    const email = getCurrentEmail()
    const isCorrect = playerAnswer === email.isPhishing

    // Track technique performance for phishing emails
    if (email.isPhishing && email.technique) {
      setTechniqueStats((prev) => ({
        ...prev,
        [email.technique as PhishingTechnique]: {
          correct: prev[email.technique as PhishingTechnique].correct + (isCorrect ? 1 : 0),
          total: prev[email.technique as PhishingTechnique].total + 1,
        },
      }))
    }

    if (isCorrect) {
      setScore((prev) => prev + 10)
      setFeedback("Correct! Well done.")
    } else {
      setHearts((prev) => prev - 1)
      setFeedback(`Incorrect. This email ${email.isPhishing ? "was" : "was not"} a phishing attempt.`)
    }

    setShowFeedback(true)
  }

  const nextEmail = () => {
    setShowFeedback(false)

    if (hearts <= 0) {
      setGameState("gameOver")
      return
    }

    const emails = getCurrentEmails()
    if (currentEmailIndex < emails.length - 1) {
      setCurrentEmailIndex((prev) => prev + 1)
    } else {
      // Level complete
      if (currentLevel === "easy") {
        setCurrentLevel("medium")
        setCurrentEmailIndex(0)
        setShuffledEmails(shuffleArray(emailData.medium))
        setGameState("levelComplete")
      } else if (currentLevel === "medium") {
        setCurrentLevel("hard")
        setCurrentEmailIndex(0)
        setShuffledEmails(shuffleArray(emailData.hard))
        setGameState("levelComplete")
      } else {
        setGameState("gameWon")
      }
    }
  }

  const nextLevel = () => {
    setGameState("playing")
  }

  const resetGame = () => {
    setGameState("menu")
    setCurrentLevel("easy")
    setCurrentEmailIndex(0)
    setHearts(5)
    setScore(0)
    setFeedback("")
    setShowFeedback(false)
  }

  return {
    // State
    gameState,
    currentLevel,
    currentEmailIndex,
    hearts,
    score,
    bestScore,
    feedback,
    showFeedback,
    techniqueStats,
    // Computed values
    getCurrentEmails,
    getCurrentEmail,
    // Actions
    setGameState,
    startGame,
    pauseGame,
    resumeGame,
    handleAnswer,
    nextEmail,
    nextLevel,
    resetGame,
  }
}
