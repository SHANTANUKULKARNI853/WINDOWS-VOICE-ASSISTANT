import React, { useState } from 'react';
import './App.css';
import SpeechRecognitionScreen from './SpeechRecognitionScreen';


const SpeechRecognitionApp = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleStartTalking = () => {
    setIsSpeaking(true);
  };

  return (
    <div className="app">
      {!isSpeaking ? (
        <div className="welcome-container glass">
          <h1>Welcome to J.A.R.V.I.S</h1>
          <button className="start" onClick={handleStartTalking}>
            <i className="fa fa-comments"></i> Start talking
          </button>
        </div>
      ) : (
        <SpeechRecognitionScreen />
      )}
    </div>
  );
};

export default SpeechRecognitionApp;
