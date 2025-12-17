import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import './index.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <motion.header className={clsx('hero hero--primary', 'hero-banner')}>
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
            {siteConfig.title}
          </motion.h1>
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {siteConfig.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hero-buttons"
          >
            <Link
              className="button button--secondary button--lg hero-button"
              to="docs/introduction/ch1_foundations">
              Start Reading
            </Link>
            <Link
              className="button button--primary button--lg hero-button"
              to="/docs/module1-ros2/ch3_ros2_core">
              Explore Modules
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
}

function FeatureCard({ title, description, icon, delay }) {
  return (
    <motion.div
      className="feature-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
    >
      <div className="feature-icon">
        <span className="icon-text">{icon}</span>
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </motion.div>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: 'Complete Learning Path',
      description: 'From ROS 2 fundamentals to advanced NVIDIA Isaac integration, follow a structured learning journey.',
      icon: '📚',
    },
    {
      title: 'Hands-on Projects',
      description: 'Build real-world humanoid robotics projects with guided tutorials and practical examples.',
      icon: '🔧',
    },
    {
      title: 'AI Integration',
      description: 'Learn how to integrate AI models and machine learning into your robotics projects.',
      icon: '🤖',
    },
    {
      title: 'Digital Twin',
      description: 'Master Gazebo simulation and create accurate digital replicas of your robots.',
      icon: '🌐',
    },
    {
      title: 'VLA Integration',
      description: 'Explore Vision-Language-Action models for advanced robotic perception and control.',
      icon: '👁️',
    },
    {
      title: 'Capstone Project',
      description: 'Apply everything you\'ve learned in a comprehensive capstone project.',
      icon: '🎯',
    },
  ];

  return (
    <section className="features-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">What You'll Learn</h2>
          <p className="section-subtitle">A comprehensive journey through modern humanoid robotics</p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleCard({ title, description, link, delay }) {
  return (
    <motion.div
      className="module-card"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
    >
      <div className="module-content">
        <h3 className="module-title">{title}</h3>
        <p className="module-description">{description}</p>
        <Link className="module-link" to={link}>
          Explore Module →
        </Link>
      </div>
    </motion.div>
  );
}

function ModulesSection() {
  const modules = [
    {
      title: 'ROS 2 Fundamentals',
      description: 'Master the Robot Operating System 2, the foundation for modern robotics development.',
      link: '/docs/module1-ros2/ch3_ros2_core'
    },
    {
      title: 'Digital Twin & Simulation',
      description: 'Create accurate digital replicas using Gazebo and advanced simulation techniques.',
      link: '/docs/module2-digital-twin/ch7_gazebo_intro'
    },
    {
      title: 'NVIDIA Isaac Integration',
      description: 'Leverage NVIDIA Isaac for advanced robotics perception and control.',
      link: '/docs/module3-nvidia-isaac/ch10_isaac_sim'
    },
    {
      title: 'VLA Integration',
      description: 'Integrate Vision-Language-Action models for intelligent robotic behavior.',
      link: '/docs/module4-vla/ch15_whisper_llm'
    }
  ];

  return (
    <section className="modules-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">Learning Modules</h2>
          <p className="section-subtitle">Structured learning paths for comprehensive understanding</p>
        </motion.div>

        <div className="modules-grid">
          {modules.map((module, index) => (
            <ModuleCard
              key={index}
              title={module.title}
              description={module.description}
              link={module.link}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, author, role }) {
  return (
    <motion.div
      className="testimonial-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
    >
      <div className="testimonial-content">
        <p className="testimonial-quote">"{quote}"</p>
        <div className="testimonial-author">
          <h4 className="testimonial-name">{author}</h4>
          <p className="testimonial-role">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "This comprehensive guide transformed my understanding of humanoid robotics. The practical approach and real-world examples make complex concepts accessible.",
      author: "Alex Johnson",
      role: "Senior Robotics Engineer"
    },
    {
      quote: "The integration of AI and robotics concepts is brilliantly explained. This book bridges the gap between theory and practice perfectly.",
      author: "Sarah Chen",
      role: "AI Researcher"
    },
    {
      quote: "As a beginner in robotics, this book provided the perfect learning path. The step-by-step tutorials and projects built my confidence.",
      author: "Michael Rodriguez",
      role: "Robotics Student"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">What Readers Say</h2>
          <p className="section-subtitle">Join thousands of satisfied learners</p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="cta-title">Ready to Start Your Robotics Journey?</h2>
          <p className="cta-description">Join thousands of learners who have transformed their robotics skills with our comprehensive guide.</p>
          <div className="cta-buttons">
            <Link className="button button--primary button--lg cta-button" to="/docs/module1-ros2/ch3_ros2_core">
              Begin Learning
            </Link>
            <Link className="button button--secondary button--lg cta-button" to="/docs/module2-digital-twin/ch7_gazebo_intro">
              Explore Modules
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="A complete handbook for AI, robotics, and physical agents">
      <HomepageHeader />
      <main>
        <FeaturesSection />
        <ModulesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </Layout>
  );
}