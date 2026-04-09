import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Layers } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import './About.css';

const About = () => {
  const points = [
    {
      icon: <Target size={26} strokeWidth={1.5} />,
      title: "Clarity Before Code",
      description: "For founders, that’s before the first line of code is written—when ideas need structure and a system that can actually scale."
    },
    {
      icon: <Layers size={26} strokeWidth={1.5} />,
      title: "Systemic Behavior",
      description: "We don't just look at tools; we study how the entire system behaves. From booking flows to cloud infrastructure."
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="about-content"
          >
            <div className="hero-badge">Who We Are</div>
            <h2 className="section-title">A partner where decisions <br/>matter most.</h2>
            <p className="about-text">
              YourBrew was built on a simple observation: Most businesses don’t break loudly. They leak quietly. 
              Individually, small inefficiencies feel small. Together, they cost more than most realise. 
              We exist to bring clarity to that.
            </p>
            
            <div className="about-points">
              {points.map((point, i) => (
                <div key={i} className="about-point">
                  <div className="point-icon">{point.icon}</div>
                  <div className="point-text">
                    <h4>{point.title}</h4>
                    <p>{point.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="about-quote">
              "Systems should make a business lighter, not heavier."
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="about-visual"
          >
            <SpotlightCard className="elite-card main-vision" tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <div className="card-header">
                <Zap size={20} className="text-brand" />
                <span>Steady Growth</span>
              </div>
              <div className="card-body">
                <h3>Steady growth through clear thinking.</h3>
                <p>No noise. No unnecessary complexity. Just well-built systems.</p>
              </div>
              <div className="card-footer">
                <div className="brand-dot"></div>
                <span>YourBrew Strategic</span>
              </div>
            </SpotlightCard>
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="floating-accent-box glass-panel"
            >
              <Shield size={32} className="text-brand" />
              <span>Hardened Systems</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
