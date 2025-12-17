import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import './about.css';
import Link from '@docusaurus/Link';

function AboutHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <motion.header className={clsx('hero hero--primary', 'about-hero')}>
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
            About This Book
          </motion.h1>
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A comprehensive guide to AI-driven humanoid robotics development
          </motion.p>
        </motion.div>
      </div>
    </motion.header>
  );
}

function AboutSection() {
  return (
    <section className="about-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="about-content"
        >
          <div className="about-text">
            <h2 className="about-title">The Complete Guide to Humanoid Robotics</h2>
            <p className="about-description">
              This comprehensive handbook covers everything you need to know about developing AI-driven humanoid robots.
              From the fundamentals of ROS 2 to advanced NVIDIA Isaac integration, we've created a complete learning
              path that takes you from beginner to expert.
            </p>

            <h3 className="about-subtitle">What Makes This Book Special</h3>
            <ul className="about-list">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <strong>Hands-on Projects:</strong> Every concept is reinforced with practical projects and real-world examples.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <strong>Modern Technologies:</strong> Learn with the latest tools and frameworks in robotics and AI.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <strong>Complete Learning Path:</strong> Structured modules that build upon each other for comprehensive understanding.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <strong>Expert Guidance:</strong> Written by professionals with years of experience in robotics and AI.
              </motion.li>
            </ul>

            <h3 className="about-subtitle">Who Should Read This Book</h3>
            <p className="about-description">
              Whether you're a student, researcher, engineer, or hobbyist, this book provides the knowledge and skills
              needed to excel in humanoid robotics. No prior experience with robotics is required, though familiarity
              with programming concepts will be helpful.
            </p>

            <div className="about-cta">
              <Link href="/docs/module1-ros2/ch3_ros2_core" className="button button--primary button--lg">
                Start Reading
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function About() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`About - ${siteConfig.title}`}
      description="Learn about the Humanoid Robotics Book and its comprehensive approach to AI-driven robotics development">
      <AboutHeader />
      <main>
        <AboutSection />
      </main>
    </Layout>
  );
}