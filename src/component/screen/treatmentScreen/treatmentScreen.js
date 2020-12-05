import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {getTreatmentData} from "../../../utils/login";
import styles from "./treatmentScreen.module.css"
import {Button, ListGroup, Modal} from "react-bootstrap";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

function TreatmentScreen(props) {
    let {id} = useParams();
    const [treatmentData, setTreatmentData] = useState()
    const [code, setCode] = useState('')
    const [isPopupVisible, setIsPopupVisible] = useState(false)

    useEffect(() => {
        getTreatmentData(id).then(setTreatmentData).catch(console.error)
    })

    return (
        <div className={styles.component}>
            <h4 className={styles.title}>treatment Information</h4>
            <ListGroup>
                <ListGroup.Item className={styles.entry} action variant={"success"}>
                    <span className={styles.span}>Patient ID:</span>
                    <span className={styles.span}>{treatmentData?.["Patient id num"]}</span>
                </ListGroup.Item>

                <ListGroup.Item className={styles.entry} action variant={"success"}>
                    <span className={styles.span}>Patient Name:</span>
                    <span className={styles.span}>{treatmentData?.["Patient Name"]}</span>
                </ListGroup.Item>
                <ListGroup.Item className={styles.entry} action variant={"success"}>
                    <span className={styles.span}>Room:</span>
                    <span className={styles.span}>{treatmentData?.Room}</span>
                </ListGroup.Item>
                <ListGroup.Item className={styles.entry} action variant={"success"}>
                    <span className={styles.span}>Bed:</span>
                    <span className={styles.span}>{treatmentData?.Bed}</span>
                </ListGroup.Item>

                <ListGroup.Item className={styles.entry} action variant={"success"}>
                    <span className={styles.span}>Treatment:</span>
                    <span className={styles.span}>{treatmentData?.Description}</span>
                </ListGroup.Item>
            </ListGroup>
            <Button className={styles.button} onClick={() => setIsPopupVisible(true)} variant={"success"}>Verify
                Patient</Button>


            {code}
            <Modal show={isPopupVisible} className={styles.popup} onHide={() => setIsPopupVisible(false)}>


                    <BarcodeScannerComponent onUpdate={(err, result) => {
                        if (result) setCode(result.text)
                    }} width={400} height={300} />

            </Modal>
        </div>
    );
}

export default TreatmentScreen;
