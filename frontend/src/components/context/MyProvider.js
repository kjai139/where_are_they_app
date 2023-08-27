import React, { useState } from "react";
import MyContext from "./MyContext";


const MyProvider = ({children}) => {

    const [chosenStage, setChosenStage] = useState(null)
    return (
        <MyContext.Provider value={{chosenStage, setChosenStage}}>
            {children}
        </MyContext.Provider>
    )
}

export default MyProvider