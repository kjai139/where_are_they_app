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
            <div className="leaderboardForm-result">
                <h1>{resultMsg}</h1>
                <button className="main-menu-btn" onClick={() => navigate('/')}>Return to main menu</button>
            </div>
                
                :
            <div className="leaderboardForm-result">     
            <h1>Congrats! You've found them all!</h1>
            <h2>You've made it onto the leaderboard!</h2>
            <form onSubmit={handleSubmit}>
                <div style={{
                    display:'flex',
                    gap:'.5rem'
                }}>
                <label htmlFor="userName" style={{
                    display:'flex',
                    alignItems:'center',
                    fontSize:'1.5rem'
                }}>Enter your name:</label>
                <input type="text" id="userName" onChange={handleInput} value={username} autoComplete="off" style={{
                    fontSize:'1rem',
                    padding:'5px'
                }}></input>
                <button className="leaderboard-submit-btn">Submit</button>
                </div>
            </form>
            </div> }
        </div>
    )
}

export default LeaderboardForm