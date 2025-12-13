---
sidebar_position: 3
---

# Chapter 5: Unified Robot Description Format (URDF)

## Learning Objectives
- Understand the purpose and structure of URDF files.
- Learn to define robot links and joints using URDF XML tags.
- Grasp the concepts of kinematics and dynamics within URDF.
- Create a simple URDF model for a basic robotic arm.

## Introduction
To effectively simulate, control, and visualize robots, we need a standardized way to describe their physical characteristics. The Unified Robot Description Format (URDF) is an XML format used in ROS 2 (and ROS 1) to describe all elements of a robot. This includes its kinematic and dynamic properties, visual appearance, and collision behavior. This chapter will guide you through creating your first URDF model, providing the blueprint for your digital twin.

## Core Concepts
### 1. URDF Structure
A URDF file is an XML document that defines a robot as a collection of **links** and **joints**.
- **`<robot>` tag**: The root element of the URDF, usually with a `name` attribute.
- **`<link>` tag**: Represents a rigid body segment of the robot (e.g., base, arm segment, end-effector). It defines properties like mass, inertia, visual geometry, and collision geometry.
- **`<joint>` tag**: Describes the connection between two links, defining their relative motion. Key attributes include `name`, `type` (e.g., `revolute`, `prismatic`, `fixed`), `parent`, and `child` links.

### 2. Kinematics and Dynamics in URDF
- **Kinematics**: URDF implicitly defines the robot's forward kinematics through the hierarchical structure of links and joints. The `<origin>` tag within a `<joint>` specifies the transform between the parent and child link.
- **Dynamics**: The `<inertial>` tag within a `<link>` defines mass, center of mass, and inertia matrix, which are crucial for dynamic simulations.

### 3. Visuals and Collisions
- **`<visual>` tag**: Describes the graphical model of the link, used for rendering in simulators (e.g., Gazebo, RViz).
- **`<collision>` tag**: Describes the simplified collision model of the link, used for physics interactions and collision detection. This is often a simpler primitive shape to reduce computational load.

## Hands-on Tutorial: Simple 2-Link Arm URDF (Conceptual)

Let's create a basic URDF for a 2-link robotic arm. (Conceptual XML).

**File**: `my_robot_description/urdf/simple_arm.urdf`
```xml
<?xml version="1.0"?>
<robot name="simple_arm">

  <!-- Base Link -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.1 0.1 0.1"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 0.8 1"/>
      </material>
    </visual>
  </link>

  <!-- Joint 1: connects base_link to link1 -->
  <joint name="joint1" type="revolute">
    <parent link="base_link"/>
    <child link="link1"/>
    <origin xyz="0 0 0.05" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-1.57" upper="1.57" effort="100" velocity="1"/>
  </joint>

  <!-- Link 1 -->
  <link name="link1">
    <visual>
      <geometry>
        <cylinder radius="0.02" length="0.2"/>
      </geometry>
      <origin xyz="0 0 0.1" rpy="0 0 0"/>
      <material name="green">
        <color rgba="0 0.8 0 1"/>
      </material>
    </visual>
    <inertial>
      <mass value="0.1"/>
      <inertia ixx="0.001" ixy="0" ixz="0" iyy="0.001" iyz="0" izz="0.001"/>
    </inertial>
  </link>

  <!-- Joint 2: connects link1 to link2 -->
  <joint name="joint2" type="revolute">
    <parent link="link1"/>
    <child link="link2"/>
    <origin xyz="0 0 0.2" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-1.57" upper="1.57" effort="100" velocity="1"/>
  </joint>

  <!-- Link 2 -->
  <link name="link2">
    <visual>
      <geometry>
        <cylinder radius="0.02" length="0.2"/>
      </geometry>
      <origin xyz="0 0 0.1" rpy="0 0 0"/>
      <material name="red">
        <color rgba="0.8 0 0 1"/>
      </material>
    </visual>
    <inertial>
      <mass value="0.1"/>
      <inertia ixx="0.001" ixy="0" ixz="0" iyy="0.001" iyz="0" izz="0.001"/>
    </inertial>
  </link>

</robot>
```
_Note: To visualize this URDF, you would typically use `rviz2` in a ROS 2 environment after setting up your package and launch files._

## Key Takeaways
- URDF is an XML format for describing robot kinematics, dynamics, visuals, and collisions.
- Robots are defined by interconnected `<link>` and `<joint>` elements.
- Kinematics are described by joint transforms, while dynamics involve mass and inertia.
- Separate visual and collision geometries are used for rendering and physics.
- URDF is fundamental for robot simulation and visualization in ROS 2.

## Exercises
1.  **Easy**: What are the two main types of elements in a URDF file?
2.  **Easy**: Explain the difference between `<visual>` and `<collision>` tags in URDF.
3.  **Medium**: Modify the `simple_arm.urdf` to add a third link and joint, extending the arm. Describe the changes you made.
4.  **Medium**: Research the different `type` attributes for the `<joint>` tag in URDF (e.g., `continuous`, `prismatic`, `fixed`). Explain when you would use each type.
5.  **Hard**: Design a URDF for a simple wheeled mobile robot with two differential drive wheels and a caster wheel. Include appropriate links, joints, visuals, and basic inertial properties (conceptual).

---
_Bridge to next chapter: With our robot's physical description in URDF, the next step is to orchestrate how all its components—and their ROS 2 nodes—start and interact. We'll explore ROS 2 Launch Files, which provide a powerful way to manage complex robotic systems._
