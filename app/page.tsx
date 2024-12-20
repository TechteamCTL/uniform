"use client"

import MenuToolbar from "./components/MenuToolbar/MenuToolbar";

import React, { useState, useEffect, createContext, useLayoutEffect } from "react";
import * as fabric from "fabric";
import styles from "./page.module.css";
import CanvasEditContainer from "./components/CanvasEditContainer/CanvasEditContainer";
import TextEditingPanel from "./components/TextEditingPanel/TextEditingPanel";
import CanvasSendSharePanel from "./components/CanvasSendSharePanel/CanvasSendSharePanel";
import { ColorPicker } from "antd";

export const CanvasCTX = createContext<CanvasContext>({
  activeCanvasId: null,
  setActiveCanvasId: () => {},
  activeCanvas: undefined,
  setActiveCanvas: () => {},
  // canvasInstances: {},
  // setCanvasInstances: () => {},
  canvasArrayTotal: {},
  setCanvasArrayTotal: () => []
});

// type CanvasInstances = Map<string, Map<string, { canvas: fabric.Canvas; positionTop: string; positionLeft: string, id: string, sideId: string }>>;

type CanvasContext = {
  activeCanvasId: string | null;
  setActiveCanvasId: (id: string) => void;
  activeCanvas: fabric.Canvas | undefined;
  setActiveCanvas: (canvas: fabric.Canvas) => void;

  // canvasInstances: { 
  //   [key: string]: { 
  //     canvas: fabric.Canvas; 
  //     positionTop: string; 
  //     positionLeft: string; 
  //     id: string,
  //     sideId: string
  //   }; 
  // };
  // setCanvasInstances: (
  //   canvasInstances: { 
  //     [key: string]: { 
  //       canvas: fabric.Canvas; 
  //       positionTop: string; 
  //       positionLeft: string; 
  //       id: string ,
  //       sideId: string
  //     }; 
  //   }
  // ) => void;
  // canvasArrayTotal: {},
  // setCanvasArrayTotal: () => void;
  canvasArrayTotal: { [key: string]: { version: string; objects: any[] } };
  setCanvasArrayTotal: React.Dispatch<React.SetStateAction<{ [key: string]: { version: string; objects: any[] } }>>;

};

export default function Home() {
  const [activeCanvasArea, setActiveCanvasArea] = useState("canvas-1");
  const [ isOpenEditingPanel, setIsOpenEditingPanel ] = useState(false);
  // const [editText, setEditText] = useState("Edit this text");


  // const [canvasVal, setCanvasVal] = useState<fabric.Canvas>();
  // const setCanvas = (canv: fabric.Canvas) => {
  //   setCanvasVal(canv);
  // };

  const [activeCanvas, setActiveCanvas] = useState<fabric.Canvas | undefined>(undefined);
  const [activeCanvasId, setActiveCanvasId] = useState<string | null>(null);
  // const [canvasInstances, setCanvasInstances] = useState<Map<string, CanvasInstances>>(new Map());
  const [canvasArrayTotal, setCanvasArrayTotal] = useState<{ 
    [key: string]: { version: string; objects: any[] }
  }>({});

useEffect(() => {
  setActiveCanvasId('canvas-1')
}, [])
  
  // const updateCanvasInstances = (canvasId: string, canvas: fabric.Canvas) => {
  //   console.log("update")
  // };

  console.log("canvasArrayTotal", canvasArrayTotal)

  
  return (
    <CanvasCTX.Provider value={{ activeCanvasId, setActiveCanvasId, 
    // canvasInstances, setCanvasInstances, 
    activeCanvas, setActiveCanvas, canvasArrayTotal, setCanvasArrayTotal}}>
    <main className={styles.main}>
      <MenuToolbar 
        isOpenEditingPanel={isOpenEditingPanel} 
        setIsOpenEditingPanel={setIsOpenEditingPanel} 
        // setEditText={setEditText} 
        // editText={editText}
        />
      <CanvasEditContainer
        setActiveCanvasArea={setActiveCanvasArea}
        activeCanvasArea={activeCanvasArea}
        activeCanvas={activeCanvas}
        setActiveCanva={setActiveCanvas}
        isOpenEditingPanel={isOpenEditingPanel}
        setIsOpenEditingPanel={setIsOpenEditingPanel}
      />
      <CanvasSendSharePanel />
    </main>
    
    </CanvasCTX.Provider>
  );
}
