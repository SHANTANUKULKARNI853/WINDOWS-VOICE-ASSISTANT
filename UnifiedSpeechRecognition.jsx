import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SpeechRecognitionScreen.css';

const UnifiedSpeechRecognition = () => {
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;

      recognitionInstance.onresult = async (event) => {
        const speechToText = event.results[event.results.length - 1][0].transcript;
        setTranscript(speechToText);
        await handleVoiceCommand(speechToText); // Send command to backend
      };

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      setError(true);
    }
  }, []);

  const startRecognition = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopRecognition = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const handleVoiceCommand = async (commandText) => {
    try {
      const response = await axios.post('http://localhost:5001/api/voice-command', { command: commandText });
      setResponseMessage(response.data.response); // Display backend response
    } catch (error) {
      console.error('Error sending command to backend:', error);
      setResponseMessage('Error processing your command.');
    }
  };

  return (
    <div className="speech-recognition">
      {error ? (
        <h1 className="error">Speech Recognition is not supported in your browser. Please try using Chrome.</h1>
      ) : (
        <div className="command-area">
          <i className={`fa fa-microphone fa-5x ${isListening ? 'listening' : ''}`} onClick={startRecognition}></i>
          <h3 className="command">Transcript: {transcript}</h3>
          <h4>Response: {responseMessage}</h4>
          <h5>Voice Commands</h5>
          <ul className="commands-list">
            <li>Try saying: Open Calculator</li>
            <li>Try saying: Open Notepad</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UnifiedSpeechRecognition;
