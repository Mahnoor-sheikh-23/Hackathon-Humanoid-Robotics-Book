import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import './privacy-policy.css';

function PrivacyPolicyHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <motion.header className={clsx('hero hero--primary', 'privacy-hero')}>
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
            Privacy Policy
          </motion.h1>
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </motion.p>
        </motion.div>
      </div>
    </motion.header>
  );
}

function PrivacyPolicyContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="privacy-content"
    >
      <div className="privacy-section">
        <h2 className="privacy-section-title">1. Information We Collect</h2>
        <div className="privacy-section-content">
          <h3 className="privacy-subtitle">Personal Information</h3>
          <p className="privacy-text">
            We may collect personal information when you register for our services, subscribe to our newsletter,
            or interact with our platform. This may include your name, email address, and other contact information.
          </p>

          <h3 className="privacy-subtitle">Technical Information</h3>
          <p className="privacy-text">
            We automatically collect certain technical information about your device and usage patterns,
            including IP address, browser type, operating system, and pages visited on our site.
          </p>

          <h3 className="privacy-subtitle">Usage Data</h3>
          <p className="privacy-text">
            We collect information about how you use our services, including which features you access,
            how often you visit, and what content you interact with.
          </p>
        </div>
      </div>

      <div className="privacy-section">
        <h2 className="privacy-section-title">2. How We Use Your Information</h2>
        <div className="privacy-section-content">
          <h3 className="privacy-subtitle">Service Provision</h3>
          <p className="privacy-text">
            We use your information to provide and maintain our services, including personalized content
            and features tailored to your needs.
          </p>

          <h3 className="privacy-subtitle">Communication</h3>
          <p className="privacy-text">
            We may use your contact information to send you updates about our services, respond to your
            inquiries, and provide customer support.
          </p>

          <h3 className="privacy-subtitle">Improvement</h3>
          <p className="privacy-text">
            We analyze usage data to improve our services, fix bugs, and enhance the user experience.
          </p>
        </div>
      </div>

      <div className="privacy-section">
        <h2 className="privacy-section-title">3. Information Sharing and Disclosure</h2>
        <div className="privacy-section-content">
          <h3 className="privacy-subtitle">With Your Consent</h3>
          <p className="privacy-text">
            We may share your information with third parties when you have given us explicit consent to do so.
          </p>

          <h3 className="privacy-subtitle">Service Providers</h3>
          <p className="privacy-text">
            We may share your information with trusted third-party service providers who assist us in
            operating our services, conducting business, or serving our users.
          </p>

          <h3 className="privacy-subtitle">Legal Requirements</h3>
          <p className="privacy-text">
            We may disclose your information if required to do so by law or in response to valid requests
            by public authorities.
          </p>
        </div>
      </div>

      <div className="privacy-section">
        <h2 className="privacy-section-title">4. Data Security</h2>
        <div className="privacy-section-content">
          <p className="privacy-text">
            We implement appropriate security measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
            over the internet or method of electronic storage is 100% secure.
          </p>
        </div>
      </div>

      <div className="privacy-section">
        <h2 className="privacy-section-title">5. Data Retention</h2>
        <div className="privacy-section-content">
          <p className="privacy-text">
            We retain your personal information for as long as necessary to provide our services and
            comply with our legal obligations. The retention period may vary depending on the type of
            information and the purpose for which it was collected.
          </p>
        </div>
      </div>

      <div className="privacy-section">
        <h2 className="privacy-section-title">6. Your Rights</h2>
        <div className="privacy-section-content">
          <h3 className="privacy-subtitle">Access and Correction</h3>
          <p className="privacy-text">
            You have the right to access and correct your personal information. You can update your
            information through your account settings or by contacting us directly.
          </p>

          <h3 className="privacy-subtitle">Data Deletion</h3>
          <p className="privacy-text">
            You have the right to request deletion of your personal information. Please note that
            deleting your information may affect your ability to use our services.
          </p>

          <h3 className="privacy-subtitle">Opt-out</h3>
          <p className="privacy-text">
            You may opt out of receiving promotional communications from us by following the opt-out
            instructions provided in those communications.
          </p>
        </div>
      </div>

      <div className="privacy-section">
        <h2 className="privacy-section-title">7. Third-Party Services</h2>
        <div className="privacy-section-content">
          <p className="privacy-text">
            Our services may include third-party features or content. These third parties have their
            own privacy policies, and we are not responsible for their practices. We encourage you to
            review the privacy policies of any third-party services you use.
          </p>
        </div>
      </div>

      <div className="privacy-section">
        <h2 className="privacy-section-title">8. Children's Privacy</h2>
        <div className="privacy-section-content">
          <p className="privacy-text">
            Our services do not address anyone under the age of 13. We do not knowingly collect
            personal information from children under 13. If you are a parent or guardian and believe
            your child has provided us with personal information, please contact us.
          </p>
        </div>
      </div>

      <div className="privacy-section">
        <h2 className="privacy-section-title">9. Changes to This Policy</h2>
        <div className="privacy-section-content">
          <p className="privacy-text">
            We may update our Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page and updating the "Last Updated" date. You are
            advised to review this Privacy Policy periodically for any changes.
          </p>
        </div>
      </div>

      <div className="privacy-section">
        <h2 className="privacy-section-title">10. Contact Us</h2>
        <div className="privacy-section-content">
          <p className="privacy-text">
            If you have questions about this Privacy Policy, please contact us at:
            privacy@robotics-book.com
          </p>
          <p className="privacy-text">
            Last Updated: December 16, 2025
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PrivacyPolicy() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Privacy Policy - ${siteConfig.title}`}
      description="Learn how we collect, use, and protect your personal information">
      <PrivacyPolicyHeader />
      <main className="privacy-main">
        <div className="container">
          <PrivacyPolicyContent />
        </div>
      </main>
    </Layout>
  );
}