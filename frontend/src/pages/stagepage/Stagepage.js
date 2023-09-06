import React, { useContext, useEffect, useRef, useState } from "react";
import MyContext from "../../components/context/MyContext";
import { useParams } from "react-router-dom";
import axiosInstance from '../../modules/axiosInstance'
import TopTimer from "../../components/timer/topTimer";
import './stagepage.css'
import GameStartModal from "../../components/modals/gameStart";


const StagePage = () => {

    // const {chosenStage, setChosenStage} = useContext(MyContext)
    const { id } = useParams()

    const [chosenMap, setChosenMap] = useState()

    const [isGameOver, setIsGameOver] = useState(false)

    const [targets, setTargets] = useState([])

    const [isSelectionOpen, setIsSelectionOpen] = useState(false)

    const [relativeCords, setRelativeCords] = useState()

    const containerRef = useRef(null)
    const [popUpPosition, setPopUpPosition] = useState({})

    const [viewportSize, setViewPortSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const [needRefresh, setneedRefresh] = useState(false)

    const [isGameReady, setIsGameReady] = useState(false)

    const [timer, setTimer] = useState(0)
    

    useEffect(() => {
        
        console.log(id)
        getStage()
        window.addEventListener('resize', handleResize)

       
       
        

        return () => {
            window.removeEventListener('resize', handleResize)
        }

        
        
    }, [])

    useEffect(() => {
        if (isGameReady) {
            checkIfGameWon()
        }
    },[needRefresh])

    const getStage = async () => {
        try {
            const response = await axiosInstance.get(`/api/map/get?name=${id}`)

            console.log(response.data.stage)
            setChosenMap(response.data.stage)
            const targetAdjusted = response.data.stage[0].targets.map((node) => ({
                ...node,
                found: false
            }))
            setTargets(targetAdjusted)
            
            
        } catch (err) {
            console.log(err)
        }
    }

    const checkIfGameWon = () => {
        const allTargetsFound = targets.every(node => node.found === true)
        console.log(isGameReady, 'game ready')
        if (allTargetsFound) {
            console.log(`game won, all found in ${timer}`)
            setIsGameOver(true)
        } else {
            console.log('game ongoing')
            console.log(allTargetsFound)
            
        }
    }

    const handleTargetInput = async (id) => {
        try {
            const response = await axiosInstance.get(`/api/targets/confirm?id=${id}&cordX=${relativeCords.x}&cordY=${relativeCords.y}`)

            console.log(response.data.cords)
            console.log(response.data.message)
            console.log(response.data.found, 'found')
            console.log('targets', targets)
            if (response.data.found) {
                setTargets((prev) => {
                    return prev.map((node) => {
                        return node._id === id ? {...node, found:true} : node
                    })
                })

                setneedRefresh(prev => !prev)

                
            }
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
            {isGameReady ? null : 
            <div className="overlay">
                <GameStartModal targets={targets} closeModal={() => setIsGameReady(true)}></GameStartModal>
            </div>
            }

            {chosenMap && 
            <TopTimer targets={targets} isGameReady={isGameReady} isGameOver={isGameOver} timer={timer} setTimer={setTimer}></TopTimer>
            }
            {
                chosenMap &&
                <div className="stage-box">
                    <button onClick={checkIfGameWon}>
                        CHECK GAME CON
                    </button>
                
                <img className="map-div" src={chosenMap[0].stageUrl} onClick={getMouseCords} ref={containerRef}></img>

                {
                targets &&
                <div className={popUpPosition.y ? "popUpMenu" : "popUpMenu hidden"} style={{
                    top: popUpPosition.y + 'px',
                    left: popUpPosition.x + 'px'

                }}>
                   { targets.map((node) => {


                        return (
                            <div className={node.found ? 'menuSelect found' : 'menuSelect'} key={node._id} style={{
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