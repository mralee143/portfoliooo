'use client';

import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Languages from '../components/Languages';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

// import Projects from '../components/Projects';

export default function Home() {
  // Add smooth scroll behavior to the entire page
  useEffect(() => {
    // Ensure smooth scrolling is enabled
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup on unmount
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <Languages />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      
      {/* <Projects /> */}
    </div>
  );
}