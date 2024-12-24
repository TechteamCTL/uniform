import * as fabric from 'fabric';
import { CanvasCTX } from "../../page";
import { useCallback, useContext, useEffect, useState } from 'react';

import { initializeCanvas } from '@/app/fabricSetup';
import "../../fabricSetup";

import styles from "./CanvasArea.module.css";

const CanvasArea = ({ canvasInstance, handleCanvasClick, setCanvasAreas, canvasAreas }) => {
    const { activeCanvasId, setActiveCanvas, activeCanvas, canvasArrayTotal, setCanvasArrayTotal  } = useContext(CanvasCTX);
    const [canvasArray, setCanvasArray] = useState<fabric.Canvas[]>([]);
    
    // useEffect(() => {
       
    //     const canvas = new fabric.Canvas(canvasInstance.id);
    //     if(canvas.lowerCanvasEl?.id === canvasInstance.id){
    //         setCanvasArray((prev) => [...prev, canvas]);    
    //     }

    //     if(canvasArrayTotal[canvasInstance.id]?.objects) {
    //         const savedContent = {
    //             version: canvasArrayTotal[canvasInstance.id].version || "6.5.1",
    //             objects: canvasArrayTotal[canvasInstance.id].objects,
    //         };

    //         canvas.loadFromJSON(savedContent, () => {
    //             // canvas.renderAll();
    //             canvas.requestRenderAll()
    //             console.log("savedContent being loaded:", JSON.stringify(savedContent, null, 2));
    //         });       
    //     }

    //     return () => canvas.dispose();
    // }, []);

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasInstance.id);
        // const canvas = initializeCanvas(canvasInstance.id);
        console.log("canvas", canvas)

        if (canvas.lowerCanvasEl?.id === canvasInstance.id) {
            setCanvasArray((prev) => [...prev, canvas]);
        }
    
        const loadCanvasContent = async () => {
            if (canvasArrayTotal[canvasInstance.id]?.objects) {
                const savedContent = {
                    version: canvasArrayTotal[canvasInstance.id].version || "6.5.1",
                    objects: canvasArrayTotal[canvasInstance.id].objects,
                };
    
                canvas.loadFromJSON(savedContent, () => {
                    canvas.getObjects().forEach(obj => {
                        console.log("obj", obj)
                        if(obj.type === "Textbox") {
                            obj.set({
                                lockScalingY: obj.lockScalingY ?? true,
                                editable: false,
                                cornerSize: 5,
                            });

                            console.log( obj.editable )
                            console.log( obj.cornerSize )
                        }
                    })
                    canvas.requestRenderAll();
                    console.log("savedContent being loaded:", JSON.stringify(savedContent, null, 2));
                });
            }
        };
        
        loadCanvasContent();

        

        return () => {
            canvas.dispose();
        };
    }, []);
    
    // useEffect(() => {
    //     console.log("canvasArray", canvasArray);
    //     if(canvasAreas.length > 0) {
    //         console.log(canvasArray[1])
    //         canvasArray[1]._objects.forEach(obj => {
    //             console.log(obj)
    //             if(obj.type === "Textbox") {
    //                 obj.lockScalingY = obj.lockScalingY ?? true;
    //                 obj.editable = false;
    //                 obj.cornerSize = 5;
    //             }
    //         })
    //     }
        
    // }, [canvasArray])
    
    
    useEffect(() => {
        const targetCanvas = canvasArray.find((el) => el.lowerCanvasEl?.id === activeCanvasId);
        if (targetCanvas) {
            setActiveCanvas(targetCanvas);
        }
    }, [activeCanvasId, canvasArray, setActiveCanvas]);

    const getBorderStyle = useCallback((id) => {
            return activeCanvasId === id ? "1px dashed red" : "1px dashed black";
        },
        [activeCanvasId]
    );

  
    useEffect(() => {
        
        if(activeCanvas) {
            
            activeCanvas.on("object:moving", (e) => {
                const obj = e.target;
                const { left, top, width, height, scaleX, scaleY } = obj;
          
                const canvasWidth = activeCanvas.width;
                const canvasHeight = activeCanvas.height;
       
                const objWidth = width * scaleX;
                const objHeight = height * scaleY;
    
                if (left < 0) obj.left = 0;
                if (top < 0) obj.top = 0;
                if (left + objWidth > canvasWidth) obj.left = canvasWidth - objWidth;
                if (top + objHeight > canvasHeight) obj.top = canvasHeight - objHeight;
              });


              activeCanvas.on('object:scaling', function (e) {
                const obj = e.target;
              
                // Get the current scaling factors
                const scaleX = obj.scaleX;
                const scaleY = obj.scaleY;
              
                // Calculate the new dimensions
                const newWidth = obj.width * scaleX;
                const newHeight = obj.height * scaleY;
              
                // Ensure the object stays within the canvas horizontally
                if (obj.left + newWidth > activeCanvas.width) {
                  obj.set('scaleX', (activeCanvas.width - obj.left) / obj.width);
                }
                if (obj.left < 0) {
                  obj.set('scaleX', obj.left / obj.width);
                }
              
                // Ensure the object stays within the canvas vertically
                if (obj.top + newHeight > activeCanvas.height) {
                  obj.set('scaleY', (activeCanvas.height - obj.top) / obj.height);
                }
                if (obj.top < 0) {
                  obj.set('scaleY', obj.top / obj.height);
                }
              
                // Update the canvas to reflect the new scale
                activeCanvas.renderAll();
              });

        }
       
      }, [activeCanvas]);


  return (
<div 
className={styles.editPanelCanvas} 
// onClick={() => setActiveCanvasArea(canvasInstance.id)}
onClick={(e) => {
    e.stopPropagation();
    handleCanvasClick(canvasInstance.id)}
}
style={{
    width: canvasInstance.canvasWidth, 
    height: canvasInstance.canvasHeight, 
    top: canvasInstance.canvasPositionTop, 
    left: canvasInstance.canvasPositionLeft,
    border: getBorderStyle(canvasInstance.id),
    boxSizing: "border-box",
}}
>
        <canvas
            id={canvasInstance.id}
            width={canvasInstance.canvasWidth}
            height={canvasInstance.canvasHeight}
            style={{
                position: "absolute",
                top: "0px",
                left: "0px",
            }}
        ></canvas>
</div>
  );
};

export default CanvasArea;
