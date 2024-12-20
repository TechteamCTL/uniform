import { useCanvasContext } from '../context/CanvasContext';

const useCanvas = () => {
  const context = useCanvasContext();
  if (!context) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
};

export default useCanvas;