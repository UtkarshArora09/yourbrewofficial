import React from 'react';
import { 
  Cloud, Cpu, Layers, Rocket, RefreshCw, BarChart, 
  Wallet, ShieldCheck, UserCheck, Lock, ChevronRight,
  Zap, FileText, Target, Layout, Megaphone, Edit3
} from 'lucide-react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import './Services.css';

const services = [
  {
    icon: <Cloud size={32} />,
    title: "Cloud & Infrastructure",
    tagline: "Your most differentiating skill.",
    desc: "AWS / Azure / GCP setup, cloud architecture design, cost optimization, auto-scaling, and security hardening (SOC2, IAM).",
    tags: ["AWS/GCP", "Terraform", "Security"]
  },
  {
    icon: <RefreshCw size={32} />,
    title: "DevOps & CI/CD",
    tagline: "Reliable, automated deployments.",
    desc: "CI/CD pipelines, Docker/K8s, monitoring (Grafana/Datadog), and zero-downtime deployment strategies.",
    tags: ["GH Actions", "Docker", "Sentry"]
  },
  {
    icon: <Layers size={32} />,
    title: "Web & App Development",
    tagline: "From MVP to Global Scale.",
    desc: "High-performance SaaS apps, custom APIs, React Native/Flutter mobile apps, and technical architecture consulting.",
    tags: ["Next.js", "React Native", "API"]
  },
  {
    icon: <Zap size={32} />,
    title: "AI / ML Integration",
    tagline: "The #1 startup demand.",
    desc: "Custom RAG pipelines, LLM agents (OpenAI/Claude), workflow automation, and AI readiness audits.",
    tags: ["LLMs", "LangChain", "Automation"]
  },
  {
    icon: <Edit3 size={32} />,
    title: "Content Creation",
    tagline: "Your true one-stop shop.",
    desc: "SEO strategy, LinkedIn content, investor pitch decks, and technical product documentation.",
    tags: ["SEO", "LinkedIn", "Copy"]
  },
  {
    icon: <Target size={32} />,
    title: "Business Strategy",
    tagline: "Pure expertise monetized.",
    desc: "Idea validation, GTM planning, unit economics, and fractional CTO/Co-founder advisory.",
    tags: ["GTM", "Roadmap", "Strategy"]
  },
  {
    icon: <Wallet size={32} />,
    title: "Fundraising Support",
    tagline: "High-ticket investor readiness.",
    desc: "Design-driven pitch decks, financial models, investor research, and term sheet guidance.",
    tags: ["Pitch Deck", "Finance", "Investment"]
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Legal & Setup",
    tagline: "Partner-led compliance.",
    desc: "Company incorporation, GST, IP protection, and founder/contractor agreements via our legal partners.",
    tags: ["Legal", "Compliance", "GST"]
  },
  {
    icon: <Layout size={32} />,
    title: "UI/UX Design",
    tagline: "User-centric brilliance.",
    desc: "Figma wireframing, high-fidelity UI design, design systems, and UX audits for existing products.",
    tags: ["Figma", "UI Design", "UX Audit"]
  },
  {
    icon: <Megaphone size={32} />,
    title: "Growth Marketing",
    tagline: "Scale as you grow.",
    desc: "Performance marketing, SEO, funnel optimization, and advanced analytics (GA4, Mixpanel).",
    tags: ["Ads", "Funnel", "Growth"]
  }
];

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="service-bento-item"
    >
      <SpotlightCard className="service-card-wrapper" strength={0.05} spotlightSize={350}>
        <div className="service-card-inner">
          <div className="service-icon-box">
             {service.icon}
             <div className="icon-glow" />
          </div>
          <div className="service-content">
            <div className="service-badge">{service.tagline}</div>
            <h3 className="service-title">
              {service.title} 
              <ChevronRight size={18} className="title-arrow" />
            </h3>
            <p className="service-desc">{service.desc}</p>
            <div className="service-tags">
              {service.tags.map((tag, i) => (
                <span key={i} className="service-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge"
          >
            Elite Service Pillars
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="section-title"
          >
            Maximum <span className="text-gradient">Impact</span> Portfolio
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-subtitle"
          >
            We've refined our execution into 10 foundational pillars designed to take your startup from zero to global scale.
          </motion.p>
        </div>

        <div className="services-bento-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
