import React, { forwardRef, useContext } from 'react';
import '../App.css';
import { ResultStatus } from './types/resultStatus';
import { GameBoardContext } from '../context/GameBoardContext';

interface LetterboxProps {
  notifyParent: React.KeyboardEventHandler<HTMLInputElement>;
  status: ResultStatus;
  columnIndex: number;
  rowIndex: number
}

const Letterbox =  forwardRef<HTMLInputElement, LetterboxProps>(({ notifyParent = (e) => {}, columnIndex = 0, rowIndex = 0, status = ResultStatus.BoxNone}, ref) => {
  const { gameBoard, setGameBoard } = useContext(GameBoardContext);

  return (
    <input
      className={ `square-input ${status.toString()}` }
      value={gameBoard[rowIndex][columnIndex]}
      onChange={(e) => { 
        setGameBoard((prevGameBoard) => {
          const value = e.target.value.slice(-1);
          prevGameBoard[rowIndex][columnIndex] = value;
          return [...prevGameBoard];
      });
      }}
      type="text" 
      onKeyUp={(e) => notifyParent(e)}
      ref={ref}
    />
  );
});

export default Letterbox;