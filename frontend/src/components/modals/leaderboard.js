import React from "react";

const Leaderboard = ({leaderboard, closeModal}) => {
    return (
        <div className="overlay">
            <div>
            <div>NAME:</div>
            <div>TIME:</div>
            </div>
            <div>
            {
                leaderboard.map((node) => {
                    return (
                        <div key={`lb-${node._id}`}>
                           <span>{node.name}</span>
                           <span>{node.time}</span>
                        </div>
                    )
                })
            }
            </div>
            <div>
                <button onClick={closeModal}>CLOSE WINDOW</button>
            </div>
        </div>
    )
}


export default Leaderboard