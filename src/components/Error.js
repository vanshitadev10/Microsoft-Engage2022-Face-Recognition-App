import React from 'react';

import styles from './Detection.module.css';

const Error = () => {
    return (
        <div className={styles.detector}>
            <header>Something Went Wrong!</header>
        </div>
    );
}

export default Error;