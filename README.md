# Offline Voice Assistant

🚀 **Building an Offline Voice Assistant for My Final Year Project!**

This repository contains the main frontend and backend files for my final year project, a simple prototype of an offline voice assistant built using Python, Flask, React, and powerful libraries. This assistant can understand voice commands and execute basic tasks, all without requiring an internet connection.

## 🎯 Project Overview

This voice assistant prototype is designed to handle simple commands on startup, such as opening applications (like Calculator, Notepad, etc.). It runs completely offline, meaning voice recognition, text-to-speech, and system tasks are processed locally without internet connectivity. Developers can easily expand this prototype by adding more functionalities according to their needs.

## 🔧 Tech Stack

### Backend
- **Python**: Core logic and functionality of the voice assistant.
- **Flask**: Lightweight web framework to build the backend API running on localhost.
- **Vosk**: Offline speech recognition library for converting voice to text.
- **pyttsx3**: Text-to-speech engine to vocalize responses.
- **win32com**: Automates system tasks, like opening Calculator and Notepad, via voice commands.

### Frontend
- **React**: Frontend framework for building an interactive user interface to interact with the assistant.
- **HTML/CSS**: Structure and styling of the web interface.
- **AJAX/Fetch API**: Allows the frontend to make asynchronous requests to the backend without page reloads.

## 📂 Repository Structure

This repository includes the essential files and directories for the project:

```plaintext
Offline-Voice-Assistant/
├── backend/                   # Backend code files for Flask server and assistant logic
│   ├── app.py                 # Main backend logic and Flask routes
│   └── requirements.txt       # List of dependencies for backend setup
├── frontend/                  # Frontend files for the user interface
│   ├── public/                # Public assets and HTML structure
│   └── src/                   # React components and frontend code
└── README.md                  # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Python 3.x
- Node.js and npm (for React frontend)
- Dependencies (listed in `requirements.txt`)

### Setup Instructions

#### Clone the Repository
```bash
git clone https://github.com/your-username/offline-voice-assistant.git
cd offline-voice-assistant
```

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Flask server:
   ```bash
   python app.py
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5001`.

## 🛠️ Usage

### Basic Commands
Here are some commands to get started:
- **Open Calculator**: “Open calculator”
- **Open Notepad**: “Open notepad”
- **Turn Wi-Fi On/Off**: “Turn on Wi-Fi” / “Turn off Wi-Fi”

### Extending the Project
Developers can add new commands by updating the `handle_command` function in `app.py`. For instance, new applications, file explorers, or system settings can be added based on the available voice commands.

## 🌐 Key Features

- **Offline Mode**: The assistant operates entirely offline, with voice recognition, TTS, and system tasks handled locally.
- **Expandable Prototype**: Easily add more commands and actions.
- **User-Friendly UI**: Built with React, providing a responsive interface for interactions.

## 📘 Additional Notes

- This project uses **Vosk** and **pyttsx3** for offline speech processing.
- **Flask** serves as the local server for handling requests between the frontend and backend.
- The assistant's capabilities can be customized to execute additional tasks by modifying Python functions in `app.py`.

## 📞 Contact

Feel free to reach out if you have any questions or suggestions regarding the project! I'm happy to discuss more about the tech stack or implementation details.

## 🏷️ Tags

`#VoiceAssistant` `#OfflineTech` `#Python` `#Flask` `#React` `#Vosk` `#pyttsx3` `#FinalYearProject` `#AI` `#Innovation`
