import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="footer-divider"
        />
        <div className="footer-content">
          <div className="footer-brand">
            <Logo forceWhite={true} />
            <p className="footer-tagline">Brewing the future of startup execution.</p>
          </div>
          
          <div className="footer-meta">
            <div className="footer-links">
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
            </div>
            <p className="copyright">
              © {new Date().getFullYear()} YourBrew. Built with 🧡 by Founders for Founders.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
