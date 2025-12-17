import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import './terms-of-service.css';

function TermsOfServiceHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <motion.header className={clsx('hero hero--primary', 'terms-hero')}>
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
            Terms of Service
          </motion.h1>
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Please read these terms carefully before using our services and content.
          </motion.p>
        </motion.div>
      </div>
    </motion.header>
  );
}

function TermsOfServiceContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="terms-content"
    >
      <div className="terms-section">
        <h2 className="terms-section-title">1. Acceptance of Terms</h2>
        <div className="terms-section-content">
          <p className="terms-text">
            By accessing and using the Humanoid Robotics Book website, documentation, and related services,
            you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            If you do not agree to these terms, you must not access or use our services.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <h2 className="terms-section-title">2. Description of Service</h2>
        <div className="terms-section-content">
          <p className="terms-text">
            The Humanoid Robotics Book provides educational content, tutorials, and resources related to
            humanoid robotics, artificial intelligence, and robotics development. Our services include
            documentation, code examples, tutorials, and interactive learning materials.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <h2 className="terms-section-title">3. Intellectual Property</h2>
        <div className="terms-section-content">
          <h3 className="terms-subtitle">Content Ownership</h3>
          <p className="terms-text">
            All content, including text, graphics, logos, icons, images, audio clips, digital downloads,
            and software, is the property of the Humanoid Robotics Book or its licensors and is protected
            by international copyright laws.
          </p>

          <h3 className="terms-subtitle">Educational Use</h3>
          <p className="terms-text">
            You may use the educational content for personal learning, research, and educational purposes.
            You may not reproduce, distribute, or commercialize the content without explicit written permission.
          </p>

          <h3 className="terms-subtitle">Code Examples</h3>
          <p className="terms-text">
            Code examples provided in the book and website may be used for educational purposes and in
            your own projects, but attribution to the Humanoid Robotics Book is required. Commercial
            use of code examples may require additional licensing.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <h2 className="terms-section-title">4. User Conduct</h2>
        <div className="terms-section-content">
          <h3 className="terms-subtitle">Acceptable Use</h3>
          <p className="terms-text">
            You agree to use our services in a manner consistent with applicable laws and regulations.
            You will not use our services for any unlawful purpose or in any way that could damage,
            disable, or impair our services.
          </p>

          <h3 className="terms-subtitle">Prohibited Activities</h3>
          <p className="terms-text">
            You may not: (a) attempt to gain unauthorized access to our services or related systems;
            (b) use our services to transmit any form of malware or harmful code; (c) use our services
            in a way that could compromise the security or integrity of our systems; (d) engage in any
            activity that could interfere with or disrupt our services.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <h2 className="terms-section-title">5. Limitation of Liability</h2>
        <div className="terms-section-content">
          <p className="terms-text">
            The Humanoid Robotics Book and its contributors make no representations or warranties of
            any kind, express or implied, about the completeness, accuracy, reliability, or availability
            of the information, products, services, or related graphics contained in our materials.
          </p>

          <p className="terms-text">
            In no event shall the Humanoid Robotics Book or its contributors be liable for any claim,
            damages, or other liability, whether in an action of contract, tort, or otherwise, arising
            from, out of, or in connection with our services or the use of our materials.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <h2 className="terms-section-title">6. Educational Disclaimer</h2>
        <div className="terms-section-content">
          <p className="terms-text">
            The content provided in the Humanoid Robotics Book is for educational purposes only.
            While we strive to provide accurate and up-to-date information, robotics and AI technologies
            are rapidly evolving, and some information may become outdated.
          </p>

          <p className="terms-text">
            The examples and tutorials provided are designed for learning and may not be suitable for
            production use without modification and additional safety considerations. Users are responsible
            for ensuring that any implementation meets safety and regulatory requirements.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <h2 className="terms-section-title">7. External Links</h2>
        <div className="terms-section-content">
          <p className="terms-text">
            Our website may contain links to external websites or resources that are not owned or
            controlled by the Humanoid Robotics Book. We have no control over and assume no responsibility
            for the content, privacy policies, or practices of any third-party sites or services.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <h2 className="terms-section-title">8. Modifications to Service</h2>
        <div className="terms-section-content">
          <p className="terms-text">
            We reserve the right to modify or discontinue, temporarily or permanently, any part of our
            services with or without notice. We shall not be liable to you or any third party for any
            modification, suspension, or discontinuation of our services.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <h2 className="terms-section-title">9. Termination</h2>
        <div className="terms-section-content">
          <p className="terms-text">
            We may terminate or suspend your access to our services immediately, without prior notice
            or liability, for any reason whatsoever, including without limitation if you breach these
            Terms of Service.
          </p>

          <p className="terms-text">
            Upon termination, your right to use our services will cease immediately. All provisions of
            these terms that by their nature should survive termination shall survive termination,
            including ownership provisions, warranty disclaimers, and limitation of liability.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <h2 className="terms-section-title">10. Governing Law</h2>
        <div className="terms-section-content">
          <p className="terms-text">
            These Terms of Service shall be governed by and construed in accordance with the laws of
            your jurisdiction, without regard to its conflict of law provisions. Any disputes arising
            under or in connection with these terms shall be subject to the exclusive jurisdiction
            of the courts in your jurisdiction.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <h2 className="terms-section-title">11. Changes to Terms</h2>
        <div className="terms-section-content">
          <p className="terms-text">
            We reserve the right to modify these Terms of Service at any time. Changes will be effective
            immediately upon posting to our website. Your continued use of our services after any
            changes constitutes acceptance of the revised terms.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <h2 className="terms-section-title">12. Contact Information</h2>
        <div className="terms-section-content">
          <p className="terms-text">
            If you have any questions about these Terms of Service, please contact us at:
            legal@robotics-book.com
          </p>
          <p className="terms-text">
            Last Updated: December 16, 2025
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TermsOfService() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Terms of Service - ${siteConfig.title}`}
      description="Read our terms of service for using the Humanoid Robotics Book and related services">
      <TermsOfServiceHeader />
      <main className="terms-main">
        <div className="container">
          <TermsOfServiceContent />
        </div>
      </main>
    </Layout>
  );
}