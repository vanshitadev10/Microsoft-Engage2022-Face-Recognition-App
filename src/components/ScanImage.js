import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

import FaceDataContext from '../store/face-data-context';
import Button from './UI/Button';
import styles from './Detection.module.css';


const ScanImage = () => {

    const [name, setName] = useState('');

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



    const userNameHandler = (e) => {
        setName(e.target.value);
    };


    const webcamRef = useRef(null);
    const captureHandler = useCallback(
        async (e) => {
            e.preventDefault();

            const imageSrc = webcamRef.current.getScreenshot();

            const dataItems = {
                userName: name,
                userImage: imageSrc
            }


            if (name != '' && imageSrc != null) {

                faceCtx.addItems(dataItems);
                setName('');
                localStorage.setItem('loggedIn', true);
                navigate('/face-login', { replace: true });
            }

        },
        [webcamRef, name]
    );




    return (
        <div className={styles.detector}>
            <header>Add your face</header>
            <form className={styles.detector__form} onSubmit={captureHandler}>
                <label htmlFor='name'>Name: </label>
                <input type='text' onChange={userNameHandler} value={name} required={true} />
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
                <Button type='submit'>Save My Profile!</Button>
            </form>
        </div>
    );
}

export default ScanImage;