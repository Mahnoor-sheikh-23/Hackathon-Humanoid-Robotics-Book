---
sidebar_position: 3
---

# Chapter 12: Advanced Navigation with Nav2

## Learning Objectives
- Understand the architecture and components of the ROS 2 Nav2 stack.
- Learn to configure Nav2 for autonomous navigation in a simulated environment.
- Grasp the concepts of global and local path planning.
- Implement a basic navigation task for a robot using Nav2.

## Introduction
Enabling a robot to move autonomously from one point to another while avoiding obstacles and adhering to a predefined path is a core challenge in robotics. ROS 2's Navigation2 (Nav2) stack provides a comprehensive framework for this, offering modular components for localization, path planning, and control. Building upon our understanding of VSLAM and simulation, this chapter will guide you through the architecture of Nav2 and its configuration, empowering your humanoid robots to navigate complex environments intelligently.

## Core Concepts
### 1. Nav2 Architecture Overview
Nav2 is a flexible and configurable navigation framework for ROS 2. It consists of several interconnected nodes:
- **`amcl` (Adaptive Monte Carlo Localization)**: For probabilistic localization within a known map.
- **`map_server`**: Provides the occupancy grid map to other Nav2 components.
- **`global_planner`**: Computes a collision-free path from the robot's start to goal (e.g., A*, Dijkstra).
- **`local_planner` (Controller)**: Generates velocity commands to follow the global path and avoid immediate obstacles (e.g., DWB, TEB).
- **`behavior_tree`**: Orchestrates the various navigation tasks and recovery behaviors.
- **`bt_navigator`**: The main interface to the behavior tree.

### 2. Global vs. Local Path Planning
- **Global Planner**: Plans a complete path from start to goal across the entire map, considering known obstacles. This path is often a coarse trajectory.
- **Local Planner**: Operates over a small window of the global path, generating real-time velocity commands to avoid dynamic obstacles and refine movement. It ensures smooth, collision-free motion in the immediate vicinity.

### 3. Costmaps
Nav2 uses **costmaps**—2D occupancy grids that represent the cost of traversing each cell in the environment. These costs can represent obstacles, inflation layers (areas around obstacles), or even terrain traversability, guiding the planners to find safe paths.

## Hands-on Tutorial: Basic Nav2 Setup (Conceptual)

This conceptual tutorial outlines how to set up Nav2 for a differential drive robot. (Requires Nav2, Gazebo, and ROS 2).

**File**: `my_robot_navigation/launch/navigation_launch.py` (Conceptual)
```python
import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch_ros.actions import Node

def generate_launch_description():
    # Get paths
    nav2_bringup_dir = get_package_share_directory('nav2_bringup')
    # Assuming your robot description package is named 'my_robot_description'
    robot_description_dir = get_package_share_directory('my_robot_description')

    # Include the robot state publisher and joint state publisher nodes (for URDF visualization)
    robot_state_publisher_node = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(robot_description_dir, 'launch', 'rsp_launch.py'))
    )

    # Launch Nav2 itself
    navigation_launch = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(nav2_bringup_dir, 'launch', 'navigation_launch.py')),
        launch_arguments={
            'use_sim_time': 'true',
            'params_file': os.path.join(robot_description_dir, 'params', 'nav2_params.yaml')
        }.items()
    )

    return LaunchDescription([
        robot_state_publisher_node,
        navigation_launch,
    ])
```

_To send a navigation goal, you would typically use RViz 2's "2D Nav Goal" tool after launching this setup in Gazebo._

## Key Takeaways
- Nav2 is a comprehensive ROS 2 stack for autonomous navigation.
- It uses modular components like `amcl`, `global_planner`, `local_planner`, and `costmaps`.
- Global planners define overall paths, while local planners handle immediate obstacle avoidance.
- Costmaps are crucial for representing traversability and obstacles.
- Nav2 enables robots to navigate complex environments intelligently.

## Exercises
1.  **Easy**: Name three key components of the Nav2 stack.
2.  **Easy**: What is the primary difference between a global planner and a local planner?
3.  **Medium**: Research and explain the concept of an "occupancy grid map" in the context of robot navigation. How is it typically generated and used by Nav2?
4.  **Medium**: Discuss the role of "behavior trees" in Nav2. How do they contribute to the robot's autonomy and recovery from failures?
5.  **Hard**: Outline the conceptual steps to configure Nav2 for a humanoid robot in a simulated indoor environment. Consider how you would generate a map, define a navigation goal, and visualize the robot's path and costmap in RViz 2.

---
_Bridge to next chapter: Beyond navigating known environments, robots can also learn complex behaviors through trial and error. The next chapter introduces Reinforcement Learning in Isaac Gym, a powerful platform for training physically accurate robotic agents at scale._
