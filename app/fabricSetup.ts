import * as fabric from 'fabric';

// Shared fabric.Canvas instance
let canvas = null;

const deleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

// Delete icon image
let deleteImg = document.createElement('img');
deleteImg.src = deleteIcon;

// Render the delete icon
function renderIcon(ctx, left, top, _styleOverride, fabricObject) {
  const size = 16; // Icon size
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
  ctx.restore();
}

// Delete handler function
function deleteActiveObject(eventData, transform) {
  const target = transform.target;
  if (canvas && target) {
    canvas.remove(target); // Remove the object
    canvas.discardActiveObject(); // Clear selection
    canvas.requestRenderAll(); // Update canvas
    console.log("Deleted Object:", target);
  }
}

// Function to add delete control to Textbox only
export function addDeleteControlToTextbox() {
  if (!fabric.Textbox.prototype.controls) {
    fabric.Textbox.prototype.controls = {};
    console.log("here")
  }


  console.log("here")
  return fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5, // Position top-right
    y: -0.5,
    offsetY: -20,
    cursorStyle: "pointer",
    mouseUpHandler: deleteActiveObject,
    render: renderIcon,
    cornerSize: 24,
  });
}

/**
 * Initialize the canvas if not already created.
 * @param {string} canvasId - The ID of the canvas element.
 * @returns {fabric.Canvas} - The initialized canvas instance.
 */
export const initializeCanvas = (canvasId) => {
 
    canvas = new fabric.Canvas(canvasId);
    addDeleteControlToTextbox(); // Add delete control only for Textbox
    console.log("Canvas initialized:", canvas);
  
  return canvas;
};

/**
 * Get the existing canvas instance.
 * @returns {fabric.Canvas | null} - The existing canvas instance, or null if not initialized.
 */
export const getCanvas = () => {
  return canvas;
};
