import { useState, useEffect, useContext, useLayoutEffect, useCallback } from "react";
// import Image from "next/image";
import * as fabric from "fabric";

import CanvasToolbar from "../CanvasToolbar/CanvasToolbar";
import { CanvasCTX } from "../../page";

import styles from "./CanvasEditContainer.module.css";
import CanvasArea from "../CanvasArea/CanvasArea";


const sidesArray = [
    {
        side: "Front",
        src: "/tshirt-front.png",
        id: "1",
        canvasSides: [
            {
                canvasSide: "Front Left",
                canvasWidth: 110,
                canvasHeight: 50,
                canvasPositionTop: "20%",
                canvasPositionLeft: "45%",
                value: "Front Left",
                label: "Front Left",
                id: "canvas-1"
                // content: []
            },
            {
                canvasSide: "Front Right",
                canvasWidth: 110,
                canvasHeight: 50,
                canvasPositionTop: "20%",
                canvasPositionLeft: "26%",
                value: "Front Right",
                label: "Front Right",
                id: "canvas-2"
            }
        ]
    },
    {
        side: "Back",
        src: "/tshirt-back.png",
        id: "2",
        canvasSides: [
            {
                canvasSide: "Back Center",
                canvasWidth: 200,
                canvasHeight: 200,
                canvasPositionTop: "15%",
                canvasPositionLeft: "30%",
                value: "Back Center",
                label: "Back Center",
                id: "canvas-3"
            }
        ]
    },
    {
        side: "R.Sleeve",
        src: "/tshirt-sleeve-right.png",
        id: "3",
        canvasSides: [
            {
                canvasSide: "R.Sleeve Center",
                canvasWidth: 100,
                canvasHeight: 100,
                canvasPositionTop: "20%",
                canvasPositionLeft: "32%",
                value: "R.Sleeve Center",
                label: "R.Sleeve Center",
                id: "canvas-4"

            }
        ]
    },
    {
        side: "L.Sleeve",
        src: "/tshirt-sleeve-left.png",
        id: "4",
        canvasSides: [
            {
                canvasSide: "L.Sleeve Center",
                canvasWidth: 100,
                canvasHeight: 100,
                canvasPositionTop: "20%",
                canvasPositionLeft: "42%",
                value: "L.Sleeve Center",
                label: "L.Sleeve Center",
                id: "canvas-5"

            }
        ]
    }
]

const CanvasEditContainer = ({
    setActiveCanvasArea,
    activeCanvasArea,
    activeCanvas,
    setActiveCanva,
    setIsOpenEditingPanel,
    isOpenEditingPanel
}) => {
    
    const [backgroundImage, setBackgroundImage] = useState("/tshirt-front.png");
    const [selectedSideId, setSelectedSideId] = useState<string>("");
    const [editableAreas, setEditableAreas] = useState<
    { canvasSide: string; canvasWidth: number; canvasHeight: number, canvasPositionTop: number | string, canvasPositionLeft: number | string, id: string }[]
  >([]);

  const [canvasAreas, setCanvasAreas] = useState([])

  const { setActiveCanvasId } = useContext(CanvasCTX);

    const handleCanvasClick = (canvasId: string) => {
    setActiveCanvasArea(canvasId);
    setActiveCanvasId(canvasId);

  };

useEffect(() => {
    setEditableAreas(sidesArray[0].canvasSides)
    setSelectedSideId(sidesArray[0].id)
    setBackgroundImage(sidesArray[0].src)
    setActiveCanvasArea(sidesArray[0].canvasSides[0].id);
}, []);


    return(
        <div className={styles.editPanel}>
            <div className={styles.editPanelContainer}>
                <div className={styles.editPanelWrapper} style={{width: "834px", height: "834px"}}>
                    <img src={backgroundImage} alt="image" className={styles.editPanelImage} />
                    {editableAreas.map((area, index) => (
                           <CanvasArea
                            key={area.id}
                            canvasInstance={area}
                            handleCanvasClick={handleCanvasClick}
                            setCanvasAreas={setCanvasAreas}
                            canvasAreas={canvasAreas}
                            /> 
                        ))} 
                </div>
            </div>
            <CanvasToolbar 
                setBackgroundImage={setBackgroundImage} 
                setEditableAreas={setEditableAreas}
                sidesArray={sidesArray}
                selectedSideId={selectedSideId}
                setSelectedSideId={setSelectedSideId}
                setActiveCanvasArea={setActiveCanvasArea}
                activeCanvasArea={activeCanvasArea}
                // handleCanvasClick={handleCanvasClick}
                setIsOpenEditingPanel={setIsOpenEditingPanel}
                />
        </div>
       
    )
}

export default CanvasEditContainer;
