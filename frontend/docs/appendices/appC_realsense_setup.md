---
title: Appendix C - Intel RealSense Setup Guide
---

## Introduction to Intel RealSense Setup
This guide provides a step-by-step process for setting up your Intel RealSense D435i depth camera on an Ubuntu 22.04 system, which is common for robotics development (e.g., with NVIDIA Jetson or a Linux workstation). Proper installation of the `librealsense` SDK and its ROS 2 wrapper is essential for utilizing the camera's capabilities for perception tasks in your humanoid robot project.

## 1. Prerequisites
Before you begin, ensure you have the following:
- **Intel RealSense D435i Camera**: The camera hardware and a USB 3.0 compatible cable.
- **Host System**: An Ubuntu 22.04 machine (e.g., NVIDIA Jetson Orin or a desktop/laptop).
- **Internet Connection**.
- **USB 3.0 Port**: Ensure your host system has a functional USB 3.0 port for optimal camera performance.

## 2. Installing Intel librealsense SDK
This section outlines how to install the `librealsense` SDK, which is the foundational software for interacting with your RealSense camera.

### Step 2.1: Add Intel librealsense Repository
First, add the Intel repository key and repository to your system's sources.

```bash
# Install tools for adding HTTPS sources
sudo apt-get install software-properties-common -y

# Add the Intel librealsense GPG key
sudo mkdir -p /etc/apt/keyrings
sudo wget -O /etc/apt/keyrings/librealsense.pgp https://librealsense.intel.com/Debian/apt/librealsense.pgp
sudo chmod a+r /etc/apt/keyrings/librealsense.pgp

# Add the librealsense repository to your sources list
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/librealsense.pgp] https://librealsense.intel.com/Debian/apt/ jammy main" | sudo tee /etc/apt/sources.list.d/librealsense.list

# Update your package list
sudo apt-get update
```

### Step 2.2: Install librealsense
Now, install the SDK and development packages.

```bash
sudo apt-get install librealsense2-dkms librealsense2-utils librealsense2-dev -y
```
- `librealsense2-dkms`: Ensures the kernel modules for RealSense are built and kept up-to-date.
- `librealsense2-utils`: Provides command-line tools like `realsense-viewer`.
- `librealsense2-dev`: Development headers and libraries for compiling applications against `librealsense`.

### Step 2.3: Verify Installation
Connect your RealSense D435i camera to a USB 3.0 port. Open a terminal and run the RealSense Viewer:

```bash
realsense-viewer
```
A graphical application should launch, displaying live camera feeds (RGB, Depth, IR) and allowing you to configure settings. If you see the feeds, your `librealsense` SDK installation is successful.

## 3. Installing ROS 2 Wrapper for RealSense
To use the RealSense camera within your ROS 2 (Humble Hawksbill on Ubuntu 22.04) projects, you need the official ROS 2 wrapper.

### Step 3.1: Create a ROS 2 Workspace (if you don't have one)
If you already have a ROS 2 workspace (e.g., `~/ros2_ws`), skip this step.

```bash
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws
vcs import src < https://raw.githubusercontent.com/IntelRealSense/realsense-ros/ros2-development/realsense-ros.repos
```
This command will fetch the `realsense-ros` repository and its dependencies into your workspace `src` directory.

### Step 3.2: Install ROS Dependencies
Make sure all required ROS dependencies are installed.

```bash
rosdep install -i --from-path src --rosdistro humble -y
```

### Step 3.3: Build the ROS 2 Wrapper
Now, build the `realsense-ros` package from your workspace.

```bash
cd ~/ros2_ws
# Source your ROS 2 environment first (if not already sourced)
source /opt/ros/humble/setup.bash

colcon build --symlink-install
```

### Step 3.4: Source the Workspace and Launch
After building, source your workspace to make the new ROS 2 packages available.

```bash
source ~/ros2_ws/install/setup.bash

# Launch the RealSense ROS 2 node
ros2 launch realsense2_camera rs_launch.py
```

You should see output indicating the RealSense node has started and is publishing data. To visualize the data, open RViz in another terminal:

```bash
source /opt/ros/humble/setup.bash
source ~/ros2_ws/install/setup.bash
rviz2
```

In RViz, add a `PointCloud2` display and set its topic to `/camera/depth/color/points` (or similar, check available topics with `ros2 topic list`). You should see a live 3D point cloud from your camera.

## 4. Troubleshooting Common Issues
- **`realsense-viewer` not showing data**: Ensure camera is properly connected to a USB 3.0 port. Try a different port or cable. Restart your system.
- **Permissions Issues**: If you get errors related to device access, you might need to add udev rules. These are usually installed by `librealsense2-dkms`, but if problems persist, consult the `librealsense` GitHub for manual udev rule installation.
- **ROS 2 Wrapper Build Failures**: Check `rosdep install` output for missing dependencies. Ensure your ROS 2 environment is sourced correctly before `colcon build`. Check build logs (`colcon build --event-handlers console_direct+ --symlink-install`).
- **No `realsense2_camera` topics in ROS 2**: Ensure the `rs_launch.py` is running without errors. Check `ros2 node list` and `ros2 topic list`.
- **USB 2.0 vs USB 3.0**: RealSense D435i requires USB 3.0 for full performance (especially higher resolutions and frame rates). If using a USB 2.0 port, you might experience lower performance or connection issues.

## Conclusion
Your Intel RealSense D435i camera should now be fully configured and integrated with your Ubuntu system and ROS 2 environment. You are now equipped to capture high-quality RGB-D data, enabling your humanoid robot to perceive its environment in 3D and execute advanced perception tasks.