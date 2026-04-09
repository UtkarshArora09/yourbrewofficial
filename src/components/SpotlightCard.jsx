import React, { useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import './SpotlightCard.css';

const SpotlightCard = ({ children, className = "", tiltMaxAngleX = 5, tiltMaxAngleY = 5 }) => {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const spotX = e.clientX - rect.left;
    const spotY = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${spotX}px`);
    containerRef.current.style.setProperty('--mouse-y', `${spotY}px`);
  };

  return (
    <Tilt
      tiltMaxAngleX={tiltMaxAngleX}
      tiltMaxAngleY={tiltMaxAngleY}
      glareEnable={true}
      glareMaxOpacity={0.1}
      glareColor="var(--primary-brand)"
      glarePosition="all"
      glareBorderRadius="16px"
      transitionSpeed={1000}
      scale={1.02}
      className={`spotlight-card glass-panel ${className}`}
    >
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="spotlight-inner"
      >
        <div className="spotlight-overlay" />
        <div className="spotlight-content">
          {children}
        </div>
      </div>
    </Tilt>
  );
};

export default SpotlightCard;
