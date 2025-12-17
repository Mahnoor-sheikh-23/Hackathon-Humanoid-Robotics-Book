import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import './contact.css';

function ContactHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <motion.header className={clsx('hero hero--primary', 'contact-hero')}>
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
            Get in Touch
          </motion.h1>
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Have questions about the book or need assistance? We're here to help.
          </motion.p>
        </motion.div>
      </div>
    </motion.header>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, you would send the form data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="contact-form-container"
    >
      <h2 className="contact-form-title">Send us a message</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-textarea"
            rows="6"
            required
          />
        </div>
        <button type="submit" className="form-button">
          Send Message
        </button>
      </form>
    </motion.div>
  );
}

function ContactInfo() {
  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      content: 'contact@robotics-book.com',
      description: 'Send us an email and we\'ll respond as soon as possible.'
    },
    {
      icon: '🏢',
      title: 'Office',
      content: 'San Francisco, CA',
      description: 'Visit us at our office headquarters.'
    },
    {
      icon: '💬',
      title: 'Community',
      content: 'Join our Discord',
      description: 'Connect with other robotics enthusiasts and get help.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="contact-info-container"
    >
      <h2 className="contact-info-title">Contact Information</h2>
      <div className="contact-info-grid">
        {contactInfo.map((info, index) => (
          <motion.div
            key={index}
            className="contact-info-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="contact-info-icon">{info.icon}</div>
            <h3 className="contact-info-subtitle">{info.title}</h3>
            <p className="contact-info-content">{info.content}</p>
            <p className="contact-info-description">{info.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Contact - ${siteConfig.title}`}
      description="Get in touch with the Humanoid Robotics Book team">
      <ContactHeader />
      <main className="contact-main">
        <div className="container">
          <div className="contact-content">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </main>
    </Layout>
  );
}