import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../components/context/MyContext";
import { useParams } from "react-router-dom";
import axiosInstance from '../../modules/axiosInstance'


const StagePage = () => {

    const {chosenStage, setChosenStage} = useContext(MyContext)
    const { id } = useParams()

    const [targetsFound, setTargetsFound] = useState(0)
    

    useEffect(() => {
        console.log(chosenStage)
        console.log(id)
        getStage()
        
    })

    const getStage = async () => {
        try {
            const response = await axiosInstance.get(`/api/map/get?name=${id}`)

            console.log(response.data.stage)
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div>
            STAGE PAGE
        </div>
    )
}


export default StagePage