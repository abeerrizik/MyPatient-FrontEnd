import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {getTreatmentData, updateStatus} from "../../../utils/login";
import styles from "./treatmentScreen.module.css"
import {Button, ListGroup, Modal} from "react-bootstrap";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";



function TreatmentScreen(props) {
    let {id} = useParams();
    const [treatmentData, setTreatmentData] = useState()
    const [code, setCode] = useState()
    const [isCodeValid, setIsCodeValid] = useState(false)
    const [isPopupVisible, setIsPopupVisible] = useState(false)

    useEffect(() => {
        getTreatmentData(id).then((data)=>
        {
            setTreatmentData(data)
            // if(data.status)
            // setCode(data["Patient id num"])
        }).catch(console.error)
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


            <Modal centered show={isPopupVisible} className={styles.popup} onHide={() => {
                setIsPopupVisible(false)
                setCode()
            }}>


                {!code && !treatmentData?.status ? <BarcodeScannerComponent onUpdate={(err, result) => {
                        if (!result)
                            return;
                        setCode(result.text)
                    const isVerified = result.text == treatmentData?.["Patient id num"]
                        setIsCodeValid(isVerified)
                    if(isVerified)
                        updateStatus(id, true)

                    }} width={500} height={300}/>
                    : <div className={styles.popupResult}>
                        {isCodeValid || treatmentData.status ? <>
                            <img src="/img/check.svg" alt="check icon" className={styles.icon}/>
                            <h3>Verified!</h3>
                        </> : <>
                            <img src="/img/close.svg" alt="check icon" className={styles.icon}/>
                            <h3>Incorrect Patient ID</h3>

                        </>
                        }
                    </div>
                }


            </Modal>
        </div>
    );
}

export default TreatmentScreen;
