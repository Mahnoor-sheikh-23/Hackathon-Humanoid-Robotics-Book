---
sidebar_position: 4
---

# Chapter 6: ROS 2 Launch Files

## Learning Objectives
- Understand the purpose of ROS 2 launch files for managing complex systems.
- Learn to create launch files using Python.
- Grasp how to include multiple nodes, parameters, and other launch files.
- Develop a launch file to start a simple ROS 2 robot system.

## Introduction
As robotic systems grow in complexity, manually starting each ROS 2 node can become tedious and error-prone. ROS 2 launch files provide a powerful and flexible way to define and manage the startup configuration of your entire robot application. Using Python-based launch files, you can easily orchestrate multiple nodes, set parameters, include other launch files, and control the execution flow. This chapter will equip you with the skills to build robust launch configurations for your humanoid robotics projects.

## Core Concepts
### 1. What are ROS 2 Launch Files?
ROS 2 launch files are Python scripts (or XML files, though Python is preferred for its flexibility) that describe how to run a set of ROS 2 nodes and other processes. They are executed by the `ros2 launch` command and allow you to:
- Start multiple nodes simultaneously.
- Set node parameters.
- Remap topics or services.
- Include other launch files.
- Conditionally execute parts of the launch file.

### 2. Python Launch Files
Python launch files use the `launch` and `launch_ros` packages. The entry point is typically a `generate_launch_description()` function that returns a `LaunchDescription` object, which is a collection of actions to be performed during startup.

### 3. Key Launch Actions
- **`Node`**: Starts a ROS 2 node. You specify the package, executable, node name, parameters, and remappings.
- **`ExecuteProcess`**: Runs an arbitrary command-line process.
- **`IncludeLaunchDescription`**: Incorporates another launch file into the current one.
- **`DeclareLaunchArgument`**: Defines arguments that can be passed to the launch file from the command line.
- **`OpaqueFunction`**: Allows executing arbitrary Python code during launch.

## Hands-on Tutorial: Simple Robot Launch File (Conceptual Python)

Let's create a conceptual launch file that starts a talker and listener node.

**File**: `my_robot_bringup/launch/simple_robot.launch.py`
```python
import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    # Get the path to the simple_talker_listener package share directory
    # (assuming your talker/listener nodes are in a package named simple_talker_listener)
    simple_talker_listener_dir = get_package_share_directory('simple_talker_listener')

    # Define the talker node
    talker_node = Node(
        package='simple_talker_listener',
        executable='talker',
        name='my_talker',
        output='screen',
        parameters=[{'frequency': 1.0}] # Example parameter
    )

    # Define the listener node
    listener_node = Node(
        package='simple_talker_listener',
        executable='listener',
        name='my_listener',
        output='screen',
        remappings=[('/chatter', '/my_custom_chatter')] # Example remapping
    )

    return LaunchDescription([
        talker_node,
        listener_node
    ])

```

_To run this launch file, you would typically use: `ros2 launch my_robot_bringup simple_robot.launch.py` (after building your workspace and sourcing the setup file)._

## Key Takeaways
- ROS 2 launch files automate the startup of complex robotic systems.
- Python launch files provide flexibility and programmatic control.
- Key actions include `Node`, `ExecuteProcess`, `IncludeLaunchDescription`, and `DeclareLaunchArgument`.
- Launch files are essential for managing multiple nodes, parameters, and communication in ROS 2.
- They enable robust and reproducible system startups.

## Exercises
1.  **Easy**: What is the main advantage of using a ROS 2 launch file instead of starting nodes individually?
2.  **Easy**: Name two common actions you can perform within a Python launch file.
3.  **Medium**: Modify the `simple_robot.launch.py` to include a `DeclareLaunchArgument` for the `frequency` parameter of the `talker_node`, allowing it to be set from the command line.
4.  **Medium**: Research and explain the concept of "remappings" in ROS 2 launch files. Provide an example where remapping a topic would be beneficial.
5.  **Hard**: Design a conceptual launch file that starts three nodes: a camera driver, an image processing node (subscribing to camera topic, publishing processed image), and an object detection node (subscribing to processed image, publishing detected objects). Include parameters for the camera resolution and a remapping for the processed image topic.

---
_Bridge to next chapter: Having mastered the basics of ROS 2, URDF, and launch files, we're ready to take our robots into the virtual world. The next module will introduce Digital Twins, starting with the Gazebo simulator, allowing us to test and develop robots in a safe, repeatable environment._
