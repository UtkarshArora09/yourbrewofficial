import React, { useRef, useState } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticEffect from './MagneticEffect';
import { buildApiUrl } from '../lib/api';
import './ContactCTA.css';

const MethodCard = ({ icon, label, value, glowClass, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
    >
      <MagneticEffect strength={0.06}>
        <div ref={cardRef} onMouseMove={handleMouseMove} className="method-card">
          <div className="method-spotlight" />
          <div className={`method-icon-bg ${glowClass}`}>{icon}</div>
          <div className="method-details">
            <h4>{label}</h4>
            <p>{value}</p>
          </div>
        </div>
      </MagneticEffect>
    </motion.div>
  );
};

const needOptions = [
  'Web / App Development',
  'Cloud / DevOps',
  'AI / Automation',
  'UI/UX Design',
  'Marketing / Content',
  'Business / Fundraising',
  'Not sure (need guidance)',
];

const contactMethods = ['WhatsApp', 'Email', 'Call'];

const emptyForm = {
  company: '',
  email: '',
  phone: '',
  website: '',
  needs: [],
  freeConsultation: '',
  contactMethod: [],
};

const ContactCTA = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (field, value) => {
    setFormData((prev) => {
      const current = prev[field];
      return current.includes(value)
        ? { ...prev, [field]: current.filter((item) => item !== value) }
        : { ...prev, [field]: [...current, value] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.needs.length === 0) {
      setStatus('error');
      setResponseMsg('Please select at least one service you need.');
      return;
    }

    setStatus('loading');
    setResponseMsg('');

    try {
      const response = await fetch(buildApiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setResponseMsg(data.msg || "Inquiry submitted! We'll reach out shortly.");
        setFormData(emptyForm);
      } else {
        setStatus('error');
        setResponseMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setResponseMsg('Unable to connect to the server. Check your connection.');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container contact-container">
        <div className="contact-info">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="badge"
          >
            Get in Touch
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Let&apos;s Build It.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="contact-desc"
          >
            Get a custom strategy + execution plan for your startup. Fill this quick form and our team will reach out shortly.
          </motion.p>

          <div className="contact-methods">
            <MethodCard icon={<Mail size={24} />} label="Email Us" value="founders@yourbrew.com" glowClass="orange-glow" index={0} />
            <MethodCard icon={<Phone size={24} />} label="WhatsApp" value="+1 (555) YOUR-BREW" glowClass="yellow-glow" index={1} />
            <MethodCard icon={<MapPin size={24} />} label="Location" value="Global Remote (NYC HQ)" glowClass="blue-glow" index={2} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="contact-form-wrapper"
        >
          {status === 'success' ? (
            <div className="premium-form success-container">
              <div className="success-icon">&#10003;</div>
              <h3>Inquiry Received</h3>
              <p>{responseMsg}</p>
              <button
                type="button"
                className="btn-submit-premium"
                style={{ marginTop: '2rem' }}
                onClick={() => {
                  setStatus('idle');
                  setResponseMsg('');
                }}
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form className="premium-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h3>Startup Inquiry Form</h3>
                <p>Takes less than 1 minute - we&apos;ll reach out shortly.</p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Company Name <span className="required">*</span></label>
                  <input
                    name="company"
                    type="text"
                    placeholder="Your startup name"
                    className="premium-input"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email <span className="required">*</span></label>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    className="premium-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone / WhatsApp <span className="required">*</span></label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="premium-input"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Website / App Link</label>
                  <input
                    name="website"
                    type="url"
                    placeholder="https://yourapp.com (optional)"
                    className="premium-input"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group full-width">
                  <label>What do you need? <span className="required">*</span></label>
                  <div className="checkbox-grid">
                    {needOptions.map((option) => (
                      <label key={option} className={`checkbox-pill ${formData.needs.includes(option) ? 'active' : ''}`}>
                        <input
                          type="checkbox"
                          checked={formData.needs.includes(option)}
                          onChange={() => handleCheckbox('needs', option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Free Consultation Call?</label>
                  <div className="radio-group">
                    <label className={`radio-pill ${formData.freeConsultation === 'Yes' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="freeConsultation"
                        value="Yes"
                        checked={formData.freeConsultation === 'Yes'}
                        onChange={handleChange}
                      />
                      <span>Yes</span>
                    </label>
                    <label className={`radio-pill ${formData.freeConsultation === 'No' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="freeConsultation"
                        value="No"
                        checked={formData.freeConsultation === 'No'}
                        onChange={handleChange}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Preferred Contact Method</label>
                  <div className="radio-group">
                    {contactMethods.map((method) => (
                      <label key={method} className={`checkbox-pill ${formData.contactMethod.includes(method) ? 'active' : ''}`}>
                        <input
                          type="checkbox"
                          checked={formData.contactMethod.includes(method)}
                          onChange={() => handleCheckbox('contactMethod', method)}
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {status === 'error' && <p className="error-text">{responseMsg}</p>}

              <MagneticEffect strength={0.15}>
                <button
                  type="submit"
                  className={`btn-submit-premium pulse-btn ${status === 'loading' ? 'loading' : ''}`}
                  disabled={status === 'loading'}
                >
                  <span>{status === 'loading' ? 'Sending...' : 'Submit Inquiry'}</span>
                  <Send size={18} />
                </button>
              </MagneticEffect>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;

