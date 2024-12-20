import { useContext } from "react";
import { Button } from 'antd';
import { CanvasCTX } from "../../page";

import styles from "./CanvasSendSharePanel.module.css";

const CanvasSendSharePanel = () => {
    const {activeCanvas } = useContext(CanvasCTX);


    const sendDraft = () => {
        const canvasJSON = activeCanvas.toJSON();
        const canvas = activeCanvas.toObject()
        console.log("canvas", canvas);
        console.log("activeCanvas", activeCanvas);
    }
    return <div className={styles.sendSharePanel}>
        <Button onClick={sendDraft}>Send</Button>
    </div>
}

export default CanvasSendSharePanel;