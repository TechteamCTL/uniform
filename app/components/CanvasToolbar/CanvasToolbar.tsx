// import { useState } from "react";
import Image from "next/image";
import { Select } from 'antd';
import styles from "./CanvasToolbar.module.css";
import { useCallback, useState, useContext } from "react";
import { CanvasCTX } from "../../page";

type CanvasToolbarProps = {
    setBackgroundImage: (value: string) => void;
    setEditableAreas: (value: { canvasSide: string; canvasWidth: number; canvasHeight: number, canvasPositionTop: number | string, canvasPositionLeft: number | string,  id: string }[]) => void;
    sidesArray: any;
    selectedSideId: string;
    setSelectedSideId: (value: string) => void;
    setActiveCanvasArea: (value: any) => void;
    // handleCanvasClick: (value: string) => void;
    activeCanvasArea: string;
    setIsOpenEditingPanel: () => void;

}

const CanvasToolbar = ({setBackgroundImage, setEditableAreas, sidesArray, selectedSideId, setSelectedSideId, setActiveCanvasArea, activeCanvasArea, setIsOpenEditingPanel } : CanvasToolbarProps) => {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const { setActiveCanvasId, activeCanvasId } = useContext(CanvasCTX);

    const chooseSideHandler = (id: string) => {
        // console.log("choose")

        if (isSelectOpen) return;

        const selectedSide = sidesArray.find((item) => item.id === id);
        if (selectedSide?.src) {
          setBackgroundImage(selectedSide.src);
          setSelectedSideId(id);
          setEditableAreas(selectedSide.canvasSides);
          setActiveCanvasArea(selectedSide.canvasSides[0].id)
          setActiveCanvasId(selectedSide.canvasSides[0].id)
          return;
        }
        setBackgroundImage(sidesArray[0]?.src || "");
        setSelectedSideId(id);
        setEditableAreas(sidesArray[0]?.canvasSides || []);
        setActiveCanvasArea(sidesArray.canvasSides[0].id)
        setActiveCanvasId(selectedSide.canvasSides[0].id)
        // console.log(selectedSide.canvasSides[0].id);
        
      };

    const handleChange = (value: string, canvasId: string, id: string) => {
    // console.log("canvasId", canvasId)
        if(id !== selectedSideId) {
            const selectedSide = sidesArray.find((item) => item.id === id);
            setSelectedSideId(id);
            setBackgroundImage(selectedSide.src);
            setSelectedSideId(id);
            setEditableAreas(selectedSide.canvasSides);
            setActiveCanvasId(selectedSide.id)
        }
        setActiveCanvasArea(canvasId);
        setActiveCanvasId(canvasId.id)
    };

    const handleSelectOpenChange = (open: boolean) => {
        setIsSelectOpen(open);
    };

    return <div className={styles.canvasToolbar}>
            <div className={styles.canvasToolbarChangeViews}>
            <div className={styles.canvasToolbarChangeViewsTitle}>Locations</div>
            {sidesArray.map((side, index) => {
                        const isSelected = side.id === selectedSideId;                       
                        return <div key={index} className={`${styles.menu} ${styles.canvasToolbarMenu} ${isSelected ? styles.selected : ""}`} onClick={() => {
                            chooseSideHandler(side.id)
                            setIsOpenEditingPanel(false)
                            }}>
                            <div className={`${styles.menuButton} ${styles.isActionable} ${styles.canvasToolbarChangeViewButton} ${styles.label4}`}>
                                <div className={`${styles.canvasContainerChangeView} ${isSelected ? styles.highlight : ""}` }
                                >
                                    <Image src={side.src} width={56} height={60} alt={side.side} />
                                </div>
                                <div className={styles.MenuButtonText}>
                                    {side.canvasSides.length > 1 ? 
                                        <Select
                                        popupMatchSelectWidth={200}
                                        defaultValue="Front Left"
                                        style={{ width: 100 }}
                                        onChange={(value, id) => handleChange(value, id, side.id)}
                                        onDropdownVisibleChange={handleSelectOpenChange}
                                        options={side.canvasSides}
                                       
                                        /> 
                                        : side.side    
                                    }
                                </div>
                            </div>
                        </div>
                    })}
            </div>
            </div>
}

export default CanvasToolbar;