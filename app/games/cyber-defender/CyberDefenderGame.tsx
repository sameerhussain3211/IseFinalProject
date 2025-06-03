"use client"

import { useGameState } from "./hooks/use-game-state"
import GameHUD from "./components/GameHUD"
import GameArea from "./components/GameArea"
import MenuScreen from "./components/screens/MenuScreen"
import GameOverScreen from "./components/screens/GameOverScreen"
import VictoryScreen from "./components/screens/VictoryScreen"
import LevelCompleteScreen from "./components/screens/LevelCompleteScreen"
import PauseScreen from "./components/screens/PauseScreen"

interface CyberDefenderGameProps {
  onBackToMain: () => void
}

export default function CyberDefenderGame({ onBackToMain }: CyberDefenderGameProps) {
  const {
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

    startGame,
    pauseGame,
    resumeGame,
    nextLevel,
    goToMainMenu,
    handleDefenseChoice,
  } = useGameState()

  // Render different screens based on game state
  if (gameState === "menu") {
    return <MenuScreen onStartGame={startGame} onBackToMain={onBackToMain} />
  }

  if (gameState === "gameOver") {
    return <GameOverScreen score={score} level={level} onRestart={startGame} onMainMenu={goToMainMenu} />
  }

  if (gameState === "victory") {
    return <VictoryScreen score={score} level={level} onNextLevel={nextLevel} />
  }

  if (gameState === "levelComplete") {
    return <LevelCompleteScreen score={score} level={level} lives={lives} onNextLevel={nextLevel} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 p-4">
      {/* HUD */}
      <GameHUD
        level={level}
        score={score}
        lives={lives}
        enemiesDestroyed={enemiesDestroyed}
        nextEnemyTimer={nextEnemyTimer}
        onPause={pauseGame}
        onMainMenu={goToMainMenu}
      />

      {/* Game Area */}
      <GameArea
        playerPos={playerPos}
        enemies={enemies}
        bullets={bullets}
        wrongAnswer={wrongAnswer}
        activeDefense={activeDefense}
        onDefenseChoice={handleDefenseChoice}
      />

      {/* Pause Screen */}
      {gameState === "paused" && (
        <PauseScreen
          score={score}
          level={level}
          lives={lives}
          onResume={resumeGame}
          onRestart={startGame}
          onMainMenu={goToMainMenu}
        />
      )}
    </div>
  )
}
