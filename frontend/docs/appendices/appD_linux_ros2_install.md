---
title: Appendix D - Linux and ROS 2 Installation Guide
---

## Introduction to Linux and ROS 2 Setup
This appendix provides a comprehensive guide for setting up your development environment, focusing on installing Ubuntu Linux and the Robot Operating System (ROS 2) Humble Hawksbill. A well-configured system is the bedrock for all physical AI and humanoid robotics development. While NVIDIA Jetson boards come with a pre-installed Ubuntu variant, this guide is invaluable if you are setting up a fresh desktop/laptop for development or need to re-flash your system.

## 1. Installing Ubuntu 22.04 LTS (Jammy Jellyfish)
Ubuntu 22.04 LTS is the recommended operating system for ROS 2 Humble Hawksbill and most robotics development. Long-Term Support (LTS) releases receive updates for five years, providing stability.

### Step 1.1: Download Ubuntu 22.04 LTS
1.  **Download ISO**: Visit the [Official Ubuntu Download Page](https://ubuntu.com/download/desktop) and download the `.iso` file for Ubuntu 22.04 LTS.

### Step 1.2: Create a Bootable USB Drive
1.  **Use Etcher/Rufus**: Download and use a tool like [BalenaEtcher](https://www.balena.io/etcher/) (cross-platform) or [Rufus](https://rufus.ie/) (Windows) to write the Ubuntu ISO image to a USB flash drive (8GB or larger). **Ensure you select the correct USB drive to avoid data loss!**

### Step 1.3: Install Ubuntu
1.  **Boot from USB**: Insert the bootable USB into your computer, restart, and enter your BIOS/UEFI settings (usually by pressing F2, F10, F12, or Del during boot) to change the boot order to your USB drive.
2.  **Follow Installer**: When Ubuntu loads, choose "Install Ubuntu." Follow the on-screen instructions, selecting your language, keyboard layout, and installation type. It's generally recommended to choose "Erase disk and install Ubuntu" for a fresh installation. If you want to dual-boot, be very careful and consider backing up your data.
3.  **User Creation**: Create your user account and set a strong password.
4.  **Complete Installation**: The installation will proceed. Once finished, remove the USB drive and restart your computer when prompted.

### Step 1.4: Post-Installation Updates
After your first boot into Ubuntu, open a terminal (Ctrl+Alt+T) and update your system:

```bash
sudo apt update
sudo apt upgrade -y
sudo apt autoremove -y
```

## 2. Installing ROS 2 Humble Hawksbill (on Ubuntu 22.04)
ROS 2 Humble Hawksbill is the current LTS release compatible with Ubuntu 22.04 LTS.

### Step 2.1: Set up Locales
Ensure you have a locale that supports UTF-8. You can check your current locale with `locale`.

```bash
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8
```

### Step 2.2: Add ROS 2 Repository
Add the ROS 2 GPG key and repository to your system.

```bash
sudo apt install curl -y # Install curl if not already present
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

sudo apt update
```

### Step 2.3: Install ROS 2 Packages
It's recommended to install the "Desktop Install" which includes ROS, RViz, and demos.

```bash
sudo apt install ros-humble-desktop -y
```
If you need additional development tools, you can also install:
```bash
sudo apt install ros-dev-tools -y
```

### Step 2.4: Environment Setup
Source the ROS 2 setup file in every new terminal session, or add it to your `~/.bashrc` for automatic sourcing.

```bash
# Source ROS 2 setup in current terminal
source /opt/ros/humble/setup.bash

# Add to ~/.bashrc for automatic sourcing (recommended)
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### Step 2.5: Install Autocompletion (Optional, but Recommended)
```bash
sudo apt install python3-argcomplete -y
```

### Step 2.6: Verify ROS 2 Installation
Run a simple ROS 2 example:

1.  **Start a Talker node**: In one terminal:
    ```bash
    ros2 run demo_nodes_cpp talker
    ```
2.  **Start a Listener node**: In another terminal:
    ```bash
    ros2 run demo_nodes_py listener
    ```
You should see the listener receiving messages from the talker, confirming your ROS 2 installation is functional.

## 3. Recommended Additional Development Tools

### 3.1. Git
Essential for version control.
```bash
sudo apt install git -y
```

### 3.2. Python Development Tools
For managing Python packages and virtual environments.
```bash
sudo apt install python3-pip python3-venv -y
```

### 3.3. VS Code (Optional)
A popular IDE with excellent ROS 2 and Python support.
1.  **Download VS Code**: Download the `.deb` package from [Visual Studio Code](https://code.visualstudio.com/download).
2.  **Install**: `sudo apt install ./code_<version>.deb`.
3.  **Extensions**: Install extensions like "ROS", "Python", "C/C++", "Pylance", "ESLint", "Prettier".

### 3.4. Docker (Optional)
Useful for containerizing ROS 2 applications and ensuring reproducible environments.
```bash
sudo apt install docker.io -y
sudo usermod -aG docker $USER # Add your user to the docker group
# Log out and log back in for group changes to take effect
```

## Conclusion
Your Ubuntu 22.04 system is now set up with ROS 2 Humble Hawksbill and essential development tools. You have a robust and consistent environment to embark on your physical AI and humanoid robotics projects, from writing ROS 2 nodes to developing complex AI algorithms.