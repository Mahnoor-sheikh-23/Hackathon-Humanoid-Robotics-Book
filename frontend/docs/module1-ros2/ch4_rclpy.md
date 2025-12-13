---
sidebar_position: 2
---

# Chapter 4: Programming with RCLCPP and RCLPY

## Learning Objectives
- Understand the fundamental concepts of `rclpy` (Python client library for ROS 2).
- Learn to create ROS 2 nodes in Python.
- Implement publishers and subscribers for topic-based communication.
- Develop service clients and servers for request-reply interactions.
- Understand the basics of ROS 2 client libraries for C++ (`rclcpp`) and Python (`rclpy`).

## Introduction
In the previous chapter, we covered the core concepts of ROS 2. Now, we'll dive into practical programming, focusing on `rclpy`, the Python client library for ROS 2. `rclpy` simplifies the development of ROS 2 applications by providing a Pythonic interface to ROS 2 functionalities, allowing developers to quickly create nodes, manage communication, and interact with the ROS 2 ecosystem. While `rclcpp` (C++ client library) is often used for performance-critical components, `rclpy` is excellent for rapid prototyping and many application-level tasks.

## Core Concepts
### 1. The `rclpy` Library
`rclpy` is the official Python client library for ROS 2. It provides APIs to create and manage ROS 2 entities such as nodes, publishers, subscribers, services, clients, and parameters. It handles the underlying DDS communication complexities, allowing you to focus on your robot's logic.

### 2. Creating a ROS 2 Node
A node is a fundamental unit of computation in ROS 2. In `rclpy`, you create a node by instantiating the `Node` class and defining its behavior, typically within its constructor and callback functions.

### 3. Publishers and Subscribers
- **Publishers**: Nodes that send messages to a topic. You create a publisher using `self.create_publisher(MsgType, 'topic_name', qos_profile)`.
- **Subscribers**: Nodes that receive messages from a topic. You create a subscriber using `self.create_subscription(MsgType, 'topic_name', callback_function, qos_profile)`.

### 4. Service Clients and Servers
- **Service Servers**: Nodes that provide a service. They wait for requests and send back responses. You create a service using `self.create_service(ServiceType, 'service_name', callback_function)`.
- **Service Clients**: Nodes that request a service from a service server. You create a client using `self.create_client(ServiceType, 'service_name')`.

## Hands-on Tutorial: Python Publisher and Subscriber

Let's create a simple Python publisher and subscriber using `rclpy`.

**File**: `my_robot_pkg/my_robot_pkg/simple_publisher.py`
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class SimplePublisher(Node):
    def __init__(self):
        super().__init__('simple_publisher')
        self.publisher_ = self.create_publisher(String, 'chat_topic', 10)
        timer_period = 1.0  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello ROS 2 from Python: {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    simple_publisher = SimplePublisher()
    rclpy.spin(simple_publisher)
    simple_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

**File**: `my_robot_pkg/my_robot_pkg/simple_subscriber.py`
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class SimpleSubscriber(Node):
    def __init__(self):
        super().__init__('simple_subscriber')
        self.subscription = self.create_subscription(
            String,
            'chat_topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')

def main(args=None):
    rclpy.init(args=args)
    simple_subscriber = SimpleSubscriber()
    rclpy.spin(simple_subscriber)
    simple_subscriber.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

_Note: You would need to update `setup.py` in `my_robot_pkg` to include entry points for these scripts and build your workspace to run them._

## Key Takeaways
- `rclpy` is the Python client library for ROS 2.
- Nodes are the fundamental units of computation.
- Publishers send messages, subscribers receive messages on topics.
- Service clients make requests, service servers provide responses.
- `rclpy` simplifies ROS 2 application development in Python.

## Exercises
1.  **Easy**: What is the purpose of `rclpy.init()` and `rclpy.shutdown()`?
2.  **Easy**: How do you specify the topic name and message type when creating a publisher or subscriber?
3.  **Medium**: Modify the `SimplePublisher` to publish a different type of message (e.g., `Int32` from `std_msgs.msg`). What changes would you need to make in both the publisher and subscriber?
4.  **Medium**: Research and implement a simple ROS 2 service using `rclpy` that takes two integers as input and returns their sum.
5.  **Hard**: Explore the concept of ROS 2 actions. Outline a scenario where an action client and server would be beneficial, and describe conceptually how you would implement it in `rclpy`.

---
_Bridge to next chapter: Understanding ROS 2 communication is essential. Next, we will learn how to formally describe our robot's physical structure and sensors using the Unified Robot Description Format (URDF), a key component for simulation and control._
