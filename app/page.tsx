import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Languages from '../components/Languages';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

// import Projects from '../components/Projects';

export default function Home() {
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