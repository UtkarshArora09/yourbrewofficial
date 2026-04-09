import React from 'react';
import './CinematicBackground.css';

const CinematicBackground = ({ theme = 'dark' }) => {
  return (
    <div className={`cinematic-bg-container ${theme} fallback-mode`}>
      <div className="cinematic-fluid-fallback" />
      <div className="cinematic-overlay" />
    </div>
  );
};

export default CinematicBackground;
