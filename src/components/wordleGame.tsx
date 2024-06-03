import React, { useEffect, useState } from 'react';
import '../App.css';
import WordRow from './wordRow'

export const WordleGame = () => {
  const [value, setValue] = useState({currentIndex: +(localStorage.getItem("currentIndex") ?? 0), word: 'hello'});

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
          word: prevValue.word,
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
    setValue({currentIndex: 0, word: 'hello'});
    for(let i=0; i<6; i++) {
      for(let j=0; j<5; j++) {
        localStorage.setItem(`${i}_${j}`, '');
      }
    }
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
      {Array.from(Array(6), (n, index) => (
          <WordRow word={value.word} rowIndex={index} isDisabled={index!=value.currentIndex} />
      ))}
    </div>
    </>
  )
};
