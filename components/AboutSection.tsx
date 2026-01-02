'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function AboutSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Smooth mouse tracking with reduced sensitivity
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 80, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 80, stiffness: 200 });

  // Simplified parallax transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 100]);

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Metosys',
      period: '2025 - 2026',
      description: 'Building modern web applications using MERN stack with focus on performance and user experience',
      icon: '💻'
    },
    {
      title: 'AI Chatbot Specialist',
      company: 'Various Clients',
      period: '2025 - Present',
      description: 'Creating intelligent chatbot solutions for businesses to automate customer support',
      icon: '🤖'
    },
    {
      title: 'Web Developer',
      company: 'Personal Projects',
      period: '2025 - 2026',
      description: 'Learning and building various web applications to master modern technologies',
      icon: '🚀'
    }
  ];

  // Client-side rendering check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Optimized mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const x = (e.clientX - centerX) / rect.width;
        const y = (e.clientY - centerY) / rect.height;
        
        mouseX.set(x * 10);
        mouseY.set(y * 10);
        setMousePosition({ x: x * 8, y: y * 8 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-black overflow-hidden py-20" 
      style={{ perspective: '1500px' }}
      id="about"
    >
      {/* Simplified animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-20 left-20 w-40 h-40 border-2 border-red-500/20 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 0.8, 1],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-20 right-20 w-32 h-32 border-2 border-red-500/15"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />
        <motion.div
          animate={{ 
            rotate: 180,
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-red-500/10"
        />
      </motion.div>

      {/* Simplified background "ABOUT" text */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ 
          rotateX: smoothMouseY,
          rotateY: smoothMouseX,
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.5, z: -200 }}
          animate={{ opacity: 0.03, scale: 1, z: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] font-black text-red-600 select-none pointer-events-none leading-none tracking-tighter"
          style={{ 
            textShadow: '0 0 100px rgba(239, 68, 68, 0.2)',
            transform: `translateZ(-100px) rotateX(${mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg)`
          }}
        >
          ABOUT
        </motion.h1>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simplified Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 30 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.span 
            className="text-red-500 text-lg font-medium mb-4 block tracking-wider"
            style={{ transform: 'translateZ(20px)' }}
            animate={{
              textShadow: [
                '0 0 20px rgba(239, 68, 68, 0.5)',
                '0 0 30px rgba(239, 68, 68, 0.7)',
                '0 0 20px rgba(239, 68, 68, 0.5)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            GET TO KNOW ME
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
            style={{ 
              transform: 'translateZ(30px)',
              textShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
            }}
          >
            About <span className="text-red-500">Me</span>
          </motion.h2>
        </motion.div>

        {/* Simplified Main Content */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Profile Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-1"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                rotateY: 8,
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)",
                z: 40,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
              }}
              className="relative"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{
                y: [0, -5, 0]
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <motion.div 
                className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.img
                  src="/assets/profile-image.png"
                  alt="Ali Haider - Full Stack Developer"
                  className="w-full h-full object-cover object-center"
                  style={{ transform: 'translateZ(20px)' }}
                />
                
                {/* Simplified floating elements */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-red-500/30 rounded-full blur-sm"
                />
                <motion.div
                  animate={{
                    rotate: -360,
                    scale: [1, 0.8, 1],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{
                    rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-500/40 rounded-full blur-sm"
                />
              </motion.div>

              {/* Simplified Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { number: '1', label: 'Year Experience', icon: '⚡' },
                  { number: '15+', label: 'Projects Done', icon: '🚀' },
                  { number: '10+', label: 'Happy Clients', icon: '😊' },
                  { number: '24/7', label: 'Support', icon: '🔧' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, rotateX: 30 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 8,
                      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
                      z: 20
                    }}
                    className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-gray-500/30 rounded-xl p-4 text-center relative overflow-hidden"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10 + index * 2, repeat: Infinity, ease: "linear" }}
                      className="text-xl mb-2"
                      style={{ transform: 'translateZ(10px)' }}
                    >
                      {stat.icon}
                    </motion.div>
                    <motion.div 
                      className="text-xl font-black text-white mb-1"
                      style={{ transform: 'translateZ(8px)' }}
                    >
                      {stat.number}
                    </motion.div>
                    <motion.div 
                      className="text-xs text-white"
                      style={{ transform: 'translateZ(5px)' }}
                    >
                      {stat.label}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Bio Section */}
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                rotateX: 5, 
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
                z: 30
              }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-gray-500/30 rounded-2xl p-8 relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.h3 
                className="text-3xl font-bold text-white mb-6"
                style={{ transform: 'translateZ(15px)' }}
              >
                Who Am I?
              </motion.h3>
              <motion.p 
                className="text-white leading-relaxed mb-6 text-lg"
                style={{ transform: 'translateZ(10px)' }}
              >
                I'm <motion.span 
                  className="text-red-400 font-semibold"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(239, 68, 68, 0.6)',
                      '0 0 15px rgba(239, 68, 68, 0.8)',
                      '0 0 10px rgba(239, 68, 68, 0.6)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  Ali Haider
                </motion.span>, a passionate Full Stack MERN Developer and AI Chatbot Automation Specialist. 
                Currently pursuing my <motion.span 
                  className="text-red-400 font-semibold"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(239, 68, 68, 0.6)',
                      '0 0 15px rgba(239, 68, 68, 0.8)',
                      '0 0 10px rgba(239, 68, 68, 0.6)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  Bachelor's in Computer Science
                </motion.span>, I combine academic knowledge with 1 year of hands-on experience 
                to create modern, scalable web applications and intelligent chatbot solutions that enhance user experience and streamline business processes.
              </motion.p>
              <motion.p 
                className="text-white leading-relaxed text-lg"
                style={{ transform: 'translateZ(10px)' }}
              >
                I love turning complex problems into simple, beautiful solutions. When I'm not coding or studying, 
                you'll find me exploring new technologies, contributing to open-source projects, or 
                learning about the latest trends in AI and web development. My academic foundation in computer science 
                helps me approach development challenges with both theoretical understanding and practical expertise.
              </motion.p>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                rotateX: -5, 
                rotateY: -5,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
                z: 30
              }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-gray-500/30 rounded-2xl p-8 relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.h3 
                className="text-3xl font-bold text-white mb-6"
                style={{ transform: 'translateZ(15px)' }}
              >
                Experience
              </motion.h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, rotateX: 20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                    whileHover={{ 
                      scale: 1.03, 
                      rotateY: 3,
                      z: 15
                    }}
                    className="relative pl-16 pb-8 border-l-2 border-gray-500/30 last:border-l-0 last:pb-0"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 15 + index * 3, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute -left-8 top-0 w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-red-500/25"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      {exp.icon}
                    </motion.div>
                    <motion.div style={{ transform: 'translateZ(10px)' }}>
                      <motion.h4 className="text-xl font-bold text-white mb-2">
                        {exp.title}
                      </motion.h4>
                      <motion.p 
                        className="text-red-400 font-semibold mb-3 text-lg"
                        animate={{
                          textShadow: [
                            '0 0 8px rgba(239, 68, 68, 0.6)',
                            '0 0 12px rgba(239, 68, 68, 0.8)',
                            '0 0 8px rgba(239, 68, 68, 0.6)'
                          ]
                        }}
                        transition={{ 
                          duration: 5, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: index * 1.5 
                        }}
                      >
                        {exp.company} • {exp.period}
                      </motion.p>
                      <motion.p className="text-white leading-relaxed">
                        {exp.description}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mt-20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.05, 
              rotateX: -8,
              boxShadow: "0 30px 60px rgba(239, 68, 68, 0.4)",
              z: 40
            }}
            whileTap={{ scale: 0.95, rotateX: 8 }}
            className="inline-block"
            animate={{
              y: [0, -5, 0]
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <motion.button 
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg shadow-red-500/25 relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full"
              />
              <span style={{ transform: 'translateZ(15px)' }}>Let's Work Together</span>
              
              {/* Simplified button shine effect */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0"
                style={{
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.2), transparent, rgba(255,255,255,0.2))'
                }}
                animate={{
                  opacity: [0, 0.4, 0],
                  x: [-100, 100]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Simplified floating particles */}
      {isClient && [...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.sin(i) * 20, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2
          }}
          className="absolute bg-red-500/20 rounded-full blur-sm"
          style={{
            width: `${3 + (i % 3)}px`,
            height: `${3 + (i % 3)}px`,
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 2) * 30}%`
          }}
        />
      ))}
    </section>
  );
}