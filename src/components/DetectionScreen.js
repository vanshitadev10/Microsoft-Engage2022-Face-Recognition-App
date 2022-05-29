import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';

import FaceDataContext from '../store/face-data-context';
import Button from './UI/Button';
import styles from './Detection.module.css';


const DetectionScreen = () => {

    const [refImage, setRefImage] = useState('');
    const [resImage, setResImage] = useState('');
    const webcamRef = useRef(null);

    const faceCtx = useContext(FaceDataContext);
    const navigate = useNavigate();

    const videoConstraints = {
        width: '60vw',
        height: '60vh',
        facingMode: "user"
    };


    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';

            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]);
        }
        loadModels();
    }, []);


    useEffect(() => {
        faceCtx.getItems();
        console.log(faceCtx.data)
    }, []);




    const detectHandler = useCallback(
        async (e) => {
            e.preventDefault();

            faceCtx.getItems();

            const imageSrc = webcamRef.current.getScreenshot();
            setResImage(imageSrc);
            setRefImage(imageSrc);


            await faceapi.loadSsdMobilenetv1Model('/models');


            const options = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.95 });
            const input1 = document.getElementById('myImg1');
            const input2 = document.getElementById('myImg2');

            let i, j = 0, max;

            if (faceCtx.data[0]) {
                setRefImage(faceCtx.data[0].userImage);

                const reference = await faceapi.detectSingleFace(input1, options).withFaceLandmarks().withFaceDescriptor();
                if (reference) {
                    max = reference.detection.score;
                }
                faceCtx.getName(faceCtx.data[0].userName);
            }
            else {
                return;
            }


            for (i = 1; i < faceCtx.data.length; i++) {
                setRefImage(faceCtx.data[i].userImage);
                const reference = await faceapi.detectSingleFace(input1, options).withFaceLandmarks().withFaceDescriptor();
                if (reference && max < reference.detection.score) {
                    max = reference.detection.score;
                    j = i;
                    faceCtx.getName(faceCtx.data[i].userName);
                }
            }



            setRefImage(faceCtx.data[j].userImage);

            const reference = await faceapi.detectSingleFace(input1, options).withFaceLandmarks().withFaceDescriptor()
            const result = await faceapi.detectSingleFace(input2, options).withFaceLandmarks().withFaceDescriptor()

            if (result && reference.detection.score >= 0.95) {
                const faceMatcher = new faceapi.FaceMatcher(result);

                if (reference) {
                    faceMatcher.findBestMatch(reference.descriptor);
                    navigate('/login-successful', { replace: true });
                }
            }
            else {
                alert("No Such User Found!");
            }

        },
        [faceCtx, webcamRef, setRefImage, setResImage]
    );




    return (
        <div className={styles.detector}>
            <header>Login With Your Face!</header>
            <form onSubmit={detectHandler}>
                <section className={styles.detector__header}>
                    <Webcam
                        audio={false}
                        height={720}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        style={{
                            marginTop: '3rem',
                            textAlign: 'center',
                            zindex: 2,
                            width: '60vw',
                            height: '60vh',
                        }}
                    />
                </section>
                <section className={styles.click__section}>
                    <Button type='submit'>Start Detection</Button>
                    <NavLink to="/add-face" className={styles.detector__link} replace={true}>Add Another Face</NavLink>
                    <img id="myImg1" src={refImage} style={{ 'display': 'none' }} />
                    <img id="myImg2" src={resImage} style={{ 'display': 'none' }} />
                </section>
            </form>
        </div>
    );
};

export default DetectionScreen;