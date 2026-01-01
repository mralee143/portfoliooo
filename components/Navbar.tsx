'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.nav 
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
            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
              <motion.div
                key={item}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 5,
                  rotateX: 2,
                  z: 20,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  rotateY: -2,
                  transition: { duration: 0.1 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Link 
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-white hover:text-red-500 px-4 py-2 text-sm font-medium transition-all duration-300 uppercase tracking-wider relative group"
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-auto">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-500 focus:outline-none focus:text-red-500 transition-colors"
              aria-label="Toggle menu"
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
              className="md:hidden overflow-hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
            >
              <motion.div 
                className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-sm rounded-b-lg"
                variants={mobileMenuVariants}
              >
                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                  <motion.div
                    key={item}
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
                    <Link 
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="block text-white hover:text-red-500 px-4 py-2 text-sm font-medium transition-all duration-300 uppercase tracking-wider rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
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