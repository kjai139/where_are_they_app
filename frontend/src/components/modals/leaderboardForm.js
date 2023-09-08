import React, { useState } from "react";
import axiosInstance from '../../modules/axiosInstance'
import { useNavigate } from "react-router-dom";

const LeaderboardForm = ({timer, mapId, onSubmit}) => {

    const [username, setUsername] = useState('')

    const [resultMsg, setResultMsg] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        registerName()
    }

    const handleInput = (e) => {
        setUsername(e.target.value)
    }

    const registerName = async () => {
        try {
            const response = await axiosInstance.post(`api/leaderboards/create`, {
                timer:timer,
                username: username,
                mapId: mapId
            }, {
                withCredentials: true
            })


            console.log(response.data.message)
            setResultMsg(response.data.message)


        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div className="leaderboardForm-div">
            {
                resultMsg ? 
            <div>
                <h1>{resultMsg}</h1>
                <button onClick={() => navigate('/')}>Return to main menu</button>
            </div>
                
                :
            <div>     
            <h1>Congrats! You've made the leaderboard!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="userName">Enter your name:</label>
                <input type="text" id="userName" onChange={handleInput} value={username}></input>
                <button>Submit</button>
                </div>
            </form>
            </div> }
        </div>
    )
}

export default LeaderboardForm