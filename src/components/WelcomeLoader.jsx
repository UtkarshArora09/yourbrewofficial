import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WelcomeLoader.css';

const WelcomeLoader = ({ onFinished }) => {
  const [percent, setPercent] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  
  const loadingTexts = [
    "CLARITY",
    "PRECISION",
    "SYSTEMIC",
    "ELITE"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinished, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % loadingTexts.length);
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onFinished]);

  return (
    <motion.div 
      className="welcome-loader"
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }}
    >
      <div className="loader-content">
        <div className="loader-top">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="brand-status"
          >
            STATUS: INITIALIZING_ELITE_SYSTEM
          </motion.div>
        </div>

        <div className="loader-center">
          <AnimatePresence mode="wait">
            <motion.h1 
              key={textIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="loader-heading"
            >
              {loadingTexts[textIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <div className="loader-bottom">
          <div className="progress-container">
            <div className="progress-label">
              <span>ESTABLISHING CONNECTION</span>
              <span>{percent}%</span>
            </div>
            <div className="progress-track">
              <motion.div 
                className="progress-bar" 
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="loader-grain" />
    </motion.div>
  );
};

export default WelcomeLoader;
