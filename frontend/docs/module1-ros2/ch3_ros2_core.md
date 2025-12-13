---
sidebar_position: 1
---

# Chapter 3: ROS 2 Core Concepts

## Learning Objectives
- Understand the motivation and architecture of ROS 2.
- Identify key ROS 2 concepts: nodes, topics, services, actions, and parameters.
- Learn how to interact with ROS 2 using the command-line interface (CLI).
- Grasp the role of DDS (Data Distribution Service) in ROS 2 communication.

## Introduction
Developing complex robotic systems can be challenging, requiring careful coordination between various hardware and software components. The Robot Operating System 2 (ROS 2) provides a flexible framework, tools, and libraries to simplify this process. This chapter introduces the core concepts and architecture of ROS 2, laying the groundwork for building sophisticated robotic applications.

## Core Concepts
### 1. What is ROS 2?
ROS 2 is a set of software libraries and tools that help you build robot applications. It aims to provide a standardized operating system-like layer for robotics development, offering services like hardware abstraction, low-level device control, implementation of commonly used functionalities, message-passing between processes, and package management.

### 2. Key ROS 2 Concepts
- **Nodes**: Executable processes that perform computation (e.g., a camera driver node, a motor control node).
- **Topics**: A publish/subscribe communication mechanism where nodes send (publish) messages to topics, and other nodes receive (subscribe) messages from topics.
- **Services**: A request/reply communication mechanism for synchronous communication, where a client node sends a request to a service server node and waits for a response.
- **Actions**: A long-running goal-based communication mechanism, extending services for tasks that take a long time to complete (e.g., navigating to a goal).
- **Parameters**: Dynamic configuration values that can be changed at runtime for nodes.

### 3. DDS: The Communication Backbone
Unlike ROS 1's custom communication layer, ROS 2 uses **Data Distribution Service (DDS)**, an open standard for real-time publish/subscribe middleware. DDS provides features like quality of service (QoS) policies, security, and reliability, making ROS 2 more robust and suitable for industrial applications.

## Hands-on Tutorial: First ROS 2 Nodes (Conceptual)

This conceptual tutorial outlines how you would create and run simple ROS 2 nodes. (Requires ROS 2 installation).

```bash
# Conceptual steps for ROS 2 nodes
# 1. Create a ROS 2 workspace:
#    mkdir -p ros2_ws/src
#    cd ros2_ws
#    colcon build

# 2. Create a simple Python package for your nodes:
#    ros2 pkg create --build-type ament_python my_robot_pkg

# 3. Write a publisher node (my_robot_pkg/my_robot_pkg/publisher_member_function.py)
#    import rclpy
#    from rclpy.node import Node
#    from std_msgs.msg import String
#
#    class MinimalPublisher(Node):
#        def __init__(self):
#            super().__init__('minimal_publisher')
#            self.publisher_ = self.create_publisher(String, 'topic', 10)
#            timer_period = 0.5
#            self.timer = self.create_timer(timer_period, self.timer_callback)
#            self.i = 0
#        def timer_callback(self):
#            msg = String()
#            msg.data = 'Hello World: %d' % self.i
#            self.publisher_.publish(msg)
#            self.get_logger().info('Publishing: "%s"' % msg.data)
#            self.i += 1
#
#    def main(args=None):
#        rclpy.init(args=args)
#        minimal_publisher = MinimalPublisher()
#        rclpy.spin(minimal_publisher)
#        minimal_publisher.destroy_node()
#        rclpy.shutdown()

# 4. Write a subscriber node (my_robot_pkg/my_robot_pkg/subscriber_member_function.py)
#    import rclpy
#    from rclpy.node import Node
#    from std_msgs.msg import String
#
#    class MinimalSubscriber(Node):
#        def __init__(self):
#            super().__init__('minimal_subscriber')
#            self.subscription = self.create_subscription(
#                String,
#                'topic',
#                self.listener_callback,
#                10)
#            self.subscription # prevent unused variable warning
#        def listener_callback(self, msg):
#            self.get_logger().info('I heard: "%s"' % msg.data)
#
#    def main(args=None):
#        rclpy.init(args=args)
#        minimal_subscriber = MinimalSubscriber()
#        rclpy.spin(minimal_subscriber)
#        minimal_subscriber.destroy_node()
#        rclpy.shutdown()

# 5. Update setup.py in my_robot_pkg to include entry points for these nodes.

# 6. Build and source the workspace:
#    cd ros2_ws
#    colcon build --packages-select my_robot_pkg
#    source install/setup.bash

# 7. Run the nodes:
#    ros2 run my_robot_pkg minimal_publisher
#    ros2 run my_robot_pkg minimal_subscriber
```

## Key Takeaways
- ROS 2 simplifies complex robotic software development.
- Nodes are modular computational units.
- Topics, services, and actions facilitate inter-node communication.
- DDS provides the robust communication middleware for ROS 2.
- The ROS 2 CLI allows interaction with the system.

## Exercises
1.  **Easy**: List three core components of ROS 2 and briefly describe their function.
2.  **Easy**: What is the primary advantage of using DDS for communication in ROS 2?
3.  **Medium**: Explain the difference between ROS 2 topics and services. When would you use one over the other?
4.  **Medium**: Research and describe the concept of Quality of Service (QoS) policies in ROS 2. Give an example of how a specific QoS policy might be used.
5.  **Hard**: Outline the steps to create a ROS 2 package containing a node that publishes the current time to a topic and another node that subscribes to it and prints the time. Specify the files you would create and their essential content (conceptually).

---
_Bridge to next chapter: With an understanding of ROS 2's core concepts, we will now dive into practical programming with ROS 2, focusing on the Python client library, `rclpy`, for creating nodes, publishers, and subscribers._
