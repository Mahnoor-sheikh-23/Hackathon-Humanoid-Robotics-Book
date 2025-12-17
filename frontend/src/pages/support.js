import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import './support.css';

function SupportHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <motion.header className={clsx('hero hero--primary', 'support-hero')}>
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
            Support Center
          </motion.h1>
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Get help with the Humanoid Robotics Book and find answers to common questions
          </motion.p>
        </motion.div>
      </div>
    </motion.header>
  );
}

function SupportCard({ icon, title, description, link, delay }) {
  return (
    <motion.div
      className="support-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
    >
      <div className="support-icon">
        {icon}
      </div>
      <h3 className="support-title">{title}</h3>
      <p className="support-description">{description}</p>
      <a href={link} className="support-link">
        Get Help →
      </a>
    </motion.div>
  );
}

function SupportOptions() {
  const supportOptions = [
    {
      icon: '❓',
      title: 'FAQ',
      description: 'Find answers to frequently asked questions about the book and robotics concepts.',
      link: '#'
    },
    {
      icon: '📚',
      title: 'Documentation',
      description: 'Access detailed documentation for all concepts covered in the book.',
      link: '/docs/'
    },
    {
      icon: '💬',
      title: 'Community Forum',
      description: 'Connect with other learners and get help from the community.',
      link: '#'
    },
    {
      icon: '🐛',
      title: 'Report Issue',
      description: 'Report bugs or issues you encounter while using the book.',
      link: '#'
    },
    {
      icon: '🎓',
      title: 'Tutorials',
      description: 'Step-by-step tutorials to help you master difficult concepts.',
      link: '/tutorials'
    },
    {
      icon: '📧',
      title: 'Contact Us',
      description: 'Reach out directly to our support team for personalized help.',
      link: '/contact'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="support-options-section"
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Support Options</h2>
          <p className="section-subtitle">Choose the support option that best fits your needs</p>
        </div>

        <div className="support-options-grid">
          {supportOptions.map((option, index) => (
            <SupportCard
              key={index}
              icon={option.icon}
              title={option.title}
              description={option.description}
              link={option.link}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function Troubleshooting() {
  const troubleshootingItems = [
    {
      question: 'How do I set up my development environment?',
      answer: 'Follow the setup guide in Chapter 1 to install ROS 2, Gazebo, and other required tools.'
    },
    {
      question: 'I\'m having trouble with the simulation examples',
      answer: 'Make sure you have the correct version of Gazebo installed and check the troubleshooting section in the Digital Twin module.'
    },
    {
      question: 'The AI integration examples are not working',
      answer: 'Verify that you have installed the correct NVIDIA Isaac dependencies and check the prerequisites section.'
    },
    {
      question: 'Where can I find the example code?',
      answer: 'All example code is available in the GitHub repository linked in the resources section.'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="troubleshooting-section"
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Quick Troubleshooting</h2>
          <p className="section-subtitle">Common issues and their solutions</p>
        </div>

        <div className="troubleshooting-list">
          {troubleshootingItems.map((item, index) => (
            <motion.div
              key={index}
              className="troubleshooting-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="troubleshooting-question">{item.question}</h3>
              <p className="troubleshooting-answer">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function SupportCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
      className="support-cta-section"
    >
      <div className="container">
        <div className="support-cta-content">
          <h2 className="support-cta-title">Still Need Help?</h2>
          <p className="support-cta-description">Our support team is ready to assist you with any questions or issues.</p>
          <div className="support-cta-buttons">
            <a href="/contact" className="button button--primary button--lg support-cta-button">
              Contact Support
            </a>
            <a href="#" className="button button--secondary button--lg support-cta-button">
              Join Community
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default function Support() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Support - ${siteConfig.title}`}
      description="Get help with the Humanoid Robotics Book and find answers to common questions">
      <SupportHeader />
      <main>
        <SupportOptions />
        <Troubleshooting />
        <SupportCTA />
      </main>
    </Layout>
  );
}