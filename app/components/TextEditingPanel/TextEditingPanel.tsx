import { ColorPicker, Typography, InputNumber, Select, Input, Button } from "antd";
import type { ColorPickerProps, GetProp, InputNumberProps  } from 'antd';
import WebFont from "webfontloader";

import styles from "./TextEditingPanel.module.css"; 
import { useContext, useState, useEffect } from "react";
import { CanvasCTX } from "@/app/page";

const { Text, Link, Title } = Typography;

type Color = GetProp<ColorPickerProps, 'value'>;

const googleFontsList = [
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Source Sans Pro",
    "Raleway",
    "Poppins",
    "Merriweather",
    "Nunito",
    "Oswald",
  ];

const TextEditingPanel = ({saveCanvasContent, activeObject}) => {
    const { activeCanvas } = useContext(CanvasCTX);
    const [ color, setColor ] = useState<Color>('');
    const [ fontSize, setFontSize ] = useState<number>();
    const [ fontFamily, setFontFamily ] = useState<string>("");
    const [ editText, setEditText ] = useState("Edit text");
    const [ selectedObject, setSelectedObject ] = useState<fabric.Canvas>();

    useEffect(() => {
      if(activeObject) {
              if(activeObject) {
                  setSelectedObject(activeObject);
                  setColor(activeObject.fill);
                  setFontFamily(activeObject.fontFamily);
                  setFontSize(activeObject.fontSize);
                  setEditText(activeObject.text)
              }
      }
    }, [activeObject])

    const editTextChangeHandler = (e) => {
      console.log(e.target.value)
      setEditText(e.target.value);
      if(activeCanvas) {
        const activeTextObject = activeCanvas.getActiveObject();
  
        activeTextObject.set("text", e.target.value);
        saveCanvasContent();
        activeCanvas.renderAll();
      }
    }

    console.log("selectedObject", selectedObject)

    // useEffect(() => {
    //   if(activeCanvas) {
    //     const handleObjectSelection = () => {
    //       if(!selectedObject) return;
    
    //       console.log(selectedObject.fill);
    //       const currentColor = selectedObject.get('fill') as string;
  
    //       setColor(currentColor);
    //       setFontFamily(selectedObject.fontFamily);
    //       setFontSize(selectedObject.fontSize);
    //     }

    //     activeCanvas.on('selection:created', handleObjectSelection);


    //     // activeCanvas.on("selection:created", (event) => {
    //     //   handleObjectSelection(selectedObject);
    //     // })

    //     activeCanvas.on("selection:updated", (event) => {
    //       handleObjectSelection(selectedObject);
    //     })

    //     activeCanvas.on('selection:cleared', () => {
    //       setSelectedObject(null);
    //       clearSettings();
    //     })

    //     activeCanvas.on("object:modified", (event)=> {
    //       handleObjectSelection(event.target);
    //     })

    //   }
    // }, [activeCanvas]);

    const clearSettings = () => {
      setColor("#000000");
      setFontFamily("");
      setFontSize(0);
    }


    // useEffect(() => {
    //     if (activeCanvas) {
    //         const handleSelection = () => {
    //             const activeObject = activeCanvas?.getActiveObject();
    //             console.log("Active Object ID:", activeObject.id);
    //             if (activeObject && activeObject.type === "textbox") {
    //                 const currentColor = activeObject.get('fill') as string;
    //                 const currentFontSize = activeObject.get("fontSize") as number;
    //                 const currentFontFamily = activeObject.get("fontFamily") as string;
    //                 const currentText = activeObject.get("text") as string;

    //                 setColor(currentColor);
    //                 setFontSize(currentFontSize);
    //                 setFontFamily(currentFontFamily);
    //                 setEditText(currentText)
    //             }

    //             // activeCanvas.renderAll();
    //         };

    //         activeCanvas.on('selection:created', handleSelection);
    //         activeCanvas.on('selection:updated', handleSelection);
    //         // activeCanvas.on('selection:cleared', () => {
    //         //     setColor('#1677ff')
    //         //     setFontSize(14);
    //         //     setFontFamily("Roboto");
    //         // });

    //         return () => {
    //             activeCanvas.off('selection:created', handleSelection);
    //             activeCanvas.off('selection:updated', handleSelection);
    //             // activeCanvas.off('selection:cleared', () => {
    //             //     setColor('#1677ff')
    //             //     setFontSize(14);
    //             //     setFontFamily("Roboto");

    //             // });
    //         };
    //     }
    // }, [activeCanvas]);

    
    
  //   useEffect(() => {
  //     if (activeCanvas) {
  //         const handleSelection = () => {
  //             const activeObject = activeCanvas?.getActiveObject();
  //             if (activeObject && activeObject.type === "textbox") {
  //                 setColor(activeObject.get('fill'));
  //                 setFontSize(activeObject.get("fontSize"));
  //                 setFontFamily(activeObject.get("fontFamily"));
  //                 setEditText(activeObject.get("text"));
  //             }
  //         };
  
  //         activeCanvas.on('selection:created', handleSelection);
  //         activeCanvas.on('selection:updated', handleSelection);
  
  //         return () => {
  //             activeCanvas.off('selection:created', handleSelection);
  //             activeCanvas.off('selection:updated', handleSelection);
  //         };
  //     }
  // }, [activeCanvas]);

  const formatColorToRGBA = (color: any) => {      
        const { r, g, b, a } = color.metaColor;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      };

  const onChangeFontSize = (value: number | null) => {
    if (!value) return;

    setFontSize(value);
    const activeObject = activeCanvas?.getActiveObject();

    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("fontSize", value);
      activeCanvas?.requestRenderAll();
      saveCanvasContent();
    }
  };


  const onChangeColor = (value: Color) => {
    setColor(value);
    const rgbaColor = formatColorToRGBA(value);
    if(selectedObject) {
      selectedObject.set({fill: rgbaColor});
      saveCanvasContent();
      activeCanvas?.requestRenderAll();
    }
};

const onFontChange = (value: string) => {
    setFontFamily(value);
    WebFont.load({
        google: { families: [value] },
        active: () => {
            const activeObject = activeCanvas?.getActiveObject();
            if (activeObject && activeObject.type === "textbox") {
                activeObject.set("fontFamily", value);
                saveCanvasContent();

                activeCanvas?.requestRenderAll();
            }
        },
    });
};


    return <div className={styles.textEditingPanel}>
        <Title level={4} className={styles.textEditingPanelTitle}>Text Editing Panel</Title>
        <div>
        <Input value={editText} className={styles.textInput} onChange={(value) => editTextChangeHandler(value)}/>
        </div>
        {/* <div className={styles.textEditingPanelBtn}>
          <Button>Printing</Button>
          <Button>Embroidery</Button>
        </div> */}
        <div className={styles.textEditingPanelOptions}>
            <div className={styles.textColor}>
                <Text>Text Color</Text>
                <ColorPicker  value={color} size="large" showText onChange={onChangeColor} />
            </div>
            <div className={styles.textColor}>
                <Text>Text Font</Text>
                <Select
                    value={fontFamily}
                    onChange={onFontChange}
                    style={{ width: "50%" }}
                    placeholder="Select Font"
                    options={googleFontsList.map((font) => ({
                        label: (
                        <span style={{ fontFamily: font }}>
                            {font}
                        </span>
                        ),
                        value: font,
                    }))}
                    />
            </div>
            <div className={styles.textColor}>
                <Text>Text Size</Text>
                <InputNumber
                    min={2}
                    max={100}
                    step={2}
                    value={fontSize}
                    onChange={onChangeFontSize}
                    style={{ width: "100px" }}
                />
            </div>
        </div>


    </div>
}

export default TextEditingPanel;