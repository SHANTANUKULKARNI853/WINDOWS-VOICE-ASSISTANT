import os
import sys
import subprocess
import vosk
import pyaudio  # type: ignore
import json
import win32com.client  # pywin32 for Windows automation
import pyttsx3  # type: ignore
import datetime
import re
import time
import threading
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import win32gui
import win32con
import pyautogui

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Initialize text-to-speech engine
engine = pyttsx3.init()

def speak(text):
    """Convert text to speech using pyttsx3."""
    def run_speech():
        engine = pyttsx3.init()
        engine.say(text)
        engine.runAndWait()

    # Run the speech in a separate thread
    threading.Thread(target=run_speech).start()

def open_application(app_name):
    # Run the application
    if app_name == "calc":
        subprocess.Popen("calc.exe")
    elif app_name == "notepad":
        subprocess.Popen("notepad.exe")
    else:
        return

    # Wait briefly for the application to open
    time.sleep(1)

    # Find the application window
    hwnd = win32gui.FindWindow(None, app_name.capitalize())
    if hwnd:
        # Bring the window to the foreground
        win32gui.ShowWindow(hwnd, win32con.SW_RESTORE)
        win32gui.SetForegroundWindow(hwnd)

def type_in_notepad(text):
    """Type text into Notepad if it's open."""
    # Find the Notepad window
    hwnd = win32gui.FindWindow(None, "Untitled - Notepad")
    if hwnd:
        # Bring Notepad to the foreground
        win32gui.ShowWindow(hwnd, win32con.SW_RESTORE)
        win32gui.SetForegroundWindow(hwnd)
        time.sleep(0.5)  # Small delay to ensure Notepad is ready
        pyautogui.write(text)  # Type the text into Notepad
    else:
        speak("Notepad is not open.")

def perform_calculation(num1, operator, num2):
    """Simulate typing numbers and operator in Calculator."""
    pyautogui.write(str(num1))      # Type the first number
    pyautogui.press(operator)       # Type the operator (e.g., '+', '-', '*', '/')
    pyautogui.write(str(num2))      # Type the second number
    pyautogui.press('enter')        # Press Enter to get the result

def handle_command(text):
    """Handles recognized voice commands."""
    text = text.lower()

    if "open calculator" in text:
        open_application("calc")
    elif "open notepad" in text:
        open_application("notepad")
    elif "type" in text and "in notepad" in text:
        # Extract text to type in Notepad
        to_type = text.replace("type", "").replace("in notepad", "").strip()
        if to_type:
            type_in_notepad(to_type)
        else:
            speak("Please specify what to type in Notepad.")
    elif "add" in text or "subtract" in text or "multiply" in text or "divide" in text:
        # Use regex to extract numbers from the text
        numbers = re.findall(r'\d+', text)

        if len(numbers) >= 2:
            num1 = int(numbers[0])
            num2 = int(numbers[1])

            # Determine the operation based on keywords
            if "add" in text:
                operator = '+'
            elif "subtract" in text:
                operator = '-'
            elif "multiply" in text:
                operator = '*'
            elif "divide" in text:
                operator = '/'

            # Open calculator and perform calculation
            open_application("calc")
            time.sleep(1.5)  # Ensure Calculator is active
            perform_calculation(num1, operator, num2)
        else:
            speak("Please specify two numbers for the operation.")
    else:
        speak(f"I'm not sure what you mean by '{text}'.")

# Root route to confirm the server is running
@app.route('/')
def home():
    return "Server is running!"

# API to handle commands from frontend
@app.route('/api/voice-command', methods=['POST'])
def execute_command():
    """Handle commands passed from frontend."""
    data = request.get_json()
    print(f"Received command: {data}")  # Debugging statement
    command = data.get("command", "").lower()

    # Handle specific commands dynamically
    if "open calculator" in command:
        open_application("calc")
        return jsonify({"status": "success", "message": "Opening calculator."}), 200
    elif "open notepad" in command:
        open_application("notepad")
        return jsonify({"status": "success", "message": "Opening notepad."}), 200
    elif "type" in command and "in notepad" in command:
        to_type = command.replace("type", "").replace("in notepad", "").strip()
        if to_type:
            type_in_notepad(to_type)
            return jsonify({"status": "success", "message": f"Typing in Notepad: {to_type}"}), 200
        else:
            return jsonify({"status": "error", "message": "No text specified to type in Notepad."}), 400
    elif "add" in command or "subtract" in command or "multiply" in command or "divide" in command:
        # Detect calculation commands and execute them
        handle_command(command)
        return jsonify({"status": "success", "message": f"Performing calculation: {command}"}), 200
    else:
        return jsonify({"status": "error", "message": f"Unknown command: {command}"}), 400

@app.route('/test-open-calculator', methods=['GET'])
def test_open_calculator():
    open_application("calc")
    return jsonify({"status": "success", "message": "Test - Opening calculator."}), 200

# Run the backend as Flask API
if __name__ == "__main__":
    print("Flask app is running on port 5001")  # Debugging message
    app.run(debug=True, host='0.0.0.0', port=5001)
