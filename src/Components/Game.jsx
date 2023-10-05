/* -- IMPORTS --- */
/* eslint-disable react/prop-types */

import Die from "./Die"
import Player from "./Player"
import logo from "../assets/tenzies-game-logo.png"


export default function Game(props) {
    return (
        <div>    
            <img src={logo} id="logo"/>
            <h1>{props.tenzies ? "Game completed!" : "Tenzies"}</h1>
            <h2>{props.tenzies && `Well done, ${props.formPlayerName}!`}</h2>
            <p id="description">
                <strong>Rules:</strong> Roll until all dice are the same. Click each die to freeze it at its current value between rolls. (It only counts up to 100 rolls and 5 minutes)
            </p>
            {
                !props.gameRunning && !props.tenzies &&
                <Player 
                    formPlayerName={props.formPlayerName} 
                    handleNameChange={props.handleNameChange}
                    formDefaultPlaceholder={props.formDefaultPlaceholder}
                    isPlayerNameEmpty={props.isPlayerNameEmpty}
                />
            }
            {
                props.tenzies &&
                <div>
                    <div id="counter-container">
                        <div id="timer">Time: {props.formatTime(props.time)}</div>
                        <div id="dice-rolls">Rolls: {props.rollNumber}</div>
                    </div>
                </div>
            }
            {
                props.gameRunning &&
                <div>
                    <div id="counter-container">
                        <div id="timer">Time: {props.formatTime(props.time)}</div>
                        <div id="dice-rolls">Rolls: {props.rollNumber}</div>
                    </div>
                    <div id="dice-container">
                        {
                            props.dice.map((die) => (
                                <Die
                                    key={die.id}
                                    id={die.id}
                                    value={die.value}
                                    isHeld={die.isHeld}
                                    handleHoldDice={() => props.holdDice(die.id)}
                                />
                            ))
                        }
                    </div>
                </div>
            }
            <div id="btn-container">
                <button
                    onClick={
                        !props.tenzies && !props.gameRunning
                        ? props.startGame
                        : !props.tenzies && props.gameRunning
                        ? props.rollDice
                        : props.resetGame
                    }
                >
                    {
                        !props.tenzies && !props.gameRunning
                        ? "Start game"
                        : !props.tenzies && props.gameRunning
                        ? "Roll"
                        : "New game"
                    }
                </button>
                {
                    props.tenzies && !props.gameRunning && 
                    <button id="scoreboard-btn" onClick={props.showScoreBoard}>Scoreboard</button>
                }
                
                { 
                    props.gameRunning && (
                    <button id="stop-reset-btn" onClick={props.resetGame}>Stop & Reset</button>
                    )
                }
            </div>
        </div>
    )
}