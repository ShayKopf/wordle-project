import React, { forwardRef, useState } from 'react';
import '../App.css';
import { ResultStatus } from './types/resultStatus';

interface LetterboxProps {
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  status: ResultStatus;
  initGuess: string;
}

const Letterbox =  forwardRef<HTMLInputElement, LetterboxProps>(({ onKeyUp = (e) => {}, status = ResultStatus.BoxNone, initGuess = ''}, ref) => {
  const [value, setValue] = useState({guess: initGuess});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Override the current text with the latest written letter
    const newValue = event.currentTarget.value.slice(event.currentTarget.value.length - 1, event.currentTarget.value.length); // Limit input to a single character
    setValue({guess: newValue});
  };

  return (
    <input
      className={ `square-input ${status.toString()}` }
      type="text" 
      value={value.guess} 
      onChange={handleChange} 
      style={{width: '50px', height: '50px'}}
      ref={ref}
      onKeyUp={onKeyUp.bind(this)}
    />
  );
});

export default Letterbox;