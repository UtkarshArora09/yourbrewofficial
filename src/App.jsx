import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import CinematicBackground from './components/CinematicBackground';
import WelcomeLoader from './components/WelcomeLoader';
import AuditSection from './components/AuditSection';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('yourbrew-theme') || 'light';
  });

  useEffect(() => {
    // Initialize Lenis - Adjusted for smoother cinematic feel
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1, 
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('yourbrew-theme', theme);

    return () => lenis.destroy();
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-wrapper">
      {loading ? (
        <WelcomeLoader key="loader" onFinished={() => setLoading(false)} />
      ) : (
        <div className="site-content">
          <div className="noise-overlay" />
          <div className="vignette-overlay" />
          <CinematicBackground theme={theme} />
          
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          
          <main>
            <Hero />
            <AuditSection />
            <About />
            <Services />
            <ContactCTA />
          </main>
          
          <Footer theme={theme} />
        </div>
      )}
    </div>
  );
}

export default App;
