'use client';

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const [currentText, setCurrentText] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -100]);
  const imageY = useTransform(scrollY, [0, 500], [0, -50]);

  const texts = [
    { line1: "FULL STACK", line2: "DEVELOPER", color: "text-white" },
    { line1: "AI CHAT", line2: "BOT", color: "text-white" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Mouse move handler for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const x = (e.clientX - centerX) / rect.width;
        const y = (e.clientY - centerY) / rect.height;
        
        mouseX.set(x * 20);
        mouseY.set(y * 20);
        setMousePosition({ x: x * 10, y: y * 10 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Floating animation variants
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      rotateX: 45, 
      rotateY: -15,
      z: -100
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateX: 0, 
      rotateY: 0,
      z: 0,
      transition: {
        duration: 1.2,
        delay: 0.5
      }
    }
  };

  const textRevealVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      rotateX: 90
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black overflow-hidden" style={{ perspective: '1000px' }}>
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-red-500/20 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-red-500/10 rounded-full"
        />
      </motion.div>

      {/* =================== DESKTOP VERSION =================== */}
      <div className="hidden md:block">
        {/* Background text with enhanced 3D effect */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ 
            y: textY,
            rotateX: smoothMouseY,
            rotateY: smoothMouseX,
            transformStyle: 'preserve-3d'
          }}
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8, z: -200 }}
            animate={{ opacity: 0.8, scale: 1, z: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[12rem] xl:text-[16rem] 2xl:text-[20rem] font-black text-red-600 select-none pointer-events-none leading-none tracking-tighter whitespace-nowrap"
            style={{ 
              textShadow: '0 0 50px rgba(239, 68, 68, 0.3)',
              transform: `translateZ(-100px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`
            }}
          >
            PORTFOLIO
          </motion.h1>
        </motion.div>

        <div className="relative z-10 w-full h-screen flex">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative">

            {/* Left Section with enhanced animations */}
            <motion.div 
              initial={{ opacity: 0, x: -100, rotateY: -45 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="absolute bottom-20 left-0 space-y-6 max-w-sm"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div 
                variants={floatingVariants}
                animate="animate"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)", 
                  y: -5,
                  rotateX: 5,
                  rotateY: 5,
                  z: 20
                }}
                whileTap={{ scale: 0.95, rotateX: -5 }}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center w-fit shadow-lg shadow-red-500/25 cursor-pointer transition-all duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 bg-white rounded-full mr-3"
                ></motion.div>
                Open to work
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="space-y-1"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentText}
                    initial={{ opacity: 0, x: -50, scale: 0.8, rotateY: -45, z: -50 }}
                    animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0, z: 0 }}
                    exit={{ opacity: 0, x: 50, scale: 0.8, rotateY: 45, z: -50 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-1"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div 
                      variants={textRevealVariants}
                      initial="hidden"
                      animate="visible"
                      className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-none tracking-tight ${texts[currentText].color}`}
                      style={{ 
                        textShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                        transform: `translateZ(20px)`
                      }}
                    >
                      {texts[currentText].line1}
                    </motion.div>
                    <motion.div 
                      variants={textRevealVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 }}
                      className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-none tracking-tight ${texts[currentText].color}`}
                      style={{ 
                        textShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                        transform: `translateZ(20px)`
                      }}
                    >
                      {texts[currentText].line2}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Center Image with advanced 3D effects */}
            <div className="flex items-center justify-center w-full h-full" style={{ perspective: '1000px' }}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                style={{ 
                  y: imageY,
                  rotateX: smoothMouseY,
                  rotateY: smoothMouseX,
                  transformStyle: 'preserve-3d'
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: mousePosition.x * 0.5, 
                  rotateX: -mousePosition.y * 0.5,
                  boxShadow: "0 30px 60px rgba(239, 68, 68, 0.4)",
                  z: 50,
                  transition: { duration: 0.3 }
                }}
                className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] xl:w-[36rem] xl:h-[36rem] 2xl:w-[40rem] 2xl:h-[40rem] rounded-2xl overflow-hidden shadow-2xl shadow-red-500/20"
              >
                {/* Floating particles around image */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-red-500/20 rounded-full blur-sm"
                />
                <motion.div
                  animate={{
                    rotate: -360,
                    scale: [1, 0.8, 1]
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-500/30 rounded-full blur-sm"
                />
                
                <motion.img
                  src="/assets/profile-image.png"
                  alt="Profile Image"
                  className="w-full h-full object-cover object-center filter brightness-110 contrast-110 saturate-110 rounded-2xl transition-all duration-300"
                  style={{ transform: 'translateZ(30px)' }}
                  whileHover={{ 
                    filter: 'brightness(120%) contrast(120%) saturate(120%)',
                    transition: { duration: 0.3 }
                  }}
                />
                
                {/* Glowing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.1), transparent)',
                    transform: 'translateZ(1px)'
                  }}
                  animate={{
                    background: [
                      'linear-gradient(0deg, transparent, rgba(239, 68, 68, 0.1), transparent)',
                      'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.1), transparent)',
                      'linear-gradient(180deg, transparent, rgba(239, 68, 68, 0.1), transparent)',
                      'linear-gradient(270deg, transparent, rgba(239, 68, 68, 0.1), transparent)',
                      'linear-gradient(360deg, transparent, rgba(239, 68, 68, 0.1), transparent)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>

            {/* Right Section with enhanced animations */}
            <motion.div 
              initial={{ opacity: 0, x: 100, rotateY: 45 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute bottom-20 right-0 space-y-6 max-w-sm"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div 
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 1 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)", 
                  y: -5,
                  rotateX: -5,
                  rotateY: -5,
                  z: 20
                }}
                whileTap={{ scale: 0.95, rotateX: 5 }}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center w-fit shadow-lg shadow-red-500/25 cursor-pointer transition-all duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 bg-white rounded-full mr-3"
                ></motion.div>
                About me
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 30, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-gray-300 text-sm leading-relaxed"
                style={{ 
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                  transform: 'translateZ(10px)'
                }}
              >
                Hi, I'm Ali Haider, a Full Stack MERN Developer and AI Chatbot Automation Specialist with 1 year of experience. I build modern, scalable web applications and smart AI-driven chatbot solutions that improve user experience and automate business processes.
              </motion.p>

              <motion.button 
                initial={{ opacity: 0, y: 30, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px rgba(239, 68, 68, 0.5)", 
                  y: -5, 
                  rotateX: -10,
                  rotateY: 5,
                  z: 30
                }}
                whileTap={{ scale: 0.95, rotateX: 10 }}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center w-fit shadow-lg shadow-red-500/25"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 bg-white rounded-full mr-3"
                ></motion.div>
                See my work
              </motion.button>
            </motion.div>

          </div>
        </div>
      </div>

      {/* =================== MOBILE VERSION =================== */}
      <div className="block md:hidden px-4 py-12 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden">
        {/* Animated background elements for mobile */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{ y: backgroundY }}
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-1/4 left-1/4 w-20 h-20 border border-red-500/20 rounded-full"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 0.8, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-1/4 right-1/4 w-16 h-16 border border-red-500/10 rounded-full"
          />
        </motion.div>

        {/* Background Portfolio Text with 3D effect */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.5, rotateX: 90, z: -100 }}
          animate={{ opacity: 0.1, scale: 1, rotateX: 0, z: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="text-6xl font-black text-red-600 select-none absolute top-8 left-1/2 transform -translate-x-1/2"
          style={{ 
            textShadow: '0 0 30px rgba(239, 68, 68, 0.2)',
            transformStyle: 'preserve-3d'
          }}
        >
          PORTFOLIO
        </motion.h1>

        {/* Profile Image with enhanced 3D effects */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.6, rotateY: 45, z: -50 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          whileHover={{ 
            scale: 1.08, 
            rotateY: 8, 
            rotateX: -5,
            boxShadow: "0 25px 50px rgba(239, 68, 68, 0.4)",
            z: 30
          }}
          whileTap={{ 
            scale: 0.95, 
            rotateY: -5,
            transition: { duration: 0.1 }
          }}
          className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl shadow-red-500/20 relative z-10"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Floating particles around mobile image */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -top-3 -right-3 w-6 h-6 bg-red-500/30 rounded-full blur-sm"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 0.7, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -bottom-3 -left-3 w-4 h-4 bg-red-500/40 rounded-full blur-sm"
          />
          
          <motion.img 
            src="/assets/profile-image.png" 
            alt="Profile" 
            className="w-full h-full object-cover rounded-2xl filter brightness-110 contrast-110"
            style={{ transform: 'translateZ(20px)' }}
            whileHover={{ 
              filter: 'brightness(125%) contrast(125%) saturate(120%)',
              transition: { duration: 0.3 }
            }}
          />
          
          {/* Mobile glowing border effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.15), transparent)',
              transform: 'translateZ(1px)'
            }}
            animate={{
              background: [
                'linear-gradient(0deg, transparent, rgba(239, 68, 68, 0.15), transparent)',
                'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.15), transparent)',
                'linear-gradient(180deg, transparent, rgba(239, 68, 68, 0.15), transparent)',
                'linear-gradient(270deg, transparent, rgba(239, 68, 68, 0.15), transparent)',
                'linear-gradient(360deg, transparent, rgba(239, 68, 68, 0.15), transparent)'
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Animated Text with 3D transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentText}
            initial={{ opacity: 0, y: 40, rotateX: 60, scale: 0.8, z: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, z: 0 }}
            exit={{ opacity: 0, y: -40, rotateX: -60, scale: 0.8, z: -30 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative z-10"
          >
            <motion.div 
              className={`text-2xl font-black ${texts[currentText].color} mb-1`}
              style={{ 
                textShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                transform: 'translateZ(15px)'
              }}
              animate={{ 
                textShadow: [
                  '0 8px 20px rgba(0, 0, 0, 0.4)',
                  '0 8px 25px rgba(239, 68, 68, 0.2)',
                  '0 8px 20px rgba(0, 0, 0, 0.4)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {texts[currentText].line1}
            </motion.div>
            <motion.div 
              className={`text-2xl font-black ${texts[currentText].color}`}
              style={{ 
                textShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                transform: 'translateZ(15px)'
              }}
              animate={{ 
                textShadow: [
                  '0 8px 20px rgba(0, 0, 0, 0.4)',
                  '0 8px 25px rgba(239, 68, 68, 0.2)',
                  '0 8px 20px rgba(0, 0, 0, 0.4)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            >
              {texts[currentText].line2}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Mobile Buttons with 3D effects */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col gap-4 w-full items-center relative z-10"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.button 
            initial={{ opacity: 0, y: 20, rotateX: 45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ 
              scale: 1.08, 
              boxShadow: "0 15px 40px rgba(239, 68, 68, 0.5)",
              rotateX: -8,
              rotateY: 5,
              y: -3,
              z: 20
            }}
            whileTap={{ 
              scale: 0.92, 
              rotateX: 8,
              transition: { duration: 0.1 }
            }}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full w-48 shadow-lg shadow-red-500/25 font-medium relative overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full"
            />
            <span style={{ transform: 'translateZ(10px)' }}>Open to Work</span>
            
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0"
              style={{
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.1))'
              }}
              animate={{
                opacity: [0, 0.3, 0],
                x: [-100, 100]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.button>
          
          <motion.button 
            initial={{ opacity: 0, y: 20, rotateX: 45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            whileHover={{ 
              scale: 1.08, 
              boxShadow: "0 15px 40px rgba(239, 68, 68, 0.5)",
              rotateX: -8,
              rotateY: -5,
              y: -3,
              z: 20
            }}
            whileTap={{ 
              scale: 0.92, 
              rotateX: 8,
              transition: { duration: 0.1 }
            }}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full w-48 shadow-lg shadow-red-500/25 font-medium relative overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full"
            />
            <span style={{ transform: 'translateZ(10px)' }}>See My Work</span>
            
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0"
              style={{
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.1))'
              }}
              animate={{
                opacity: [0, 0.3, 0],
                x: [-100, 100]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.button>
        </motion.div>

        {/* Enhanced Mobile Description with 3D effect */}
        <motion.p 
          initial={{ opacity: 0, y: 30, rotateX: 45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="text-gray-300 text-sm leading-relaxed max-w-sm relative z-10"
          style={{ 
            textShadow: '0 4px 15px rgba(0, 0, 0, 0.6)',
            transform: 'translateZ(5px)',
            transformStyle: 'preserve-3d'
          }}
        >
          Hi, I'm Ali Haider, a Full Stack MERN Developer and AI Chatbot Automation Specialist with 1 year of experience. I build modern, scalable web applications and smart AI-driven chatbot solutions.
        </motion.p>

        {/* Floating elements for mobile ambiance */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 left-8 w-8 h-8 border border-red-500/20 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -8, 0],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-32 right-8 w-6 h-6 border border-red-500/15 rounded-full"
        />
      </div>
    </section>
  );
}
