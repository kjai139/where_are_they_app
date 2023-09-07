import React from "react";
import { useNavigate } from "react-router-dom";

const GameResult = ({timer}) => {
    const formatTime = (timeInSeconds) => {
        const seconds = timeInSeconds % 60
        const minutes = Math.floor((timeInSeconds % 3600) / 60)
        const hours = Math.floor(timeInSeconds / 3600)

        // console.log(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    const navigate = useNavigate()

    return (
        <div className="leaderboardForm-div">
            <h1>You've found them all in {formatTime(timer)}!</h1>
            <span>Unforunately, you did not make the leaderboard</span>
            <button onClick={() => navigate('/')}>BACK TO MAIN MENU</button>
        </div>
    )
}


export default GameResult