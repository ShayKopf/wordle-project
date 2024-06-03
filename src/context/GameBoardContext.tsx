import { Dispatch, FC, SetStateAction, createContext, useEffect, useState } from "react";

export interface GameBoardContextType {
    gameBoard: string[][];
    wordOfTheDay: string;
    setGameBoard: Dispatch<SetStateAction<string[][]>>;
}

export const GameBoardContext = createContext<GameBoardContextType>({
    gameBoard: [], wordOfTheDay: 'hello', setGameBoard: () => {
        console.log("setGameBoard not initialized!!!!!!!!!!!!!")
    }
});

const getInitialState = () => {
    const gameBoard = localStorage.getItem("gameBoard");
    if (gameBoard) {
        return JSON.parse(gameBoard);
    }
    return new Array(6).fill(false).map(() => new Array(5).fill(''));

};

interface Props {
    children: React.ReactNode;
    gameBoard?: string[][];
}

export const GameBoardProvider: FC<Props> = ({children}) => {
    const [gameBoardContextValue, setGameBoardContextValue] = useState<string[][]>(getInitialState());
    
    useEffect(() => {
        localStorage.setItem("gameBoard", JSON.stringify(gameBoardContextValue));
    }, [gameBoardContextValue]);
    
    return <GameBoardContext.Provider value={{setGameBoard: setGameBoardContextValue, gameBoard: gameBoardContextValue, wordOfTheDay: 'hello'}}>
        {children}
    </GameBoardContext.Provider>
}