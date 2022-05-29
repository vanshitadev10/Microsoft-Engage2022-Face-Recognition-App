import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import FaceDataProvider from './store/FaceDataProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <FaceDataProvider>
            <App />
        </FaceDataProvider>
    </BrowserRouter>
);