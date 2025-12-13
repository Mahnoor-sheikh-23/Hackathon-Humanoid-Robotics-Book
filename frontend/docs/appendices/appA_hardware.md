---
title: Appendix A - Hardware Overview
---

## Introduction to Hardware for Physical AI
This appendix provides an overview of the key hardware components recommended and utilized throughout "Physical AI & Humanoid Robotics — A Complete Hands-On Course." While much of the course can be explored through simulation, having access to physical hardware significantly enriches the learning experience and provides real-world challenges. Understanding the capabilities and limitations of each component is crucial for successful implementation of physical AI systems.

## 1. NVIDIA Jetson Orin Series

### Overview
NVIDIA Jetson is a series of embedded computing boards designed for AI and robotics at the edge. The Orin series, featuring the Jetson Orin Nano and Jetson Orin NX, delivers significant AI performance with low power consumption, making them ideal for autonomous robots, drones, and other embedded applications.

### Key Features
- **GPU**: NVIDIA Ampere architecture with up to 1024 CUDA cores and 32 Tensor Cores (Orin NX).
- **CPU**: Up to 8-core ARM Cortex-A78AE CPU.
- **AI Performance**: Up to 100 TOPS (Tera Operations Per Second) for AI inference.
- **Memory**: Up to 16GB 128-bit LPDDR5.
- **Interfaces**: Rich I/O including USB 3.2 Gen2, PCIe Gen3/Gen4, Gigabit Ethernet, CSI (camera), DSI (display).
- **Software**: Full NVIDIA JetPack SDK support, including CUDA, cuDNN, TensorRT, and ROS 2 integrations.

### Recommended Models
- **Jetson Orin Nano (8GB)**: Excellent starting point for learning, suitable for basic vision tasks, ROS 2 navigation, and smaller LLM inference models.
- **Jetson Orin NX (16GB)**: Offers higher performance and memory, ideal for more complex multimodal AI models, larger LLMs, and multi-sensor fusion applications.

### Role in Course
The Jetson boards serve as the on-robot compute platform, running ROS 2 nodes, AI inference models (e.g., for object detection, SLAM, LLM inference), and overall robot control logic.

## 2. Intel RealSense D435i Depth Camera

### Overview
The Intel RealSense D435i is a stereoscopic depth camera designed for various applications, including robotics, augmented reality, and 3D scanning. It provides both RGB color images and accurate depth information, along with an integrated Inertial Measurement Unit (IMU).

### Key Features
- **Depth Technology**: Stereoscopic imaging with two IR sensors.
- **Depth Range**: 0.1 m to 10 m+ (depending on lighting and scene).
- **Depth Resolution**: Up to 1280x720 at 90 fps.
- **RGB Sensor**: Full HD 1080p at 30 fps.
- **IMU**: Integrated 3-axis accelerometer and 3-axis gyroscope for motion tracking, crucial for robust SLAM and odometry.
- **Software**: Open-source SDK (librealsense) with ROS 1/2 wrappers.

### Role in Course
Provides essential visual and depth data for environmental perception, object detection, 3D mapping (SLAM), obstacle avoidance, and human-robot interaction. The IMU data enhances state estimation for dynamic robot movements.

## 3. ReSpeaker USB Mic Array (e.g., 2-Mic or 4-Mic Array)

### Overview
ReSpeaker USB Mic Arrays are cost-effective microphone arrays designed for voice applications, including far-field voice recognition, voice commands, and sound source localization. They integrate multiple microphones and digital signal processing (DSP) to enhance audio quality.

### Key Features
- **Microphones**: Multiple omnidirectional microphones (e.g., 2, 4, 6, or 7).
- **DSP**: Built-in algorithms for noise suppression, echo cancellation, and beamforming to focus on sound sources.
- **Interface**: USB 2.0 for easy connection to host computers or embedded boards.
- **Software**: Compatible with various audio frameworks and can be integrated with ASR systems like OpenAI Whisper.

### Role in Course
Enables the robot to capture clear audio for voice commands, serving as the input for OpenAI Whisper (Chapter 15) to facilitate natural language interaction with the humanoid.

## 4. Unitree Go2 and Unitree G1 Humanoid Robots

### Overview
Unitree Robotics produces advanced quadruped and humanoid robots known for their dynamic capabilities, robust design, and open platforms. The Go2 is a popular quadruped, while the G1 is Unitree's latest humanoid offering, demonstrating cutting-edge bipedal locomotion and manipulation.

### Key Features (General for Unitree Robots)
- **Actuation**: High-performance joint motors with precise control.
- **Sensors**: Integrated cameras (RGB-D), force sensors in feet/hands, IMUs, encoders.
- **Locomotion**: Advanced gait control for stable walking, running, and complex maneuvers.
- **Manipulation (G1)**: Articulated arms and hands for grasping and interacting with objects.
- **Software**: Custom SDKs, ROS interfaces, and simulation models (e.g., URDF, Isaac Sim, Gazebo).

### Recommended Models
- **Unitree Go2**: An excellent platform for learning dynamic locomotion, inverse kinematics, and quadrupedal manipulation concepts before transitioning to bipedalism.
- **Unitree G1**: The ultimate platform for implementing the Capstone Project, offering full humanoid capabilities with advanced bipedal walking, balance, and dual-arm manipulation.

### Role in Course
These robots serve as the physical embodiment for applying learned AI and robotics principles, from low-level control to high-level cognitive planning and multimodal interaction. They provide a challenging and rewarding platform for real-world experimentation.

## 5. Generic IMU Sensors (e.g., BNO055)

### Overview
An Inertial Measurement Unit (IMU) is an electronic device that measures and reports a body's specific force, angular rate, and sometimes the orientation of the body, using a combination of accelerometers, gyroscopes, and often magnetometers.

### Key Features (BNO055 Example)
- **9-DOF Sensor Fusion**: Integrates a 3-axis 16-bit accelerometer, a 3-axis 16-bit gyroscope, and a 3-axis geomagnetic sensor.
- **Absolute Orientation**: Can provide fused sensor data outputs as quaternions, Euler angles, or rotation vectors.
- **Calibration**: Features internal intelligent sensor fusion algorithms for self-calibration.
- **Interface**: I2C, UART, or HID-I2C.

### Role in Course
Critical for precise robot state estimation, especially for dynamic humanoid balance, odometry correction, and understanding the robot's own orientation and motion. It complements visual odometry and SLAM systems by providing high-frequency motion data.

## Conclusion
This hardware suite provides a robust foundation for experimenting with and implementing the concepts taught in this course. While simulations are invaluable for initial development and testing, engaging with physical hardware offers unique insights into the complexities of real-world robotics. Choosing the right hardware for your budget and learning goals is an important first step in your journey to building intelligent humanoid robots.