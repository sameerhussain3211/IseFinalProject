"use client"

import { useState } from "react"
import CyberSecurityQuiz from "./cyber-quiz"
import CyberDefenderGame from "./components/cyber-defender-game"
import MainMenu from "./components/main-menu"
import Instructions from "./components/instructions"
import Statistics from "./components/statistics"
import GamePlaying from "./components/game-playing"
import LevelComplete from "./components/level-complete"
import GameOver from "./components/game-over"
import GameWon from "./components/game-won"
import Login from "./components/login"
import Signup from "./components/signup"
import AdminDashboard from "./components/admin/admin-dashboard"
import { useGameState } from "./hooks/use-game-state"
import { useAuth } from "./hooks/use-auth"
// Import the PauseScreen component
import PauseScreen from "./components/pause-screen"

type AuthScreen = "login" | "signup"
type AppState = "menu" | "cyberDefender" | "phishingHunt" | "quiz" | "instructions" | "statistics"

// Update the rendering logic to handle the pause state
export default function PhishHuntGame() {
  const [authScreen, setAuthScreen] = useState<AuthScreen>("login")
  const [appState, setAppState] = useState<AppState>("menu")
  const { user, isAuthenticated, isLoading, login, signup, logout } = useAuth()

  const {
    gameState,
    currentLevel,
    hearts,
    score,
    bestScore,
    feedback,
    showFeedback,
    techniqueStats,
    getCurrentEmails,
    getCurrentEmail,
    setGameState,
    startGame,
    pauseGame,
    resumeGame,
    handleAnswer,
    nextEmail,
    nextLevel,
    resetGame,
  } = useGameState()

  // Show authentication screens if not authenticated
  if (!isAuthenticated) {
    if (authScreen === "login") {
      return <Login onLogin={login} onSwitchToSignup={() => setAuthScreen("signup")} isLoading={isLoading} />
    } else {
      return <Signup onSignup={signup} onSwitchToLogin={() => setAuthScreen("login")} isLoading={isLoading} />
    }
  }

  // Show admin dashboard if user is admin
  if (user?.isAdmin) {
    return <AdminDashboard onLogout={logout} />
  }

  // Handle Cyber Defender game
  if (appState === "cyberDefender") {
    return <CyberDefenderGame onBackToMain={() => setAppState("menu")} />
  }

  // If quiz state is active, render the quiz component
  if (gameState === "quiz") {
    return <CyberSecurityQuiz returnToMainMenu={() => setGameState("menu")} />
  }

  // Main Menu
  if (gameState === "menu") {
    return (
      <MainMenu
        bestScore={bestScore}
        user={user}
        onStartGame={startGame}
        onStartCyberDefender={() => setAppState("cyberDefender")}
        onSetGameState={setGameState}
        onLogout={logout}
      />
    )
  }

  // Instructions
  if (gameState === "instructions") {
    return <Instructions onSetGameState={setGameState} />
  }

  // Statistics
  if (gameState === "statistics") {
    return <Statistics techniqueStats={techniqueStats} bestScore={bestScore} onSetGameState={setGameState} />
  }

  // Game Playing
  if (gameState === "playing") {
    return (
      <GamePlaying
        currentLevel={currentLevel}
        score={score}
        hearts={hearts}
        currentEmailIndex={getCurrentEmails().indexOf(getCurrentEmail())}
        emails={getCurrentEmails()}
        currentEmail={getCurrentEmail()}
        showFeedback={showFeedback}
        feedback={feedback}
        onHandleAnswer={handleAnswer}
        onNextEmail={nextEmail}
        onPause={pauseGame}
        onMainMenu={() => setGameState("menu")}
      />
    )
  }

  // Pause Screen
  if (gameState === "paused") {
    return (
      <div>
        <GamePlaying
          currentLevel={currentLevel}
          score={score}
          hearts={hearts}
          currentEmailIndex={getCurrentEmails().indexOf(getCurrentEmail())}
          emails={getCurrentEmails()}
          currentEmail={getCurrentEmail()}
          showFeedback={showFeedback}
          feedback={feedback}
          onHandleAnswer={handleAnswer}
          onNextEmail={nextEmail}
          onPause={pauseGame}
          onMainMenu={() => setGameState("menu")}
        />
        <PauseScreen
          score={score}
          level={currentLevel}
          hearts={hearts}
          onResume={resumeGame}
          onRestart={startGame}
          onMainMenu={() => setGameState("menu")}
        />
      </div>
    )
  }

  // Level Complete
  if (gameState === "levelComplete") {
    return <LevelComplete score={score} hearts={hearts} currentLevel={currentLevel} onNextLevel={nextLevel} />
  }

  // Game Over
  if (gameState === "gameOver") {
    return <GameOver score={score} bestScore={bestScore} onStartGame={startGame} onResetGame={resetGame} />
  }

  // Game Won
  if (gameState === "gameWon") {
    return (
      <GameWon score={score} hearts={hearts} bestScore={bestScore} onStartGame={startGame} onResetGame={resetGame} />
    )
  }

  return null
}
