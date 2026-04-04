import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './SpotlightCard.css';

const SpotlightCard = ({ children, className = "", strength = 0.5, spotlightSize = 400 }) => {
  const containerRef = useRef(null);
  
  // Magnetic movement values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring configurations for smoothness
  const springConfig = { damping: 20, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Magnetic logic
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const magX = (e.clientX - centerX) * strength;
    const magY = (e.clientY - centerY) * strength;
    
    x.set(magX);
    y.set(magY);

    // Spotlight logic
    const spotX = e.clientX - rect.left;
    const spotY = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${spotX}px`);
    containerRef.current.style.setProperty('--mouse-y', `${spotY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        willChange: 'transform',
        '--spotlight-size': `${spotlightSize}px`
      }}
      className={`spotlight-card ${className}`}
    >
      <div className="spotlight-overlay" />
      <div className="spotlight-content">
        {children}
      </div>
    </motion.div>
  );
};

export default SpotlightCard;
