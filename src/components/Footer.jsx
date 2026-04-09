import React from 'react';
import { motion } from 'framer-motion';
import logoPng from '../assets/logo.png';
import './Footer.css';

const Footer = ({ theme }) => {
  return (
    <footer className="footer-section">
      <div className="container">
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="footer-divider"
        />
        
        <div className="footer-grid">
          <div className="footer-brand">
            <img 
              src={logoPng} 
              alt="YourBrew" 
              className="footer-logo" 
              style={{ filter: theme === 'light' ? 'invert(1) hue-rotate(180deg)' : 'none' }}
            />
            <p className="footer-tagline">
              Clarity, before everything else. <br />
              Systems built to make your business lighter.
            </p>
          </div>
          
          <div className="footer-nav">
            <div className="footer-col">
              <h4>Offerings</h4>
              <a href="#audit">Silent Leak Audit</a>
              <a href="#services">Systemic Build</a>
            </div>
            <div className="footer-col">
              <h4>Partnership</h4>
              <a href="#about">Strategic Partner</a>
              <a href="#contact">Inquiry</a>
            </div>
            <div className="footer-col">
              <h4>Connect</h4>
              <a href="mailto:yourbrewofficial@gmail.com">yourbrewofficial@gmail.com</a>
              <span>Global Remote</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} YourBrew Strategic. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
