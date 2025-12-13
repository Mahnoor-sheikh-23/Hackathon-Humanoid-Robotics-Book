// @ts-check
// A type-check enables us to automatically check our config for any issues.
// For more information, see https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-content-docs#configuration
// Type definitions for Docusaurus v3.9.2, Node 24+

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AI-Driven Development – Humanoid Robotics Book',
  tagline: 'A complete handbook for AI, robotics, and physical agents',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://mahnoor-sheikh-23.github.io', // Replace with your GitHub Pages URL
  // Set the /<baseUrl>/ path under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Humanoid-robotics-book/', // This should match your GitHub repository name

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Mahnoor-sheikh-23', // Replace with your GitHub organization/username
  projectName: 'Humanoid-robotics-book', // Replace with your GitHub repository name
  trailingSlash: false, // For GitHub Pages, use false

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', // Set docs root to site root
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Mahnoor-sheikh-23/Humanoid-robotics-book/tree/main/frontend/', // Adjust to your repo
        },
        blog: false, // Disable blog as per requirement
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg', // You might want to create a custom social card
      navbar: {
        title: 'Humanoid Robotics Book',
        logo: {
          alt: 'Humanoid Robotics Book Logo',
          src: 'img/logo.png', // Updated to .png
          
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/Mahnoor-sheikh-23/Humanoid-robotics-book', // Link to your GitHub repo
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/',
              },
              {
                label: 'Module 1 - ROS 2',
                to: 'module1-ros2/ch3_ros2_core',
              },
              {
                label: 'Module 2 - Digital Twin',
                to: 'module2-digital-twin/ch7_gazebo_intro',
              },
              {
                label: 'Module 3 - NVIDIA Isaac',
                to: 'module3-nvidia-isaac/ch10_isaac_sim',
              },
              {
                label: 'Module 4 - VLA Integration',
                to: 'module4-vla/ch15_whisper_llm',
              },
              {
                label: 'Capstone Project',
                to: 'capstone/ch18_integration',
              },
              {
                label: 'Appendices',
                to: 'appendices/appA_hardware',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Mahnoor-sheikh-23/Humanoid-robotics-book',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} AI-Driven Development – Humanoid Robotics Book. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'python', 'json', 'yaml'], // Add common languages used in the book
      },
    }),
};

module.exports = config;