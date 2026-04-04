import React, { useEffect, useRef } from 'react';

const ZeroGravityCanvas = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    // Get current background color based on theme
    const getBgColor = () => {
      const computed = getComputedStyle(document.documentElement).getPropertyValue('--bg-canvas').trim();
      return computed || (theme === 'dark' ? '#030303' : '#ffffff');
    };

    let bgColor = getBgColor();

    // Core brand colors combined with Antigravity-style deep purples/pinks
    const colors = [
      '#ff6b00', // YourBrew Orange
      '#ffb800', // Yellow
      '#3b82f6', // Deep Blue
      '#ec4899', // Pink
      '#8b5cf6'  // Purple
    ];
    
    let particles = [];
    const NUM_PARTICLES = window.innerWidth > 768 ? 500 : 250;
    
    let mouse = {
      x: w / 2,
      y: h / 2,
      targetX: w / 2,
      targetY: h / 2
    };
    
    let time = 0;
    let autoRotate = 0;

    // Generate particles in a structured 3D Sphere shell (Antigravity Style)
    const radius = w > 1000 ? 600 : 300;
    for (let i = 0; i < NUM_PARTICLES; i++) {
        const phi = Math.acos(-1 + (2 * i) / NUM_PARTICLES);
        const theta = Math.sqrt(NUM_PARTICLES * Math.PI) * phi;

        particles.push({
            origX: radius * Math.cos(theta) * Math.sin(phi),
            origY: radius * Math.sin(theta) * Math.sin(phi),
            origZ: radius * Math.cos(phi),
            baseTransformAngle: Math.random() * Math.PI * 2,
            size: Math.random() * 1.8 + 0.6,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    let animationId;

    const animate = () => {
      time += 0.0003; 
      autoRotate += 0.001; 
      
      const idleX = Math.sin(time * 3) * 12;
      const idleY = Math.cos(time * 2.5) * 12;
      
      mouse.x += (mouse.targetX + idleX - mouse.x) * 0.02;
      mouse.y += (mouse.targetY + idleY - mouse.y) * 0.02;

      bgColor = getBgColor();
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);
      
      // Dramatic Antigravity Perspective: Increased rotation multipliers
      const rotY = (mouse.x - w / 2) * 0.003 + autoRotate;
      const rotX = (mouse.y - h / 2) * 0.003;
      const rotZ = autoRotate * 0.5;

      particles.forEach(p => {
        const orbitAngle = rotZ + p.baseTransformAngle;
        const radiusXY = Math.sqrt(p.origX * p.origX + p.origY * p.origY);
        const startAngle = Math.atan2(p.origY, p.origX);
        const curX = Math.cos(startAngle + time * 0.5) * radiusXY;
        const curY = Math.sin(startAngle + time * 0.5) * radiusXY;
        const curZ = p.origZ;

        const y1 = curY * Math.cos(rotX) - curZ * Math.sin(rotX);
        const z1 = curY * Math.sin(rotX) + curZ * Math.cos(rotX);
        const x2 = curX * Math.cos(rotY) + z1 * Math.sin(rotY);
        const z2 = -curX * Math.sin(rotY) + z1 * Math.cos(rotY);

        const fov = 800;
        const perspective = fov / (fov + z2);
        if (perspective < 0) return;

        const projX = (w / 2) + x2 * perspective;
        const projY = (h / 2) + y1 * perspective;
        const renderSize = p.size * perspective;

        ctx.beginPath();
        ctx.arc(projX, projY, Math.max(renderSize, 0.1), 0, Math.PI * 2);
        ctx.globalAlpha = Math.max(0.1, Math.min(1, perspective));
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.closePath();
      });

      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = w / 2;
      mouse.targetY = h / 2;
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      mouse.targetX = w / 2;
      mouse.targetY = h / 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]); // Re-run effect or update variables when theme changes

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        backgroundColor: 'var(--bg-canvas)'
      }}
    />
  );
};

export default ZeroGravityCanvas;
