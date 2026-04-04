import React from 'react';

const Logo = ({ size = 'medium', forceWhite = false }) => {
  const isLarge = size === 'large';
  
  return (
    <div className={`logo-container ${size}`} style={{ 
      display: 'inline-flex', 
      alignItems: 'baseline', 
      position: 'relative',
      cursor: 'pointer',
      userSelect: 'none',
      gap: '2px'
    }}>
      <div className="logo-text" style={{ 
        fontSize: isLarge ? '2.5rem' : '1.5rem', 
        fontWeight: 800, 
        letterSpacing: '-0.04em',
        display: 'flex',
        alignItems: 'baseline',
        lineHeight: 1
      }}>
        {/* 'Your' part */}
        <span className="logo-your" style={{ 
          color: forceWhite ? '#ffffff' : 'var(--text-primary)',
          transition: 'color 0.3s ease'
        }}>Your</span>
        
        {/* 'Brew' part with anchored swoosh */}
        <span className="logo-brew-wrapper" style={{ 
          position: 'relative',
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <span className="logo-brew" style={{ 
            background: 'var(--gradient-orange)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 10px rgba(255, 107, 0, 0.2)',
            zIndex: 2
          }}>Brew</span>
          
          {/* SVG swoosh anchored to 'Brew' width */}
          <svg 
            width="100%" 
            height={isLarge ? "10" : "6"} 
            viewBox="0 0 100 10" 
            preserveAspectRatio="none"
            fill="none" 
            style={{ 
              position: 'absolute',
              bottom: isLarge ? '-8px' : '-5px',
              left: 0,
              filter: 'drop-shadow(0 2px 4px rgba(255, 107, 0, 0.4))',
              zIndex: 1
            }}
          >
            <path 
              d="M0 5C20 1 80 1 100 5C80 9 20 9 0 5Z" 
              fill="url(#swoosh-gradient-final)" 
            />
            <defs>
              <linearGradient id="swoosh-gradient-final" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--primary-yellow)" />
                <stop offset="1" stopColor="var(--primary-orange)" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Logo;
