import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import Button from '../../components/Button/Button';
import { validateEmail, validatePhone } from '../../utils/validators';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      tempErrors.email = 'Please enter a valid email';
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      tempErrors.phone = 'Enter a valid 10-digit number';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    if (Object.keys(tempErrors).length > 0) { setErrors(tempErrors); return; }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="contact-page">

      {/* ── HERO ── */}
      <section className="contact-hero">
        <div className="contact-hero-blob contact-hero-blob-1" />
        <div className="contact-hero-blob contact-hero-blob-2" />
        <div className="container contact-hero-inner">
          <div className="contact-hero-tag">
            <Mail size={12} />
            <span>Get In Touch</span>
          </div>
          <h1 className="contact-hero-title">
            Let's <span className="contact-highlight">Connect</span>
          </h1>
          <p className="contact-hero-sub">
            We're here to support your inquiries, donation drives, and civic partnerships across Assam.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="contact-main container">

        {/* ── LEFT: Info ── */}
        <div className="contact-left">

          {/* Info cards */}
          <div className="contact-info-cards">
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="contact-info-card">
              <div className="contact-info-card-icon contact-icon-map">
                <MapPin size={22} />
              </div>
              <div className="contact-info-card-body">
                <span className="contact-info-card-label">Our Office</span>
                <span className="contact-info-card-value">Garmur Road, Near JEC</span>
                <span className="contact-info-card-sub">Jorhat, Assam 785006</span>
              </div>
              <ArrowRight size={16} className="contact-info-card-arrow" />
            </a>

            <a href="tel:+919435012345" className="contact-info-card">
              <div className="contact-info-card-icon contact-icon-phone">
                <Phone size={22} />
              </div>
              <div className="contact-info-card-body">
                <span className="contact-info-card-label">Phone Number</span>
                <span className="contact-info-card-value">
                  <span className="contact-flag">🇮🇳</span> +91 94350 12345
                </span>
                <span className="contact-info-card-sub">Mon – Sat, 9 AM – 6 PM IST</span>
              </div>
              <ArrowRight size={16} className="contact-info-card-arrow" />
            </a>

            <a href="mailto:info@brittofoundation.org" className="contact-info-card">
              <div className="contact-info-card-icon contact-icon-mail">
                <Mail size={22} />
              </div>
              <div className="contact-info-card-body">
                <span className="contact-info-card-label">Email Address</span>
                <span className="contact-info-card-value">info@brittofoundation.org</span>
                <span className="contact-info-card-sub">We reply within 24 hours</span>
              </div>
              <ArrowRight size={16} className="contact-info-card-arrow" />
            </a>
          </div>

          {/* Response time note */}
          <div className="contact-response-note">
            <Clock size={14} />
            <span>Average response time: <strong>Under 24 hours</strong></span>
          </div>
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="contact-right">
          {submitted ? (
            <div className="contact-success animate-fade-in">
              <div className="contact-success-icon">
                <CheckCircle2 size={40} />
              </div>
              <h3>Message Received!</h3>
              <p>Thank you for reaching out. A Britto Foundation representative will get back to you shortly.</p>
              <button className="contact-success-btn" onClick={() => setSubmitted(false)}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="contact-form-header">
                <h2 className="contact-form-title">Send a Message</h2>
                <p className="contact-form-sub">Fill in the details below and we'll get back to you.</p>
              </div>

              {/* Name */}
              <div className="cf-group">
                <label className="cf-label" htmlFor="name">Full Name <span className="cf-required">*</span></label>
                <input
                  type="text" id="name" name="name"
                  className={`cf-input ${errors.name ? 'cf-error' : ''}`}
                  value={formData.name} onChange={handleChange}
                  placeholder="e.g. Pranab Gogoi"
                />
                {errors.name && <span className="cf-error-text">{errors.name}</span>}
              </div>

              {/* Email + Phone row */}
              <div className="cf-row">
                <div className="cf-group">
                  <label className="cf-label" htmlFor="email">Email Address <span className="cf-required">*</span></label>
                  <input
                    type="email" id="email" name="email"
                    className={`cf-input ${errors.email ? 'cf-error' : ''}`}
                    value={formData.email} onChange={handleChange}
                    placeholder="you@example.com"
                  />
                  {errors.email && <span className="cf-error-text">{errors.email}</span>}
                </div>

                <div className="cf-group">
                  <label className="cf-label" htmlFor="phone">Phone <span className="cf-optional">(Optional)</span></label>
                  <div className={`cf-phone-wrap ${errors.phone ? 'cf-error' : ''}`}>
                    <span className="cf-phone-prefix">🇮🇳 +91</span>
                    <input
                      type="text" id="phone" name="phone"
                      className="cf-phone-input"
                      value={formData.phone} onChange={handleChange}
                      placeholder="94350 12345"
                    />
                  </div>
                  {errors.phone && <span className="cf-error-text">{errors.phone}</span>}
                </div>
              </div>

              {/* Subject */}
              <div className="cf-group">
                <label className="cf-label" htmlFor="subject">Subject</label>
                <input
                  type="text" id="subject" name="subject"
                  className="cf-input"
                  value={formData.subject} onChange={handleChange}
                  placeholder="What is this inquiry about?"
                />
              </div>

              {/* Message */}
              <div className="cf-group">
                <label className="cf-label" htmlFor="message">Your Message <span className="cf-required">*</span></label>
                <textarea
                  id="message" name="message" rows="5"
                  className={`cf-textarea ${errors.message ? 'cf-error' : ''}`}
                  value={formData.message} onChange={handleChange}
                  placeholder="Write your query details here..."
                />
                {errors.message && <span className="cf-error-text">{errors.message}</span>}
              </div>

              <button type="submit" className={`cf-submit-btn ${loading ? 'cf-loading' : ''}`} disabled={loading}>
                {loading ? (
                  <span className="cf-spinner" />
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </section>
    </div>
  );
};

export default Contact;
