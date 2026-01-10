'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.15
      }
    }
  };

  // Enhanced smooth scroll function with mobile optimization
  const scrollToSection = (sectionId: string) => {
    // Close mobile menu immediately
    setIsOpen(false);
    
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementTop = element.offsetTop;
        const scrollToPosition = Math.max(0, elementTop - navbarHeight);

        // Smooth scroll with better mobile support
        window.scrollTo({
          top: scrollToPosition,
          behavior: 'smooth'
        });
      }
    });
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0
    },
    visible: { 
      opacity: 1, 
      height: "auto"
    }
  };

  return (
    <motion.nav 
      ref={navRef}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Navigation - centered */}
          <motion.div 
            className="hidden md:flex items-center space-x-8 w-full justify-center"
            variants={navVariants}
          >
            {[
              { name: 'Home', id: 'hero' },
              { name: 'Languages', id: 'languages' },
              { name: 'About', id: 'about' },
              { name: 'Projects', id: 'projects' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 5,
                  rotateX: 2,
                  z: 20,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                whileTap={{ 
                  scale: 0.95,
                  rotateY: -2,
                  transition: { duration: 0.15, ease: "easeOut" }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToSection(item.id);
                  }}
                  className="text-white hover:text-red-500 px-4 py-2 text-sm font-medium transition-all duration-500 uppercase tracking-wider relative group"
                >
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-500"
                    whileHover={{ width: "100%" }}
                  />
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-auto">
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="text-white hover:text-red-500 focus:outline-none focus:text-red-500 transition-colors p-2"
              aria-label="Toggle menu"
              type="button"
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.9,
                rotate: -5,
                transition: { duration: 0.1 }
              }}
            >
              <motion.svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden overflow-hidden absolute top-full left-0 right-0 z-50"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                staggerChildren: 0.15,
                delayChildren: 0.1
              }}
            >
              <motion.div 
                className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-sm rounded-b-lg shadow-lg border-t border-gray-800"
                variants={mobileMenuVariants}
              >
                {[
                  { name: 'Home', id: 'hero' },
                  { name: 'Languages', id: 'languages' },
                  { name: 'About', id: 'about' },
                  { name: 'Projects', id: 'projects' },
                  { name: 'Contact', id: 'contact' }
                ].map((item) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      x: 10,
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        scrollToSection(item.id);
                      }}
                      className="block text-white hover:text-red-500 px-4 py-2 text-sm font-medium transition-all duration-300 uppercase tracking-wider rounded-md w-full text-left"
                    >
                      {item.name}
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}