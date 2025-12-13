---
title: Appendix F - ROS 2 Cheatsheet
---

## Introduction to the ROS 2 Cheatsheet
This cheatsheet provides a quick reference for commonly used commands, concepts, and best practices in ROS 2 (Robot Operating System 2), specifically for the Humble Hawksbill distribution. Whether you're a beginner or an experienced ROS 2 developer, this appendix aims to be a handy resource for quickly looking up syntax and functionalities as you work on your humanoid robotics projects.

---

## ROS 2 Basic Commands

### 1. Environment Setup
- **Source ROS 2**: Make ROS 2 commands available in your current terminal. Replace `humble` with your ROS 2 distro.
    ```bash
    source /opt/ros/humble/setup.bash
    ```
- **Source Workspace**: Make packages from your workspace available.
    ```bash
    source ~/ros2_ws/install/setup.bash
    ```
    *Tip: Add these to your `~/.bashrc` for automatic sourcing.*

### 2. Package & Workspace Management
- **Create Workspace**: Create a new ROS 2 workspace.
    ```bash
    mkdir -p ~/ros2_ws/src
    cd ~/ros2_ws
    ```
- **Create Package**: Create a new ROS 2 package (Python or C++).
    ```bash
    cd ~/ros2_ws/src
    ros2 pkg create --build-type ament_python my_package_name # Python
    ros2 pkg create --build-type ament_cmake my_package_name # C++
    ```
- **Build Workspace**: Build all packages in your workspace.
    ```bash
    cd ~/ros2_ws
    colcon build --symlink-install
    ```
- **Build Specific Package**: Build only one package.
    ```bash
    cd ~/ros2_ws
    colcon build --packages-select my_package_name
    ```
- **Clean Workspace**: Remove build/install/log directories (useful for clean rebuilds).
    ```bash
    cd ~/ros2_ws
    rm -rf build install log
    ```
- **Find Package Path**: Get the absolute path to a package.
    ```bash
    ros2 pkg prefix my_package_name
    ```

### 3. Running Nodes
- **Run Node**: Execute a ROS 2 node.
    ```bash
    ros2 run my_package_name my_node_executable
    ```
- **Launch File**: Run a set of nodes and configurations using a launch file.
    ```bash
    ros2 launch my_package_name my_launch_file.py
    ```

### 4. ROS 2 Introspection (Examining the System)
- **List Nodes**: Show currently running ROS 2 nodes.
    ```bash
    ros2 node list
    ```
- **Node Info**: Get information about a specific node.
    ```bash
    ros2 node info /my_node_name
    ```
- **List Topics**: Show active topics.
    ```bash
    ros2 topic list
    ros2 topic list -t # Show topic types
    ```
- **Topic Echo**: Display messages published on a topic.
    ```bash
    ros2 topic echo /topic_name
    ```
- **Topic Info**: Get information about a topic (publishers, subscribers, type).
    ```bash
    ros2 topic info /topic_name
    ```
- **List Services**: Show available services.
    ```bash
    ros2 service list
    ```
- **Service Info**: Get information about a service.
    ```bash
    ros2 service info /service_name
    ```
- **Call Service**: Call a service once.
    ```bash
    ros2 service call /service_name service_type '{argument_name: argument_value}'
    # Example: ros2 service call /add_two_ints example_interfaces/srv/AddTwoInts '{a: 1, b: 2}'
    ```
- **List Actions**: Show available actions.
    ```bash
    ros2 action list
    ```
- **Action Info**: Get information about an action.
    ```bash
    ros2 action info /action_name
    ```

### 5. Message & Interface Management
- **List Interfaces**: List all available ROS 2 message, service, and action types.
    ```bash
    ros2 interface list
    ```
- **Show Interface**: Display the definition of a specific message, service, or action type.
    ```bash
    ros2 interface show std_msgs/msg/String
    ros2 interface show example_interfaces/srv/AddTwoInts
    ```

### 6. Logging & Debugging
- **`rqt_console`**: ROS 2 GUI tool for viewing log messages.
    ```bash
rqt_console
    ```
- **`rqt_graph`**: ROS 2 GUI tool for visualizing the ROS 2 computation graph (nodes, topics).
    ```bash
rqt_graph
    ```
- **ROS 2 Logger Levels**: Configure logging levels for nodes.
    ```bash
    # In your code:
    self.get_logger().info("Informative message")
    self.get_logger().warn("Warning message")
    self.get_logger().error("Error message")

    # At runtime (from another terminal):
    ros2 param set /my_node_name logger_level DEBUG
    ```

### 7. Parameter Management
- **List Parameters**: Show parameters for a node.
    ```bash
    ros2 param list /my_node_name
    ```
- **Get Parameter**: Read the value of a parameter.
    ```bash
    ros2 param get /my_node_name my_parameter
    ```
- **Set Parameter**: Set the value of a parameter.
    ```bash
    ros2 param set /my_node_name my_parameter new_value
    ```

### 8. ROS 2 Bags (Data Recording & Playback)
- **Record**: Record data from topics to a bag file.
    ```bash
    ros2 bag record -a # Record all topics
    ros2 bag record /topic1 /topic2 # Record specific topics
    ros2 bag record -o my_bag_name # Specify output bag name
    ```
- **Play**: Play back data from a bag file.
    ```bash
    ros2 bag play my_bag_name
    ```

## ROS 2 Concepts

- **Node**: An executable that performs computation (e.g., sensor driver, algorithm, controller).
- **Topic**: A named bus for asynchronous, many-to-many message passing.
- **Message**: A data structure exchanged over topics or services.
- **Service**: A synchronous, one-to-one request/reply communication mechanism.
- **Action**: An asynchronous, one-to-one mechanism for long-running tasks, providing feedback and the ability to cancel.
- **Parameter**: Configuration values for nodes, dynamically changeable at runtime.
- **Package**: The basic unit of organization in ROS 2, containing nodes, launch files, messages, etc.
- **Workspace**: A collection of ROS 2 packages that are built and installed together.
- **DDS (Data Distribution Service)**: The middleware used by ROS 2 for communication, providing features like quality of service (QoS) settings.
- **RCL (ROS Client Library)**: The language-agnostic API that client libraries (like `rclpy` for Python, `rclcpp` for C++) are built upon.

---

This cheatsheet covers the most common ROS 2 commands and concepts. For detailed information, always refer to the [Official ROS 2 Documentation](https://docs.ros.org/en/humble/index.html).