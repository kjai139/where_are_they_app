import React from "react";

const Leaderboard = ({leaderboard, closeModal}) => {
    return (
        <div className="overlay">
            <div className="leaderboard-cont">
            <div className="leaderboard-headers">
            <span>RANK</span>
            <div>NAME</div>
            <div>TIME</div>
            </div>
            
            {
                leaderboard.map((node, idx) => {

                    const formatTime = (timeInSeconds) => {
                        const seconds = timeInSeconds % 60
                        const minutes = Math.floor((timeInSeconds % 3600) / 60)
                        const hours = Math.floor(timeInSeconds / 3600)
                
                        // console.log(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
                
                        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                    }
                    return (
                        <div key={`lb-${node._id}`} className="leaderboard-entry">
                           <span>{idx + 1}</span>
                           <span>{node.name}</span>
                           <span>{formatTime(node.time)}</span>
                        </div>
                    )
                })
            }
            
            <div className="leaderboard-btn-cont">
                <button onClick={closeModal} className="leaderboard-btn">CLOSE WINDOW</button>
            </div>
            </div>
        </div>
    )
}


export default Leaderboard