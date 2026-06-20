import React, { useState } from 'react';
import { Trophy, ShieldCheck, Landmark, Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import { validateEmail, validatePhone, validatePassword } from '../../../utils/validators';
import Button from '../../../components/Button/Button';
import './InstitutionRegistration.css';

const InstitutionRegistration = () => {
  const { registerInstitution } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'College',
    location: 'Jorhat',
    email: '',
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {};

    if (!formData.name.trim()) tempErrors.name = 'Group / Institution Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      tempErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      registerInstitution({
        name: formData.name,
        type: formData.type,
        location: formData.location,
        email: formData.email,
        phone: formData.phone
      });
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="inst-registration-panel glass-panel animate-fade-in">
      <div className="panel-header">
        <Trophy className="panel-icon" size={24} />
        <h2>Register Group / Institution</h2>
      </div>

      {success ? (
        <div className="registration-success-message">
          <ShieldCheck size={48} className="success-icon" />
          <h3>Institution Registered Successfully!</h3>
          <p>
            Your group <strong>{formData.name}</strong> is now registered under the category <strong>{formData.type}</strong>.
          </p>
          <p className="success-desc">
            Volunteers can now select your group in the donor signup sheet. Every donor who joins tagging your group will add 10 points to your leaderboard ranking!
          </p>
          <Button variant="outline" onClick={() => {
            setSuccess(false);
            setFormData({
              name: '',
              type: 'College',
              location: 'Jorhat',
              email: '',
              phone: '',
              password: ''
            });
          }}>Register Another Group</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="registration-form">
          <p className="form-info-text">
            Register your NGO, College club (NSS/NCC), Company office, Locality association, or Family tree. Group registrations foster friendly competition and enable community impact tracking.
          </p>

          <div className="form-group">
            <label className="form-label" htmlFor="name">Group / Institution Name *</label>
            <div className="input-with-icon">
              <Landmark size={16} className="input-icon" />
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input icon-indent ${errors.name ? 'input-error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. NSS Jorhat Engineering College"
              />
            </div>
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label" htmlFor="type">Group Category *</label>
              <select
                id="type"
                name="type"
                className="form-select"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="College">College / School</option>
                <option value="NGO">NGO / Welfare Society</option>
                <option value="Company">Company / Office</option>
                <option value="Family Tree">Family Tree</option>
                <option value="Locality">Locality / City Area</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label className="form-label" htmlFor="location">Base Location *</label>
              <select
                id="location"
                name="location"
                className="form-select"
                value={formData.location}
                onChange={handleChange}
              >
                {['Jorhat', 'Guwahati', 'Dibrugarh', 'Tezpur', 'Silchar', 'Nagaon', 'Sivasagar'].map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label" htmlFor="email">Official Email *</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input icon-indent ${errors.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. nss@jec.edu"
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group flex-1">
              <label className="form-label" htmlFor="phone">Contact Number *</label>
              <div className="input-with-icon">
                <Phone size={16} className="input-icon" />
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className={`form-input icon-indent ${errors.phone ? 'input-error' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile"
                />
              </div>
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Dashboard Password *</label>
            <div className="input-with-icon">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                className={`form-input icon-indent ${errors.password ? 'input-error' : ''}`}
                value={formData.password}
                onChange={handleChange}
                placeholder="Choose portal password"
              />
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <Button type="submit" loading={loading} className="w-full mt-3">
            Register Group
          </Button>
        </form>
      )}
    </div>
  );
};

export default InstitutionRegistration;
