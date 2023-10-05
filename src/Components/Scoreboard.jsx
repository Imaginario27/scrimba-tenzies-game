/* eslint-disable react/prop-types */


export default function Scoreboard(props){
    // Retrieve scores from local storage
    const timeScores = JSON.parse(localStorage.getItem("timeScores")) || []
    const rollScores = JSON.parse(localStorage.getItem("rollScores")) || []
    
    return (
        <div id="scoreboard">
            <h1>Scoreboard</h1>
            <h3>Best times</h3>
            <div className="scoreboard-results">
                {
                    timeScores.map((score, index) => (
                        <div className="row" key={index}>
                            <div className="ranking">{index + 1}</div>
                            <div className="player">{score.playerName}</div>
                            <div className="time">{props.formatTime(score.time)}</div>
                        </div>
                    ))
                }
          </div>
          <h3>Best rolls</h3>
          <div className="scoreboard-results">
                {
                    rollScores.map((score, index) => (
                        <div className="row" key={index}>
                            <div className="ranking">{index + 1}</div>
                            <div className="player">{score.playerName}</div>                           
                            <div className="rolls">{score.rolls}</div>
                        </div>
                    ))
                }
          </div>
          <button id="back-btn" onClick={props.hideScoreBoard}>Back</button>
        </div>
      )
}