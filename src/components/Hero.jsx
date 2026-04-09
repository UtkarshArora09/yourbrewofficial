import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-content">

          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="hero-title"
          >
            Clarity, <span className="text-accent">before</span> <br /><span className="text-accent">everything else.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="hero-subtitle"
          >
            Most businesses don’t break loudly. They leak quietly. <br />
            We identify the hidden inefficiencies in your technology and operations, 
            building systems that make your business lighter, not heavier.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="hero-actions"
          >
            <a href="#audit" className="btn-elite">
              <span>Start Your Audit</span> <ArrowRight size={18} />
            </a>
            <a href="#services" className="btn-elite btn-outline">
              <span>The Systemic Build</span>
            </a>
          </motion.div>
        </div>
      </div>
      
      <div className="hero-scroll-indicator">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="scroll-dot"
        />
      </div>
    </section>
  );
};

export default Hero;
