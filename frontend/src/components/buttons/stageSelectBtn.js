import React, { useState } from "react";

const StageSelectButton = ({name, func, isSelected}) => {

    

    const handleClick = () => {
        
        func()
    }



    return (
        <button onClick={handleClick} className={isSelected ? 'stage-btn selectedBtn' : 'stage-btn' }>{name}</button>
    )
}

export default StageSelectButton