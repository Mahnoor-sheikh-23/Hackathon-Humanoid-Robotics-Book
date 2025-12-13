---
title: Chapter 15 - Voice-to-Text with OpenAI Whisper and LLMs
---

## Learning Objectives
- Understand the principles of Automatic Speech Recognition (ASR) and its role in robotics.
- Learn how to integrate OpenAI Whisper for voice-to-text conversion.
- Explore methods for using LLMs to interpret and act on voice commands.
- Implement a basic voice command interface for a simulated robot.
- Analyze the challenges and future of voice-controlled robotics.

## Introduction to Voice-to-Text and LLM Integration
Voice control offers an intuitive and natural way for humans to interact with robots. By leveraging powerful Automatic Speech Recognition (ASR) models like OpenAI Whisper and integrating them with Large Language Models (LLMs) for semantic understanding, robots can process complex spoken commands and respond intelligently. This chapter delves into the practical aspects of implementing such systems, bridging the gap between human language and robotic action.

## Core Concepts
### 1. Automatic Speech Recognition (ASR)
- **Analogy**: ASR is like a highly skilled secretary who listens to what you say and types it out perfectly.
- **Plain English**: ASR converts spoken language into written text. It identifies words, phrases, and even punctuation, providing a textual representation of audio input.
- **Technical**: ASR systems typically use deep learning models (e.g., recurrent neural networks, transformers) trained on vast datasets of audio and text. OpenAI Whisper is a transformer-based encoder-decoder model trained on 680,000 hours of multilingual and multitask supervised data.

### 2. OpenAI Whisper
- **Analogy**: Whisper is a universal translator for sound, understanding many languages and transcribing them with high accuracy.
- **Plain English**: Whisper is a general-purpose open-source ASR model developed by OpenAI that can transcribe audio into text in multiple languages, and even translate those languages into English.
- **Technical**: Whisper leverages a sequence-to-sequence architecture with a transformer encoder and decoder. The model processes raw audio, predicts token sequences, and handles tasks like language identification, speech transcription, and speech translation. It is robust to various audio conditions and accents.

### 3. LLMs for Semantic Understanding and Action Generation
- **Analogy**: LLMs are the robot's brain that understands the *meaning* of your words and figures out what to *do* with them.
- **Plain English**: After ASR converts voice to text, LLMs take this text and understand the user's intent, then generate appropriate robot actions or responses.
- **Technical**: LLMs (e.g., GPT series, Claude) are pre-trained on massive text corpora, allowing them to perform natural language understanding (NLU) tasks. For robotics, the textual command from Whisper is fed to the LLM, which is then prompted to parse the intent, extract parameters, and translate it into a structured command (e.g., a function call or a ROS message) that the robot can execute. Fine-tuning or prompt engineering can specialize the LLM for robotics domains.

## Conceptual Hands-on Tutorial: Basic Voice Command Interface
Let's create a simple Python application that uses OpenAI Whisper to transcribe voice commands and a mock LLM (for now, a rule-based system) to interpret them for a simulated robot.

### Step 1: Set up your environment
Ensure you have Python 3.10+ and `pip` installed.

```bash
# Create a virtual environment
python -m venv venv
source venv/bin/activate # On Windows, use `venv\Scripts\activate`

# Install necessary libraries
pip install openai-whisper SpeechRecognition pydub
pip install "python-dotenv<1.0.0" # Ensure compatibility
pip install transformers torch
```
Note: You may need to install `ffmpeg` system-wide for `pydub` to work with various audio formats.

### Step 2: Acquire an audio sample or use your microphone
For this example, we'll use `SpeechRecognition` to capture audio from the microphone.

### Step 3: Implement the Voice Command Processor
Create a file named `voice_command_processor.py`:

```python
import speech_recognition as sr
import whisper
import time
import os
from dotenv import load_dotenv

load_dotenv() # Load environment variables, including OPENAI_API_KEY if needed

# Load the Whisper model
# You can choose different sizes: tiny, base, small, medium, large
# For local use, 'base' or 'small' are good starting points.
# If you have a GPU, Whisper will automatically use it.
print("Loading Whisper model (this may take a moment)...")
model = whisper.load_model("base")
print("Whisper model loaded.")

def capture_audio():
    """Captures audio from the microphone."""
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Say something!")
        r.adjust_for_ambient_noise(source) # Listen for 1 second to calibrate the energy threshold for ambient noise levels
        audio = r.listen(source)
    print("Audio captured. Processing...")
    return audio

def transcribe_audio(audio):
    """Transcribes audio using OpenAI Whisper."""
    # Save audio to a temporary WAV file for Whisper
    with open("temp_audio.wav", "wb") as f:
        f.write(audio.get_wav_data())

    result = model.transcribe("temp_audio.wav")
    os.remove("temp_audio.wav") # Clean up temporary file
    return result["text"]

def interpret_command_mock_llm(text_command: str):
    """
    A mock LLM interpretation function.
    In a real scenario, this would involve prompting a powerful LLM.
    """
    text_command_lower = text_command.lower()

    if "move forward" in text_command_lower or "go ahead" in text_command_lower:
        return {"action": "move", "direction": "forward", "distance": "medium"}
    elif "move backward" in text_command_lower or "go back" in text_command_lower:
        return {"action": "move", "direction": "backward", "distance": "medium"}
    elif "turn left" in text_command_lower:
        return {"action": "turn", "direction": "left", "angle": "small"}
    elif "turn right" in text_command_lower:
        return {"action": "turn", "direction": "right", "angle": "small"}
    elif "stop" in text_command_lower or "halt" in text_command_lower:
        return {"action": "stop"}
    elif "pick up" in text_command_lower and "object" in text_command_lower:
        return {"action": "manipulate", "type": "grasp", "target": "object"}
    elif "open gripper" in text_command_lower:
        return {"action": "manipulate", "type": "open_gripper"}
    elif "close gripper" in text_command_lower:
        return {"action": "manipulate", "type": "close_gripper"}
    elif "hello robot" in text_command_lower or "hi there" in text_command_lower:
        return {"action": "greet", "response": "Hello, how can I help you?"}
    else:
        return {"action": "unknown", "command_text": text_command, "response": "I didn't understand that command."}

def execute_robot_action_mock(interpreted_command: dict):
    """
    Mock function to simulate a robot executing an action.
    In a real ROS 2 environment, this would publish to topics.
    """
    action = interpreted_command.get("action")
    print(f"Simulating robot action: {action}")

    if action == "move":
        direction = interpreted_command.get("direction")
        distance = interpreted_command.get("distance", "default")
        print(f"Robot commanded to move {direction} by a {distance} amount.")
        # In ROS 2, this would publish to a /cmd_vel topic
    elif action == "turn":
        direction = interpreted_command.get("direction")
        angle = interpreted_command.get("angle", "default")
        print(f"Robot commanded to turn {direction} by a {angle} angle.")
    elif action == "stop":
        print("Robot commanded to stop.")
    elif action == "manipulate":
        manip_type = interpreted_command.get("type")
        target = interpreted_command.get("target", "")
        print(f"Robot commanded to {manip_type} {target}.")
    elif action == "greet":
        response = interpreted_command.get("response")
        print(f"Robot says: {response}")
    else:
        print(f"No specific action for: {interpreted_command.get('command_text', 'unknown command')}")

if __name__ == "__main__":
    print("Voice Command System Initialized. Speak commands after 'Say something!' prompt.")
    print("Press Ctrl+C to exit.")
    try:
        while True:
            audio_data = capture_audio()
            transcribed_text = transcribe_audio(audio_data)
            print(f"Transcribed: '{transcribed_text}'")

            interpreted = interpret_command_mock_llm(transcribed_text)
            print(f"Interpreted: {interpreted}")

            execute_robot_action_mock(interpreted)
            time.sleep(1) # Small delay before next capture
    except KeyboardInterrupt:
        print("
Exiting Voice Command System.")
```

### Step 4: Run the processor
```bash
python voice_command_processor.py
```
When prompted "Say something!", speak a command like "move forward", "turn left", "stop", or "hello robot". Observe the transcription and the mock robot action.

## Key Takeaways
- ASR models like OpenAI Whisper accurately convert spoken language into text, forming the crucial first step for voice control.
- Large Language Models can process transcribed text to understand user intent, extract parameters, and translate commands into actionable robotic instructions.
- Integrating ASR and LLMs enables more natural and flexible human-robot interaction through voice.
- The system design typically involves an ASR module, an NLU/LLM interpretation module, and a robot action execution module.
- Challenges include handling noise, accents, ambiguous commands, and ensuring real-time performance.

## Exercises
1.  **Easy**: Modify `interpret_command_mock_llm` to include a new simple command, e.g., "go home" that returns `{"action": "navigate", "target": "home"}`.
2.  **Easy**: Change the Whisper model size to "tiny" and observe any changes in loading time and transcription accuracy for short commands.
3.  **Medium**: Research how `SpeechRecognition` library works and try using a different recognizer (e.g., Google Web Speech API) instead of converting to WAV for Whisper, if an internet connection is available.
4.  **Medium**: Extend `execute_robot_action_mock` to include a mock response for an unknown command, providing more user feedback.
5.  **Medium**: Implement a basic state machine in the mock robot execution, e.g., if the robot is "stopped", it won't respond to "move forward" until an "activate" command is given.
6.  **Hard**: Investigate how you would integrate this system with a real ROS 2 robot, specifically identifying which ROS 2 topics (`/cmd_vel`, custom action servers) would be used for each mock action.
7.  **Hard**: Research "function calling" or "tool use" capabilities of modern LLMs (like OpenAI GPT-4 or Claude 3) and describe how you would use them to make `interpret_command_mock_llm` more robust and dynamic.
8.  **Hard**: Consider the security implications of voice control in robotics. What are some potential vulnerabilities and how could they be mitigated?
9.  **Hard**: Design a prompt for an actual LLM (e.g., GPT-4) that takes the transcribed text and the current robot state, and outputs a JSON object representing the robot's intended action.
10. **Hard**: Explore methods for handling accents and noisy environments to improve ASR accuracy for diverse users and real-world scenarios.

## Bridge to Next Chapter
Having explored how to translate voice into actionable commands, the next crucial step is to enable our robots to plan and reason about their actions. Chapter 16 will dive into how LLMs can be used for high-level cognitive planning, allowing robots to break down complex goals into a series of executable steps.