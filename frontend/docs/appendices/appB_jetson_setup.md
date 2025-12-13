---
title: Appendix B - NVIDIA Jetson Setup Guide
---

## Introduction to NVIDIA Jetson Setup
This guide provides a step-by-step process for setting up your NVIDIA Jetson Orin series development kit. Proper setup is crucial to ensure your Jetson board is ready for developing physical AI and robotics applications, including installing the JetPack SDK, flashing the operating system, and configuring essential development tools.

## 1. Prerequisites
Before you begin, ensure you have the following:
- **NVIDIA Jetson Orin Nano/NX Developer Kit**: The actual hardware.
- **Host PC**: A Linux (Ubuntu is recommended) or Windows/macOS machine with at least 100GB free disk space. A Linux host is generally easier for flashing.
- **USB-C Cable**: For connecting the Jetson to the host PC in recovery mode.
- **Ethernet Cable**: For network connection (optional, but recommended for initial setup).
- **USB Keyboard & Mouse**: For direct interaction with the Jetson.
- **Display**: HDMI or DisplayPort compatible monitor.
- **MicroSD Card (for Orin Nano Dev Kit)**: A high-speed (UHS-I or UHS-II) 64GB or larger MicroSD card (not needed for Orin NX Dev Kit, which uses NVMe).
- **Power Supply**: The official NVIDIA Jetson power supply (important for stable operation).
- **Internet Connection**.

## 2. Flashing JetPack SDK with NVIDIA SDK Manager (Recommended Method)
NVIDIA SDK Manager is a comprehensive tool that simplifies the process of flashing your Jetson module, installing the OS, and setting up the full JetPack SDK (CUDA, cuDNN, TensorRT, etc.) on both your host PC and the Jetson.

### Step 2.1: Install SDK Manager on Host PC
1.  **Download SDK Manager**: Visit the [NVIDIA Developer Jetson Download Center](https://developer.nvidia.com/embedded/downloads) and download the SDK Manager for your host operating system.
2.  **Install**: Follow the on-screen instructions. For Ubuntu, you typically download a `.deb` package and install it via `sudo apt install ./sdkmanager_<version>.deb`.

### Step 2.2: Prepare Jetson for Flashing
1.  **Connect Peripherals**: Connect a keyboard, mouse, and display to your Jetson board.
2.  **Power Off**: Ensure the Jetson is powered off.
3.  **Enter Recovery Mode**: Connect the USB-C cable from your host PC to the Jetson's USB-C port (usually marked `PWR`). For most Orin dev kits, simultaneously hold down the `Force Recovery` button and the `Reset` button, then release `Reset` and then `Force Recovery` after 2 seconds. The Jetson should power on (if not already) and be detected by the host PC in recovery mode.

### Step 2.3: Use SDK Manager to Flash Jetson
1.  **Launch SDK Manager**: Open SDK Manager on your host PC.
2.  **Login**: Log in with your NVIDIA Developer account.
3.  **Select Hardware**: SDK Manager should detect your Jetson board in recovery mode. Select your Jetson product (e.g., Jetson Orin Nano Developer Kit).
4.  **Select Components**: Choose the JetPack version you want to install. Ensure "Jetson OS" and "JetPack SDK" components are selected for installation. You can deselect other components like "DeepStream" or "ISAAC ROS" if you don't need them immediately to save time and space.
5.  **Review and Install**: Accept the license agreements and click "Download and Install" (or "Flash" if components are already downloaded).
6.  **Flash Target OS**: SDK Manager will download the necessary files and then prompt you for a password to flash the Jetson. Follow the instructions; the Jetson will be flashed. During this process, it might reboot several times.
7.  **Post-Flash Setup**: After flashing, the Jetson will reboot into a graphical environment. SDK Manager will prompt you to complete the setup. On the Jetson's display, follow the Ubuntu initial setup (create user, set language, etc.). Once done, the SDK Manager will finish installing the JetPack SDK components (CUDA, cuDNN, etc.) via network to your Jetson.

## 3. Manual Flashing for Jetson Orin Nano (MicroSD Card Method)
This method is primarily for Jetson Orin Nano Developer Kits that boot from a MicroSD card.

### Step 3.1: Download JetPack SD Card Image
1.  **Download Image**: Go to the [NVIDIA Developer Jetson Download Center](https://developer.nvidia.com/embedded/downloads) and find the "SD Card Image" for your Jetson Orin Nano Developer Kit. Download the `.zip` file.

### Step 3.2: Flash Image to MicroSD Card
1.  **Use Etcher/Rufus**: Use a tool like [BalenaEtcher](https://www.balena.io/etcher/) (cross-platform) or [Rufus](https://rufus.ie/) (Windows) to flash the downloaded `.zip` image to your MicroSD card. **Ensure you select the correct drive for your MicroSD card to avoid data loss!**
2.  **Write Process**: The flashing process can take 10-30 minutes depending on your card speed and system.

### Step 3.3: Boot Jetson Orin Nano
1.  **Insert MicroSD**: Safely eject the MicroSD card from your host PC and insert it into the MicroSD card slot on your Jetson Orin Nano Developer Kit.
2.  **Power On**: Connect the power supply to the Jetson and power it on.
3.  **Initial Setup**: The Jetson will boot into Ubuntu. Follow the on-screen prompts to complete the initial setup (create user, set language, connect to Wi-Fi).

## 4. Post-Installation Setup and Verification

### 4.1. Update and Upgrade System
Once booted, open a terminal on your Jetson and run:
```bash
sudo apt update
sudo apt upgrade -y
```

### 4.2. Verify JetPack Installation
Run the following commands to check if CUDA, cuDNN, and TensorRT are correctly installed:
- **CUDA Version**: `nvcc --version`
- **cuDNN/TensorRT (check libraries)**: Navigate to `/usr/local/cuda/lib64` and `/usr/lib/aarch64-linux-gnu/` and look for `libcudnn.so` and `libnvinfer.so` files.
- **Jetson Stats**: Install `jetson-stats` for easy monitoring:
    ```bash
    sudo pip3 install jetson-stats
    jtop # Then run `jtop` in terminal
    ```

### 4.3. Install ROS 2 (If not installed by SDK Manager)
Refer to Appendix D for a detailed guide on installing ROS 2 Humble Hawksbill on Ubuntu 22.04.

### 4.4. Set up Development Environment
- **Python**: Ensure Python 3.10+ is the default or accessible.
- **Pip & Virtual Environments**: Always use `pip` with `venv` for project dependencies.
    ```bash
    sudo apt install python3-venv python3-pip -y
    ```
- **Git**: Ensure Git is installed for version control.
    ```bash
    sudo apt install git -y
    ```

## 5. Troubleshooting Common Issues
- **Flashing Failures**: Double-check USB-C connection, ensure Jetson is in recovery mode, try a different USB port or cable on your host PC.
- **Boot Issues**: Verify MicroSD card integrity (for Orin Nano), ensure correct power supply, check display connection.
- **SDK Manager Issues**: Ensure host PC has enough disk space, check internet connection for downloads.
- **Performance Issues**: Monitor CPU/GPU/memory usage with `jtop` or `top`. Ensure proper cooling.

## Conclusion
Your NVIDIA Jetson board should now be fully set up and ready for developing advanced physical AI and humanoid robotics applications. With the JetPack SDK installed and basic development tools configured, you have a powerful edge computing platform at your disposal to bring your robotic projects to life. Remember to consult NVIDIA's official documentation for the most up-to-date information and troubleshooting tips.