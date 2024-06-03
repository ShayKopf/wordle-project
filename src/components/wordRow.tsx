import React, { useContext, useEffect, useRef, useState } from 'react';
import Letterbox from './letterbox';
import { ResultStatus } from './types/resultStatus';
import '../App.css';
import { GameBoardContext } from '../context/GameBoardContext';


const WordRow: React.FC<{ rowIndex: number, isDisabled: boolean }> = ({ rowIndex = 0, isDisabled=false}) => {
    const letterRefs = useRef<(HTMLInputElement | null)[]>([]);
    const { wordOfTheDay, gameBoard } = useContext(GameBoardContext);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        if (!isDisabled && letterRefs.current[0]) {
          letterRefs.current[0].focus();
        }
      }, [isDisabled]);


    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter') {
            return;
        }

        if (e.key.match(/^[a-zA-Z]$/)) {
            if (currentIndex < letterRefs.current.length - 1) {
                letterRefs.current[currentIndex + 1]?.focus();
                setCurrentIndex(currentIndex + 1);
            }
        }

        if (e.key === 'Backspace' && index > 0 && e.currentTarget.value === '') {
            letterRefs.current[currentIndex - 1]?.focus();
            setCurrentIndex(currentIndex - 1);
        }
    };

    const calculateResultStatus =(index: number): ResultStatus => {
        const guess = gameBoard[rowIndex][index]?.toLowerCase();
        if (!isDisabled || !guess) {
            return ResultStatus.BoxNone;
        }

        if (index >= wordOfTheDay.length) {
            return ResultStatus.BoxNone;
        }

        if (guess === wordOfTheDay[index]) {
            return ResultStatus.BoxSuccess;
        }

        if (wordOfTheDay.includes(guess)) {
            return ResultStatus.BoxInWord;
        }

        return ResultStatus.BoxFail;
    };

    return (
        <div className={`word-row ${isDisabled ? 'disabled' : ''}`}>
            {gameBoard[rowIndex].map((_, index) => (
                <Letterbox
                    key={index}
                    ref={(el) => (letterRefs.current[index] = el)}
                    notifyParent={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyUp(e, index)} 
                    status={calculateResultStatus(index)} 
                    columnIndex={index}
                    rowIndex={rowIndex}/>
            ))}
        </div>
    );
};

export default WordRow;