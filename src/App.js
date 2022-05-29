import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import DetectionScreen from './components/DetectionScreen';
import ScanImage from './components/ScanImage';
import LoginSuccessful from './components/LoginSuccessful';
import Error from './components/Error';


const App = () => {

  return (
    <Routes>
      <Route path="/" element={localStorage.getItem('loggedIn') ? <DetectionScreen /> : <ScanImage />} />
      <Route path="/add-face" element={<ScanImage />} />
      <Route path="/face-login" element={<DetectionScreen />} />
      <Route path="/login-successful" element={<LoginSuccessful />} />
      <Route path="/error" element={<Error />} />
    </Routes>
  );
}

export default App;