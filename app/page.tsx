import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Languages from '../components/Languages';
import AboutSection from '../components/AboutSection';

// import Projects from '../components/Projects';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <Languages />
      <AboutSection />
      
      {/* <Projects /> */}
    </div>
  );
}