import { useContext, useEffect, useState, useCallback } from "react";
import { CloseCircleOutlined } from '@ant-design/icons';
import { CanvasCTX } from "../../page";
import * as fabric from "fabric";
import {addDeleteControlToTextbox} from "../../fabricSetup";

import styles from "./MenuToolbar.module.css";
import TextEditingPanel from "../TextEditingPanel/TextEditingPanel";

const MenuToolbar = ({isOpenEditingPanel, setIsOpenEditingPanel}) => {
    const { activeCanvasId, activeCanvas, setCanvasArrayTotal  } = useContext(CanvasCTX);
    const deleteIcon =
    // "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTEyIDY0YzI0Ny40IDAgNDQ4IDIwMC42IDQ0OCA0NDhTNzU5LjQgOTYwIDUxMiA5NjAgNjQgNzU5LjQgNjQgNTEyIDI2NC42IDY0IDUxMiA2NHptMCA3NmMtMjA1LjQgMC0zNzIgMTY2LjYtMzcyIDM3MnMxNjYuNiAzNzIgMzcyIDM3MiAzNzItMTY2LjYgMzcyLTM3Mi0xNjYuNi0zNzItMzcyLTM3MnptMTI4LjAxIDE5OC44M2MuMDMgMCAuMDUuMDEuMDkuMDZsNDUuMDIgNDUuMDFhLjIuMiAwIDAxLjA1LjA5LjEyLjEyIDAgMDEwIC4wN2MwIC4wMi0uMDEuMDQtLjA1LjA4TDU1Ny4yNSA1MTJsMTI3Ljg3IDEyNy44NmEuMjcuMjcgMCAwMS4wNS4wNnYuMDJhLjEyLjEyIDAgMDEwIC4wN2MwIC4wMy0uMDEuMDUtLjA1LjA5bC00NS4wMiA0NS4wMmEuMi4yIDAgMDEtLjA5LjA1LjEyLjEyIDAgMDEtLjA3IDBjLS4wMiAwLS4wNC0uMDEtLjA4LS4wNUw1MTIgNTU3LjI1IDM4NC4xNCA2ODUuMTJjLS4wNC4wNC0uMDYuMDUtLjA4LjA1YS4xMi4xMiAwIDAxLS4wNyAwYy0uMDMgMC0uMDUtLjAxLS4wOS0uMDVsLTQ1LjAyLTQ1LjAyYS4yLjIgMCAwMS0uMDUtLjA5LjEyLjEyIDAgMDEwLS4wN2MwLS4wMi4wMS0uMDQuMDYtLjA4TDQ2Ni43NSA1MTIgMzM4Ljg4IDM4NC4xNGEuMjcuMjcgMCAwMS0uMDUtLjA2bC0uMDEtLjAyYS4xMi4xMiAwIDAxMC0uMDdjMC0uMDMuMDEtLjA1LjA1LS4wOWw0NS4wMi00NS4wMmEuMi4yIDAgMDEuMDktLjA1LjEyLjEyIDAgMDEuMDcgMGMuMDIgMCAuMDQuMDEuMDguMDZMNTEyIDQ2Ni43NWwxMjcuODYtMTI3Ljg2Yy4wNC0uMDUuMDYtLjA2LjA4LS4wNmEuMTIuMTIgMCAwMS4wNyAweiIgLz48L3N2Zz4="
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
    const activeObject = activeCanvas?.getActiveObject();
  let deleteImg = document.createElement('img');
  deleteImg.src = deleteIcon;

  const cloneIcon =   "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A";
  const cloneImg = document.createElement('img');
  cloneImg.src = cloneIcon;

  function renderIcon(ctx, left, top, _styleOverride, fabricObject) {
    const size = 16;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  
  function renderCloneIcon(ctx, left, top, _styleOverride, fabricObject) {
    const size = 16;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(cloneImg, -size / 2, -size / 2, size, size);
    ctx.restore();
  }
  
  const addTextToCanvas = () => {
      setIsOpenEditingPanel(true)
        if(activeCanvasId && activeCanvas) {
            console.log("activeCanvas", activeCanvas)
            // const canvas = new fabric.Canvas(activeCanvasId);
            const text = new fabric.Textbox("Edit text", {
                    width: 100,
                    fontSize: 20,
                    fill: "black",
                    opacity: 1,
                    visible: true,
                    hasBorders: true,
                    editable: false,
                    centeredScaling: true,
                    cornerSize: 5,
                    dynamicMaxWidth: 150,
                    lockScalingY: true,
                    transparentCorners: false,
                    hoverCursor: "pointer",
                    isWrapping: true,
                });


                text.controls.tr = new fabric.Control({
                  x: 0.5,
                  y: -0.5,
                  cursorStyle: 'pointer',
                  mouseUpHandler: deleteActiveObject,
                  render: renderIcon,
                });

                text.controls.tl = new fabric.Control({
                  x: -0.5,
                  y: -0.5,
                  cursorStyle: 'pointer',
                  mouseUpHandler: cloneObject,
                  render: renderCloneIcon,
                });
                


                activeCanvas.add(text)
                // activeCanvas.renderAll();
                activeCanvas.centerObject(text);
                activeCanvas.setActiveObject(text);
                activeCanvas.requestRenderAll();

                // const jsonContent = JSON.stringify(activeCanvas.toJSON());
                const jsonContent = JSON.stringify(activeCanvas.toJSON(["dynamicMaxWidth", "lockScalingY", "isWrapping", "cornerSize"]));
                console.log(jsonContent)
                // return () => activeCanvas.dispose()
        }
              
  }


  useEffect(() => {
            if (activeCanvas) {
              const handleActiveObject = () => {
                setIsOpenEditingPanel(false)
                  const activeObject = activeCanvas.getActiveObject();
      
                  if (activeObject) {
                      if (activeObject.type === "textbox") {

                        activeObject.controls = activeObject.controls || {};
                        activeObject.controls.tr = new fabric.Control({
                            x: 0.5,
                            y: -0.5,
                            cursorStyle: "pointer",
                            mouseUpHandler: deleteActiveObject,
                            render: renderIcon,
                        });

                        activeObject.controls.tl = new fabric.Control({
                          x: -0.5,
                          y: -0.5,
                          cursorStyle: 'pointer',
                          mouseUpHandler: cloneObject,
                          render: renderCloneIcon,
                        });
                    

                          activeObject.set({
                              lockScalingY: true,
                              editable: false,
                              dynamicMaxWidth: 100,
                              isWrapping: true,
                              cornerSize: 8,
                              transparentCorners: false,
                              hoverCursor: "pointer",
                          });
      
                          console.log("Customized Textbox:", activeObject);
      
                          activeCanvas.requestRenderAll();
                      }

                      setIsOpenEditingPanel(true);
                  }
              };
      
              // Attach event listeners
              activeCanvas.on("selection:created", handleActiveObject);
              activeCanvas.on("selection:updated", handleActiveObject);
              activeCanvas.on("selection:cleared", () => {
                setIsOpenEditingPanel(false)
              });
      
              return () => {
                  // Cleanup event listeners
                  activeCanvas.off("selection:created", handleActiveObject);
                  activeCanvas.off("selection:updated", handleActiveObject);
                  activeCanvas.off("selection:cleared", () => {
                    setIsOpenEditingPanel(false)
                });
              };
          }
  }, [activeCanvas]);
          

  const saveCanvasContent = useCallback(() => {
            if (activeCanvasId && activeCanvas) {
              const jsonContent = JSON.stringify(activeCanvas.toJSON());
              const canvasData = activeCanvas.toJSON();
              const canvasObjects = canvasData.objects;
              console.log("jsonContent", jsonContent);

              setCanvasArrayTotal((prev) => ({
                ...prev,
                [activeCanvasId]: {
                  version: canvasData.version,
                  objects: canvasObjects,
                },
              }))
            }
  }, [activeCanvas, activeCanvasId]);

  useEffect(() => {
            if (activeCanvas) {
              // const handleObjectModified = () => saveCanvasContent();

              const handleObjectModified = (e) => {
                console.log("Object modified:", e.target);
                saveCanvasContent();
            };

              // activeCanvas.on("object:modified", handleObjectModified);
              activeCanvas.on("object:moving", handleObjectModified)
              activeCanvas.on("object:added", handleObjectModified);
              activeCanvas.on("object:removed", handleObjectModified);
          
              return () => {
                // activeCanvas.off("object:modified", handleObjectModified);
                activeCanvas.off("object:moving", handleObjectModified)
                activeCanvas.off("object:added", handleObjectModified);
                activeCanvas.off("object:removed", handleObjectModified);
              };
            }
  }, [activeCanvas, saveCanvasContent]);


  const deleteActiveObject = () => {
            if (activeCanvas) {
                const activeObject = activeCanvas.getActiveObject();
                
    
                if (activeObject) {
              
                    activeCanvas.remove(activeObject);
                    activeCanvas.discardActiveObject();
                    activeCanvas.requestRenderAll();
                    console.log("Object deleted:", activeObject);
    
                    // Update saved canvas content
                    const canvasData = activeCanvas.toJSON();
                    setCanvasArrayTotal((prev) => ({
                        ...prev,
                        [activeCanvasId]: {
                            version: canvasData.version,
                            objects: canvasData.objects,
                        },
                    }));
                }
            }
  };

  useEffect(() => {
          const handleKeyPress = (e) => {
              if (e.key === "Delete") {
                  deleteActiveObject();
              }
          };
  
          document.addEventListener("keydown", handleKeyPress);
          return () => document.removeEventListener("keydown", handleKeyPress);
  }, [activeCanvas]);

  function cloneObject(_eventData, transform) {
    const canvas = transform.target.canvas;
    transform.target.clone().then((cloned) => {
      cloned.left += 10;
      cloned.top += 10;
      cloned.controls.tr = transform.target.controls.tr;
      cloned.controls.tl = transform.target.controls.tl;
      canvas.add(cloned);
    });
  }

    return (
        <div className={`${styles.menuContainer}`}>
            <div className={styles.verticalToolbar}>
                <div className={styles.verticalToolbarButtonGroup}>
                    <div className={`${styles.menuButton} ${styles.isActionable} ${styles.verticalToolbarItem}`}>
                        <div className={styles.menuButtonIcon} data-testid="MenuButton-icon">
                            <svg id="_11-upload" data-name="11-upload" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.98 38.98">
                            <path className="cls-1" d="M19.38 24.81h.22l-.11-.1Z"></path>
                            <path className="cls-1" d="M27.91 15.91h-.35v-.53a6.39 6.39 0 0 0-12.22-2.61 3.81 3.81 0 0 0-5.3 2.78 4.71 4.71 0 0 0 1.26 9.24h3.75l.06-.08L18 21.94a2.08 2.08 0 0 1 2.89 0l2.9 2.79.06.08h4a4.45 4.45 0 0 0 .06-8.9Z"></path>
                            <path className="cls-1" d="M22.79 25.81 19.9 23a.58.58 0 0 0-.81 0l-2.9 2.79a.58.58 0 0 0 .41 1h1.47V30h2.86v-3.18h1.47a.58.58 0 0 0 .39-1.01Z"></path>
                            </svg>
                        </div>
                    <div data-testid="MenuButton-text" className={styles.menuButtonText}>Upload</div>
                    </div>
                    <div className={`${styles.menuButton} ${styles.isActionable} ${styles.verticalToolbarItem}`} >
                        <div className={styles.menuButtonIcon} data-testid="MenuButton-icon">
                            <svg id="_13-add-text" data-name="13-add-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.98 38.98">
                            <path className="cls-1" d="M14.77 29.05v-2.54h3v-14h-3.82v4.08h-2.77V9.93H27.8v6.62H25v-4.08h-3.79v14h3v2.54h-9.44Z"></path>
                            </svg>
                        </div>
                        {/* <div data-testid="MenuButton-text" className={styles.menuButtonText}>Add Text</div> */}
                        <button className={styles.menuButtonText} onClick={addTextToCanvas}>Add Text</button>
                    </div>
                </div>
            </div>

            {isOpenEditingPanel && <TextEditingPanel saveCanvasContent={saveCanvasContent} activeObject={activeObject} />}

        </div>
    )
}

export default MenuToolbar;