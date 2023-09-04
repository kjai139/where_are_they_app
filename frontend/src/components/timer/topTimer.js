import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const TopTimer = ({targets, isGameOver}) => {

    const [timer, setTimer] = useState(0)

    const formatTime = (timeInSeconds) => {
        const seconds = timeInSeconds % 60
        const minutes = Math.floor((timeInSeconds % 3600) / 60)
        const hours = Math.floor(timeInSeconds / 3600)

        // console.log(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    useEffect(() => {
        if (!isGameOver) {
            const timerId = setTimeout(() => {
                setTimer(timer + 1)
            }, 1000)
            console.log(targets)
    
            return () => clearTimeout(timerId)
        }
    }, [timer])







    return (
        <nav className="topNav">
            <ul className="topNav-list">
                <li>
                    <h1>Where are they?</h1>
                </li>
                <li className="targets-list">
                {
                    targets && 
                    targets.map((node) => {
                        return (
                            <div key={node._id}>
                                <button className="targets-btn" style={{
                                    backgroundImage:`url(${node.imgUrl})`
                                }}>

                                </button>

                            </div>
                        )
                    })
                }
                </li>
                <li style={{
                    padding: '1rem',
                    flex: '1'
                }}>
                  
                    <h1>{formatTime(timer)}</h1>
                </li>
                <Link className="navLinks" to={`/`}>
                <li>
                    Return to menu
                </li>
                </Link>
            </ul>
            
        </nav>
    )
}

export default TopTimer