import React, { useState } from "react";
import axiosInstance from '../../modules/axiosInstance'

const LeaderboardForm = ({timer, onSubmit}) => {

    const [username, setUsername] = useState('')

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
                username: username
            }, {
                withCredentials: true
            })


            console.log(response.data.message)


        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div className="leaderboardForm-div">
            <h1>Congrats! You've made the leaderboard!</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Enter your name:</label>
                <input type="text" id="userName" onChange={handleInput} value={username}></input>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default LeaderboardForm