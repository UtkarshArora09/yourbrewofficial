import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Cloud, Zap, Target } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import './AuditSection.css';

const AuditSection = () => {
  const leaks = [
    {
      icon: <Zap size={28} strokeWidth={1.5} />,
      title: "Performance Leak",
      description: "A few seconds of delay in a booking flow. Individually small; together, they kill conversions.",
      stat: "Sub-second optimization",
      size: "large"
    },
    {
      icon: <Cloud size={28} strokeWidth={1.5} />,
      title: "Cloud Leak",
      description: "Cloud bills slightly higher than they should be. Scaling with noise instead of clarity.",
      stat: "Cost-optimized scaling",
      size: "medium"
    },
    {
      icon: <Cpu size={28} strokeWidth={1.5} />,
      title: "Process Leak",
      description: "Manual work no one questions anymore. Systems should make a business lighter, not heavier.",
      stat: "Automated efficiency",
      size: "small"
    },
    {
      icon: <Target size={28} strokeWidth={1.5} />,
      title: "Strategy Leak",
      description: "Missed opportunities sitting in plain sight. Clarity before code, every single time.",
      stat: "Strategic growth",
      size: "small"
    }
  ];

  return (
    <section className="audit-section" id="audit">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="audit-header"
        >
          <div className="audit-label">ELITE DIAGNOSTICS</div>
          <h2 className="section-title">The Silent <span className="text-brand">Leak Audit.</span></h2>
          <p className="section-subtitle">
            Most businesses don't break loudly. They leak quietly. 
            We step in to study how your system really behaves, identifying the noise 
            that holds you back.
          </p>
        </motion.div>

        <div className="audit-bento">
          {leaks.map((leak, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className={`bento-item ${leak.size}`}
            >
              <SpotlightCard className="audit-card-wrapper" tiltMaxAngleX={3} tiltMaxAngleY={3}>
                <div className="audit-card-inner">
                  <div className="audit-icon-box">{leak.icon}</div>
                  <div className="audit-content">
                    <h3 className="audit-title">{leak.title}</h3>
                    <p className="audit-desc">{leak.description}</p>
                  </div>
                  <div className="audit-footer">
                    <span className="audit-stat-label">KPI:</span>
                    <span className="audit-stat-value">{leak.stat}</span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuditSection;
