'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function ProjectsSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 80, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 80, stiffness: 200 });

  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 150]);

  // Projects data with your specific projects
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Business Website',
      description: 'Complete e-commerce platform with product catalog, shopping cart, payment gateway, order management, and admin dashboard',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express'],
      icon: '🛒',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center',
      side: 'left'
    },
    {
      id: 2,
      title: 'Full Business Website',
      description: 'Professional business website with CMS, contact forms, service pages, testimonials, and SEO optimization',
      tech: ['Next.js', 'TypeScript', 'Tailwind', 'Prisma', 'PostgreSQL'],
      icon: '🏢',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center',
      side: 'right'
    },
    {
      id: 3,
      title: 'AI ChatBot like WhatsApp',
      description: 'Intelligent messaging system with AI responses, real-time chat, file sharing, and WhatsApp-like interface',
      tech: ['React', 'Socket.io', 'OpenAI', 'Node.js', 'MongoDB'],
      icon: '💬',
      image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=400&h=250&fit=crop&crop=center',
      side: 'left'
    },
    {
      id: 4,
      title: 'Portfolio Websites',
      description: 'Modern portfolio websites with 3D animations, responsive design, and interactive elements for professionals',
      tech: ['Next.js', 'Framer Motion', 'Three.js', 'Tailwind'],
      icon: '🎨',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop&crop=center',
      side: 'right'
    },
    {
      id: 5,
      title: 'Food Delivery Website',
      description: 'Complete food ordering platform with restaurant management, menu system, order tracking, and delivery integration',
      tech: ['MERN', 'Redux', 'Cloudinary', 'Stripe', 'Google Maps'],
      icon: '🍕',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop&crop=center',
      side: 'left'
    },
    {
      id: 6,
      title: 'Mobile App Development',
      description: 'Cross-platform mobile applications with native performance, push notifications, and offline capabilities',
      tech: ['React Native', 'Expo', 'Firebase', 'Redux Toolkit'],
      icon: '📱',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&crop=center',
      side: 'right'
    },
    {
      id: 7,
      title: 'Invoice Generator Web App',
      description: 'Professional invoice generation system with PDF export, client management, and payment tracking',
      tech: ['React', 'Node.js', 'PDF-lib', 'MongoDB', 'Express'],
      icon: '📄',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center',
      side: 'left'
    },
    {
      id: 8,
      title: 'RBAC System Application',
      description: 'Role-Based Access Control system with user management, permissions, and secure authentication',
      tech: ['Next.js', 'JWT', 'Prisma', 'PostgreSQL', 'NextAuth'],
      icon: '🔐',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop&crop=center',
      side: 'right'
    }
  ];

  // Client-side rendering check
  useEffect(() => {
    setIsClient(true);
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
        
        mouseX.set(x * 8);
        mouseY.set(y * 8);
        setMousePosition({ x: x * 6, y: y * 6 });
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
      id="projects"
    >
      {/* Animated background elements */}
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
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
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
            rotate: { duration: 35, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-20 right-20 w-32 h-32 border-2 border-red-500/15"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />
      </motion.div>

      {/* Background "PROJECTS" text */}
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
          className="text-[6rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-black text-red-600 select-none pointer-events-none leading-none tracking-tighter"
          style={{ 
            textShadow: '0 0 100px rgba(239, 68, 68, 0.2)',
            transform: `translateZ(-100px) rotateX(${mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg)`
          }}
        >
          PROJECTS
        </motion.h1>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 30 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
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
            MY WORK
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
            style={{ 
              transform: 'translateZ(30px)',
              textShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
            }}
          >
            Featured <span className="text-red-500">Projects</span>
          </motion.h2>
        </motion.div>

        {/* Projects Timeline - Center Line with Square Boxes */}
        <div className="relative">
          {/* Center Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-white via-gray-200 to-white shadow-lg shadow-white/50"
            style={{ 
              height: `${projects.length * 240}px`,
              transformOrigin: 'top'
            }}
          />

          {/* Center Line Glow Effect */}
          <motion.div
            animate={{
              opacity: [0.3, 0.8, 0.3],
              boxShadow: [
                '0 0 20px rgba(255, 255, 255, 0.5)',
                '0 0 40px rgba(255, 255, 255, 0.8)',
                '0 0 20px rgba(255, 255, 255, 0.5)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-white/50 blur-sm"
            style={{ height: `${projects.length * 240}px` }}
          />

          {/* Projects as Square Boxes */}
          <div className="relative">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ 
                  opacity: 0, 
                  x: project.side === 'left' ? -200 : 200,
                  rotateY: project.side === 'left' ? -45 : 45,
                  rotateX: 30,
                  scale: 0.8
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  rotateY: 0,
                  rotateX: 0,
                  scale: 1
                }}
                transition={{ 
                  duration: 1.2, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: false, amount: 0.3 }}
                className={`relative mb-12 ${
                  project.side === 'left' 
                    ? 'pr-6 md:pr-12 lg:pr-16' 
                    : 'pl-6 md:pl-12 lg:pl-16 ml-auto'
                } w-full md:w-1/2`}
                style={{ 
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Branch Connection */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  viewport={{ once: false, amount: 0.5 }}
                  className={`absolute top-1/2 w-6 md:w-8 lg:w-12 h-0.5 bg-gradient-to-${
                    project.side === 'left' ? 'r' : 'l'
                  } from-white to-transparent ${
                    project.side === 'left' ? 'right-0' : 'left-0'
                  }`}
                  style={{ 
                    transformOrigin: project.side === 'left' ? 'right' : 'left'
                  }}
                />

                {/* Square Project Card */}
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: project.side === 'left' ? 8 : -8,
                    rotateX: -5,
                    z: 50,
                    boxShadow: "0 30px 60px rgba(239, 68, 68, 0.3)"
                  }}
                  className="bg-white border border-red-500/20 rounded-lg overflow-hidden shadow-2xl shadow-red-500/20 relative"
                  style={{ 
                    transformStyle: 'preserve-3d'
                  }}
                  animate={{
                    y: [0, -5, 0],
                    boxShadow: [
                      "0 10px 30px rgba(239, 68, 68, 0.2)",
                      "0 15px 40px rgba(239, 68, 68, 0.3)",
                      "0 10px 30px rgba(239, 68, 68, 0.2)"
                    ]
                  }}
                  transition={{
                    y: { duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {/* Project Image */}
                  <div className="relative h-32 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-300"
                      style={{ transform: 'translateZ(10px)' }}
                      whileHover={{ 
                        scale: 1.1,
                        filter: 'brightness(110%) contrast(110%)',
                        transition: { duration: 0.3 }
                      }}
                    />
                    
                    {/* Image overlay with icon */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-start p-4"
                      whileHover={{ 
                        background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent, transparent)'
                      }}
                    >
                      <motion.div
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 20 + index * 2, repeat: Infinity, ease: "linear" },
                          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="text-2xl bg-white/20 backdrop-blur-sm rounded-full p-1.5"
                      >
                        {project.icon}
                      </motion.div>
                    </motion.div>
                    
                    {/* Image glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{
                        x: [-100, 100]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    />
                  </div>

                  {/* Project Content */}
                  <div className="p-4 relative" style={{ transform: 'translateZ(20px)' }}>
                    <motion.h3 
                      className="text-lg font-bold text-black mb-2 leading-tight"
                      animate={{
                        color: [
                          '#000000',
                          '#dc2626',
                          '#000000'
                        ]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.5 
                      }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-700 text-xs mb-3 leading-relaxed line-clamp-2"
                      style={{ transform: 'translateZ(15px)' }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: index * 0.2 + techIndex * 0.1 
                          }}
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: '#dc2626',
                            color: '#ffffff'
                          }}
                          className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full border border-red-200 transition-all duration-300"
                          style={{ transform: 'translateZ(10px)' }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full border border-gray-200">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(239, 68, 68, 0.4)",
                        z: 15
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300 relative overflow-hidden"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <span style={{ transform: 'translateZ(5px)' }}>View Project</span>
                      
                      {/* Button shine effect */}
                      <motion.div
                        className="absolute inset-0 rounded-lg opacity-0"
                        style={{
                          background: 'linear-gradient(45deg, rgba(255,255,255,0.3), transparent, rgba(255,255,255,0.3))'
                        }}
                        animate={{
                          opacity: [0, 0.5, 0],
                          x: [-100, 100]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                      />
                    </motion.button>
                  </div>

                  {/* Card border glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      border: '2px solid transparent',
                      background: 'linear-gradient(45deg, rgba(239, 68, 68, 0.2), transparent, rgba(239, 68, 68, 0.2)) border-box'
                    }}
                    animate={{
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.8
                    }}
                  />
                </motion.div>

                {/* Floating particles around each project */}
                {isClient && [...Array(3)].map((_, particleIndex) => (
                  <motion.div
                    key={particleIndex}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, Math.sin(particleIndex) * 10, 0],
                      rotate: [0, 360],
                      opacity: [0.2, 0.6, 0.2]
                    }}
                    transition={{
                      duration: 6 + particleIndex,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5 + particleIndex * 0.8
                    }}
                    className="absolute bg-red-500/30 rounded-full blur-sm"
                    style={{
                      width: `${2 + particleIndex}px`,
                      height: `${2 + particleIndex}px`,
                      left: `${20 + particleIndex * 30}%`,
                      top: `${10 + particleIndex * 20}%`
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
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
              <span style={{ transform: 'translateZ(15px)' }}>Explore All Projects</span>
              
              {/* Button shine effect */}
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

      {/* Global floating particles */}
      {isClient && [...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.sin(i) * 25, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2
          }}
          className="absolute bg-red-500/20 rounded-full blur-sm"
          style={{
            width: `${3 + (i % 3)}px`,
            height: `${3 + (i % 3)}px`,
            left: `${8 + i * 15}%`,
            top: `${15 + (i % 4) * 20}%`
          }}
        />
      ))}
    </section>
  );
}