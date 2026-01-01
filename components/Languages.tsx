'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const skills = [
  { number: '01', title: 'FRONTEND', subtitle: 'React, Next.js, TypeScript', color: '#61DAFB' },
  { number: '02', title: 'BACKEND', subtitle: 'Node.js, APIs', color: '#68A063' },
  { number: '03', title: 'STYLING', subtitle: 'Tailwind, CSS', color: '#06B6D4' },
  { number: '04', title: 'DATABASE', subtitle: 'MongoDB, PostgreSQL', color: '#4DB33D' },
  { number: '05', title: 'TOOLS', subtitle: 'Git, Docker', color: '#F05032' },
  { number: '06', title: 'MOBILE', subtitle: 'React Native', color: '#61DAFB' },
];

// Custom hook for mouse tracking
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

export default function Languages() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const mousePosition = useMousePosition();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax transforms
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 10, 0]);

  // Mouse parallax (disabled on mobile for performance)
  const mouseX = useSpring(
    isMobile || typeof window === 'undefined' 
      ? 0 
      : (mousePosition.x - window.innerWidth / 2) * 0.01, 
    {
      stiffness: 100,
      damping: 30
    }
  );
  const mouseY = useSpring(
    isMobile || typeof window === 'undefined' 
      ? 0 
      : (mousePosition.y - window.innerHeight / 2) * 0.01, 
    {
      stiffness: 100,
      damping: 30
    }
  );

  return (
    <section 
      ref={containerRef}
      className="relative py-20 px-6 bg-black min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ perspective: '2000px' }}
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(isMobile ? 20 : 50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full opacity-30"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
            }}
            animate={{
              y: [null, -100, typeof window !== 'undefined' ? window.innerHeight + 100 : 1000],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* TABLE OF Header */}
      <motion.div
        initial={{ opacity: 0, y: -100, rotateX: -90, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ 
          duration: 1.5, 
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 80,
          damping: 20
        }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-8 relative z-20"
        style={{ 
          perspective: '1000px',
          rotateX: rotateX,
          x: mouseX,
          y: mouseY
        }}
      >
        <motion.div 
          className="text-red-500 text-3xl md:text-4xl lg:text-5xl font-thin tracking-[0.8em] uppercase font-mono"
          whileHover={{ 
            scale: 1.1,
            rotateY: isMobile ? 0 : 10,
            rotateZ: isMobile ? 0 : 2,
            textShadow: "0 0 30px rgba(239, 68, 68, 0.8)",
            filter: "brightness(1.2)",
            transition: { duration: 0.4, type: "spring", stiffness: 200 }
          }}
          animate={{
            textShadow: [
              "0 0 20px rgba(239, 68, 68, 0.3)",
              "0 0 40px rgba(239, 68, 68, 0.6)",
              "0 0 20px rgba(239, 68, 68, 0.3)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          TABLE OF
        </motion.div>
      </motion.div>

      {/* Background Large Text */}
      <div className="relative flex-1 flex items-center justify-center">
        <motion.h1 
          className="font-black text-[30vw] md:text-[25vw] lg:text-[20vw] xl:text-[16vw] 
                      text-transparent bg-gradient-to-b from-gray-300 via-gray-500 to-gray-800 
                      bg-clip-text select-none pointer-events-none opacity-50 leading-none font-sans"
          initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
          whileInView={{ opacity: 0.5, scale: 1, rotateY: 0 }}
          transition={{ 
            duration: 2,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 50
          }}
          viewport={{ once: true }}
          style={{ 
            perspective: '2000px',
            transformStyle: 'preserve-3d'
          }}
        >
          LANGUAGES
        </motion.h1>
        
        {/* Skills Grid Overlay */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 w-full max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.number}
                initial={{ 
                  opacity: 0, 
                  y: 100, 
                  rotateX: -90,
                  scale: 0.5
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  scale: 1
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 10,
                  rotateX: 5,
                  z: 50,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{
                  scale: 0.95,
                  rotateY: -5,
                  transition: { duration: 0.1 }
                }}
                viewport={{ once: true }}
                className="text-center group cursor-pointer"
                style={{ 
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                <motion.div 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors duration-300 font-sans"
                  whileHover={{
                    scale: 1.2,
                    rotateZ: 5,
                    textShadow: "0 0 30px rgba(255, 255, 255, 0.8)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {skill.number}
                </motion.div>
                <motion.div 
                  className="text-white font-medium text-xs md:text-sm lg:text-base mb-1 tracking-wider uppercase"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    letterSpacing: '0.2em'
                  }}
                >
                  {skill.title}
                </motion.div>
                <motion.div 
                  className="text-gray-400 text-xs md:text-sm leading-relaxed"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
                  whileHover={{
                    color: '#d1d5db',
                    scale: 1.02
                  }}
                >
                  {skill.subtitle}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
