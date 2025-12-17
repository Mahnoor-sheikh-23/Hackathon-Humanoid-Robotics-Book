import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import './blog.css';

function BlogHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <motion.header className={clsx('hero hero--primary', 'blog-hero')}>
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
            Robotics Insights
          </motion.h1>
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Latest news, tutorials, and insights in humanoid robotics and AI
          </motion.p>
        </motion.div>
      </div>
    </motion.header>
  );
}

function BlogCard({ title, excerpt, date, author, category, delay }) {
  return (
    <motion.article
      className="blog-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
    >
      <div className="blog-card-content">
        <div className="blog-meta">
          <span className="blog-date">{date}</span>
          <span className="blog-category">{category}</span>
        </div>
        <h2 className="blog-title">{title}</h2>
        <p className="blog-excerpt">{excerpt}</p>
        <div className="blog-author">
          <span className="author-name">{author}</span>
        </div>
        <button className="read-more-button">
          Read More →
        </button>
      </div>
    </motion.article>
  );
}

function BlogSection() {
  const blogPosts = [
    {
      title: "The Future of Humanoid Robotics",
      excerpt: "Exploring the latest advancements in humanoid robotics and what the future holds for this exciting field.",
      date: "December 15, 2025",
      author: "Dr. Sarah Johnson",
      category: "Technology"
    },
    {
      title: "AI Integration in Modern Robotics",
      excerpt: "How artificial intelligence is revolutionizing the way we design and control robotic systems.",
      date: "December 10, 2025",
      author: "Alex Chen",
      category: "AI"
    },
    {
      title: "ROS 2 Best Practices",
      excerpt: "Essential tips and best practices for developing robust robotic applications with ROS 2.",
      date: "December 5, 2025",
      author: "Michael Rodriguez",
      category: "Development"
    },
    {
      title: "Simulation vs. Real-World Robotics",
      excerpt: "Understanding the challenges and benefits of bridging the reality gap in robotics.",
      date: "November 28, 2025",
      author: "Dr. Emily Wang",
      category: "Research"
    },
    {
      title: "NVIDIA Isaac for Robotics",
      excerpt: "A comprehensive guide to leveraging NVIDIA Isaac for advanced robotics applications.",
      date: "November 20, 2025",
      author: "James Thompson",
      category: "Hardware"
    },
    {
      title: "Ethical Considerations in Robotics",
      excerpt: "Examining the ethical implications of humanoid robots in society and daily life.",
      date: "November 15, 2025",
      author: "Prof. Lisa Anderson",
      category: "Ethics"
    }
  ];

  return (
    <section className="blog-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">Latest Articles</h2>
          <p className="section-subtitle">Stay updated with the latest in robotics and AI</p>
        </motion.div>

        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              author={post.author}
              category={post.category}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="blog-pagination"
        >
          <button className="pagination-button active">1</button>
          <button className="pagination-button">2</button>
          <button className="pagination-button">3</button>
          <button className="pagination-button">Next →</button>
        </motion.div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="newsletter-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="newsletter-content"
        >
          <h3 className="newsletter-title">Stay Updated</h3>
          <p className="newsletter-subtitle">Subscribe to our newsletter for the latest robotics insights</p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="newsletter-input"
            />
            <button className="newsletter-button">Subscribe</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Blog() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Blog - ${siteConfig.title}`}
      description="Latest news, tutorials, and insights in humanoid robotics and AI">
      <BlogHeader />
      <main>
        <BlogSection />
        <NewsletterSection />
      </main>
    </Layout>
  );
}