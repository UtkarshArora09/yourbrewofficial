import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticEffect from './MagneticEffect';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-glow"></div>
      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="hero-badge"
        >
          <span className="pulse-dot"></span>
          Founder-to-Founder Support
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.4 }}
          className="hero-title"
        >
          Your Vision, <br /><span className="text-gradient">Our Execution</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.6 }}
          className="hero-subtitle"
        >
          The ultimate 10-pillar platform for startup founders. From MVP to Global Scale, we brew the tech that powers your growth.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.8 }}
          className="hero-actions"
        >
          <MagneticEffect strength={0.25}>
            <a href="#contact" className="btn-primary">
              Get Started <ArrowRight size={18} />
            </a>
          </MagneticEffect>
          <MagneticEffect strength={0.15}>
            <a href="#services" className="btn-secondary">
              Our Services
            </a>
          </MagneticEffect>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
