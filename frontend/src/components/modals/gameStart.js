import React from "react";

const GameStartModal = ({targets, closeModal}) => {
    return (
        <div className="gamestart-modal">
            <h2>Can you find the following characters on the map?</h2>
            <div className="gamestart-targets-div">
            {targets && 
            
            
            
            targets.map((node) => {
                return (
                    <div key={`gamestart-${node._id}`} style={{
                        display:'grid',
                        gridTemplateRows: '1fr 4fr',
                        justifyContent:'center'
                    }}>
                        <h3 style={{
                            display:'flex',
                            justifyContent:'center'
                        }}>{node.name}</h3>
                        <img className="gamestart-img" src={node.imgUrl}>
                        </img>
                        
                    </div>
                )
            })}
            </div>
            
            <button onClick={closeModal} className="gamestart-btn">I'm ready, let's start!</button>
        </div>
    )
}


export default GameStartModal