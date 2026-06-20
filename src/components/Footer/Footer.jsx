import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for signing up for E-News with: ${email}!`);
      setEmail('');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <footer className="footer-panel-custom">
      <div className="container footer-container-custom">
        {/* Explore Column */}
        <div className="footer-col-custom">
          <h5 className="footer-title-custom">Explore</h5>
          <ul className="footer-links-custom">
            <li><Link to="/about">Our Mission</Link></li>
            <li><Link to="/about">Our Accountability</Link></li>
            <li><Link to="/news">Newsroom</Link></li>
            <li><Link to="/about">Volunteer</Link></li>
            <li><Link to="/donate">Donate Now</Link></li>
          </ul>
        </div>

        {/* Connect Column */}
        <div className="footer-col-custom">
          <h5 className="footer-title-custom">Connect</h5>
          <ul className="footer-links-custom">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/about">Careers</Link></li>
            <li><Link to="/about">FAQ</Link></li>
            <li><Link to="/contact">Ethics Helpline</Link></li>
          </ul>
        </div>

        {/* Give Column */}
        <div className="footer-col-custom">
          <h5 className="footer-title-custom">Give</h5>
          <ul className="footer-links-custom">
            <li><Link to="/donate">Donate Now</Link></li>
            <li><Link to="/register">Become a Member</Link></li>
            <li><Link to="/donate">Become and Donor</Link></li>
          </ul>
        </div>

        {/* Sign Up for E-News Column */}
        <div className="footer-col-custom footer-signup-custom">
          <h5 className="footer-title-custom">Sign Up for E-News</h5>
          <form className="signup-form-custom" onSubmit={handleSubscribe}>
            <div className="input-group-custom">
              <label htmlFor="footer-email-input" className="sr-only">Email address</label>
              <input
                id="footer-email-input"
                type="email"
                placeholder="yourname@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">SIGN UP</button>
            </div>
          </form>
          <p className="signup-disclaimer-custom">
            Get test updates from Britto Foundation. By doing so, you agree to receive email notifications promoting our charitable initiatives. You can opt out at any time.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Social Icons Row */}
        <div className="social-row-custom">
          <span className="social-label-custom">SOCIAL</span>
          <div className="social-icons-custom">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook size={18} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram size={18} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter size={18} /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><Youtube size={18} /></a>
          </div>
        </div>

        {/* Local Areas/Districts Row */}
        <div className="districts-row-custom">
          <span className="districts-label-custom">WORK REGIONS</span>
          <div className="districts-list-custom">
            <span>Jorhat</span>
            <span>Dibrugarh</span>
            <span>Guwahati</span>
          </div>
        </div>

        {/* Bottom Disclaimer and Logo */}
        <div className="footer-bottom-custom">
          <div className="footer-bottom-logo-custom">
            <Heart size={24} className="logo-icon-custom" />
            <span className="logo-text-custom">BRITTO FOUNDATION</span>
          </div>
          <p className="footer-legal-custom">
            Britto Foundation is a non-profit, tax-exempt charitable organization registered in India. Donations are tax-deductible as allowed by law under Section 80G of the Income Tax Act. This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
          </p>
          <div className="footer-copyright-custom">
            <p>&copy; {new Date().getFullYear()} Britto Foundation. All Rights Reserved. | <a href="#">Privacy Policy</a> | <a href="#">Charitable Solicitation Disclosures</a> | <a href="#">Terms of Use</a> | <a href="#">Cookie Settings</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
