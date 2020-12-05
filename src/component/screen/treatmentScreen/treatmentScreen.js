import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {getTreatmentData, updateStatus} from "../../../utils/login";
import styles from "./treatmentScreen.module.css"
import {Button, ListGroup, Modal} from "react-bootstrap";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import dayjs from "dayjs";



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
    },[])

    return (
        <div className={styles.component}>
            <div className={styles.content}>

            <p className={"title"}>treatment Information</p>
            <ListGroup className={styles.card}>
                <ListGroup.Item className={styles.row} action variant={"light"}>
                    <span className={styles.row_span}>Patient ID:</span>
                    <span className={styles.row_span}>{treatmentData?.["Patient id num"]}</span>
                </ListGroup.Item>

                <ListGroup.Item className={styles.row} action variant={"light"}>
                    <span className={styles.row_span}>Patient Name:</span>
                    <span className={styles.row_span} >{treatmentData?.["Patient Name"]}</span>
                </ListGroup.Item>
                <ListGroup.Item className={styles.row} action variant={"light"}>
                    <span className={styles.row_span}>Time:</span>
                    {treatmentData?.Time && <span className={styles.row_span}>{dayjs(treatmentData.Time).format("DD/MM/YYYY HH:mm")}</span>}
                </ListGroup.Item>
                <ListGroup.Item className={styles.row} action variant={"light"}>
                    <span className={styles.row_span}>Room:</span>
                    <span className={styles.row_span}>{treatmentData?.Room}</span>
                </ListGroup.Item>
                <ListGroup.Item className={styles.row} action variant={"light"}>
                    <span className={styles.row_span}>Bed:</span>
                    <span className={styles.row_span}>{treatmentData?.Bed}</span>
                </ListGroup.Item>

                <ListGroup.Item className={styles.row} action variant={"light"}>
                    <span className={styles.row_span}>Treatment:</span>
                    <span className={styles.row_span}>{treatmentData?.Description}</span>
                </ListGroup.Item>
            </ListGroup>
            <Button className={styles.button} onClick={() => setIsPopupVisible(true)} variant={"secondary"}>Verify
                Patient</Button>
            </div>


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
