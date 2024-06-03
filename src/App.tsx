// import { useState } from 'react'
import { WordleGame } from './components/wordleGame'
import { GameBoardProvider } from './context/GameBoardContext'
import './App.css'

function App() {
  return (
    <>
      <GameBoardProvider>
        <WordleGame />
      </GameBoardProvider>
    </>
  )
}

export default App
