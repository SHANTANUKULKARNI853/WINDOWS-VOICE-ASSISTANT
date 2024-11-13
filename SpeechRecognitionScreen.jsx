import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SpeechRecognitionScreen.css';

const SpeechRecognitionScreen = () => {
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition;

    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;

      recognitionInstance.onresult = async (event) => {
        const speechToText = event.results[event.results.length - 1][0].transcript;
        console.log(`${speechToText} - ${event.results[event.results.length - 1][0].confidence}`);
        setTranscript(speechToText);
        await handleVoiceCommand(speechToText); // Call the function to send command to backend
      };

      recognitionInstance.onstart = () => {
        console.log('Listening...');
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        console.log('Stopped listening.');
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
      console.log(response.data.message); // Log the response from the backend (adjust response handling)
    } catch (error) {
      console.error('Error sending command to backend:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="speech-recognition-screen">
      {error ? (
        <h1 className="error">Speech Recognition is not supported in your browser. Try using Chrome.</h1>
      ) : (
        <div className="command-area">
          <i
            className={`fa fa-microphone fa-5x ${isListening ? 'listening' : ''}`}
            onClick={isListening ? stopRecognition : startRecognition}
          ></i>
          <h3 className="command">{transcript}</h3>
          <h5>Voice Commands</h5>
          <ul className="commands-list">
            <li>Try saying: Open Calculator</li>
            <li>Try saying: Add 2 and 3 / Subtract 5 and 3</li>
            <li>Try saying: Open Notepad</li>
            <li>Try saying: type "name" in notepad</li>
            <li>Try saying: Open file explorer</li>
            {/* Add more commands as needed */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SpeechRecognitionScreen;
