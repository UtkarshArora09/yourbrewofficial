import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import './ContactCTA.css';

const SERVICES = [
  'Web / App Development',
  'Cloud / DevOps',
  'AI / Automation',
  'UI/UX Design',
  'Marketing / Content',
  'Business / Fundraising',
  'Not sure (need guidance)',
];

const CONTACT_METHODS = ['WhatsApp', 'Email', 'Call'];

const ContactCTA = () => {
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [selectedServices, setSelectedServices] = useState([]);
  const [consultation, setConsultation] = useState('');
  const [contactMethods, setContactMethods] = useState([]);

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const toggleContact = (method) => {
    setContactMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.target;
    const formData = new URLSearchParams();
    
    formData.append('entry.530466241', form.elements.company.value);
    formData.append('entry.1181930089', form.elements.email.value);
    formData.append('entry.1013833292', form.elements.phone.value);
    if (form.elements.website.value) {
      formData.append('entry.1660876971', form.elements.website.value);
    }
    
    selectedServices.forEach(service => formData.append('entry.543205304', service));
    
    if (consultation) {
      formData.append('entry.318307616', consultation);
    }
    
    contactMethods.forEach(method => formData.append('entry.462295189', method));

    try {
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSe4-BEN8vvNV7IL3ikb1ffNeC1sTsy8HtcelS5DP4CWtt06Nw/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });
    } catch (error) {
      console.error('Google Form submission error:', error);
    } finally {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <section className="contact-section" id="contact">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="success-message glass-panel"
          >
            <div className="success-icon"><Check size={36} strokeWidth={1.5} /></div>
            <h2>Inquiry Received.</h2>
            <p>Clarity is on its way. Our team will reach out within 24 hours.</p>
            <button className="btn-outline" onClick={() => setStatus('idle')}>
              Return to Site
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="contact-text"
          >
            <div className="hero-badge">Inquiry</div>
            <h2 className="section-title">Start Your <br /><span className="text-brand">Silent Leak Audit.</span></h2>
            <p className="contact-desc">
              Ready for systemic clarity? Fill out the brief inquiry form below. 
              We'll study your current infrastructure and reach out with a 
              strategic growth map.
            </p>
            
            <div className="contact-meta">
              <div className="meta-item">
                <span className="meta-label">Response Time</span>
                <strong className="meta-value">{ "<" } 24 Hours</strong>
              </div>
              <div className="meta-item">
                <span className="meta-label">Availability</span>
                <strong className="meta-value">Global Remote</strong>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="contact-form-container glass-panel"
          >
            <form className="elite-form" onSubmit={handleSubmit}>
              {/* Company Name */}
              <div className="form-group">
                <label className="form-label">Company Name <span className="required-star">*</span></label>
                <input name="company" type="text" required className="glass-input" placeholder="Your company name" />
              </div>

              {/* Email & Phone row */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email <span className="required-star">*</span></label>
                  <input name="email" type="email" required className="glass-input" placeholder="you@company.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp <span className="required-star">*</span></label>
                  <input name="phone" type="tel" required className="glass-input" placeholder="+91 00000 00000" />
                </div>
              </div>

              {/* Website / App link */}
              <div className="form-group">
                <label className="form-label">Website / App Link</label>
                <input name="website" type="url" className="glass-input" placeholder="https://yourapp.com (optional)" />
              </div>

              {/* What do you need? – checkboxes */}
              <div className="form-group">
                <label className="form-label">What do you need?</label>
                <div className="checkbox-grid">
                  {SERVICES.map((service) => (
                    <label
                      key={service}
                      className={`chip-checkbox ${selectedServices.includes(service) ? 'active' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service)}
                        onChange={() => toggleService(service)}
                      />
                      <span className="chip-check-icon">
                        {selectedServices.includes(service) && <Check size={12} strokeWidth={3} />}
                      </span>
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Free Consultation Call? – radio */}
              <div className="form-group">
                <label className="form-label">Free Consultation Call?</label>
                <div className="radio-row">
                  {['Yes', 'No'].map((opt) => (
                    <label
                      key={opt}
                      className={`chip-radio ${consultation === opt ? 'active' : ''}`}
                    >
                      <input
                        type="radio"
                        name="consultation"
                        value={opt}
                        checked={consultation === opt}
                        onChange={() => setConsultation(opt)}
                      />
                      <span className="radio-dot" />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preferred contact method – checkboxes */}
              <div className="form-group">
                <label className="form-label">Preferred Contact Method</label>
                <div className="radio-row">
                  {CONTACT_METHODS.map((method) => (
                    <label
                      key={method}
                      className={`chip-checkbox ${contactMethods.includes(method) ? 'active' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={contactMethods.includes(method)}
                        onChange={() => toggleContact(method)}
                      />
                      <span className="chip-check-icon">
                        {contactMethods.includes(method) && <Check size={12} strokeWidth={3} />}
                      </span>
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-elite btn-submit" disabled={status === 'loading'}>
                {status === 'loading' ? (
                   <span>Processing...</span>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
