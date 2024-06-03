import React, { useEffect, useRef, useState } from 'react';
import Letterbox from './letterbox';
import { ResultStatus } from './types/resultStatus';
import '../App.css';


const WordRow: React.FC<{ word: string, rowIndex: number, isDisabled: boolean }> = ({ word, rowIndex = 0, isDisabled=false}) => {
    const [value, setValue] = useState({word: word});
    const letterRefs = useRef<(HTMLInputElement | null)[]>([]);

    if (word.length > 5) {
        throw new Error('Word must be 5 characters or less');
    }

    useEffect(() => {
        if (!isDisabled && letterRefs.current[0]) {
          letterRefs.current[0].focus();
        }
      });


    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter') {
            return;
        }

        if (e.key.match(/^[a-zA-Z]$/)) {
            if (index < letterRefs.current.length - 1) {
                letterRefs.current[index + 1]?.focus();
            }
        }

        if (e.key === 'Backspace' && index > 0 && e.currentTarget.value === '') {
            letterRefs.current[index - 1]?.focus();
        }

        const guess = letterRefs.current[index]?.value;
        if (guess) {
            localStorage.setItem(`${rowIndex}_${index}`, guess);
        }
    };

    const calculateResultStatus =(index: number): ResultStatus => {
        const guess = letterRefs.current[index]?.value.toLowerCase() || localStorage.getItem(`${rowIndex}_${index}`);
        if (!isDisabled || !guess) {
            return ResultStatus.BoxNone;
        }

        if (index >= word.length) {
            return ResultStatus.BoxNone;
        }

        if (guess === word[index]) {
            return ResultStatus.BoxSuccess;
        }

        if (word.includes(guess)) {
            return ResultStatus.BoxInWord;
        }

        return ResultStatus.BoxFail;
    };
    

    return (
        <div className={`"word-row" ${isDisabled ? 'disabled' : ''}`}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Letterbox
                    key={index}
                    ref={(el) => (letterRefs.current[index] = el)}
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyUp(e, index)} 
                    status={calculateResultStatus(index)} 
                    initGuess={localStorage.getItem(`${rowIndex}_${index}`) ?? ''}/>
            ))}
        </div>
    );
};

export default WordRow;