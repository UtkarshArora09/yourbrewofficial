import React, { useRef, useState, useEffect } from 'react';
import { Target, Users, Zap, TrendingUp, ShieldCheck, Globe, Rocket, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import MagneticEffect from './MagneticEffect';
import './About.css';

const CountingStat = ({ value, label, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      if (start === end) {
        setDisplayValue(value);
        return;
      }

      let totalDuration = 2000;
      let incrementTime = totalDuration / end;

      let timer = setInterval(() => {
        start += 1;
        setDisplayValue(start + (value.includes('x') ? 'x' : value.includes('°') ? '°' : ''));
        if (start === end) clearInterval(timer);
      }, incrementTime);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="bento-stat">
      <span className="bento-stat-value">{displayValue}</span>
      <span className="bento-stat-label">{label}</span>
    </div>
  );
};

const BentoCard = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`bento-card ${className}`}
  >
    <div className="bento-glow" />
    <div className="inner-bento-content">
      {children}
    </div>
  </motion.div>
);

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header center-header" style={{ marginBottom: '4rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge"
          >
            The YourBrew Ethos
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Built by Founders, For <span className="text-gradient">Founders</span>
          </motion.h2>
        </div>

        <div className="bento-grid">
          {/* Main Vision Card */}
          <BentoCard className="bento-main">
            <div className="bento-header">
              <div className="badge-icon glow-orange"><Rocket size={20} /></div>
              <h3>Accelerating Innovation</h3>
            </div>
            <p>Most agencies build bloat. We build high-performance infrastructure designed for hyper-growth. acting as your technical co-founders, growth team, and infrastructure gurus.</p>
            <div className="bento-stats-row">
              <CountingStat value="10x" label="Faster GTM" />
              <CountingStat value="0%" label="Technical Debt" />
              <CountingStat value="360°" label="Startup Coverage" />
            </div>
          </BentoCard>

          {/* Code Engine Card */}
          <BentoCard className="bento-code" delay={0.1}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span>yourbrew-engine / build</span>
            </div>
            <div className="code-visual">
              <div className="scan-line"></div>
              {[100, 75, 50, 90, 83, 66].map((width, i) => (
                <div key={i} className={`code-row w-${width} ${i === 3 ? 'active' : ''}`}></div>
              ))}
            </div>
          </BentoCard>

          {/* Scale Card */}
          <BentoCard className="bento-feature-1" delay={0.2}>
            <div className="feature-icon glow-yellow"><TrendingUp size={24} /></div>
            <h4>Scale Beyond Limits</h4>
            <p>Engineered for the first 1M users.</p>
          </BentoCard>

          {/* Team Card */}
          <BentoCard className="bento-feature-2" delay={0.3}>
            <div className="feature-icon glow-blue"><Users size={24} /></div>
            <h4>Elite Native Talent</h4>
            <div className="avatar-group">
               {/* Placeholders for team avatars if needed */}
               <div className="avatar-mock">JB</div>
               <div className="avatar-mock">AI</div>
               <div className="avatar-mock">SD</div>
            </div>
          </BentoCard>

          {/* Secure Card */}
          <BentoCard className="bento-feature-3" delay={0.4}>
            <ShieldCheck className="shield-bg-icon" size={140} />
            <div className="feature-content-over">
              <h4>Hardened Security</h4>
              <p>SOC2 & HIPAA Compliant.</p>
            </div>
          </BentoCard>

          {/* Global Card */}
          <BentoCard className="bento-feature-4" delay={0.5}>
            <div className="global-wrap">
              <Globe size={40} className="globe-icon pulse" />
              <h4>Global Remote</h4>
              <span>NYC / London / Remote</span>
            </div>
            <ArrowUpRight className="corner-arrow" size={24} />
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default About;
