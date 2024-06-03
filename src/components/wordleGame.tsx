import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import WordRow from './wordRow'
import { GameBoardContext } from '../context/GameBoardContext';

export const WordleGame = () => {
  const [value, setValue] = useState({currentIndex: +(localStorage.getItem("currentIndex") ?? 0)});
  const { gameBoard, setGameBoard } = useContext(GameBoardContext);

  useEffect(() => {
    localStorage.setItem("currentIndex", (value.currentIndex).toString());
  }, [value.currentIndex])

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent): void => {
      if (event.key === 'Enter') {
        // Remove focus from the currently focused element
        if (document.activeElement) {
          (document.activeElement as HTMLElement).blur();
        }

        setValue((prevValue) => ({
          currentIndex: prevValue.currentIndex + 1,
        }));
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Tab') {
        event.preventDefault();
      }
    };

    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function resetGame(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    setValue({currentIndex: 0});
    setGameBoard((prevBoard) => new Array(6).fill(false).map(() => new Array(5).fill('')));
  }

  return (
    <>
    <div className='navbar'>
      <div className='title'>
        <h1>Wordle</h1>
        <p>Guess the word</p>
      </div>
      <button className='refresh' onClick={resetGame}>Reset</button>
    </div>
    <div className='game'>
      {gameBoard.map((n: string[], index) => (
          <WordRow rowIndex={index} isDisabled={index!=value.currentIndex} />
      ))}
    </div>
    </>
  )
};
