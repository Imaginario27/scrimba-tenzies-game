/* -- IMPORTS --- */
import React, { useState, useEffect } from "react"
import Scoreboard from "./Components/Scoreboard"
import Game from "./Components/Game"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'


export default function App() {
    /* -- STATE DECLARATIONS --- */
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [time, setTime] = useState(0)
    const [gameRunning, setGameRunning] = useState(false)
    const [rollNumber, setRollNumber] = useState(0)
    const [formPlayerName, setFormPlayerName] = React.useState("")
    const [formDefaultPlaceholder, setFormDefaultPlaceholder] = React.useState("Player name")
    const [isPlayerNameEmpty, setIsPlayerNameEmpty] = React.useState()
    const [isScoreboardActive, setIsScoreboardActive] = useState(false)
    const [isGameBoardActive, setIsGameBoardActive] = useState(true)
    const [isConfettiActive, setIsConfettiActive] = useState(false)
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })   

    /* -- USE EFFECTS --- */
    useEffect(() => {
        /* 
            While the game is running, the time is being incremented 10ms each interval.
         */
        let interval
        
        if (gameRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 10
                    if(newTime > 300000) {//If the timer reaches 5 minutes, it stops.
                        return 300000
                    }
                    return newTime
                }
                
            )}, 10)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [gameRunning, tenzies])

    useEffect(() => {
        /* When every die face matches to the first die face which have been selected, the player completed the game */
        const allDiceHeld = dice.every((die) => die.isHeld)
        const firstValue = dice[0].value
        const allDiceSameValue = dice.every((die) => die.value === firstValue)

        if (allDiceHeld && allDiceSameValue) {
            setTenzies(true)
            setIsConfettiActive(true)
            setGameRunning(false)
            savePlayerScore(formPlayerName, rollNumber, time)
        }
    }, [dice])

    useEffect(() => {
        /* Adds event listeners to the window to trigger the resizing function */
        window.addEventListener('resize', confettiHandleResize)

        return () => { //Clears the event listener
            window.removeEventListener('resize', confettiHandleResize)
        }
    }, []) // Empty dependency array ensures that this effect runs only once on mount

    /* 
        -- PLAYER NAME INPUT CHANGE FUNCTION:
        Handles the form input change event
    */
    function handleNameChange(event) {
        setFormPlayerName(event.target.value)
        if (!(formPlayerName === "")){
            setIsPlayerNameEmpty(false)
        }
    }

    /* 
        -- CONFETTI RESIZE FUNCTION:
        Controlls the resizing of the confetti area
    */
    function confettiHandleResize (){
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    /* 
        -- TIME FORMAT FUNCTION:
        Formats the time (Minutes:Seconds:Miliseconds) 
    */
    function formatTime(milliseconds) {
        const minutes = Math.floor(milliseconds / (60 * 1000))
        const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000)
        const ms = milliseconds % 1000
        return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}:${ms.toString().padStart(3, "0")}`
    }
    
    /* -- GAMER STARTER FUNCTION */
    function startGame() {
        if (!(formPlayerName === "")){
            setGameRunning(true)
        }
        else {
            setIsPlayerNameEmpty(true)
            setFormDefaultPlaceholder("Player name required!")
        }       
    }
    
    /* -- GAMER RESET FUNCTION */
    function resetGame() {
        setDice(allNewDice())
        setTenzies(false)
        setTime(0)
        setGameRunning(false)
        setRollNumber(0)
    }
    
    /* 
        -- NEW DICE GENERATION FUNCTION:
        Generates a new die face with a random number from 1-6.
    */
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    /* 
        -- NEW DICES FUNCTION:
        Generates a new array and fills it with random dice numbers
    */
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    /* 
        -- ROLL DICE FUNCTION:
        Generates new dices for thos who are not being held and increases the roll number counter whereas the tenzies is not obtained. 
    */
    function rollDice() {
        setDice(dice.map((die) => (die.isHeld ? die : generateNewDie())))
        if (!tenzies && rollNumber < 100) { //Limits the rolls to a maximum of 100
            setRollNumber((prevRollNumber) => prevRollNumber + 1)
        }
    }
    
    /* 
        -- HOLD DICE FUNCTION:
        Sets a die face to "held" 
    */
    function holdDice(id) {
        setDice((prevDice) =>
            prevDice.map((die) =>
                die.id === id ? { ...die, isHeld: !die.isHeld } : die
            )
        )
    }
    
    /* 
        -- SHOW SCOREBOARD FUNCTION:
        Displays the scorebaord
    */
    function showScoreBoard(){
        setIsScoreboardActive(true)
        setIsGameBoardActive(false)
        setIsConfettiActive(false)
    }
    
    /* 
        -- HIDE SCOREBOARD FUNCTION:
        Hides the scorebaord
    */
    function hideScoreBoard(){
        setIsScoreboardActive(false)
        setIsGameBoardActive(true)
        setIsConfettiActive(true)
    }
    
    /* 
        -- SAVE PLAYER SCORE FUNCTION:
        Saves the time and rolls of the player game in localhost and sorts it based on
        time and rolls
    */
    function savePlayerScore(playerName, rolls, time) {
        const newScore = {
            playerName,
            rolls,
            time,
        }
    
        // Retrieve existing scores from local storage or initialize an empty array
        const existingTimeScores = JSON.parse(localStorage.getItem("timeScores")) || []
        const existingRolleScores = JSON.parse(localStorage.getItem("rollScores")) || []
    
        // Add the new score to the scores array
        existingTimeScores.push(newScore);
        // Add the new score to the scores array
        existingRolleScores.push(newScore);
    
        // Sort the scores based on either time or rolls
        const sortedTimeScores = existingTimeScores.sort((a, b) => {
            return a.time - b.time
        })

        const sortedRollScores = existingRolleScores.sort((a, b) => {
            return a.rolls - b.rolls
        })
    
        // Limit the scores to the top 3 (or your desired limit)
        const limitedTimeScores = sortedTimeScores.slice(0, 3)
        const limitedRollScores = sortedRollScores.slice(0, 3)
    
        // Save the limited and sorted scores back to local storage
        localStorage.setItem("timeScores", JSON.stringify(limitedTimeScores))
        localStorage.setItem("rollScores", JSON.stringify(limitedRollScores))
    }

    return (
        <div id="container">
            {
                tenzies && isConfettiActive &&
                    <Confetti
                        width={windowSize.width}
                        height={windowSize.height}
                    />
                }
            {
                isScoreboardActive && !isGameBoardActive && 
                <Scoreboard 
                    hideScoreBoard={hideScoreBoard}
                    formatTime={formatTime}
                /> 
            }
            {
                !isScoreboardActive && isGameBoardActive &&
                <Game 
                    tenzies={tenzies}
                    time={time}
                    formatTime={formatTime}
                    gameRunning={gameRunning}
                    startGame={startGame}
                    resetGame={resetGame}
                    dice={dice}
                    rollDice={rollDice}
                    holdDice={holdDice}
                    rollNumber={rollNumber}
                    formPlayerName={formPlayerName}
                    showScoreBoard={showScoreBoard}
                    hideScoreBoard={hideScoreBoard}
                    handleNameChange={handleNameChange}
                    formDefaultPlaceholder={formDefaultPlaceholder}
                    isPlayerNameEmpty={isPlayerNameEmpty}
                />
            }    
        </div>
    )
}