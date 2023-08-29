import React, { useContext, useEffect, useRef, useState } from "react";
import MyContext from "../../components/context/MyContext";
import { useParams } from "react-router-dom";
import axiosInstance from '../../modules/axiosInstance'
import TopTimer from "../../components/timer/topTimer";
import './stagepage.css'


const StagePage = () => {

    // const {chosenStage, setChosenStage} = useContext(MyContext)
    const { id } = useParams()

    const [chosenMap, setChosenMap] = useState()

    const [targetsFound, setTargetsFound] = useState(0)

    const containerRef = useRef(null)

    const [viewportSize, setViewPortSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    

    useEffect(() => {
        
        console.log(id)
        getStage()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
        
    }, [])

    const getStage = async () => {
        try {
            const response = await axiosInstance.get(`/api/map/get?name=${id}`)

            console.log(response.data.stage)
            setChosenMap(response.data.stage)
        } catch (err) {
            console.log(err)
        }
    }

    const getWindowsDimensions = () => {
        console.log(window.innerWidth)
        console.log(window)
    }

    const getMouseCords = (e) => {
        
        const container = containerRef.current
        if (container) {
            
            
            const relativeX = Math.floor((e.nativeEvent.offsetX / e.target.clientWidth ) * 100)
            const relativeY = Math.floor((e.nativeEvent.offsetY / e.target.clientHeight) * 100)

            
            console.log('relative', relativeX, relativeY)
        }

        
    }

    const handleResize = () => {
        setViewPortSize({
            width: window.innerWidth,
            height: window.innerHeight
        })

        
    }



    return (
        <div>
            <div>VIEWPORT WIDTH:{viewportSize.width}</div>
            <div>VIEWPORT HEIGHT:{viewportSize.height}</div>
            <button onClick={getWindowsDimensions}>TEST STUFF</button>
            {chosenMap && 
            <TopTimer targets={chosenMap[0].targets}></TopTimer>
            }
            {
                chosenMap &&
                <div className="stage-box">
                
                <img className="map-div" src={chosenMap[0].stageUrl} onClick={getMouseCords} ref={containerRef}></img>
                
                
               


            </div>
            }
            
            
        </div>
    )
}


export default StagePage