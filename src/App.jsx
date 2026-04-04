import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import ZeroGravityCanvas from './components/ZeroGravityCanvas';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('yourbrew-theme') || 'light';
  });

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('yourbrew-theme', theme);

    // Scroll-Triggered Color Shift Logic
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId === 'services') {
            document.body.style.setProperty('--bg-color', theme === 'light' ? '#f8fbfc' : '#0a0a0a');
          } else if (sectionId === 'about') {
            document.body.style.setProperty('--bg-color', theme === 'light' ? '#fffdfa' : '#050505');
          } else {
            document.body.style.setProperty('--bg-color', theme === 'light' ? '#ffffff' : '#030303');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      lenis.destroy();
      observer.disconnect();
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-wrapper">
      <Preloader />
      <div className="noise-overlay" />
      <ZeroGravityCanvas theme={theme} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Services />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
