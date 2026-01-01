'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function AboutSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 200]);
  const cardY = useTransform(scrollY, [0, 1000], [0, -100]);

  // Mouse move handler for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const x = (e.clientX - centerX) / rect.width;
        const y = (e.clientY - centerY) / rect.height;
        
        mouseX.set(x * 15);
        mouseY.set(y * 15);
        setMousePosition({ x: x * 10, y: y * 10 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const skills = [
    { name: 'Frontend Development', level: 90 },
    { name: 'Backend Development', level: 85 },
    { name: 'AI Chatbot Development', level: 88 },
    { name: 'Database Management', level: 82 }
  ];

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Freelance',
      period: '2023 - Present',
      description: 'Building modern web applications using MERN stack'
    },
    {
      title: 'AI Chatbot Specialist',
      company: 'Various Projects',
      period: '2023 - Present',
      description: 'Developing intelligent chatbot solutions for businesses'
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-black overflow-hidden py-20"
      style={{ perspective: '1000px' }}
    >
      {/* Animated background elements */}
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
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/4 left-1/6 w-40 h-40 border border-red-500/20 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-1/4 right-1/6 w-32 h-32 border border-red-500/15 rounded-full"
        />
      </motion.div>

      {/* Background "ABOUT" text */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ 
          y: backgroundY,
          rotateX: smoothMouseY,
          rotateY: smoothMouseX,
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8, z: -200 }}
          animate={{ opacity: 0.05, scale: 1, z: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-black text-red-600 select-none pointer-events-none leading-none tracking-tighter"
          style={{ 
            textShadow: '0 0 50px rgba(239, 68, 68, 0.2)',
            transform: `translateZ(-100px) rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg)`
          }}
        >
          ABOUT
        </motion.h1>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 45 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative z-20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div 
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full text-sm font-medium inline-flex items-center mb-6 shadow-lg shadow-red-500/25 relative z-30"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)",
              y: -5,
              z: 50
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-3 h-3 bg-white rounded-full mr-3"
            />
            About Me
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 relative z-30"
            style={{ 
              textShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
              transform: 'translateZ(50px)'
            }}
          >
            Get to Know Me
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 text-lg max-w-2xl mx-auto relative z-30"
            style={{ 
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              transform: 'translateZ(40px)'
            }}
          >
            Passionate developer crafting digital experiences with modern technologies
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start relative z-10">
          
          {/* Left Side - Profile Image & Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="space-y-8"
            style={{ 
              y: cardY,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Profile Image Card */}
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                rotateX: 5, 
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(239, 68, 68, 0.3)",
                z: 30
              }}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl text-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative inline-block mb-6"
                style={{ transform: 'translateZ(20px)' }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 p-1 -m-1"
                />
                <motion.img
                  src="/assets/profile-image.png"
                  alt="Ali Haider - Full Stack Developer"
                  className="w-48 h-48 rounded-full object-cover border-4 border-gray-800 relative z-10 shadow-2xl"
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 15,
                    z: 40
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-red-500/20 blur-xl"
                />
              </motion.div>
              
              <motion.h3 
                className="text-2xl font-bold text-white mb-2"
                style={{ transform: 'translateZ(15px)' }}
              >
                Ali Haider
              </motion.h3>
              
              <motion.p 
                className="text-red-400 font-medium mb-4"
                style={{ transform: 'translateZ(10px)' }}
              >
                Full Stack MERN Developer & AI Specialist
              </motion.p>
              
              <motion.div 
                className="flex justify-center space-x-4"
                style={{ transform: 'translateZ(10px)' }}
              >
                {['GitHub', 'LinkedIn', 'Email'].map((platform, index) => (
                  <motion.button
                    key={platform}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -3,
                      boxShadow: "0 10px 20px rgba(239, 68, 68, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gray-700/50 hover:bg-red-600/20 border border-gray-600/50 hover:border-red-500/50 rounded-full flex items-center justify-center text-gray-300 hover:text-red-400 transition-all duration-300"
                  >
                    <span className="text-sm font-bold">{platform[0]}</span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Personal Info Card */}
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                rotateX: 5, 
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(239, 68, 68, 0.2)",
                z: 30
              }}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.h3 
                className="text-2xl font-bold text-white mb-4"
                style={{ transform: 'translateZ(15px)' }}
              >
                Who I Am
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 leading-relaxed mb-4"
                style={{ transform: 'translateZ(10px)' }}
              >
                I'm a passionate Full Stack MERN Developer and AI Chatbot Automation Specialist 
                with 1 year of hands-on experience. I specialize in creating modern, scalable web applications 
                and intelligent AI-driven solutions.
              </motion.p>
              
              <motion.p 
                className="text-gray-300 leading-relaxed"
                style={{ transform: 'translateZ(10px)' }}
              >
                My journey in tech is driven by curiosity and a commitment to continuous learning. I believe 
                in writing clean, efficient code and building solutions that make a real difference.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right Side - Skills & Experience */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="space-y-8"
            style={{ 
              y: cardY,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Skills Section */}
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                rotateX: -5, 
                rotateY: -5,
                boxShadow: "0 25px 50px rgba(239, 68, 68, 0.2)",
                z: 30
              }}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.h3 
                className="text-2xl font-bold text-white mb-6"
                style={{ transform: 'translateZ(15px)' }}
              >
                Core Skills
              </motion.h3>
              
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-red-400 font-bold">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full relative"
                      >
                        <motion.div
                          animate={{ x: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Experience Card */}
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                rotateX: 5, 
                rotateY: -5,
                boxShadow: "0 25px 50px rgba(239, 68, 68, 0.2)",
                z: 30
              }}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.h3 
                className="text-2xl font-bold text-white mb-6"
                style={{ transform: 'translateZ(15px)' }}
              >
                Experience
              </motion.h3>
              
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="border-l-2 border-red-500/30 pl-6 relative"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          '0 0 0 0 rgba(239, 68, 68, 0.4)',
                          '0 0 0 8px rgba(239, 68, 68, 0)',
                          '0 0 0 0 rgba(239, 68, 68, 0)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      className="absolute -left-2 top-2 w-4 h-4 bg-red-500 rounded-full"
                    />
                    
                    <h4 className="text-lg font-semibold text-white">{exp.title}</h4>
                    <p className="text-red-400 font-medium">{exp.company}</p>
                    <p className="text-gray-400 text-sm mb-2">{exp.period}</p>
                    <p className="text-gray-300 text-sm">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                rotateX: -5, 
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(239, 68, 68, 0.2)",
                z: 30
              }}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.h3 
                className="text-2xl font-bold text-white mb-6"
                style={{ transform: 'translateZ(15px)' }}
              >
                Quick Stats
              </motion.h3>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '1+', label: 'Years Experience' },
                  { number: '15+', label: 'Projects Completed' },
                  { number: '10+', label: 'Happy Clients' },
                  { number: '24/7', label: 'Support Available' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5, rotateY: 45 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotateY: 10,
                      z: 20
                    }}
                    className="text-center"
                    style={{ 
                      transform: 'translateZ(10px)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <motion.div 
                      className="text-3xl font-black text-red-500 mb-2"
                      animate={{ 
                        textShadow: [
                          '0 0 10px rgba(239, 68, 68, 0.5)',
                          '0 0 20px rgba(239, 68, 68, 0.8)',
                          '0 0 10px rgba(239, 68, 68, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 45 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16 relative z-20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 25px 50px rgba(239, 68, 68, 0.5)",
              y: -5,
              rotateX: -10,
              z: 30
            }}
            whileTap={{ scale: 0.95, rotateX: 10 }}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center mx-auto shadow-lg shadow-red-500/25 relative overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 bg-white rounded-full mr-3"
            />
            <span style={{ transform: 'translateZ(10px)' }}>Let's Work Together</span>
            
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
        </motion.div>
      </div>

      {/* Floating particles */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-32 left-16 w-12 h-12 border border-red-500/20 rounded-full"
      />
      <motion.div
        animate={{
          y: [0, 25, 0],
          rotate: [0, -15, 0],
          opacity: [0.1, 0.4, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-32 right-16 w-8 h-8 border border-red-500/15 rounded-full"
      />
    </section>
  );
}