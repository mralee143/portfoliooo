'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Footer() {
  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Navigation links
  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ];

  // Social links with proper icons (removed GitHub)
  const socialLinks = [
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/alihaider-dev', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      name: 'Email', 
      url: 'mailto:aleehaider045@gmail.com', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h1.82L12 11.64l8.545-7.819h1.82c.904 0 1.636.732 1.636 1.636z"/>
        </svg>
      )
    },
    { 
      name: 'Phone', 
      url: 'tel:+923144202998', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      )
    }
  ];

  // Skills/Technologies
  const technologies = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 
    'Express', 'Tailwind CSS', 'Framer Motion', 'AI/ML', 'MERN Stack'
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black to-gray-900 border-t border-red-500/20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #ef4444 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #ef4444 0%, transparent 50%)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="mb-6">
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                <h3 className="text-3xl font-bold text-white mb-4 hover:text-red-500 transition-colors duration-300">
                  Ali <span className="text-red-500">Haider</span>
                </h3>
              </motion.button>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Full Stack MERN Developer & AI Chatbot Specialist. Building modern, scalable web applications and intelligent automation solutions.
              </p>
              <div className="flex items-center text-red-400 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                Available for freelance work
              </div>
            </div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <div className="space-y-3">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    x: 5,
                    color: '#ef4444',
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                  }}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-gray-300 hover:text-red-500 transition-all duration-500 cursor-pointer text-left"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                  }}
                  className="px-3 py-1 bg-red-500/10 text-red-400 text-xs rounded-full border border-red-500/20 hover:border-red-500 transition-all duration-500 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Connect With Me</h4>
            <div className="space-y-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith('http') ? '_blank' : undefined}
                  rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    x: -3,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                  }}
                  className="flex items-center bg-gray-800/50 hover:bg-red-500/20 p-3 rounded-lg text-gray-300 hover:text-white border border-gray-700/50 hover:border-red-500/50 transition-all duration-500 group"
                >
                  <span className="mr-3 text-red-400 group-hover:text-red-300 transition-colors duration-500">
                    {social.icon}
                  </span>
                  <span>{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent mb-8"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm"
        >
          <div className="mb-4 md:mb-0">
            <p>&copy; 2025 Ali Haider. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span>Made with</span>
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
                color: ['#ef4444', '#dc2626', '#ef4444']
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="text-red-500"
            >
              ❤️
            </motion.span>
            <span>in Lahore, Pakistan</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}