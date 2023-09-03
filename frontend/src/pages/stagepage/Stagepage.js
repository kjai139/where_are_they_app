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

    const [targets, setTargets] = useState([])

    const [isSelectionOpen, setIsSelectionOpen] = useState(false)

    const [relativeCords, setRelativeCords] = useState()

    const containerRef = useRef(null)
    const [popUpPosition, setPopUpPosition] = useState({})

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
            setTargets(response.data.stage[0].targets)
            
        } catch (err) {
            console.log(err)
        }
    }

    const getWindowsDimensions = () => {
        console.log(window.innerWidth)
        console.log(window)
    }

    const handleTargetInput = async (id) => {
        try {
            const response = await axiosInstance.get(`/api/targets/confirm?id=${id}&cordX=${relativeCords.x}&cordY=${relativeCords.y}`)

            console.log(response.data.cords)
            console.log(response.data.message)
        } catch (err) {
            console.log(err)
        }
    }

    const getMouseCords = (e) => {
        console.log(e.nativeEvent.offsetX)
        console.log(e.nativeEvent.offsetY)

        if (viewportSize.x > 850) {
            let adjustedX = (viewportSize.x - 1080) / 2 + e.nativeEvent.offsetX

            setPopUpPosition({x: adjustedX, y:e.nativeEvent.offsetY})
        } else {
            setPopUpPosition({x: e.nativeEvent.offsetX, y:e.nativeEvent.offsetY})
        }
        
        
        const container = containerRef.current
        if (container) {
            
            
            const relativeX = Math.floor((e.nativeEvent.offsetX / e.target.clientWidth ) * 100)
            const relativeY = Math.floor((e.nativeEvent.offsetY / e.target.clientHeight) * 100)

            setRelativeCords({
                x: relativeX,
                y: relativeY
            })

            
            console.log('relative', relativeX, relativeY)
        }

        
    }

    const handleResize = () => {
        setViewPortSize({
            x: window.width,
            y: window.height,
        })

        
    }



    return (
        <div>
            
            {chosenMap && 
            <TopTimer targets={chosenMap[0].targets}></TopTimer>
            }
            {
                chosenMap &&
                <div className="stage-box">
                
                <img className="map-div" src={chosenMap[0].stageUrl} onClick={getMouseCords} ref={containerRef}></img>

                {
                targets &&
                <div className="popUpMenu" style={{
                    top: popUpPosition.y + 'px',
                    left: popUpPosition.x + 'px'

                }}>
                   { targets.map((node) => {


                        return (
                            <div key={node._id} style={{
                                display:'flex',
                                alignItems:'center',
                                gap:'5px'
                            }} onClick={() => handleTargetInput(node._id)}>
                                <img className="popUpImg" src={node.imgUrl}>
                                </img>
                                <span>{node.name.charAt(0).toUpperCase() + node.name.slice(1)}</span>
                            </div>
                        )
                    })}
                    
                    

                </div>
            }
                
                
               


            </div>
            }
           
            
            
        </div>
    )
}


export default StagePage