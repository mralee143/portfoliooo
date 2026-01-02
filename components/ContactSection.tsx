'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function ContactSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Smooth mouse tracking with better damping
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 100, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 100, stiffness: 300 });

  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 150]);

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
        
        mouseX.set(x * 5);
        mouseY.set(y * 5);
        setMousePosition({ x: x * 3, y: y * 3 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  // Contact methods data
  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'aleehaider045@gmail.com',
      description: 'Send me an email anytime',
      color: 'bg-black border-2 border-white/30',
      link: 'mailto:aleehaider045@gmail.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+923144202998',
      description: 'Call me for urgent matters',
      color: 'bg-black border-2 border-white/30',
      link: 'tel:+923144202998'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Lahore, Pakistan',
      description: 'Available for local meetings',
      color: 'bg-black border-2 border-white/30',
      link: null
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'www.linkedin.com/in/alihaider-dev',
      description: 'Connect with me professionally',
      color: 'bg-black border-2 border-white/30',
      link: 'https://www.linkedin.com/in/alihaider-dev'
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-black overflow-hidden py-20" 
      style={{ perspective: '1500px' }}
      id="contact"
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

      {/* Background "CONTACT" text */}
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
          CONTACT
        </motion.h1>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, amount: 0.3 }}
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
            GET IN TOUCH
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
            style={{ 
              transform: 'translateZ(30px)',
              textShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
            }}
          >
            Let's Work <span className="text-red-500">Together</span>
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ transform: 'translateZ(15px)' }}
          >
            Ready to bring your ideas to life? I'm here to help you build amazing digital experiences. 
            Let's discuss your next project!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Methods - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, amount: 0.3 }}
            className="space-y-8"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.h3 
              className="text-2xl font-bold text-white mb-8"
              style={{ transform: 'translateZ(20px)' }}
            >
              Contact Information
            </motion.h3>

            {contactMethods.map((method, index) => {
              const isClickable = method.link;
              
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, x: -30, rotateY: -20, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                  transition={{ 
                    duration: 1.6, 
                    delay: index * 0.2,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                  whileHover={{ 
                    scale: 1.03,
                    rotateY: 5,
                    rotateX: -3,
                    z: 20,
                    boxShadow: "0 15px 30px rgba(239, 68, 68, 0.25)",
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    borderColor: 'rgba(239, 68, 68, 0.6)',
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  className={`${method.color} hover:border-red-500 p-6 rounded-xl shadow-2xl shadow-red-500/20 relative overflow-hidden transition-all duration-700 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                  style={{ transformStyle: 'preserve-3d' }}
                  onClick={() => {
                    if (method.link) {
                      window.open(method.link, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  {/* Card glow effect */}
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
                  
                  <div className="relative z-10 flex items-center space-x-4">
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20 + index * 3, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="text-4xl bg-red-500/20 backdrop-blur-sm rounded-full p-3"
                      style={{ transform: 'translateZ(15px)' }}
                    >
                      {method.icon}
                    </motion.div>
                    
                    <div style={{ transform: 'translateZ(10px)' }}>
                      <motion.h4 
                        className="text-white font-bold text-lg mb-1"
                        animate={{
                          textShadow: [
                            '0 0 10px rgba(255, 255, 255, 0.5)',
                            '0 0 20px rgba(255, 255, 255, 0.8)',
                            '0 0 10px rgba(255, 255, 255, 0.5)'
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {method.title}
                      </motion.h4>
                      <p className="text-white/90 font-medium mb-1 break-all">{method.value}</p>
                      <p className="text-white/70 text-sm">{method.description}</p>
                      {isClickable && (
                        <p className="text-red-400 text-xs mt-1">Click to open</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              borderColor: 'rgba(239, 68, 68, 0.4)',
              boxShadow: '0 15px 30px rgba(239, 68, 68, 0.15)',
              transition: { duration: 0.5, ease: "easeOut" }
            }}
            className="bg-black border border-white/20 rounded-2xl p-8 shadow-2xl shadow-white/10 transition-all duration-700"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.h3 
              className="text-2xl font-bold text-white mb-8"
              style={{ transform: 'translateZ(20px)' }}
            >
              Send Message
            </motion.h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: false }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <label className="block text-white font-medium mb-2" style={{ transform: 'translateZ(10px)' }}>
                  Full Name
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  whileFocus={{ 
                    scale: 1.01,
                    boxShadow: "0 0 15px rgba(239, 68, 68, 0.25)",
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    borderColor: 'rgba(239, 68, 68, 0.6)',
                    z: 10,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(239, 68, 68, 0.04)',
                    borderColor: 'rgba(239, 68, 68, 0.3)',
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="w-full px-4 py-3 bg-black border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-500"
                  placeholder="Enter your full name"
                  style={{ transform: 'translateZ(5px)' }}
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: false }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <label className="block text-white font-medium mb-2" style={{ transform: 'translateZ(10px)' }}>
                  Email Address
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  whileFocus={{ 
                    scale: 1.01,
                    boxShadow: "0 0 15px rgba(239, 68, 68, 0.25)",
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    borderColor: 'rgba(239, 68, 68, 0.6)',
                    z: 10,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(239, 68, 68, 0.04)',
                    borderColor: 'rgba(239, 68, 68, 0.3)',
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="w-full px-4 py-3 bg-black border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-500"
                  placeholder="Enter your email address"
                  style={{ transform: 'translateZ(5px)' }}
                />
              </motion.div>

              {/* Subject Input */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: false }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <label className="block text-white font-medium mb-2" style={{ transform: 'translateZ(10px)' }}>
                  Subject
                </label>
                <motion.input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  whileFocus={{ 
                    scale: 1.01,
                    boxShadow: "0 0 15px rgba(239, 68, 68, 0.25)",
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    borderColor: 'rgba(239, 68, 68, 0.6)',
                    z: 10,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(239, 68, 68, 0.04)',
                    borderColor: 'rgba(239, 68, 68, 0.3)',
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="w-full px-4 py-3 bg-black border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-500"
                  placeholder="What's this about?"
                  style={{ transform: 'translateZ(5px)' }}
                />
              </motion.div>

              {/* Message Textarea */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: false }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <label className="block text-white font-medium mb-2" style={{ transform: 'translateZ(10px)' }}>
                  Message
                </label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  whileFocus={{ 
                    scale: 1.01,
                    boxShadow: "0 0 15px rgba(239, 68, 68, 0.25)",
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    borderColor: 'rgba(239, 68, 68, 0.6)',
                    z: 10,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(239, 68, 68, 0.04)',
                    borderColor: 'rgba(239, 68, 68, 0.3)',
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="w-full px-4 py-3 bg-black border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-500 resize-none"
                  placeholder="Tell me about your project..."
                  style={{ transform: 'translateZ(5px)' }}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: false }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(239, 68, 68, 0.3)",
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    rotateX: -2,
                    z: 15,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98, rotateX: 2, transition: { duration: 0.1 } }}
                  className="w-full bg-black border-2 border-white/30 hover:border-red-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-700 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span style={{ transform: 'translateZ(10px)' }}>
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-4 h-4 bg-white rounded-full mr-2"
                      />
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0"
                    style={{
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.2), transparent, rgba(255,255,255,0.2))'
                    }}
                    animate={{
                      opacity: [0, 0.4, 0],
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
            </form>
          </motion.div>
        </div>
      </div>

      {/* Global floating particles */}
      {isClient && [...Array(8)].map((_, i) => (
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
            left: `${8 + i * 12}%`,
            top: `${15 + (i % 4) * 20}%`
          }}
        />
      ))}
    </section>
  );
}