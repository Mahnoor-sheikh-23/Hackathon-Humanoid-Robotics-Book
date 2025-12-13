/**
 * Creating a sidebar enables you to:
 * - Create an ordered group of docs
 * - Render a sidebar from the docs folder structure
 * - Create links to other docs in Docusaurus
 */

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Humanoid Robotics',
      link: {
        type: 'doc',
        id: 'index', // Links to the docs/index.md we just created
      },
      items: [
        {
          type: 'category',
          label: 'Foundations',
          items: [
            'introduction/ch1_foundations', // References docs/introduction/ch1_foundations.md
            'introduction/ch2_robot_anatomy', // References docs/introduction/ch2_robot_anatomy.md
          ],
        },
        {
          type: 'category',
          label: 'Modules',
          items: [
            {
              type: 'category',
              label: 'Module 1 - ROS 2',
              items: [
                'module1-ros2/ch3_ros2_core',
                'module1-ros2/ch4_rclpy',
                'module1-ros2/ch5_urdf',
                'module1-ros2/ch6_launch_files',
              ],
            },
            {
              type: 'category',
              label: 'Module 2 - Digital Twin',
              items: [
                'module2-digital-twin/ch7_gazebo_intro',
                'module2-digital-twin/ch8_sensors_sim',
                'module2-digital-twin/ch9_interactive_envs',
              ],
            },
            {
              type: 'category',
              label: 'Module 3 - NVIDIA Isaac',
              items: [
                'module3-nvidia-isaac/ch10_isaac_sim',
                'module3-nvidia-isaac/ch11_isaac_ros_vslam',
                'module3-nvidia-isaac/ch12_nav2',
                'module3-nvidia-isaac/ch13_rl_isaac_gym',
                'module3-nvidia-isaac/ch14_sim_to_real',
              ],
            },
            {
              type: 'category',
              label: 'Module 4 - Vision-Language-Action Integration',
              items: [
                'module4-vla/ch15_whisper_llm',
                'module4-vla/ch16_llm_planning',
                'module4-vla/ch17_multimodal',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Capstone Project',
          items: [
            'capstone/ch18_integration',
            'capstone/ch19_capstone_project',
          ],
        },
        {
          type: 'category',
          label: 'Appendices',
          items: [
            'appendices/appA_hardware',
            'appendices/appB_jetson_setup',
            'appendices/appC_realsense_setup',
            'appendices/appD_linux_ros2_install',
            'appendices/appE_glossary',
            'appendices/appF_ros2_cheatsheet',
            'appendices/appG_python_cheatsheet',
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
