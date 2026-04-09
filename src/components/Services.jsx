import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code, BarChart, Settings, Globe, Shield } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import './Services.css';

const Services = () => {
  const services = [
    {
      title: "Venture Architecture",
      desc: "Building the foundation of your startup. From MVP to market fit with a focus on systemic stability.",
      icon: <Rocket size={26} strokeWidth={1.5} />,
      size: "standard"
    },
    {
      title: "Cloud Governance",
      desc: "Eliminating noise in your infrastructure. Scalable, cost-effective, and secure cloud ecosystems.",
      icon: <Globe size={26} strokeWidth={1.5} />,
      size: "standard"
    },
    {
      title: "MVP Development",
      desc: "High-fidelity code delivered with speed. Clarity before everything else.",
      icon: <Code size={26} strokeWidth={1.5} />,
      size: "standard"
    },
    {
      title: "Growth Analytics",
      desc: "Data-driven insights to fuel your expansion. Turning metrics into momentum.",
      icon: <BarChart size={26} strokeWidth={1.5} />,
      size: "standard"
    },
    {
      title: "Operational Excellence",
      desc: "Optimizing the human and technical systems that drive your business.",
      icon: <Settings size={26} strokeWidth={1.5} />,
      size: "standard"
    },
    {
      title: "Security & Shield",
      desc: "Elite security protocols and risk mitigation for high-stakes startups.",
      icon: <Shield size={26} strokeWidth={1.5} />,
      size: "standard"
    }
  ];

  return (
    <section className="services-section" id="services">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="services-header"
        >
          <div className="services-label">OUR CAPABILITIES</div>
          <h2 className="section-title">The <span className="text-brand">Systemic Build.</span></h2>
          <p className="section-subtitle">
            We don't just build code. We architect the core technical and operational 
            infrastructure that allows your business to scale without unnecessary friction.
          </p>
        </motion.div>

        <div className="services-bento">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="service-bento-item"
            >
              <SpotlightCard className="service-card-wrapper" tiltMaxAngleX={4} tiltMaxAngleY={4}>
                <div className="service-card-inner">
                  <div className="service-icon-box">{service.icon}</div>
                  <div className="service-text">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-desc">{service.desc}</p>
                  </div>
                  <div className="service-action">
                    <span>EXPLORE CAPABILITY</span>
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

export default Services;
