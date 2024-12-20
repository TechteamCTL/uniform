import React, { createContext, useContext, useState, ReactNode } from 'react';

type CanvasObject = {
    left: number;
    top: number;
    fill: string;
    fontSize: number;
    text: string;
    type: 'text';
};

type CanvasArea = {
    id: string;
    objects: CanvasObject[];
    name: string;
  };

  interface CanvasContextType {
    canvasAreas: CanvasArea[];
    activeCanvasId: string;
    setActiveCanvas: (id: string) => void;
    activeCanvasArea: fabric.Canvas | null;
    setActiveCanvasArea: (canvas: fabric.Canvas) => void;
    addTextToActiveCanvas: (text: string, color: string) => void;
    updateCanvasObjects: (id: string, objects: CanvasObject[]) => void;
    canvasArrayTotal: { [key: string]: { version: string; objects: any[] } };
    setCanvasArrayTotal: React.Dispatch<React.SetStateAction<{ [key: string]: { version: string; objects: any[] } }>>;
  }
  
  const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

  export const useCanvasContext = (): CanvasContextType => {
    const context = useContext(CanvasContext);
    if (!context) {
      throw new Error('useCanvas must be used within a CanvasProvider');
    }
    return context;
  };

  export const CanvasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [canvasAreas, setCanvasAreas] = useState<CanvasArea[]>([
      { id: "canvas-1", objects: [], name: 'Area 1' },
      { id: "canvas-2", objects: [], name: 'Area 2' },
    ]);
    const [activeCanvasId, setActiveCanvasId] = useState<string>("canvas-1");
    const [canvasArrayTotal, setCanvasArrayTotal] = useState<{ 
        [key: string]: { version: string; objects: any[] }
      }>({});

      const [ activeCanvasArea, setActiveCanvasArea ] = useState(null)
    
  
    const setActiveCanvas = (id: string) => {
      setActiveCanvasId(id);
    };
  
    const addTextToActiveCanvas = (text: string, color: string) => {
      setCanvasAreas((prevAreas) =>
        prevAreas.map((area) => {
          if (area.id === activeCanvasId) {
            const newObject: CanvasObject = {
              left: 100,
              top: 100,
              fill: "black",
              fontSize: 30,
              text: text,
              type: 'text',
            };
            area.objects.push(newObject);
          }
          return area;
        })
      );
    };
  
    const updateCanvasObjects = (id: string, objects: CanvasObject[]) => {
      setCanvasAreas((prevAreas) =>
        prevAreas.map((area) => {
          if (area.id === id) {
            area.objects = objects;
          }
          return area;
        })
      );
    };
  
    return (
      <CanvasContext.Provider
        value={{
          canvasAreas,
          activeCanvasId,
          setActiveCanvas,
          addTextToActiveCanvas,
          updateCanvasObjects,
          canvasArrayTotal, 
          setCanvasArrayTotal,
          activeCanvasArea, 
          setActiveCanvasArea
        }}
      >
        {children}
      </CanvasContext.Provider>
    );
  };
