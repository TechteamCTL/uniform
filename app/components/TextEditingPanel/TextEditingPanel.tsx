import { ColorPicker, Typography, InputNumber, Select, Input, Button } from "antd";
import type { ColorPickerProps, GetProp, InputNumberProps  } from 'antd';
import { SketchPicker } from 'react-color';
import { HexColorPicker } from "react-colorful";
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
    const [ color, setColor ] = useState('');
    const [ fontSize, setFontSize ] = useState<number>();
    const [ fontFamily, setFontFamily ] = useState<string>("");
    const [ editText, setEditText ] = useState("Edit text");

    useEffect(() => {
      if(activeObject) {

                  setColor(activeObject.fill);
                  setFontFamily(activeObject.fontFamily);
                  setFontSize(activeObject.fontSize);
                  setEditText(activeObject.text)
      }
    }, [activeObject])

    

    const editTextChangeHandler = (e) => {
      setEditText(e.target.value);

      if(activeCanvas) {
        activeObject.set("text", e.target.value);
        saveCanvasContent();
        activeCanvas.renderAll();
      }
    }



  const formatColorToRGBA = (color: any) => {      
        const { r, g, b, a } = color.metaColor;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      };

  const onChangeFontSize = (value: number | null) => {
    if (!value) return;

    setFontSize(value);
    // const activeObject = activeCanvas?.getActiveObject();

    if (activeObject) {
      activeObject.set("fontSize", value);
      activeCanvas?.requestRenderAll();
      saveCanvasContent();
    }
  };


  const onChangeColor = (value: Color) => {
    // const rgbaColor = formatColorToRGBA(value);
    setColor(value);

    if(activeObject) {
      activeObject.set({fill: value});
      saveCanvasContent();
      activeCanvas?.requestRenderAll();
    }
};


const onFontChange = (e) => {
  const value = e.target.value;
    setFontFamily(value);

    WebFont.load({
        google: { families: [value] },
        active: () => {
            if (activeObject) {
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
                {/* <ColorPicker 
                value={color} 
                size="large" 
                showText 
                onChange={onChangeColor} 
                /> */}
                <HexColorPicker color={color} onChange={onChangeColor} />
            </div>
            <div className={styles.textColor}>
                <Text>Text Font</Text>
                {/* <Select
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
                    /> */}
                    <select value={fontFamily} onChange={(e) => onFontChange(e)}>
                      {
                        googleFontsList.map((font, i) => {
                          return <option key={i} style={{ fontFamily: font }} value={font}>{font}</option>
                        })
                          
                      }
                  
                    </select>
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