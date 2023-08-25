import React, { useState } from "react";
import axiosInstance from '../../modules/axiosInstance'
import './Homepage.css'


const HomePage = () => {

    const [stages, setStages] = useState()


    const getStages = async () => {
        try {
            const response = await axiosInstance.get(`/api/stages/get`, {
                withCredentials: true
            })

            console.log(response.data.stages)
            setStages(response.data.stages)

        } catch(err) {
            console.log(err)
        }
    }


    return (
        <div>
            <h1>Where are they?</h1>
            <button onClick={getStages}>GET STAGES</button>
            
            {
                stages &&
                <div className="stages-outer-cont">
                <div className="stages-left">
                </div>

                <div className="stages-right">
                {stages.map((node) => {
                    const stageName = node.name.replace(/[_-]/g, ' ')
                    const formattedStageName = stageName.charAt(0).toUpperCase() + stageName.substr(1).toLowerCase()
                    return (
                        <div key={node._id}>
                            <button className="stage-btn">{formattedStageName}</button>
                        </div>
                    )
                })}
                </div>
                </div>
            }

        </div>
    )
}


export default HomePage