import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import './research-papers.css';

function ResearchPapersHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <motion.header className={clsx('hero hero--primary', 'research-hero')}>
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
            Research Papers
          </motion.h1>
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore cutting-edge research in humanoid robotics and AI
          </motion.p>
        </motion.div>
      </div>
    </motion.header>
  );
}

function ResearchPaperCard({ title, authors, journal, year, abstract, link, tags, delay }) {
  return (
    <motion.div
      className="research-paper-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
    >
      <div className="research-paper-content">
        <div className="research-paper-meta">
          <div className="research-paper-tags">
            {tags.map((tag, index) => (
              <span key={index} className="research-tag">{tag}</span>
            ))}
          </div>
          <div className="research-paper-year">{year}</div>
        </div>
        <h3 className="research-paper-title">{title}</h3>
        <p className="research-paper-authors">{authors}</p>
        <p className="research-paper-journal">{journal}</p>
        <p className="research-paper-abstract">{abstract}</p>
        <div className="research-paper-actions">
          <a href={link} className="research-paper-link">
            Read Paper →
          </a>
          <a href="#" className="research-paper-cite">
            Cite
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function ResearchPapersGrid() {
  const researchPapers = [
    {
      title: "Advancements in Humanoid Robot Locomotion: A Comprehensive Survey",
      authors: "Dr. Sarah Johnson, Prof. Michael Chen",
      journal: "Journal of Robotics and Autonomous Systems",
      year: "2025",
      abstract: "This paper provides a comprehensive overview of recent advancements in humanoid robot locomotion, including dynamic walking, balance control, and terrain adaptation techniques.",
      link: "#",
      tags: ["Locomotion", "Balance", "Control"]
    },
    {
      title: "Deep Learning Approaches for Real-time Humanoid Robot Perception",
      authors: "Dr. Alex Rodriguez, Dr. Emily Wang",
      journal: "IEEE Transactions on Robotics",
      year: "2024",
      abstract: "A comparative study of deep learning architectures for real-time perception in humanoid robots, focusing on object detection, scene understanding, and multi-modal sensing.",
      link: "#",
      tags: ["Perception", "Deep Learning", "Vision"]
    },
    {
      title: "Bio-inspired Control Strategies for Humanoid Robot Manipulation",
      authors: "Prof. James Thompson, Dr. Lisa Anderson",
      journal: "Nature Robotics",
      year: "2024",
      abstract: "This research explores bio-inspired control strategies for dexterous manipulation in humanoid robots, drawing inspiration from human motor control and neuroscience.",
      link: "#",
      tags: ["Manipulation", "Bio-inspired", "Control"]
    },
    {
      title: "Social Interaction Framework for Humanoid Robots in Domestic Environments",
      authors: "Dr. Robert Kim, Dr. Maria Garcia",
      journal: "International Journal of Social Robotics",
      year: "2025",
      abstract: "A novel framework for enabling natural social interactions between humanoid robots and humans in domestic settings, including emotional recognition and response generation.",
      link: "#",
      tags: ["Social Robotics", "Interaction", "AI"]
    },
    {
      title: "Energy-Efficient Design Principles for Humanoid Robot Systems",
      authors: "Dr. Christopher Lee, Prof. Anna Patel",
      journal: "Robotics and Computer-Integrated Manufacturing",
      year: "2024",
      abstract: "This paper presents energy-efficient design principles for humanoid robot systems, focusing on actuator optimization, power management, and sustainable operation.",
      link: "#",
      tags: ["Energy", "Efficiency", "Design"]
    },
    {
      title: "Adaptive Learning for Humanoid Robot Skill Acquisition",
      authors: "Dr. David Park, Dr. Rachel Zhang",
      journal: "Journal of Machine Learning Research",
      year: "2025",
      abstract: "A novel approach to adaptive skill acquisition in humanoid robots using reinforcement learning and transfer learning techniques for complex task execution.",
      link: "#",
      tags: ["Learning", "Adaptation", "AI"]
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="research-papers-section"
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Research Papers</h2>
          <p className="section-subtitle">Cutting-edge research in humanoid robotics and AI</p>
        </div>

        <div className="research-papers-grid">
          {researchPapers.map((paper, index) => (
            <ResearchPaperCard
              key={index}
              title={paper.title}
              authors={paper.authors}
              journal={paper.journal}
              year={paper.year}
              abstract={paper.abstract}
              link={paper.link}
              tags={paper.tags}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ResearchCategories() {
  const categories = [
    {
      title: "Locomotion & Control",
      count: 45,
      description: "Research on walking, balance, and movement control"
    },
    {
      title: "Perception & Vision",
      count: 38,
      description: "Studies on robot perception and computer vision"
    },
    {
      title: "Manipulation & Grasping",
      count: 32,
      description: "Research on robotic manipulation and dexterity"
    },
    {
      title: "Social Robotics",
      count: 28,
      description: "Studies on human-robot interaction and social behavior"
    },
    {
      title: "Learning & Adaptation",
      count: 41,
      description: "Research on machine learning and adaptive systems"
    },
    {
      title: "Hardware & Design",
      count: 25,
      description: "Studies on robot design and mechanical systems"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="research-categories-section"
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Research Categories</h2>
          <p className="section-subtitle">Browse research by category</p>
        </div>

        <div className="research-categories-grid">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="research-category"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
            >
              <div className="category-header">
                <h3 className="category-title">{category.title}</h3>
                <span className="category-count">{category.count} papers</span>
              </div>
              <p className="category-description">{category.description}</p>
              <button className="category-button">
                Explore →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ResearchCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
      className="research-cta-section"
    >
      <div className="container">
        <div className="research-cta-content">
          <h2 className="research-cta-title">Stay Updated with Research</h2>
          <p className="research-cta-description">Subscribe to our research newsletter to receive the latest papers and findings in humanoid robotics.</p>
          <div className="research-cta-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="research-cta-input"
            />
            <button className="research-cta-button">Subscribe</button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default function ResearchPapers() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Research Papers - ${siteConfig.title}`}
      description="Explore cutting-edge research in humanoid robotics and AI">
      <ResearchPapersHeader />
      <main>
        <ResearchPapersGrid />
        <ResearchCategories />
        <ResearchCTA />
      </main>
    </Layout>
  );
}