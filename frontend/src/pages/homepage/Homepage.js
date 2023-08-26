import React, { useState } from "react";
import axiosInstance from '../../modules/axiosInstance'
import './Homepage.css'
import StageSelectButton from "../../components/buttons/stageSelectBtn";
import { useNavigate } from "react-router-dom";


const HomePage = () => {

    const [stages, setStages] = useState()
    const [selectedStage, setSelectedStage] = useState()
    const [selectedBtn, setSelectedBtn] = useState()
    const navigate = useNavigate()


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

    const selectStage = (stage, indx) => {
        setSelectedStage(stage)
        setSelectedBtn(indx)
        console.log(stage)
    }


    return (
        <div>
            <h1>WHERE ARE THEY?</h1>
            <button onClick={getStages}>GET STAGES</button>
            
            {
                stages &&
                <div className="stages-outer-cont">
                <div className="stages-left">
                    {selectedStage ? 
                    <img src={selectedStage.stageUrl} className="selected-stage-div" style={{
                        width:'60%'
                    }}>
                    </img> :
                    <h2>Select Your Map</h2>    
                    }
                </div>

                <div className="stages-right">
                    <h3>Maps:</h3>
                {stages.map((node, indx) => {
                    const stageName = node.name.replace(/[_-]/g, ' ')
                    const formattedStageName = stageName.charAt(0).toUpperCase() + stageName.substr(1).toLowerCase()
                    return (
                        <div key={node._id}>
                            
                            <StageSelectButton name={formattedStageName} func={() => selectStage(node, indx)} isSelected={selectedBtn === indx}></StageSelectButton>
                        </div>
                    )
                })}
                <div className="stages-nav-cont">
                    <button className="stages-nav-btn" onClick={() => navigate(`/map/${selectedStage.name}`)}>Choose</button>
                </div>
                </div>
                </div>
            }

        </div>
    )
}


export default HomePage