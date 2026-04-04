import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Logo from './Logo';
import MagneticEffect from './MagneticEffect';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-content">
        <Logo />
        <div className="nav-links">
          <MagneticEffect strength={0.1}>
            <a href="#services">Services</a>
          </MagneticEffect>
          <MagneticEffect strength={0.1}>
            <a href="#about">About</a>
          </MagneticEffect>
          <div className="nav-actions">
            <MagneticEffect strength={0.2}>
              <a href="#contact" className="nav-cta">Let's Talk</a>
            </MagneticEffect>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
