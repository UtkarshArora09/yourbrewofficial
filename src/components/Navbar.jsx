import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import logoPng from '../assets/logo.png';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="navbar-wrapper">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
        className={`navbar-pill ${scrolled ? 'nav-scrolled' : ''}`}
      >
        <div className="nav-content">
          <a href="#hero" className="nav-logo-box">
            <img 
              src={logoPng} 
              alt="YourBrew" 
              style={{ filter: theme === 'light' ? 'invert(1)' : 'none' }} 
            />
          </a>
          
          <div className="nav-links">
            <a href="#audit" className="nav-link">Silent Leak Audit</a>
            <a href="#services" className="nav-link">Systemic Build</a>
            <a href="#about" className="nav-link">Strategic Partner</a>
          </div>

          <div className="nav-actions">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <a href="#contact" className="btn-nav">
              Inquire
            </a>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
