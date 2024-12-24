import { Typography } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import * as fabric from "fabric";
import { useContext, useEffect, useState, useCallback } from "react";



import styles from "./ImageEditingPanel.module.css";
import { CanvasCTX } from "@/app/page";

const { Title } = Typography;
const { Dragger } = Upload;



const ImageEditingPanel = () => {
  const { activeCanvas, setCanvasArrayTotal, canvasArrayTotal, activeCanvasId  } = useContext(CanvasCTX);

  const addImageToCanvas = (e) => {
    if(canvasArrayTotal && canvasArrayTotal[activeCanvasId]?.objects.length === 2) return;

    if(activeCanvasId && activeCanvas) {
     let imgObj = e.target.files[0];
     let reader = new FileReader();
     reader.readAsDataURL(imgObj);
     reader.onload = (e) => {
      let imageUrl = e.target.result;
      let imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageElement.onload = function () {
      //   let image = new fabric.Image(imageElement, (img) => {
      //     const desiredWidth = 100;
      //     const desiredHeight = 100;
      //     console.log(img.width)

      //     const scaleX = desiredWidth / img.width;
      // const scaleY = desiredHeight / img.height;

      //     img.set({
      //       left: 100,  // X position
      //       top: 100,   // Y position
      //       angle: 0,   // Rotation angle
      //       scaleX: scaleX,
      //       scaleY: scaleY,
      //               });
      //   });

      const canvasWidth = activeCanvas.width;
    const canvasHeight = activeCanvas.height;

    const imgWidth = imageElement.width;
    const imgHeight = imageElement.height;

    // Scale image to fit within the canvas size
    const scaleX = canvasWidth / imgWidth;
    const scaleY = canvasHeight / imgHeight;

    const scaleFactor = Math.min(scaleX, scaleY);

      const image = new fabric.Image(imageElement, {
        // scaleX: 0.08,
        // scaleY: 0.08,
        cornerSize: 5,
        // width: 100
        scaleX: scaleFactor,
      scaleY: scaleFactor,
      });

      image.controls = {
  
        tl: new fabric.Control({ x: -0.5, y: -0.5, offsetX: 0, offsetY: 0, cursorStyle: 'crosshair', visible: true, actionHandler: fabric.controlsUtils.scalingEqually,  }),
        tr: new fabric.Control({ x: 0.5, y: -0.5, offsetX: 0, offsetY: 0, cursorStyle: 'crosshair', visible: true, actionHandler: fabric.controlsUtils.scalingEqually,  }),
        bl: new fabric.Control({ x: -0.5, y: 0.5, offsetX: 0, offsetY:0, cursorStyle: 'crosshair', visible: true, actionHandler: fabric.controlsUtils.scalingEqually,  }),
        br: new fabric.Control({ x: 0.5, y: 0.5, offsetX: 0, offsetY:0, cursorStyle: 'crosshair', visible: true, actionHandler: fabric.controlsUtils.scalingEqually,  }),

      }
      
        
  
        activeCanvas.add(image);
        activeCanvas.centerObject(image);
        activeCanvas.setActiveObject(image);
        // activeCanvas.renderAll();
      }
     }
  }
  }

    return <div className={styles.imageEditingPanel}>
        <Title level={4} className={styles.imageEditingPanelTitle}>Image Editing Panel</Title>
       <input type="file" accept="image/*" onChange={addImageToCanvas}/> 
    </div>
}

export default ImageEditingPanel;