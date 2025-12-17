import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import './tutorials.css';

function TutorialsHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <motion.header className={clsx('hero hero--primary', 'tutorials-hero')}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-inner"
        >
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tutorials & Guides
          </motion.h1>
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Step-by-step tutorials to help you master humanoid robotics
          </motion.p>
        </motion.div>
      </div>
    </motion.header>
  );
}

function TutorialCard({ title, description, level, duration, link, icon, delay }) {
  return (
    <motion.div
      className="tutorial-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
    >
      <div className="tutorial-icon">
        {icon}
      </div>
      <div className="tutorial-content">
        <div className="tutorial-meta">
          <span className="tutorial-level">{level}</span>
          <span className="tutorial-duration">{duration}</span>
        </div>
        <h3 className="tutorial-title">{title}</h3>
        <p className="tutorial-description">{description}</p>
        <a href={link} className="tutorial-link">
          Start Tutorial →
        </a>
      </div>
    </motion.div>
  );
}

function TutorialsGrid() {
  const tutorials = [
    {
      title: "Getting Started with ROS 2",
      description: "Learn the basics of ROS 2, the Robot Operating System, and set up your development environment.",
      level: "Beginner",
      duration: "30 min",
      link: "/docs/module1-ros2/ch3_ros2_core",
      icon: "🤖"
    },
    {
      title: "Creating Your First Robot Model",
      description: "Build a simple robot model using URDF and visualize it in RViz.",
      level: "Beginner",
      duration: "45 min",
      link: "/docs/module1-ros2/ch3_ros2_core",
      icon: "🏗️"
    },
    {
      title: "Navigation with Move Base",
      description: "Implement autonomous navigation for your robot using the Move Base package.",
      level: "Intermediate",
      duration: "1 hour",
      link: "/docs/module1-ros2/ch3_ros2_core",
      icon: "🧭"
    },
    {
      title: "Simulating Robots in Gazebo",
      description: "Create realistic simulations of your robots using the Gazebo physics engine.",
      level: "Intermediate",
      duration: "1.5 hours",
      link: "/docs/module2-digital-twin/ch7_gazebo_intro",
      icon: "🎬"
    },
    {
      title: "Computer Vision for Robotics",
      description: "Integrate computer vision algorithms to enable object detection and tracking.",
      level: "Advanced",
      duration: "2 hours",
      link: "/docs/module3-nvidia-isaac/ch10_isaac_sim",
      icon: "👁️"
    },
    {
      title: "AI Integration with NVIDIA Isaac",
      description: "Leverage NVIDIA Isaac for advanced AI capabilities in your robotic systems.",
      level: "Advanced",
      duration: "2.5 hours",
      link: "/docs/module3-nvidia-isaac/ch10_isaac_sim",
      icon: "🧠"
    },
    {
      title: "Vision-Language-Action Models",
      description: "Implement VLA models for complex robotic tasks requiring perception and reasoning.",
      level: "Expert",
      duration: "3 hours",
      link: "/docs/module4-vla/ch15_whisper_llm",
      icon: "🎯"
    },
    {
      title: "Building a Complete Robot System",
      description: "Integrate all components into a working humanoid robot system.",
      level: "Expert",
      duration: "Full day",
      link: "/docs/capstone/ch18_integration",
      icon: "🏆"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="tutorials-grid-section"
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Tutorials</h2>
          <p className="section-subtitle">Learn robotics through hands-on projects</p>
        </div>

        <div className="tutorials-grid">
          {tutorials.map((tutorial, index) => (
            <TutorialCard
              key={index}
              title={tutorial.title}
              description={tutorial.description}
              level={tutorial.level}
              duration={tutorial.duration}
              link={tutorial.link}
              icon={tutorial.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function TutorialCategories() {
  const categories = [
    {
      title: "ROS 2 Fundamentals",
      description: "Master the basics of the Robot Operating System 2",
      count: 12,
      color: "var(--accent-blue)"
    },
    {
      title: "Simulation & Gazebo",
      description: "Learn to create realistic robotic simulations",
      count: 8,
      color: "#4ade80"
    },
    {
      title: "Computer Vision",
      description: "Integrate vision systems into your robots",
      count: 10,
      color: "#60a5fa"
    },
    {
      title: "AI & Machine Learning",
      description: "Add intelligence to your robotic systems",
      count: 15,
      color: "#a78bfa"
    },
    {
      title: "Hardware Integration",
      description: "Connect and control physical robotic systems",
      count: 6,
      color: "#f87171"
    },
    {
      title: "Advanced Projects",
      description: "Complex projects combining multiple technologies",
      count: 5,
      color: "#fbbf24"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="tutorial-categories-section"
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Tutorial Categories</h2>
          <p className="section-subtitle">Browse tutorials by topic</p>
        </div>

        <div className="tutorial-categories-grid">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="tutorial-category"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
            >
              <div
                className="category-header"
                style={{ borderBottomColor: category.color }}
              >
                <h3 className="category-title">{category.title}</h3>
                <span className="category-count">{category.count} tutorials</span>
              </div>
              <p className="category-description">{category.description}</p>
              <button className="category-button">
                Browse →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default function Tutorials() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Tutorials - ${siteConfig.title}`}
      description="Step-by-step tutorials to help you master humanoid robotics">
      <TutorialsHeader />
      <main>
        <TutorialsGrid />
        <TutorialCategories />
      </main>
    </Layout>
  );
}