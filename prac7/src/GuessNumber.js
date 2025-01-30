// src/GuessTheNumber.js
import React, { useState } from 'react';
import './GuessNumber.css';

const GuessNumber = () => {
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [message, setMessage] = useState('');
    const [turns, setTurns] = useState(10);
    const [gameOver, setGameOver] = useState(false);

    const handleGuessChange = (e) => setGuess(e.target.value);

    const handleGuessSubmit = () => {
        const userGuess = Number(guess);
        setGuesses([...guesses, userGuess]);

        if (userGuess === randomNumber) {
            setMessage('Congratulations! You got it right!');
            setGameOver(true);
        } else if (turns - 1 === 0) {
            setMessage('!!!GAME OVER!!!');
            setGameOver(true);
        } else {
            setMessage(userGuess < randomNumber ? 'Last guess was too low!' : 'Last guess was too high!');
            setTurns(turns - 1);
        }

        setGuess('');
    };

    const handleReset = () => {
        setRandomNumber(Math.floor(Math.random() * 100) + 1);
        setGuess('');
        setGuesses([]);
        setMessage('');
        setTurns(10);
        setGameOver(false);
    };

    return (
        <div>
            <h1>Guess the Number Game</h1>
            <p>We have selected a random number between 1 and 100. See if you can guess it in 10 turns or fewer. We'll tell you if your guess was too high or too low.</p>
            <div>
                <label htmlFor="guessField">Enter a guess: </label>
                <input type="number" id="guessField" value={guess} onChange={handleGuessChange} disabled={gameOver} />
                <button onClick={handleGuessSubmit} disabled={gameOver}>Submit guess</button>
            </div>
            <div id="resultParas">
                <p>Previous guesses: {guesses.join(', ')}</p>
                <p>{message}</p>
                <p>Turns left: {turns}</p>
            </div>
            {gameOver && <button onClick={handleReset}>Start new game</button>}
        </div>
    );
};

export default GuessNumber;