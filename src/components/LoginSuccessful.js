import React, { useContext } from 'react';

import FaceDataContext from '../store/face-data-context';
import styles from './Detection.module.css';

const LoginSuccessful = () => {

    const faceCtx = useContext(FaceDataContext);

    return (
        <div className={styles.detector}>
            <header>Login Successful!</header>
            <p>Welcome {faceCtx.currentUserName}</p>
        </div>
    );
}

export default LoginSuccessful;